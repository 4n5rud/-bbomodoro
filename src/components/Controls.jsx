export default function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {isRunning ? (
        <button
          onClick={onPause}
          className="rounded-2xl px-8 py-3 text-base font-medium text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: "var(--accent)" }}
        >
          일시정지
        </button>
      ) : (
        <button
          onClick={onStart}
          className="rounded-2xl px-8 py-3 text-base font-medium text-white transition-transform active:scale-[0.97]"
          style={{ backgroundColor: "var(--accent)" }}
        >
          시작
        </button>
      )}
      <button
        onClick={onReset}
        className="rounded-2xl px-6 py-3 text-base font-medium transition-transform active:scale-[0.97]"
        style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
      >
        리셋
      </button>
    </div>
  );
}
