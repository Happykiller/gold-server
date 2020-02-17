'use strict';

const publicAttributes = ['id', 'firstName', 'lastName', 'email'];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    token: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  User.getPublicAttributes = function() {
    return publicAttributes;
  };

  return User;
};