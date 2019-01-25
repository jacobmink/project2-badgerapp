const mongoose = require('mongoose');
const Event    = require('./events');

const badgerSchema = mongoose.Schema({
    title:  {type: String, require: true},
    events: [EventSchema]
});

module.exports = mongoose.model('Badger', badgerSchema);