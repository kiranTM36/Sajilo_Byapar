const db = require('../db')

const createCategory = ( req, res ) => {
    try {
        const data = req.body

        const sql = `
            INSERT INTO category
            (categoryName) VALUES (?)
        `

        const values = [
            data.categoryName
        ]

        db.query(sql, values , (err  , result) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    message : "Failed to add category"
                })
            }
            res.status(200).json({
                message : "New Category Successfully Added" ,
                result
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}

const getAllCategory = (req , res) => {
    try {

        const sql =`SELECT * FROM category`

        db.query(sql , (err , result) => {
            if(err){
                console.log("Failed to fetch category" , err);
                return res.status(500).json({
                    message : "Failed to fetch data"
                })
            }
            if(result.length === 0){
                return res.status(404).json({
                    message : "NO data Available"
                })
            }
            res.status(200).json({
                message : "List of all Category",
                categorys : result
            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}

module.exports = { createCategory , getAllCategory }