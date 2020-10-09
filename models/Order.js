/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('pending','sended','client','returning','stocked'),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      },
      unique: "FK_Order_Has_User"
    }
  }, {
    sequelize,
    tableName: 'Order'
    });
};
