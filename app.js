const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/default')
require('./config/db')()
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/citizen', require('./api/routes/citizen.route'))
app.use('/api/v1/admin', require('./api/routes/admin.route'))
app.use('/api/v1/', require('./api/routes/product.router'))
app.use('/api/v1/', require('./api/routes/order.router'))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))