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


const badgeTitles = [
    'hike',
    'bike',
    'swim',
    'cook'
];

router.route('/new')
    .get(async (req,res)=>{
        try{
            const foundUser = await User.findById(req.userId);
            const allBadges = await Badge.find({});
            res.render('badges/newBadge.ejs', {
                user: foundUser,
                allBadges: allBadges,
                badgeTitles: badgeTitles
            })
        }catch(err){
            res.send(err);
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const foundBadge = await Badge.findById(req.params.id);
            res.render('/badges/show.ejs', {
                badge: foundBadge
            });
        }catch(err){
            res.send(err);
        }
    })




module.exports = router;