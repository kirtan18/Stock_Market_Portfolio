const usersService = require('./users.service');

module.exports = {

  registerUser: async (req, res, next) => {
    try {
      const { userName, userEmail, userPassword } = req.body;
      const token = await usersService.registerService(userName, userEmail, userPassword);
      if (token) {
        res.status(204).json();
      }
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { userEmail, userPassword } = req.body;
      const token = await usersService.loginService(userEmail, userPassword);
      res.status(200).json({ msg: 'Login successfully', token });
    } catch (error) {
      next(error);
    }
  }

};
