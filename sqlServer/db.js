const mySql = require('mysql2')

const db = mySql.createPool({

    user: "root",

    host: "localhost",

    password: "",

    database: "sajilo_byapar"

})

module.exports = db