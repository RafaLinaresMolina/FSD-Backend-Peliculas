/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    original_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img_portrait: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    img_landscape: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Film'
    });
};
