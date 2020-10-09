const { Actor, Sequelize } = require("../models");
const Op = Sequelize.Op;

const ActorController = {
  async getAll(req, res) {
    try {
      const actors = await Actor.findAll();
      res.send(actors);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
  },
  async getById(req, res) {
    try {
      const actor = await Actor.findByPk(req.params.id);
      res.send(actor);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Films" });
    }
  },
  async getByName(req, res) {
    Actor.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
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
    Actor.create(req.body) //INSERT INTO categories
      .then((Actor) => res.status(201).send(Actor))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to create the Actor",
        });
      });
  },
  update(req, res) {
    Actor.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.send({
          message: "Actor successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Actor",
        });
      });
  },
  delete(req, res) {
    Actor.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((rowsAffected) => {
        if (!rowsAffected) {
          return res.send({
            message: "Actor not found",
          });
        }
        res.send({
          message: "Actor successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the Actor",
        });
      });
  },
};

module.exports = ActorController;
