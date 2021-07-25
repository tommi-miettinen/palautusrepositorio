export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.forEach((blog) => (totalLikes = blog.likes + totalLikes));
  return totalLikes;
};

export const favoriteBlog = (blogs) => {
  let mostLikes = 0;
  blogs.forEach((blog) => blog.likes > mostLikes && (mostLikes = blog.likes));
  return blogs.find((blog) => blog.likes === mostLikes);
};

export const mostBlogs = (blogs) => {
  const count = {};
  //prettier-ignore
  blogs.forEach((blog) => count[blog.author] ? count[blog.author]++ : (count[blog.author] = 1));
  //prettier-ignore
  const authorWithMostBlogs = Object.entries(count).sort((a, b) => a[1] - b[1]).pop();
  return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
};

export const mostLikes = (blogs) => {
  const likes = {};
  //prettier-ignore
  blogs.forEach((blog) => likes[blog.author] ? (likes[blog.author] += blog.likes) : (likes[blog.author] = blog.likes));
  //prettier-ignore
  const mostLikedAuthor = Object.entries(likes).sort((a, b) => a[1] - b[1]).pop();
  return { author: mostLikedAuthor[0], likes: mostLikedAuthor[1] };
};
