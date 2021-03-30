const chai = require("chai");
const assert = chai.assert;

const { tokenize } = require("../index");
const IdentifierMachine = require("../machines/identifierMachine");
const KeywordMachine = require("../machines/keywordMachine");
const NumberMachine = require("../machines/numberMachine");
const DelimiterMachine = require("../machines/delimiterMachine");
const OperatorMachine = require("../machines/operatorMachine");

const identifierMachine = new IdentifierMachine();
const keywordMachine = new KeywordMachine();
const numberMachine = new NumberMachine();
const delimiterMachine = new DelimiterMachine();
const operatorMachine = new OperatorMachine();

const allRules = [
  identifierMachine,
  keywordMachine,
  numberMachine,
  delimiterMachine,
  operatorMachine,
];

describe("Negative scenarios", function () {
  it("cons", function () {
    assert.deepEqual(tokenize("cons ", allRules), [
      { token: "identifier", lexeme: "cons" },
      { token: "delimiter", lexeme: " " },
    ]);
  });

  it("l3t", function () {
    assert.deepEqual(tokenize("l3t ", allRules), [
      { token: undefined, lexeme: "l" },
      { token: undefined, lexeme: "3" },
      { token: "identifier", lexeme: "t" },
      { token: "delimiter", lexeme: " " },
    ]);
  });

  it("var;", function () {
    assert.deepEqual(tokenize("var;", allRules), [
      { token: "identifier", lexeme: "var" },
      { token: "delimiter", lexeme: ";" },
    ]);
  });

  it("constantTest123", function () {
    assert.deepEqual(tokenize("constantTest123 ", allRules), [
      { token: undefined, lexeme: "constantTest" },
      { token: "number", lexeme: "123" },
      { token: "delimiter", lexeme: " " },
    ]);
  });

  it("3a5", function () {
    assert.deepEqual(tokenize("3a5 ", allRules), [
      { token: undefined, lexeme: "3" },
      { token: undefined, lexeme: "a" },
      { token: "number", lexeme: "5" },
      { token: "delimiter", lexeme: " " },
    ]);
  });

  it("qwe.45", function () {
    assert.deepEqual(tokenize("qwe.45 ", allRules), [
      { token: undefined, lexeme: "qwe" },
      { token: "number", lexeme: ".45" },
      { token: "delimiter", lexeme: " " },
    ]);
  });

  it("const= var+let;", function () {
    assert.deepEqual(tokenize("const= var+let;", allRules), [
      { token: "identifier", lexeme: "const" },
      { token: "operator", lexeme: "=" },
      { token: "delimiter", lexeme: " " },
      { token: "identifier", lexeme: "var" },
      { token: "operator", lexeme: "+" },
      { token: "identifier", lexeme: "let" },
      { token: "delimiter", lexeme: ";" },
    ]);
  });
});
