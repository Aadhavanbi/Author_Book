const express = require('express');
const router = express.Router();
const Mycontroller = require('../controllers/authorcontroller');
const BookController= require('../controllers/bookcontroller');
const citycontroller = require('../controllers/citycontroller');
const countrycontroller = require('../controllers/countrycontroller');
const statecontroller = require('../controllers/statecontroller');
const versioncontroller = require('../controllers/version_controller');


router.get('/home', Mycontroller.home);
router.get('/', Mycontroller.homepage);
router.get('/add', Mycontroller.add);

router.get('/version', Mycontroller.version);
router.get('/:id/books', Mycontroller.books);
router.get('/books', Mycontroller.books);
router.get('/dashboard', Mycontroller.dashboard);



//router.get('/login',Mycontroller.login);
router.post('/loginview',Mycontroller.loginview);
router.get('/logout',Mycontroller.logout);

router.get('/homepage',Mycontroller.homepage);

router.get('/version?', Mycontroller.version);
router.get('/test', Mycontroller.test);

router.post('/getstatebycountry',Mycontroller.getstatebycountry);
router.post('/getcitybystate',Mycontroller.getcitybystate);

router.post('/addauthor',Mycontroller.addAuthor)
router.get('/:id/authoredit', Mycontroller.authoredit);
router.post('/:id/authoreditadd', Mycontroller.editUserAdd);
router.post('/:id/authordelete', Mycontroller.authordelete);
router.get('/:id/view_book', Mycontroller.view_book);
router.get('/:id/allDetails', Mycontroller.allDetails);
router.get('/authorlist', Mycontroller.authorlist);
//router.post('/getstates',Mycontroller.getState);

router.get('/addB', BookController.addB);
router.post('/addBook',BookController.addBook);
router.get('/:id/bookedit', BookController.bookedit);
router.post('/:id/bookeditadd', BookController.editbookadd);
router.post('/:id/delete', BookController.bookdelete);
router.get('/:id/view_version', BookController.view_version);
router.get('/booklist', BookController.listBook);


router.get('/addC', citycontroller.addC);
router.post('/addCity',citycontroller.addCity);
router.get('/GetCityByStateId',citycontroller.getCityByStateId);
router.get('/citylist', citycontroller.citylist)
//router.get('/:id/cityedit', Mycontroller.edit);
//router.post('/:id/cityeditadd', Mycontroller.editbookadd);
//router.post('/:id/delete', Mycontroller.delet);
//router.get('/:id/view_version', Mycontroller.view_version)


router.get('/addCount', countrycontroller.addCount);
router.post('/addCountry',countrycontroller.addCountry);
router.get('/countrylist', countrycontroller.countrylist);
router.get('/:id/countryedit', countrycontroller.countryedit);
router.post('/:id/countryeditadd', countrycontroller.countryeditadd);
//router.post('/:id/delete', Mycontroller.delet);
//router.get('/:id/view_version', Mycontroller.view_version)
//router.get('/GetCityByStateId',Mycontroller.getCityByStateId);




router.get('/addS', statecontroller.addS);
router.post('/addState',statecontroller.addState);
//router.get('/:id', Mycontroller.edit);
//router.post('/:id', Mycontroller.editUserAdd);
//router.post('/:id/delete', Mycontroller.delet);
//router.get('/:id/view_book', Mycontroller.view_book);
//router.get('/:id/allDetails', Mycontroller.allDetails);
router.get('/statelist', statecontroller.statelist);



router.get('/addV', versioncontroller.addV);
router.post('/addVersion',versioncontroller.addVersion);
router.get('/:id/versionedit', versioncontroller.versionedit);
router.post('/:id/editversionadd', versioncontroller.editversionadd);
router.post('/:id/versiondelete', versioncontroller.versiondelete);
router.get('/versionlist', versioncontroller.listVersion);


module.exports = router