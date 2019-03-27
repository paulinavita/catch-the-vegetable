const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const {Player, Room, Item, PlayerItem} = require('../models')

router.get('/', (req, res) => {
    // res.send('welcome')
    res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.username
  })
);


// Report
router.get('/show-report', ensureAuthenticated, (req, res) => {
  // res.send('list of your report!')
  res.render('show-report', {
    name: req.user.username
  })
})

//Inventory
router.get('/inventory', ensureAuthenticated, (req, res) => {
  // res.render('inventory', {
  //   name: req.user.username
  // })
  PlayerItem
  .findAll({
    where : {PlayerId : req.user.id},
    include : [Player, Item]
  })
  .then(datas  => {
    res.send(datas)
  })
  .catch(err => {res.send(err.message)})
  
})



module.exports = router 