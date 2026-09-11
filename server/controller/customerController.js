const customerModel = require('../modules/customerModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const addCustomer = async(req , res) => {
    try {
        const data = req.body
        const newCustomer = await customerModel(data)
        const response = await newCustomer.save()

        res.status(200).json({
            message : "New Customer Added" ,
            response 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const customerLogin = async(req , res) => {
    try {
        const data = req.body

        const customer = await customerModel.findOne({phoneNo : data.phoneNo})

        if(!customer){
            return res.status(404).json({
                message : "Invalid Phone Number"
            })
        }

        const isMatch = await bcrypt(data.password , customer.password)

        if(!isMatch){
            return res.status(404).json({
                message : "Invalid Password"
            })
        }

        const token = jwt.sign({id : customer._id , phoneNo : customer.phoneNo} , 'sajiloBcrypt', {
            expiredIn : '30d'
        })

        console.log('token')

        res.status(200).json({
            message : "Login Successful",
            token : token , 
        })
        
    } catch (error) {
        
    }
}

const getCustomer = async (req , res) => {
    try {
        const response = await customerModel.find()

        if(response.length === 0){
            return res.status(404).json({
                message : "No User Registered"
            })
        }

        res.status(200).json({
            message : "List Of Customer",
            customer : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const getSingleCustomer = async (req , res) => {
    try {
        const response = await customerModel.findById(req.params.id)

        if(!response){
            return res.status(404).json({
                message : "No User Registered"
            })
        }

        res.status(200).json({
            message : "Customer Found",
            customer : response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const deleteCustomer = async (req , res) => {
    try {
        const response = await customerModel.findByIdAndDelete(req.params.id)

        if(!response){
            return res.status(404).json({
                message : "No User Registered"
            })
        }

        res.status(200).json({
            message : "Customer Deleted",
            customer : response
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const editCustomer = async (req , res) => {
    try {
        const response = await customerModel.findByIdAndUpdate(req.params.id , req.params.body , {
            new : true , runValidators : true
        })

        if(!response){
            return res.status(404).json({
                message : "No User Registered"
            })
        }

        res.status(200).json({
            message : "Customer Deleted",
            customer : response
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

module.exports = { addCustomer , getCustomer , getSingleCustomer , deleteCustomer , editCustomer }