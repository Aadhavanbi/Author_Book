require('dotenv').config();

const { logMsg } = require('../logger/logger');
module.exports =empModel= {
   
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "port": process.env.PORT,
    "host": process.env.HOST,
    "dialect": "mysql",
    "logging": (message) =>(logMsg.info(message))

  }
  };