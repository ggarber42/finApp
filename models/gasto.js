const mongoose = require('mongoose');

let Gasto = mongoose.model('Gasto',{
    valor: {
        type: Number,
        required: true,
        trim: true
    },
    mes: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        trim: true
    },
    observacao: {
        type: String,
        trim: true
    }
})

module.exports = {Gasto}