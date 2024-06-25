import { useState } from "preact/hooks";

import "./app.css";

import TLP from "./pages/tlp";
import LHTLP from "./pages/lhtlp";
import Index from "./pages/index";
import { LHTLP_PATH, TLP_PATH } from "./constants";

export function App() {
  const [path, setPath] = useState();

  if (path === TLP_PATH) {
    return <TLP setPath={setPath} />;
  } else if (path === LHTLP_PATH) {
    return <LHTLP setPath={setPath} />;
  }

  return <Index setPath={setPath} />;
}
