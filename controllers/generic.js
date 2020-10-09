class GenericController {
  constructor(Model) {
    this.model = Model;
  }

  getAll = async (req, res) => {
    try {
      const values = await this.model.findAll();
      res.send(values);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the resource" });
    }
  };
  getById = async (req, res) => {
    try {
      const value = await this.model.findByPk(req.params.id);
      res.send(value);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to get the resource" });
    }
  };

  create = async (req, res) => {
    try {
      const value = await this.model.create(req.body);
      res.status(201).send(value);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to create the resource",
      });
    }
  };

  update = async (req, res) => {
    try {
      const value = await this.model.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ message: "resource successfully updated", trace: value });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to update the resource",
      });
    }
  };

  delete = (req, res) => {
    try {
      const rowsAffected = this.model.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!rowsAffected) {
        return res.send({ message: "resource not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to remove the resource",
      });
    }
  };
}

module.exports = GenericController;
