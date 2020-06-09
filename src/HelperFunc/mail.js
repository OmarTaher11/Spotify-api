const nodemailer = require('nodemailer')
const url = process.env.DOMAIN // || Real domain 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL ,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })


/**
 * @example
 * let email = "omar@gmail.com "
 * let token = jwt.sign(id)
 * sendVerification(email , token)
 * 
 * @param {string} email email of the user need to be verified 
 * @param {string} token the the request path to verify the email
 */
const sendVerification = (email , token) => {
  let mailOptions = {
        from: "spotifybackend@gmail.com",
        to: email,
        subject: 'Please verify you email ',
        text: "click on this link to verify your email : "+url+'verify?token='+token
    }
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          return new Error("cannot send this email")
       } else {
        
    }
  })
}

/**
 * @example
 * let email = "omar@gmail.com "
 * let token = jwt.sign(id)
 * sendForgotPassword(email , token)
 * 
 * @param {string} email email of the user need to be verified 
 * @param {string} token the the request path to enter new password
 */
const sendForgotPassword= (email , token) => {
   

    let mailOptions = {
              from: "spotifybackend@gmail.com",
              to: email,
              subject: 'Forgot Password ',
              text: "click on this link to enter your new password : "+url+'forgotPassword?token='+token
            }
      transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return new Error("cannot send this email")
              } else {
               
              }
          })

}
/**
 * @example
 * let email = "omar@gmail.com "
 * let token = jwt.sign(id)
 * sendUpgrade(email , token)
 * 
 * @param {string} email email of the user need to be verified 
 * @param {string} token the the request path to upgrade the user
 */
const sendUpgrade = (email , token) => {
   

    let mailOptions = {
              from: "spotifybackend@gmail.com",
              to: email,
              subject: 'upgrade to premium ',
              text: "click on this link to upgrade to premium : "+url+'upgrade?token='+token
            }
      transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
               return  new Error("cannot send this email")
              } else {
               
              }
          })

}

module.exports = {
    sendVerification,
    sendForgotPassword,
    sendUpgrade 
}
