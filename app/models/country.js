'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const Country= sequelize.define("country",{
    country_name: {
      type: DataTypes.STRING
    }//,
    // capital: {
    //   type: DataTypes.STRING
    // }
  },{
    timestamps: false
  }); 
  return Country
}