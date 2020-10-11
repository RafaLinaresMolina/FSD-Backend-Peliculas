const {
  Film,
  Genre,
  FilmIsGenre,
  ActorAppearFilm,
  Actor,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;

Film.belongsToMany(Genre, {
  through: { model: FilmIsGenre },
  foreignKey: "id_genre",
});

Genre.belongsToMany(Film, {
  through: { model: FilmIsGenre },
  foreignKey: "id_film",
});

Actor.belongsToMany(Film, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_film",
});

Film.belongsToMany(Actor, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_actor",
});

const FilmController = {
  async getFilmByName(req, res) {
    try {
      const films = await Film.findAll({
        where: {
          [Op.or]: {
            original_title: {
              [Op.like]: `%${req.params.name}%`,
            },
            title: {
              [Op.like]: `%${req.params.name}%`,
            },
          },
        },
        include: [
          {
            model: Genre,
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },

  async getFilmByGenreName(req, res) {
    try {
      const films = await Film.findAll({
        include: [
          {
            model: Genre,
            where: {
              name: {
                [Op.like]: `%${req.params.name}%`,
              },
            },
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },
  async getFilmByActorName(req, res) {
    try {
      const films = await Film.findAll({
        include: [
          {
            model: Genre,
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            where: {
              name: {
                [Op.like]: `%${req.params.name}%`,
              },
            },
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },
  async getFilmByGenreId(req, res) {
    try {
      const films = await Film.findAll({
        include: [
          {
            model: Genre,
            where: {
              id: +req.params.id,
            },
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            required: true,
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },
  async getFilmByActorId(req, res) {
    try {
      const films = await Film.findAll({
        include: [
          {
            model: Genre,
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            required: true,
            where: {
              id: +req.params.id,
            },
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },
};

module.exports = FilmController;