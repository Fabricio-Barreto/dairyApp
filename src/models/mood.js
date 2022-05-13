const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },

    mood: {
        type: String,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    labels: {
        type: String,
        trim: true,
        default: null
    },

    food: {
        type: String,
        trim: true,
        default: null
    },

}, {
    timestamps: true
})

const Mood = mongoose.model('Mood', moodSchema)

module.exports = Mood