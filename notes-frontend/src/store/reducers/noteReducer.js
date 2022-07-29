import INITIAL_STATE from "../../components/notesData";

const defaultState = {
  INITIAL_STATE: INITIAL_STATE,
};

export default (state = defaultState.INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "CREATE_NOTE":
      return [...state, payload];
    case "UPDATE_NOTE":
      return payload;
    case "DELETE_NOTE":
      return state.filter(item => item.id !== payload);
    default:
      return state;
  }
};
