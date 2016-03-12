var alllibs = require.context('../lib', true, /\.js$/);
alllibs.keys().forEach(alllibs);

function helloWorld() {
  return "Hello world!";
}