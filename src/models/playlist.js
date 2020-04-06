const mongoose = require('mongoose')
const validator = require('validator')


const playlistSchema = mongoose.Schema( {
})
/* Here will be some code for defining the playlist schema
and some related methods */

playlistSchema.methods.getFollowed = async function(id){
    const play = this 
   // console.log(id)
    // users will be id of the follower
    // follwed is attribute (array of users id )
    try {
     
        const followed = play.followed.find((p)=>{
            return (p.users.toString() === id)
        })
        if(!followed){ 
        play.followed = play.followed.concat({ user:id })
        await user.save()
        }
    }catch(e){
          throw Error('you cannot follow this playlist') 
    }
}
