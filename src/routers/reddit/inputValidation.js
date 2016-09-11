"use strict";

const config = require('config').reddit;

module.exports = {
	properties: {
		url: {
			description: 'Url to the reddit data',
			type: 'string',
			format: 'url',
			required: true,
			pattern: '^https://www.reddit.com/.*\\.json$',
		},
		action: {
			description: 'Params of the action',
			type: 'object',
			required: true,
			properties: {
				name: {
					type: 'string',
					required: true,
					enum: config.actions,
				},
			},
		},
		format: {
			description: 'Params of the format',
			type: 'object',
			required: true,
			properties: {
				name: {
					type: 'string',
					required: true,
					enum: config.formats,
				},
			},
		},
	},
};
