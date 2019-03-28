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
    Room.belongsTo(models.Player)
    // Room.hasMany(models.Player)
    // associations can be defined here
  };

  Room.prototype.getSecs = function () {
    return `${this.setTimeout} seconds`
  }

  return Room;
};