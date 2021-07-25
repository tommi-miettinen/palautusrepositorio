import express from "express";
import cors from "cors";
import errorHandler from "./errorHandler.js";
import connectToDb from "./db.js";
import * as BlogsController from "./controllers/Blogs.js";

const app = express();
connectToDb();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/api/blogs", BlogsController.findAll);
app.post("/api/blogs", BlogsController.create);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
