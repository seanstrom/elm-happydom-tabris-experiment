import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.jsx',
  output: {
    dir: 'dist/',
    format: 'cjs',
    exports: 'auto',
    preserveModules: true,
  },
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    include: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx"
    ]
  })]
};
