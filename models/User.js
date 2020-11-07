/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 1
    },
    rol_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    confirmed: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    creditCard: {
      type: DataTypes.INTEGER(16),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User'
    });
};
