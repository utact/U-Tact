"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  connections: number[];
  brightness: number;
  twinkleSpeed: number;
}

interface ConstellationProps {
  height: number;
}

export function Constellation({ height }: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // observe class changes on the document element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createNodes = () => {
      if (canvas.width === 0 || canvas.height === 0) return;

      const nodeCount = isDarkMode ? 25 : 20;
      const nodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * (canvas.width - 20) + 10,
          y: Math.random() * (canvas.height - 20) + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 2,
          connections: [],
          brightness: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // generate random connections
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 3) + 2;
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * nodes.length);
          if (targetIndex !== i && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex);
          }
        }
      });

      nodesRef.current = nodes;
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      // draw background
      if (isDarkMode) {
        // dark mode: starry background
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, "#1e293b");
        gradient.addColorStop(1, "#0f172a");
        ctx.fillStyle = gradient;
      } else {
        // light mode: soft background
        ctx.fillStyle = "#f8fafc";
      }

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // detect boundaries and bounce
        if (node.x <= 5 || node.x >= canvas.width - 5) node.vx *= -1;
        if (node.y <= 5 || node.y >= canvas.height - 5) node.vy *= -1;

        node.x = Math.max(5, Math.min(canvas.width - 5, node.x));
        node.y = Math.max(5, Math.min(canvas.height - 5, node.y));

        // effect for twinkling stars
        if (isDarkMode) {
          node.brightness += node.twinkleSpeed;
          if (node.brightness > 1) {
            node.brightness = 1;
            node.twinkleSpeed = -Math.abs(node.twinkleSpeed);
          } else if (node.brightness < 0.3) {
            node.brightness = 0.3;
            node.twinkleSpeed = Math.abs(node.twinkleSpeed);
          }
        }
      });

      // draw connections
      nodes.forEach((node) => {
        node.connections.forEach((targetIndex) => {
          if (targetIndex < nodes.length) {
            const target = nodes[targetIndex];
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            );
            const maxDistance = 120;

            if (distance < maxDistance) {
              const opacity = ((maxDistance - distance) / maxDistance) * 0.4;

              if (isDarkMode) {
                ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
              } else {
                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
              }

              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            }
          }
        });
      });

      // draw nodes
      nodes.forEach((node) => {
        if (isDarkMode) {
          // star effect
          const brightness = node.brightness;

          // glow
          ctx.fillStyle = `rgba(147, 197, 253, ${brightness * 0.3})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
          ctx.fill();

          // star
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();

          // cross lines for larger stars
          if (node.size > 2.5) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x - node.size * 1.5, node.y);
            ctx.lineTo(node.x + node.size * 1.5, node.y);
            ctx.moveTo(node.x, node.y - node.size * 1.5);
            ctx.lineTo(node.x, node.y + node.size * 1.5);
            ctx.stroke();
          }
        } else {
          // light mode: nodes
          ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // initial setup
    resizeCanvas();
    createNodes();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createNodes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden rounded-lg border bg-slate-50 dark:bg-slate-900"
          style={{ minHeight: "200px" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* overlay information */}
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <div className="text-xs text-center bg-background/90 backdrop-blur-sm rounded-md px-3 py-2 text-muted-foreground border">
              {isDarkMode ? "🌟 별자리 네트워크" : "🔗 연결된 네트워크"}
            </div>
          </div>
        </div>

        {/* bottom information */}
        <div className="flex justify-between text-xs text-muted-foreground mt-3 pt-2 border-t">
          <span>노드: {isDarkMode ? "25개" : "20개"}</span>
          <span>실시간 애니메이션</span>
        </div>
      </CardContent>
    </Card>
  );
}
