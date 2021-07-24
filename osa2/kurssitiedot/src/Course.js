import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ total }) => (
  <p>
    <b>Total of {total} exercises</b>
  </p>
);

const Course = ({ course }) => {
  //prettier-ignore
  const total = course.parts.reduce((a, { exercises }) => a + exercises,0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
