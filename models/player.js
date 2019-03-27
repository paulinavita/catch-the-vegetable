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
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
    Player.hasOne(models.Room, {as: 'Player', foreignKey : 'PlayerId'});
    Player.hasOne(models.Room, {as: 'Enemy', foreignKey : 'EnemyId'});
    Player.belongsToMany(models.Item, {through : models.PlayerItem})

  };

  return Player;
};