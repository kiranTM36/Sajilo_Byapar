const db = require('../db')

const createInventory = (req , res) => {
    try {
        const { batchNo, items , purchaseDate} = req.body

        const values = items.map((item) => [
            batchNo,
            item.productId ,
            item.quantity,
            item.purchasedPrice,
            purchaseDate
        ])

        const sql = `
        INSERT INTO inventory (batchNo,productId , quantity,purchasedPrice , purchaseDate) VALUES ?
        `

        db.query(sql ,[values], (err, result) => {
            if(err){
                return res.status(500).json({
                    success : false ,
                    message : "Failed Insert Data",
                    err
                })
            }

            res.status(200).json({
                success : true ,
                message : "Data Inserted Successfully",
                result
            })
        })
    } catch (error) {
        
    }
}

const showInventory = (req, res) => {
    try {
        const sql = `
            SELECT 
                i.id,
                i.quantity,
                i.batchNo,
                i.purchasedPrice,
                i.purchaseDate,
                p.id AS productId,
                p.productName,
                c.id AS categoryId,
                c.categoryName
            FROM inventory i
            INNER JOIN product p 
                ON i.productId = p.id
            INNER JOIN category c
                ON p.categoryId = c.id
        `;

        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                inventory : result
            });
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createInventory , showInventory }