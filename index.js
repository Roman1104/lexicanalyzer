const IdentifierMachine = require("./machines/identifierMachine");
const KeywordMachine = require("./machines/keywordMachine");
const NumberMachine = require("./machines/numberMachine");
const DelimiterMachine = require("./machines/delimiterMachine");
const OperatorMachine = require("./machines/operatorMachine");

function resetAllRules(machinesList) {
  machinesList.forEach((item) => {
    item.resetState();
  });
}

function getActiveName(machinesList) {
  let activeMachines = [];
  for (let i = 0; i < machinesList.length; i++) {
    if (machinesList[i].state && machinesList[i].state.name === "end") {
      activeMachines.push(machinesList[i]);
    }
  }
  if (activeMachines.length > 0) {
    Object.entries(activeMachines).sort((a, b) => a.priority - b.priority);
    return activeMachines.pop().name;
  }
  return;
}

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

const string = "const num = 23.4;\n    let consta=.4353\n";
const tokens = []; // Результирующий список токенов
let charsCounter = 0; // счётчик символов в пределах одного токена

for (let i = 0; i < string.length; i++) {
  charsCounter++;
  let hasActiveMachine = false;
  allRules.forEach((machine) => {
    machine.inputChar(string[i]);
    if (machine.state && machine.state.name != "end") {
      /* console.log(
        "symbol " +
          string[i] +
          " changed " +
          machine.name +
          " state to " +
          machine.state.name
      ); */
      hasActiveMachine = true;
    }
  });

  if (!hasActiveMachine) {
    let tokenName = getActiveName(allRules);
    if (charsCounter > 1) {
      tokens.push({
        token: tokenName,
        lexeme: string.substring(i - charsCounter + 1, i),
      });
      i--;
    } else {
      tokens.push({
        token: tokenName,
        lexeme: string.substring(i, i + 1),
      });
    }
    charsCounter = 0;
    resetAllRules(allRules);
  }
}

console.log(tokens);
