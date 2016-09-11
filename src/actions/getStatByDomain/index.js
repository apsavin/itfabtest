"use strict";

module.exports = function getStatByDomain(data) {
	if (!Array.isArray(data)) {
		throw new Error('Expected first argument to be an array');
	}
	const domainToIndex = {};
	return data.reduce((output, chunk) => {
		const chunkData = chunk.data;
		const domain = chunkData.domain;
		const score = chunkData.score;
		if (!(domain in domainToIndex)) {
			domainToIndex[domain] = output.length;
			output[domainToIndex[domain]] = {
				domain,
				count: 0,
				score: 0,
			};
		}
		const stat = output[domainToIndex[domain]];
		stat.count++;
		stat.score += score;
		return output;
	}, []);
};
