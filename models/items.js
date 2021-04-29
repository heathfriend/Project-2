const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clubSchema = Schema({
    Brand: {type: String},
    Irons:{type: String},
    Flex: {type: String},
    Price:{type: Number}
})

const Club = mongoose.model('Club', clubSchema )

module.exports = Club;
