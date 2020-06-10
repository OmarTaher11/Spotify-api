const request = require("supertest")
const app = require('../app')
const Track =require('../models/track')
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
let dummyTrack2={
    _id: id4,
    "disc_no" : 3,
    "duration" : 3,
    "name" : "Thrice",
    "href" : "https://www.youtube.com/watch?v=wXhMqDotfLk&list=RDwXhMqDotfLk&start_radio=1",
    "type" : "Pop",
    "track_number" : 3,
    "artists" : [],
    "genre": "Pop"
}
beforeEach(async () => {
    await Track.deleteMany({})
    await new Track(dummyTrack).save()
    await new Track(dummyTrack2).save()
})
//Show tracks by genres
test('Show tracks by genres',async () => {
    const response = await request(app)
        .get('/audioplayer')
        .send({"genre": "Indie"})
        .expect(200)
   
})
//Show tracks by genres
test('Show tracks by genre',async () => {
    const response = await request(app)
        .get('/audioplayer')
        .send({"genre": "Ray"})
        .expect(404)
   
})


