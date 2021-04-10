var helper = require('node-red-node-test-helper')
var warpNode = require('../node/warp.js')

helper.init(require.resolve('node-red'))

describe('warp Node tests', function() {
    beforeEach(function(done) {
        helper.startServer(done)
    })

    afterEach(function(done) {
        helper.unload()
        helper.stopServer(done)
    })

    describe('common', function() {
        it('should be loaded', function(done) {
            const flow = [{
                id: 'n1',
                type: 'warp',
                name: 'warp'
            }]
            helper.load(warpNode, flow, function() {
                const n1 = helper.getNode('n1')
                n1.should.have.property('name', 'warp')
                done()
            })
        })

        // it('should be catched errors', function(done) {
        //     const flow = [{
        //             id: 'n1',
        //             type: 'friendly-id',
        //             mode: 'ENCODE',
        //         },
        //         {
        //             id: 'ns',
        //             type: 'catch',
        //             scope: ['n1'],
        //             wires: [
        //                 ['nh']
        //             ]
        //         },
        //         {
        //             id: 'nh',
        //             type: 'helper'
        //         }
        //     ]
        //     helper.load(friendlyIdNode, flow, function() {
        //         const n1 = helper.getNode('n1')
        //         const nh = helper.getNode('nh')
        //         nh.on('input', function(msg) {
        //             try {
        //                 msg.error.should.have.property('message', 'Error: Missing input property: msg.payload')
        //                 done()
        //             } catch (err) {
        //                 done(err)
        //             }
        //         })
        //         n1.receive({ topic: '' })
        //     })
        // })
    })

    describe('warp', function() {
        it('should warp msg (config: single)', function(done) {
            var flow = [
                {
                    id: 'n1',
                    type: 'warp',
                    scope: [
                        'nh'
                    ]
                },
                
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(warpNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'abc')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'abc' })
            })
        })
   
        it('should warp msg (config: multiple)', function(done) {
            var flow = [
                {
                    id: 'n1',
                    type: 'warp',
                    scope: [
                        'nh1',
                        'nh2'
                    ]
                },
                {
                    id: 'nh1',
                    type: 'helper'
                },
                {
                    id: 'nh2',
                    type: 'helper'
                }
            ]

            helper.load(warpNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh2')

                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'abc')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'abc' })
            })
        })

        it('should warp msg (msg: single)', function(done) {
            var flow = [
                {
                    id: 'n1',
                    type: 'warp',
                    destination: "varmsg"
                },
                
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(warpNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'abc')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'abc', scope: "nh" })
            })
        })
   
        it('should warp msg (msg: a comma-separated string)', function(done) {
            var flow = [
                {
                    id: 'n1',
                    type: 'warp',
                    scope: [
                        'nh1',
                        'nh2'
                    ]
                },
                {
                    id: 'nh1',
                    type: 'helper'
                },
                {
                    id: 'nh2',
                    type: 'helper'
                }
            ]

            helper.load(warpNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh2')

                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'abc')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'abc', scope: "nh1, nh2" })
            })
        })


        it('should warp msg (msg: an array of strings)', function(done) {
            var flow = [
                {
                    id: 'n1',
                    type: 'warp',
                    scope: [
                        'nh1',
                        'nh2'
                    ]
                },
                {
                    id: 'nh1',
                    type: 'helper'
                },
                {
                    id: 'nh2',
                    type: 'helper'
                }
            ]

            helper.load(warpNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh2')

                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'abc')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'abc', scope: ["nh1", "nh2"]})
            })
        })
    });

})