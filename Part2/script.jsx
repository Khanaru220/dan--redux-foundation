const addCounter = (list) => {
	// opt 1: list.concat([0])
	// opt 2: [...list, 0]
	return [...list, 0];
};

const removeCounter = (list, index) => {
	// opt 1: list.fitler((_,i) => i !== index)
	// opt 2: list.slice(0, index).concat(list.slice(index + 1))
	// opt 3: [...list.slice(0, index), ...(list.slice(index + 1))]
	return list.filter((_, i) => i !== index);
};

const incrementCounter = (list, index) => {
	// opt 1: list.map((e,i) => i === index ? e + 1 : e)
	// opt 2: [...list.slice(0, index), list[index] + 1 , ...(list.slice(index + 1))]

	return list.map((e, i) => (i === index ? e + 1 : e));
};

//  -----------
const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore); // <-- force immutable object
	expect(addCounter(listBefore)).toEqual(listAfter);
	console.log('testAddCounter passed');
};

const testRemoveCounter = () => {
	const listBefore = [0, 1, 2, 3, 4, 5];
	const index = 3;
	const listAfter = [0, 1, 2, 4, 5];

	deepFreeze(listBefore);
	expect(removeCounter(listBefore, index)).toEqual(listAfter);
	console.log('testRemoveCounter passed');
};

const testIncrementCounter = () => {
	const listBefore = [0, 0, 0, 0];
	const index = 2;
	const listAfter = [0, 0, 1, 0];

	deepFreeze(listBefore);
	expect(incrementCounter(listBefore, index)).toEqual(listAfter);
	console.log('testIncrementCounter passed');
};

//  -----------
testAddCounter();
testIncrementCounter();
testRemoveCounter();
