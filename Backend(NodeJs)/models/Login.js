const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const LoginSchema = mongoose.Schema({
    userName: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    user_cart: { 
        type: Array,
        "default" : [] 
    },
});

LoginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', LoginSchema);