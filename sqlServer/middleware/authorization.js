const db = require("../db");
const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    const token = req.cookies?.TokenByapar;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login",
        });
    }

    try {
        const decoded = jwt.verify(token, 'sajiloEncrypt');

        const sql = "SELECT * FROM user WHERE id = ?";

        db.query(sql, [decoded.id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            req.user = results[0];

            next();
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const authenticate = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login",
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        next();
    };
};

module.exports = { authorize, authenticate };