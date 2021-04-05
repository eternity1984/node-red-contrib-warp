module.exports = function (RED) {
    'use strict'
    function WarpNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg, _send, done) {
            var scope = msg.scope || config.scope;
            if (!Array.isArray(scope)) {
                scope = [scope];
            }
            scope = [...new Set(scope)];

            var missing = [];
            scope.forEach(id => {
                const target = node._flow.getNode(id);
                if (target) {
                    target.receive(RED.util.cloneMessage(msg));
                } else {
                    missing.push(id);
                }
            });

            if (missing.length > 0) {
                const err = "Missing scope: [" + missing + "]";
                if (done) {
                    done(err);
                } else {
                    node.error(err, msg);
                }
            } else {
                if (done) {
                    done();
                }
            }
        });
    }
    RED.nodes.registerType('warp', WarpNode)
}