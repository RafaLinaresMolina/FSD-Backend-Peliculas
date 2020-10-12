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
      allowNull: true,
      defaultValue: "pending"
    },
    UserId: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      },
      unique: "FK_Order_Has_User"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    arrivedAtClient: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    recomendedReturnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    realReturnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    reStoked: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    PriceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Price',
        key: 'id'
      },
      unique: "FK_OrderPrice"
    }
  }, {
    sequelize,
    tableName: 'Order'
    });
};
