class StateMachine {
    constructor(name, rules) {
        this.prevState = {name: 'begin'}
        this.state = {name: 'begin'}
        this.rules = rules
        this.name = name
    } 
    
    inputChar(char) {
        this.prevState = this.state
        if (this.state) {
            this.state = this.rules[this.state.name](char)
        }
    }
    
    resetState() {
        this.prevState = {name: 'begin'}
        this.state = {name: 'begin'}
    }
}
module.exports = StateMachine