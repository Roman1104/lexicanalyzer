class StateMachine {
  constructor(name, rules) {
    this.prevState = { name: "begin" };
    this.state = { name: "begin" };
    this.rules = rules;
    this.name = name;
  }

  inputChar(char) {
    this.prevState = this.state;
    if (this.state) {
      //console.log(this.rules[this.state.name])
      this.state = this.rules[this.state.name](char);
    }
  }

  resetState() {
    this.prevState = { name: "begin" };
    this.state = { name: "begin" };
    //console.log('Machine reset!')
  }
}

module.exports = StateMachine;
