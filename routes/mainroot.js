const express = require('express')
const router = express.Router()
const path = require('path')

router.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
    console.log("Route has been accessed.");
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});




module.exports = router