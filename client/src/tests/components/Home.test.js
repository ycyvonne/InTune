import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Home from '../../components/pages/HomePage/HomePage';
import SpotfiyLoginBtn from '../../components/components/SpotifyLoginBtn/SpotifyLoginBtn';

Enzyme.configure({ adapter: new Adapter() });


function setup() {
    const props = {
    }

    const enzymeWrapper = shallow(<Home {...props}/>)

    return {
        props,
        enzymeWrapper
      }
}

describe('Home', () =>{
    it('should render self and subcomponents',() => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper.find(SpotfiyLoginBtn)).toBeDefined();
    })
});