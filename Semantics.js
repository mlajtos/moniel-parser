module.exports = {
    operation: "eval",
    actions: {
        Graph: (defs) => ({
            kind: "Graph",
            definitions: defs.eval()
        }),
        Chain: (list) => ({
            kind: "Chain",
            blocks: list.eval()
        }),
        NodeDefinition: (_, node, __, definition) => ({
            kind: "Definition",
            node: node.eval(),
            definition: definition.eval()
        }),
        Node: (id, _, node) => ({
            kind: "Node",
            id: id.eval()[0] || null,
            node: node.eval()
        }),
        LiteralNode_simple: (type) => ({
            kind: "LiteralNode",
            type: type.eval(),
            parameters: []
        }),
        LiteralNode_parametrized: (_, type, params, __) => ({
            kind: "LiteralNode",
            type: type.eval(),
            parameters: params.eval()
        }),
        MetaNode_native: (_, body, __) => ({
            kind: "MetaNode",
            body: body.eval()
        }),
        MetaNode_foreign: (_, body, __) => ({
            kind: "ForeignMetaNode",
            body: body.eval()
        }),
        ForeignMetaNodeBody: function(_) {
            return this.sourceString
        },
        List: (_, list, __) => ({
            kind: "List",
            items: list.eval()
        }),
        Parameter: (_, name, value) => ({
            kind: "Parameter",
            name: name.eval(),
            value: value.eval()[0] || null
        }),
        ParameterValue: function(_) {
            return this.sourceString
        },
        path: (path) => ({
            kind: "Path",
            value: path.eval()
        }),
        nodeType: function(_, type) {
            return this.sourceString
        },
        identifier: function(_, id) {
            return this.sourceString
        },
        parameterName: function(_, name) {
            return this.sourceString
        },
        NonemptyListOf: (x, _, xs) => [x.eval(), ...xs.eval()],
        EmptyListOf: () => [],
        nonemptyListOf: (x, _, xs) => [x.eval(), ...xs.eval()]
    }
}