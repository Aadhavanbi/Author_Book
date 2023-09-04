'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.js')[env];
//console.log(env);
//console.log(config);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize= sequelize;
db.Sequelize= Sequelize;
db.Author= require('./author.js')(sequelize, Sequelize.DataTypes);
db.Book= require('./book.js')(sequelize, Sequelize.DataTypes);
db.BookVersion= require('./version.js')(sequelize, Sequelize.DataTypes);
db.Country= require('./country.js')(sequelize, Sequelize.DataTypes);
db.State= require('./state.js')(sequelize, Sequelize.DataTypes);
db.City= require('./city.js')(sequelize, Sequelize.DataTypes);

db.Author.hasMany(db.Book);
db.Book.belongsTo(db.Author);


db.Country.hasMany(db.State);
db.State.belongsTo(db.Country);

db.State.hasMany(db.City);
db.City.belongsTo(db.State);

db.Book.hasMany(db.BookVersion);
db.BookVersion.belongsTo(db.Book);

db.sequelize.sync({ force : false})
.then(()=>{
  console.log('Yes re-sync done.');
})

module.exports = db;
