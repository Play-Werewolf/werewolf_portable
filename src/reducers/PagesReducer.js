const initialState = {
  page: "dev",
};

const PagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default PagesReducer;
