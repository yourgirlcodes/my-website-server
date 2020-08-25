const express = require('express')
const emailRouter = express.Router()
const nodemailer = require('nodemailer')

console.log("from emailRoute")


const transport = {
    //all of the configuration for making a site send an email.
  
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(transport);
  transporter.verify((error, success) => {
    if(error) {
      console.error(error)
    } else {
      console.log('users ready to mail myself')
    }
  });

  emailRouter.post('/', (req,res, next) => {
    //make mailable object
    const mail = {
      from: process.env.THE_EMAIL,
      to: 'zoe.yourgirlcodes@gmail.com',
      subject: req.body.subject,
      text: `
      from:
      ${req.body.name} 

      contact: ${req.body.email}

      message: 

      ${req.body.text}`
    }
    
    transporter.sendMail(mail, (err,data) => {
        if(err) {
          res.json({
            status: 'fail'
          })
        } else {
          res.json({
            status: 'success'
          })
        }
      })
});

module.exports = emailRouter