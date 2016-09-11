"use strict";

module.exports = {
	properties: {
		tableName: {
			type: 'string',
			required: true,
			pattern: /^\w+[\w\d]*$/
		},
		fieldsNames: {
			type: 'string',
			pattern: '([\\w\\d]+,?)*',
		},
	},
};
