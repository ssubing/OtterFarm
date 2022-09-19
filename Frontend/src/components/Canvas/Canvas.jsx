import React, { useEffect, useRef, useState } from 'react'
import otter from "../../assets/images/otter.png"
const Canvas = ()=> {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [ctx, setCtx] = useState();

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
     
        const image = new Image();
        image.src =otter;
        setCtx(contextRef.current);

        image.onload= ()=> {
          context.drawImage(image, 0,0, 200, 400);
        }
    })
  return (
    <canvas ref ={canvasRef} width={200} height={400}></canvas>
  )
}

export default Canvas