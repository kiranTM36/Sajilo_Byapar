const db = require("../db")

const addSales = (req, res) => {
    try {

        const {
            customerId,
            totalAmount,
            paidAmount,
            products
        } = req.body

        if (
            !customerId ||
            totalAmount < 0 ||
            paidAmount < 0 ||
            totalAmount < paidAmount ||
            !products ||
            products.length === 0
        ) {
            return res.status(400).json({
                message: "Invalid Data",
                success: false
            })
        }

        db.getConnection((err, connection) => {

            if (err) {
                console.log(err)

                return res.status(500).json({
                    message: "Server Error",
                    success: false
                })
            }

            connection.beginTransaction((errConn) => {

                if (errConn) {
                    console.log(errConn)
                    connection.release()

                    return res.status(500).json({
                        message: "Transaction failed",
                        success: false
                    })
                }

                const sql1 = `
                    INSERT INTO sales
                    (customerId, totalAmount, paidAmount)
                    VALUES (?, ?, ?)
                `

                connection.query(
                    sql1,
                    [customerId, totalAmount, paidAmount],
                    (errSales, salesResult) => {

                        if (errSales) {
                            console.log(errSales)

                            return connection.rollback(() => {
                                connection.release()

                                return res.status(500).json({
                                    message: "Error inserting sales",
                                    success: false
                                })
                            })
                        }

                        const salesId = salesResult.insertId

                        const items = products.map((product) => [
                            salesId,
                            product.productId,
                            product.quantity,
                            product.price,
                            product.quantity * product.price
                        ])

                        const sql2 = `
                            INSERT INTO sale_items
                            (salesId, productId, quantity, price, subtotal)
                            VALUES ?
                        `

                        connection.query(
                            sql2,
                            [items],
                            (errSaleItem, salesItemResult) => {

                                if (errSaleItem) {
                                    console.log(errSaleItem)

                                    return connection.rollback(() => {
                                        connection.release()

                                        return res.status(500).json({
                                            message: "Error inserting sale items",
                                            success: false
                                        })
                                    })
                                }

                                let complete = 0

                                products.forEach((product) => {

                                    const sql3 = `
                                        SELECT quantity
                                        FROM product
                                        WHERE id = ?
                                    `

                                    connection.query(
                                        sql3,
                                        [product.productId],
                                        (errPro, productResult) => {

                                            if (errPro) {
                                                console.log(errPro)

                                                return connection.rollback(() => {
                                                    connection.release()

                                                    return res.status(500).json({
                                                        message: "Error finding product",
                                                        success: false
                                                    })
                                                })
                                            }

                                            if (productResult.length === 0) {

                                                return connection.rollback(() => {
                                                    connection.release()

                                                    return res.status(400).json({
                                                        message: "Product not found",
                                                        success: false
                                                    })
                                                })
                                            }

                                            const currentQty =
                                                productResult[0].quantity

                                            if (
                                                product.quantity >
                                                currentQty
                                            ) {

                                                return connection.rollback(() => {
                                                    connection.release()

                                                    return res.status(400).json({
                                                        message: `Insufficient stock for product ${product.productId}`,
                                                        success: false
                                                    })
                                                })
                                            }

                                            const newQty =
                                                currentQty -
                                                product.quantity

                                            const sql4 = `
                                                UPDATE product
                                                SET quantity = ?
                                                WHERE id = ?
                                            `

                                            connection.query(
                                                sql4,
                                                [
                                                    newQty,
                                                    product.productId
                                                ],
                                                (errUpdate, resultUpdate) => {

                                                    if (errUpdate) {
                                                        console.log(errUpdate)

                                                        return connection.rollback(() => {
                                                            connection.release()

                                                            return res.status(500).json({
                                                                message: "Error updating product",
                                                                success: false
                                                            })
                                                        })
                                                    }

                                                    complete++

                                                    if (
                                                        complete ===
                                                        products.length
                                                    ) {

                                                        // CREDIT
                                                        if (
                                                            paidAmount <
                                                            totalAmount
                                                        ) {

                                                            const creditAmount =
                                                                totalAmount -
                                                                paidAmount

                                                            const sqlCredit = `
                                                                INSERT INTO credit
                                                                (
                                                                    salesId,
                                                                    customerId,
                                                                    creditAmount,
                                                                    paidAmount
                                                                )
                                                                VALUES (?, ?, ?, ?)
                                                            `

                                                            connection.query(
                                                                sqlCredit,
                                                                [
                                                                    salesId,
                                                                    customerId,
                                                                    creditAmount,
                                                                    paidAmount
                                                                ],
                                                                (errCredit) => {

                                                                    if (errCredit) {
                                                                        console.log(errCredit)

                                                                        return connection.rollback(() => {
                                                                            connection.release()

                                                                            return res.status(500).json({
                                                                                message: "Error inserting credit",
                                                                                success: false
                                                                            })
                                                                        })
                                                                    }

                                                                    // COMMIT
                                                                    connection.commit(
                                                                        (errCommit) => {

                                                                            if (errCommit) {
                                                                                console.log(errCommit)

                                                                                return connection.rollback(() => {
                                                                                    connection.release()

                                                                                    return res.status(500).json({
                                                                                        message: "Transaction commit failed",
                                                                                        success: false
                                                                                    })
                                                                                })
                                                                            }

                                                                            connection.release()

                                                                            return res.status(201).json({
                                                                                message: "Sale completed successfully",
                                                                                success: true
                                                                            })
                                                                        }
                                                                    )
                                                                }
                                                            )

                                                        } else {

                                                            // NO CREDIT
                                                            connection.commit(
                                                                (errCommit) => {

                                                                    if (errCommit) {
                                                                        console.log(errCommit)

                                                                        return connection.rollback(() => {
                                                                            connection.release()

                                                                            return res.status(500).json({
                                                                                message: "Transaction commit failed",
                                                                                success: false
                                                                            })
                                                                        })
                                                                    }

                                                                    connection.release()

                                                                    return res.status(201).json({
                                                                        message: "Sale completed successfully",
                                                                        success: true
                                                                    })
                                                                }
                                                            )
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                    )
                                })
                            }
                        )
                    }
                )
            })
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Server Error",
            success: false
        })
    }
}

const getAllSales = (req , res) => {
    try {
        const sql = `SELECT s.*, s.id as saleId ,u.* FROM sales s join user u  on s.customerId = u.id`

        db.query(sql , (err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : 'Error'
                })
            }

            return res.status(200).json({
                message : "SuccessFull",
                success : true,
                sales : result
            })
        })
    } catch (error) {
        
    }
}

const getSingleSale = (req , res) => {
    try {
        const {id} = req.params

        const sql = `SELECT s.* ,s.id as saleId,u.* FROM sales s join user u on s.customerId = u.id  where customerId = ?`

        db.query(sql,[id], (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : "SQL error"
                })
            }

            res.status(200).json({
                message : "Expenses List",
                sale : result[0]
            })
        })
    } catch (error) {
        
    }
}


module.exports = {
    addSales , getAllSales , getSingleSale
}