const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");

const app = express();

require("dotenv").config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Install Router */
app.use(router);

module.exports = app;
