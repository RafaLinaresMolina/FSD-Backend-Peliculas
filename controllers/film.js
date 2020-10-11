const { Film, Sequelize } = require("../models");
const Op = Sequelize.Op;

const FilmController = {

  async getFilmByName(req, res) {
    try{
      const films = await Film.findAll({
        where: {
          [Op.or]: 
            {
              original_title: {
                [Op.like]: `%${req.params.name}%`,
              },
              title: {
                [Op.like]: `%${req.params.name}%`,
              },
            },
          
        },
      });
      res.send(films);
    }catch(err){
      process.log.error(err);
      res.status(500).send({
        message: "There was a problem trying to get the Films by name",
        trace: err.message
      });
    }
  }
};

module.exports = FilmController;
