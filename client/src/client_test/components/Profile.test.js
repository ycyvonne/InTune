import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Profile from '../../components/Profile/Profile';
import Header from '../../components/Header/Header';

Enzyme.configure({ adapter: new Adapter() });

function setupValid() {
    const props = {
        user: {
            spotifyData: {
                display_name: "User",
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

describe('Profile', () =>(
    it('should render self and subcomponents',() => {
        const {enzymeWrapper, props} = setupValid();
        expect(enzymeWrapper.find(Header)).toBeDefined();
    })
))
