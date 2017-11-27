import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import Stream from './components/Stream';
import registerServiceWorker from './registerServiceWorker';

const tracks = [
    {
        title: 'track 0'
    },
    {
        title: 'track 1'
    }
];

const store = configureStore;
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
    <Stream tracks={tracks} />,
    document.getElementById('root')
);

module.hot.accept(); // ???? what does this do?
registerServiceWorker();
