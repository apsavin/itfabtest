"use strict";

const inputValidation = require('./inputValidation');
const conform = require('conform');

module.exports = function toCsv(data, params) {
	if (!Array.isArray(data)) {
		throw new Error('Expected first argument to be an array');
	}
	conform.validate(params, inputValidation, {
		failOnFirstError: true,
	});
	const delimiter = params.delimiter;
	if (!data.length) {
		return '';
	}
	const keys = Object.keys(data[0]);
	return data
		.map(chunk => keys.map(key => JSON.stringify(chunk[key])).join(delimiter))
		.join('\n');
};

