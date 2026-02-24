
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDark = document.documentElement.classList.contains('dark');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const particleCount = 40;
    const connectionDistance = 150;
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      phase: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
      });
    }

    let rotation = 0;

    const drawHexagon = (x: number, y: number, radius: number, strokeStyle: string, lineWidth: number, rotationOffset: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotationOffset + (i * Math.PI) / 3;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const nodeColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(71, 85, 105, 0.2)';
      const lineColor = isDark ? '99, 102, 241' : '148, 163, 184';
      const lineOpacityBase = isDark ? 0.1 : 0.15;
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.005;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        const pulse = 1 + Math.sin(p.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;

          if (dist < connectionDistance * connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - Math.sqrt(dist) / connectionDistance) * lineOpacityBase;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      const cx = width / 2;
      const cy = height / 2;
      rotation += 0.001;

      drawHexagon(cx, cy, 180, isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)', 1, rotation);
      drawHexagon(cx, cy, 70, isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(13, 148, 136, 0.1)', 1, -rotation * 1.5);
      
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 select-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;
