import store from "../store";
import { getId } from "./anecdoteReducer";

export const setNotification = (content, timeout) => {
  const notificationId = getId();
  setTimeout(() => {
    store.dispatch(clearNotification(notificationId));
  }, timeout * 1000);
  return {
    type: "SET_NOTIFICATION",
    content,
    id: notificationId,
  };
};

export const clearNotification = (id) => {
  return {
    type: "CLEAR_NOTIFICATION",
    id,
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, content: action.content, id: action.id };
    case "CLEAR_NOTIFICATION":
      return state.id === action.id ? {} : state;
    default:
      return state;
  }
};

export default reducer;
