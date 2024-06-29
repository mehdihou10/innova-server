const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({

    image: {
        type: String,
    },
    views: {
        type: Number
    },
    created_at: {
        type: Date
    }
})

module.exports = mongoose.model('projects',projectsSchema);