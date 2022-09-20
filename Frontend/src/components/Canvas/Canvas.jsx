import React, { useEffect, useRef, useState } from "react";

const Canvas = ({ url, width, height, url2 }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    console.log(url);
    const image = new Image();
    image.src = url;
    setCtx(contextRef.current);

    image.onload = () => {
      context.drawImage(image, 0, 0, width, height);
    };
  }, []);

  const addToCanvas = (ctx, image, x, y) => {
    let img = new Image();
    img.src = url2;
    img.onload = function () {
      ctx.drawImage(img, 9, 9);
    };
  };
  useEffect(() => {
    addToCanvas();
    console.log("Added");
  }, []);
  return (
    <canvas
      id="myCanvas"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};

export default Canvas;
