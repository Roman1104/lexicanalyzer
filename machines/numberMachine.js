const StateMachine = require("./stateMachine");

class NumberMachine extends StateMachine {
  constructor() {
    super("number", {
      begin: (char) => {
        if (/[0-9]/.test(char)) {
          return { name: "begin" };
        } else if (char === ".") return { name: "dot" };
        else if (/[$\n;= ]/.test(char)) return { name: "end" };
      },
      dot: (char) => {
        if (/[0-9]/.test(char)) {
          return { name: "dot" };
        } else if (/[$\n;= ]/.test(char)) return { name: "end" };
      },
      end: () => {
        return;
      },
    });
    this.priority = 3;
  }
}

module.exports = NumberMachine;
