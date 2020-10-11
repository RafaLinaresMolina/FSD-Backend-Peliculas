const { Genre, Film, FilmIsGenre, Sequelize } = require("../models");
const Op = Sequelize.Op;

const GenreController = {
  async getByName(req, res) {
    try {
      const genre = await Genre.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(genre);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Genre by name",
        trace: err.message,
      });
    }
  },
  async create(req, res) {
    let genreInFilm;
    try {
      const newGenreInFilm = await createObject(
        req.body.FilmId,
        req.body.Genres
      );
      process.log.debug(`Aux objects generated`);
      genreInFilm = await FilmIsGenre.bulkCreate(newGenreInFilm);
      process.log.info("newActorsInFilm rows created");
      res.status(201).send(genreInFilm);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Theres was a problem trying to set generes in film.`,
        trace: err.message,
      });
    }
  },
  async delete(req, res) {
    {
      try {
        const rowsAffected = FilmIsGenre.destroy({
          where: {
            id_film: req.params.id,
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
          message: `Theres was a problem trying to delete the ${FilmIsGenre.modelName} resource`,
          trace: error.message,
        });
      }
    }
  },
};

const createObject = async (film_id, Generes) => {
  try {
    const film = await Film.findByPk(film_id);
    if (!film) {
      throw new Error(`Film with id ${film_id} does not exist.`);
    }
    const newGenres = [];
    for (const i in Generes) {
      const element = Generes[i];
      process.log.info(element);
      const genre = await Genre.findByPk(element.GenreId);
      if (!genre) {
        throw new Error(`Genre with id ${element.GenreId} does not exist.`);
      }
      newGenres.push({ id_film: film_id, genre: actor.id });
    }
    return newActorsInFilm;
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

module.exports = GenreController;
