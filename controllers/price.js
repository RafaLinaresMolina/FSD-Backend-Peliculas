const { Price, Sequelize } = require("../models");
const Op = Sequelize.Op;

const PriceController = {
  async getAll(req, res) {
    try {
      const prices = await Price.findAll();
      console.log(prices);
      res.send(prices);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Price" });
    }
  },
  async getById(req, res) {
    try {
      const price = await Price.findByPk(req.params.id);
      console.log(price);
      res.send(price);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Price" });
    }
  },
  async getByName(req, res) {
    Price.findAll({
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
          message: "There was a problem trying to get the Price by name",
        });
      });
  },
  create(req, res) {
    Price.create(req.body) //INSERT INTO categories
      .then((Price) => res.status(201).send(Price))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to create the Price",
        });
      });
  },
  update(req, res) {
    Price.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.send({
          message: "Price successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Price",
        });
      });
  },
  delete(req, res) {
    Price.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((rowsAffected) => {
        if (!rowsAffected) {
          return res.send({
            message: "Price not found",
          });
        }
        res.send({
          message: "Price successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the Price",
        });
      });
  },
};

module.exports = PriceController;
