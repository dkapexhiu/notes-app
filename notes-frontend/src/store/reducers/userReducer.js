import INITIAL_STATE from "../../components/usersData";

const defaultState = {
  INITIAL_STATE: INITIAL_STATE,
};

export default (state = defaultState.INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "CREATE_USER":
      return [...state, payload];
    case "UPDATE_USER":
      return payload;
    case "DELETE_USER":
      return state.filter(item => item.id !== payload);
    default:
      return state;
  }
};
