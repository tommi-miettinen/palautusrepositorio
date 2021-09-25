import userService from "../../services/user";

const initialState = {
  user: null,
  users: [],
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    console.log(users);
    dispatch({
      type: "GET_USERS",
      data: users,
    });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.data };
    case "GET_USERS":
      return { ...state, users: action.data };
    default:
      return state;
  }
};

export default reducer;
