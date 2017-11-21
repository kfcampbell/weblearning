import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Counter from './Counter';

// common to keep initalState in a variable
const initialState = {
    count: 0
};

// first time this is run, state will be undefined.
// use initialState then.
function reducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}

const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
    <Provider store={store}>
        <Counter />
    </Provider>
);

render(<App />, document.getElementById('root'));