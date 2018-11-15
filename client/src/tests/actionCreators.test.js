import * as api from '../api';
import * as actionCreators from '../actions/actionCreators';
jest.mock('../api');

describe('action creator', () =>(
    it('creates AUTHORIZE thunk once api.authorize is done', () =>{
        api.authorize.mockReturnValueOnce({'test': 'value'});
        var test = actionCreators.authorize("test");
        expect(test).toBeDefined;
    })
));