const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const genderList = ['Male','Female','Other'];
const ageList = [];
for(let i = 18; i < 100; i++){
    ageList.push(i);
}

// login // signin
router.route('/login')
    .get(async (req,res)=>{
        try{
            res.render('auths/login.ejs');
        }catch(err){
            res.send(err);
        }
    })
    .post(async(req, res) => {
        try {
            const foundUser = await User.findOne({'username': req.body.username});
            if(foundUser){
                if(bcrypt.compareSync(req.body.password, foundUser.password)){
                    req.session.message = '';
                    req.session.userId = foundUser._id;
                    req.session.username = foundUser.username;
                    req.session.logged = true;
                    res.redirect(`/users/${foundUser._id}`);
                }else{
                    req.session.message = 'INVALID USERNAME OR PASSWORD';
                    res.redirect('/');
                }
            }else{
                req.session.message = 'INVALID USERNAME OR PASSWORD';
                res.redirect('/');
            }
        } catch (err) {
            res.send(err);
        }
    });

// logout // signout

router.route('/logout')
    .get((req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                res.send(err);
            }
            res.redirect('/');
        });
    });

// registration // create account

router.route('/createuser')
    .get((req,res)=>{
        res.render('auths/createuser.ejs', {
            message: req.session.message,
            genderList,
            ageList
        });
    })


module.exports = router;