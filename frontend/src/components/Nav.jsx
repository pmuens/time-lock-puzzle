import { ROOT_PATH } from "../constants";

export default function Nav({ setPath }) {
  return (
    <a role="button" onClick={() => setPath(ROOT_PATH)}>
      Go Back
    </a>
  );
}
