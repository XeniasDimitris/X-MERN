const express = require('express');
const app = express();
const server = require('./bin/server');
const userRouter = require('./routes/user');
const ActualTotalLoadRouter = require('./routes/ActualTotalLoad');
const AggregatedGenerationPerTypeRouter = require('./routes/AggregatedGenerationPerType');
const DayAheadTotalLoadForecastRouter = require('./routes/DayAheadTotalLoadForecast');
const ActualvsForecastRouter = require('./routes/ActualvsForecast')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./bin/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocs = require('./openapi.yaml');

const swaggerOptions = {
    swaggerDefinition:{
    "openapi": "3.0.1",
    "info": {
        "title": "X-MERN API information",
        "description": "This is the OpenAPI 3.0 Specification for the RESTful API server made by X-MERN. The server hosts data from entso-e about the electrical energy consumed in Europe and provide them to the users of the server.",
        "version": "1.0.0"
    },
    "servers": [
        {
        "url": "https://localhost:8765/"
        }
    ],
    "tags": [
        {
        "name": "ActualTotalLoad",
        "description": "The actual Energy that was consumed"
        },
        {
        "name": "DayAheadTotalLoadForecast",
        "description": "The forecast of Energy to be consumed the next day"
        },
        {
        "name": "AggregatedGenerationPerType",
        "description": "Shows from which source the energy has came for"
        },
        {
        "name": "ActualvsForecast",
        "description" : "Shows the differences between ActualTotalLoad and DayAheadTotalLoadForecast for a day"   
        },{
        "name" : "user",
        "description" : "All about users"
        }
    ],},
    apis: ['./routes/*.js'],
    components: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//This enables to use environment variables from .env file
require('dotenv').config();


//We create the HTTPS Server
server.createServer(app);
db.connectDb();

//This enables the CORS, so as to allow clients from different sockets to read our responses
app.use(cors());

// This tool prints useful informations on terminal for the incoming requests (logger)
app.use(morgan('dev'));

// This tool enables to read the body of Requests (false for small bodies, true for extended)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//Initialize the routers of our app
app.use('/',userRouter);
app.use('/energy/api/ActualTotalLoad',ActualTotalLoadRouter);
app.use('/energy/api/AggregatedGenerationPerType',AggregatedGenerationPerTypeRouter);
app.use('/energy/api/DayAheadTotalLoadForecast',DayAheadTotalLoadForecastRouter);
app.use('/energy/api/ActualvsForecast',ActualvsForecastRouter);

//No router activated and so we dont have a valid route
app.use((req,res,next)=>{
    const error = new Error('Bad request');
    error.status = 400;
    next(error);
});

// Error handler
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

