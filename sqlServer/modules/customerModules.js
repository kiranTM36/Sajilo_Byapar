const db = require('../db');

const createCustomerTable = () => {

    const sql = `
        CREATE TABLE IF NOT EXISTS customer (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userName VARCHAR(100) NOT NULL,
            phoneNo VARCHAR(10) NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER'
        )
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