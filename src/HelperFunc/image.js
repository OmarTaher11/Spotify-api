const multer = require('multer')
const upload = multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
       if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)){
         cb(new Error('Please upload an image'))
    }
         cb(undefined,true)
        // cb(undefined,false)
    }
})

module.exports = {
    upload
}

