export const createNote = note => {
  return {
    type: "CREATE_NOTE",
    payload: note
  };
};

export const updateNote = newnote => ({
  type: "UPDATE_NOTE",
  payload: newnote
});

export const deleteNote = id => {
  return {
    type: "DELETE_NOTE",
    payload: id
  };
};
