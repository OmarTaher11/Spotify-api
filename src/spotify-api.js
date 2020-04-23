const express = require('express')
const cors = require("cors")

require('../src/db/mongoose')
const userRouter = require('./routers/user')
const followRouter = require('../src/routers/follower')
const app = express()
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(followRouter)


app.listen(3003,()=>{
    console.log("server is up")
})