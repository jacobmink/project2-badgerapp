const mongoose = require('mongoose');
const BadgeEvent    = require('./events');

const badgeSchema = mongoose.Schema({
    title:  {type: String, required: true},
    events: [BadgeEvent.schema]
});

module.exports = mongoose.model('Badge', badgeSchema);