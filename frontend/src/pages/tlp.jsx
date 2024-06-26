import { useEffect, useState } from "preact/hooks";

import Nav from "../components/Nav";
import { useWorker } from "../hooks";

export default function TLP({ setPath }) {
  const [callId, setCallId] = useState();
  const [result, setResult] = useState();
  const { results, runTLP } = useWorker();
  const [message, setMessage] = useState(42);
  const [difficulty, setDifficulty] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const msg = Number(message);
    const diff = Number(difficulty);

    const id = runTLP(msg, diff);

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
      <h1>Time-Lock Puzzle</h1>
      <p>
        <a href="https://github.com/pmuens/time-lock-puzzle" target="_blank">
          Implementation
        </a>{" "}
        of{" "}
        <a
          href="https://people.eecs.berkeley.edu/~daw/papers/timelock.pdf"
          target="_blank"
        >
          Rivest et al. - Time-Lock Puzzles and Timed-Release Crypto
        </a>
        .
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <label for="message">Message</label>
        <input
          id="message"
          name="message"
          type="number"
          min="1"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
