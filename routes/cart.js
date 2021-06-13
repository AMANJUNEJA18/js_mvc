const express = require('express')
const router = express.Router()
const _ = require('lodash');

const Joi = require('joi')

function validator(title) {
    const schema = {
        name: Joi.string().min(3).required
    }
    return Joi.validate(name, schema);
}

// const courses = [
//     { id: 1, title: 'couses1' },
//     { id: 2, title: 'couses3' },
// ]
const carts = [
    {id: 1, name: 'A', price: 30, quant: 3, multiple: 3, discount: 10},
    {id: 2, name: 'B', price: 20, quant: 2, multiple: 2, discount: 10},
    {id: 3, name: 'C', price: 50, quant: 1, multiple: 5, discount: 10},
    {id: 4, name: 'D', price: 15, quant: 1, discount: 10}
]
router.get('/', (req, res) => {
    let finalCart = {};
    finalCart["products"] = [];
      for (let i of carts) {
          const item = {};
          item["name"] = i["name"];
          item["amount"]= i["price"] * i["quant"];
          item["discountAmt"] = 0;
          if (i.quant === i.multiple) {
              item["discountAmt"]= (item["amount"] * i["discount"])/100;
          }
          finalCart.products.push(item);
      }
      totalAmount = _.sumBy(finalCart["products"],'amount');
      totalDiscount = _.sumBy(finalCart["products"],'discountAmt');
      if (totalAmount > 150) {
          totalDiscount +=20
      } 
      finalCart["totalDiscount"] = totalDiscount;
      finalCart["totalAmount"] = totalAmount - totalDiscount;
      
    res.send(finalCart)
})

router.get('/:id', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id))
    if (!cart) res.send(404, 'Course Not found');
    res.send(cart)
})

router.post('/', (req, res) => {
    const { error } = validator(req.body)
    if (error) res.send(400, error.details);
    const cart = {
        id: carts.length + 1,
        title: req.body.name
    }
    carts.push(cart)
    res.send(cart);
})

module.exports = router;