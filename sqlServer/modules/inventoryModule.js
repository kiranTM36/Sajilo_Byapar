const db = require('../db');

const createInventoryTable = () => {

    const sql = `
        CREATE TABLE IF NOT EXISTS inventory (
            id INT PRIMARY KEY AUTO_INCREMENT,
            productId INT NOT NULL UNIQUE,
            quantity INT NOT NULL DEFAULT 0,

            FOREIGN KEY (productId) REFERENCES product(id)
        )
    `;

    db.query(sql, err => {
        if (err) {
            console.log("FAILED TO CREATE INVENTORY TABLE", err);
            return;
        }

        console.log("INVENTORY TABLE CREATED SUCCESSFULLY");
    });
};

module.exports = createInventoryTable;