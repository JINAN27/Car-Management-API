const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");
module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      req.user = await userServices.find(tokenPayload.id);

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async authorizeAdmin(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      if (tokenPayload.id_user_level !== 2 && tokenPayload.id_user_level !== 1) {
        res.status(403).json({ message: "Forbidden, Access denied" });
        return;
      }

      req.user = await userServices.find(tokenPayload.id);

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async authorizeSuperAdmin(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      if (tokenPayload.id_user_level !== 1) {
        res.status(403).json({ message: "Forbidden, Access denied" });
        return;
      }

      req.user = await userServices.find(tokenPayload.id);

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },
};
