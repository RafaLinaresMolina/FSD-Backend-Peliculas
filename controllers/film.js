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
  through: {
    model: FilmIsGenre
  },
  foreignKey: "id_genre",
});

Genre.belongsToMany(Film, {
  through: {
    model: FilmIsGenre
  },
  foreignKey: "id_film",
});

Actor.belongsToMany(Film, {
  through: {
    model: ActorAppearFilm
  },
  foreignKey: "id_film",
});

Film.belongsToMany(Actor, {
  through: {
    model: ActorAppearFilm
  },
  foreignKey: "id_actor",
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
      const films = await Film.findAndCountAll({ distinct: true,
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
console.log(req.params.name)
      const films = await Film.findAndCountAll({distinct:true,
        include: [{
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
      const films = await Film.findAndCountAll({ distinct:true,
        include: [{
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
      const films = await Film.findAndCountAll({ distinct:true,
        
        include: [{
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
      const films = await Film.findAndCountAll({ distinct:true,
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
        trace: err,
      });
    }
  },
  async delete(req, res) {
    try {
      const film = await Film.findByPk(req.params.id);
      if(!film){
        return res.status(400).send({message:'Film not found'})
      }
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
      if(!film){
        return res.status(400).send({message:'Film not found'})
      }
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
  },
  async countFilms(req, res) {
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
        limit: +process.env.LIMIT_FILMS
      })
      res.status(200).send(films);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}

module.exports = FilmController;