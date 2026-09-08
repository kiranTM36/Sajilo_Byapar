const { get } = require('mongoose')
const productModel = require('../modules/productModule')

const addProduct = async ( req , res) => {
    try {
        const { productName , markedPrice , categoryId , description } = req.body
        const image = req.file ? req.filename : ""

        const newProduct =  await productModel({
            productName , 
            markedPrice , 
            categoryId ,
            description , 
            image 
        })

        const response = await newProduct.save()

        res.status(200).json({
            message : "New Product Added",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const getAllProduct = async (req , res) => {
    try {
        const resposne = await productModel.find()

        if(resposne.length === 0 ){
            return res.status(404).json({
                message : "No Product Found",
            })
        }

        res.status(200).json({
            message : "List of All Product" , 
            products : resposne
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const getSingleProduct = async (req , res) => {
    try {
        const { id } = req.params
        const response = await productModel.findById(id)

        if(!response) {
            return res.status(404).json({
                message : "No Product Found"
            })
        }

        res.status(200).json({
            message : "Product Found",
            product : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const deleteProduct = async (req  , res) => {
    try {
        const response  = await productModel.findByIdAndDelete(req.params.id)

        if(!response){
            return res.status(404).json({
                message : "No Product Found"
            })
        }

        res.status(200).json({
            message : "Product Deleted",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const updateProduct = async (req , res) => {
    try {
        const data  = req.body
        const response = await productModel.findByIdAndUpdate( req. params , data , {
            new : true , runValidators : true
        })

        if(!response){
            return res.status(404).json({
                message : "No Product Found"
            })
        }
        res.status(200).json({
            message : "Product Updated",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

module.exports = { addProduct , getAllProduct , getSingleProduct , deleteProduct , updateProduct }