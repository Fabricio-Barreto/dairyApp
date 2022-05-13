const express = require('express')
const path = require('path')
const connectToDb = require("../src/db/db")
const userRouter = require('./routes/user')
const moodsRouter = require('./routes/moods')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')

connectToDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(moodsRouter)

app.set("view engine", "ejs")
app.set('views', viewsPath)

app.get('/', (req, res) => {
    res.render('index', {
 
    })
})

app.listen(port, () => {
    console.log('Server is online on port ' + port)
})

