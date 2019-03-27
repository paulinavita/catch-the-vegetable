const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const{Player} = require('../models')

//LOGIN
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/dashboard')
  } else {
    res.render('login');
  }
})


//REGISTER
router.get('/register', (req, res) => {
  if (req.user) {
    res.redirect('/dashboard')
  } else {
    res.render('register')
  }
})

//REGS Handle
router.post('/register', (req, res) => {
    const {username, email, password, password2} = req.body
    console.log(req.body)
    let errors = []

    //Check field
    if (!username ||!email || !password ||!password2) {
        errors.push({msg : 'Fill in all field'})
    }

    //Check match pwd
    if (password !== password2) {
        errors.push({msg : 'Passwords do not match'})
    }

    //Check pass length
    if (password.length < 6) {
        errors.push({msg : "Password should be at least 6 chars"})
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          username,
          email,
          password,
          password2
        });
      } else {
        Player.findOne({where : { email: email }}).then(user => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
              errors,
              username,
              email,
              password,
              password2
            });
          } else {
            const newUser = new Player({
              username,
              email,
              password
            });
    
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
      }
    });
    
// Login

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
  

module.exports = router;
