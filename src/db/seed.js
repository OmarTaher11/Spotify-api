const seeder = require('mongoose-seed');

seeder.connect(process.env.MONGODB_URL, function(){
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
                "emailConfirmation": true,
                "display_name": "omar",
                "email": "omar_taher2012@yahoo.com",
                "password": "12345678",
                "country" :"egypt",
                "product": "free",
                "type": "user"
            },{
                "emailConfirmation": true,
                "display_name": "michael",
                "email": "michael@yahoo.com",
                "password": "12345678",
                "country" :"egypt",
                "product": "free",
                "type": "user"
            },{
                "emailConfirmation": true,
                "display_name": "mariz",
                "password": "12345678",
                "country" :"egypt",
                "email": "mariz@yahoo.com",
                "product": "free",
                "type": "user",
            },{
                "emailConfirmation": true,
                "display_name": "amr diab",
                "password": "12345678",
                "country" :"egypt",
                "email": "amrdiab@yahoo.com",
                "product": "premium",
                "type": "artist",
            },
            {
                "emailConfirmation": true,
                "display_name": "hamaki",
                "password": "12345678",
                "country" :"egypt",
                "email": "hamaki@yahoo.com",
                "product": "premium",
                "type": "artist",
            },{
                "emailConfirmation": true,
                "display_name": "hamo bika",
                "password": "12345678",
                "country" :"egypt",
                "email": "hamobika@yahoo.com",
                "product": "premium",
                "type": "artist",
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