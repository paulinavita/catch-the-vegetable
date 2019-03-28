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

  Item.prototype.getFormatDate = function() {
    return `${this.createdAt.toISOString().substring(5,7)}-${this.createdAt.toISOString().substring(8,10)}-${this.createdAt.toISOString().substring(0,4)}`
  }
  
  return Item;
};