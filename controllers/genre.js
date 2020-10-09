const { Genre, Sequelize } = require("../models");
const Op = Sequelize.Op;

const GenreController = {

  async getByName(req, res) {
    Genre.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        }        
      },
    })
      .then((category) => res.send(category))
      .catch((error) => {
        console.error(error);
        res.status(500).send({
          message: "There was a problem trying to get the Genre by name",
        });
      });
  }
};

module.exports = GenreController;
