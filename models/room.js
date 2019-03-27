'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    PIN: DataTypes.STRING,
    setTimeout: DataTypes.INTEGER,
    playerClick: DataTypes.INTEGER,
    enemyClick: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER,
    EnemyId: DataTypes.INTEGER
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};