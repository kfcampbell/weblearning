import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
    state = { count: 0 }

    increment = () => {
        this.props.dispatch({ type: 'INCREMENT' });
    }

    decrement = () => {
        this.props.dispatch({ type: 'DECREMENT' });
    }

    reset = () => {
        this.props.dispatch({ type: 'RESET' });
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
                <button onClick={this.reset}>Reset to zero</button>
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