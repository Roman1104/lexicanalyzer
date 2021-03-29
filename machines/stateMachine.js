class StateMachine {
  constructor(name, rules) {
    this.state = { name: "begin" };
    this.rules = rules;
    this.name = name;
  }

  inputChar(char) {
    if (this.state) {
      this.state = this.rules[this.state.name](char);
    }
  }

  resetState() {
    this.state = { name: "begin" };
  }
}

module.exports = StateMachine;
