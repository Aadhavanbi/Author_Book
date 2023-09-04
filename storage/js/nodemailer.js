const nodeMailer= require('nodemailer');

const transporter = nodeMailer.createTransport({
    service:'outlook',
    auth:{
        user:'aadhavanvalli@outlook.com',
        pass:'dell2022'
    }
  });
  function sendMail(Email) {
  const mail ={
    from: 'aadhavanvalli@outlook.com',
    to: Email,
    subject: 'Login Message',
    text: 'Hai Your account recently logined'
  };
  
  transporter.sendMail(mail, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Email sent successfully');
    }
    });
  }

  function sendMailbook(Email,Book) {
    const mail ={
      from: 'aadhavanvalli@outlook.com',
      to: Email,
      subject: 'Book Added Message',
      text: "Added book is"+Book
    };
    
    transporter.sendMail(mail, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Email sent for Book added successfully');
      }
      });
    }
  

  module.exports={
    sendMail,
    sendMailbook
  }