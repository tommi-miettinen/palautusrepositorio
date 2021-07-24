import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name}:{part.exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ numberOfExercises }) => (
  <p>
    Number of exercises:
    {numberOfExercises}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  //prettier-ignore
  const numberOfExercises = course.parts.reduce((a, { exercises }) => a + exercises,0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total numberOfExercises={numberOfExercises} />
    </div>
  );
};

export default App;
