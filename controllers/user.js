
const { User } = require("../models");

const UserController = {
  async getAllUsers(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const users = await User.findAll();
      if(!users){
        return res.status(400).send({message:'Users not found'})
      }
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unable to get the users", trace: error });
    }
  },
  async getUserById(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const user = await User.findByPk(req.params.id);
      if(!user){
        return res.status(400).send({message:'User not found'})
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Unable to retrive the specified user",
          trace: error,
        });
    }
  },
  create(req, res) {
    User.create(req.body) //INSERT INTO categories
      .then((User) => res.status(201).send(User))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "Unable to create the user",
          trace: error,
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
