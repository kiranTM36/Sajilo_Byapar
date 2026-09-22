const db = require('../db');
const jwt = require('jsonwebtoken')


const createUser = (req, res) => {
    try {
        const data = req.body;
        
        const sql = `
        INSERT INTO user
        (userName, phoneNo, password, email) VALUES (?, ?, ?, ?)
        `;

        const values = [
            data.userName,
            data.phoneNo,
            data.password,
            data.email
        ];

        db.query(sql, values , (err, result) => {
            if (err) {
                console.log("FAILED TO INSERT DATA", err);
                return res.status(500).json({ 
                    success: false, 
                    message: "Failed to insert data", error: err 
                });
            }
            
            return res.status(201).json({
                success: true,
                message: "user created successfully",
                result
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

const getAllUser = (req, res) => {
    try {
        const sql = `SELECT * FROM user`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log("FAILED TO FETCH DATA", err);
                return res.status(500).json({ 
                    success: false, 
                    message: "Failed to fetch data", error: err 
                });
            }

            if(result.length === 0){
                return res.status(404).json({ 
                    success: false, 
                    message: "No customer Found"
                });
            }
           
            return res.status(200).json({
                success: true,
                message: "List of all customers",
                data: result
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });
    }
};

const getSingleUser = (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM customer WHERE id = ?`;

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.log("FAILED TO FETCH DATA", err);
                return res.status(500).json({ 
                    success: false, 
                    message: "Failed to fetch data", error: err 
                });
            }
            
            if (result.length === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: "No customer available" 
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Customer found",
                    user: result[0]
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" });
    }
};

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;

        const sql = `DELETE FROM user WHERE id = ?`;

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Customer deleted successfully"
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getAllCustomer = (req, res) => {
    try {
        const sql = `
            SELECT id, userName, phoneNo, role
            FROM user
            WHERE role = 'CUSTOMER'
        `;

        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No Customer Found",
                    customers: []
                });
            }

            return res.status(200).json({
                success: true,
                message: "List of Customer",
                customers: result
            });
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const userLogin = (req, res) => {
    try {
        const { phoneNo, password } = req.body

        if (!phoneNo || !password) {
            return res.status(400).json({
                message: "Please Enter phoneNo or Password"
            })
        }

        const sql = `
            SELECT * FROM user WHERE phoneNo = ?
        `

        db.query(sql, [phoneNo], (err, result) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Server Error"
                })
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Phone Number not Registered"
                })
            }

            const user = result[0]

            if (password !== user.password) {
                return res.status(400).json({
                    message: "Invalid User"
                })
            }

            const token = jwt.sign(
                {
                    id: user.id, phoneNo: user.phoneNo, role: user.role }, "sajiloEncrypt",{
                    expiresIn: "30d"
                }
            )

            res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60 * 60
                })

            return res.status(200).json({
                message: "Login Successful",
                token : token
            })
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Server Error"
        })
    }
}

module.exports = { createUser, getAllUser, getSingleUser ,deleteUser , getAllCustomer , userLogin};