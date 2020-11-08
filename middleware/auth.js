const jwt = require("jsonwebtoken");
const { User } = require("../models");

const error403 = `I’m sorry. I know who you are–I believe who you say you are–but you just don’t have permission to access this resource.`;
const error401 = `I don't know who you are or what you want, go away please.`;

const auth = {
  async loggedRequired(req, res, next) {
    try {
      if(!req.headers.authorization){
        process.log.warning(`Token not present in headers`);
        return res.status(401).send({ message: error401 })
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_AUTH_JWT);
      const user = await User.findOne({ where: { token: token, status: 1 } });
      if (!user) {
        return res.status(401).send({ message: error401 });
      }
      req.user = user;
      req.user.token = token;
      next();
    } catch (error) {
      process.log.error(error.message);
      res.status(401).send({ message: error401 });
    }
  },
  
  async adminRequired(req, res, next) {
    try {
      if (req.user.rol_id != 0) {
        return res.status(403).send({ message: error403 });
      }
      next();
    } catch (error) {
      process.log.error(error.message);
      res.status(403).send({ message: error403 });
    }
  },
};

module.exports = auth;
