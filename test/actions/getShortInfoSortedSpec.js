"use strict";

const chai = require('chai');
const getShortInfoSorted = require('../../src/actions/getShortInfoSorted');

const expect = chai.expect;

describe('getShortInfoSorted action', () => {
	it('should validate params', () => {
		expect(() => getShortInfoSorted())
			.to.throw('Expected first argument to be an array');
		expect(() => getShortInfoSorted([]))
			.to.throw('Cannot convert undefined or null to object');
		expect(() => getShortInfoSorted([], {
			bla: '',
		})).to.throw('ValidatorError: Property "direction" is required');
		expect(() => getShortInfoSorted([], {
			direction: '',
		})).to.throw('ValidatorError: Property "direction" must be' +
			' present in given enumerator: ["1","-1"], actual value ""');
		expect(() => getShortInfoSorted([], {
			direction: '1',
		})).to.throw('ValidatorError: Property "field" is required');
		expect(() => getShortInfoSorted([], {
			direction: '1',
			field: 'bla',
		})).to.throw('ValidatorError: Property "field" must be present in ' +
			'given enumerator: ["created","score"], actual value "bla"');
	});

	it('should reduce data amount and sort it', () => {
		expect(getShortInfoSorted([], {direction: '1', field: 'created'}))
			.to.be.deep.eq([]);
		expect(getShortInfoSorted([
			{
				data: {
					id: 'qwe1', created: 200000, created_utc: 200000,
					score: 43, title: 'sdf',
				},
			},
			{
				data: {
					id: 'qwe1', created: 0, created_utc: 0,
					score: 1, title: 'fds',
				},
			},
		], {direction: '1', field: 'created'}))
			.to.be.deep.eq([
			{
				id: 'qwe1', created_utc: '01.01.1970 12:00:00', score: 1, title: 'fds'
			},
			{
				id: 'qwe1', created_utc: '01.01.1970 12:03:20', score: 43, title: 'sdf'
			},
		]);
		expect(getShortInfoSorted([
			{
				data: {
					id: 'qwe1', created: 200000, created_utc: 200000,
					score: 43, title: 'sdf',
				},
			},
			{
				data: {
					id: 'qwe1', created: 0, created_utc: 0, score: 1, title: 'fds',
				},
			},
		], {direction: '-1', field: 'created'}))
			.to.be.deep.eq([
			{
				id: 'qwe1', created_utc: '01.01.1970 12:03:20',
				score: 43, title: 'sdf',
			},
			{
				id: 'qwe1', created_utc: '01.01.1970 12:00:00', score: 1, title: 'fds',
			},
		]);
		expect(getShortInfoSorted([
			{
				data: {
					id: 'qwe1', created: 200000, created_utc: 200000,
					score: 43, title: 'sdf',
				},
			},
			{
				data: {id: 'qwe1', created: 0, created_utc: 0, score: 1, title: 'fds'},
			},
		], {direction: '1', field: 'score'}))
			.to.be.deep.eq([
			{id: 'qwe1', created_utc: '01.01.1970 12:00:00', score: 1, title: 'fds'},
			{
				id: 'qwe1', created_utc: '01.01.1970 12:03:20',
				score: 43, title: 'sdf',
			},
		]);
	});
});
