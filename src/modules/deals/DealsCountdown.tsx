"use client";

import { useState, useEffect } from "react";

interface DealsCountdownProps {
  targetHours?: number; // hours from now
  compact?: boolean;
}

export function DealsCountdown({ targetHours = 14, compact = false }: DealsCountdownProps) {
  // Set target timestamp once mounted
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 13, minutes: 42, seconds: 18 });

  useEffect(() => {
    // Calculate target end time (persist in session or calculate fixed future target)
    const targetTime = Date.now() + targetHours * 3600 * 1000;

    const interval = setInterval(() => {
      const diff = Math.max(0, targetTime - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetHours]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full shadow-xs">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Ends in {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3" aria-label="Flash sale timer">
      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card/90 backdrop-blur-md border border-flow-cyan/30 shadow-glow-cyan flex items-center justify-center">
          <span className="font-mono text-lg sm:text-xl font-extrabold text-flow-cyan-light">
            {pad(timeLeft.hours)}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground mt-1">
          Hours
        </span>
      </div>

      <span className="text-xl font-bold text-flow-cyan animate-pulse pb-4">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card/90 backdrop-blur-md border border-flow-cyan/30 shadow-glow-cyan flex items-center justify-center">
          <span className="font-mono text-lg sm:text-xl font-extrabold text-flow-cyan-light">
            {pad(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground mt-1">
          Mins
        </span>
      </div>

      <span className="text-xl font-bold text-flow-cyan animate-pulse pb-4">:</span>

      {/* Seconds */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card/90 backdrop-blur-md border border-amber-500/40 shadow-sm flex items-center justify-center bg-amber-500/10">
          <span className="font-mono text-lg sm:text-xl font-extrabold text-amber-400">
            {pad(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 mt-1">
          Secs
        </span>
      </div>
    </div>
  );
}
