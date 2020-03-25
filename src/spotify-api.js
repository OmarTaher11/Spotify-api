const express = require('express')
 require('../src/db/mongoose')
const userRouter = require('./routers/user')
const app = express()
app.use(express.json())
app.use(userRouter)

app.listen(3000,()=>{
    console.log("server is up")
})