const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const artist=mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim: true
       
    },
    followers:{
        type:{
            count: Number,
            href: String
        }
    },
    popularity:{
        type: Number
    },
    image:{
        //empty for now
    },
    href:{
        type: String
    },
    genres:[{
        items:{
          type:String

      }

    }],
    type: {
        type:String
        
    }



})
const Artist=mongoose.model('Artist',artist)
module.exports= Artist