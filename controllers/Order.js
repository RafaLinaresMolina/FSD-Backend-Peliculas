const { User, Order } = require("../models");

Order.belongsTo(User);

const OrderController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: User,
            required: true,
            include: {
              attributes: ['name', 'id'],
            },
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unable to get the users", trace: error });
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            model: User,
            required: true,
            include: {
              attributes: ['name', 'id'],
            },
            through: {
              attributes: [],
            },
          },
        ],
      });
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Unable to retrive the specified user",
        trace: error,
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
