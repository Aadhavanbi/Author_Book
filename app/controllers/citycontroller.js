const db = require('../models/index')
//const Sequelize = require('sequelize'); 
const dbstate =db.State;
const dbcity = db.City;
const addC = async(req,res,next)=>{
  const data = await dbstate.findAll({});
    res.render('City/addCity', {
    title: 'Add City ...',
    subtitle: '',
    data
    })
}
const addCity = async(req,res,next)=> {
    const cid= req.body.state_id;
   
    const state= await dbstate.findOne({
      where:{
        id:cid
      },
      include: dbcity
    })
    const info ={
      city_name: req.body.city_name,
      state_name: state.state_name,
      state_id: req.body.state_id}
    const datastore= await dbcity.create(info);
    if (datastore) {res.redirect('/citylist')
      } else {res.status(500).send('Ops... ')}
  }
  const citylist = async(req, res, next)=>{
    let data = await dbcity.findAll({});
  res.render('City/city_view', {
    title: 'City List...',
    subtitle: '',
    data
  })
  }
  const getCityByStateId = async(req, res, next)=>{
    const city1= await dbcity.findAll({where:{stateId:{dbstate:id}}})
    return city1
  }

module.exports ={
    addC,
    addCity,
    citylist,
  getCityByStateId
  }