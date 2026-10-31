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

const deleteCategory = (req , res) => {
    try {
        const {id} = req.params

        const sql = `
            DELETE FROM category WHERE id=?
        `
        db.query(sql,[id] , (err , result) => {
            if(err){
                return res.status(500).json({
                    success : false ,
                    message : "Failed to delete Category"
                })
            }
            if(result.affectedRows === 0){
                return res.status(404).json({
                    success : false,
                    message : "Category Not Deleted",
                })
            }

            res.status(200).json({
                success : true ,
                message : "Category Deleted Successfully",
                result
            })
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const updateCategory = (req, res) => {
    try {
        const {id} = req.params;

        const {categoryName} = req.body

        const sql = `
            UPDATE category SET categoryName = ? WHERE id = ?
        `

        db.query(sql , [categoryName], (err , result) => {
            if(err){
                return res.status(500).json({
                    success : false ,
                    message : "Failed to Update Category"
                })
            }
            if(result.affectedRows === 0){
                return res.status(404).json({
                    success : false,
                    message : "Category Not Updated",
                })
            }

            res.status(200).json({
                success : true ,
                message : "Category Updated Successfully",
                result
            })
        })
    } catch (error) {
        
    }
}

const getSingleCategory = (req , res) => {
    try {
        const {id} = req.params;

        const sql = `
        SELECT * FROM category WHERE id=?
        `

        db.query(sql , [id] , (err , result) => {
            if(err){
                return res.status(500).json({
                    success : false ,
                    message : "Failed to delete Category"
                })
            }

            res.status(200).json({
                success : true ,
                message : "Category Deleted Successfully",
                category : result[0]
            })
        })
    } catch (error) {
        
    }
}

module.exports = { createCategory , getAllCategory , deleteCategory , updateCategory , getSingleCategory }