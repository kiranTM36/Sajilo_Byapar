const db = require('../db')

const createCategoryTable = () => {

    const sql = `
     CREATE TABLE IF NOT EXISTS category (
        id INT PRIMARY KEY AUTO_INCREMENT , 
        categoryName VARCHAR(30) NOT NULL 
     )
    `;

    db.query(sql , err => {
        if(err){
            console.log("FAILED TO CREATE CATEGORY TABLE" , err);
            return
        }
        console.log('CATEGORY TABLE CREATE SUCCESSFULLY');
        
    })
}

module.exports = createCategoryTable