const StateMachine = require('./stateMachine');
//read const, let, var
class KeywordMachine extends StateMachine {
    constructor() {
        super('keyword', {
            begin: char => {
                switch(char) {
                    case 'c': return { name: 'c1' }
                    case 'l': return { name: 'l1' }
                    case 'v': return { name: 'v1 '}
                }
            },
            //continue reading const
            c1: char => { if (char === 'o') return { name: 'c2' }},
            c2: char => { if (char === 'n') return { name: 'c3' }},
            c3: char => { if (char === 's') return { name: 'c4' }},
            c4: char => { if (char === 't') return { name: 'c5' }},
            c5: char => { if (char === ' ') return { name: 'end' }},

            //continue reading let
            l1: char => { if (char === 'e') return { name: 'l2' }},
            l2: char => { if (char === 't') return { name: 'l3' }},
            l3: char => { if (char === ' ') return { name: 'end' }},
            //continue reading var
            v1: char => { if (char === 'a') return { name: 'v2' }},
            v2: char => { if (char === 'r') return { name: 'v3' }},
            v3: char => { if (char === ' ') return { name: 'end' }},
            end: () => {return}

        })
        this.priority = 1
    }
}

module.exports = KeywordMachine