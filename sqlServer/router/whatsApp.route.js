const express = require("express")
const router = express.Router()

const {
    sendWhatsAppMessage
} = require("../modules/whatsAppModule")

router.post("/send", async (req, res) => {

    try {

        const { phoneNo, message } = req.body

        const result = await sendWhatsAppMessage(
            phoneNo,
            message
        )

        res.status(200).json({
            message: "Message sent",
            result
        })

    } catch (error) {

        console.log(error.response?.data || error.message)

        res.status(500).json({
            message: "Message failed"
        })
    }
})

module.exports = router