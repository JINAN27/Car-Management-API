const userServices = require("../../../services/userServices");
module.exports = {
  async createAdmin(req, res) {
    try {
      const data = await userServices.createAdmin(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
};
