const { Actor, Sequelize } = require("../models");
const Op = Sequelize.Op;

const ActorController = {

  async getByName(req, res) {
    try {
      const actors = await Actor.findAll({
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
        message: "There was a problem trying to get the Actors by name",
        trace: err.message,
      });
    }
  }
};

module.exports = ActorController;
