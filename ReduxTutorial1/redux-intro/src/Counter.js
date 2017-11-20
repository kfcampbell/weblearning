import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
    state = { count: 0 }

    increment = () => {
    }

    decrement = () => {
    }

    render() {
        return (
            <div>
                <h2>Counter</h2>
                <div>
                    <button onClick={this.decrement}>-</button>
                    <span>{this.props.count}</span>
                    <button onClick={this.increment}>+</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

// connect returns a function, which is why this syntax looks weird.
export default connect(mapStateToProps)(Counter)