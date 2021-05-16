import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

// If truthy, it expects all y-* dependencies in the upper directory.
// This is only necessary if you want to test and make changes to several repositories.
const localImports = process.env.LOCALIMPORTS

const customModules = new Set([
  'y-websocket',
  // 'y-codemirror',
  'y-ace',
  'y-textarea',
  'y-dom',
  // 'y-prosemirror'
])
/**
 * @type {Set<any>}
 */
const customLibModules = new Set([
  'lib0',
  'y-protocols'
])

const yaceResolve = {
  resolveId (importee) {
    if (importee === 'y-ace') {
      return `${process.cwd()}/src/y-ace.js`
    }
    return null
  }
}

const debugResolve = {
  resolveId (importee) {
    if (localImports) {
      if (importee === 'yjs/tests/testHelper.js') {
        return `${process.cwd()}/../yjs/tests/testHelper.js`
      }
      if (importee === 'yjs') {
        return `${process.cwd()}/../yjs/src/index.js`
      }
      if (customModules.has(importee.split('/')[0])) {
        return `${process.cwd()}/../${importee}/src/${importee}.js`
      }
      if (customLibModules.has(importee.split('/')[0])) {
        return `${process.cwd()}/../${importee}`
      }
    }
    return null
  }
}

export default [{
  input: './src/y-ace.js',
  output: [{
    name: 'yAce',
    file: 'dist/y-ace.cjs',
    format: 'cjs',
    sourcemap: true,
    paths: path => {
      if (/^lib0\//.test(path)) {
        return `lib0/dist/${path.slice(5, -3)}.cjs`
      }
      if (/^y-protocols\//.test(path)) {
        return `y-protocols/dist/${path.slice(12, -3)}.cjs`
      }
      return path
    }
  }],
  external: id => /^lib0\//.test(id)
}, {
  input: './demo/ace-demo.js',
  output: [{
    name: 'aceDemo',
    file: 'dist/ace-demo.js',
    format: 'iife',
    sourcemap: true
  }],
  plugins: [
    yaceResolve,
    debugResolve,
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}
// , {
//   input: './test/index.js',
//   external: ['isomorphic.js'],
//   output: {
//     name: 'test',
//     file: 'dist/test.cjs',
//     format: 'cjs',
//     sourcemap: true
//   },
//   plugins: [
//     debugResolve,
//     nodeResolve({
//       mainFields: ['module', 'main']
//     }),
//     commonjs()
//   ]
// }, {
//   input: './test/index.js',
//   output: {
//     name: 'test',
//     file: 'dist/test.js',
//     format: 'iife',
//     sourcemap: true
//   },
//   plugins: [
//     debugResolve,
//     nodeResolve({
//       mainFields: ['module', 'browser', 'main']
//     }),
//     commonjs()
//   ]
// }
]
