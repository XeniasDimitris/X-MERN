const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true,
        max:255,
        min:6
    },
    password: {
        type: String, 
        required: true,
        max:1024,
        min:6
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);