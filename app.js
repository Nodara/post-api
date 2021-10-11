require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();

require('./database');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(3000);
