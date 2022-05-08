const express = require('express')
const Mood = require('../models/mood')
const auth = require('../middleware/auth')
const router = new express.Router()
const cors = require('cors')

router.post('/moods', auth, cors(), async (req, res) => {  
    const mood = new Mood({
        ...req.body,
        owner: req.user._id
    })

    try {
        await mood.save()
        res.status(201).send(mood)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /moods?completed=trueORfalse
// GET /moods?limit=10&skip=10
// GET / moods?sortBy=createdAt:asc
router.get('/moods', auth, cors(), async (req, res) => {
    try {
        const match = {}
        // const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        /*  implement sort methods for get moods */
        // if (req.query.sortBy) {
        //     const parts = req.query.sortBy.split(':')
        //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        // }

        if (typeof match.completed === "undefined") {
            const mood = await Mood.find({ owner: req.user._id}).limit(parseInt(req.query.limit)).skip(req.query.skip)
            //console.log('2')
            res.send(mood)
        } else {
            //console.log("1")
            const mood = await Mood.find({ owner: req.user._id, completed: match.completed}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
            res.send(mood)
        }

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/moods/:id', auth, cors(), async (req, res) => {
    const _id = req.params.id

    try {
        //const mood = await Mood.findById(_id)
        const mood = await Mood.findOne({ _id, owner: req.user._id })

        if (!mood) {
            return res.status(404).send()
        }

        res.send(mood)
        
    } catch (e) {
        res.status(500).send() 
    }
})

router.patch('/moods/:id', auth, cors(), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const mood = await Mood.findOne({ _id: req.params.id, owner:req.user._id})
        
        if (!mood) {
            return res.status(404).send()
        }

        updates.forEach((update) => mood[update] = req.body[update])
        
        await mood.save()

        res.send(mood)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/moods/:id', auth, cors(), async (req, res) => {
    try {
        const mood = await Mood.findOneAndDelete({ _id: req.params.id, owner:req.user._id})
        
        if (!mood) {
            return res.status(404).send()
        }

        res.send(mood)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router