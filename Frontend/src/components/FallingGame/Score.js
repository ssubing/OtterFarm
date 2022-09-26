import React from "react";
// import { useRecoilValue } from "recoil";

// import { scoreState } from "./atom";

const Score = (props) => {
  // const score = useRecoilValue(scoreState);

  return (
    <div className="score">
      <p>{`Score: ${props.score}`}</p>
    </div>
  );
};

export default React.memo(Score);
