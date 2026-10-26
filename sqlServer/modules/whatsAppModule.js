// const axios = require("axios")

// const accessToken = "EAAO5BuxDMI4BSpXKDWwYcb801uCyv4qYmdYwpaFZBZAZA4o4syBZBlJJdVUZAyB6PXiw6si17y4EnBeYJKkshkrZCYtWG4hsGasBpQYJiH0SSCwN2HLho7rddFF4qxsuGl1r8Xr3wVlLZBJVgG3p80BJgMd2PTqUhm3iY1TBp9U2pGfnTnSgQ86FyG5CVLjS0aD0eEJGLHO0DQNDOtRolEejB2oiixRZChwSqHDv70rFVlyXssKW14tYRmTdCa0XdAChJSSZAWFDsOaKyLcH79JPlCHxabwZDZD"
// const phoneNumberId = "1047864314900622"

// const sendWhatsAppMessage = async () => {

//     try {

//         const url =
//             `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`

//         const response = await axios.post(
//             url,
//             {
//                 messaging_product: "whatsapp",
//                 to: "9827364010",
//                 type: "text",
//                 text: {
//                     body: "Hello from Sajilo Byapar"
//                 }
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         )

//         console.log(response.data)

//     } catch (error) {

//         console.log(
//             error.response?.data || error.message
//         )
//     }
// }

// sendWhatsAppMessage()