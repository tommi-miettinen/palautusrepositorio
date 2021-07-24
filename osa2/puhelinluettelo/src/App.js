import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const ErrorMessage = ({ message }) =>
  message && (
    <div style={{ border: "3px solid red", color: "red" }}>{message}</div>
  );
const Message = ({ message }) =>
  message && (
    <div style={{ border: "3px solid green", color: "green" }}>{message}</div>
  );

const Persons = ({ persons, deletePerson }) =>
  persons.map((person) => {
    return (
      <div key={person.id}>
        <b>{person.name}</b> {person.number}
        <button onClick={() => deletePerson(person)}>poista</button>
      </div>
    );
  });

const Input = ({ name, value, onChange }) => {
  return (
    <div>
      {name}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const Form = ({
  formProps: { addPerson, setNewName, setNewNumber, newName, newNumber },
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <Input name="name" value={newName} onChange={setNewName} />
        <Input name="number" value={newNumber} onChange={setNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  }, [errorMsg]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  const addPerson = async (e) => {
    try {
      e.preventDefault();
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      const existingPerson = persons.filter((p) => p.name === newName)[0];
      if (existingPerson) return editPerson(existingPerson.id, newPerson);
      const result = await personService.create(newPerson);
      setPersons([...persons, result.data]);
      setNewName("");
      setNewNumber("");
      setTimeout();
      setMessage(`${newName} added`);
    } catch (err) {
      setErrorMsg(err.response.data.error);
    }
  };

  const editPerson = async (id, person) => {
    try {
      const confirmed = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        const result = await personService.update(id, person);
        setNewName("");
        setNewNumber("");
        setPersons([...persons.filter((p) => p.id !== id), result.data]);
        setMessage(`${person.name}'s number has been edited`);
      }
    } catch (err) {
      setErrorMsg(`${person.name} not found`);
    }
  };

  const deletePerson = async (person) => {
    try {
      const confirmed = window.confirm(`Delete ${person.name}?`);
      if (confirmed) {
        await personService.deletePerson(person.id);
        setPersons(persons.filter((p) => p.id !== person.id));
        setMessage(`${person.name} has been deleted`);
      }
    } catch (err) {
      setErrorMsg(`${person.name} not found`);
    }
  };

  const fetchPersons = async () => {
    try {
      const result = await personService.getAll();
      setPersons(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <ErrorMessage message={errorMsg} />
      <Message message={message} />
      <h2>Phonebook</h2>
      <Input name="filter shown with" value={filter} onChange={setFilter} />
      <Form
        formProps={{ setNewName, setNewNumber, addPerson, newName, newNumber }}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
