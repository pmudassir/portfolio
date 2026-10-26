// SVG filters that make web text look thermal-printed: slightly ragged glyph edges, and for the
// big name, ink dropout where the print head ran dry. Referenced from CSS as url(#thermal) etc.
export function ThermalFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="thermal" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.3" />
      </filter>
      <filter id="thermal-heavy" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" result="rough" />
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" seed="11" result="dropout" />
        <feComponentTransfer in="dropout" result="holes">
          <feFuncA type="discrete" tableValues="1 1 1 1 1 1 0 1" />
        </feComponentTransfer>
        <feComposite in="rough" in2="holes" operator="in" />
      </filter>
      <filter id="stamp-ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" result="rough" />
        <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="9" result="blot" />
        <feComponentTransfer in="blot" result="holes">
          <feFuncA type="discrete" tableValues="1 1 1 0.85 1 0.6 1 1" />
        </feComponentTransfer>
        <feComposite in="rough" in2="holes" operator="in" />
      </filter>
    </svg>
  );
}
