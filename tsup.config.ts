// tsup.config.ts
import { defineConfig } from 'tsup'

const commonConfig = {
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: [ 'date-fns', 'uuid' ],
}

export default defineConfig([
  // Generate base types in dist root
  {
    ...commonConfig,
    entry: {
      'index': 'src/index-node.ts'
    },
    format: ['esm'],
    dts: {
      only: true
    },
    outDir: 'dist',
  },
  // Browser build
  {
    ...commonConfig,
    entry: {
      'index': 'src/index-browser.ts'
    },
    format: ['cjs', 'esm'],
    outDir: 'dist/browser',
    target: ['es2018'],
    esbuildOptions(options) {
      options.conditions = ['browser']
    },
    external: ['fs'],
  },
  // NodeJS build
  {
    ...commonConfig,
    entry: {
      'index': 'src/index-node.ts'
    },
    format: ['cjs', 'esm'],
    outDir: 'dist/node',
    target: ['node16'],
    esbuildOptions(options) {
      options.conditions = ['node']
    },
  }
])