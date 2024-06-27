import { useEffect, useState } from "preact/hooks";

import { useWorker } from "../hooks";

export default function LHTLP() {
  const [result, setResult] = useState();
  const [message1, setMessage1] = useState(42);
  const [message2, setMessage2] = useState(24);
  const [puzzleJSON, setPuzzleJSON] = useState();
  const [solveCallId, setSolveCallId] = useState();
  const [difficulty, setDifficulty] = useState(100_000);
  const [generateCallId, setGenerateCallId] = useState();
  const { results, generateLHTLP, solveLHTLP } = useWorker();
  const [isSolvingPuzzle, setIsSolvingPuzzle] = useState(false);
  const [isGeneratingPuzzle, setIsGeneratingPuzzle] = useState(false);

  function handleSubmitGenerate(e) {
    e.preventDefault();

    setIsGeneratingPuzzle(true);

    const msg1 = Number(message1);
    const msg2 = Number(message2);
    const diff = Number(difficulty);

    const id = generateLHTLP(msg1, msg2, diff);

    setGenerateCallId(id);
  }

  function handleSubmitSolve(e) {
    e.preventDefault();

    if (!puzzleJSON) {
      throw new Error("Can't solve puzzle without puzzle parameters.");
    }

    setIsSolvingPuzzle(true);

    const id = solveLHTLP(puzzleJSON);

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
      <h1>Linearly Homomorphic Time-Lock Puzzle</h1>
      <p>
        Implementation of{" "}
        <a href="https://eprint.iacr.org/2019/635.pdf" target="_blank">
          Malavolta et al. - Homomorphic Time-Lock Puzzles and Applications
        </a>{" "}
        (Section 4.1)
      </p>
      <hr />
      <form onSubmit={handleSubmitGenerate}>
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
