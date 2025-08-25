import React, { useEffect, useRef } from "react";

interface DotGridBackgroundProps {
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  className?: string;
}

const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
  dotColor = "rgba(0, 0, 0, 0.15)",
  dotSize = 1,
  dotSpacing = 20,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    const drawDots = () => {
      if (!canvas || !ctx) return;
      

      const parentElement = canvas.parentElement;
      if (!parentElement) return;
      
      const width = parentElement.clientWidth;
      const height = parentElement.clientHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      ctx.clearRect(0, 0, width, height);
      
      const offsetX = dotSpacing / 2;
      const offsetY = dotSpacing / 2;
      
      const numDotsX = Math.ceil(width / dotSpacing) + 1;
      const numDotsY = Math.ceil(height / dotSpacing) + 1;
      
      ctx.fillStyle = dotColor;
      
      for (let y = 0; y < numDotsY; y++) {
        for (let x = 0; x < numDotsX; x++) {
          ctx.beginPath();
          ctx.arc(
            offsetX + x * dotSpacing,
            offsetY + y * dotSpacing,
            dotSize,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      
      const gridLineColor = "rgba(0, 0, 0, 0.05)";
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = 0.5;
      
      for (let y = 0; y < numDotsY; y++) {
        ctx.beginPath();
        ctx.moveTo(0, offsetY + y * dotSpacing);
        ctx.lineTo(width, offsetY + y * dotSpacing);
        ctx.stroke();
      }
      
      for (let x = 0; x < numDotsX; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * dotSpacing, 0);
        ctx.lineTo(offsetX + x * dotSpacing, height);
        ctx.stroke();
      }
    };
    
    drawDots();
    
    const handleResize = () => {
      window.requestAnimationFrame(drawDots);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dotColor, dotSize, dotSpacing]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`dot-grid-background absolute top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ backgroundColor: '#ffffff' }}
      aria-hidden="true"
    />
  );
};

export default DotGridBackground;
