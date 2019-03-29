const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const { Player, Room, Item, PlayerItem } = require("../models");

let count = 0;
let users = "";

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("rooms");
});

router.get("/join", ensureAuthenticated, (req, res) => {
  let error = null
  if (req.query.err) {
    error = req.query.err
  }
  res.render("rooms-join", { error});
});

router.post("/join", async (req, res) => {
  try {
    const found = await Room.findOne({
      where: req.body
    });
    if (found) {
      count++;
      if (count > 2) {
        res.send("<h1> limited member </h1>");
      } else {
        res.render('play-room')
        // res.send(found);
      }
    } else {
      let err = 'Room does not exist'
      res.redirect(`/rooms/join/?err=${err}`)
    }
  } catch (e) {
    res.send("errror");
  }
});

router.get("/player-room", function(req, res) {
  res.render("play-room");
});


router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("rooms-create");
});

router.post("/create", ensureAuthenticated, (req, res) => {
  console.log(req, "iniiii");
  Room.create(req.body)
    .then(result => {
      res.redirect("/rooms/player-room");
    })
    .catch(err => res.send(err));
});

// router.get("/play-room", ensureAuthenticated, (req, res) => {
//   res.render("play-room");
// });

module.exports = router;
