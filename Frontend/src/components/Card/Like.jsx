import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Like(props) {
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
      {props.liked ? (
        <FavoriteIcon style={{ color: "red", marginRight: "5px" }} />
      ) : (
        <FavoriteBorderIcon style={{ color: "red", marginRight: "5px" }} />
      )}
      
      {props.likeCnt}
    </div>
  );
}

export default Like;
