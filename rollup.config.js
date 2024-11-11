import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';
import sass from "rollup-plugin-sass"


const input = 'src/js/aos.js';

export default [
  {
    input,
    output: {
      file: pkg.browser,
      name: 'AOS',
      format: 'umd',
      sourcemap: process.env.NODE_ENV === 'dev'
    },
    plugins: [
      sass({
        output: 'dist/aos.css',
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ]
  },
  {
    input,
    external: Object.keys(pkg.dependencies),
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      sass({
        output: 'dist/aos.css',
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ]
  }
];
