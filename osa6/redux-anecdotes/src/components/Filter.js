import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const style = {
    margin: "10px 0px",
    padding: 20,
    border: "1px solid black",
  };

  return (
    <div style={style}>
      <b>Filter</b> <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
