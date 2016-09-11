"use strict";

module.exports = {
	properties: {
		direction: {
			type: 'string',
			enum: ['1', '-1'],
			required: true,
		},
		field: {
			type: 'string',
			enum: ['created', 'score'],
			required: true,
		},
	},
};
