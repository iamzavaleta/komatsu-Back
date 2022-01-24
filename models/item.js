const {Schema, model} = require('mongoose')

const ItemSchema = Schema({
    os: {
        type: Number,
        required: true
    },
    clasificacion: {
        type: String,
        enum: ['evaluado', 'repuesto', 'base', 'compra local']
    },
    descripcion: {
        type: String
    },
    bloque: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E']
    },
    columna: {
        type: String,
        enum: [1, 2, 3, 4]
    },
    fila: {
        type: String,
        enum: [1, 2, 3, 4, 5, 6]
    },
    lado: {
        type: String,
        enum: ['D', 'I', 'U']
    }
})

module.exports = model('Item', ItemSchema);