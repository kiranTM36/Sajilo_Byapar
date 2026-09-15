const db = require('../db')

const createCreditTable = () => {

    const sql = `
        CREATE TABLE IF NOT EXISTS credit(
            id INT PRIMARY KEY AUTO_INCREMENT , 
            userId INT NOT NULL ,
            salesId INT NOT NULL ,
            creditAmount DECIMAL(12 , 2) NOT NULL,
            paidAmount DECIMAL(12 , 2) DEFAULT 0,
            dueDate DATE ,
            status ENUM('PENDING', 'PAID', 'PARTIAL') DEFAULT 'PENDING',


            FOREIGN KEY (userId) REFERENCES user(id) ,
            FOREIGN KEY (salesId) REFERENCES sales(id)
        )
    `;

    db.query(sql , err => {
        if(err){
            console.log('FAILED TO CREATE CREDIT TABLE' , err);
            return
        }
        console.log('CREDIT TABLE CREATED SUCCESSFULLY');
        
    })
}

module.exports = createCreditTable