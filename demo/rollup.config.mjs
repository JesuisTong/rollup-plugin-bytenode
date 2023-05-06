import path from "node:path";
import url from "node:url";
import bytenode from "../dist/esm/index.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    input: {
        jsc: path.resolve(__dirname, "index.jsc.js"),
        nojsc: path.resolve(__dirname, "index.js"),
    },
    output: {
        format: "es",
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: "demo-[name].js",
    },
    plugins: [bytenode({ compileAsModule: true })],
};
