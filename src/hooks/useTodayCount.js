import { useEffect, useState } from "react";

const STORAGE_KEY = "pomodoro-today";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function loadCount() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (raw && raw.date === todayString()) return raw.count;
    return 0;
  } catch {
    return 0;
  }
}

export function useTodayCount() {
  const [count, setCount] = useState(loadCount);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayString(), count }));
  }, [count]);

  function increment() {
    setCount((prev) => prev + 1);
  }

  return { count, increment };
}
