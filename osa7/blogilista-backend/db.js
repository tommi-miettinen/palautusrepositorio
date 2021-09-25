import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_TEST_URL = `mongodb+srv://Tommi:${process.env.DB_PASSWORD}@database.7tqi7.mongodb.net/blogilista-test?retryWrites=true&w=majority`;
const MONGODB_URL = `mongodb+srv://Tommi:${process.env.DB_PASSWORD}@database.7tqi7.mongodb.net/blogilista?retryWrites=true&w=majority`;
const url = process.env.NODE_ENV === "test" ? MONGODB_TEST_URL : MONGODB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
