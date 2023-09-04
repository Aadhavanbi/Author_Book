'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const State= sequelize.define("state",{
    state_name: {
      type: DataTypes.STRING
    },
    country_name:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  }); 
  return State
}