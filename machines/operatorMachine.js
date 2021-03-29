const StateMachine = require("./stateMachine");

class OperatorMachine extends StateMachine {
  constructor() {
    super("operator", {
      begin: (char) => {
        if (/[\+\-\*\/%=<>]/.test(char)) {
          return { name: "end" };
        }
      },
      end: () => {
        return;
      },
    });
    this.priority = 3;
  }
}

module.exports = OperatorMachine;
