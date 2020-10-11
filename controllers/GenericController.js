/**
 * Class for default ussage of models 
 */
class GenericController {
  constructor(Model) {
    this.model = Model;
    this.modelName = Model.name;
  }

  getAll = async (req, res) => {
    try {
      const values = await this.model.findAll();
      process.log.data(values);
      res.send(values);
    } catch (error) {
      process.log.error(error);
      res
        .status(500)
        .send({
          message: `Theres was a problem trying fetching all the ${this.modelName} resources`,
          trace: error.message,
        });
    }
  };
  getById = async (req, res) => {
    try {
      const value = await this.model.findByPk(req.params.id);
      if(!value){
        return res.json({message: `${this.modelName} resource by Id not found`})
      }
      res.send(value);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: `Theres was a problem trying fetching the ${this.modelName} resource by Id`,
          trace: error.message,
        });
    }
  };

  create = async (req, res) => {
    try {
      const value = await this.model.create(req.body);
      process.log.data(value);
      res.status(201).send(value);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Theres was a problem trying to create the ${this.modelName} resource`,
        trace: error.message,
      });
    }
  };

  update = async (req, res) => {
    try {
      const [rowsAffected] = await this.model.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      process.log.debug(`Rows affected: ${rowsAffected}`);
      if(!rowsAffected){
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
        message: `Theres was a problem trying to update the ${this.modelName} resource`,
        trace: error.message,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const rowsAffected = this.model.destroy({
        where: {
          id: req.params.id,
        },
      });

      if(!rowsAffected){
        return res.send({
          message: "Nothing to delete",
          rowsAffected,
        });
      }

      return res.send({ message: "resource deleted", rowsAffected });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Theres was a problem trying to delete the ${this.modelName} resource`,
        trace: error.message,
      });
    }
  };
}

module.exports = GenericController;