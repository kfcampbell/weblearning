import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
    <Stream tracks={tracks} />,
    document.getElementById('root')
);

module.hot.accept(); // ???? what does this do?
registerServiceWorker();
