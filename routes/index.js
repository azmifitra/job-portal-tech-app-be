const express = require('express');
const route = express.Router();
const controller = require('../controllers/controller');

const errorHandlers = require('../middleware/errorHandlers');
const { authentication } = require('../middleware/auth');

// route.post('/login', controller.postLogin);

// route.get('/heroes', authentication, controller.getHeroes);

route.get('/', (req, res) => {
  res.send('Welcome to express!');
});
route.post('/login', controller.postLogin);
route.get('/positions', authentication, controller.getPositions);
route.get('/positions/:id', authentication, controller.getOnePosition);
route.use(errorHandlers);

module.exports = route;
