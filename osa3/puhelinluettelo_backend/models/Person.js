import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
