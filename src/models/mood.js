const mongoose = require('mongoose')


const moodSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },

    mood: {
        type: String,
        trim: true,
        validate(value) {
            var arr = ['sad', 'happy', 'angry', 'surprised', 'indifferent', 'inlove']
            if(!arr.includes(value)) {
                throw new Error('Mood is invalid, Mood must be ' + '[' + arr + ']')
            }
        }
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
        type: Array,
        trim: true,
        validate(value) {
            var foods = ['fruit', 'legume', 'chicken', 'candy', 'fastFood', 'liquid', 'pasta', 'homemade']

            value.map((food) => {
                if(!foods.includes(food)){
                    throw new Error('Mood is invalid, Mood must be ' + '[' + foods + ']')
                }
            })

        }
    },

}, {
    timestamps: true
})

const Mood = mongoose.model('Mood', moodSchema)

module.exports = Mood