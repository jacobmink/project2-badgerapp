const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    img:            {type: String},
    description:    {type: String, required: true}
});

module.exports = mongoose.model('Event', eventSchema);