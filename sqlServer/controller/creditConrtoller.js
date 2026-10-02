const db = require('../db')

const getAllCreditor = (req , res) => {
    try {
        const sql = `
            SELECT c.*, c.id as cId, u.* FROM credit c join user u on c.customerId = u.id ;
        `

        db.query(sql ,(err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : 'error',
                    success : false
                })
            }

            res.status(200).json({
                message : "Success",
                success : true,
                credit : result
            })
        })
    } catch (error) {
        
    }
}

module.exports = {getAllCreditor}