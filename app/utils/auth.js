const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

module.exports = {
  checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(isPasswordCorrect);
      });
    });
  },
  encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptedPassword) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(encryptedPassword);
      });
    });
  },
  createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY, {
      expiresIn: "1h",
    });
  },
};
