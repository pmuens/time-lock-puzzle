import { useEffect, useState } from "preact/hooks";

import { useWorker } from "../hooks";

export default function TLP() {
  const [result, setResult] = useState();
  const [message, setMessage] = useState(42);
  const [puzzleJSON, setPuzzleJSON] = useState();
  const [solveCallId, setSolveCallId] = useState();
  const [difficulty, setDifficulty] = useState(100_000);
  const { results, generateTLP, solveTLP } = useWorker();
  const [generateCallId, setGenerateCallId] = useState();
  const [isSolvingPuzzle, setIsSolvingPuzzle] = useState(false);
  const [isGeneratingPuzzle, setIsGeneratingPuzzle] = useState(false);

  function handleSubmitGenerate(e) {
    e.preventDefault();

    setIsGeneratingPuzzle(true);

    const msg = Number(message);
    const diff = Number(difficulty);

    const id = generateTLP(msg, diff);

    setGenerateCallId(id);
  }

  function handleSubmitSolve(e) {
    e.preventDefault();

    if (!puzzleJSON) {
      throw new Error("Can't solve puzzle without puzzle parameters.");
    }

    setIsSolvingPuzzle(true);

    const id = solveTLP(puzzleJSON);

    setSolveCallId(id);
  }

  useEffect(() => {
    if (results[generateCallId]) {
      setPuzzleJSON(results[generateCallId]);
      setIsGeneratingPuzzle(false);
    }
    if (results[solveCallId]) {
      setResult(results[solveCallId]);
      setIsSolvingPuzzle(false);
    }
  }, [generateCallId, solveCallId, results]);

  return (
    <div>
      <h1>Time-Lock Puzzle</h1>
      <p>
        Implementation of{" "}
        <a
          href="https://people.eecs.berkeley.edu/~daw/papers/timelock.pdf"
          target="_blank"
        >
          Rivest et al. - Time-Lock Puzzles and Timed-Release Crypto
        </a>{" "}
        (Section 2.1 and 2.2)
      </p>
      <hr />
      <form onSubmit={handleSubmitGenerate}>
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
        <button type="submit" name="generate" disabled={isGeneratingPuzzle}>
          {isGeneratingPuzzle ? "Generating Puzzle..." : "Generate Puzzle"}
        </button>
      </form>
      <hr />
      <form onSubmit={handleSubmitSolve}>
        <textarea
          rows="15"
          placeholder="Paste puzzle parameters here (or generate a new puzzle above)."
          value={puzzleJSON}
          onChange={(e) => setPuzzleJSON(e.target.value)}
        ></textarea>
        <button
          type="submit"
          name="solve"
          disabled={isSolvingPuzzle || !puzzleJSON}
        >
          {isSolvingPuzzle ? "Solving Puzzle..." : "Solve Puzzle"}
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
