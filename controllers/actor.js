const { Actor, Sequelize } = require("../models");
const Op = Sequelize.Op;

const ActorController = {

  async getByName(req, res) {
    try {
      let offset;
      if (!req.query.offset){
      offset = 0; 
      }
      else {
        offset = +req.query.offset
      }
      const actors = await Actor.findAndCountAll({
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
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
        trace: err,
      });
    }
  },
  async delete(req, res) {
    try {
      const actor = await Actor.findByPk(req.params.id);
      actor.status = 0;
      await actor.save();
      res.send({message: `Actor with name ${actor.name} ${actor.last_name} was deleted`});
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Actors by name",
        trace: err,
      });
    }
  },
  async reactivate(req, res) {
    try {
      const actor = await Actor.findByPk(req.params.id);
      actor.status = 1;
      await actor.save();
      res.send({message: `Actor with name ${actor.name} ${actor.last_name} was reactivated`});
    } catch (err) {
      procces.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Actors by name",
        trace: err,
      });
    }
  }
};

module.exports = ActorController;
