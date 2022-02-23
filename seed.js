const mongoose = require('mongoose');
const { Snare } = require('./models/snareModel')

mongoose.connect('mongodb://localhost:27017/snareDrums', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection made');
    })
    .catch((err) => {
        console.log('Something went wrong');
    })

const snareSeed = [
    {
        manufacturer: 'Pearl',
        material: 'Maple',
        diameter: 14,
        depth: 5,
        price: 250,
        category: ['sizzle', 'warm'],
        quantity: {
            instore: 5,
            online: 66
        }
    },
    {
        manufacturer: 'Sonor',
        material: 'Birch',
        diameter: 12,
        depth: 4,
        price: 450,
        category: ['heavy', 'rock'],
        quantity: {
            instore: 7,
            online: 55
        }
    },
    {
        manufacturer: 'Gretch',
        material: 'Brass',
        diameter: 14,
        depth: 6,
        price: 250,
        category: ['smooth', 'jazz'],
        quantity: {
            instore: 18,
            online: 22
        }
    },
    {
        manufacturer: 'Yamaha',
        material: 'Steel',
        diameter: 13,
        depth: 5,
        price: 250,
        category: ['gadd', 'steve'],
        quantity: {
            instore: 12,
            online: 88
        }
    },
    {
        manufacturer: 'DW',
        material: 'Titanium',
        diameter: 14,
        depth: 7,
        price: 250,
    },
    {
        manufacturer: 'Gretch',
        material: 'Maple',
        diameter: 13,
        depth: 7,
        price: 650,
        category: ['cool', 'deep'],
        quantity: {
            instore: 6,
            online: 55
        }
    },
    {
        manufacturer: 'Brady',
        material: 'Birch',
        diameter: 14,
        depth: 3,
        price: 850,
        category: ['Two', 'Princes'],
        quantity: {
            instore: 0,
            online: 1
        }
    },
    {
        manufacturer: 'DW',
        material: 'Brass',
        diameter: 14,
        depth: 6,
        price: 250,
        category: ['D', 'W'],
        quantity: {
            instore: 16,
            online: 23
        }
    },
    {
        manufacturer: 'Mapex',
        material: 'Steel',
        diameter: 12,
        depth: 3,
        price: 350,
        category: ['Piccolo'],
        quantity: {
            instore: 12,
            online: 88
        }
    },
    {
        manufacturer: 'Tama',
        material: 'Titanium',
        diameter: 14,
        depth: 7,
        price: 550,
    }
]



Snare.insertMany(snareSeed);

module.exports = snareSeed

