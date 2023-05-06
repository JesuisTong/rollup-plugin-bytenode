import type { Plugin } from "rollup";
import type { RollupBytenodeOptions } from "../types/index";

import path from "node:path";
import fs from "node:fs";
import { transformAsync } from "@babel/core";
import bytenodeCore from "bytenode";

const DEFAULT_INCLUDES = /[^\.]+(\.jsc)\..+/;

const shouldCompileWithBytenode = (file = "", includes: RegExp) => {
    if (!file) {
        return false;
    }
    return includes.test(file);
};

export default function bytenode(options: RollupBytenodeOptions = {}): Plugin {
    const {
        electron = false,
        compileAsModule = false,
        includes = DEFAULT_INCLUDES,
    } = options;
    return {
        name: "@tongz/rollup-plugin-bytenode",
        async writeBundle(outputOptions, bundles) {
            const { dir = process.cwd() } = outputOptions;
            for (const key of Object.keys(bundles)) {
                const { facadeModuleId, fileName } = bundles[key] as any;
                if (shouldCompileWithBytenode(facadeModuleId, includes)) {
                    const destFilename = path.resolve(dir, fileName);
                    if (fs.existsSync(destFilename)) {
                        // fix bytenode arrow function bug
                        const result = await transformAsync(
                            fs.readFileSync(destFilename).toString(),
                            {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            modules: "commonjs",
                                        },
                                    ],
                                ],
                                plugins: [
                                    "@babel/plugin-transform-arrow-functions",
                                ],
                            }
                        );
                        fs.writeFileSync(destFilename, result!.code!);
                    }

                    await bytenodeCore.compileFile({
                        filename: destFilename,
                        compileAsModule,
                        electron,
                    });
                }
            }
        },
    };
}
