const mongoose = require('mongoose');
const Badger   = require('./badgers');

 const userSchema = mongoose.Schema({
     username:      {type: String, require: true, unique: true},
     password:      {type: String, require: true},
     displayName:   {type: String, require: true},
     flagged:       {type: Boolean, require: true},
     badgeList:     [Badger.schema]
 });

 module.exports = mongoose.model('User', userSchema);