// See: https://stackoverflow.com/q/55565444

import { useEffect, useState } from "preact/hooks";

import WasmWorker from "./worker.js?worker";
import { RESULT, CALL_RUN_TLP, CALL_RUN_LHTLP } from "./constants";

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

  function runTLP(message, difficulty) {
    worker.postMessage({
      id: getId(),
      type: CALL_RUN_TLP,
      data: [message, difficulty],
    });

    return id;
  }

  function runLHTLP(message1, message2, difficulty) {
    worker.postMessage({
      id: getId(),
      type: CALL_RUN_LHTLP,
      data: [message1, message2, difficulty],
    });

    return id;
  }

  useEffect(() => {
    worker.addEventListener("message", handleMessage);

    return () => {
      worker.removeEventListener("message", handleMessage);
    };
  }, []);

  return { results, runTLP, runLHTLP };
}
