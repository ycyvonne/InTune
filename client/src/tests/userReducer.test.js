import UserReducer from '../reducers/user';

describe('user reducer', () => {
    it('should handle empty state', () => {
        expect(UserReducer(undefined, {})).toEqual({})
    })

    it('should handle AUTHORIZE', () =>{
        expect(UserReducer({},{
            type: 'AUTHORIZE',
            authorize:{
                error:null
            }
        })
        ).toEqual({
            spotifyData: {
                error: null,
                fetched: true
            }
        })
    })

    it ('should handle AUTHORIZE error', ()=>{
        expect(UserReducer({},{
            type:'AUTHORIZE',
            authorize:{
                error: 'ERROR'
            }
        })
        ).toEqual({
            spotifyData:{}
        })
    })
});