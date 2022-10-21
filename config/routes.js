const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares/authorization");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../carsopenapi.json");

const apiRouter = express.Router();

// Check Current User
apiRouter.get("/api/v1/whoami", middlewares.authorize, controllers.api.v1.authController.whoAmI);

// Auth Login (All User) & Register (Member)
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.registerMember);

// Cars (Admin & Super Admin)
apiRouter.get("/api/v1/cars", middlewares.authorizeAdmin, controllers.api.v1.carController.findAllCars);
apiRouter.post("/api/v1/car/create", middlewares.authorizeAdmin, controllers.api.v1.carController.createCar);
apiRouter.put("/api/v1/car/update/:id", middlewares.authorizeAdmin, controllers.api.v1.carController.updateCar);
apiRouter.delete("/api/v1/car/delete/:id", middlewares.authorizeAdmin, controllers.api.v1.carController.deleteCar);

// Not Authorized & Authentication
apiRouter.get("/api/v1/cars/filter", controllers.api.v1.carController.filterCars);

// Add Admin (Super Admin)
apiRouter.post("/api/v1/admin/create", middlewares.authorizeSuperAdmin, controllers.api.v1.userController.createAdmin);

// Swagger
apiRouter.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
