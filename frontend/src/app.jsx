import { useState } from "preact/hooks";

import "./app.css";

import TLP from "./pages/tlp";
import LHTLP from "./pages/lhtlp";
import Index from "./pages/index";
import { LHTLP_PATH, ROOT_PATH, TLP_PATH } from "./constants";

export function App() {
  const [path, setPath] = useState(ROOT_PATH);

  if (path === TLP_PATH) {
    return <TLP path={path} setPath={setPath} />;
  } else if (path === LHTLP_PATH) {
    return <LHTLP path={path} setPath={setPath} />;
  }

  return <Index path={path} setPath={setPath} />;
}
