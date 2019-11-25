function getStepName(step) {
	if (step === undefined || step === null) {
		throw new TypeError('Step cannot be null or undefined.');
	}

	if (typeof step === 'string') {
		return step;
	}

	return step.name;
}

module.exports = {
	getStepName
};
