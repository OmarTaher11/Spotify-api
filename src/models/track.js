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
        trim: true
    },
    track_number:{
        type: Number
    },
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    artist:[{
        artist:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }
    }]
})
const Track=mongoose.model('Track',track)
module.exports=Track