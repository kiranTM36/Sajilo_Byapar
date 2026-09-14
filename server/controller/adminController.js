const adminModel = require('../modules/adminModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Add Admin
const addAdmin = async (req, res) => {
    try {
        const data = req.body

        const newAdmin = new adminModel(data)

        const response = await newAdmin.save()

        res.status(200).json({
            message: "New Admin Added",
            response
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Login
const adminLogin = async (req, res) => {
    try {
        const data = req.body

        const admin = await adminModel.findOne({
            email: data.email
        })

        if (!admin) {
            return res.status(404).json({
                message: "Invalid Email"
            })
        }

        const isMatch = await bcrypt.compare(
            data.password,
            admin.password
        )

        if (!isMatch) {
            return res.status(404).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },
            'sajiloBcrypt',
            {
                expiresIn: '30d'
            }
        )

        res.status(200).json({
            message: "Login Successful",
            token: token
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const user = await adminModel.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const response = await adminModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Admin Deleted Successfully",
            response
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Get All Admin
const getAdmmin = async (req, res) => {
    try {
        const response = await adminModel.find()

        if (response.length === 0) {
            return res.status(404).json({
                message: "No Admin is Listed"
            })
        }

        res.status(200).json({
            message: "List of All Admins",
            response
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Update Admin
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const user = await adminModel.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const data = req.body

        const response = await adminModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            message: "Data Updated Successfully",
            response
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


module.exports = {
    addAdmin,
    deleteAdmin,
    getAdmmin,
    updateAdmin,
    adminLogin
}