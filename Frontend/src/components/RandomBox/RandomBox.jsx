import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RandomBox.css";
import axios from "axios";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const apiUrl = "http://j7a606.p.ssafy.io:8080/";
const RandomBox = ({ showBox, setShowBox, part, showImg, setShowImg }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showBox && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
        >
          <div className="modal">
            {!showImg ? (
              <img
                className="giftBox"
                alt="giftbox"
                src={require("../../assets/images/present.png")}
              />
            ) : (
              <div className="gottenItem">
                <img
                  className="itemImg"
                  src={require("../../assets/images/items/Cloth/05_01_01_01.png")}
                  alt="gottenItem"
                />
                <img
                  className="lightImg"
                  src={require("../../assets/images/light.png")}
                  alt="light"
                />
                <button
                  onClick={() => {
                    setShowBox(false);
                    setShowImg(false);
                  }}
                  className="btn"
                  style={{ zIndex: "3" }}
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RandomBox;
