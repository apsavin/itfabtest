"use strict";

const chai = require('chai');
const toSql = require('../../src/formatters/sql');

const expect = chai.expect;

describe('sql formatter', () => {
	it('should validate params', () => {
		expect(() => toSql()).to.throw('Expected first argument to be an array');
		expect(() => toSql([]))
			.to.throw('Cannot convert undefined or null to object');
		expect(() => toSql([], {
			bla: ''
		})).to.throw('ValidatorError: Property "tableName" is required');
		expect(() => toSql([], {
			tableName: ''
		})).to.throw('ValidatorError: Attribute `pattern` of property ' +
			'`tableName` hasn`t pass check, ' +
			'expected value: `/^\\w+[\\w\\d]*$/` ' +
			'actual value: `` error message: `invalid input`');
	});

	it('should format input as sql', () => {
		expect(toSql([], {tableName: 'x'})).to.be.eq('');
		expect(toSql([{a: 1, b: 'asdas'}], {tableName: 'x'}))
			.to.be.eq("INSERT INTO x (field0, field1) VALUES (1, 'asdas');");
		expect(toSql([{a: 1, b: 'asdas'}], {tableName: 'y'}))
			.to.be.eq("INSERT INTO y (field0, field1) VALUES (1, 'asdas');");
		expect(toSql([{a: 1, b: 2, c: 3}], {tableName: 'y', fieldsNames: 'a,b'}))
			.to.be.eq("INSERT INTO y (a, b, field2) VALUES (1, 2, 3);");
	});
});
