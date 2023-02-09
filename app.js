const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const router = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
