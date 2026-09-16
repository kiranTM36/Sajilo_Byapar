const db = require('../db')

const addProduct = async (req, res) => {
    try {
        const {
            productName,
            price,
            description,
            categoryId
        } = req.body
        const image = req.file ? req.file.filename : null

        const value = [
            productName,
            price,
            description,
            categoryId,
            image
        ]

        const sql = `
            INSERT INTO product 
            (productName , price , description , categoryId , image) VALUES (?,?,?,?,?)
        `

        db.query(sql, value, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Sql Error"
                })
            }
            res.status(200).json({
                message: "New Product Added Successfully",
                result
            })

        })
    } catch (error) {
        res.status(500).json({
            message: "server Error"
        })
    }
}

module.exports = { addProduct }