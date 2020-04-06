const express = require('express')
const User = require('../models/users')
const auth = require("../middleware/auth")
const playlist = require('../models/playlist')
const router = new express.Router()

router.put('/me/following',auth,async (req, res) =>{
    try{
    const ids = req.body.ids
        
    for( let i = 0; i < ids.length ;i++)        
         if(ids[i] !== req.user._id.toString()){
            await req.user.follow(ids[i])
        
         }else{
             throw new Error("you cannot follow yourself")
         }
    
    res.status(200).send({
        message: "succeeded",
    })
    }catch(e){
        res.status(400).send({
            message: "faild to complete the process"
        })
    }
})
router.put('/playlists/{playlist_id}/followers',auth,async (req, res) =>{
    try{
    const id = req.body.Playlist_id   
    const play = await playlist.findById({_id: id})
    await play.getFollowed(req.user._id)
        
    res.status(204).send({
        message: "succeeded",
    })
    }catch(e){
        res.status(400).send({
            message: "faild to complete the process"
        })
    }
})

router.get('/me/following/contains',auth,async (req, res) =>{
    var followed = true
    
    try{
        const ids = req.body.ids
        ids.forEach((id)=>{
            const found = req.user.getFollowingStatus(id)
            if(!found)
          {
           return followed = false
            
          }
        })

        if(followed){
        res.status(200).send({
               message: "followed",
        })
        }else{
            res.status(404).send({
                message: "not followed",
            }) 
        }
       }catch(e){
           res.status(400).send({
               message: "faild to complete the process"
           })
       }
})
router.get('/me/following',auth,async (req, res) =>{
    const match = {
        type :"artist"
    }
    try{
        await req.user.populate({
        path:"following.follower",
        match,
         options:{
        limit: parseInt(req.query.limit),
        skip:  parseInt(req.query.skip)
        } 
        }).execPopulate()
        const artists = req.user.following.filter((follower)=>{
            return follower.follower
        })
    res.status(200).send(artists)
    }catch(e){
        res.status(400).send({
            message: "faild to complete the process"
        })
    }
})
router.delete('/me/unfollow',auth, async (req, res) =>{
    try{
        const ids = req.body.ids
      /*   ids.forEach((id)=>{
            await  req.user.unfollow(id)
             
        }) */
    for (let i = 0; i < ids.length; i++) {
             await req.user.unfollow(ids[i])
     }
    res.status(200).send({
        message: "succeeded",
    })
    }catch(e){
        res.status(400).send({
            message: "faild to complete the process"
        })
    }
})





module.exports = router