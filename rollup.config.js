import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default defineConfig({
  input: "src/main.ts",
  output: [
    {
      banner: "#!/usr/bin/env node",
      name: "zero",
      file: "lib/zero.js",
      format: "commonjs"
    }
  ],
  plugins: [
    json(),
    typescript(),
    nodeResolve({
      preferBuiltins: false
    }),
    commonjs({
      include: "node_modules/**",
      extensions: ['.js', '.ts']
    })
  ],
});
