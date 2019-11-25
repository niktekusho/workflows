const  = require('../../src/steps/step-repository');

describe('getStepName tests', () => {
	it('should throw on null and undefined', () => {
		expect(() => getStepName()).toThrowError('Step cannot be null or undefined.');
		expect(() => getStepName(null)).toThrowError('Step cannot be null or undefined.');
	});

	it('should return the step name if the step is a string', () => {
		expect(getStepName('aStep')).toStrictEqual('aStep');
	});

	it('should return the value of the property \'name\' when passed an object', () => {
		expect(getStepName({})).toStrictEqual(undefined);
		expect(getStepName({name: 'aStep'})).toStrictEqual('aStep');
	});
});
