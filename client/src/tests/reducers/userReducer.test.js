import UserReducer from '../../reducers/user';

describe('user reducer', () => {
    it('should handle empty state', () => {
        expect(UserReducer(undefined, {})).toEqual({})
    })

    it('should handle LOGIN', () =>{
        expect(UserReducer({},{
            type: 'LOGIN',
            user:{
                error:null
            }
        })
        ).toEqual({
            spotifyData: {
                error: null,
                fetched: true
            },
            loggedIn: true
        })
    })

    it ('should handle LOGIN error', ()=>{
        expect(UserReducer({},{
            type:'LOGIN',
            user:{
                error: 'ERROR'
            }
        })
        ).toEqual({
            spotifyData:{},
            loggedIn: true
        })
    })

    it('should handle GET_USER_NAME', ()=> {
        expect(UserReducer({},{
            type: 'GET_USER_NAME',
            name: 'test'
        })
        ).toEqual({
            name: 'test'
        })
    })

    it('should handle GET_LOGGED_IN_USER', ()=>{
        expect(UserReducer({},{
           type: 'GET_LOGGED_IN_USER',
           user:{
               id: 'test'
           } 
        })
        ).toEqual({
            spotifyData:{
                id:'test'
            },
            loggedIn: true
        })
    })

    it('should handle GET_LOGGED_IN_USER but no user', ()=> {
        expect(UserReducer({},{
            type: 'GET_LOGGED_IN_USER',
            user:{}
        })
        ).toEqual({loggedIn: false})
    })

    it('should handle GET_MATCHES', () => {
        expect(UserReducer({},{
            type: 'GET_MATCHES',
            matches: {
                matches: []
            }
        })
        ).toEqual({matchesData: []})
    })

    it('should handle MATCH', () => {
        expect(UserReducer({},{
            type: 'MATCH',
            matchResult: []
        })
        ).toEqual({matchResults: []})
    })

    it('should handle GET_PEOPLE', () => {
        expect(UserReducer({},{
            type: 'GET_PEOPLE',
            people: []
        })
        ).toEqual({peopleData: []})
    })

    it('should handle GET_USER_CONCERTS', () => {
        expect(UserReducer({},{
            type: 'GET_USER_CONCERTS',
            concerts: []
        })
        ).toEqual({concerts: []})
    })
});
