import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Button from '../../components/Button/Button';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        text: "test",
        customClass: "testName"
    }

    const enzymeWrapper = shallow(<Button  text={props.text} customClass={props.customClass} />)

    return {
        props,
        enzymeWrapper
      }
}


describe('Button', () =>(
    it('should render self',() => {
        const {enzymeWrapper, props} = setup();
        expect(enzymeWrapper.find('button').hasClass(props.customClass)).toBe(true);
        expect(enzymeWrapper.find('button').text()).toBe(props.text);
    })
))
