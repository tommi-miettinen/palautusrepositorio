import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = `mongodb+srv://Tommi:${process.env.DB_PASSWORD}@database.7tqi7.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

const connectToDb = () =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

export default connectToDb;
