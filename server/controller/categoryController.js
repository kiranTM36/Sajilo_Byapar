const categoryModel = require('../modules/categoryModel')

const addCategory = async (req , res) => {
    try {
        const data = req.body
        const newCategory = await categoryModel(data)
        const response = await newCategory.save()
        
        res.status(200).json({
            message : "New Category Added" ,
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const getCategory = async (req , res) => {
    try {
        const response = await categoryModel.find()

        if(response.length === 0 ){
            return res.status(404).json({
                message : "No Category Available",
            })
        }

        res.status(200).json({
            message : "Category List" ,
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const deletecategory = async (req , res) => {
    try {
        const {id} = req.params

        const category = await categoryModel.findById(id)

        if(!category){
            return res.status(404).json({
                message : "category Not Found"
            })
        }

        const response = await categoryModel.findByIdAndDelete(id)

        res.status(200).json({
            message : "category Deleted Sucessfully",
            response
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const updateCategory = async (req , res) => {
    try {
        const {id} = req.params

        const category = await categoryModel.findById(id)

        if(!category){
            return res.status(404).json({
                message : "Category Not Found"
            })
        }

        const data = req.body

        const response = await categoryModel.findByIdAndUpdate(id , data , {
            new : true , runValidators : true
        })

        res.status(200).json({
            message : "Data Updated Sucessfully",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

module.exports = { addCategory , getCategory , deletecategory , updateCategory }