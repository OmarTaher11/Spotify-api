const request = require("supertest")
const app = require('../app')
const Track =require('../models/track')
const playlist= require('../models/playlist')
const mongoose = require('mongoose')
const id3 = new mongoose.Types.ObjectId()
const id4 = new mongoose.Types.ObjectId()
let dummyTrack={
    _id: id3,
    "disc_no" : 3,
    "duration" : 3,
    "name" : "Once",
    "href" : "https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1",
    "type" : "Pop",
    "track_number" : 3,
    "artists" : [],
    "genre": "Indie"
}
let dummyPlaylist={
    
        _id: id4,
        "collaborative": true,
        "description" : "WORKOUT ESSENTIALS",
        "name": "Workout",
        "public": true,
        "type": "Indian"
    
}
beforeEach(async () => {
    await Track.deleteMany({})
    await playlist.deleteMany({})
    await new Track(dummyTrack).save()
    await new playlist(dummyPlaylist).save()
})
//Add playlist
test('Add playlist',async () => {
    const response = await request(app)
        .post('/playlist')
        .send({
            "collaborative": true,
            "description" : "WORKOUT ESSENTIALS",
            "name": "Workout",
            "public": true,
            "type": "Indian"
        })
        .expect(200)
   
})
//Add track to a playlist
test('Add track to playlist',async () => {
    const response = await request(app)
        .put('/playlistmanager/'+id3+'/'+id4)
        .send()
        .expect(200)
   
})
//Add track to a playlist
test('Add track to playlist with invalid track id',async () => {
    const response = await request(app)
        .put('/playlistmanager/'+id4+'/'+id4)
        .send()
        .expect(404)
   
})

//Remove track from playlist
test('Remove track from playlist',async () => {
    const response = await request(app)
        .delete('/playlistmanager/'+id4+'/'+id3)
        .send()
        .expect(200)
   
})
//Remove track from playlist
test('Remove track from playlist with invalid playlist id',async () => {
    const response = await request(app)
        .delete('/playlistmanager/'+id3+'/'+id3)
        .send()
        .expect(404)
   
})
