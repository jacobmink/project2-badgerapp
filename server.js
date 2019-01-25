// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controllers/usersController');
const session = require('express-session');
const MongeDBStore = require('connect-mongodb-session')(session);
const store = new MongeDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test', collection: 'mySessions'
});

store.on('error', (err)=>{
    console.log(err);
})
require('./db/db');
// MIDDLEWARE
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/user', userController);


app.get('/', (req,res)=>{
    res.render('index.ejs', {
        message: req.session.message
    });
});










app.listen(3000, ()=>{
    console.log('SERVER RUNNING...');
});