/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ActorAppearFilm', {
    id_film: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'film',
        key: 'id'
      }
    },
    id_actor: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ActorAppearFilm'
    });
};
