const express = require('express')
 require('../src/db/mongoose')
const userRouter = require('./routers/user')
const followRouter = require('../src/routers/follower')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(followRouter)


//const html = require()
//const publicDirectoryPath = path.join(__dirname,'../')
//app.use(express.static(publicDirectoryPath))









app.listen(3000,()=>{
    console.log("server is up")
})