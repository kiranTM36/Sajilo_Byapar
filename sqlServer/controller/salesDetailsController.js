const db = require("../db")

const getSingleSalesitem = (req , res) => {
    try {
        const {id} = req.params

        const sql = `SELECT s.* ,s.id as saleId,u.* FROM sales s join user u on s.customerId = u.id  where customerId = ?`

        db.query(sql,[id], (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : "SQL error"
                })
            }

            res.status(200).json({
                message : "Expenses List",
                sale : result
            })
        })
    } catch (error) {
        
    }
}


module.exports = {getSingleSalesitem}