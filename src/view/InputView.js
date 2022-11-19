const MissionUtils = require('@woowacourse/mission-utils');
const { isBridgeSizeValid } = require('../util/validation');
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    const bridgeSize = new Promise((resolve) => {
      MissionUtils.Console.readLine('다리의 길이를 입력해주세요.\n', (answer) => {
        isBridgeSizeValid(answer);
        return resolve(answer);
      });
    });
    return bridgeSize;
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    const moving = new Promise((resolve) => {
      MissionUtils.Console.readLine('이동할 칸을 선택해주세요. (위: U, 아래: D)\n', (answer) => resolve(answer));
    });
    return moving;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},
};

module.exports = InputView;
