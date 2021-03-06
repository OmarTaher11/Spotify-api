const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const album= mongoose.Schema({
    album_type:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(isNaN(value)===false)
            throw new Error("Album type can't be a number")
        }
    },
    artists:[{
        
        artist:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }
        
    }],
    copyrights:[{
        
        copyright:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Copyright'
        }
    }],
    genres:[{
     
        items:{
            type: String
        }
    }],
    href:{
        type:String,
        
    },
    images:{
        type: Buffer
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    popularity:{
        type:Number
    },
    release_date:{
        type:String
    },
    tracks:[{
        
        track:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track'
        }
    }]

})
const Album=mongoose.model('Album',album)
module.exports=Album