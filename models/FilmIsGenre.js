/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FilmIsGenre', {
    id_film: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'film',
        key: 'id'
      }
    },
    id_genre: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'FilmIsGenre'
    });
};
