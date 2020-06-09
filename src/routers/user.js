const express = require('express')
const User = require('../models/users')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const mail = require('../HelperFunc/mail')
const router = new express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const image = require('../HelperFunc/image')

/**
 * @api {post}/users/login login the website
 * @apiName Get/login the website
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {String}email the user email
 * @apiParam {String}password the user password
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains message and userid and authorization token
* @apiSuccessExample 
 * HTTP/1.1 200 
 * {
    "message": "login successfully",
    "userId": "5edf1b9eea12804f8ca04a69",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRmMWI5ZWVhMTI4MDRmOGNhMDRhNjkiLCJpYXQiOjE1OTE2Nzk5MjB9.28oUgpp06l1vzfmWwpvYBeT-wr517nQZva2Y4WsNS-A"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
"Message":"unable to login"
} 
 * */
router.post('/users/login',async(req,res) =>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        
        const token = await user.genAuthToken()
        res.send({
            message:"login successfully",
            userId :user._id,
            token
        })
    }catch(e){
        res.status(400).send(e.message)
    }
})

/**
 * @api {post}/users/Signout loginout the website
 * @apiName Get/loginout the website
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains message 
* @apiSuccessExample 
 * HTTP/1.1 200 
 * {
    "message": "loginout successfully",
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
"Message":"user isn't authorized"
} 
 * */
router.post('/users/Signout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({
            message: "logout succesfully"
        })
    } catch (e) {
        res.status(500).send()
    }
})

/**
 * @api {Get}/users/:_id get user info
 * @apiName Get/get user info
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
    "user": {
        "emailConfirmation": true,
        "_id": "5edf1b9eea12804f8ca04a69",
        "display_name": "omar",
        "email": "omar_taher2012@yahoo.com",
        "product": "premium",
        "type": "user",
        "__v": 1
    },
    "followers": 0,
    "following": 0
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */


router.get('/users/:_id', auth, async (req, res) => {
    try{
    const user = await User.findById({_id: req.params._id})
    await user.populate('following.follower').execPopulate()
    await user.populate('followers').execPopulate()
    res.send({
        user :user,
        followers: user.followers.length,
        following: user.following.length})
    }catch(e){
        res.status(404).send(e)
    }
})
/**
 * @api {Get}/me get user info
 * @apiName Get/get user info
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
    "user": {
        "emailConfirmation": true,
        "_id": "5edf1b9eea12804f8ca04a69",
        "display_name": "omar",
        "email": "omar_taher2012@yahoo.com",
        "product": "premium",
        "type": "user",
        "__v": 1
    },
    "followers": 0,
    "following": 0
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */

router.get('/me', auth, async (req, res) => {
    await req.user.populate('following.follower').execPopulate()
    await req.user.populate('followers').execPopulate()
    res.send({
        user :req.user,
        followers: req.user.followers.length,
        following: req.user.following.length})
})
/**
 * @api {patch}/users/me updating the user info
 * @apiName Get/get updating the user info
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
 * @apiParam {String}display_name the new name (optional)
 * @apiParam {String}age the updated age (optional)
 * @apiParam {String}type new type (optional)
 *  @apiParam {String}country new country (optional)
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
    "message":updated
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['display_name', 'age','type','country']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
/**
 * @api {patch}/users/ChangerPassword changing the password to a new one
 * @apiName Get/changing the password to a new one
 * @apiGroup User
 * @apiVersion 0.1.0
 *  @apiParam {String}Authorization access token
 * @apiParam {String}email the user email
 * @apiParam {String}oldPassword the current password
 * @apiParam {String}newPassword the new password
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
    "emailConfirmation": true,
    "_id": "5edf1b9eea12804f8ca04a69",
    "display_name": "omar",
    "email": "omar_taher2012@yahoo.com",
    "product": "premium",
    "type": "user",
    "__v": 1
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.patch('/users/ChangerPassword', auth, async (req, res) => {

    try {
        console.log(req.body.email+"  "+req.body.oldPassword)
        const user = await User.findByCredentials(req.body.email,req.body.oldPassword)

        if( user.email !== req.user.email ){
            return res.status(400).send('not available operation')
        } 

        req.user.password = req.body.newPassword
        await req.user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @api {delete}//users/me deleting my account
 * @apiName Get/deleting my account
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
"message deleted"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
      
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/verify',async (req ,res ) => {
    try{
    const decoded = jwt.verify(req.query.token, process.env.JWT_VERIFY)
    if(!decoded)
    return res.send({
        msessage: "url expired"})

    const user = await User.findOne({ _id: decoded._id})
    const user1 = await User.findOne({
        email: user.email,
        emailConfirmation: true
    })
    if(user1)
    return res.send({message : "email already used"})
    if (!user) {
       return  res.send({  msessage :"no user found"})
    }
    user.emailConfirmation = true
    await user.save()
   
res.send({message: "verified"})
    
}catch(e){
    res.status(400).send(e)
    }
})

/**
 * @api {post}/users/signUp signing up 
 * @apiName Get/signing up
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {String}email the user email
 * @apiParam {String}display_name the user email
 * @apiParam {String}password the password
 *  @apiParam {number}age age of the user (optional)
 * @apiParam {String}country country of the user (optional)
 * @apiParam {String}product subscribtion type premium or free
 * @apiParam {String}type user or artist 
 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 201 
{
    "message": "please verify your email"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"email is invalid"
}
 * */

