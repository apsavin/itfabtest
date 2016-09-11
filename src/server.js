"use strict";

const express = require('express');
const config = require('config');
const winston = require('winston');
const app = express();

app.use('/reddit', require('./routers/reddit'));
app.use(require('./middleware/errorHandler'));

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.listen(config.app.port, function () {
	winston.info(`App listening on port ${config.app.port}.`);
});
