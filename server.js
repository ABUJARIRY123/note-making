const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/mainroot'))

app.listen(PORT, () => console.log(`The sever is running on port ${PORT}`))