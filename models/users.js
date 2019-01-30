const mongoose = require('mongoose');
const Badge   = require('./badges');

 const userSchema = mongoose.Schema({
     username:      {type: String, required: true, unique: true},
     password:      {type: String, required: true},
     email:         {type: String, required: true},
     displayName:   {type: String, required: true},
     img:           [{type: String, required: true}],
     about:         String,
     age:           {type: Number, required: true},
     gender:        {type: String, required: true},
     flagged:       {type: Boolean},
     badgeList:     [Badge.schema]
 });

 module.exports = mongoose.model('User', userSchema);