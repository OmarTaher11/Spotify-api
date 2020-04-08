const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const album= mongoose.Schema({
    album_type:{
        type: String,
        required: true,
        trim: true
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
        ///
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
    }],
    type:{
        type:String
    }
})
const Album=mongoose.model('Album',album)
module.exports=Album