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
      process.log.error(error);
      res.status(500).send({
        message: "There was a problem trying to get the Actors from a Film",
        trace: error,
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
      process.log.error(error);
      res.status(500).send({
        message: "There was a problem trying to get the Films from the actor",
        trace: error,
      });
    }
  },
  async createActorFilm(req, res) {
    let ActorsAppearInFilmInstance;
    try {
      const newActorsInFilm = await createObject(
        req.body.film_id,
        req.body.Actors
      );
      process.log.debug(`Aux objects generated`);
      ActorsAppearInFilmInstance = await ActorAppearFilm.bulkCreate(
        newActorsInFilm
      );
      process.log.info("newActorsInFilm rows created");
      res.status(201).send(ActorsAppearInFilmInstance);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Theres was a problem trying to set actors in film.`,
        trace: err,
      });
    }
  },
  async deleteActorsFilm(req, res) {
    {
      try {
        const rowsAffected = await ActorAppearFilm.destroy({
          where: {
            id_film: req.params.FilmId,
          },
        });

        if (!rowsAffected) {
          return res.send({
            message: "Nothing to delete",
            rowsAffected,
          });
        }

        return res.send({ message: "resource deleted", rowsAffected });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          message: `Theres was a problem trying to delete the ${ActorAppearFilm.modelName} resource`,
          trace: error,
        });
      }
    }
  },
};

const createObject = async (film_id, ActorsInFilm) => {
  try {
    const film = await Film.findByPk(film_id);
    if (!film) {
      throw new Error(`Film with id ${film_id} does not exist.`);
    }
    const newActorsInFilm = [];
    for (const i in ActorsInFilm) {
      const element = ActorsInFilm[i];
      process.log.info(element);
      const actor = await Actor.findByPk(element.ActorId);
      if (!actor) {
        throw new Error(`Actor with id ${element.ActorId} does not exist.`);
      }
      newActorsInFilm.push({ id_film: film_id, id_actor: actor.id });
    }
    return newActorsInFilm;
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

module.exports = ActorAppearFilmController;
