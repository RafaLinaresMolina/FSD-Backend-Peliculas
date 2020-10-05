const { Genre, Sequelize } = require("../models");
const Op = Sequelize.Op;

const UserController = {
  async getAll(req, res) {
    try {
      const genres = await Genre.findAll();
      console.log(genres);
      res.send(genres);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Genre" });
    }
  },
  async getById(req, res) {
    try {
      const genre = await Genre.findByPk(req.params.id);
      console.log(genre);
      res.send(genre);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Genre" });
    }
  },
  async getByName(req, res) {
    Genre.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        }        
      },
    })
      .then((category) => res.send(category))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to get the Genre by name",
        });
      });
  },
  create(req, res) {
    Genre.create(req.body) //INSERT INTO categories
      .then((Genre) => res.status(201).send(Genre))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to create the Genre",
        });
      });
  },
  update(req, res) {
    Genre.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.send({
          message: "Genre successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Genre",
        });
      });
  },
  delete(req, res) {
    Genre.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((rowsAffected) => {
        if (!rowsAffected) {
          return res.send({
            message: "Genre not found",
          });
        }
        res.send({
          message: "Genre successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the Genre",
        });
      });
  },
};

module.exports = UserController;
