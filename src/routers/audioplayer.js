const express = require('express')
const Track=require('../models/track')
const router = new express.Router()

//Show tracks by genres(tested)
router.get('/audioplayer',async(req,res)=>{
    try{
    const tracks= await Track.find({genre :req.body.genre})
    if(tracks.length===0){
        return res.status(404).send({
            "success": false,
            "Message": "No tracks found for this genre"
        })
    }
    res.status(200).send(tracks)
    }catch(err){
        res.status(404).send({
            "success": false,
            "Message": "Couldn't fetch tracks"
        })
    }
    

})

module.exports=router