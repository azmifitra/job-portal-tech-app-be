const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: 'userNotFound' };
    }

    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: 'userNotFound' };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
