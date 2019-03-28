const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const {Player, Room, Item, PlayerItem} = require('../models')
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

console.log('masok room====')

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
    let id = req.user.id
    console.log(req.body)
    Room
    .create({...req.body, PlayerId : id})
    .then(result => {
        res.redirect("/rooms/play-room")
    })
    .catch(err => res.send(err))
})

router.get("/play-room", ensureAuthenticated, (req, res) => {
    console.log('masok play-room pak ekoooooo')
    res.render('play-room')
})


let player1= null
let player2 = null
let score = {};


let room = io.of("/rooms/play-room");
// console.log(room)
room.on("connection", function(socket) {
  score[socket.client.id] = [];
console.log('masukkkkk connection========')
  obj.set(socket.client.id, []);
  if (io.eio.clientsCount == 1) {
    player1 = "player1";
    obj.set(socket.client.id, null);
    room.emit("player1", `ini user nya  player 1 ${socket.client.id}`);
  } else if (io.eio.clientsCount == 2) {
    obj.set(socket.client.id, null);
    player2 = "player2";
    room.emit("player2", `ini user nya  player 2 ${socket.client.id}`);
  } else if (io.eio.clientsCount > 2) {
    room.emit("error", "/error");
  }


  socket.on("click", (data) => {
      console.log('masok pak ekoooooooo')
    score[socket.client.id].push(data);
    console.log(score);

  });

  socket.on("disconnect", user => {
    console.log("dia disconnect ha");
  });
});




module.exports = router