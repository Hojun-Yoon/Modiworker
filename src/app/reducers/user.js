// user object is set server side and is never updated client side but this empty reducer is still needed
const user = (state = {}, action) => {
  switch (action.type) {
    case "ADD_USER": {
      const { name, username, password, userId } = action.payload;
      return {
        ...state,
        [userId]: {
          _id: userId,
          name: name,
          username: username,
          password: password
        }
      };
    }
    case "DELETE_USER": {
      const { _id } = action.payload;
      return {
        ...state,
        _id
      };
    }
    // case "USER_CONFIRM": {
    //   const { username, password } = action.payload;
    //   return {
    //     ...state,
    //     username,
    //     password
    //   };
    // }
    default:
      return state;
  }
};

export default user;
