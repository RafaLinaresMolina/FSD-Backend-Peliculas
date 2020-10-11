
const { User } = require("../models");

const UserController = {
  async getProfileById(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      console.log(user);
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Unable to retrive the specified Profile",
          trace: error,
        });
    }
  },
  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.user.id,
      },
    })
      .then(() =>
        res.send({
          message: "Profile successfully updated",
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Profile",
          trace: error,
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
          message: "Profile successfully removed",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to remove the Profile",
        });
      });
  },
};

module.exports = UserController;
