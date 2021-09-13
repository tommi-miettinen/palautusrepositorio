import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

let blog;
const handlePost = (data) => {
  blog = data;
};

test("handlePost is called with correct values", () => {
  const component = render(<BlogForm handlePost={handlePost} />);
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const button = component.getByText("create");
  fireEvent.change(title, {
    target: { value: "title" },
  });
  fireEvent.change(author, {
    target: { value: "author" },
  });
  fireEvent.change(url, {
    target: { value: "url" },
  });
  fireEvent.click(button);
  expect(blog.title).toBe("title");
  expect(blog.author).toBe("author");
  expect(blog.url).toBe("url");
});
