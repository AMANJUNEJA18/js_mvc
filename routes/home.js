const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.send('Welcome to the next level eCart')
})

module.exports = router;