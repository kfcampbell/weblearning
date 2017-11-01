import React, { Component } from 'react';
import HelloWorld from './HelloWorld';
import './HelloWorldList.css';

class HelloWorldList extends Component {
    constructor(props) {
        super(props);
        this.state = { greetings: ['Harry', 'Hermoine', 'Draco'] };
    }

    render() {
        return (
            <div className="HelloWorldList">
                {this.renderGreetings()}
            </div>
        );
    }

    renderGreetings() {
        return this.state.greetings.map(name => (
            <HelloWorld key={name} name={name}/>
        ));
    }
}

export default HelloWorldList;