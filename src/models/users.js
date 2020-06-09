const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @class User
 * @mixes {userSchema.methods}
 */
const userSchema = mongoose.Schema( {
    display_name: {
        type: String,
        required: true,
        trim: true
    }, email:{
        type:String,
        required: true,
        //unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is Invalid')
        }
    },
    emailConfirmation:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error("the password shouldn't include password term")
        }
    },
    country: {
        type: String,
    },
        product:{
            type: String,
            required: true,
            validate(value){
                if(value.toLowerCase() != "free" && value.toLowerCase() != "premium"){
                    throw new Error("you should specify the type of subscribtion ")
                }
            }

        },
        type:{
            type:String,
            required: true,
            validate(value){
                if(value.toLowerCase() != "user" && value.toLowerCase() != "artist"){
                    throw new Error("you should specify the type of the user ")
                }
            }
        },
        image:{
            type: Buffer
        },
            following:[
                {
                    follower:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'User'
                    }
                }
            ],
            tokens:[
                {
                    token:{
                        type: String,
                        required: true
                    }
                }
            ]
})

userSchema.virtual('followers',{
    ref:'User',
    localField:'_id',
    foreignField: 'following.follower'
})

/**
 * @function follow
 * @example
 * User.follow(id)
 * 
 * @param {ObjectId} id the id of the user to be followed 
 */
userSchema.methods.follow = async function(id){
    const user = this 
   // console.log(id)
   console.log(id)
        const following = user.following.find((user)=>{
            return (user.follower.toString() === id)
        })
        if(!following){ 
        // await User.findById(id)
        user.following = user.following.concat({ follower:id })
        
        await user.save()
        }
}
/**
 * @function unfollow
 * @example
 * User.unfollow(id)
 * 
 * @param {ObjectId} id the id of the user to be unfollowed 
 */

userSchema.methods.unfollow = async function(id){
    const user = this 
    console.log(id)
    user.following = user.following.filter((user)=>{
        return user.follower.toString() !== id
    })

    await user.save()
}

/**
 * @function getFollowingStatus
 * @example
 * User.getFollowingStatus(id)
 * 
 * @param {ObjectId} id the id of the user to chech the following status 
 * @returns {boolean} f  the following status true or false
 */
userSchema.methods.getFollowingStatus =  function(id){
    const user = this
    const followed = user.following.find((user)=>{
        return (user.follower.toString() === id)
    })
    if(followed){
        const f = true
        return f
    }else{
        const f = false
        return f
    }
}

/**
 * @function genAuthToken
 * @example
 * User.genAuthToken()
 * 
 * @param {ObjectId} id the id of the user to chech the following status 
 * @returns {String} token  the auth token
 */
userSchema.methods.genAuthToken = async function(){
    const user = this 
        const token = jwt.sign({_id: user._id}, "Spotify")
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
   
}


userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    delete user.following
    return user
}


/**
 * @function findByCredentials
 * @example
 * User.findByCredentials (email, password)
 * 
 * @param {String} email the email to search for
 * @param {String} password the password to search for
 * @returns {User} User  the user with this email and password
 */
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({
        email,
        emailConfirmation: true
    })

    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this
    if(this.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)

    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User

