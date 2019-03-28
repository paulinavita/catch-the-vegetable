const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

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

const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
