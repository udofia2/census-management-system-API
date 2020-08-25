const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/default')
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))