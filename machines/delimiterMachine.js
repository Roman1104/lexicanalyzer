const StateMachine = require("./stateMachine");

class DelimiterMachine extends StateMachine {
  constructor() {
    super("delimiter", {
      begin: (char) => {
        if (/[\n; ]/.test(char)) {
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

module.exports = DelimiterMachine;
