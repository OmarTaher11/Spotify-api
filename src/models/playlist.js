const mongoose = require('mongoose')
const validator = require('validator')



const playlist = mongoose.Schema( {
    collaborative:{
        type: Boolean
    },
    description:{
        type: String
    },
    followers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    href:{
        type: String
    },
    images:[{
        image:{
            type: Buffer
        }
    }
    ],
    name:{
        type: String,
        required: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    public:{
        type: Boolean
    },
    tracks:[{
        track:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track'
        }
    }],
    type:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(isNaN(value)=== false)
            throw new Error("Playlist type can't be a number")
        }

    }
})
/* Here will be some code for defining the playlist schema
and some related methods */

playlist.methods.getFollowed = async function(id){
    const play = this 
   // console.log(id)
    // users will be id of the follower
    // follwed is attribute (array of users id )
    try {
     
        const followed = play.followed.find((p)=>{
            return (p.users.toString() === id)
        })
        if(!followed){ 
        play.followed = play.followed.concat({ user:id })
        await user.save()
        }
    }catch(e){
          throw Error('you cannot follow this playlist') 
    }
}
const Playlist= mongoose.model('Playlist',playlist)
module.exports= Playlist

