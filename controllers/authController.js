const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nmailer = require("../lib/nodemailer");

const AuthController = {
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
          status: 1,
        },
      });
      if (!user) {
        return res.status(400).send({
          message: "Wrong credentials",
        });
      }
      if (!user.confirmed) {
        return res.status(400).send({
          message: "Confirm your email",
        });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({
          message: "Wrong credentials",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_AUTH_JWT, {
        expiresIn: "30d",
      });
      user.token = token;
      user.last_login = new Date();
      await user.save();
      res.send({ token: user.token });
    } catch (error) {
      process.log.error(error.message);
      res.status(400).send({ message: "There was a problem trying to login", trace: error.message });
    }
  },
  async signup(req, res) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 9);
      req.body.confirmed = false;
      req.body.rol_id = 1;
      const user = await User.create(req.body);
      const emailToken = jwt.sign(
        { id: user.id },
        process.env.SECRET_EMAIL_JWT,
        { expiresIn: "24h" }
      );
      const emailConfirmationLink =
        process.env.API_URL + "/auth/confirm/" + emailToken;
        process.log.info(emailConfirmationLink)
      await nmailer.transporter.sendMail(
        nmailer.defaultMail(user, emailConfirmationLink)
      );
      res
        .status(201)
        .send({
          message: `User with email ${user.email} created. Must confirm account with email validation!`,
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error,
        message: "There was a problem trying to register the user",
      });
    }
  },
  async getUserByToken(req, res) {
    try {
      req.user.creditCard ? req.user.creditCard = true : req.user.creditCard = false;
      delete req.user.password;
      res.send(req.user);
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
  async confirm(req, res) {
    // const token = req.params.token
    try {
      const { token } = req.params;
      const payload = await jwt.verify(token, process.env.SECRET_EMAIL_JWT);
      await User.update(
        { confirmed: true },
        {
          where: {
            id: payload.id,
            status: 1,
          },
        }
      );
      res.send({ message: "Acount successfully confirmed" });
    } catch (error) {
      process.log.error(error);
      res.status(500).send({
        message: "There was a problem trying to confirm your email",
        error,
      });
    }
  },
};

module.exports = AuthController;
