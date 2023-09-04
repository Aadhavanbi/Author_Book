const db = require('../models/index')
//const Sequelize = require('sequelize'); 
const dbcount = db.Country;
const addCount = async(req,res,next)=>{
  const data = await dbcount.findAll({});
    res.render('Country/addcountry', {
    title: 'Add Country ...',
    subtitle: '',
    data
    })
}
const addCountry = async(req,res,next)=> {
    const info ={
        country_name: req.body.country_name,
       
      }
      console.log(info);
      const datastore= await dbcount.create(info);  
        if (datastore) {
          res.redirect('/countrylist')
        } else {
          res.status(500).send('Ops... ')
         } 

    
  }
  const countrylist = async(req, res, next)=>{
    let data = await dbcount.findAll({});
  res.render('Country/country_view', {
    title: 'Country List...',
    subtitle: '',
    data
  })
  }
  const countryedit =async(req,res,next)=>{

  }

  const countryeditadd =async(req,res,next)=>{
    
  }
module.exports ={
    addCount,
    addCountry,
    countrylist,
    countryedit,
    countryeditadd
  }