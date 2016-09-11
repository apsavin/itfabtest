"use strict";

const inputValidation = require('./inputValidation');
const conform = require('conform');
const moment = require('moment');

module.exports = function getShortInfoSorted(data, params) {
	if (!Array.isArray(data)) {
		throw new Error('Expected first argument to be an array');
	}

	conform.validate(params, inputValidation, {
		failOnFirstError: true,
	});

	const field = params.field;
	const direction = parseInt(params.direction, 10);
	return data
		.sort((a, b) => {
			return (a.data[field] - b.data[field]) * direction;
		})
		.map(chunk => [
			'id', 'title', 'created_utc', 'score'
		].reduce((output, key) => {
			let value = chunk.data[key];
			if (key === 'created_utc') {
				value = moment.utc(value).format('DD.MM.YYYY hh:mm:ss');
			}
			output[key] = value;
			return output;
		}, {}));
};
