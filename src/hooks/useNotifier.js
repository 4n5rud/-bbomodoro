import { useCallback, useEffect, useRef } from "react";

function playBeep(audioCtxRef) {
  if (!audioCtxRef.current) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new Ctx();
  }
  const ctx = audioCtxRef.current;
  const now = ctx.currentTime;

  [880, 1108].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const start = now + i * 0.18;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.34);
  });
}

export function useNotifier(soundOn) {
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const notify = useCallback(
    (title, body) => {
      if (soundOn) {
        try {
          playBeep(audioCtxRef);
        } catch {
          // audio unavailable, ignore
        }
      }
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body, icon: "/tomato.svg" });
      }
    },
    [soundOn],
  );

  return notify;
}
