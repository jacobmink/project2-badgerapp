const express = require('express');
const router = express.Router();

// login // signin
router.post('/login', async(req, res) => {
    try {
        console.log('inside login');
        res.render('auths/login.ejs');

    } catch (err) {
        res.send(err);
    }
});



// logout // signout

// registration // creat account
router.post('/createuser', async(req, res) => {
    try {
        console.log('inside createuser');
        res.render('auth/createuser.ejs');
    } catch (err) {
    
    }
});


module.exports = router;