router.post('/users/signUp',async (req ,res ) => {
    
    
    
    try{
        const user1 = await User.findOne({
            email: req.body.email,
            emailConfirmation: true
        })
        if(user1)
        return res.send({message : "email already used"})

        var user = new User(req.body)
        const token = jwt.sign({_id: user._id}, process.env.JWT_VERIFY,{ expiresIn:
            '1h'})
        mail.sendVerification(req.body.email ,token )
        user.emailConfirmation = false
        await user.save()
        //token = await user.genAuthToken()
        res.status(201).send({
            message:"please verify your email"
        })
    }catch(e){
        res.status(400).send({
            message : e.message})
    }
})
/**
 * @api {post}/forgotPassword request email to enter new password
 * @apiName Get/request email to enter new password
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {String}email the user email

 * @apiSuccess {200}request ok http status code
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
    "message": "email sent"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.post('/forgotPassword',async (req,res)=>{
    try{
        const user = await User.findOne({
            email: req.body.email,
            emailConfirmation: true
        })
        const token = jwt.sign({_id: user._id}, process.env.JWT_FORGOTPASSWORD,{ expiresIn:
            '1h'})
        mail.sendForgotPassword(req.body.email, token)
        res.send({
            message :"email sent"
        })

    }catch(e){
        res.status(400).send({
            message :e.message
        })
    }
})

router.get('/forgotPassword',(req, res)=>{

    res.render("../src/htmls/newPass.hbs",{
      url:'/newPassword?token='+req.query.token
    })
  })

router.post('/newPassword',async(req, res)=>{
    try {
        const decoded = jwt.verify(req.query.token, process.env.JWT_FORGOTPASSWORD)
    if(!decoded)
    return res.send({
        msessage: "url expired"})

    const user = await User.findOne({ _id: decoded._id})
        

        user.password = req.body.pswd
        console.log(user.password)
        await user.save()
        res.send({
            message:"updated"
        })
    } catch (e) {
        res.status(400).send(e)
    }
  })
  
/////////////////////////////////////////////

router.get('/upgrade',async (req ,res ) => {
    try{
    const decoded = jwt.verify(req.query.token, process.env.JWT_UPGRADE)
    if(!decoded)
    return res.send({
        msessage: "url expired"})

    const user = await User.findOne({ _id: decoded._id})
    if (!user) {
       return  res.send({
            msessage :"no user found"})
    }
    user.product = "premium"
    await user.save()
   
res.send({message: "upgraded" })
    
}catch(e){
    res.status(400).send(e.message)
    }
})

/**
 * @api {patch}/users/upgrade request email to upgrade to premium
 * @apiName Get/request email to upgrade to premium
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
"message": email sent
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */


router.patch('/users/upgrade',auth,async (req ,res ) => {
    
    
    
    try{
        if(req.user.product === 'premium')
        return res.send('user is already premium')
        const token = jwt.sign({_id: req.user._id}, process.env.JWT_UPGRADE)
        mail.sendUpgrade(req.user.email ,token )
        res.status(201).send({
            message:"email sent"
        })
    }catch(e){
        res.status(400).send({
            message : e.message})
    }
})


/**
 * @api {post}//users/uploadprofile uploading profile picture
 * @apiName Get/ uploading profile picture
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
 * * @apiParam {buffer}file the image
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
"message: uploaded"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.post('/users/uploadprofile',auth,image.upload.single('upload'), async(req, res) => {
   try{
    req.user.image = req.file.buffer
    await req.user.save()
    res.send('uploaded')
   }catch(e){
       res.status(400).send(e.message)
   }
},(error , req , res ,next )=> {
    res.status(400).send(error.message)
})


/**
 * @api {delete}/users/deleteprofile deleting profile picture
 * @apiName Get/get deleting profile picture
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
"message deleted"
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.delete('/users/deleteprofile',auth, async(req, res) => {
    try{
     req.user.image = undefined
     await req.user.save()
     res.send('deleted')
    }catch(e){
        res.status(400).send(e.message)
    }
 })



 /**
 * @api {get}/profile/:id requesting the image
 * @apiName Get/requesting the image
 * @apiGroup User
 * @apiVersion 0.1.0
 *  * @apiParam {String}Authorization access token
@apiSuccess {json}response The response body contains user info
* @apiSuccessExample 
 * HTTP/1.1 200 
{
 'img data'
}
*  @apiError {400} headerStatusError the header status code is an error code
 * @apiErrorExample
 * HTTP/1.1 400 
{
 "Message":"user isn't authorized"
}
 * */
router.get('/profile/:id',async(req , res) =>{ // no auth just to test get profile image on browser
    try{
        const user = await User.findOne({ _id: req.params.id})
        if(! user ){
        return res.send({
            message:"user not found"
        })}else if (! user.image){
            return res.send({
                message:"No image found"
            })
        }
        res.set('Content-Type','file')
        res.send(user.image)


    }catch(e){
        res.status(400).send(e.message)
    }
})
module.exports = router