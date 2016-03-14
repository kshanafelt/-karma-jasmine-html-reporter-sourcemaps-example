var entry = require('../src/entry.js');

describe("Hello world equals Hello world", function() {
    
  console.log(entry)
  it("says hello", function() {
    expect(entry.helloWorld()).toEqual("Hello world"); //needs !
  });
});

describe("Hello world contains world", function() {
    it("says world", function() {
        expect(entry.helloWorld()).toContain("world");
    });
});