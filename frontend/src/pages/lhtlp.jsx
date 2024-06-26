import { useEffect, useState } from "preact/hooks";

import Nav from "../components/Nav";
import { useWorker } from "../hooks";

export default function LHTLP({ setPath }) {
  const [callId, setCallId] = useState();
  const [result, setResult] = useState();
  const { results, runLHTLP } = useWorker();
  const [message1, setMessage1] = useState(42);
  const [message2, setMessage2] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(100_000);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const msg1 = Number(message1);
    const msg2 = Number(message2);
    const diff = Number(difficulty);

    const id = runLHTLP(msg1, msg2, diff);

    setCallId(id);
  }

  useEffect(() => {
    if (results[callId]) {
      setIsLoading(false);
      setResult(results[callId]);
    }
  }, [callId, results]);

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
        <button type="submit" name="solve" disabled={isLoading}>
          {isLoading ? "Solving Puzzle..." : "Generate and Solve"}
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
