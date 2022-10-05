import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import { useDispatch, useSelector } from "react-redux";
import shop from "../../api/shop";
// import { setNftLikeOne } from "../../store/modules/shop";

function Like(props) {
  const nftId = props.nftId 
  //좋아요 클릭
  const likeClick = () => {
    // console.log(likeFlag)
    // console.log(props.likeCnt)
    const params = {
      nftId : nftId,
      likeCount : props.likeCnt
    }
      shop
      .nftLikeOne(params)
      .then((result) => {
          // dispatch(setNftLikeOne(result.data))
          window.location.reload()
          console.log(result)
      })
      .catch((error) => {
          console.log(error);
      });
    
  }
  
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }} onClick={likeClick}>
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
