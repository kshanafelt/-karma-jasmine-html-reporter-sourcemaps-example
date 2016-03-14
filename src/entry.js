var alllibs = require.context('../lib', true, /\.js$/);
alllibs.keys().forEach(alllibs);

module.exports = {
    sayHelloInEnglish: function() {
    return "HELLO";
  },
       
  sayHelloInSpanish: function() {
    return "Hola";
  },
  
  helloWorld: function() {
    return "Hello world!";
  }
}