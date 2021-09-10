import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import supertest from "supertest";
import app from "../index.js";

const api = supertest(app);
const initialBlogs = [
  {
    title: "blogi1",
    author: "tommi",
    url: "eioo",
  },
  {
    title: "blogi2",
    author: "tommi",
    url: "eioo",
  },
];

let user;
let token;

beforeAll(async () => {
  const newUser = new User({
    username: "test",
    name: "test",
    passwordHash: "123",
  });
  user = await newUser.save();
  token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.SECRET
  );
  initialBlogs[0].user = user.id;
  initialBlogs[1].user = user.id;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  const result = await api
    .get("/api/blogs")
    .set("Authorization", token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(result.body.length).toBe(2);
});

test("blog has property id", async () => {
  const res = await api.get("/api/blogs").set("Authorization", token);
  const blog = res.body[0];
  expect(blog).toHaveProperty("id");
});

test("blogs are added properly", async () => {
  const blogsBefore = await api.get("/api/blogs");
  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send({ title: "test", author: "test", url: "test", likes: 0 });
  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body.length).toBeGreaterThan(blogsBefore.body.length);
});

test("if blog has no value for likes it is set to zero", async () => {
  const res = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send({ title: "test", author: "test", url: "test" });
  const blog = res.body;
  expect(blog.likes).toEqual(0);
});

test("if blog has no title and url respond with 400 Bad request", async () => {
  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send({ author: "test" })
    .expect(400);
});

test("deletes blog", async () => {
  const res = await api.get("/api/blogs");
  const blog = res.body[0];
  await api
    .delete(`/api/blogs/${blog.id}`)
    .set("Authorization", token)
    .expect(200);
});

test("updates blog", async () => {
  const res = await api.get("/api/blogs");
  const blog = res.body[0];
  const res2 = await api
    .patch(`/api/blogs/${blog.id}`)
    .set("Authorization", token)
    .send({ likes: 2 });
  expect(res2.body.likes).toBe(2);
});

afterAll(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  mongoose.connection.close();
});
