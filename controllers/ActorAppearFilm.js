const { Actor, Film, ActorAppearFilm, Sequelize } = require("../models");
const Op = Sequelize.Op;

ActorAppearFilm.belongsTo(Actor, { foreignKey: "id_actor" });
ActorAppearFilm.belongsTo(Film, { foreignKey: "id_film" });

const ActorAppearFilmController = {
  async getActorsFromFilmById(req, res) {
    try {
      const actors = await ActorAppearFilm.findAll({
        where: {
          id_film: req.params.id,
        },
        include: [
          {
            model: Actor,
            required: true,
          },
          {
            model: Film,
            required: true,
          },
        ]
      });
      console.log(actors);
      res.send(actors);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Actors from a Film" });
    }
  },
  async getFilmsByActorId(req, res) {
    try {
      const actors = await ActorAppearFilm.findAll({
        where: {
          id_actor: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
          },
          {
            model: Actor,
            required: true,
          },
        ]
      });
      console.log(actors);
      res.send(actors);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films from the actor" });
    }
  },
};

module.exports = ActorAppearFilmController;
