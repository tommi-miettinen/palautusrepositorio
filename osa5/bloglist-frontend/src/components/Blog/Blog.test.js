import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  _id: "5a43fde2cbd20b12a2c34e91",
  user: {
    _id: "5a43e6b6c37f3d065eaaa581",
    username: "mluukkai",
    name: "Matti Luukkainen",
  },
  likes: 0,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
};

test("author and title visible, url and likes not visible", () => {
  const component = render(<Blog blog={blog} user={blog.user} />);

  expect(component.container).toHaveTextContent(
    "The Joel Test: 12 Steps to Better Code"
  );
  expect(component.container).toHaveTextContent("Joel Spolsky");
  expect(component.container).not.toHaveTextContent(
    "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
  );
  expect(component.container).not.toHaveTextContent(
    "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
  );
  expect(component.container).not.toHaveTextContent("like");
});

test("blog details shown after view is clicked", () => {
  const component = render(<Blog blog={blog} user={blog.user} />);
  const button = component.getByText("view");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent(
    "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
  );
  expect(component.container).toHaveTextContent("like");
});

test("fetchBlogs is called twice", () => {
  const handleLike = jest.fn();
  const component = render(
    <Blog blog={blog} user={blog.user} handleLike={handleLike} />
  );
  const button = component.getByText("view");
  fireEvent.click(button);
  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(handleLike.mock.calls.length).toBe(2);
});
