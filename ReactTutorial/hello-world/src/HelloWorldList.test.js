import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import HelloWorldList from './HelloWorldList';
import AddGreeter from './AddGreeter';
import HelloWorld from './HelloWorld';

describe(HelloWorldList, () => {
    Enzyme.configure({ adapter: new Adapter() });
    const component = shallow(
        <HelloWorldList />
    );

    it('renders and matches our snapshot', () => {
        const component = renderer.create(
            <HelloWorldList />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains an AddGreeter subcomponent', () => {
        expect(component.find((AddGreeter))).toHaveLength(1);
    });

    it('contains the same number of HelloWorld components as greetings', () => {
        const helloWorlds = component.find(HelloWorld).length;
        const greetings = component.state('greetings').length;
        expect(helloWorlds).toEqual(greetings);
    });

    // broken for some reason
    it('adds another greeting when the add greeting function is called', () => {
        const before = component.find(HelloWorld).length;
        component.instance().addGreeting('Sample');
        const after = component.find(HelloWorld).length;
        expect(after).toBeGreaterThan(before);
    });

    it('removes a greeting from the list when the remove greeting function is called', () => {
        const before = component.find(HelloWorld).length;
        const removeMe = component.state('greetings')[0];
        component.instance().removeGreeting(removeMe);
        const after = component.find(HelloWorld).length;
        expect(after).toBeLessThan(before);
    });
});