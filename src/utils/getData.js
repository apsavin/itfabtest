"use strict";

const LRU = require('lru-cache');
const config = require('config');
const request = require('superagent');
const cache = LRU(config.cache);

module.exports = function getData(url) {
	let dataPromise = cache.get(url);
	if (!dataPromise) {
		dataPromise = request.get(url).then(res => res.body, err => {
			cache.del(url);
			return Promise.reject(err);
		});
		cache.set(url, dataPromise);
	}
	return dataPromise;
};
