const db = require('../db')

const createCreditTable = () => {

    const sql = `
        CREATE TABLE IF NOT EXISTS credit(
            id INT PRIMARY KEY AUTO_INCREMENT ,
            salesId INT NOT NULL ,
            customerId INT NOT NULL ,
            creditAmount DECIMAL(12 , 2) NOT NULL,
            paidAmount DECIMAL(12 , 2) DEFAULT 0,
            dueDate DATETIME DEFAULT CURRENT_TIMESTAMP ,

            FOREIGN KEY (salesId) REFERENCES sales(id),
            FOREIGN KEY (customerId) REFERENCES user(id)
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