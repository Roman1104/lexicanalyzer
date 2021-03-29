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

function tokenize(string, rules) {
  const tokens = [];
  let charsCounter = 0;
  for (let i = 0; i < string.length; i++) {
    charsCounter++;
    let hasActiveMachine = false;
    rules.forEach((machine) => {
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
      let tokenName = getActiveName(rules);
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
      resetAllRules(rules);
    }
  }
  return tokens;
}

module.exports = {
  resetAllRules,
  getActiveName,
  tokenize,
};
