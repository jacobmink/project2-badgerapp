const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users');

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
            message: req.session.message
        });
    })
    // .post(async (req,res)=>{
    //     const password = req.body.password;
    //     const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    //     const userDbEntry = {};
    //     userDbEntry.username = req.body.username;
    //     userDbEntry.password = hashedPassword;
    //     userDbEntry.email = req.body.email;
    //     userDbEntry.displayName = req.body.displayName;
    //     try{
    //         const createdUser = await User.create(userDbEntry);
    //         req.session.username = createdUser.username;
    //         req.session.logged = true;
    //         res.redirect(`/users/${createdUser._id}`);
    //     }catch(err){
    //         res.send(err);
    //     }
    // });


module.exports = router;