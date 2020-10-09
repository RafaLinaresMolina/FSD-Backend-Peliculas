const { Order, OrderFilm, Film, Sequelize } = require("../models");

Order.belongsToMany(Film, {
  through: { model: OrderFilm },
});
Film.belongsToMany(Order, {
  through: { model: OrderFilm },
});

const OrderMovieController = {
  async getAll(req, res) {
    try {
      const values = await Order.findAll({
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
        ],
      });
      res.send(values);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to get the ${OrderFilm.name} resource`,
        trace: error.message,
      });
    }
  },
  async getByOrderId(req, res) {
    try {
      const values = await Order.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
        ],
      });
      res.send(values);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to get the ${OrderFilm.name} resource`,
        trace: error.message,
      });
    }
  },
  async getByUserId(req, res) {
    try {
      const values = await Order.findAll({
        where: {
          UserId: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
        ],
      });
      res.send(values);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Unable to get the ${OrderFilm.name} resource`,
        trace: error.message,
      });
    }
  },
};

module.exports = OrderMovieController;
