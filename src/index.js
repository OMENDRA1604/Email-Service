require('dotenv').config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post('/send', (req , res) => {
    
});


app.listen(PORT , () => console.log(`Server started at PORT : ${PORT}`));