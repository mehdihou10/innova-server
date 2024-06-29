const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    phone_number: {
        type: String
    },
    second_phone_number: {
        type: String
    },
    address: {
        type: String
    },
    facebook: {
        type: String
    }
})

module.exports = mongoose.model('contacts',contactSchema);