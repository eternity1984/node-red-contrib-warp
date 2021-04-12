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

Use the Node-RED `Manage palette` or run the following command in your Node-RED directory (typically: `~/.node-red`):

```shell
$ npm install node-red-contrib-warp
```

## Usage

![](https://user-images.githubusercontent.com/34591767/114332008-3dce9500-9b80-11eb-8361-07c7076271e0.gif)


## Examples

### Basic Operation
This flow demonstrates the basic operation of the `warp` node and the commands that can be used to change its state.

![](https://user-images.githubusercontent.com/34591767/114331738-a2d5bb00-9b7f-11eb-92cf-88ca2776707d.png)
```json
[{"id":"4a6dc584.248f5c","type":"inject","z":"f6f2187d.f17ca8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"123","payloadType":"num","x":290,"y":160,"wires":[["4cb0570.dc11ba8"]]},{"id":"4cb0570.dc11ba8","type":"warp","z":"f6f2187d.f17ca8","scope":["55d3323b.15db3c"],"destination":"selected","x":460,"y":160,"wires":[]},{"id":"55d3323b.15db3c","type":"debug","z":"f6f2187d.f17ca8","active":true,"tosidebar":true,"x":470,"y":220,"wires":[]},{"id":"4581fbf2.663664","type":"inject","z":"f6f2187d.f17ca8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"","payloadType":"date","x":300,"y":220,"wires":[["55d3323b.15db3c"]]}]
```

### Advanced Operation



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
[img-codeclimate-m]: https://api.codeclimate.com/v1/badges/a4557878d2c42453a0ca/maintainability
[img-codeclimate-t]: https://api.codeclimate.com/v1/badges/a4557878d2c42453a0ca/test_coverage
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