const nodemailer = require('nodemailer')
const url = "http://localhost:3000/"
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "spotifybackend@gmail.com",
      pass: "Omar12345"
    },
    tls: {
      rejectUnauthorized: false
    }
  })


const sendVerification = (email , token) => {
   

              let mailOptions = {
                        from: "spotifybackend@gmail.com",
                        to: email,
                        subject: 'Please verify you email ',
                        text: "click on this link to verify your email : "+url+'verify?token='+token
                      }
                transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          return console.log(error)
                        } else {
                         return console.log("sent")
                        }
                    })

}


const sendForgotPassword= (email , token) => {
   

    let mailOptions = {
              from: "spotifybackend@gmail.com",
              to: email,
              subject: 'Forgot Password ',
              text: "click on this link to enter your new password : "+url+'forgotPassword?token='+token
            }
      transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return console.log(error)
              } else {
               return console.log("sent")
              }
          })

}

const sendUpgrade = (email , token) => {
   

    let mailOptions = {
              from: "spotifybackend@gmail.com",
              to: email,
              subject: 'upgrade to premium ',
              text: "click on this link to upgrade to premium : "+url+'upgrade?token='+token
            }
      transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return console.log(error)
              } else {
               return console.log("sent")
              }
          })

}

module.exports = {
    sendVerification,
    sendForgotPassword,
    sendUpgrade 
}
// const main = async function (){
//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: "spotifybackend@gmail.com",
//           pass: "Omar12345"
//         },
//         tls: {
//           rejectUnauthorized: false
//         }
//       })
    
//       //let global = process.env.GLOBAL || 'false'
//       //var url = config.get('FrontUrl')
    
//       //if (global === 'true') {
//         //url = config.get('globalFrontUrl')
//       //}
    
//       let mailOptions = {
//         from: "spotifybackend@gmail.com",
//         to: "omar_taher2012@yahoo.com",
//         subject: 'eshtaghalet keda ysta ',
//         text:"testing number 1"
//       }
    
//       await transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           return console.log(error)//res.status(500).send('Unable to send email')
//         } else {
//           //winston.info('Email sent to: ' + user.email)
//           return console.log("sent")//res.json({
//             //msg: 'Check your mail to reset your password.'
//           //})
//         }
//       })
//     }
//   main()