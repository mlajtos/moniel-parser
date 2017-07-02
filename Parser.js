const fs = require("fs")
const path = require("path")
const ohm = require("ohm-js")

const semantics = require("./Semantics.js")

class Parser{
    
    constructor() {
        this.grammarDefinition = undefined
        this.grammar = undefined
        this.semantics = undefined
        this.loadGrammarDefinition()
    }

    loadGrammarDefinition() {
        const filepath = path.join(__dirname, "Moniel.ohm")
        this.grammarDefinition = fs.readFileSync(filepath, "utf8")
        this.grammar = ohm.grammar(this.grammarDefinition)
        this.semantics = this.grammar.createSemantics().addOperation(semantics.operation, semantics.actions)
    }

    parse(source) {
        let ast = null
        let issues = []

        const matchResult = this.grammar.match(source)

        if (matchResult.failed()) {
            const expected = matchResult.getExpectedText()
            const location = matchResult.getRightmostFailurePosition()

            issues.push({
                message: `Expected ${expected}.`,
                location
            })
        } else {
            ast = this.semantics(matchResult).eval()
        }
        
        return {
            ast,
            issues
        }
    }
}

module.exports = new Parser()