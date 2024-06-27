// See: https://www.sitepen.com/blog/using-webassembly-with-web-workers
// See: https://blog.boot.dev/golang/running-go-in-the-browser-wasm-web-workers
// See: https://paweljw.al/blog/2023/05/integrating-go-with-javascript-through-webassembly-and-web-workers

import wasmURL from "./assets/main.wasm";
import * as _ from "./assets/wasm_exec.js?inline";
import {
  RESULT,
  GENERATE_TLP,
  SOLVE_TLP,
  GENERATE_LHTLP,
  SOLVE_LHTLP,
} from "./constants";

if (!WebAssembly.instantiateStreaming) {
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    return await WebAssembly.instantiate(source, importObject);
  };
}

const go = new Go();

WebAssembly.instantiateStreaming(fetch(wasmURL), go.importObject).then(
  (result) => {
    self.postMessage({
      type: "INITIALIZED",
    });

    go.run(result.instance);
  }
);

self.addEventListener(
  "message",
  (event) => {
    const { type, data, id } = event.data;

    console.log("worker.js - event.data", event.data);

    if (type === GENERATE_TLP) {
      const result = self.generateTLP(...data);

      self.postMessage({
        id,
        type: RESULT,
        data: result,
      });
    } else if (type === SOLVE_TLP) {
      const result = self.solveTLP(...data);

      self.postMessage({
        id,
        type: RESULT,
        data: result,
      });
    } else if (type === GENERATE_LHTLP) {
      const result = self.generateLHTLP(...data);

      self.postMessage({
        id,
        type: RESULT,
        data: result,
      });
    } else if (type === SOLVE_LHTLP) {
      const result = self.solveLHTLP(...data);

      self.postMessage({
        id,
        type: RESULT,
        data: result,
      });
    }
  },
  false
);
