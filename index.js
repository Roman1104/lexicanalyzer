const StateMachine = require('./machines/machine');

const string = 'const num = 23.4'
const tokens = [] // Результирующий список токенов
let charsCounter = 0 // счётчик символов в пределах одного токена
 
for (let i = 0; i <= string.length; i++) {
    charsCounter++
    let hasActiveMachine = false
    allRules.forEach(machine => {
        machine.inputChar(string[i])
        if (machine.state) {
            hasActiveMachine = true
        }
    })
 
    if (!hasActiveMachine) {
        if (charsCounter > 1) {
            tokens.push({
                token: getActiveName(allRules),
                lexeme: string.substring(i - charsCounter + 1, i)
            })
            i--
        } else {
            tokens.push({
                token: undefined,
                lexeme: string.substring(i, i + 1)
            })
        }
        charsCounter = 0
        resetAllRules(allRules)
    }
}
 
console.log(tokens)