const mongoose = require('mongoose');
const Badger   = require('./badgers');

 const userSchema = mongoose.Schema({
     username:      {type: String, required: true, unique: true},
     password:      {type: String, required: true},
     displayName:   {type: String, required: true},
     flagged:       {type: Boolean},
     badgeList:     [Badger.schema]
 });

 module.exports = mongoose.model('User', userSchema);