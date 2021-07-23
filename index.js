//Initialize environment variables
require('dotenv').config()
//Require express from the installed node modules
const express = require('express')
//Instantiate express app
const app = express()
const routes = require('./routes/routes')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(`/api/${process.env.APP_VERSION}`, routes)

//Set port from environment variable or set 5000 if not found
//+ sign converts the port to number since all env values are string
const port = +process.env.APP_PORT || 6000
//Start the express app on the given port
//Callback function defines action to be done by the express app upon start
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
