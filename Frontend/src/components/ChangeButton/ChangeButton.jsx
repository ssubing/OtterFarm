import React from "react";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
function ChangeButton({ handleUrl, url, issaled }) {
  const uri = url;
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
      <button
        style={{
          backgroundColor: "#DAB49D",
          borderRadius: "10px",
          fontFamily: "neo",
          border: "none",
          height: "5vh",
          marginTop: "10%",
          marginBottom: "5%",
          cursor: "pointer",
        }}
        onClick={() => {
          if (issaled) {
            alert("판매중인 상품입니다.");
          } else {
            handleUrl(uri);
          }
        }}
      >
        대표수달지정
      </button>
    </motion.div>
  );
}

export default ChangeButton;
