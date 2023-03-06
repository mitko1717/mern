const { Router } = require('express')
const User = require('../models/User')
const router = Router()
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

router.post(
    '/register',
    // middlewares
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'min length of password is 6 char')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "incorrect registration data"
        })
      }

      const {email, password} = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "user excisted"})
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      
      res.status(201).json({ message: 'user created' })
    } catch (e) {
        res.status(500).json({ message: e })
    }
})

router.post(
    '/login',
    [
        check('email', 'type correct email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "incorrect login data"
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: "user not found"})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: "incorrect password, try again"})

      const token = jwt.sign(
        // what to encrypt
        { userId: user.id },
        config.get('jwtSecret'),
        // excistence time of token
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })
         
    //   res.status(201).json({ message: 'user created' })
    } catch (e) {
        res.status(500).json({ message: e })
    }
})

module.exports = router