const userServices = require("../../../services/userServices");

module.exports = {
  async registerMember(req, res) {
    try {
      const data = await userServices.registerMember(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  async login(req, res) {
    try {
      const data = await userServices.login(req.body);
      res.status(200).json(data);
    } catch (err) {
      if (err.message === "Password salah!") {
        res.status(401).json({ message: err.message });
      } else if (err.message === "Email tidak terdaftar") {
        res.status(404).json({ message: err.message });
      }
    }
  },

  async whoAmI(req, res) {
    res.status(200).json(req.user);
  },
};
