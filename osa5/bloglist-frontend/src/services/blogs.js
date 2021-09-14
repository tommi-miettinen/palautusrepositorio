import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = localStorage.user && JSON.parse(localStorage.user).token;

let config = {
  headers: { authorization: token },
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config.headers.authorization = token;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (data) => {
  console.log(token);
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, create, update, remove, setToken };
