const express = require('express')
const router = express.Router()

const Joi = require('joi')

function validator(name) {
    const schema = {
        name: Joi.string().min(3).required
    }
    return Joi.validate(name, schema);
}

const products = [
    {id: 1, name: 'A', price: 30, quantity: 1, multiple: 5, discount: 10},
    {id: 2, name: 'B', price: 20, quantity: 5, multiple: 5, discount: 10},
    {id: 3, name: 'C', price: 50, quantity: 1, multiple: 5, discount: 10},
    {id: 4, name: 'D', price: 15, quantity: 5, multiple: 5, discount: 10}
]


router.get('/', (req, res) => {
    res.send(products)
})

router.get('/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id))
    if (!product) res.send(404, 'product Not found');
    res.send(product)
})

router.route('/new').post((req, res) => {
    const { error } = validator(req.body)
    if (error) res.send(400, error.details);
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        multple: req.body.multiple,
        discount: req.body.discount
    }
    products.push(product)
    res.send(product);
})

module.exports = router;