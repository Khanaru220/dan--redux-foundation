const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

const createStore = (reducer) => {
	let state;
	const listeners = [];

	// Method 1: get current state
	const getState = () => state;

	// Method 2: dispatch will update state + notify subscribers
	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	// Method 3: add listeners + return function to unsubscribe
	const subscribe = (listener) => {
		listeners.push(listener);

		return () => {
			listeners.filter((l) => l !== listener);
		};
	};

	// dispatch dummy action to get initial state for getState()
	dispatch({});

	// return `store` as plain object
	return { getState, dispatch, subscribe };
};

const Counter = ({ value, onIncrement, onDecrement }) => {
	return (
		<div>
			<h1>{value}</h1>
			<button onClick={onIncrement}>+</button>
			<button onClick={onDecrement}>-</button>
		</div>
	);
};

const render = () => {
	ReactDOM.render(
		<Counter
			value={store.getState()}
			onIncrement={() => {
				store.dispatch({ type: 'INCREMENT' });
			}}
			onDecrement={() => {
				store.dispatch({ type: 'DECREMENT' });
			}}
		/>,
		document.getElementById('root')
	);
};

const store = createStore(counter);

store.subscribe(render);

// inital trigger subscribe() to display UI
store.dispatch({});
