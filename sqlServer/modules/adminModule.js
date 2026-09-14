const db = require('../db')

const createAdminTable = () => {

    const sql = `
        CREATE TABLE IF NOT EXISTS admin (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userName VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(30) NOT NULL ,
            role VARCHAR(20) NOT NULL DEFAULT 'ADMIN'
        )
    `;

    db.query(sql , err => {
        if(err) {
            console.log("FAILED TO CREATE ADMIN TABLE")
            return
        }
        console.log("ADMIN TABLE CREATE SUCCESSFULLY")
    })
}

module.exports = createAdminTable