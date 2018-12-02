import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Profile from '../../components/pages/ProfilePage/ProfilePage';
import Header from '../../components/components/Header/Header';

Enzyme.configure({ adapter: new Adapter() });

global.window = { location: { href: 'testurl' } };

function setupValid() {
    const props = {
        user: {
            spotifyData: {
                name: "User",
                fetched: "true"
            }
        }
    }

    const enzymeWrapper = shallow(<Profile user={props.user}/>)

    return {
        props,
        enzymeWrapper
      }
}

function setupInvalid() {
    const props = {
        user: {
            spotifyData: {
                error: "invalid_token"
            }
        }
    }

    const enzymeWrapper = shallow(<Profile user={props.user}/>)

    return {
        props,
        enzymeWrapper
      }
}

describe('Profile', () =>{
    it('should render self and subcomponents',() => {
        const {enzymeWrapper, props} = setupValid();
        expect(enzymeWrapper.find(Header)).toBeDefined();
    })

    it('should not render if it cannot get spotify data', ()=>{
        const{enzymeWrapper} = setupInvalid();
        expect(enzymeWrapper.isEmptyRender()).toBe(true);
    })
});
