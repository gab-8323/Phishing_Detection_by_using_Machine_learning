
import React, { useEffect, useRef } from 'react';

interface MatrixColumn {
  x: number;
  y: number;
  chars: string[];
  speed: number;
  opacity: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GlobalBackgroundProps {
  isDanger?: boolean;
  isSafe?: boolean;
}

const GlobalBackground: React.FC<GlobalBackgroundProps> = ({ isDanger = false, isSafe = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    let columns: MatrixColumn[] = [];
    let networkNodes: Node[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Matrix columns
      columns = [];
      const fontSize = 16;
      const columnCount = Math.floor(width / fontSize);
      for (let i = 0; i < columnCount; i++) {
        columns.push({
          x: i * fontSize,
          y: Math.random() * -height,
          chars: Array.from({ length: 25 }, () => (Math.random() > 0.5 ? '0' : '1')),
          speed: 4 + Math.random() * 8,
          opacity: 0.3 + Math.random() * 0.5
        });
      }

      // Network nodes
      networkNodes = [];
      const nodeCount = 60;
      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6
        });
      }
    };

    const drawGrid = (color: string) => {
      const gridSize = 60;
      const time = Date.now() * 0.001;
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      
      // Vertical Lines
      for (let x = 0; x <= width; x += gridSize) {
        const opacity = 0.08 + Math.sin(time + x * 0.01) * 0.05;
        ctx.globalAlpha = opacity;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      // Horizontal Lines
      for (let y = 0; y <= height; y += gridSize) {
        const opacity = 0.08 + Math.sin(time + y * 0.01) * 0.05;
        ctx.globalAlpha = opacity;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Signal pulses traveling along the grid
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 2;
      const pulseX = (time * 150) % width;
      ctx.beginPath();
      ctx.moveTo(pulseX, 0);
      ctx.lineTo(pulseX, height);
      ctx.stroke();

      const pulseY = (time * 150) % height;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
    };

    const drawAmbientGlow = (color: string) => {
      ctx.globalCompositeOperation = 'screen';
      
      // Multiple light pools to brighten the background
      const pools = [
        { x: width * 0.15, y: height * 0.25, r: 500, alpha: 0.15 },
        { x: width * 0.85, y: height * 0.75, r: 600, alpha: 0.15 },
        { x: width * 0.5, y: height * 0.5, r: 400, alpha: 0.1 },
        { x: mouseRef.current.x, y: mouseRef.current.y, r: 350, alpha: 0.2 }
      ];

      pools.forEach(pool => {
        const grad = ctx.createRadialGradient(pool.x, pool.y, 0, pool.x, pool.y, pool.r);
        grad.addColorStop(0, `${color}${Math.floor(pool.alpha * 255).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      ctx.globalCompositeOperation = 'source-over';
    };

    const drawMatrix = (color: string) => {
      ctx.font = 'bold 14px JetBrains Mono';
      columns.forEach(col => {
        col.chars.forEach((char, i) => {
          if (i === 0) {
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.9;
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
          } else {
            ctx.fillStyle = color;
            ctx.globalAlpha = col.opacity * (1 - i / 25);
            ctx.shadowBlur = 0;
          }
          ctx.fillText(char, col.x, col.y + (i * 18));
        });

        col.y += col.speed;
        if (col.y > height) {
          col.y = -450;
          col.speed = 4 + Math.random() * 8;
        }
      });
    };

    const drawNetwork = (color: string) => {
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;

      networkNodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < networkNodes.length; j++) {
          const other = networkNodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - dist / 180) * 0.3;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      ctx.fillStyle = isDanger ? '#0a0003' : '#01080b';
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);

      const themeColor = isDanger ? '#ff003c' : (isSafe ? '#00ffa2' : '#00f2ff');

      drawAmbientGlow(themeColor);
      drawGrid(themeColor);
      drawMatrix(themeColor);
      drawNetwork(themeColor);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDanger, isSafe]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none block"
      style={{ 
        zIndex: -1, 
        imageRendering: 'auto'
      }}
    />
  );
};

export default GlobalBackground;
