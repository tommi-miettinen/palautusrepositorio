import React, { useState } from "react";

const StatisticLine = ({ text, stat }) => (
  <tr>
    <th>{text}</th>
    <td>{stat}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  return (
    <div>
      <h1>statistics</h1>
      {stats.all ? (
        <table>
          <tbody>
            <StatisticLine text="good" stat={stats.good} />
            <StatisticLine text="neutral" stat={stats.neutral} />
            <StatisticLine text="bad" stat={stats.bad} />
            <StatisticLine text="all" stat={stats.all} />
            <StatisticLine text="average" stat={stats.avg} />
            <StatisticLine text="positive" stat={stats.positive} />
          </tbody>
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = (good * 1 + neutral * 0 + bad * -1) / all || 0;
  const positive = good / all || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics stats={{ good, neutral, bad, all, avg, positive }} />
    </div>
  );
};

export default App;
