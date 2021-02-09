const covidDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default covidDataReducer;
