const seeder = require('mongoose-seed');

const db = process.env.MONGODB_URL

seeder.connect('mongodb://127.0.0.1:27017/spotify-dev-database', function(){
    seeder.loadModels([
        './src/models/users.js',
        './src/models/album.js'
    ]);
    seeder.clearModels (['User','Album' ], function(){
        seeder.populateModels(data, function (err, done){
            if(err) {
                return console.log("seed err", err)
            }
            if (done) {
                return console.log("seed done", done);
            }
            seeder.disconnect()
        })
    })
})

const data = [
    {
        'model': 'User',
        'documents': [
            {
                "display_name": "seedtest",
                "email": "seedtest@gmail.com",
                "password": "123123123",
                "country" : "Egypt",
                "product" : "free",
                "type" : "artist"

            }
        ]
    },
    {
        'model': 'Album',
        'documents': [
            {
                "album_type": "album",
                "name": "wish you were here",
                "images": ""
            },
            {
                "album_type": "album",
                "name": "the wall",
                "images": ""
            },
            {
                "album_type": "album",
                "name": "test",
                "images": ""
            }
        ]
    }
]