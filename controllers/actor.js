const { Actor, Sequelize } = require("../models");
const Op = Sequelize.Op;

const ActorController = {
  async getAll(req, res) {
    try {
      const actors = await Actor.findAll();
      res.send(actors);
    } catch (error) {
      procces.log.error(error);
      res.status(500).send({
        message: "There was a problem trying to get the Films",
        trace: err.message,
      });
    }
  },
  async getById(req, res) {
    try {
      const actor = await Actor.findByPk(req.params.id);
      res.send(actor);
    } catch (error) {
      procces.log.error(error);
      res.status(500).send({
        message: "There was a problem trying to get the Films",
        trace: err.message,
      });
    }
  },
  async getByName(req, res) {
    try {
      const actors = Actor.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(actors);
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message,
      });
    }
  },
  async create(req, res) {
    try {
      const actor = await Actor.create(req.body);
      res.status(201).send(actor); //INSERT INTO categories
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to create the Actor",
        trace: err.message,
      });
    }
  },
  async update(req, res) {
    try {
      await Actor.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ message: "Actor successfully updated" });
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to update the Actor",
        trace: err.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const rowsAffected = await Actor.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!rowsAffected) {
        return res.send({ message: "Actor not found" });
      }
      res.send({ message: "Actor successfully removed" });
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to remove the Actor",
        trace: err.message,
      });
    }
  },
};

module.exports = ActorController;
