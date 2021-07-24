import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./errorHandler.js";
import connectToDb from "./db.js";
import Person from "./models/Person.js";

const app = express();
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] - :req[content-length] :body "
  )
);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
  } catch (err) {
    next(err);
  }
});

app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, number } = req.body;
    //prettier-ignore
    if (!name || !number) return res.status(400).send({ error: "No number or name" });
    const existingPerson = await Person.findOne({ name });
    //prettier-ignore
    if (existingPerson) return res.status(400).send({ error: "Name must be unique" });
    const person = new Person({ name, number });
    const result = await person.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) res.sendStatus(404);
    res.send(person);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const result = await Person.deleteOne({ _id: req.params.id });
    console.log(result);
    if (result.deletedCount === 1) return res.send("deleted");
    res.send(404);
  } catch (err) {
    next(err);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(person, "find");
    res.send(person);
  } catch (err) {
    next(err);
  }
});

app.get("/api/info", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.send(`
<p>phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>`);
  } catch (err) {
    next(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
