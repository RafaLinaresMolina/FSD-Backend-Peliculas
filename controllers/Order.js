const { User, Order, OrderFilm, Film, Sequelize } = require("../models");

Order.belongsTo(User, {
  through: { model: Film },
  foreignKey: "UserId",
});

Order.belongsToMany(Film, {
  as: "Films",
  through: { model: OrderFilm },
  foreignKey: "FilmIdm",
});

Film.belongsToMany(Order, {
  as: "OrderWithFilms",
  through: { model: OrderFilm },
  foreignKey: "OrderId",
});

const OrderController = {
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Film,
            required: true,
            through: { atributes: ["stock"] },
          },
        ],
      });
      res.send(orders);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to get the ${Order.name} resource`,
        trace: error,
      });
    }
  },
  async getByUserId(req, res) {
    try {
      const order = await Order.findAll({
        where: {
          UserId: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
        ],
      });
      res.send(order);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: err,
      });
    }
  },
  async getById(req, res) {
    try {
      const order = await Order.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
        ],
      });
      res.send(order);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: err,
      });
    }
  },
  async create(req, res) {
    let value;
    let OrderFilmInstance;
    try {
      const newOrderFilms = await checkStockage(req.body.Films);
      const order = { UserId: req.body.UserId };
      process.log.debug(`Aux objects generated`);
      value = await Order.create(order);
      process.log.debug(`Order created`);
      setOrderIdOnOrderMovie(value.id, newOrderFilms);
      OrderFilmInstance = await OrderFilm.bulkCreate(newOrderFilms);
      process.log.info('OrderFilm rows created')
      await stockBalancing(req.body.Films);
      process.log.info('res')
      res.status(201).send(value);
    } catch (err) {
      let idForDelete;
      if (OrderFilmInstance) {
        await OrderFilm.destroy(OrderFilmInstance, {where: {OrderId: idForDelete}});
        process.log.warning('OrderMovie being reverted...');
      }
      if (value) {
        idForDelete = value.id;
        await Order.destroy(value, {where: {id: idForDelete}});
        process.log.warning('Order being reverted...');
      }
      process.log.error(err.message);
      res.status(500).send({
        message: `Theres was a problem trying to create the ${Order.name} resource`,
        trace: err,
      });
    }
  },async updateStatus(req, res) {
    try {
      
    } catch (error) {
      
    }
  }
};


const isStockEnough = async (filmId, quantity) => {
  try {
    const film = await Film.findByPk(filmId);
    if (!film) {
      throw new Error(`Film with ID ${filmId} not found`);
    }
    if(quantity <= 0){
      throw new Error(`Quantity must be a number over 0 and integer.`);
    }
    if (!film.stock || film.stock < quantity) {
      throw new Error(`The film '${film.title}' is out of stock`);
    }
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

const checkStockage = async (filmsForNewOrder) => {
  try {
    const newOrderFilm = [];
    for (const i in filmsForNewOrder) {
      const element = filmsForNewOrder[i];
      process.log.info(element);
      await isStockEnough(element.FilmId, element.quantity);
      newOrderFilm.push({ FilmId: element.FilmId, stock: element.quantity });
    }
    return newOrderFilm;
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

const stockBalancing = async (films) => {
  try {
    process.log.info('stockBalancing')
    for (const film of films) {
      const value = await removeFilmFromStock(film.FilmId, film.quantity);
      process.log.info(value)
    }
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

const removeFilmFromStock = async (FilmId, quantity) => {
  try {
    process.log.debug(`${FilmId}:${quantity}`)
    const film = await Film.findByPk(FilmId);
    if (!film.stock < quantity) {
      process.log.debug(film)
      film.stock -= quantity;
      await film.save();
    } else {
      throw new Error(`You cant get movies if there are none.`);
    }
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

const setOrderIdOnOrderMovie = (OrderId, newOrderFilms) => {
  for (const orderFilm of newOrderFilms) {
    orderFilm.OrderId = OrderId;
  }
};

module.exports = OrderController;
