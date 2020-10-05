const { Film } = require("../models");

const UserController = {
  async getAllFilms(req, res) {
    try {
      const users = await Film.findAll();
      console.log(users);
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
  },
  async getFilmById(req, res) {
    try {
      const user = await Film.findByPk(req.params.id);
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
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

module.exports = UserController;
