const db = require('../db')

const getAllCreditor = (req , res) => {
    try {
        const sql = `
            SELECT c.id , c.creditAmount, c.paidAmount , c.dueDate FROM credit c INNER JOIN sales s c.salesId = s.id
        `
    } catch (error) {
        
    }
}