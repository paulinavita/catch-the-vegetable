'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    Item.belongsToMany(models.Player, {through : models.PlayerItem})
    // associations can be defined here
  };
  return Item;
};