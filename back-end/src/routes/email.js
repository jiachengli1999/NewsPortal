const express = require('express');
const router = express.Router();

// body parser and nodemailer for email implementation
var nodemailer = require('nodemailer');


// send email
let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'nodeangularcert@gmail.com',
      pass: 'Tcs1234567'
    }
  });
  
  router.post('/', (req, res) => {
    var data = req.body.name;
    console.log(data);
    const message = {
      from: req.body.email, // Sender address
      to: 'nodeangularcert@gmail.com', // List of recipients
      subject: 'User Query', // Subject line
      text: `Name: ${req.body.name}
Message: ${req.body.msg}` // Plain text body
    };

  
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
  
    res.status(200).send();
  });

  module.exports = router;
  