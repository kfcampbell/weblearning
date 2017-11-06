import React from 'react';
import Enzyme from 'enzyme';
import { configure, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import HelloWorld from './HelloWorld';

describe(HelloWorld, () => {
    // setup
    Enzyme.configure({ adapter: new Adapter() });

    const name = 'Abraham Lincoln';
    const mockRemoveGreeting = jest.fn();
    const component = shallow(
        <HelloWorld name={name} removeGreeting={mockRemoveGreeting}/>
    );

    // generic snapshot test (broken)
    it('renders and matches our snapshot', () => {
        const component = renderer.create(
            <HelloWorld name="Abraham Lincoln" />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // shallow render content test
    it('contains the supplied name', () => {
        expect(component.text()).toContain(name);
    });

    // interaction tests
    it('modifies the greeting when frenchify button is clicked', () => {
        component.find('button.frenchify').simulate('click');
        expect(component.text()).toContain('Bonjour');
    });

    it('calls the passed in removeGreeting function when remove button is clicked', () => {
        component.find('button.remove').simulate('click');
        expect(mockRemoveGreeting).toBeCalled();
    });

});