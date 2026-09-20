const mySql = require('mysql2')

const db = mySql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "sajilo_byapar"
})

db.connect((err) => {
    if(err){
        console.log("Connection Error : ", err)
    }else{
        console.log("Database Connectred Successfully");
    }
})

module.exports = db