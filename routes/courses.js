const express = require('express')
const router = express.Router()

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

const courses = [
    {id: 1, name: 'A', price: 30, quantity: 1, multiple: 5, discount: 10},
    {id: 2, name: 'B', price: 20, quantity: 5, multiple: 5, discount: 10},
    {id: 3, name: 'C', price: 50, quantity: 1, multiple: 5, discount: 10},
    {id: 4, name: 'D', price: 15, quantity: 5, multiple: 5, discount: 10}
]


router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.send(404, 'Course Not found');
    res.send(course)
})

router.post('/', (req, res) => {
    const { error } = validator(req.body)
    if (error) res.send(400, error.details);
    const course = {
        id: courses.length + 1,
        title: req.body.title
    }
    courses.push(course)
    res.send(course);
})

module.exports = router;