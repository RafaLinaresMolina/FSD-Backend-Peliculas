const {
  Film,
  Genre,
  FilmIsGenre,
  ActorAppearFilm,
  Actor,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;

// Relation FILM -> GENRE used for filter pruposes
Film.belongsToMany(Genre, {
  as: "GenreFilter",
  through: { model: FilmIsGenre },
  foreignKey: "id_film",
});

// Relation GENRE -> FILM used for filter pruposes
Genre.belongsToMany(Film, {
  as: "GenreFilter",
  through: { model: FilmIsGenre },
  foreignKey: "id_genre",
});

// Relation FILM -> GENRE 
Film.belongsToMany(Genre, {
  through: { model: FilmIsGenre },
  foreignKey: "id_film",
});

// Relation GENRE -> FILM 
Genre.belongsToMany(Film, {
  through: { model: FilmIsGenre },
  foreignKey: "id_genre",
});

/////////////////////////////////////////////////////////
// Relation ACTOR -> FILM used for NOT filter pruposes
Actor.belongsToMany(Film, {
  as: 'ActorFilter',
  through: { model: ActorAppearFilm },
  foreignKey: "id_actor",
});

// Relation FILM -> ACTOR used for filter pruposes
Film.belongsToMany(Actor, {
  as: 'ActorFilter',
  through: { model: ActorAppearFilm },
  foreignKey: "id_film",
});

// Relation ACTOR -> FILM
Actor.belongsToMany(Film, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_actor",
});

// Relation FILM -> ACTOR
Film.belongsToMany(Actor, {
  through: { model: ActorAppearFilm },
  foreignKey: "id_film",
});

const FilmController = {
  async getFilmByName(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
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
        include: [{
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
        trace: err,
      });
    }
  },

  async getAllFilms(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({ 
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
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
        message: "There was a problem trying to get the Films",
        trace: err,
      });
    }
  },

  async getFilmByGenreName(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({
        distinct:true,
        offset:offset,
        limit: +process.env.LIMIT_FILMS,
        include: [{
            model: Genre,
            as: 'GenreFilter',
            where: {
              name: {
                [Op.like]: `%${req.params.name}%`,
              },
            },
            required: true,
            attributes: ['id','name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Genre,
            as: 'Genres',
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
      console.log(err)
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err,
      });
    }
  },
  async getFilmByActorName(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({ 
        offset:offset,
        limit: +process.env.LIMIT_FILMS,
        distinct:true,
        include: [
          {
            model: Actor,
            as: 'ActorFilter',
            where: {
              [Op.or]: {
                '$ActorFilter.$name': {
                  [Op.like]: `%${req.params.name}%`,
                },
                '$ActorFilter.$last_name': {
                  [Op.like]: `%${req.params.name}%`,
                },
              },
            },
            required: true,
            attributes: ['id','name', 'last_name'],
            through: {
              attributes: [],
            },
          },{
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
        trace: err,
      });
    }
  },
  async getFilmByGenreId(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({ 
        distinct:true,
        offset:offset,
        limit: +process.env.LIMIT_FILMS,
        include: [{
            model: Genre,
            as: 'GenreFilter',
            where: {
              id: +req.params.id,
            },
            required: true,
          },
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
        trace: err,
      });
    }
  },
  async getFilmByActorId(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const films = await Film.findAndCountAll({ 
        distinct:true,
        offset:offset,
        limit: +process.env.LIMIT_FILMS,
        include: [{
            model: Genre,
            required: true,
            through: {
              attributes: [],
            },
          },
          {
            model: Actor,
            as: 'ActorFilter',
            required: true,
            where: {
              id: +req.params.id,
            },
      
          },
          {
            model: Actor,
            required: true,
       
          },
        ],
      });
      res.send(films);
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err,
      });
    }
  },
  async delete(req, res) {
    try {
      const film = await Film.findByPk(req.params.id);
      film.status = 0;
      await film.save();
      res.send({
        message: `Film '${film.title}' deleted.`
      });
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err,
      });
    }
  },
  async reactivate(req, res) {
    try {
      const film = await Film.findByPk(req.params.id);
      film.status = 1;
      await film.save();
      res.send({
        message: `Film '${film.title}' reactivated.`
      });
    } catch (err) {
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err,
      });
    }
  }
}

module.exports = FilmController;