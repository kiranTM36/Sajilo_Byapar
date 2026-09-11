const adminModel = require('../modules/adminModule')

const addAdmin = async (req , res) => {
    try {
        const data = req.body
        const newAdmin = await adminModel(data)

        const response = await newAdmin.save()

        res.status(200).json({
            message : "New Admin Added" , 
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const adminLogin = async(req , res) => {
    try {
        const data = req.body

        const admin = await adminModel.findOne({email : data.email})

        if(!admin){
            return res.status(404).json({
                message : "Invalid Phone Number"
            })
        }

        const isMatch = await bcrypt(data.password , admin.password)

        if(!isMatch){
            return res.status(404).json({
                message : "Invalid Password"
            })
        }

        const token = jwt.sign({id : admin._id , email : admin.email} , 'sajiloBcrypt', {
            expiredIn : '30d'
        })

        console.log('token')

        res.status(200).json({
            message : "Login Successful",
            token : token , 
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const deleteAdmin = async (req , res) => {
    try {
        const {id} = req.params

        const user = await adminModel.findById(id)

        if(!user){
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        const response = await adminModel.findByIdAndDelete(id)

        res.status(200).json({
            message : "Admin Deleted Sucessfully",
            response
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const getAdmmin = async (req , res) => {
    try {
        const response = await adminModel.find()

        if(response.length === 0) {
            return res.status(404).json({
                message : "No Admin is Listed"
            })
        }

        res.status(200).json({
            message : "List of All Admins",
            response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Server Error"
        })
    }
}

const updateAdmin = async (req , res) => {
    try {
        const {id} = req.params

        const user = await adminModel.findById(id)

        if(!user){
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        const data = req.body

        const response = await adminModel.findByIdAndUpdate(id , data , {
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

module.exports = { addAdmin , deleteAdmin , getAdmmin , updateAdmin }