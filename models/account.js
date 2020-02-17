'use strict';

const types = {
  regular: 'account.type-regular',
  template: 'account.type-template'
};

const publicAttributes = ['id', 'label'];

module.exports = (sequelize, DataTypes) => {
  let Account = sequelize.define('Account', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [types.regular, types.template],
      defaultValue: types.regular,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {});

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });
  };

  Account.getTypes = function() {
    return types;
  };

  Account.getPublicAttributes = function() {
    return publicAttributes;
  };

  return Account;
};