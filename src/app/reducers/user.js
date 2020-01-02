// user object is set server side and is never updated client side but this empty reducer is still needed
const user = (state = null, action) => {
  switch (action.type) {
    case "ADD_USER": {
      const { name, email, password, userId } = action.payload;
      return {
        ...state,
        [userId]: {
          _id: userId,
          name: name,
          email: email,
          password: password
        }
      };
    }
    default:
      return state;
  }
};

export default user;
