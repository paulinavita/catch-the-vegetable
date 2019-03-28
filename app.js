const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const [players, rooms] = [
  require("./routes/players.js"),
  require("./routes/rooms.js")
];

const session = require("express-session");
const cookiParser = require("cookie-parser");

// pake config paspor
require("./config/passport")(passport);

// bodyparser
app.use(express.urlencoded({ extended: true }));

//folder gambar
// pake rute assets tapi di lokal namanya public
app.use("/assets", express.static("public"));

app.use(
  session({
    secret: "vegetable",
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
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// //routes

let users = "";
let count = 0;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(cookiParser("my cookies"));
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
  })
);

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/players.js"));
app.use("/rooms", require("./routes/rooms.js"));
app.get("/*", (req, res) => {
  res.send("<h1> can't found any page </h1>");
});
// app.use("");

// app.get("/", (req, res) => {
//   res.render("sementara/room");
// });

// app.post("/", (req, res) => {
//   users = req.body.room;
//   count++;
//   if (count > 2) {
//     res.send("anda terlbam");
//   } else {
//     res.redirect("/rooms/player-room");
//   }
// });

// app.get("/rooms/player-room", function(req, res) {
//   res.render("play-room");
// });

// let player = new Map();
let paulina = [];
let muhammad = [];

let obj = new Map();

let objAja = {};
let player1 = null;
let player2 = null;

let score = {};

let room = io.of("/rooms/player-room");
room.on("connection", function(socket) {
  score[socket.client.id] = [];

  // obj.set(socket.client.id, []);
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

  socket.on("click", msg => {
    score[socket.client.id].push(msg);
    console.log(score);
  });

  socket.on("disconnect", user => {
    console.log("dia disconnect ha");
  });
});
const server = http.listen(3030, function() {
  console.log("listening on *:3030");
  console.log(users);
});
