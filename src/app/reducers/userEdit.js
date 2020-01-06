const userEdit = (state = {}, action) => {
  switch (action.type) {
    case "USER_EDIT": {
      const { username, name, password } = action.payload;
      return {
        ...state,
        username,
        name,
        password
      };
    }
    default:
      return state;
  }
};

export default userEdit;
