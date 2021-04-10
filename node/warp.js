module.exports = function (RED) {
  'use strict'
  function WarpNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.on('input', function (msg, _send, done) {
      var scope = config.scope || []
      if (config.destination === 'varmsg') {
        const msgVal = RED.util.getMessageProperty(msg, 'scope')

        if (typeof msgVal === 'string') {
          // a comma-separated string
          const re = /\s*(?:,|$)\s*/
          scope = msgVal.split(re)
        } else if (Array.isArray(msgVal) && msgVal.every(x => typeof x === 'string')) {
          // an array of strings
          scope = msgVal
        } else {
          const err = new TypeError('`msg.scope` must be an array of strings, or a comma-separated string.')
          if (done) {
            done(err)
          } else {
            node.error(err, msg) // Node-RED 0.x compatible
          }
          return
        }
      }
      scope = [...new Set(scope)].filter(x => x)

      var failed = []
      scope.forEach(id => {
        const nodeRef = node._flow.getNode(id) // RED.nodes.getNode(id);
        if (nodeRef && (nodeRef.id !== node.id) && (nodeRef.type !== node.type)) {
          nodeRef.receive(RED.util.cloneMessage(msg))
        } else {
          failed.push(id)
        }
      })

      if (failed.length > 0) {
        node.warn('Invalid target: [' + failed + ']')
      }
      if (done) {
        done()
      }
    })
  }
  RED.nodes.registerType('warp', WarpNode)
}
