const express = require('express')
const Track = require('../models/track')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = new express.Router()


// Add a track
router.post('/track',auth,async(req,res)=>{
    try {
        const track= await new Track(req.body)
        if(!track){
            return res.status(400).send({
                "success": false,
                "Message": "Invalid data inserted"
            })
        }
        const track2=await Track.findOne({
                "name": req.body.name,
                "type": req.body.type
        })
       
        if(track2){
            return res.status(400).send({
                "success": false,
                "Message": "There is a track with the same name and type"
            })
        }
        if(!req.body.type || !req.body.name){
            return res.status(400).send({
                "success":false,
                "Message": "Provide all of the required fields (name and type)"
            })
        } 
       
       
        track.save()
        res.status(200).send(track)
      }catch (e){
        res.status(404).send({
            "success":false,
            "Message":"The album wasn't created"
        })
    }
})
// Remove track by id
router.delete('/track/:id',auth,async(req,res)=>{
    try {
        
        if(!req.params.id){
            return res.status(400).send({
                "success": false,
                "Message": "You didn't enter an id"
            })
        }
        const track2= await Track.findById(req.params.id)
        if(!track2){
            return res.status(404).send({
                "success": false,
                "Message": "There is no track with this id"
            })
        }
        const track= await Track.findOneAndRemove({_id: req.params.id},(err)=>{
            if(err){
                 return  res.status(400).send({
                    "success":false,
                    "Message":"Error deleting track" 
                })
            }
        })
        
        res.status(200).send({
                "success": true,
                "Message": "Track deleted successfully"
            })
       
        
       
    }
    catch (e) {
        res.status(404).send(e)
    }
})
// Edit track by id
router.put('/track/:id',auth,async(req,res)=>{
    try {
        const track2= await Track.findById(req.params.id)
        if(!track2){
            return res.status(404).send({
                "success":false,
                "Message":"There is no track with this id" 
            })
        }
        const track= await Track.findOneAndUpdate(req.params.id,req.body,(err)=>{
            if(err){
                return res.status(404).send({
                    "success":false,
                    "Message":"Failed to update"
                }) 
            }
        })
        
        if(!track){
            return res.status(400).send({
                "success":false,
                "Message":"There is no track with this id" 
            })
    
        }
        if(req.body.name){
            track.set('name',req.body.name)
        }
        if(req.body.duration){
            track.set('duration',req.body.duration)
        }
        if(req.body.disc_no){
            track.set('disc_no',req.body.disc_no)
        }
        if(req.body.type){
            track.set('type',req.body.type)
        }
        if(req.body.track_number){
            track.set('track_number',req.body.track_number)
        }
        if(req.body.album){
         
            track.set('album',req.body.album)
        }
        if(req.body.artists){
            track.set('artists',req.body.artists)
        }
      res.status(200).send(track)
        
 } catch (error) {
        res.status(500).send({
            "success":false,
            "Message":"Connection error" 
        })
    }
            
})
module.exports=router