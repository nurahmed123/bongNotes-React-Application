const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: "bong zsdgdf",
        email: "hsdgkjhd@gmail.com",
        password: "fuck your system",
        subscriber: 10000000
    }
    res.json(obj)
})

module.exports = router