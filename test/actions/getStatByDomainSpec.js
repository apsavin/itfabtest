"use strict";

const chai = require('chai');
const getStatByDomain = require('../../src/actions/getStatByDomain');

const expect = chai.expect;

describe('getStatByDomain action', () => {
	it('should validate params', () => {
		expect(() => getStatByDomain())
			.to.throw('Expected first argument to be an array');
	});

	it('should aggregate data', () => {
		expect(getStatByDomain([])).to.be.deep.eq([]);
		expect(getStatByDomain([
			{
				data: {
					id: 'qwe1', created: 200000, created_utc: 200000, score: 43,
					title: 'sdf', domain: 'a',
				},
			},
			{
				data: {
					id: 'qwe1', created: 0, created_utc: 0, score: 1,
					title: 'fds', domain: 'a',
				}
			},
			{
				data: {
					id: 'qwe1', created: 0, created_utc: 0, score: 4,
					title: 'fds', domain: 'b',
				},
			},
		]))
			.to.be.deep.eq([
			{domain: 'a', count: 2, score: 44},
			{domain: 'b', count: 1, score: 4},
		]);
	});
});
