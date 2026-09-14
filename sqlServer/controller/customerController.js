const db = require('../db');

const createUser = (req, res) => {
    try {
        const data = req.body;
        
        const sql = `
        INSERT INTO customer
        (userName, phoneNo, role, password, createdAt) VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            data.userName,
            data.phoneNo,
            data.role,
            data.password,
            data.createdAt
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log("FAILED TO INSERT DATA", err);
                return res.status(500).json({ success: false, message: "Failed to insert data", error: err });
            }
            
            return res.status(201).json({
                success: true,
                message: "Customer created successfully",
                customerId: result.insertId
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAllCustomer = (req, res) => {
    try {
        const sql = `SELECT * FROM customer`;

        db.query(sql, (err, result) => {
            if (err) {
                console.log("FAILED TO FETCH DATA", err);
                return res.status(500).json({ success: false, message: "Failed to fetch data", error: err });
            }
           
            return res.status(200).json({
                success: true,
                message: "List of all customers",
                data: result
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getSingleCustomer = (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM customer WHERE id = ?`;

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.log("FAILED TO FETCH DATA", err);
                return res.status(500).json({ success: false, message: "Failed to fetch data", error: err });
            }
            
            if (result.length <= 0) {
                return res.status(404).json({ success: false, message: "No customer available" });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Customer found",
                    data: result[0]
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createUser, getAllCustomer, getSingleCustomer };