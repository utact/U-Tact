"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <div className="w-6 h-6 bg-muted rounded animate-pulse" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-12 h-12 p-0 hover:bg-muted/50"
    >
      <Image
        src={
          resolvedTheme === "light"
            ? "/images/tact_light.png"
            : "/images/tact_dark.png"
        }
        alt="Theme toggle"
        width={24}
        height={24}
        className="w-10 h-10 transition-all"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
