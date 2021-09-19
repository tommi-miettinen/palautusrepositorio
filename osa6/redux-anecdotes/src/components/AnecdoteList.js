import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
//prettier-ignore
import { setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  );

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div
          style={{ border: "1px solid black", padding: 20, margin: 1 }}
          key={anecdote.id}
        >
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
