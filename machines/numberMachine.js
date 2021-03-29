const StateMachine = require("./stateMachine");

class NumberMachine extends StateMachine {
  constructor() {
    super("number", {
      begin: (char) => {
        if (/[0-9]/.test(char)) {
          return { name: "s2" };
        } else if (char === ".") return { name: "dot" };
      },
      s2: (char) => {
        if (/[0-9]/.test(char)) {
          return { name: "s2" };
        } else if (char === ".") return { name: "dot" };
        else if (/[\n;= ]/.test(char)) return { name: "end" };
      },
      dot: (char) => {
        if (/[0-9]/.test(char)) {
          return { name: "dot" };
        } else if (/[\n;= ]/.test(char)) return { name: "end" };
      },
      end: () => {
        return;
      },
    });
    this.priority = 2;
  }
}

module.exports = NumberMachine;
