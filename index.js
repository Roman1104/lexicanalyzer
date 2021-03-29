const IdentifierMachine = require("./machines/identifierMachine");
const KeywordMachine = require("./machines/keywordMachine");
const NumberMachine = require("./machines/numberMachine");

function resetAllRules(machinesList) {
  machinesList.forEach((item) => {
    item.resetState();
  });
}

function getActiveName(machinesList) {
  //console.log(machinesList)
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

const allRules = [identifierMachine, keywordMachine, numberMachine];
const string = "const num = 23.4;";
const tokens = []; // Результирующий список токенов
let charsCounter = 0; // счётчик символов в пределах одного токена

for (let i = 0; i <= string.length; i++) {
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
    if (charsCounter > 1) {
      tokens.push({
        token: getActiveName(allRules),
        lexeme: string.substring(i - charsCounter + 1, i),
      });
      i--;
    } else {
      tokens.push({
        token: undefined,
        lexeme: string.substring(i, i + 1),
      });
    }
    charsCounter = 0;
    resetAllRules(allRules);
  }
}

console.log(tokens);
