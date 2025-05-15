import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  bundle: true,           // 💥 This is critical!
  splitting: false,
  outDir: 'dist',
  target: 'node18',
  clean: true,
});
