import { TLP_PATH, LHTLP_PATH } from "../constants";
import { useSharedState } from "../components/SharedState";

export default function Index() {
  const { setPath } = useSharedState();

  return (
    <div>
      <h1>Time-Lock Puzzle Implementations</h1>
      <ul>
        <li>
          <a role="button" onClick={() => setPath(TLP_PATH)}>
            Rivest et al. - Time-Lock Puzzles and Timed-Release Crypto
          </a>
        </li>
        <li>
          <a role="button" onClick={() => setPath(LHTLP_PATH)}>
            Malavolta et al. - Homomorphic Time-Lock Puzzles and Applications
          </a>
        </li>
      </ul>
      <hr />
      <p>
        Time-Lock Puzzles allow one to hide a message in a cryptographic puzzle
        that can only be solved after performing an operation x times.
      </p>
      <p>
        The operation is constructed in a way such that a parallel execution is
        impossible which ensures that the puzzle's difficulty can be reliably
        determined using current advancements in hardware as a baseline.
      </p>
    </div>
  );
}
