"use strict";

const inputValidation = require('./inputValidation');
const conform = require('conform');

module.exports = function toSql(data, params) {
	if (!Array.isArray(data)) {
		throw new Error('Expected first argument to be an array');
	}

	conform.validate(params, inputValidation, {
		failOnFirstError: true,
	});

	if (!data.length) {
		return '';
	}

	const tableName = params.tableName;
	let fieldNames = (params.fieldsNames || '').split(',');
	const keys = Object.keys(data[0]);
	fieldNames = keys.map((key, i) => (fieldNames[i] || `field${i}`));
	const start = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (`;
	const end = ');';
	return data.map(chunk => `${start}${keys.map(key => {
		const value = chunk[key];
		switch (typeof value) {
			case 'string':
				return `'${value.replace(/'/g, '\\\'')}'`;
			case 'number':
				return value;
			default:
				return 'NULL';
		}
	}).join(', ')}${end}`).join('\n');
};
