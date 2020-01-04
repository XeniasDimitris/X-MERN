const express = require('express');
const mongoose = require('mongoose');

exports.connectDb = ()=> {
    // mongoose
    // .connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@clusrer0-qoe0y.gcp.mongodb.net/X-MERN?retryWrites=true&w=majority`,
    // { useNewUrlParser: true ,useUnifiedTopology: true });
    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function() {
    //     console.log("Database Connected");
    // });
    mongoose
    .connect(`mongodb://localhost:27017/test`,
    { useNewUrlParser: true ,useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Database Connected");
    });
};
