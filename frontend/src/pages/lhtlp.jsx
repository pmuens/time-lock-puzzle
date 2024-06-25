import { useState } from "preact/hooks";

import Nav from "../components/Nav";

export default function LHTLP({ setPath }) {
  const [result, setResult] = useState();
  const [message1, setMessage1] = useState(42);
  const [message2, setMessage2] = useState(24);
  const [difficulty, setDifficulty] = useState(2);

  function handleSubmit(e) {
    e.preventDefault();

    const msg1 = Number(message1);
    const msg2 = Number(message2);
    const diff = Number(difficulty);

    const res = window.runLHTLP(msg1, msg2, diff);

    setResult(res);
  }

  return (
    <div>
      <Nav setPath={setPath} />
      <hr />
      <h1>Linearly Homomorphic Time-Lock Puzzle</h1>
      <p>
        <a href="https://github.com/pmuens/time-lock-puzzle" target="_blank">
          Implementation
        </a>{" "}
        of{" "}
        <a href="https://eprint.iacr.org/2019/635.pdf" target="_blank">
          Malavolta et al. - Homomorphic Time-Lock Puzzles and Applications
        </a>
        .
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <label for="message">Message #1</label>
        <input
          id="message1"
          name="message1"
          type="number"
          min="1"
          placeholder="Message"
          value={message1}
          onChange={(e) => setMessage1(e.target.value)}
        />
        <label for="message">Message #2</label>
        <input
          id="message2"
          name="message2"
          type="number"
          min="1"
          placeholder="Message"
          value={message2}
          onChange={(e) => setMessage2(e.target.value)}
        />
        <label for="difficulty">Difficulty</label>
        <input
          id="difficulty"
          name="difficulty"
          type="number"
          min="1"
          placeholder="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <button type="submit" name="solve">
          Generate and Solve
        </button>
        <hr />
        <input
          disabled
          type="number"
          name="result"
          placeholder="Result"
          value={result}
        />
      </form>
    </div>
  );
}
