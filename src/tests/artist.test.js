const request = require("supertest")
const app = require('../app')
const User = require('../models/users')
const Track =require('../models/track')
const Album = require('../models/album')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// initializing user
const id1 = new mongoose.Types.ObjectId()
const id2 = new mongoose.Types.ObjectId()
const id3 = new mongoose.Types.ObjectId()
const id4 = new mongoose.Types.ObjectId()
const id5 = new mongoose.Types.ObjectId()
const id6 = new mongoose.Types.ObjectId()
let dummyUser = {
    _id: id1,
    display_name: "Omar Taher",
    email: "omaromar@yahoo.com",
    password:"12345678",
    product:"free",
    type:"user",
    emailConfirmation: true,
    tokens:{
        token: jwt.sign({_id : id1}, process.env.JWT_SECRET)
    }
}
let dummyUser1 = {
    _id: id2,
    display_name: "Alan Walker",
    email: "marizkozman16@gmail.com",
    password:"turtledove",
    product:"free",
    type:"artist",
    emailConfirmation: true,
    tokens:{
        token: jwt.sign({_id : id2}, process.env.JWT_SECRET)
    }
}
let dummyTrack={
    _id: id3,
    "disc_no" : 3,
    "duration" : 3,
    "name" : "Once",
    "href" : "https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1",
    "type" : "Pop",
    "track_number" : 3
}

let dummyAlbum={
    _id: id4,
    "album_type" : "Prog Rock",
    "name" : "Marrow of the earth",
    "type" : "Pop"
  
}
let dummyAlbum2={
    _id: id5,
    "album_type" : "Prog Rock",
    "name" : "Marrow of the earth",
    "type" : "Pop",
    "tracks": []
    
}
let dummyTrack2={
    _id: id6,
    "disc_no" : 3,
    "duration" : 3,
    "name" : "All for one",
    "href" : "https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1",
    "type" : "Pop",
    "track_number" : 3
}
beforeEach(async () => {
    await User.deleteMany({})
    await Album.deleteMany({})
    await Track.deleteMany({})
    await new User(dummyUser).save()
    await new User(dummyUser1).save()
    await new Track(dummyTrack).save()
    await new Album(dummyAlbum).save()
    await new Album(dummyAlbum2).save()
    await new Track(dummyTrack2).save()
})
//Add album
test('Add Album', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
    .post('/artist')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send({
            "album_type" : "Jazz",
            "name" : "Darth Vader"
           
     }).expect(200)
   
})
test('Add Another Album', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
    .post('/artist')
    .set('Authorization', `Bearer ${user.tokens[0].token}`)
    .send({
        "album_type" : "Prog Rock",
        "name" : "Hey you",
           
     }).expect(200)
   
})

//Add album
test('Add invalid argument with missing required list',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .post('/artist')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type": "Pop",
            "artist": [],
            "copyrights": [],
            "genres":[{
                "items": "Folk"
            }]
            
    }).expect(400)
   
})
//Add album
test('Add invalid album_type', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .post('/artist')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type": 1,
            "name": "mariz"
            
    }).expect(400)
   
})
//Add a track
test('Add Track', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .post('/artist/newtrack')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "disc_no" : 3,
            "duration" : 3,
            "name" : "Harder",
            "href" : "https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1",
            "type" : "Pop",
            "track_number" : 3
            
    }).expect(200)
   
})

//Add a track
test('Add Track with invalid type',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .post('/artist/newtrack')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "disc_no" : 3,
            "duration" : 3,
            "name" : "Little me",
            "type" : 3,
            "track_number" : 3
            
    }).expect(400)
   
})
//Add a track
test('Add Track without all the required properties', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .post('/artist/newtrack')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "disc_no" : 3,
            "duration" : 3,
            "name" : "Little me",
            "track_number" : 3
            
    }).expect(400)
   
})

//Delete a track
test('Delete Track', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .delete('/artist/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(200)
   
})
//Delete a track
test('Delete a track with invalid id', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .delete('/artist/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(404)
   
})
//Delete album
test('Delete album',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .delete('/artists/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(200)
   
})
//Delete album
test('Delete an album with invalid id', async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .delete('/artists/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(404)
   
})
//Edit track
test('Edit track',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "name": "Lost",
            "type": "RNB",
            "duration": 2
            
    }).expect(200)
   
})
//Edit a track 
test('Edit track with invalid id',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id1)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "name": "Lost",
            "type": "RNB",
            "duration": 2
            
    }).expect(404)
   
})
//Edit a track
test('Edit track with invalid type',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "name": "Lost",
            "type": 3,
            "duration": 2
            
    }).expect(400)
   
})

//Edit album
test('Edit album',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artistalbum/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type" : "Rock"
            
    }).expect(200)
   
})
//Edit album

test('Edit album with invalid album type',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artistalbum/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type" : 1
            
    }).expect(400)
   
})
//Edit album
test('Edit album with invalid user type',async () => {
    const user = await User.findById(id1)
    const response = await request(app)
        .put('/artistalbum/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type" : "Rock"
            
    }).expect(500)
   
})
//Edit album
test('Edit album with invalid id',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artistalbum/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "album_type" : "Rock"
            
    }).expect(404)
   
})

//Add track to an album
test('Add track to an album',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id6+'/'+id5)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(200)
   
})
//Add track to an album
test('Add track to an album with invalid track id',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id4+'/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(404)
   
})
//Add track to an album
test('Add track to an album with invalid album id',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id3+'/'+id3)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(404)
   
})
//Add track to an album
test('Add track to an album with invalid user type',async () => {
    const user = await User.findById(id1)
    const response = await request(app)
        .put('/artist/'+id3+'/'+id4)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(500)
   
})
//Remove track from an album
test('Remove track from an album',async () => {
    const user = await User.findById(id2)
    const response = await request(app)
        .put('/artist/'+id6+'/'+id5)
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send().expect(200)
   
})









