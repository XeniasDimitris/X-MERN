const express = require('express');
const app = express();
const actualtotalloadRouter = require('./routes/actualtotalload');
const customerRouter = require('./routes/customer');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv'); 
dotenv.config(); // Etsi mporoume na xrisimopoiisoume tis metablites tou .env

app.use(bodyParser.json()) 

app.use((req,res,next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl} =>`,req.body);
    next(); 
});

app.use(express.static(path.join(__dirname, 'public'))); // public is static folder MIDDLEWARE

app.use('/energy/api/ActualTotalLoad', actualtotalloadRouter);
app.use(customerRouter);

app.use((req,res,next)=>{
    res.status(404).send('You have inserted wrong url');
});


const PORT = process.env.PORT || 8765;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
});


