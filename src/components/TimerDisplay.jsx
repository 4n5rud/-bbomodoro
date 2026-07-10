function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const MODE_LABEL = {
  focus: "집중 중",
  short: "짧은 휴식",
  long: "긴 휴식",
};

export default function TimerDisplay({ mode, secondsLeft }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="font-mono font-bold leading-none tabular-nums"
        style={{ color: "var(--accent)", fontSize: "clamp(4rem, 18vw, 8rem)" }}
      >
        {formatTime(secondsLeft)}
      </p>
      <p className="text-sm tracking-wide" style={{ color: "var(--text-muted)" }}>
        {MODE_LABEL[mode]}
      </p>
    </div>
  );
}
