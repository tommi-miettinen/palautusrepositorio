import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
  filter: filterReducer,
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
