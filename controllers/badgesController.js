const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Badge = require('../models/badges');


router.route('/')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.userId);
            res.render('users/show.ejs', {
                user: foundUser
            });
        }catch(err){
            res.send(err);
        }
    })

router.route('/new')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.userId);
            const allBadges = await Badge.find({});
            res.render(`users/newBadge.ejs`, {
                user: foundUser,
                allBadges: allBadges
            })
        }catch(err){
            res.send(err);
        }
    })



module.exports = router;