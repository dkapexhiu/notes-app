export const createUser = user => {
    return {
      type: "CREATE_USER",
      payload: user
    };
  };
  
  export const updateUser = newuser => ({
    type: "UPDATE_USER",
    payload: newuser
  });
  
  export const deleteUser = id => {
    return {
      type: "DELETE_USER",
      payload: id
    };
  };
  