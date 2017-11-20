import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Counter from './Counter';

function reducer() {
    return {
        count: 42
    };
}

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <Counter/>
    </Provider>
);

render(<App />, document.getElementById('root'));