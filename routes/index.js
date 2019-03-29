const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const {Player, Room, Item, PlayerItem} = require('../models')
const room = require('./rooms')
 

router.get('/', (req, res) => {
    // res.send('welcome')
    res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  PlayerItem
  .findAll({
    where : {PlayerId : req.user.id},
    include : [Player, Item]
  })
  .then(datas  => {
    let user = req.user
    return Player.getClass(datas.length)
    // res.send(datas)
  })
  .then((dapat) => {
    res.render('dashboard', {
      name: req.user.username, dapat
    })
  })
  .catch(err => {res.send(err.message)})
});


// Report
router.get('/show-report', ensureAuthenticated, (req, res) => {
  Room.findAll({include : [Player]})
  .then(rooms => {
    res.render('show-report', {rooms, name : req.user.username})
    // res.send(rooms)
  })
  .catch(err =>{
    res.send(err)
  })
})

//Inventory
router.get('/inventory', ensureAuthenticated, (req, res) => {
  PlayerItem
  .findAll({
    where : {PlayerId : req.user.id},
    include : [Player, Item]
  })
  .then(datas  => {
    let user = req.user
    res.render('inventory', {datas, name: req.user.username})
    // res.send(datas)
  })
  .catch(err => {res.send(err.message)})
})




module.exports = router 