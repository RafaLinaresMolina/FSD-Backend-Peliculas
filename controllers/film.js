const { Film, Sequelize } = require("../models");
const Op = Sequelize.Op;

const FilmController = {

  async getFilmByName(req, res) {
    Film.findAll({
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
    })
      .then((category) => res.send(category))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to get the Films by name",
        });
      });
  }
};

module.exports = FilmController;
