import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript()
    ]
  },
  // browser-friendly UMD build
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            target: 'es5'
          }
        }
      })
    ]
  }
  
];
