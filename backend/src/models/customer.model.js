const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://XeniasDimitris:XeniasDimitris@cluster0-qoe0y.gcp.mongodb.net/test?retryWrites=true&w=majority')

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Customer',CustomerSchema);