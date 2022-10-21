const userRepository = require("../repositories/userRepository");
const { checkPassword, encryptPassword, createToken } = require("../utils/auth");
module.exports = {
  async registerMember(data) {
    try {
      const name = data.name;
      const email = data.email;
      const password = await encryptPassword(data.password);
      const id_user_level = 3;
      const user = await userRepository.create({ name, email, password, id_user_level });
      return user;
    } catch (err) {
      throw err.message;
    }
  },

  async login(data) {
    const email = data.email.toLowerCase();
    const password = data.password;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email tidak terdaftar");
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      throw new Error("Password salah!");
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      id_user_level: user.id_user_level,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return {
      id: user.id,
      email: user.email,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async createAdmin(data) {
    try {
      const name = data.name;
      const email = data.email;
      const password = await encryptPassword(data.password);
      const id_user_level = 2;
      const user = await userRepository.create({ name, email, password, id_user_level });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        id_user_level: user.id_user_level,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (err) {
      throw new Error("Failed to create admin");
    }
  },

  find(id) {
    return userRepository.find(id);
  },
};
