require('dotenv').config();
require('./database');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./util/session');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
app.use('/api', routes);

app.listen(3000);
