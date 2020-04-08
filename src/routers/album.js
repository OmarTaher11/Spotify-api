const express = require('express')
const Album = require('../models/album')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = new express.Router()
//Get album by ID
router.get('/album/:id',async (req,res)=>{
    try{
        const album= await Album.findById(req.params.id)
        if(!album){
            return res.status(400).send({
                "success": false,
                "Message":"Their is no such album with this id."
                })
        } 
        res.send(album)
    }catch(e){
        res.status(400).send({
            "success": false,
            "Message":"The header status code is an error code."
            })
    }
})
// Get Multiple Albums
router.get('/album',async (req,res)=>{
    try{
        const album= await Album.find({}).limit(20)
        if(!album){
            return res.status(400).send({
                "success": false,
                "Message":"The header status code is an error code."
                })
        } 
        res.send(album)
    }catch(e){
        res.status(400).send({
            "success": false,
            "Message":"The header status code is an error code."
            })
    }
})
module.exports=router


