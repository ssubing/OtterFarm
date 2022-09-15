import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../Noti/Noti.css";

// checkbox with label
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const noties = [
  {
    userId: "최수빈",
    nftName: "벌크업 수달",
    msg: "좋아요를 눌렀습니다.",
  },
  {
    userId: "이선민",
    nftName: "벌크업 수달",
    msg: "분양요청을 하였습니다.",
  },
  {
    userId: "최수빈",
    nftName: "벌크업 수달",
    msg: "좋아요를 눌렀습니다.",
  },
];

function Noti() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="noti">
        <div className="shop-title">알림내용</div>
        <div className="noti-list">
          {noties.length === 0 && (
            <div className="noti-item">알림이 없습니다.</div>
          )}
          {noties.map((noti) => (
            <FormGroup style={{ marginBottom: "40px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{
                      color: "#C08552",
                    }}
                  />
                }
                label={
                  <div className="noti-item">
                    {noti.userId} 님이 내 수달({noti.nftName})에 {noti.msg}
                  </div>
                }
              />
              <div className="line"></div>
            </FormGroup>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Noti;
