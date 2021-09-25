import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from "../utils/list_helper.js";
import { blogs } from "./test_data.js";

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [blogs[1]];

  test("when list has only one blog equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("calculates total likes", () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("finds blog with most likes", () => {
  const mostLikedPost = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  };
  test("finds blog with most likes", () => {
    const result = favoriteBlog(blogs);
    expect(result).toEqual(mostLikedPost);
  });
});

describe("finds author with most posts", () => {
  test("finds author with most posts", () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("finds author with most likes", () => {
  test("finds author with most likes", () => {
    const result = mostLikes(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
