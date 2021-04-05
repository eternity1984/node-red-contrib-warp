


class TeleportGateNode {

    constructor(config) {
        
        const node = this;

        node.on("input", function(msg, send, done) {
            send = send || function() { node.send.apply(node, arguments); }


            console.log(config.nodeId);

            send(msg);
            if (done) {
                done();
            }
        })
    }
}

module.exports = TeleportGateNode
