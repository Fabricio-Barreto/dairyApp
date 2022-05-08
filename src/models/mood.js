const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    mood: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Mood = mongoose.model('Mood', moodSchema)

module.exports = Mood