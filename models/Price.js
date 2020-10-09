/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Price', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    days: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    euro_perDay: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Price'
    });
};
