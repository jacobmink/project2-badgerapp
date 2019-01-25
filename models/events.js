const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    img:            {type: String},
    description:    {type: String, require: true}
});

module.exports = mongoose.model('Event', eventSchema);