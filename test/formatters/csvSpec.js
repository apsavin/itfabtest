"use strict";

const chai = require('chai');
const toCsv = require('../../src/formatters/csv');

const expect = chai.expect;

describe('csv formatter', () => {
	it('should validate params', () => {
		expect(() => toCsv()).to.throw('Expected first argument to be an array');
		expect(() => toCsv([]))
			.to.throw('Cannot convert undefined or null to object');
		expect(() => toCsv([], {
			bla: ''
		})).to.throw('ValidatorError: Property "delimiter" is required');
		expect(() => toCsv([], {
			delimiter: ''
		})).to.throw('ValidatorError: Property "delimiter" ' +
			'is too short (minimum is 1 characters)');
		expect(() => toCsv([], {
			delimiter: ',,'
		})).to.throw('ValidatorError: Property "delimiter" ' +
			'is too long (maximum is 1 characters)');
	});

	it('should format input as csv', () => {
		expect(toCsv([], {delimiter: ','})).to.be.eq('');
		expect(toCsv([{a: 1, b: 'asdas'}], {delimiter: ','}))
			.to.be.eq('1,"asdas"');
		expect(toCsv([{a: 1, b: 'asdas'}], {delimiter: ';'}))
			.to.be.eq('1;"asdas"');
	});
});
