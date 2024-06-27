import "./app.css";

import TLP from "./pages/tlp";
import LHTLP from "./pages/lhtlp";
import Index from "./pages/index";
import Nav from "./components/Nav";
import { LHTLP_PATH, TLP_PATH } from "./constants";
import { SharedStateProvider, useSharedState } from "./components/SharedState";

export function App() {
  return (
    <SharedStateProvider>
      <Page />
    </SharedStateProvider>
  );
}

function Page() {
  const { path } = useSharedState();

  let page = <Index />;

  if (path === TLP_PATH) {
    page = <TLP />;
  } else if (path === LHTLP_PATH) {
    page = <LHTLP />;
  }

  return (
    <>
      <Nav />
      <hr />
      {page}
    </>
  );
}
