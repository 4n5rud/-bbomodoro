import { useEffect, useState } from "react";
import { useSettings } from "./hooks/useSettings";
import { useTodayCount } from "./hooks/useTodayCount";
import { useTimer } from "./hooks/useTimer";
import { useNotifier } from "./hooks/useNotifier";
import SessionDots from "./components/SessionDots";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import SettingsModal from "./components/SettingsModal";

const MODE_TITLE = {
  focus: "포모도로",
  short: "짧은 휴식",
  long: "긴 휴식",
};

function App() {
  const { settings, updateSettings } = useSettings();
  const { count, increment } = useTodayCount();
  const notify = useNotifier(settings.soundOn);
  const [showSettings, setShowSettings] = useState(false);

  const timer = useTimer(settings, {
    onFocusComplete: increment,
    onModeComplete: (nextMode) => {
      if (nextMode === "focus") {
        notify("휴식 끝!", "다시 집중할 시간이에요.");
      } else if (nextMode === "long") {
        notify("긴 휴식 시작", "푹 쉬어가세요.");
      } else {
        notify("집중 끝!", "잠깐 쉬어가세요.");
      }
    },
  });

  const isBreak = timer.mode !== "focus";

  useEffect(() => {
    document.documentElement.dataset.mode = isBreak ? "break" : "focus";
  }, [isBreak]);

  useEffect(() => {
    document.title = `${timer.isRunning ? "▶ " : ""}${MODE_TITLE[timer.mode]} · Pomodoro`;
  }, [timer.isRunning, timer.mode]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-6 py-8">
      <header className="flex w-full max-w-md items-center justify-between">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          오늘 완료: {count}개
        </p>
        <button
          aria-label="설정"
          onClick={() => setShowSettings(true)}
          className="rounded-full p-2 text-lg transition-transform active:scale-[0.9]"
          style={{ color: "var(--text-muted)" }}
        >
          ⚙
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10">
        <SessionDots filled={timer.cycleIndex} total={timer.longBreakInterval} />
        <TimerDisplay mode={timer.mode} secondsLeft={timer.secondsLeft} />
        <Controls
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
        />
      </main>

      <footer className="h-4" />

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
