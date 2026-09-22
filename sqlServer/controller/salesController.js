const db = require('../db')

const addSales = (req, res) => {
    try {
        const {
            customerId,
            totalAmount,
            paidAmount
        } = req.body

        const searchCustomer = `
            SELECT userName
            FROM user
            WHERE id = ?
        `

        if(totalAmount == 0 || totalAmount < paidAmount){
            return res.status(400).json({
                message : "Invalid Data",
                success : false
            })
        }

        db.query(searchCustomer, [customerId], (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to find customer"
                })
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                })
            }

            const sql = `
                INSERT INTO sales
                (
                    customerId,
                    totalAmount,
                    paidAmount
                )
                VALUES (?, ?, ?)
            `

            const values = [
                customerId,
                totalAmount,
                paidAmount
            ]

            db.query(sql, values, (err, saleResult) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Failed to save sale"
                    })
                }

                // If customer still has credit
                if (paidAmount < totalAmount) {

                    const creditAmount = totalAmount - paidAmount

                    const creditSql = `
                        INSERT INTO credit
                        (
                            salesId,
                            creditAmount,
                            paidAmount
                        )
                        VALUES (?, ?, ?)
                    `

                    db.query(
                        creditSql,
                        [
                            saleResult.insertId,
                            creditAmount,
                            paidAmount
                        ],
                        (err, creditResult) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "Sale saved but failed to save credit"
                                })
                            }

                            return res.status(201).json({
                                success: true,
                                message: "Sales and Credit Saved",
                                saleId: saleResult.insertId,
                                creditId: creditResult.insertId,
                                creditAmount
                            })
                        }
                    )

                } else {

                    // Fully paid, so no credit record needed
                    return res.status(201).json({
                        success: true,
                        message: "Sales Saved",
                        saleId: saleResult.insertId
                    })
                }
            })
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getAllSales = (req , res) => {
    try {
        const sql = `
            SELECT s.id , s.customerId, s.totalAmount , s.paidAmount , s.saleDate , u.userName FROM sales s INNER JOIN user u ON s.customerId = u.id
        `

        db.query(sql , (err , result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: "Sale saved but failed to save credit"
                })
            }

            return res.status(200).json({
                message : "Successfully Send code",
                success : true ,
                sales : result
            })
        })
    } catch (error) {
        
    }
}

module.exports = {addSales , getAllSales}