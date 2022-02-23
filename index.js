const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const { Snare, snareSchema } = require('./models/snareModel')
// const snareSeed = require('./seed')
const app = express();

mongoose.connect('mongodb://localhost:27017/snareDrums', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('CONNECTED TO MONGO DB')
    })
    .catch((err) => {
        console.log('Something went wrong trying to connect')
        console.log(err)
    })

// set up view engine - ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// set up form req.body - url-encoded..
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))

//make routes to the following endpoints:
//      home.ejs    .get /
//      index.ejs   .get /products     
//      show.ejs    .get /products/:id               
//      edit.ejs    .get /products/:id/edit          
//      new.ejs     .get /products/new
//                  .post /products
//                  .put /products/:id
//                  .delete /products/:id

// const categories = [ 'maple', 'birch', 'steel', 'brass']

// async function returnAllProducts() {
//     try {
//         const allProducts = await Snare.find({});
//         for (let item of allProducts){
//             if(categories.indexOf(item.material) === -1){
//                 categories.push(item.material);
//             }
//         }
//         console.log(categories);
//         return categories;
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// returnAllProducts();

// let categories = [];
// for (let item of snareSeed){
//     if(categories.indexOf(item.material) === -1){
//         categories.push(item.material);
//     }
// }



app.get('/', async (req, res) => {
    const allProducts = await Snare.find({});
    let categories = [];
    for (let item of allProducts){
        if(categories.indexOf(item.material) === -1){
            categories.push(item.material);
        }
    }
    res.render('home', { categories })
})

app.get('/products', async (req, res) => {
    const { material } = req.query;
    if(material){
        const products = await Snare.find({material});
        res.render('index', { products, material});
    } else {
        const products = await Snare.find({});
        console.log(products);
        res.render('index', { products, material: 'All' });
    }
})

app.get('/products/new', async (req, res) => {
    const schemaObj = snareSchema.obj;
    res.render('new', { schemaObj });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = await Snare.findById(id);
    console.log(product)
    res.render('show', { product });
})

app.post('/products/new', async (req, res) => {
    console.log(req.body);
    const body = req.body
    const bodyFormatted = {
        manufacturer: body.manufacturer,
        material: body.material,
        diameter: body.diameter,
        depth: body.depth,
        catergory: [body.category1, body.category2],
        quantity: {
            instore: body.qtyInStore,
            online: body.qtyOnLine
        },
        price: body.price
    }
    const newProduct = new Snare(bodyFormatted);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit', async(req, res) => {
    const { id } = req.params;
    const schemaObj = snareSchema.obj;
    const foundSnare = await Snare.findById(id);
    res.render('edit', { foundSnare, schemaObj })
})

app.put('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Snare.findByIdAndUpdate(id, req.body);
    res.redirect(`/products/${id}`)
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Snare.findByIdAndDelete(id);
    res.redirect('/products')
})


app.listen('3000', () => {
    console.log('App is listening on port 3000')
})