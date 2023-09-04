'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const City = sequelize.define("city",{

    city_name:{
      type: DataTypes.STRING
    },
    state_name:{
      type: DataTypes.STRING
    },
    state_id:{
      type: DataTypes.INTEGER
    }
  },{
    timestamps: false
  }
  );

  return City
}