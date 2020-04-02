import { terser } from "rollup-plugin-terser";
// doc : https://github.com/rollup/rollup-plugin-babel
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      entryFileNames: "bundle.js",
      dir: "dist",
      format: "cjs"
    },
    {
      entryFileNames: "bundle.min.js",
      dir: "dist",
      format: "cjs",
      name: "version",
      plugins: [terser()]
    }
  ],
  external: ["express"],
  watch: { include: "src/**" },
  plugins: [
    babel({
      include: "src/**"
    })
  ]
};
