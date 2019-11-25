const LoggerMock = require('logger-mock');

const lib = require('.');

const noop = () => {};

describe('createStep testing', () => {
	const logger = new LoggerMock();

	const {createStep} = lib({logger});

	afterEach(() => {
		logger.reset();
	});

	it('should throw if name is not a string', () => {
		// Case: undefined
		expect(() => createStep()).toThrowError('Step name must be a string.');
		// Case: null
		expect(() => createStep({name: null})).toThrowError('Step name must be a string.');
		// Case: object
		expect(() => createStep({name: {}})).toThrowError('Step name must be a string.');
		// Case: number
		expect(() => createStep({name: 1})).toThrowError('Step name must be a string.');
		// Case: function
		expect(() => createStep({name: noop})).toThrowError('Step name must be a string.');
	});

	it('should throw if command is not a function or a string', () => {
		// Case: undefined
		expect(() => createStep({name: 'step'})).toThrowError('Step instruction must be either a string or a function.');
		// Case: null
		expect(() => createStep({name: 'step', instruction: null})).toThrowError('Step instruction must be either a string or a function.');
		// Case: object
		expect(() => createStep({name: 'step', instruction: {}})).toThrowError('Step instruction must be either a string or a function.');
		// Case: number
		expect(() => createStep({name: 'step', instruction: 1})).toThrowError('Step instruction must be either a string or a function.');
	});

	it('should log when the displayName is not defined or is not a string', () => {
		createStep({name: 'step', instruction: 'echo \'Hello world\''});
		expect(logger.hasSpecificLogMessage('Since the display name was not specified, \'workflows\' will use the step name in its place.')).toBeTruthy();
	});

	it('should return the sanitized step object', () => {

	});
});

