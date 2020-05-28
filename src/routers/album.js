const express = require('express')
const Album = require('../models/album')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = new express.Router()

//Get album by ID
router.get('/album/:id',auth, async (req,res)=>{
    try{
        const album = await Album.findById({ _id:req.params.id})
        if(!album){
            return res.status(404).send({
                "success": false,
                "Message":"Their is no such album with this id."
            })
        } 
        res.send(album)
    }catch(e){
        res.status(500).send({
            "success": false,
            "Message":"The header status code is an error code."
            })
    }
})
// Get Multiple Albums
router.get('/album',auth,async (req,res)=>{
    try{
        const album= await Album.find({}).limit(20)
        if(!album){
            return res.status(404).send({
                "success": false,
                "Message":"The header status code is an error code."
                })
        } 
        res.send(album)
    }catch(e){
        res.status(500).send({
            "success": false,
            "Message":"The header status code is an error code."
            })
    }
})
// Add an album
router.post('/album',auth,async(req,res)=>{
    try {
        const album= await new Album(req.body)
        const album2=await Album.find({
                "album_type": req.body.album_type,
                "name":req.body.name
        })
        console.log(album2)
        if(!req.body.album_type || !req.body.name){
            return res.status(400).send({
                "success":false,
                "Message": "Provide all of the required fields (name and album type)"
            })
        }else if(album2==[]){
            return res.status(404).send({
                "success": false,
                "Message": "There is an album with the same name and type"
            })
        }
        album.save()
        res.status(200).send(album)
      }catch (e){
        res.status(500).send({
            "success":false,
            "Message":"The album wasn't created"
        })
    }
})
// Remove Album by name
router.delete('/album/:id',auth,async(req,res)=>{

    try {
        const album2= await Album.findById(req.params.id)
        if(!album2){
            return res.status(404).send({
                "success":false,
                "Message":"There is no album with this id" 
            })

        }
        const album= await Album.findOneAndRemove({_id: req.params.id},(err)=>{
            if(err){
                 return  res.status(400).send({
                    "success":false,
                    "Message":"Error deleting track" 
                })
            }
        })
        res.status(200).send(album)
    } catch (e) {
        res.status(500).send({
            "success":false,
            "Message":"Connection error"  
        })
    }
})

// Edit album by id
router.put('/album/:id',auth,async(req,res)=>{
try {
    
    var album= await Album.findOneAndUpdate(req.params.id,req.body)
    if(!album){
        return res.status(404).send({
            "success":false,
            "Message":"There is no album with this id" 
        })

    }
    if(req.body.name){
        album.set('name',req.body.name)
    }
    if(req.body.album_type){
        album.set('album_type',req.body.album_type)
    }
    if(req.body.tracks){
        album.set('tracks',req.body.tracks)
    }
    if(req.body.copyrights){
        album.set('copyrights',req.body.copyrights)
    }
    if(req.body.genres){
        album.set('genres',req.body.genres)
    }
    if(req.body.artists){
     
        album.set('artists',req.body.artists)
    }

    
    res.status(200).send(album)
    

} catch (error) {
    res.status(500).send({
        "success":false,
        "Message":"Connection error" 
    })
}
        
})
module.exports=router


