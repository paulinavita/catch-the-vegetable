const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const {Player, Room, Item, PlayerItem} = require('../models')

router.get('/', ensureAuthenticated, (req,res) => {
    res.render('rooms')
})

router.get('/join', ensureAuthenticated, (req,res) => {
    res.render('rooms-join')
})

router.post('/join', ensureAuthenticated, (req, res) => {
    let roomId = req.body.roomId
    Room.findOne({
        where : {PIN : req.body.PIN}
    })
    .then((found) => {
        if (found) {
            res.redirect(`rooms/play-room`)
        } else if (!found) {
            res.send(err)
        }
    })
    .catch(err => res.send(err))
})

router.get('/create', ensureAuthenticated, (req,res) => {
    res.render('rooms-create')
})

router.post("/create" , ensureAuthenticated, (req, res) => {
    Room
    .create(req.body)
    .then(result => {
        res.redirect("/rooms/play-room")
    })
    .catch(err => res.send(err))
})

router.get("/play-room", ensureAuthenticated, (req, res) => {
    res.render('play-room')
})


module.exports = router