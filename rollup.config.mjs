import { builtinModules } from "node:module";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json" assert { type: 'json' };

function emitModulePackageFile() {
    return {
        name: "emit-module-package-file",
        generateBundle() {
            this.emitFile({
                type: "asset",
                fileName: "package.json",
                source: `{"type":"module"}`,
            });
        },
    };
}

export default {
    input: "src/index.ts",
    external: Object.keys(pkg.dependencies || {})
        .concat(Object.keys(pkg.peerDependencies || {}))
        .concat(builtinModules).concat(['node:module', 'node:path', 'node:fs']),
    strictDeprecations: true,
    output: [
        {
            format: "cjs",
            file: pkg.main,
            exports: "named",
            footer: "module.exports = Object.assign(exports.default, exports);",
            sourcemap: true,
        },
        {
            format: "es",
            file: pkg.module,
            plugins: [emitModulePackageFile()],
            sourcemap: true,
        },
    ],
    plugins: [typescript({ sourceMap: true })],
};
