const { user: User } = require("../models");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      console.log(users);
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Users" });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the Users" });
    }
  },
  create(req, res) {
    User.create(req.body) //INSERT INTO categories
      .then((User) => res.status(201).send(User))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to create the User",
        });
      });
  },
  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.send({
          message: "User successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the User",
        });
      });
  },
  delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((rowsAffected) => {
        if (!rowsAffected) {
          return res.send({
            message: "User not found",
          });
        }
        res.send({
          message: "User successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the User",
        });
      });
  },
};

module.exports = UserController;
