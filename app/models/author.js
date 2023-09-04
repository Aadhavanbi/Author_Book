'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const Author= sequelize.define("author",{
    image: {
      type: DataTypes.BLOB
    },
    author_name: {
      type: DataTypes.STRING
    },
    email:{
       type: DataTypes.STRING
    },
    password:{
      type:DataTypes.STRING
    },
    mobile_number:{
      type:DataTypes.INTEGER
    },
    address:{
      type:DataTypes.STRING
    },
    country:{
      type:DataTypes.STRING
    },
    state:{
      type:DataTypes.STRING
    },
    city:{
      type:DataTypes.STRING
    }
  },{
    timestamps: false
  });

  
  return Author
}





















/*
module.exports = (sequelize, DataType) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    senha: {
      type: DataType.STRING,
      allowNull: false
    },
    id_funcao: {
      type: DataType.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataType.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  })

  return Usuario
}
*/