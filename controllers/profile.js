
const { User } = require("../models");

const UserController = {
  async getProfileById(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      process.log.data(user);
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
  async update(req, res) {
    try {
      const [affectedRows] = await User.update(req.body, {
        where: {
          id: req.user.id,
        },
      });
      if(!affectedRows){
        return res.send({
          message: "Nothing to update",
        })
      }
      res.send({
        message: "Profile successfully updated",
      })
    } catch (error) {
      process.log.error(error);
        res.status(500).send({
          message: "There was a problem trying to update the Profile",
          trace: error,
        });
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      user.status = 0;
      user.save();
      res.send({
        message: "Profile successfully removed",
      });
    } catch (error) {
      process.log.error(error.message);
        res.status(500).send({
          message: "There was a problem trying to remove the Profile",
        });
    }     
  },
};

module.exports = UserController;
