import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConcertPage from '../../components/pages/ConcertPage/ConcertPage';
import ConcertList from '../../components/components/ConcertList/ConcertList';

Enzyme.configure({ adapter: new Adapter() });


function setup() {
    const props = {
        concerts: {
            concertsData: {
                fetched: true
            }
        }
    }

    const enzymeWrapper = shallow(<ConcertPage {...props}/>)

    return {
        props,
        enzymeWrapper
      }
}

describe('ConcertPage', () =>{
    it('should render self and subcomponents',() => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper.find(ConcertList)).toBeDefined();
    })
});