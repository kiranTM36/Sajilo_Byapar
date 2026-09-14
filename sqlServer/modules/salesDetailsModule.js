const db = require('../db')

const createSalesDetailsTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS sale_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        salesId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        subtotal DECIMAL(12, 2) NOT NULL,

        FOREIGN KEY (salesId) REFERENCES sales(id),
        FOREIGN KEY (productId) REFERENCES product(id)
    );
    `;

    db.query(sql , err => {
        if(err){
            console.log('FAILED TO CREATE SALES DETAILS TABLE');
            return            
        }
        console.log('SALES DETAILS TABLE CREATED SUCCESSFULLY');
        
    })
}

module.exports = createSalesDetailsTable