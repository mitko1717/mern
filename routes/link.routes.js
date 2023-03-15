const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', async (req, res) => {
    try {
        // getting server link from config
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        const code = shortid.generate()

        // check if this link already exists
        const existing = await Link.findOne({ from })

    } catch (e) {
        res.status(500).json({ message: e })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        // need to get user from front firstly
        const links = await Link.find({ owner: req.user.userId }) // i signed it with jwt.sign in auth.routes:76
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: e })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: e })
    }
})

module.exports = router