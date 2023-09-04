const db = require('../models/index')
const nodeMailer = require('../../storage/js/nodemailer.js');
//const Sequelize = require('sequelize');
//const state = require('../models/state');
//const path = require('path')
//const url = require('url');
//const { log } = require('winston');

const dbconnect = db.Author;
const dbBook = db.Book;
const dbVersion = db.BookVersion;
const dbState = db.State;
const dbCity = db.city;
const dbCount = db.Country;

const logout =async(req, res, next)=>{
  console.log('Logout');
  req.session.destroy();

  res.redirect('/');
  
//   req.session.destroy(err=>{
//     // console.log("error");
// if(err){
//     return res.redirect('/login');
// }
// res.clearCookie(req.session);
// res.redirect('/');

// })
  
}

const homepage =async(req, res, next)=>{
  // const sessionToken = uuid.v4();
  // const now = new Date();
  // const expiresAt = new Date(+now + 120 * 1000);
  // const session = new Session(email, expiresAt);
  // sessions[sessionToken] = session;
  // res.cookie("session_token", sessionToken, { expires: expiresAt });
  //   res.end();
  const errorMessage = req.flash('error')[0];
  const testgit=132;
  const test2="merage_tes_y8ogiulhjknt";

  res.render('homepage',{
    title:'User Register...',
    errorMessage
  })
  // //console.log(req.cookies)
}

// const login = async(req, res, next)=>{

//   res.render('login', {
//     title: 'Login Author...',
 
//   })
// }







const loginview = async(req, res, next )=>{
  
  try {
    const emailid=req.body.email;
  const passwordid=req.body.password;
  const author= await dbconnect.findAll({where:{email:emailid,password:passwordid}});
  const id=author[0].dataValues.id;
  const authorid= await dbBook.findAll({where:{authorId:id}});
  const cookies = req.headers.cookie;
  //console.log(cookies);
  if (author.length > 0) {  
      nodeMailer.sendMail(emailid);
      
    const user = author[0];
    req.session.user = { id: user.id, email: user.email };
    
    res.render('authorlogined',{
      author,
      authorid
    })
  } else {
    //console.log("fail");
    res.send('Invalid username or password');
  }
  return res.send(req.session.dbconnect);
  } catch (error) {
    req.flash('error', 'Invalid username or password');
    res.redirect('/');
  }
}
const home = (req, res, next) => {
  res.render('home', {
    title: 'Pick the One page...',
    subtitle: ''
  })
}

const add = async(req,res,next)=>{

      const countrydb =await dbCount.findAll({});   
      
      const statedb = await dbState.findAll({});
      const citydb = await dbCity.findAll({});
     
      res.render('register', {
      title: 'Add Author ...',  
        countrydb,
        citydb,
        statedb,
    });
   
  };


