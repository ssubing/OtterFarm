import React from "react";
import { useRecoilValue } from "recoil";

import { timeState } from "./atom";

function Timer() {
  const time = useRecoilValue(timeState);
  return <div>Timer : {time}s</div>;
}

export default Timer;
