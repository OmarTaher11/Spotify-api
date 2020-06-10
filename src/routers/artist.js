
const express = require('express')
const User = require('../models/users')
const Track=require('../models/track')
const Album=require('../models/album')
const auth = require('../middleware/auth')
const validator = require('validator')
const router = new express.Router()

router.get('/artist', async(req,res)=>{
    try{
        const user= await User.find({type: "artist"})
        if(!user){
            return res.status(400).send({ "success": false, "Message": 'The header status code is an error code'})
        }
        res.send(user)
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
//Add a track(tested)
router.post('/artist/newtrack',auth,async(req,res)=>{
   try{ 
         if(req.user.type !== "artist")
        {  return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })
      }
      if(!req.body.type || !req.body.name){
        return res.status(400).send({
            "success":false,
            "Message": "Provide all of the required fields (name and type)"
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
    const track= await new Track(req.body)
    if(!track){
            return res.status(400).send({
                    "success": false,
                    "Message": "Track wasn't created as you didn't provide all required list"
                })
               
            }
    
  
        track.save().then(()=>
        res.status(200).send(track)
        ).catch((e)=>{
            res.status(400).send(e.errors.type.message)
        })
    }catch(err){
       res.status(500).send(e)
   }
})
//Add Track to an album(tested)
router.put('/artist/:id/:id2',auth,async(req,res)=>{
    try {
        if(req.user.type !== "artist")
        {return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })}

        const track= await Track.findById({_id: req.params.id})
        
       
        if(!track){
            return res.status(404).send({
                "success": false,
                "Message": "This track doesn't exist create one first"
            })
        }
       const album= await Album.findById({ _id: req.params.id2})
       if(!album){
            return res.status(404).send({
                "success": false,
                "Message": "This album doesn't exist create one first"
            }) 
        }
        
        const {tracks}= album
        function searching(tracktolookfor){
            for (var i=0; i < tracks.length; i++) {
                if (tracks[i] ._id.equals(tracktolookfor._id)) {
                    return tracks[i];
                }
            }
        }
        if(tracks.length!==0){
            const track1=searching(track)
            if(track1){
                return res.status(400).send({
                    "success": false,
                    "Message": "Track already exists"
                })
            }
        }

       tracks.push(track)
       album.save().then(()=>{
            res.status(200).send({
                "success": true,
                "Message": "Track successfully added",
                album
                
            })

        }).catch((e)=>{
            res.status(500).send(e)
        })
        
  } catch (error) {
        res.status(500).send(error)
        
    }
})
//Edit a track(tested)
router.put('/artist/:id',auth,async(req,res)=>{
    try {
        if( req.user.type !=="artist")
        {return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })}
        const track2= await Track.findById({_id: req.params.id})
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
            if(isNaN(req.body.type)===false){
                return res.status(400).send({
                    "success": false,
                    "Message": "Track type can't be a number"
                })
            }
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
//Delete a track(tested)
router.delete('/artist/:id/',auth,async(req,res)=>{
    try {
        if(req.user.type !=="artist")
        {
            return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })}
      const track2= await Track.findById({_id: req.params.id})
        if(!track2){
            return res.status(404).send({
                "success": false,
                "Message": "There is no track with this id"
            })
        }
    const track= await Track.findOneAndRemove({_id: req.params.id})        
    track.remove().then(()=>{
        res.status(200).send({
            "success": true,
            "Message": "Track was removed successfully"
        })
    }).catch((e)=>{
        res.status(500).send({
            "success": false,
            "Message": "Track wasn't  removed",
            e
        })
    })
    
    }
    catch (e) {
        res.status(404).send(e)
    }
})
//Remove an a track from album(tested)

router.delete('/artist/:id/:id2',auth,async(req,res)=>{
    try {
        if(req.user.type !== "artist"){
            return res.status(500).send({
                "success": false,
                "Message": "This user isn't an artist"
        })
    }
        const album = await Album.findById({_id: req.params.id})
        const track1= await Track.findById({_id:req.params.id2})
        if(!album){
            return res.status(404).send({
                "success": false,
                "Message": "Can't find album"
            })
        }
        if(!track1){
            return res.status(404).send({
                "success": false,
                "Message": "Can't find track with this id"
            })
        }
    const {tracks}= album
  
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
album.set("tracks",filtered)
album.save().then(()=>{
        res.status(200).send({
            "success": true,
            "Message": "Successfully removed"
            
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

//Add an album(tested)
router.post('/artist', auth,async(req,res)=>{
    try {
        if(req.user.type !=="artist")
        {
            return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })}
        const album2=await Album.find({
            "album_type": req.body.album_type,
            "name": req.body.name
       }) 
    
       if(!(album2.length===0)){
           return res.status(400).send({
            "success": false,
            "Message": "There is an album with the same name and type"
        })
      }
    const album= await new Album(req.body)
        if(!album){
            return res.status(400).send({
                "success": false,
                "Message": "Album wasn't created"
            })
        }
       
    if(!req.body.album_type || !req.body.name){
            return res.status(400).send({
                "success":false,
                "Message": "Provide all of the required fields (name and album type)"
            })
        }
        
    album.save().then(()=>{
            res.status(200).send(album)
        }).catch((e)=>{
            res.status(400).send(e.message)
        })
       
      }catch (e){
        res.status(500).send({
            "success":false,
            "Message":"The album wasn't created"
        })
    }
})

// Remove Album by id(tested)
router.delete('/artists/:id',auth,async(req,res)=>{
  try {
        if( req.user.type !=="artist")
        {
            return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
            })
        }
        const album2= await Album.findById({_id:req.params.id})
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
                    "Message":"Error deleting album" 
                })
            }
        })
        res.status(200).send({
            "success": true,
            "Message": "Album was successfully removed"
        })
      } catch (e) {
        res.status(500).send({
            "success":false,
            "Message":"Connection error"  
        })
    }
})

// Edit album by id(tested)
router.put('/artistalbum/:id',auth,async(req,res)=>{
try {
    if(req.user.type !=="artist")
        {return res.status(500).send({
            "success": false,
            "Message": "This user isn't an artist"
        })}

    const album= await Album.findById({_id: req.params.id})
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
       if(isNaN(req.body.album_type)===false) {
           return res.status(400).send({
               "success": false,
               "Message": "Album type can't be a number"
           })
       }
       album.set('album_type',req.body.album_type)
    }

   if(req.body.copyrights){
        album.set('copyrights',req.body.copyrights)
    }
    if(req.body.genres){
        album.set('genres',req.body.genres)
    }
    album.save().then(()=>{
        res.status(200).send(album)
    }).catch((e)=>{

    })
    
    

} catch (error) {
    res.status(500).send({
        "success":false,
        "Message":"Connection error" 
    })
}
        
})
module.exports=router