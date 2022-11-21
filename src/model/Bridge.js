const { makeBridge } = require('../BridgeMaker');
const BridgeRandomNumberGenerator = require('../BridgeRandomNumberGenerator');
const { COMMAND, MAP_VALUE } = require('../utils/constant');
const { printMap } = require('../view/OutputView');

class Bridge {
  #bridge;

  #level = 0;

  #map = {};

  constructor(bridgeSize) {
    const defaultArray = this.makeDefaultArray(bridgeSize);
    this.#bridge = makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate);
    this.#map.up = [...defaultArray];
    this.#map.down = [...defaultArray];
    // console.log(this.#bridge);
  }

  makeDefaultArray(bridgeSize) {
    // Array(Number(bridgeSize)).fill(' ')가 정상적으로 동작하지 않는 버그가 있어 이 메소드를 사용
    const temp = [];
    for (let index = 0; index < bridgeSize; index += 1) {
      temp.push(' ');
    }
    return temp;
  }

  print(index) { // deprecated
    printMap(index, this.#map);
  }

  getLength() {
    return this.#bridge.length;
  }

  getLevel() {
    return this.#level;
  }

  checkBridge(index, command) {
    this.#level = index;
    const comparison = this.#bridge[index] === command;
    this.updateMap(index, command, comparison);
    this.print(index);
    return comparison;
  }

  updateMap(index, command, comparison) {
    if (command === COMMAND.UP) {
      this.#map.up[index] = comparison ? MAP_VALUE.HIT : MAP_VALUE.MISS;
      this.#map.down[index] = MAP_VALUE.EMPTY;
    }
    if (command === COMMAND.DOWN) {
      this.#map.up[index] = MAP_VALUE.EMPTY;
      this.#map.down[index] = comparison ? MAP_VALUE.HIT : MAP_VALUE.MISS;
    }
  }
}
module.exports = Bridge;
