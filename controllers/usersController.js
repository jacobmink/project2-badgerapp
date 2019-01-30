const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const queryString = require('query-string');
const paginate = require('paginate')({
    mongoose: mongoose
});

const User = require('../models/users');
const Badge = require('../models/badges');
const EventModel = require('../models/events');


const genderList = ['Male','Female','Other'];
const badgeTitles = [
    'hike',
    'bike',
    'swim',
    'cook'
];

router.route('/')
    // index
    .get(async (req,res)=>{
        // console.log(req.query);
        const loggedIn = await User.findOne({'username': req.session.username});
        try{
            if(JSON.stringify(req.query) == "{}"){
                const allUsers = await User.find({
                    'username': {$ne: req.session.username}
                });
                res.render('users/index.ejs', {
                    users: allUsers,
                    user: loggedIn,
                    genderList: genderList,
                    badges: badgeTitles
                    // badges: await Badge.find({})
                })
            }else{
                let filteredUsers = await User.find({'username': {$ne: req.session.username}});
                // filter by age
                filteredUsers = filteredUsers.filter((user)=>{
                    return (user.age >= req.query.minAge && user.age <=  req.query.maxAge);
                });
                // filter by gender
                if(req.query.gender){
                    if(!Array.isArray(req.query.gender)){
                        req.query.gender = [req.query.gender];
                    }
                    filteredUsers = filteredUsers.filter((user)=>{
                        return req.query.gender.includes(user.gender);
                    });
                }
                // filter by badges wanted
                if(req.query.badgesWanted){
                    if(!Array.isArray(req.query.badgesWanted)){
                        req.query.badgesWanted = [req.query.badgesWanted];
                    }
                    filteredUsers = filteredUsers.filter((user)=>{
                        return req.query.badgesWanted.every((badgeName)=>{
                            let badgeTitleList = user.badgeList.map((badge)=> badge.title)
                            return badgeTitleList.includes(badgeName);
                        });
                    });
                }
                console.log(req.query);
                res.render('users/index.ejs', {
                    users: filteredUsers,
                    user: loggedIn,
                    genderList: genderList,
                    badges: badgeTitles
                    // badges: await Badge.find({})
                })
            }
        }catch(err){
            console.log(err);
            res.send(err);
        }
    })

    // post
    .post(async (req,res)=>{
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const userDbEntry = {};
        userDbEntry.username = req.body.username;
        userDbEntry.password = hashedPassword;
        userDbEntry.email = req.body.email;
        userDbEntry.displayName = req.body.displayName;
        userDbEntry.age = req.body.age;
        userDbEntry.gender = req.body.gender
        userDbEntry.about = req.body.about;
        try{
            const userExists = await User.findOne({'username': userDbEntry.username});
            if(!userExists){
                req.session.message = '';
                const createdUser = await User.create(userDbEntry);
                req.session.username = createdUser.username;
                req.session.logged = true;
                res.redirect(`/users/${createdUser._id}`);
            }else{
                req.session.message = 'USER ALREADY EXISTS, PLEASE MAKE A DIFFERENT ACCOUNT';
                res.redirect('/auths/createuser', {
                    genderList: genderList
                });
            }
            
        }catch(err){
            res.send(err);
        }
    });

// router.route('/new')
//     .get((req,res)=>{
//             res.render('/users/new.ejs');
//     });




router.route('/:id')
    // show profile
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.params.id);
            res.render('users/show.ejs', {
                user: foundUser
            });
        }catch(err){
            res.send(err);
        }
    })
    .post(async (req,res)=>{
        console.log(req.body)
        try{
            const foundUser = await User.findById(req.params.id);
            const eventsList = await Promise.all([
                EventModel.create({
                    img: req.body.img1,
                    description: req.body.description1}),
                EventModel.create({
                    img: req.body.img2,
                    description: req.body.description2}),
                EventModel.create({
                    img: req.body.img3,
                    description: req.body.description3})]);
            const newBadge = await Badge.create({
                title: req.body.title,
                events: eventsList
            });
            foundUser.badgeList.push(newBadge);
            await foundUser.save();
            res.redirect(`/users/${req.params.id}`);
        }catch(err){
            console.log(err);
            res.send(err);
        }
        
    })
    // update profile
    .put(async (req,res)=>{
        try{
            await User.findByIdAndUpdate(req.params.id, req.body);
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
            res.render('users/edit.ejs', {
                user: foundUser,
                genderList: genderList
            });
        }catch(err){
            res.send(err);
        }
    })

    module.exports = router;