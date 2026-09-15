const db = require('../db');

const createCustomerTable = () => {

    const sql = `
       CREATE TABLE IF NOT EXISTS user (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userName VARCHAR(100) NOT NULL,
            phoneNo VARCHAR(10) NOT NULL UNIQUE,
            email VARCHAR(50) UNIQUE ,
            role ENUM('ADMIN','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
            password VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(sql, (err) => {

        if (err) {
            console.log("User table creation failed:", err);
            return;
        }

        console.log("USER TABLE CREATED SUCCESSFULLY");
    });
};

module.exports = createCustomerTable;