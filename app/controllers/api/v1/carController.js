const carServices = require("../../../services/carServices");

module.exports = {
  async createCar(req, res) {
    try {
      const data = await carServices.createCar(req.body, req.user);
      res.status(201).json({
        message: "Car created successfully",
        data,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async findAllCars(req, res) {
    try {
      const cars = await carServices.findAllCars();
      res.status(200).json({
        data: cars,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async updateCar(req, res) {
    try {
      const car = await carServices.updateCar(req.params.id, req.body, req.user);
      res.status(200).json({
        message: "Car updated successfully",
        data: car,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async deleteCar(req, res) {
    try {
      const car = await carServices.deleteCar(req.params.id, req.user);
      res.status(200).json({
        message: "Car deleted successfully",
        data: car,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async filterCars(req, res) {
    try {
      const cars = await carServices.filterCars(req.query);
      res.status(200).json({
        data: cars,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
};
