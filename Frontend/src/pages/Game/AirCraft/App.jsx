const { useState } = require("react");

// 게임
function airCraft() {
  let [score, setScore] = useState(0); /* 점수 */
  let [remain, setRemain] = useState(2); /* 잔기 */
  let [level, setLevel] = useState(0); /* 무기레벨 */
  let [special, setSpecial] = useState(false); /* 특수능력 준비여부 */
  let [cooldown, setCooldown] = useState(0); /* 특수능력 쿨타임 */
  let [gameover, setGameover] = useState(false); /* 게임오버 여부 */
  let [gamestart, setGamestart] = useState(false); /* 게임시작 여부 */
  let [bossCount, setBossCount] = useState(0); /* 보스 패턴 카운트 */
}