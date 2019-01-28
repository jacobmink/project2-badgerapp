const express = require('express');
const router = express.Router();


const User = require('../models/users');
const Badge = require('../models/badges');






  
router.route('/')
    // index
    .get(async (req,res)=>{
        try{
            const allUsers = await User.find({});
            res.render('/users/index.ejs', {
                users: allUsers
            });
        }catch(err){
            res.send(err);
        }
    })
    // // post
    // .post((req,res)=>{
    //     try{
    //         await User.create(req.body);
    //         res.redirect('/users');
    //     }catch(err){
    //         res.send(err);
    //     }
    // });

// router.route('/new')
//     .get((req,res)=>{
//             res.render('/users/new.ejs');
//     });




router.route('/:id')
    // show profile
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id);
            res.render('/users/show.ejs', {
                user: foundUser
            });
        }catch(err){
            res.send(err);
        }
    })
    // update profile
    .put(async (req,res)=>{
        try{
            await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.redirect(`/users/${req.params.id}`);
        }catch(err){
            res.send(err);
        }
    })
    // delete account
    .delete(async (req,res)=>{
        try{
            await User.findByIdAndDelete(req.params.id);
            res.redirect('/');
        }catch(err){
            res.send(err);
        }
    })

router.route('/:id/newbadge')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id);
            res.render('/users/newBadge.ejs', {
                badgeList: foundUser.badgeList
            });
        }catch(err){
            res.send(err);
        }
    })
    

    // edit user profile
router.route('/:id/edit')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id);
            res.render('/users/edit.ejs', {
                user: foundUser
            });
        }catch(err){
            res.send(err);
        }
    })

    module.exports = router;