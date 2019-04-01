const mongoose = require('mongoose');

var Test = mongoose.model('Test',{
    text: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = {Test}