export function Mark({ className }: { className?: string }) {
  const dots = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
    return { x: 16 + Math.cos(a) * 11, y: 16 + Math.sin(a) * 11 };
  });
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.35" fill="currentColor" opacity="0.72" />
      ))}
    </svg>
  );
}
