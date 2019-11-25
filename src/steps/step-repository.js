const defaultCtx = {
	logger: console,
	stepStore: new Set()
};

// Note: the stepStore object should expose a Set-like API at the bare minimum.

function getStepName(step) {
	if (step === undefined || step === null) {
		throw new TypeError('Step cannot be null or undefined.');
	}

	if (typeof step === 'string') {
		return step;
	}

	return step.name;
}

class StepRepository {
	constructor({logger, stepStore}) {
		this.steps = stepStore;
		this.logger = logger;
	}

	hasStep(step) {
		const stepName = getStepName(step);
		this.logger.debug(`Trying to find '${stepName}' in the system.`);
		return this.steps.has(stepName);
	}

	addStep(step) {
		const stepName = getStepName(step);
		this.logger.debug(`Trying to add '${stepName}' in the system.`);
		if (this.steps.has(stepName)) {
			throw new Error(`Step '${stepName} already exists in the system.`);
		}

		this.logger.info(`'${stepName}' added to the system.`);
		this.steps.add(step);
	}

	removeStep(step) {
		const stepName = getStepName(step);
		this.logger.debug(`Trying to remove '${stepName}' from the system.`);
		if (this.steps.has(stepName)) {
			this.logger.info(`Removing '${stepName}' from the system.`);
			this.steps.delete(stepName);
		} else {
			this.logger.warn(`'${stepName}' not found in the system.`);
		}
	}
}

module.exports = context => {
	const ctx = {
		...defaultCtx,
		...context
	};

	function createRepository() {
		console.log(new StepRepository(ctx));
	}

	return {
		createRepository
	};
};
