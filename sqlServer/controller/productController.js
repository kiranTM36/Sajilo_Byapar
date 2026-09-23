const db = require('../db')

const addProduct =  (req, res) => {
    try {
        const {
            productName,
            price,
            description,
            categoryId
        } = req.body

        if (!req.file) {
            return res.json({
                message: "Please Proide Image"
            })
        }
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

const getProduct =  (req, res) => {
    try {
        const sql = `
            SELECT 
    p.id,
    p.productName,
    p.price,
    p.image,
    p.description,
    c.id AS categoryId,
    c.categoryName
FROM product p
INNER JOIN category c
ON p.categoryId = c.id;
        `
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(401).json({
                    message: "SQL Error",
                    success: false
                })
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: "Product Not Found",
                    success: false
                })
            }
            res.status(200).json({
                message: "List of All Product",
                success: true,
                products: result
            })
        })
    } catch (error) {
        console.log(err);

    }
}
const getSingleProduct = (req, res) => {
    const {
        id
    } = req.params
    const sql = `
            SELECT 
    p.id, 
    p.productName, 
    p.price, 
    p.image, 
    p.description, 
    c.id AS categoryId, 
    c.categoryName
FROM product p
INNER JOIN category c ON p.categoryId = c.id
WHERE p.id = ?;

        `

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                success: false,
                message: "SQL Error"
            })
        }
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product Found",
            product: result[0]
        })
    })
}

const deleteProduct = (req, res) => {
    try {
        const {
            id
        } = req.params

        const sql = `
        DELETE FROM product WHERE id=?
    `

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.log("Error", err)
                return res.status(401).json({
                    message: "Error",
                    success: false
                })
            }
            if (result.affectedRows === 0) {
                console.log("No product Available")
                return res.status(404).json({
                    message: "No product Available",
                    success: false
                })
            }

            console.log(result[0])
            res.status(200).json({
                message: "Product Deleted",
                success: true
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addProduct,
    getSingleProduct,
    getProduct,
    deleteProduct
}