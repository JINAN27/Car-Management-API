const carRepository = require("../repositories/carRepository");
const moment = require("moment");
module.exports = {
  async createCar(data, user) {
    try {
      const car = await carRepository.create({
        plate: data.plate,
        manufacture: data.manufacture,
        model: data.model,
        image: data.image,
        rentPerDay: data.rentPerDay,
        capacity: data.capacity,
        type: data.type,
        year: data.year,
        avaliable: data.avaliable,
        avaliableAt: data.avaliableAt,
        createdBy: user.name,
      });
      return car;
    } catch (err) {
      throw new Error("Failed to create car");
    }
  },

  async findAllCars() {
    try {
      return (cars = await carRepository.findAll());
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async updateCar(id, data, user) {
    try {
      let carId = await carRepository.find(id);
      if (carId === null) {
        throw new Error("Car not found");
      } else {
        return (car = await carRepository.update(id, {
          plate: data.plate,
          manufacture: data.manufacture,
          model: data.model,
          image: data.image,
          rentPerDay: data.rentPerDay,
          capacity: data.capacity,
          type: data.type,
          year: data.year,
          avaliable: data.avaliable,
          avaliableAt: data.avaliableAt,
          updatedBy: user.name,
        }));
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async deleteCar(id, user) {
    try {
      let carId = await carRepository.find(id);
      if (carId === null) {
        throw new Error("Car not found");
      } else {
        await carRepository.update(id, {
          deletedBy: user.name,
        });
        return (car = await carRepository.delete({
          where: {
            id,
          },
        }));
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async filterCars(data) {
    let dateTime = moment(`${data.avaliableAt} ${data.pickupTime}`).format();
    try {
      return await carRepository.filter({
        capacity: data.capacity,
        avaliableAt: dateTime,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
