const express = require('express')
const User = require('../models/users')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = new express.Router()

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
        res.status(400).send(e)
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
    const allowedUpdates = ['display_name', 'email', 'age','product','type','country','image']
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
router.post('/users/signUp',async (req ,res ) => {
    const user = new User(req.body)
    try{
        await user.save()
        token = await user.genAuthToken()
        res.status(201).send({
            user,
            token
        })
    }catch(e){
        res.status(400).send({
            message : e.message})
    }
})






module.exports = router