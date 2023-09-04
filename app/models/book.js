'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const Book = sequelize.define("book",{

    book_name:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    author_name:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  }
  );

  return Book
}