import mongoose from "mongoose";
import Blog from "../models/Blog.js";
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

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(result.body.length).toBe(2);
});

test("blog has property id", async () => {
  const res = await api.get("/api/blogs");
  const blog = res.body[0];
  expect(blog).toHaveProperty("id");
});

test("blogs are added properly", async () => {
  const blogsBefore = await api.get("/api/blogs");
  await api
    .post("/api/blogs")
    .send({ title: "test", author: "test", url: "test", likes: 0 });
  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body.length).toBeGreaterThan(blogsBefore.body.length);
});

test("if blog has no value for likes it is set to zero", async () => {
  const res = await api
    .post("/api/blogs")
    .send({ title: "test", author: "test", url: "test" });
  const blog = res.body;
  expect(blog.likes).toEqual(0);
});

test("if blog has no title and url respond with 400 Bad request", async () => {
  await api.post("/api/blogs").send({ author: "test" }).expect(400);
});

test("deletes blog", async () => {
  const res = await api.get("/api/blogs");
  const blog = res.body[0];
  await api.delete(`/api/blogs/${blog.id}`).expect(200);
});

test("updates blog", async () => {
  const res = await api.get("/api/blogs");
  const blog = res.body[0];
  const res2 = await api.patch(`/api/blogs/${blog.id}`).send({ likes: 2 });
  expect(res2.body.likes).toBe(2);
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