const addAuthor =   async(req,res,next)=> {
  
  const info ={
    //image: req.files.image,
  
    author_name: req.body.author_name,
    email: req.body.email,
    password: req.body.password,
    mobile_number: req.body.mobile_number,
    address : req.body.address+','+ req.body.city_name+','+req.body.state_name+','+req.body.country_name,
    country : req.body.country_name,
    state : req.body.state_name,
    city : req.body.city_name
  }
 
  const datastore= await dbconnect.create(info);  
    if (datastore) {
      res.redirect('/')
    } else {
      res.status(500).send('Ops... ')
     }
}
const authorlist =async (req, res, next)=>{
 
  let data = await dbconnect.findAll({});
  res.render('Author/table_view', {
    title: 'Author List...',
    subtitle: '',
    data
  })
}
const authordelete = async (req, res, next)=>{
  const { id } = req.params;
    const data = await dbconnect.destroy({
      where: { id }
    })
  if (data) {
    res.redirect('/author')
  } else {
    res.status(500).send('Ops... Algo de errado não deu certo!')
  } 
  }

  const authoredit = async(req, res, next)=>{
    const countrydb =await dbCount.findAll({});   
    const citydb = await dbCity.findAll({});
    const statedb = await dbState.findAll({});
    
       const {id}= req.params;
       //const body =req.body;
       const data = await dbconnect.findOne({where:{id}});
        res.render('Author/editUser',{
          title:"Edit The Author Details ...",
          data,
          countrydb,
          citydb,
          statedb,
          })
  }

  const editUserAdd = async(req, res, next)=>{
    const {id}= req.params;
    const info ={

      author_name: req.body.author_name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      address : req.body.address,
      country : req.body.country_name,
      state : req.body.state_name,
      city : req.body.city_name
    }
    let datastore= await dbconnect.update(info,{where: {id}});
    if (datastore) {
      res.redirect('/authorlist')
    } else {
      res.status(500).send('Ops... ')
     }
  }

 
  const view_book = async(req, res, next)=>{
    const {id}= req.params;
    const data = await dbBook.findAll({where:{authorId:id}});   
    res.render('Book/view_book',{
      title:'View Book',
      subtitle:'',
      data
    })
  };

  const allDetails = async(req, res, next)=>{
    
   try {
    
    const {id}= req.params;
    
    const authorr =await dbconnect.findOne({
      where:{id:id},
      include:[
        {
          model:dbBook,
          include:[
            {
              model:dbVersion
            }
          ]
        }
      ]
    });
    //const authorr = author;
    const book = authorr.books;
    const version = book[0].bookVersions;
   //console.log(authorr);
//console.log(author);
   
    // const author = await dbconnect.findAll({where:{id}});
    // const book = await dbBook.findAll({where:{authorId:id}});  
    // const bid = await dbBook.findOne({where:{authorId:id}});
    // const bid1 = bid.id;
    // const book_version = await dbVersion.findAll({where:{bookId:bid1},include: dbBook});
    res.render('Author/allDetails',{
      authorr,
      book,
      version
    })
   } catch (error) {
    console.log("Have no valuesz")
    res.end()
   }

   /*  console.log(book_version) */
    //console.log(data)

   
  }
  

const getState =(req,res)=>{
// return  1;

  const stateid= req.body.statevalue;
  console.log(stateid)

}


const getstatebycountry =async (req, res, next)=>{
  const country_id = req.body.country_id;
dbState.findAll({
    where: {
        countryId: country_id
    }
})
.then(states => {
    res.json({
        msg: 'success',
        states: states
    });
})
.catch(error => {
    res.json({
        msg: 'error'
    });
});
}
const getcitybystate = (req, res, next)=>{
  const state_ID = req.body.state_ID;
 
  dbCity.findAll({
    where: {
      state_id: state_ID
    }})
  .then(cities => {res.json({cities: cities});
  })
  // .catch(error => {
  //   res.json({
  //       msg: 'error'
  //   });
  // });
}

const test =async(req,res,next)=>{

array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//console.log(array.length)
for(var i=0;i<array.length;i++){
  const author = await dbconnect.findAll({where:{id:array[i]}});

  if(author.length){
    console.log(author[0].dataValues.author_name)
  }
}
console.log('completed')
res.end()
}

const version = async(req,res,next)=>{
  const user = req.session.user;
  const bookID = req.query.book_id;
  const versiondata = await dbVersion.findAll({where:{bookId:bookID}})
  if (user) {
    res.render('bookversion',{
      bookID,
      versiondata
  })
} else {
   console.log("imo,");
}
  
  
}

const books = async(req,res,next)=>{
 // const authorId =req.params.id;
  

 const user = req.session.user;
 const cookies = req.headers.cookie;


 const data = await dbBook.findAll({where:{authorId:user.id}});
 const user_id= user.id;
 if (user) {
  res.render('book',{
    data,
    user_id
  })
} else {
  res.redirect('/login');
}

  
}

const  dashboard= async(req,res,next)=>{

  const user = req.session.user;
  const author= await dbconnect.findAll({where:{id:user.id}});
  
  res.render('authorlogined',{
    author
  })
}



module.exports ={
  add,
  addAuthor,
  authorlist,
  authordelete,
  authoredit,
  home,
  view_book,
  editUserAdd,
  allDetails,
  getState,
  getstatebycountry,
  getcitybystate,
  test,
  //login,
  loginview,
  homepage,
  logout,
  version,
  books,
  dashboard,
  
  
}


  



