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

describe("Positive scenarios", function () {
  describe("Keywords", function () {
    it("const", function () {
      assert.deepEqual(tokenize("const ", allRules), [
        { token: "keyword", lexeme: "const" },
        { token: "delimiter", lexeme: " " },
      ]);
    });

    it("let", function () {
      assert.deepEqual(tokenize("let ", allRules), [
        { token: "keyword", lexeme: "let" },
        { token: "delimiter", lexeme: " " },
      ]);
    });

    it("var", function () {
      assert.deepEqual(tokenize("var ", allRules), [
        { token: "keyword", lexeme: "var" },
        { token: "delimiter", lexeme: " " },
      ]);
    });
  });

  describe("Identifiers", function () {
    it("constantTest", function () {
      assert.deepEqual(tokenize("constantTest =", allRules), [
        { token: "identifier", lexeme: "constantTest" },
        { token: "delimiter", lexeme: " " },
        { token: "operator", lexeme: "=" },
      ]);
    });

    it("testvar", function () {
      assert.deepEqual(tokenize("testvar=", allRules), [
        { token: "identifier", lexeme: "testvar" },
        { token: "operator", lexeme: "=" },
      ]);
    });

    it("letter", function () {
      assert.deepEqual(tokenize("letter;", allRules), [
        { token: "identifier", lexeme: "letter" },
        { token: "delimiter", lexeme: ";" },
      ]);
    });
  });

  describe("Numbers", function () {
    it("123", function () {
      assert.deepEqual(tokenize("123 ", allRules), [
        { token: "number", lexeme: "123" },
        { token: "delimiter", lexeme: " " },
      ]);
    });

    it("123.567", function () {
      assert.deepEqual(tokenize("123.567;", allRules), [
        { token: "number", lexeme: "123.567" },
        { token: "delimiter", lexeme: ";" },
      ]);
    });

    it(".123", function () {
      assert.deepEqual(tokenize(".123\n", allRules), [
        { token: "number", lexeme: ".123" },
        { token: "delimiter", lexeme: "\n" },
      ]);
    });
  });

  describe("Operators", function () {
    it("=", function () {
      assert.deepEqual(tokenize("=", allRules), [
        { token: "operator", lexeme: "=" },
      ]);
    });

    it("+", function () {
      assert.deepEqual(tokenize("+", allRules), [
        { token: "operator", lexeme: "+" },
      ]);
    });

    it("-", function () {
      assert.deepEqual(tokenize("-", allRules), [
        { token: "operator", lexeme: "-" },
      ]);
    });

    it("*", function () {
      assert.deepEqual(tokenize("*", allRules), [
        { token: "operator", lexeme: "*" },
      ]);
    });

    it("/", function () {
      assert.deepEqual(tokenize("/", allRules), [
        { token: "operator", lexeme: "/" },
      ]);
    });

    it("%", function () {
      assert.deepEqual(tokenize("%", allRules), [
        { token: "operator", lexeme: "%" },
      ]);
    });

    it(">", function () {
      assert.deepEqual(tokenize(">", allRules), [
        { token: "operator", lexeme: ">" },
      ]);
    });

    it("<", function () {
      assert.deepEqual(tokenize("<", allRules), [
        { token: "operator", lexeme: "<" },
      ]);
    });
  });

  describe("Delimiters", function () {
    it("space", function () {
      assert.deepEqual(tokenize(" ", allRules), [
        { token: "delimiter", lexeme: " " },
      ]);
    });

    it(";", function () {
      assert.deepEqual(tokenize(";", allRules), [
        { token: "delimiter", lexeme: ";" },
      ]);
    });

    it("new line - \\n", function () {
      assert.deepEqual(tokenize("\n", allRules), [
        { token: "delimiter", lexeme: "\n" },
      ]);
    });
  });

  describe("Expression", function () {
    it("const letter= .4234+ 123.4*n;\\n", function () {
      assert.deepEqual(tokenize("const letter= .4234+ 123.4*n;\n", allRules), [
        { token: "keyword", lexeme: "const" },
        { token: "delimiter", lexeme: " " },
        { token: "identifier", lexeme: "letter" },
        { token: "operator", lexeme: "=" },
        { token: "delimiter", lexeme: " " },
        { token: "number", lexeme: ".4234" },
        { token: "operator", lexeme: "+" },
        { token: "delimiter", lexeme: " " },
        { token: "number", lexeme: "123.4" },
        { token: "operator", lexeme: "*" },
        { token: "identifier", lexeme: "n" },
        { token: "delimiter", lexeme: ";" },
        { token: "delimiter", lexeme: "\n" },
      ]);
    });
  });
});
