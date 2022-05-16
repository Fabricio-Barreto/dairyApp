const mongoose = require('mongoose')

const connectToDb = () => {
    mongoose.connect(
        process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() => console.log("Mongodb connected!")
    ).catch((err) => console.log(err))
}

module.exports = connectToDb