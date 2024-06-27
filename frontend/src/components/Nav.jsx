import { ROOT_PATH } from "../constants";

export default function Nav({ path, setPath }) {
  return (
    <nav>
      <ul>
        {path !== ROOT_PATH && (
          <li>
            <a role="button" onClick={() => setPath(ROOT_PATH)}>
              🏠 Home
            </a>
          </li>
        )}
        <li>
          <a href="https://github.com/pmuens/time-lock-puzzle" target="_blank">
            🧑‍💻 GitHub Repository
          </a>
        </li>
      </ul>
    </nav>
  );
}
