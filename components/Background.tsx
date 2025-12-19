import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDark = document.documentElement.classList.contains('dark');

    // Watch for theme changes to update canvas colors dynamically
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
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const particleCount = 50;
    const connectionDistance = 160;
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      phase: number;
    }

    const particles: Particle[] = [];
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // Slow, smooth drift
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Animation State
    let rotation = 0;

    // Helper: Draw Hexagon
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

    // Helper: Draw Internal "Cube" Lines
    const drawCubeLines = (x: number, y: number, radius: number, strokeStyle: string, rotationOffset: number) => {
       ctx.beginPath();
       // Connect center to every other vertex to make a cube projection (Y shape)
       for (let i = 0; i < 3; i++) {
         const angle = rotationOffset + (i * Math.PI * 2) / 3 + Math.PI / 6; // Offset to match vertices
         const ex = x + radius * Math.cos(angle);
         const ey = y + radius * Math.sin(angle);
         ctx.moveTo(x, y);
         ctx.lineTo(ex, ey);
       }
       ctx.strokeStyle = strokeStyle;
       ctx.lineWidth = 1;
       ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Define Colors based on Theme
      const nodeColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.4)';
      const lineColor = isDark ? '99, 102, 241' : '148, 163, 184'; // Indigo vs Slate
      const lineOpacityBase = isDark ? 0.15 : 0.2;
      
      // -- Draw Particles & Connections --
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01;

        // Wrap around screen
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Draw Node
        const pulse = 1 + Math.sin(p.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Draw Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / connectionDistance) * lineOpacityBase;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // -- Draw Central Geometric Tech Element --
      const cx = width / 2;
      const cy = height / 2;
      rotation += 0.0015;

      // Outer slowly rotating ring
      drawHexagon(cx, cy, 200, isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.03)', 1, rotation);
      
      // Middle "Cube" Structure
      const cubeSize = 80;
      // We orient it such that points are up/down to look like a cube
      const cubeRotation = -rotation * 1.5; 
      drawHexagon(cx, cy, cubeSize, isDark ? 'rgba(45, 212, 191, 0.3)' : 'rgba(13, 148, 136, 0.15)', 1.5, cubeRotation);
      drawCubeLines(cx, cy, cubeSize, isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(13, 148, 136, 0.1)', cubeRotation);
      
      // Small orbiting satellite
      const satDist = 140;
      const satX = cx + Math.cos(rotation * 2) * satDist;
      const satY = cy + Math.sin(rotation * 2) * satDist;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(45, 212, 191, 0.8)' : 'rgba(13, 148, 136, 0.6)';
      ctx.fill();

      // Connecting line from center to satellite
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(satX, satY);
      ctx.strokeStyle = isDark ? 'rgba(45, 212, 191, 0.1)' : 'rgba(13, 148, 136, 0.05)';
      ctx.setLineDash([5, 15]); // Dotted line
      ctx.stroke();
      ctx.setLineDash([]); // Reset

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
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Background;