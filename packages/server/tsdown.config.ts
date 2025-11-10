import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/**/*.ts',
  outDir: 'dist',
  format: 'esm',
  clean: true,
  dts: {
    tsgo: true,
    sourcemap: true,
  },
  sourcemap: true,
  fixedExtension: false,
});
