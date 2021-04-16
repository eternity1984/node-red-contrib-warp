[![platform][img-platform]][url-nodered]
[![npm version][img-npm-version]][url-my-flow]
[![install size][img-install-size]][url-packagephobia]
[![downloads][img-downloads-current]][url-npm-package]
[![downloads][img-downloads-total]][url-npm-package]
[![License][img-license]](License)
[![JavaScript Style Guide][img-standard]][url-standard]
[![circle-ci][img-circleci]][url-circleci]
[![dependencies Status][img-depends-status]][url-david-dm]
[![Total alerts][img-lgtm-alerts]][url-lgtm]
[![Language grade: JavaScript][img-lgtm-lang-grade]][url-lgtm]
[![Maintainability][img-codeclimate-m]][url-codeclimate]
[![test coverage][img-codeclimate-t]][url-codeclimate]
...

# node-red-contrib-warp

A node for [Node-RED](http://www.nodered.org/) that can warps message directly to the specified nodes.

## Installation

Use the Node-RED `Manage palette` option, or run the following command in your Node-RED directory (typically: `~/.node-red`):

```shell
$ npm install node-red-contrib-warp
```

## Usage

![demo](https://user-images.githubusercontent.com/34591767/114332008-3dce9500-9b80-11eb-8361-07c7076271e0.gif)

### Input messages
The `msg.scope` can be set as a comma-separated string, or an array of string.

If you choose `selected nodes` in the node configuration, the `msg.scope` property will not be used.


![single](https://user-images.githubusercontent.com/34591767/114972130-da62a100-9eb8-11eb-8bfd-516fbad1b8a6.png)

![multi-comma](https://user-images.githubusercontent.com/34591767/114972767-11858200-9eba-11eb-8ab4-e2a5c48473bc.png)

![multi-array](https://user-images.githubusercontent.com/34591767/114973168-dd5e9100-9eba-11eb-964b-c8c3b49a3f0f.png)

## Examples

These flows demonstrates the operations of the `warp` node and the commands that can be used to change its state.

### Basic Operation
Pass the message to the selected node in the following flow:

![selected](https://user-images.githubusercontent.com/34591767/114331738-a2d5bb00-9b7f-11eb-92cf-88ca2776707d.png)

```json

[{"id":"4a6dc584.248f5c","type":"inject","z":"f6f2187d.f17ca8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"123","payloadType":"num","x":290,"y":160,"wires":[["4cb0570.dc11ba8"]]},{"id":"4cb0570.dc11ba8","type":"warp","z":"f6f2187d.f17ca8","scope":["55d3323b.15db3c"],"destination":"selected","x":460,"y":160,"wires":[]},{"id":"55d3323b.15db3c","type":"debug","z":"f6f2187d.f17ca8","active":true,"tosidebar":true,"x":470,"y":220,"wires":[]},{"id":"4581fbf2.663664","type":"inject","z":"f6f2187d.f17ca8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"","payloadType":"date","x":300,"y":220,"wires":[["55d3323b.15db3c"]]}]

```

### Advanced Operation
Pass the message to the dynamically specified node in the following flow:

![varmsg](https://user-images.githubusercontent.com/34591767/114344418-bf332100-9b9a-11eb-9524-03d0005de04f.png)

```json

[{"id":"29571f4a.bd258","type":"function","z":"f6f2187d.f17ca8","name":"","func":"const args = msg.payload\n\nif ((args.username)\n        && (typeof args.username == 'string')) {\n        \n    // ok\n    return [msg, null]\n    \n} else {\n    // missing param\n    msg.payload = {\n        checkpoint: node.id,\n        data: args,\n        message: 'Missing mandatory parameter [username].'\n    }\n    return [null, msg]\n}","outputs":2,"noerr":0,"initialize":"","finalize":"","x":460,"y":180,"wires":[["b5785af6.8fc528"],["6ede4eb5.3b876"]],"outputLabels":["Ok","missing params"]},{"id":"e475e333.a75f8","type":"warp","z":"f6f2187d.f17ca8","name":"","scope":null,"destination":"varmsg","x":610,"y":380,"wires":[]},{"id":"a71c67d1.9612c8","type":"http in","z":"f6f2187d.f17ca8","name":"","url":"/register","method":"post","upload":false,"swaggerDoc":"","x":130,"y":180,"wires":[["f78b9a18.c581d8"]]},{"id":"d22d192c.ef3ef8","type":"http in","z":"f6f2187d.f17ca8","name":"","url":"/resume/:checkpoint","method":"post","upload":false,"swaggerDoc":"","x":170,"y":380,"wires":[["1974c92f.2ccd77"]]},{"id":"1974c92f.2ccd77","type":"change","z":"f6f2187d.f17ca8","name":"set msg.scope","rules":[{"t":"set","p":"scope","pt":"msg","to":"req.params.checkpoint","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":400,"y":380,"wires":[["e475e333.a75f8"]]},{"id":"f78b9a18.c581d8","type":"function","z":"f6f2187d.f17ca8","name":"dummy","func":"// Intermediate processing...\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":300,"y":180,"wires":[["29571f4a.bd258"]]},{"id":"d39ca728.e45138","type":"http response","z":"f6f2187d.f17ca8","name":"ok","statusCode":"","headers":{},"x":750,"y":160,"wires":[]},{"id":"6ede4eb5.3b876","type":"http response","z":"f6f2187d.f17ca8","name":"missing params","statusCode":"","headers":{},"x":640,"y":200,"wires":[]},{"id":"b5785af6.8fc528","type":"template","z":"f6f2187d.f17ca8","name":"","field":"payload","fieldType":"msg","format":"json","syntax":"mustache","template":"{\n    \"id\": 1,\n    \"username\": \"{{payload.username}}\"\n}","output":"json","x":620,"y":160,"wires":[["d39ca728.e45138"]]}]

```

## License
This project is released under the [MIT License](LICENSE).


[img-platform]: https://img.shields.io/badge/platform-Node--RED-brown.svg
[img-install-size]: https://packagephobia.com/badge?p=node-red-contrib-warp
[img-downloads-current]: https://img.shields.io/npm/dw/node-red-contrib-warp.svg
[img-downloads-total]: https://img.shields.io/npm/dt/node-red-contrib-warp.svg
[img-npm-version]: https://img.shields.io/npm/v/node-red-contrib-warp
[img-license]: https://img.shields.io/github/license/eternity1984/node-red-contrib-warp
[img-depends-status]: https://status.david-dm.org/gh/eternity1984/node-red-contrib-warp.svg

[img-lgtm-alerts]: https://img.shields.io/lgtm/alerts/g/eternity1984/node-red-contrib-warp.svg?logo=lgtm&logoWidth=18
[img-lgtm-lang-grade]: https://img.shields.io/lgtm/grade/javascript/g/eternity1984/node-red-contrib-warp.svg?logo=lgtm&logoWidth=18
[img-codeclimate-m]: https://api.codeclimate.com/v1/badges/88385f31f5e455e65e77/maintainability
[img-codeclimate-t]: https://api.codeclimate.com/v1/badges/88385f31f5e455e65e77/test_coverage
[url-codeclimate]: https://codeclimate.com/github/eternity1984/node-red-contrib-warp/

[img-standard]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[url-standard]: https://standardjs.com

[url-nodered]: https://nodered.org/
[url-my-flow]: https://flows.nodered.org/node/node-red-contrib-warp
[url-packagephobia]: https://packagephobia.com/result?p=node-red-contrib-warp
[url-npm-package]: https://www.npmjs.com/package/node-red-contrib-warp
[url-david-dm]: https://david-dm.org/eternity1984/node-red-contrib-warp
[url-lgtm]: https://lgtm.com/projects/g/eternity1984/node-red-contrib-warp/

[img-circleci]: https://circleci.com/gh/eternity1984/node-red-contrib-warp.svg?style=shield
[url-circleci]: https://app.circleci.com/pipelines/github/eternity1984/node-red-contrib-warp