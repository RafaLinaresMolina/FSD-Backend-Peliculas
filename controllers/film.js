const { Film, Sequelize } = require("../models");
const Op = Sequelize.Op;

const FilmController = {
  async getAllFilms(req, res) {
    try {
      const films = await Film.findAll();
      res.send(films);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
  },
  async getFilmById(req, res) {
    try {
      const film = await Film.findByPk(req.params.id);
      res.send(film);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
  },
  async getFilmByName(req, res) {
    Film.findAll({
      where: {
        [Op.or]: 
          {
            original_title: {
              [Op.like]: `%${req.params.name}%`,
            },
            title: {
              [Op.like]: `%${req.params.name}%`,
            },
          },
        
      },
    })
      .then((category) => res.send(category))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to get the Films by name",
        });
      });
  },
  create(req, res) {
    Film.create(req.body) //INSERT INTO categories
      .then((Film) => res.status(201).send(Film))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to create the Film",
        });
      });
  },
  update(req, res) {
    Film.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.send({
          message: "Film successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Film",
        });
      });
  },
  delete(req, res) {
    Film.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((rowsAffected) => {
        if (!rowsAffected) {
          return res.send({
            message: "Film not found",
          });
        }
        res.send({
          message: "Film successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the Film",
        });
      });
  },
};

module.exports = FilmController;
