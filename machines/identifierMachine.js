const StateMachine = require("./stateMachine");

class IdentifierMachine extends StateMachine {
  constructor() {
    super("identifier", {
      begin: (char) => {
        if (/[a-z]/i.test(char)) {
          return { name: "begin" };
        } else if (/[\n;= ]/.test(char)) return { name: "end" };
      },
      end: () => {
        return;
      },
    });
    this.priority = 2;
  }
}

module.exports = IdentifierMachine;
