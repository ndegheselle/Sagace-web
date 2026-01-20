import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.json'
  }
});