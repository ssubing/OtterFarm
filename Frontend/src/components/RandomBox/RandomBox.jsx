import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RandomBox.css";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

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
              <div>
                <img
                  className="gottenItem"
                  src={require("../../assets/images/items/Cloth/cloth_01.png")}
                  alt="gottenItem"
                />
                <button
                  onClick={() => {
                    setShowBox(false);
                    setShowImg(false);
                  }}
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
