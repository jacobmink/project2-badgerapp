// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const faker = require('faker');
const usersController = require('./controllers/usersController');
const authsController = require('./controllers/auths');
const badgesController = require('./controllers/badgesController');
const session = require('express-session');
require('dotenv').config();
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
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/users', usersController);
app.use('/auths', authsController);
app.use('/users/:id/badges', (req,res,next)=>{
    req.userId = req.params.id;
    next();
}, badgesController);





app.get('/', (req,res)=>{
    res.render('index.ejs', {
        message: req.session.message
    });
});


app.listen(process.env.PORT, ()=>{
    console.log('SERVER RUNNING...');
});