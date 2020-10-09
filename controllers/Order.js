const { User, Order, OrderFilm, Film, Sequelize } = require("../models");

Order.belongsTo(User, {
  through: { model: Film },
  foreignKey: "UserId",
});

Order.belongsToMany(Film, {
  as: "Films",
  through: { model: OrderFilm },
  foreignKey: "FilmIdm"
});

Film.belongsToMany(Order, {
  as: "OrderWithFilms",
  through: { model: OrderFilm },
  foreignKey: "OrderId"
});

const OrderController = {
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Film,
            required: true,
            through: { atributes: ['stock'] }
          },
        ],
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to get the ${Order.name} resource`,
        trace: error.message,
      });
    }
  },
  async getByUserId(req, res) {
    try {
      const order = await Order.findAll({
        where: {
          UserId: req.params.id
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ['stock'],
            },
          },
        ],
      });
      res.send(order);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: error.message,
      });
    }
  },
  async getById(req, res) {
    try {
      const order = await Order.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ['stock'],
            },
          },
        ],
      });
      res.send(order);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: error.message,
      });
    }
  },
  async create(req, res) {
    try {
      const value = await Order.create(req.body);
      process.log.data(value);
      res.status(201).send(value);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Theres was a problem trying to create the ${Order.name} resource`,
        trace: error.message,
      });
    }
  },
  async update(req, res) {
    try {
      const [rowsAffected] = await Order.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      process.log.debug(`Rows affected: ${Order.name}`);
      if (!rowsAffected) {
        return res.send({
          message: "Nothing to update",
          rowsAffected,
        });
      }
      res.send({
        message: "resource successfully updated",
        rowsAffected,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Theres was a problem trying to update the ${Order.name} resource`,
        trace: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const rowsAffected = Order.destroy({
        where: {
          id: req.params.id,
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
        message: `Theres was a problem trying to delete the ${Order.name} resource`,
        trace: error.message,
      });
    }
  },
};

module.exports = OrderController;
