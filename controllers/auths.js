const express = require('express');
const router = express.Router();

// login
router.post('/login', async(req, res) => {
    try {
        console.log('inside login');
       

    } catch (err) {
        res.send(err);
    }
});



// logout

// creat account
router.post('/createuser', async(req, res) => {
    try {
        console.log('inside createuser');
       
    } catch (err) {
    
    }
});


module.exports = router;