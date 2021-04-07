module.exports = function (RED) {
    'use strict'
    function WarpNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg, _send, done) {

            var scope = config.scope || [];
            if (config.destination === 'varmsg') {
                const msgVal = RED.util.getMessageProperty(msg, 'scope');

                if (typeof msgVal === 'string') {
                    // a comma-separated string
                    const re = /\s*(?:,|$)\s*/;
                    scope = msgVal.split(re);
                } else if (Array.isArray(msgVal)) {
                    // an array
                    scope = msgVal.filter(x => typeof x === 'string');
                } else {
                    const err = new TypeError("`msg.scope` must be an array or a comma-separated string.");
                    if (done) {
                        done(err);
                    } else {
                        node.error(err, msg);   // Node-RED 0.x compatible
                    }
                    return;
                }
            }
            scope = [...new Set(scope)].filter(x => x);

            var missing = [];
            scope.forEach(id => {
                const nodeRef = node._flow.getNode(id); // RED.nodes.getNode(id);
                if (nodeRef && (nodeRef.type !== 'warp')) {
                    nodeRef.receive(RED.util.cloneMessage(msg));
                } else {
                    missing.push(id);
                }
            });

            if (missing.length > 0) {
                node.warn('Invalid target: [' + missing + ']');
            }
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType('warp', WarpNode)
}