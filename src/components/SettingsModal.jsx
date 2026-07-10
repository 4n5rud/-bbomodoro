function NumberField({ label, value, onChange, min = 1, max = 120 }) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm">
      <span style={{ color: "var(--text)" }}>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 rounded-lg px-2 py-1 text-right"
        style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)" }}
      />
    </label>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm">
      <span style={{ color: "var(--text)" }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="h-6 w-11 rounded-full transition-colors"
        style={{ backgroundColor: checked ? "var(--accent)" : "var(--line)" }}
      >
        <span
          className="block h-5 w-5 rounded-full bg-white transition-transform"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </label>
  );
}

export default function SettingsModal({ settings, onUpdate, onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl p-6 shadow-xl"
        style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
      >
        <h2 className="mb-5 text-lg font-semibold" style={{ color: "var(--text)" }}>
          설정
        </h2>

        <div className="flex flex-col gap-4">
          <NumberField
            label="집중 시간 (분)"
            value={settings.focusMin}
            onChange={(v) => onUpdate({ focusMin: v })}
          />
          <NumberField
            label="짧은 휴식 (분)"
            value={settings.shortBreakMin}
            onChange={(v) => onUpdate({ shortBreakMin: v })}
          />
          <NumberField
            label="긴 휴식 (분)"
            value={settings.longBreakMin}
            onChange={(v) => onUpdate({ longBreakMin: v })}
          />
          <div className="my-1 h-px" style={{ backgroundColor: "var(--line)" }} />
          <ToggleField
            label="알림음"
            checked={settings.soundOn}
            onChange={(v) => onUpdate({ soundOn: v })}
          />
          <ToggleField
            label="다크 모드"
            checked={settings.darkMode}
            onChange={(v) => onUpdate({ darkMode: v })}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl py-2.5 text-sm font-medium text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
