const { Position, User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const { Op, where } = require('sequelize');

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw { name: 'emailIsRequired' };
    }

    if (!password) {
      throw { name: 'passwordIsRequired' };
    }

    const response = await User.findOne({ where: { email } });
    if (!response) {
      throw { name: 'wrongEmailPass' };
    }

    const isValid = comparePassword(password, response.password);
    if (!isValid) {
      throw { name: 'wrongEmailPass' };
    }

    const payload = { id: response.id, email: response.email };
    const access_token = signToken(payload);

    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
};

const getPositions = async (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsnumber = Number.parseInt(req.query.size);
  const description = req.query.description || '';
  const location = req.query.location || '';
  const full_time = req.query.full_time || 'true';

  try {
    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 4;
    if (!Number.isNaN(sizeAsnumber) && sizeAsnumber > 0 && sizeAsnumber < 4) {
      size = sizeAsnumber;
    }

    let full_time_filter = '';
    if (full_time === 'true') {
      full_time_filter = 'Full Time';
    } else {
    }

    let whereStatement = {};
    if (description) {
      whereStatement.description = {
        [Op.iLike]: `%${description}%`,
      };
    }
    if (location) {
      whereStatement.location = {
        [Op.iLike]: `%${location}%`,
      };
    }
    if (full_time === 'true') {
      whereStatement.type = {
        [Op.iLike]: `%Full Time%`,
      };
    } else {
      whereStatement.type = {
        [Op.ne]: `Full Time`,
      };
    }

    const countPositions = await Position.count({
      where: whereStatement,
    });
    const positions = await Position.findAndCountAll({
      where: whereStatement,
      offset: (page - 1) * size,
      limit: size,
    });

    const result = {
      data: positions.rows,
      totalPages: Math.ceil(positions.count / size),
      totalData: countPositions,
      size: size,
      page: page,
      offset: (page - 1) * size,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getOnePosition = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Position.findByPk(id);

    if (result) {
      res.status(200).json(result);
    } else if (!result) {
      throw { name: 'notFound' };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getPositions, getOnePosition, postLogin };
