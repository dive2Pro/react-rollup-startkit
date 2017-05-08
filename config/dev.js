import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-sass';
import image from '../plugins/image';
import globals from 'rollup-plugin-node-globals';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/index.js',
  dest: 'dev/dev.js',
  format: 'iife',
  moduleName: 'Startkit',
  sourceMap: true,
  plugins: [
    image(),
    scss({
      output: './dev/mainstyle.css'
    }),
    eslint({}),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        './node_modules/react/react.js': [
          'cloneElement',
          'createElement',
          'PropTypes',
          'Children',
          'Component'
        ],
        './node_modules/react-dom/index.js': ['render']
      }
    }),
    globals(),
    replace({
      ENV: JSON.stringify('development')
    }),
    resolve({
      browser: true,
      main: true
    })
  ]
};
