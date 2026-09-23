const db = require('../db')

const createInventory = (req , res) => {
    try {
        const {productId , quantity , purchaseDate} = req.body

        const sql = `
        INSERT INTO inventory (productId , quantity , purchaseDate) VALUES (?,?,?)
        `

        db.query(sql ,[productId , quantity , purchaseDate], (err, result) => {
            if(err){
                return res.status(500).json({
                    success : false ,
                    message : "Failed Insert Data"
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
                result
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