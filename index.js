
const express = require("express");
const authorization = require('./middleware/authentication')
const config =  require('config')
const products = require('./routes/products')
const cart = require('./routes/cart')
const home = require('./routes/home')

const app = express()
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000

app.use(express.json())
app.use(authorization.auth)
app.use('/api/products', products)
app.use('/api/cart', cart)
app.use('/', home)

console.log('appliation env is .... ' + config.get('name'))

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});