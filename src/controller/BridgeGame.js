const Bridge = require('../model/Bridge');
const { readBridgeSize, readMoving } = require('../view/InputView');
const { printGameStart } = require('../view/OutputView');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;

  #level = 0;

  async execute() {
    printGameStart();
    this.#bridge = new Bridge(await readBridgeSize());
    this.#bridge.print(); // deprecated
    this.move(0, await readMoving());
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  async move(level, command) {
    if (level === this.#bridge.getLength() - 1) {
      return console.log('승리');
    }
    if (this.#bridge.checkBridge(level, command)) {
      return this.move(level + 1, await readMoving());
    }
    return this.retry();
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    console.log('재시작 물어보기');
  }
}

module.exports = BridgeGame;
