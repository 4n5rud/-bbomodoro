import { useEffect, useRef, useState } from "react";

function durationFor(mode, settings) {
  if (mode === "focus") return settings.focusMin * 60;
  if (mode === "short") return settings.shortBreakMin * 60;
  return settings.longBreakMin * 60;
}

export function useTimer(settings, { onFocusComplete, onModeComplete } = {}) {
  const [mode, setMode] = useState("focus");
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(() => durationFor("focus", settings));

  const remainingRef = useRef(remaining);
  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  const advanceModeRef = useRef();
  advanceModeRef.current = () => {
    if (mode === "focus") {
      onFocusComplete?.();
      const nextCycleIndex = (cycleIndex + 1) % settings.longBreakInterval;
      const nextMode = nextCycleIndex === 0 ? "long" : "short";
      onModeComplete?.(nextMode);
      setCycleIndex(nextCycleIndex);
      setMode(nextMode);
      setRemaining(durationFor(nextMode, settings));
    } else {
      onModeComplete?.("focus");
      setMode("focus");
      setRemaining(durationFor("focus", settings));
    }
  };

  // Keep the displayed duration in sync with settings while idle/paused.
  useEffect(() => {
    if (!isRunning) {
      setRemaining(durationFor(mode, settings));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.focusMin, settings.shortBreakMin, settings.longBreakMin, mode]);

  // Wall-clock driven countdown: robust against duplicate effect runs (StrictMode/HMR)
  // since every tick recomputes from a fixed end timestamp instead of decrementing.
  useEffect(() => {
    if (!isRunning) return undefined;

    const endAt = Date.now() + remainingRef.current * 1000;

    const tick = () => {
      const secs = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setRemaining(secs);
    };

    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [isRunning, mode]);

  // Fires the transition exactly once per zero-crossing.
  useEffect(() => {
    if (isRunning && remaining === 0) {
      advanceModeRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, remaining]);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setRemaining(durationFor(mode, settings));
  }

  return {
    mode,
    secondsLeft: remaining,
    isRunning,
    cycleIndex,
    longBreakInterval: settings.longBreakInterval,
    start,
    pause,
    reset,
  };
}
