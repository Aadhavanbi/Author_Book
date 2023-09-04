const db = require('../models/index');
const nodeMailer = require('../../storage/js/nodemailer.js');
//const Sequelize = require('sequelize'); 

const dbauthor =db.Author;
const dbconnect = db.Book;
const dbversion = db.BookVersion;

const addB = async(req,res,next)=>{
  const user_id=req.query.user_id;
  
  const data = await dbauthor.findAll({where:{id:user_id}});
    res.render('addbook', {
    title: 'Add Book ...',
    subtitle: '',
    data
    })
}
const addBook = async(req,res,next)=> {
  const aid= req.body.authorId;
  const user = req.session.user.email;
  const book= req.body.book_name;
  nodeMailer.sendMailbook(user,book);
  const author= await dbauthor.findOne({
    where:{
      id:aid
    },
    include: dbconnect
  })
  const info ={
    book_name: req.body.book_name,
    description: req.body.description,
    author_name: author.author_name,
    authorId: req.body.authorId
  }
  const datastore= await dbconnect.create(info);
    if (datastore) {
      res.redirect('/books')
    } else {
      res.status(500).send('Ops... ')
     }
}
 const listBook =async (req, res, next)=>{
 
  let data = await dbconnect.findAll({});
  res.render('Book/book_table_view', {
    title: 'Book List...',
    subtitle: '',
    data,
  })
} 
const bookedit = async(req, res, next)=>{
  
  const {id}= req.params;
  const data = await dbconnect.findOne({where:{id}});
   res.render('Book/editBook',{
    title: data.author_name,
     data
     })
}

const editbookadd = async(req, res, next)=>{

const {id}= req.params;
const info ={
 book_name: req.body.book_name,
 description: req.body.description
}
let datastore= await dbconnect.update(info,{where: {id}});
if (datastore) {
 res.redirect('/booklist')
} else {
 res.status(500).send('Ops... ')
}
}
const bookdelete= async(req, res, next)=>{
  const {id}= req.params;
  const data = await dbconnect.destroy({where:{id}});
  if(data){
    res.redirect('/book')
  } else{
    res.status(500).send('ops...')
  }
}
const view_version = async(req, res, next)=>{
    
  const {id}= req.params;

  const data = await dbversion.findAll({where:{id}});   
  res.render('Version/view_version',{
    title:'View Version',
    subtitle:'',
    data
  })
};

module.exports ={
  addB,
  addBook,
  listBook,
  bookedit,
  editbookadd,
  bookdelete,
  view_version
}


  