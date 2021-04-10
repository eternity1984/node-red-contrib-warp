class WarpGate {
  constructor (RED, config) {
    this.RED = RED
    this.config = config
  }

  inputHandler (node, msg, send, done) {
    const func = this._exec.bind(this, node, msg, done)
    this._initScope(msg, function (scope, err) {
      if (err) {
        if (done) {
          done(err)
        } else {
          node.error(err, msg) // Node-RED 0.x compatible
        }
      } else {
        func(scope)
      }
    })
  }

  _initScope (msg, callback) {
    const RED = this.RED
    const config = this.config

    var scope = config.scope || []
    if (config.destination === 'varmsg') {
      try {
        scope = this._getScopeFrom(msg)
      } catch (error) {
        callback(null, error)
        return        
      }
    }
    scope = [...new Set(scope)].filter(x => x)
    callback(scope, null)
  }
  
  _getScopeFrom(msg) {
    const RED = this.RED
    const msgVal = RED.util.getMessageProperty(msg, 'scope')

    if (typeof msgVal === 'string') {
      // a comma-separated string
      const re = /\s*(?:,|$)\s*/
      return msgVal.split(re)
    } else if (Array.isArray(msgVal) && msgVal.every(x => typeof x === 'string')) {
      // an array of strings
      return msgVal
    } else {
      throw new TypeError('`msg.scope` must be an array of strings, or a comma-separated string.')
    }
  }

  _exec (node, msg, done, scope) {
    const RED = this.RED

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
  }
}

module.exports = function (RED) {
  'use strict'
  RED.nodes.registerType('warp', function (config) {
    const node = this
    RED.nodes.createNode(node, config)

    const warp = new WarpGate(RED, config)
    node.on('input', warp.inputHandler.bind(warp, node))
  })
}
