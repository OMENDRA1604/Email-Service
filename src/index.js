require('dotenv').config();

const express = require("express");
const EmailService = require("./EmailService");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.post('/send', async(req , res) => {
    const {id , email , subject , body} = req.body;

    const status = await emailService.sendEmail(id , email , subject , body);

    res.send({status});
    
});


app.listen(PORT , () => console.log(`Server started at PORT : ${PORT}`));