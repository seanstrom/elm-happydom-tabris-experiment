const fs = require('fs/promises')
const { compileToString } = require('node-elm-compiler');

compileToString(
  ['./src/Main.elm'],
  { pathToElm: './node_modules/.bin/elm' }
).then(data => {
  const wrappedCode = wrapElmCode(data);
  return fs.writeFile('./elm-dist/bundle.js', wrappedCode);
}).then(() => {
  console.log('Done compiling Elm code')
});

function wrapElmCode (code) {
  return `
    function wrapper() {
      let output = {};
      (function () { ${code} }).call(output);
      return output.Elm;
    }

    export default wrapper;
  `;
}

