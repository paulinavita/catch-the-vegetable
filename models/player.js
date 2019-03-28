"use strict";
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    "Player",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Enter your username"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Enter your password"
          }
        }
      },
      wins: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "please use valid email"
          }
        }
      }
    },
    {}
  );
  Player.associate = function(models) {
    // associations can be defined here
    Player.hasOne(models.Room, { as: "Player", foreignKey: "PlayerId" });
    Player.hasOne(models.Room, { as: "Enemy", foreignKey: "EnemyId" });
    Player.belongsToMany(models.Item, { through: models.PlayerItem });
  };

  Player.beforeValidate = (user, options) => {
    user.email = user.email.toLowerCase();
  };

  Player.beforeCreate = (user, options) => {
    user.email = user.email.toLowerCase();
  };

  return Player;
};
