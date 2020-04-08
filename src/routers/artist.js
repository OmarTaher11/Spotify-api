const express = require('express')
const Artist=require('../models/artist')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = new express.Router()

router.get('/artist',async (req,res)=>{
    try{
        const artist= await Artist.find({})
        if(!artist){
            return res.status(400).send({ success: false, Message: 'The header status code is an error code'})
        }
        res.send(artist)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/artist/:id', async(req,res)=>{
        try{
        const artist= await Artist.findById(req.params.id)
        if(!artist){
            res.status(400).send({ success: false, Message: 'The header status code is an error code'})
        }
        res.send(artist)
    }catch(e){
    
        res.status(400).send(e)
    }
})



module.exports=router