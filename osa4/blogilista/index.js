import express from "express";
import expressAsyncErrors from "express-async-errors";
import cors from "cors";
import errorHandler from "./errorHandler.js";
import * as db from "./db.js";
import * as Blogs from "./controllers/Blogs.js";
import * as Users from "./controllers/Users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", Users.create);
app.get("/api/users", Users.findAll);
app.get("/api/blogs", Blogs.findAll);
app.delete("/api/blogs/:id", Blogs.deleteOne);
app.patch("/api/blogs/:id", Blogs.updateOne);
app.post("/api/blogs", Blogs.create);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
