const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("password invalid format!")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },

    birthday: {
        type: String,
        default: null
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    avatar: {
        type: Buffer,
    },

    biological_sex: {
        type: String,
        trim: true,
        default: null
    },

    sexual_orientation: {
        type: String,
        trim: true,
        default: null
    }

}, {
    timestamps: true
})

userSchema.virtual('moods', {
    ref: 'Mood',
    localField: '_id',
    foreignField: 'owned'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'plancto')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash password before saving
userSchema.pre('save', async function (next) {
    const user = this


    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
 

    next()
})

// Delete User Task when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

userSchema.pre('save', async function(next) {
    const user = this

    year = user.birthday.slice(0, 4)
    month = user.birthday.slice(6, 7)
    day = user.birthday.slice(8, 10)

    var today = new Date()

    idade = today.getFullYear() - year

    if (today.getMonth() + 1 > month) {
        idade += 1
    } else if (today.getMonth() +1 == month) {
        if (today.getDate() >= day) {
            idade += 1
        }
    }

    user.age = idade

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User