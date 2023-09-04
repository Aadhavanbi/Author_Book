 const db = require('../models/index')
const Sequelize = require('sequelize');

const dbconnect = db.BookVersion;
const dbBook = db.Book
const addV = async(req,res,next)=>{
      const book_id = req.query.book_id;
      const data = await dbBook.findAll({where:{id:book_id}});
      res.render('Version/addVersions', {
      title: 'Add VERSION FOR Book ...',
      subtitle: '',
      data
    })
}
const addVersion = async(req,res,next)=> {
  const bid= req.body.bookId;
  
  const book= await dbBook.findOne({
    where:{
      id:bid
    },
    include: dbconnect
  })
  //console.log(book.book_name);
  
  const info ={
    version: req.body.version,
    description: req.body.description,
    book_name: book.book_name,
    bookId: req.body.bookId
  }
  //console.log(info);
  const datastore= await dbconnect.create(info);  
    if (datastore) {
      res.redirect('/books')
    } else {
      res.status(500).send('Ops... ')
     }
}
 const listVersion =async (req, res, next)=>{
 
  let data = await dbconnect.findAll({});
  res.render('Version/version_table_view', {
    title: 'Version List...',
    subtitle: '',
    data,
  })
} 
const versionedit = async(req, res, next)=>{

  const {id}= req.params;
  const data = await dbconnect.findOne({where:{id}});
  const dataa =await dbBook.findAll({});
  res.render('Version/editVersion',{
    title:'Edit the Version Detials...',
    data,
    dataa
  })

}

const editversionadd = async(req, res, next)=>{
  const bid= req.body.bookId;
  const book= await dbBook.findOne({where:{id:bid},include: dbconnect})
const {id} = req.params;
const info ={
  version: req.body.version,
  description: req.body.description,
  book_name: book.book_name,
  bookId : req.body.bookId
 }
const data = await dbconnect.update(info,{where:{id}});
if(data){
  res.redirect('/version');
}else{
  res.status(500).send('ops...');
}
}

const versiondelete = async(req, res, next)=>{
  const {id}= req.params;
  const data = await dbconnect.destroy({where:{id}});
  if(data){
    res.redirect('/version');
  }else{
    res.status(500).send('ops...');
  }
}



module.exports ={
  addV,
  addVersion,
  listVersion,
  versiondelete,
  versionedit,
  editversionadd

}


   