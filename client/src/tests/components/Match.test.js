import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import MatchPage from '../../components/pages/MatchPage/MatchPage';
import MatchList from '../../components/components/MatchList/MatchList';

Enzyme.configure({ adapter: new Adapter() });


function setup() {
    const props = {
        user: {
            matchesData: {

            }
        },
        getMatches: () => {}
    }

    const enzymeWrapper = shallow(<MatchPage {...props}/>)

    return {
        props,
        enzymeWrapper
      }
}

function badSetup() {
    const props = {
        user: {
        },
        getMatches: () => {}
    }

    const enzymeWrapper = shallow(<MatchPage {...props}/>)

    return {
        props,
        enzymeWrapper
      }
}



describe('Match Page', () =>{
    it('should render self and subcomponents',() => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper.find(MatchList)).toBeDefined();
    })

    it('should not render if no match data', () => {
        const {enzymeWrapper} = badSetup();
        expect(enzymeWrapper.isEmptyRender()).toBe(true);
    })
});