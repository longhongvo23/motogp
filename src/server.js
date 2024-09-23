require('dotenv').config()

const express = require('express')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')

configViewEngine(app)

const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

//khai bao route
app.use('/', webRoutes)


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
