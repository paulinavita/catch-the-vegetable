const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// pake config paspor
require('./config/passport')(passport);

//EJS Middleware
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// bodyparser
app.use(express.urlencoded({ extended: true }));

//folder gambar
// pake rute assets tapi di lokal namanya public
app.use("/assets", express.static("public")) 

//Express Session Middleware
app.use(
  session({
    secret: 'vegetable',
    resave: true,
    saveUninitialized: true
  })
);

//Passpotr middleware
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

//global var colors
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// //routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/players.js'));
app.use('/rooms', require('./routes/rooms.js'));

let player1= null
let player2 = null
let score = {};


let room = io.of("/rooms/play-room");
room.on("connection", function(socket) {
  score[socket.client.id] = [];
console.log('masukkkkk')
  // obj.set(socket.client.id, []);
  // if (io.eio.clientsCount == 1) {
  //   player1 = "player1";
  //   obj.set(socket.client.id, null);
  //   room.emit("player1", `ini user nya  player 1 ${socket.client.id}`);
  // } else if (io.eio.clientsCount == 2) {
  //   obj.set(socket.client.id, null);
  //   player2 = "player2";
  //   room.emit("player2", `ini user nya  player 2 ${socket.client.id}`);
  // } else if (io.eio.clientsCount > 2) {
  //   room.emit("error", "/error");
  // }


  socket.on("click", (data) => {
    score[socket.client.id].push(data);
    console.log(score);

  });

  socket.on("disconnect", user => {
    console.log("dia disconnect ha");
  });
});






const PORT = process.env.PORT || 5050;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
