module.exports = {
    operation: "eval",
    actions: {
        Graph: (defs) => ({
            type: "Graph",
            definitions: defs.eval()
        }),
        Chain: (list) => ({
            type: "Chain",
            blocks: list.eval()
        }),
        NodeDefinition: (_, node, __, definition) => ({
            type: "Definition",
            node: node.eval(),
            definition: definition.eval()
        }),
        Node: (id, _, node) => ({
            type: "Node",
            id: id.eval()[0] || null,
            node: node.eval()
        }),
        LiteralNode_simple: (name) => ({
            type: "LiteralNode",
            name: name.eval(),
            parameters: []
        }),
        LiteralNode_parametrized: (_, name, params, __) => ({
            type: "LiteralNode",
            name: name.eval(),
            parameters: params.eval()
        }),
        MetaNode_native: (_, body, __) => ({
            type: "MetaNode",
            body: body.eval()
        }),
        MetaNode_foreign: (_, body, __) => ({
            type: "ForeignMetaNode",
            body: body.eval()
        }),
        ForeignMetaNodeBody: function(_) {
            return this.sourceString
        },
        List: (_, list, __) => ({
            type: "List",
            items: list.eval()
        }),
        Parameter: (_, name, value) => ({
            type: "Parameter",
            name: name.eval(),
            value: value.eval()[0] || null
        }),
        ParameterValue: function(_) {
            return this.sourceString
        },
        path: (path) => ({
            type: "Path",
            value: path.eval()
        }),
        nodeName: function(_, name) {
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