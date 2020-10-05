/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRentFilm', {
    id_user: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_film: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'film',
        key: 'id'
      },
      unique: "FK_Film_Rent_User"
    },
    quantity: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    date_init: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: true
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'UserRentFilm'
    });
};
