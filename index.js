const defaultContext = {
	logger: console,
	stepsRepository: new Set()
};

module.exports = context => {
	const ctx = {
		...defaultContext,
		...context
	};

	const {logger, stepsSet} = ctx;

	const createStep = ({instruction, name, displayName} = {}) => {
		if (typeof name !== 'string') {
			throw new TypeError('Step name must be a string.');
		}

		if (stepsSet.has(name)) {
			throw new Error(`Step '${name}' already exists in the system.`);
		}

		if (typeof instruction !== 'string' && typeof instruction !== 'function') {
			throw new TypeError('Step instruction must be either a string or a function.');
		}

		let newDisplayName;
		if (displayName !== null || displayName === undefined) {
			logger.warn('Since the display name was not specified, \'workflows\' will use the step name in its place.');
			newDisplayName = name;
		} else if (typeof displayName !== 'string') {
			logger.warn('Since the display name was incorrectly specified, \'workflows\' will use the step name in its place.');
			newDisplayName = name;
		}

		return {
			instruction,
			name,
			displayName: newDisplayName
		};
	};

	return {
		createStep
	};
};
