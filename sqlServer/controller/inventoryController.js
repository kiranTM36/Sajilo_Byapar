const db = require('../db')

const createInventory = (req, res) => {
    try {
        const {
            batchNo,
            items
        } = req.body

        if (!batchNo || !items || items.length === 0) {
            return res.status(400).json({
                message: "Invalid inventory data"
            })
        }

        const values = items.map((item) => [
            batchNo,
            item.productId,
            item.quantity,
            item.purchasedPrice
        ])

        db.getConnection((err, connection) => {

            if (err) {
                console.log(err)

                return res.status(500).json({
                    message: "Database connection failed"
                })
            }

            connection.beginTransaction((err1) => {

                if (err1) {
                    console.log(err1)

                    connection.release()

                    return res.status(500).json({
                        message: "Transaction failed"
                    })
                }

                const sql1 = `
                    INSERT INTO inventory
                    (batchNo, productId, quantity, purchasedPrice)
                    VALUES ?
                `

                connection.query( sql1,[values],(errInv, resultInv) => {
                        if (errInv) {
                            console.log(errInv)

                            return connection.rollback(() => {
                                connection.release()

                                return res.status(500).json({
                                    message: "Inventory insert failed",
                                    error: errInv.message
                                })
                            })
                        }

                        let completed = 0

                        items.forEach((item) => {

                            const sql2 = `
                                SELECT quantity
                                FROM product
                                WHERE id = ?
                            `

                            connection.query(
                                sql2,
                                [item.productId],
                                (errQty, resultQty) => {

                                    if (errQty) {
                                        console.log(errQty)

                                        return connection.rollback(() => {
                                            connection.release()

                                            return res.status(500).json({
                                                message: "Product quantity fetch failed",
                                                error: errQty.message
                                            })
                                        })
                                    }

                                    if (resultQty.length === 0) {
                                        return connection.rollback(() => {
                                            connection.release()

                                            return res.status(404).json({
                                                message: `Product ${item.productId} not found`
                                            })
                                        })
                                    }

                                    const oldQty = resultQty[0].quantity

                                    const newQty = oldQty + item.quantity

                                    const sql3 = `
                                        UPDATE product
                                        SET quantity = ?
                                        WHERE id = ?
                                    `

                                    connection.query(
                                        sql3,
                                        [
                                            newQty,
                                            item.productId
                                        ],
                                        (errUpdate, resultUpdate) => {

                                            if (errUpdate) {
                                                console.log(errUpdate)

                                                return connection.rollback(() => {
                                                    connection.release()

                                                    return res.status(500).json({
                                                        message: "Product quantity update failed",
                                                        error: errUpdate.message
                                                    })
                                                })
                                            }

                                            completed++

                                            if (completed === items.length) {

                                                connection.commit(
                                                    (errCommit) => {

                                                        if (errCommit) {
                                                            console.log(errCommit)

                                                            return connection.rollback(() => {
                                                                connection.release()

                                                                return res.status(500).json({
                                                                    message: "Transaction commit failed",
                                                                    error: errCommit.message
                                                                })
                                                            })
                                                        }

                                                        connection.release()

                                                        return res.status(201).json({
                                                            success: true,
                                                            message: "Inventory created successfully"
                                                        })
                                                    }
                                                )
                                            }
                                        }
                                    )
                                }
                            )
                        })
                    }
                )
            })
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const showInventory = (req, res) => {
    try {

        const sql = `
            SELECT i.*,p.*,c.* FROM inventory i JOIN product p ON i.productId = p.id JOIN category c ON p.categoryId = c.id
        `

        db.query(sql, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }

            return res.status(200).json({
                success: true,
                inventory: result
            })
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    createInventory,
    showInventory
}