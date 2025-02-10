import { decompressSync } from "fflate";

if (typeof DecompressionStream === "undefined") {
  globalThis.DecompressionStream = class {
    constructor() {
      throw new Error("DecompressionStream is not supported in Safari.");
    }
  };
}
