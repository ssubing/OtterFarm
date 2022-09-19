import React, { useEffect, useRef, useState } from 'react'

const Canvas = ()=> {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [ctx, setCtx] = useState();

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;

        setCtx(contextRef.current);
    },[])
  return (
    <canvas ref ={canvasRef}></canvas>
  )
}

export default Canvas