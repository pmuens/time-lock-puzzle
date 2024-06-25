import { TLP_PATH, LHTLP_PATH } from "../constants";

export default function Index({ setPath }) {
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
    </div>
  );
}
