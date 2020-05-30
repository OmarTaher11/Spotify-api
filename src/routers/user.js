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

router.get('/me', auth, async (req, res) => {
    await req.user.populate('following.follower').execPopulate()
    await req.user.populate('followers').execPopulate()
    res.send({
        user :req.user,
        followers: req.user.followers.length,
        following: req.user.following.length})
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['display_name', 'age','product','type','country','image']
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
    const decoded = jwt.verify(req.query.token, 'Spotify')
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




router.post('/users/signUp',async (req ,res ) => {
    
    
    
    try{
        const user1 = await User.findOne({
            email: req.body.email,
            emailConfirmation: true
        })
        if(user1)
        return res.send({message : "email already used"})

        var user = new User(req.body)
        const token = jwt.sign({_id: user._id}, "Spotify",{ expiresIn:
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

router.post('/forgotPassword',async (req,res)=>{
    try{
        const user = await User.findOne({
            email: req.body.email,
            emailConfirmation: true
        })
        const token = jwt.sign({_id: user._id}, "Spotify",{ expiresIn:
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
        const decoded = jwt.verify(req.query.token, 'Spotify')
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
    const decoded = jwt.verify(req.query.token, 'Spotify')
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




router.patch('/users/upgrade',auth,async (req ,res ) => {
    
    
    
    try{
        if(req.user.product === 'premium')
        return res.send('user is already premium')
        const token = jwt.sign({_id: req.user._id}, "Spotify")
        mail.sendUpgrade(req.user.email ,token )
        res.status(201).send({
            message:"email sent"
        })
    }catch(e){
        res.status(400).send({
            message : e.message})
    }
})

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

router.delete('/users/deleteprofile',auth, async(req, res) => {
    try{
     req.user.image = undefined
     await req.user.save()
     res.send('deleted')
    }catch(e){
        res.status(400).send(e.message)
    }
 })
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