const currentUserId = (state = null, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return action.payload.userId;
    }
    default:
      return state;
  }
};

export default currentUserId;
