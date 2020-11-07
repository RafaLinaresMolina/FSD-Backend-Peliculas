
const { User, Order, OrderFilm, Film, Price } = require("../models");

Order.belongsTo(User, {
  through: { model: Film },
  foreignkey: 'UserId'
});

Order.belongsToMany(Film, {
  through: { model: OrderFilm },
});
Film.belongsToMany(Order, {
  through: { model: OrderFilm },
});

Order.belongsTo(Price);

const OrderController = {
  async getAll(req, res) {
    try {
      let offset;
      if (!req.query.offset) {
        offset = 0;
      } else {
        offset = +req.query.offset;
      }
      const orders = await Order.findAndCountAll({
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
        include: [
          {
            model: Film,
            required: true,
            //atributes: ["stock"],
            through: { atributes: [] },
          },
          {
            model: User,
            required: true,
            attributes: ['id', 'name', 'last_name', 'email', 'status'],
       
          },
          {
            model: Price,
            required: true,
          },
        ],
      });
      if (!orders.rows) {
        return res.status(400).send({ message: "Orders not found" });
      }
      orders.rows = calculatePrices(orders.rows);
      res.send(orders);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to get the ${Order.name} resource`,
        trace: err,
      });
    }
  },
  async getByUserId(req, res) {
    try {
      let offset;
      if (!req.query.offset) {
        offset = 0;
      } else {
        offset = +req.query.offset;
      }
      const orders = await Order.findAndCountAll({
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
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
          {
            model: User,
            required: true,
          },
          {
            model: Price,
            required: true,
          },
        ],
      });
      if (!orders.rows) {
        return res.status(400).send({ message: "Orders not found" });
      }
      orders.rows = calculatePrices(orders.rows);
      res.send(orders);
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
      const order = await Order.findByPk(req.params.id, {
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
          {
            model: User,
            required: true,
          },
          {
            model: Price,
            required: true,
          },
        ],
      });
      if (!order) {
        return res.status(400).send({ message: "Order not found" });
      }
      const calculatedOrders = calculatePrice(order.toJSON());
      res.send(calculatedOrders);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: err,
      });
    }
  },
  async getByUserLogged(req, res) {
    try {
      let offset;
      if (!req.query.offset) {
        offset = 0;
      } else {
        offset = +req.query.offset;
      }
      const orders = await Order.findAndCountAll({
        distinct: true,
        offset,
        limit: +process.env.LIMIT_FILMS,
        where: { UserId: req.user.id },
        include: [
          {
            model: Film,
            required: true,
            through: {
              attributes: ["stock"],
            },
          },
          {
            model: User,
            required: true,
          },
          {
            model: Price,
            required: true,
          },
        ],
      });
      if (!orders.rows) {
        return res.status(400).send({ message: "Orders not found" });
      }
      orders.rows = calculatePrices(orders.rows);
      res.send(orders);
    } catch (err) {
      process.log.error(err.message);
      res.status(500).send({
        message: `Unable to retrive the specified ${Order.name} resource`,
        trace: err,
      });
    }
  },
  async update(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(400).send({ message: "Order not found" });
      }
      await updateStatus(order, req.params.status);
      res.send(`Status of order '${order.id}' updated.`);
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
      const order = { UserId: req.user.id };
      if(req.user.creditCard){
        return res.status(400).send({message: 'must have credit card to create orders.'})
      }
      process.log.debug(`Aux objects generated`);
      value = await Order.create(order);
      process.log.debug(`Order created`);
      setOrderIdOnOrderMovie(value.id, newOrderFilms);
      OrderFilmInstance = await OrderFilm.bulkCreate(newOrderFilms);
      process.log.info("OrderFilm rows created");
      await stockBalancing(req.body.Films);
      process.log.info("res");
      res.status(201).send(value);
    } catch (err) {
      let idForDelete;
      if (OrderFilmInstance) {
        await OrderFilm.destroy(OrderFilmInstance, {
          where: { OrderId: idForDelete },
        });
        process.log.warning("OrderMovie being reverted...");
      }
      if (value) {
        idForDelete = value.id;
        await Order.destroy(value, { where: { id: idForDelete } });
        process.log.warning("Order being reverted...");
      }
      process.log.error(err.message);
      res.status(500).send({
        message: `Theres was a problem trying to create the ${Order.name} resource`,
        trace: err,
      });
    }
  },
};

const calculatePrices = (orders) =>
  orders.map((order) => calculatePrice(order.toJSON()));

const calculatePrice = (order) => {
  order.charge = order.Price.days * order.Price.euro_perDay;
  order.currency = "euro";
  order.totalCharge = order.charge;
  if (order.realReturnDate) {
    const returnDate = new Date(order.realReturnDate);
    const recomendedDate = new Date(order.recomendedReturnDate);
    const totalDays = returnDate.getDate() - recomendedDate.getDate();
    if (totalDays > 0) {
      const totalDays = returnDate.getDate() - recomendedDate.getDate();
      order.delayCharge = totalDays * order.Price.euro_perDay;
      order.totalCharge += order.delayCharge;
    }
  }
  return order;
};

const updateStatus = async (order, status) => {
  try {
    const date = new Date();
    const statusObject = {
      sended(order) {
        if (order.status === "pending") {
          process.log.info(status);
          order.status = status;
        }
      },
      client(order) {
        if (order.status === "sended") {
          process.log.info(status);
          order.status = status;
          order.arrivedAtClient = date;
          const returnDate = new Date();
          returnDate.setDate(returnDate.getDate() + order.Price.days);
          order.recomendedReturnDate = returnDate;
        }
      },
      returning(order) {
        if (order.status === "client") {
          process.log.info(status);
          order.status = status;
          order.realReturnDate = date;
        }
      },
      async stocked(order) {
        if (order.status === "returning") {
          process.log.info(status);
          order.status = status;
          order.reStocked = date;
          await restockFilms(order.Films);
        }
      },
    };
    await statusObject[status](order);
    await order.save();
  } catch (err) {
    throw err;
  }
};

const restockFilms = async (films) => {
  for (const film of films) {
    const filmToRestock = await Film.findByPk(film.id);
    filmToRestock.stock += film.OrderFilm.stock;
    await filmToRestock.save();
  }
};

const isStockEnough = async (filmId, quantity) => {
  try {
    const film = await Film.findByPk(filmId);
    if (!film) {
      throw new Error(`Film with ID ${filmId} not found`);
    }
    if (quantity <= 0) {
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
    process.log.info("stockBalancing");
    for (const film of films) {
      const value = await removeFilmFromStock(film.FilmId, film.quantity);
      process.log.info(value);
    }
  } catch (err) {
    process.log.error(err.message);
    throw err;
  }
};

const removeFilmFromStock = async (FilmId, quantity) => {
  try {
    process.log.debug(`${FilmId}:${quantity}`);
    const film = await Film.findByPk(FilmId);
    if (!film.stock < quantity) {
      process.log.debug(film);
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
