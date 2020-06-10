const express = require('express')
const Playlist=require('../models/playlist')
const Track=require('../models/track')
const validator = require('validator')
const router = new express.Router()

router.post('/playlist',async(req,res)=>{
   try{ const playlist=await new Playlist(req.body)
    if(!playlist){
        return res.status(400).send({
            "success": false,
            "Message": "Playlist wasn't created"
        })
    }
    if(!req.body.name || !req.body.type){
        return res.status(400).send({
            "success":false,
            "Message": "Provide all of the required fields (name and playlist type)"
        })
    }
    playlist.save().then(()=>{
        res.status(200).send(playlist)
    }).catch((e)=>{
        res.status(500).send(e.message)
    })
   }catch(e){
    res.status(500).send({
        "success":false,
        "Message":"The Playlist wasn't created due to internal server error"
    })
   }
})
//Add track to a playlist(tested)
router.put('/playlistmanager/:id/:id2',async(req,res)=>{
 try{ 
    const track= await Track.findById({_id: req.params.id})
    if(!track){
        return res.status(404).send({
            "success": false,
            "Message": "This track doesn't exist create one first"
        })
    }
    const playlist= await Playlist.findById({_id:req.params.id2})
    if(!playlist){
        return res.status(404).send({
            "success": false,
            "Message": "This playlist doesn't exist create one first"
        })
    }
    const {tracks}= playlist
    
    function search(tracktolookfor){
        for (var i=0; i < tracks.length; i++) {
            if (tracks[i] ._id.equals(tracktolookfor._id)) {
                return tracks[i];
            }
        }
    }
    if(tracks.length!==0){
        const track1=search(track)
        if(track1){
            return res.status(400).send({
                "success": false,
                "Message": "Track already exists"
            })
        }
    }
    tracks.push(track)
    playlist.save().then(()=>{
        res.status(200).send({
            "success": true,
            "Message": "Track is added to playlist successfully"
        })
    })
  }catch(e){
        res.status(500).send({
            "success": false,
            "Message": "Connection error",
            e
        })
    }

})
//Remove a track from a playlist(tested)
router.delete('/playlistmanager/:id/:id2',async(req,res)=>{
    try {
  
        const playlist = await Playlist.findById({_id: req.params.id})
        const track1= await Track.findById({_id:req.params.id2})
        if(!playlist){
            return res.status(404).send({
                "success": false,
                "Message": "This playlist doesn't exist"
            })
        }
        if(!track1){
            return res.status(404).send({
                "success": false,
                "Message": "Can't find track with this id"
            })
        }
    const {tracks}= playlist
   
    function search(tracktolookfor){
        for (var i=0; i < tracks.length; i++) {
            if (tracks[i] ._id.equals(tracktolookfor._id)) {
                return tracks[i];
            }
        }
    }
    if(tracks.length!==0){
        const track=search(track1)
        if(!track){
        return res.status(404).send({
                "success": false,
                "Message": "The track wasn't found"
        })
     }
    }
    function searchtoDelete(tracktolookfor){
        for (var i=0; i < tracks.length; i++) {
            if (!(tracks[i] ._id.equals(tracktolookfor._id))) {
                return tracks[i];
            }
        }
    }
    var filtered=searchtoDelete(track1)
    playlist.set("tracks",filtered)
    playlist.save().then(()=>{
        res.status(200).send({
            "success": true,
            "Message": "Track was deleted successfully"
        })
    }).catch((e)=>{

    })

    }
  catch (error) {
        res.status(500).send({
            "success": false,
            "Message": "Track wasn't removed",
            error
        })
    }
})
module.exports=router