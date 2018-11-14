function ConcertReducer(state = {}, action) {
  switch (action.type) {
    case "GET_CONCERTS":
      var concertsData = {};
      if (!action.concerts.error) {
        concertsData = Object.assign({}, action.concerts, {
          fetched: true
        });
      }
      return Object.assign({}, state, {
        concertsData: concertsData
      });
    default:
      return state;
  }
}

export default ConcertReducer;
