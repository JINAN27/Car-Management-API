"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        notNull: true,
      },
      email: {
        type: Sequelize.STRING,
        notNull: true,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING,
        notNull: true,
        min: {
          args: 6,
          msg: "password must be at least 6 characters long",
        },
      },
      id_user_level: {
        type: Sequelize.INTEGER,
        notNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
