'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerItem = sequelize.define('PlayerItem', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ItemId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER
  }, {});
  PlayerItem.associate = function(models) {
    PlayerItem.belongsTo(models.Item)
    PlayerItem.belongsTo(models.Player)
    // associations can be defined here
  };
  return PlayerItem;
};