'use strict';

const publicAttributes = ['id', 'label', 'description'];

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});

  Category.associate = function(models) {
    Category.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });
  };

  Category.getPublicAttributes = function() {
    return publicAttributes;
  };

  return Category;
};