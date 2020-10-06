const { Actor, Film, ActorAppearFilm, Sequelize } = require("../models");
const Op = Sequelize.Op;

Film.belongsToMany(Actor, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_film",
});
Actor.belongsToMany(Film, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_actor",
});

const ActorAppearFilmController = {
  async getActorsFromFilmById(req, res) {
    try {
      const film = await Film.findByPk(req.params.id, {
        include: [
          {
            model: Actor,
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });

      res.send(film);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "There was a problem trying to get the Actors from a Film",
        });
    }
  },
  async getFilmsByActorId(req, res) {
    try {
      const actors = await Actor.findByPk(req.params.id, {
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });

      res.send(actors);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "There was a problem trying to get the Films from the actor",
        });
    }
  },
};

module.exports = ActorAppearFilmController;
