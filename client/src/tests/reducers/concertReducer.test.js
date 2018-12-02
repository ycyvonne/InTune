import ConcertReducer from '../../reducers/concert';

describe('concert reducer', () => {
    it('should handle empty state', () => {
        expect(ConcertReducer(undefined, {})).toEqual({})
    })

    it('should handle GET_CONCERTS', () => {
        expect(ConcertReducer({}, {
            type: 'GET_CONCERTS',
            concerts: {
                error: null
            }
        })
        ).toEqual({
            concertsData:{
                error:null,
                fetched: true
            }
        })
    })

    it('should handle GET_CONCERTS error', ()=> {
        expect(ConcertReducer({},{
            type: 'GET_CONCERTS',
            concerts: {
                error: 'ERROR'
            }
        })
        ).toEqual({
            concertsData: {}
        })
    })
});