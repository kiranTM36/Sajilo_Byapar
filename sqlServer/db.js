const mysql2 = require('mysql2')

const dbConfig = {
        host : "localhost",
        user : 'root',
        password : ""
    }

const conn = mysql2.createConnection(dbConfig)

conn.query(
    "CREATE DATABASE IF NOT EXISTS sajilo_Byapar",
    (err) => {
         if(err){
            console.log("Database creation failed:", err);
            return;
         }
         console.log("Database created successfully");

        conn.end();
    }
    
)

const db = mysql2.createPool({
    ...dbConfig ,
    database : "sajilo_Byapar"
})

module.exports = db