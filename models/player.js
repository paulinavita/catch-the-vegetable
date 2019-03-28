'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Enter your username'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Enter your password'
        }
      }
    },
    wins: DataTypes.INTEGER,
    email : DataTypes.STRING,
  }, {
    hooks : {
      beforeValidate : (user, options) => {
        user.email = user.email.toLowerCase()
      },
      beforeCreate : (user, options) => {
        user.email = user.email.toLowerCase()
      }
    }
  });
  Player.associate = function(models) {
    // associations can be defined here
    Player.hasMany(models.Room, {as: 'Player', foreignKey : 'PlayerId'});
    Player.hasMany(models.Room, {as: 'Enemy', foreignKey : 'EnemyId'});
    Player.belongsToMany(models.Item, {through : models.PlayerItem})
  };

  Player.getClass  = function(input) {
    if (input >= 4) {
      return `the Veggie Catcher`
    } else {
      return `the Veggie Baby Boomer`
    }
  }

  Player.prototype.getWin = function() {
    if (this.wins == null) {
      return `0 times`
    } else {
      return `${this.wins} times`
    }
  }

  return Player;
};