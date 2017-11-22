import React from 'react';
import ReactDOM from 'react-dom';
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
    <div>
        {
            tracks.map((track) => {
                return <div className='track'>{track.title}</div>;
            })
        }
    </div>,
    document.getElementById('root')
);

module.hot.accept(); // ???? what does this do?
registerServiceWorker();
