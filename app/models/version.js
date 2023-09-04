'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const BookVersion = sequelize.define("bookVersion",{

    version:{
      type: DataTypes.INTEGER
    },
    description:{
      type: DataTypes.STRING
    },
    book_name:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  }
  );

  return BookVersion
}