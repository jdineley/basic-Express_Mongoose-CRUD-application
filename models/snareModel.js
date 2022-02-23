const mongoose = require('mongoose');

const snareSchema = mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    diameter: {
        type: Number,
        enum: [10, 12, 13, 14],
        required: true
    },
    depth: {
        type: Number,
        enum: [3, 4, 5, 6, 7],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [50, 'I aint giving it away!']
    },
    categories: {
        type: [String],
        default: ['Cracking', 'Sweet']
    },
    quantity: {
        instore: {
            type: Number,
            default: 0
        },
        online: {
            type: Number,
            default: 0
        }
    }
})


const Snare = mongoose.model('Snare', snareSchema )

module.exports = {Snare, snareSchema}