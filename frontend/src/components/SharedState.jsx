// See: https://kentcdodds.com/blog/application-state-management-with-react

import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

import { ROOT_PATH } from "../constants";

const SharedStateContext = createContext();

export function useSharedState() {
  const context = useContext(SharedStateContext);

  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }

  return context;
}

export function SharedStateProvider(props) {
  const { children } = props;
  const [path, setPath] = useState(ROOT_PATH);

  return (
    <SharedStateContext.Provider
      value={{
        path,
        setPath,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}
