const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middlewares/auth')
const cors = require('cors')
const upload = require('../middlewares/multerMiddleware')
const sharp = require('sharp')

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
        res.status(404).send({error: 'User or password invalid'}) 
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

router.post('/users/logoutALL', auth, cors(), async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, cors(), async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, cors(), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, cors(), async (req, res) => {
    try {
        console.log(req.user.id)
        await User.deleteOne({ id: req.user.id})

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/me/avatar', upload.single('avatar'), auth, cors(), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, cors(), async (req, res) => {
    try {
        req.user.avatar = undefined

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id/avatar', cors(), async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch (e) {
        res.status(404).send()
    }
})

module.exports = router