const fs = require("fs")
const path = require("path")

const Parser = require("./Parser.js")

const loadSnapshot = (filePath, target) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(target, null, 2))
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

describe("Parser", () => {
    const testsDir = path.join(__dirname, "_tests")
    const testDirectories = fs.readdirSync(testsDir)
        .filter(file => fs.statSync(path.join(testsDir, file)).isDirectory())

    testDirectories.forEach(d => {
        const testDirectory  = path.join(testsDir, d)
        const source = fs.readFileSync(path.join(testDirectory, "source.mon"), "utf8")
        const parseResult = Parser.parse(source)

        let generated
        let target

        if (!parseResult.ast) {
            const errorFilePath = path.join(testDirectory, "_error.json")
            generated = parseResult
            target = loadSnapshot(errorFilePath, generated)
        } else {
            const astFilePath = path.join(testDirectory, "ast.json")
            generated = parseResult.ast
            target = loadSnapshot(astFilePath, generated)
        }

        test(d, () => {
            expect(generated).toEqual(target)
        })
    })
})