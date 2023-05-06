import { createRequire } from "node:module";
import "bytenode";
const require = createRequire(import.meta.url);

console.log(require("../dist/demo-jsc.jsc"));
