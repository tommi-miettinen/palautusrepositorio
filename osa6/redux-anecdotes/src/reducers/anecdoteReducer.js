import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    });
  };
};

export const add = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.post(content);
    dispatch({
      type: "ADD",
      data: anecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return [
        ...state.filter((item) => item.id !== action.data.id),
        action.data,
      ];
    case "ADD":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
