// container for the stream
// responsible for connecting to redux

import React from 'react';
import { connect } from 'react-redux';
import Stream from './presenter';

function mapStateToProps(state) {
    const tracks = state.track;
    return {
        tracks
    }
}

export default connect(mapStateToProps)(Stream);