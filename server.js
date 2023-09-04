require('dotenv').config();
const express = require('express');
const app = express();
const session = require("express-session");
const flash = require('express-flash');

const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'storage/css')));

// app.use(function (req, res, next) {
//   res.removeHeader('X-Powered-By');
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();});
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({key:'user_sid' ,secret: "secret",saveUninitialized: false ,cookie:{ expires:600000 } ,resave: false}));

// app.use((req,res,next)=>{
//   if (req.session.user && req.session.user_sid) {
//     res.redirect('/dashboard')
//   }
//   next();
// })
// var sessionChecker=(req,res,next)=>{
//   if (req.session.user && req.session.user_sid) {
//     res.redirect('/dashboard')
//   }
//   else{
//     next();
//   }
// }
app.use(flash());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
const go_home = require('./app/routers/index');
app.use('/',go_home)

const PORT_NUMBER =  process.env.SERVER_PORT;
app.listen({ port: PORT_NUMBER }, async () => {
  console.log('Server up on http://localhost:8080')})

