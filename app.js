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
const convertDate = require('./helpers')

const session = require("express-session");

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

//helper
app.use((req, res, next) => {
  res.locals.error = null
  res.locals.convertDate = convertDate
  next()
})


//global var colors
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


 //routes

let users = "";
let count = 0;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// app.use(cookiParser("my cookies"));
// app.use(
//   session({
//     secret: "keyboard cat",
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: true
//   })
// );

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/players.js"));
app.use("/rooms", require("./routes/rooms.js"));
// app.get("/*", (req, res) => {
//   res.send("<h1> can't found any page </h1>");
// });
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


// let obj = new Map();

let objAja = {};
let player1 = null;
let player2 = null;


let score = {};
let counts = {}
let theirFruit = []
const lastScore = {
  player1: 0,
  player2: 0
}

let hasil = null
let fruits = [
  "avocado",
  "cherry",
  "banana",
  "pineapple",
  "mushroom",
  "strawberry",
  "pear",
  "lemon",
  "green"
];

const random = () => fruits[Math.floor(Math.random() * 9)];
const buah = [random(), random(), random(), random(), random()];
const buahJoin = buah.join(", ");



let room = io.of("/rooms/player-room");
room.on("connection", function(socket) {
  score[socket.client.id] = [];
  counts[socket.client.id] = []

  if(io.eio.clientsCount == 1) {
    counts[socket.client.id].push("Player 1")
  } else if  (io.eio.clientsCount == 2){
    counts[socket.client.id].push("Player 2")


  let counter = 10
  let pemenang = setInterval(function () {
    room.emit("timer", counter);
    counter--
    if (counter == 0) {
      room.emit("timer", "Waktu Habis!!")
      if (Object.values(lastScore)[0] > (Object.values(lastScore)[1])) {
        room.emit("winnner", "Player 1 Wins!")
      } else {
        room.emit("winnner", "Player 2 Wins!")
      }
      clearInterval(pemenang)
    }

  }, 1000)
  }
  let objLength = Object.keys(score);
  theirFruit.push(buah)
  room.emit("sizeplayer", [objLength, buahJoin])


  // let countdown = 10;
  //   let timer = setInterval(function() {
  //   countdown--;
  //   if (countdown == 0) {
  //     clearInterval(timer)
  //   }
  //   io.emit("timer", { countdown: countdown });
  // }, 1000);


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

  socket.on("click", msg => {
    score[socket.client.id].push(msg);
    console.log(buah, 'ini perbandingannya')
    console.log(score, 'ini scoreeee');
    console.log(counts, 'ini countsssss');

    const [player1, player2] = Object.values(score) 
  
    buah.forEach((el) => {
      if (player1.includes(el)) {
        lastScore["player1"] += 1
      }
      if (player2.includes(el)) {
        lastScore["player2"] += 1
      }
    })
    // console.log(lastScore)
    
    room.emit("notification", `${counts[socket.client.id]} got this => ${msg}`)
  });


  socket.on("disconnect", user => {

    console.log("dia disconnect ha");
  });
});
const server = http.listen(3000, function() {
  console.log("listening on *:3000");
  console.log(users);
});
