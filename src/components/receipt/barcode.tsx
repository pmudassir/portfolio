import { code128B } from "./code128";

// A real, scannable Code 128 barcode of `value`, drawn as SVG bars.
export function Barcode({ value, className = "" }: { value: string; className?: string }) {
  const widths = code128B(value);
  const quiet = 10;
  const total = widths.reduce((a, b) => a + b, 0) + quiet * 2;
  let x = quiet;
  const bars: { x: number; w: number }[] = [];
  widths.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x, w });
    x += w;
  });

  return (
    <svg viewBox={`0 0 ${total} 40`} preserveAspectRatio="none" className={className} role="img" aria-label={`Barcode: ${value}`}>
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={0} width={b.w} height={40} fill="currentColor" />
      ))}
    </svg>
  );
}
