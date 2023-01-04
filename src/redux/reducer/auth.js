import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: '',
  token: '',
  wallet: '',
  login: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_WALLET:
      return {
        ...state,
        wallet: action.wallet,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SET_LOGIN:
      return {
        ...state,
        login: action.login,
      };
    default:
      return state;
  }
};

export default reducer;
