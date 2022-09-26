import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Like(props) {
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
      <FavoriteIcon style={{ color: "red", marginRight: "5px" }} />
      {props.likeCnt}
    </div>
  );
}

export default Like;
