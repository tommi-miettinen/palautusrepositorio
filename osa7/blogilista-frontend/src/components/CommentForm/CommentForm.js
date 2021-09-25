import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useField } from "../../hooks";
import { addComment } from "../../redux/reducers/blogReducer";

const CommentForm = () => {
  const comment = useField("text");
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const handleComment = () => {
    dispatch(addComment(blog, comment.value));
    comment.reset();
  };

  return (
    <div style={containerStyle}>
      <input {...comment} reset=""></input>
      <button onClick={handleComment}>add comment</button>
    </div>
  );
};

const containerStyle = {
  border: "1px solid black",
  padding: 20,
  margin: "20px 0px",
};

export default CommentForm;
