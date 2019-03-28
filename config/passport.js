const sequelize = require('sequelize')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy

// Load Player model
const {Player} = require('../models');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      Player.findOne({ where : {email: email}})
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      })
      .catch (err => res.send(err))
    })
  );


  
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        Player.findByPk(id)
        .then(user => {
          done(null, user)
        })
        .catch(error => {
          console.log(`Error ${error}`)
        })
      });
}











// //panggil model user
// const Player = require('../models/user')
// module.exports = function(passport) {
//     new LocalStrategy( { usernameField:'email'}, (email, password, done) => {
//         //cek usser
//         Player.findOne({where : {email : email}})
//         .then((user) => {
//             if (!user) {
//                 return done(null, false, {message : 'That email is not registered'})
//             }
//             bcrypt.compare(password, user.password, (err, isMatch) =>{
//                 if (err) throw err
//                 if (isMatch) {
//                     return done (null, user)
//                 } else {
//                    return done(null, false, {message : 'Password incorrect'})
//                 }
//             });
//         })
//     })

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//       });
      
//       passport.deserializeUser((id, done) => {
//         Player.findById(id, (err, user) => {
//           done(err, user);
//         });
//       });
// }
