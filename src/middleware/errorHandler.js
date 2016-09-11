const winston = require('winston');

module.exports = function errorHandlerMiddleware(err, req, res, next) {
	if (err.name === 'ValidatorError') {
		res.status(400).send(err.message);
		return;
	}
	winston.error(err);
	res.sendStatus(500);
};
