const db = require('../db');

const createSalesTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS sales (
            id INT PRIMARY KEY AUTO_INCREMENT,
            customerId INT,
            totalAmount DECIMAL(12, 2) NOT NULL,
            paidAmount DECIMAL(12, 2) DEFAULT 0,
            remainingAmount DECIMAL(12, 2) DEFAULT 0,
            paymentStatus ENUM('PAID', 'PARTIAL', 'CREDIT') DEFAULT 'PAID',
            saleDate DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (customerId) REFERENCES customer(id)
        )
    `;

    db.query(sql, err => {
        if (err) {
            console.log("FAILED TO CREATE SALES TABLE", err);
            return;
        }

        console.log("SALES TABLE CREATED SUCCESSFULLY");
    });
};

module.exports = createSalesTable;