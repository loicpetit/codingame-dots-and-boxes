import typescript from '@rollup/plugin-typescript';

export default [{
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [typescript({
      tsconfig: 'tsconfig.json'
  })]
},{
    input: 'src/modules.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [typescript({
        tsconfig: 'tsconfig.json'
    })]
}];