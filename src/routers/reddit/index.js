"use strict";

const router = require('express').Router();
const config = require('config').reddit;
const conform = require('conform');
const commonInputValidation = require('./inputValidation');
const getData = require('../../utils/getData');
const actions = config.actions.reduce((output, action) => {
	output[action] = require(`../../actions/${action}`);
	return output;
}, {});
const formatters = config.formats.reduce((output, format) => {
	output[format] = require(`../../formatters/${format}`);
	return output;
}, {});

router.get('/', function (req, res) {
	res.render('reddit', {
		actions: config.actions,
		formats: config.formats,
	});
});

router.get('/data', function (req, res, next) {
	try {
		const query = req.query;
		conform.validate(query, commonInputValidation, {
			failOnFirstError: true,
		});
		const actionParams = query.action;
		const action = actions[actionParams.name];
		const formatParams = query.format;
		const format = formatters[formatParams.name];

		return getData(query.url)
			.then(data => action(data.data.children, actionParams))
			.then(data => format(data, formatParams))
			.then(result => res.send(result))
			.catch(err => next(err));
	} catch (err) {
		next(err);
	}
});

module.exports = router;
