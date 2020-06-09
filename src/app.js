const express = require('express')
 require('../src/db/mongoose')
const userRouter = require('./routers/user')
const followRouter = require('../src/routers/follower')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(followRouter) 



module.exports = app