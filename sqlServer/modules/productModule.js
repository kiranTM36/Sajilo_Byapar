const db = require('../db')

const createProductTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS product (
            id INT PRIMARY KEY AUTO_INCREMENT,
            productName VARCHAR(50) NOT NULL ,
            price DECIMAL(12 ,2) NOT NULL ,
            description VARCHAR (1000) ,
            image VARCHAR (1000) NOT NULL ,
            categoryId INT NOT NULL,

            FOREIGN KEY (categoryId) REFERENCES category(id)
        )
    `;
    db.query(sql , err => {
        if(err){
            console.log("FAILED TO CREATE PRODUCT TABLE")
            return
        }
        console.log("PRODUCT TABLE CREATE SUCCESSFULLY")
    })
}

module.exports = createProductTable