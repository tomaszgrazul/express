const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Post = require('./models/PostModel')


mongoose.connect('mongodb://127.0.0.1:27017/express-blog');

// const postController = require('../controllers/postController')

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs'); 


// app.get('/mongoose', function(req, res){
    // Post.findById('63bfb0e000bf08070bf491ca').exec((err, post)=>{
        
        // if(err) {
        //     res.send(err);
        // } 
        // console.log(post);
    // }) stara wersja przed 7.

//     Post.findById('63bfb0e000bf08070bf491ca').then((post)=>{
//         console.log(post);
//     }).catch((err) => {
//             res.send(err);
//         });
// }); nowa wersja 



// app.get('/mongoose/:id', function(req, res){
//     Post.findById(req.params.id).then((post)=>{
//         // console.log(post);
//         res.render('home', {
//             title: post.title, 
//             content: post.content, 
//             displayTitle: true,
//             names: ['Adam', 'Ola', 'Kasia', 'Tomek']
//         });
//     }).catch((err) => {
//             res.send(err);
//         });
// });

// app.get('/', function(req, res){
//     res.render('home', {
//         title: 'My app title', 
//         content: 'Lorem ipsum', 
//         displayTitle: false,
//         names: ['Adam', 'Ola', 'Kasia', 'Tomek']
//     });
// });

// app.get('/blog', postController.main);
// app.get('/blog/edit/:id', postController.editForm);
// app.post('/blog/edit/:id', postController.update);
// app.get('/blog/delete/:id', postController.delete);
// app.get('/blog/add', (req, res) => {res.render('blogViews/addPost')});
// app.post('/blog/add', postController.create);
// app.get('/blog/:id', postController.post);

const authHelper = require("./middlewares/authHelper");

const blogRouter = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/blog', authHelper, blogRouter);
app.use('/user', userRoutes);

const authApiHelper = require("./middlewares/authApiHelper");

const blogApiRouter = require('./api/routes/blogApiRoutes')
const userApiRouter = require('./api/routes/userApiRoutes')

app.use('/api/blog', authApiHelper, blogApiRouter);
app.use('/api/user', userApiRouter);







app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});