import * as api from '../api';
import * as actionCreators from '../actions/actionCreators';
jest.mock('../api');

describe('action creator', () =>(
    it('creates loginUser thunk once api.authorize is done', () =>{
        api.authorize.mockReturnValueOnce(Promise.resolve('test'));
        var test = actionCreators.loginUser("test");
        expect(test).toBeDefined;
    })
));