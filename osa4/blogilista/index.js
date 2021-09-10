import express from "express";
import expressAsyncErrors from "express-async-errors";
import cors from "cors";
import tokenExtractor from "./middlewares/tokenExtractor.js";
import errorHandler from "./middlewares/errorHandler.js";
import userExtractor from "./middlewares/userExtractor.js";
import * as db from "./db.js";
import * as Blogs from "./controllers/Blogs.js";
import * as Users from "./controllers/Users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.post("/api/login", Users.login);
app.post("/api/users", Users.create);
app.get("/api/users", Users.findAll);
app.get("/api/blogs", Blogs.getAll);
app.delete("/api/blogs/:id", userExtractor, Blogs.remove);
app.patch("/api/blogs/:id", userExtractor, Blogs.updateOne);
app.post("/api/blogs", userExtractor, Blogs.create);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
