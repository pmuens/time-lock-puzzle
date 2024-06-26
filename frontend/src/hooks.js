// See: https://stackoverflow.com/q/55565444

import { useEffect, useState } from "preact/hooks";

import WasmWorker from "./worker.js?worker";
import {
  RESULT,
  GENERATE_TLP,
  SOLVE_TLP,
  GENERATE_LHTLP,
  SOLVE_LHTLP,
} from "./constants";

const worker = new WasmWorker();

export function useWorker() {
  const [id, setId] = useState(0);
  const [results, setResults] = useState({});

  function getId() {
    setId(() => id + 1);
    return id;
  }

  function handleMessage(event) {
    const { type, data, id } = event.data;

    console.log("hook.js - event.data", event.data);

    if (type === RESULT) {
      setResults((results) => ({
        ...results,
        [id]: data,
      }));
    }
  }

  function generateTLP(message, difficulty) {
    worker.postMessage({
      id: getId(),
      type: GENERATE_TLP,
      data: [message, difficulty],
    });

    return id;
  }

  function solveTLP(puzzleJSON) {
    worker.postMessage({
      id: getId(),
      type: SOLVE_TLP,
      data: [puzzleJSON],
    });

    return id;
  }

  function generateLHTLP(message1, message2, difficulty) {
    worker.postMessage({
      id: getId(),
      type: GENERATE_LHTLP,
      data: [message1, message2, difficulty],
    });

    return id;
  }

  function solveLHTLP(puzzleJSON) {
    worker.postMessage({
      id: getId(),
      type: SOLVE_LHTLP,
      data: [puzzleJSON],
    });

    return id;
  }

  useEffect(() => {
    worker.addEventListener("message", handleMessage);

    return () => {
      worker.removeEventListener("message", handleMessage);
    };
  }, []);

  return {
    results,
    generateTLP,
    solveTLP,
    generateLHTLP,
    solveLHTLP,
  };
}
