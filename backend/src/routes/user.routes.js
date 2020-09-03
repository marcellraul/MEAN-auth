const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const user = require('../models/user')
const jtw = require('jsonwebtoken')
const confg = require('../config')
const verifyToken = require('../middleware/middlewares')

router.post('/signup', async (req, res, next) => {
    const { username, email, pass } = req.body
    const user = new User({
        username: username,
        email: email,
        pass: pass
    })
    user.pass = await user.encryptPass(user.pass)
    await user.save()
    const token = jtw.sign({ id: user._id }, confg.secret, {
        expiresIn: 60 * 60 * 24 //esta en segundos
    })
    console.log(user)
    res.json({ auth: true, token, user })
})

router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { pass: 0 })
    if (!user) {
        return res.status(404).send('No user found')
    }
    res.json(user)

})

router.get('/dashboard', verifyToken, (req,res) =>{
    res.json('dashboard')
})

router.post('/signin', async (req, res, next) => {
    //res.json('singiup')
    const { email, pass } = req.body
    //console.log(email, pass)
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).send('the email doesnt exist')
    }
    const passvalid = await user.ValidatePass(pass)
    console.log(passvalid)
    //res.json(passvalid)
    if (!passvalid) {
        return res.status(401).json({ auth: false, token: null })
    }

    const token = jtw.sign({ id: user._id }, confg.secret, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token })
})




module.exports = router