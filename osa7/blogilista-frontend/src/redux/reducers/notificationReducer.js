import store from "../store/store";

const getId = () => (100000 * Math.random()).toFixed(0);

export const setNotification = (notification, error, duration) => {
  const id = getId();
  console.log("test");
  setTimeout(() => {
    store.dispatch(clearNotification(id));
  }, duration * 1000);
  return {
    type: "SET_NOTIFICATION",
    notification,
    error,
    id,
  };
};

export const clearNotification = (id) => {
  return {
    type: "CLEAR_NOTIFICATION",
    id,
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        content: action.notification,
        error: action.error,
        id: action.id,
      };
    case "CLEAR_NOTIFICATION":
      return state.id === action.id ? null : state;
    default:
      return state;
  }
};

export default reducer;
