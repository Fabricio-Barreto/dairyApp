const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middlewares/auth')
const cors = require('cors')

router.post('/users', cors(), async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', cors(), async (req, res) => {
    try {
        console.log(req.body.password)
        const user = await User.findByCredentials(req.body.user, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({ user, token })

    } catch (e) {
        res.status(400).send() 
    }
})

router.post('/users/logout', auth, cors(), async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

       res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router