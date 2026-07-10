export default function SessionDots({ filled, total }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: i < filled ? "var(--accent)" : "transparent",
            border: "2px solid var(--accent)",
            opacity: i < filled ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}
