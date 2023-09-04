const db = require('../models/index')
//const Sequelize = require('sequelize'); 
const dbauthor =db.Author;
const dbstate = db.State;
const dbcountry = db.Country;
const addS = async(req,res,next)=>{
  const data = await dbcountry.findAll({});
    res.render('State/addState', {
    title: 'Add State ...',
    subtitle: '',
    data
    })
}
const addState = async(req,res,next)=> {
  const sid= req.body.countryId;
   
  const country= await dbcountry.findOne({
    where:{
      id:sid
    },
    include: dbstate
  })
  const info ={
    state_name: req.body.state_name,
    country_name: country.country_name,
    countryId: req.body.countryId
  }

  const datastore= await dbstate.create(info);
  if (datastore) {
      res.redirect('/statelist')
    } else {
      res.status(500).send('Ops... ')
     }
  }
  const statelist = async(req, res, next)=>{
    let data = await dbstate.findAll({});
  res.render('State/state_view', {
    title: 'State List...',
    subtitle: '',
    data
  })
  }

module.exports ={
    addS,
    addState,
    statelist
  }