import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
//prettier-ignore
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const addAnecdote = async () => {
    const newAnecdote = { content, votes: 0 };
    dispatch(add(newAnecdote));
    dispatch(setNotification(`${newAnecdote.content} added`, 5));
    setContent("");
  };

  return (
    <div style={{ padding: 10, margin: "10px 0px", border: "1px solid black" }}>
      <h2>create new</h2>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={addAnecdote}>create</button>
    </div>
  );
};

export default AnecdoteForm;
