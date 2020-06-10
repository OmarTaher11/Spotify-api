const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const track=mongoose.Schema({
    disc_no:{
        type: Number
    },
    duration:{
        type:Number
    },
    href:{
        type:String
    },
    name:{
        type:String,
        required: true,
        trim: true
        
    },
    type:{
        type:String,
        required: true,
        trim: true,
        validate(value){
           if(isNaN(value)=== false)
            throw new Error("Track type can't be a number")
          
        }
    },
    track_number:{
        type: Number
    },
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    artists:[{
        artist:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }
    }],
    genre:{
        type:String
    }
})
const Track=mongoose.model('Track',track)
module.exports=Track