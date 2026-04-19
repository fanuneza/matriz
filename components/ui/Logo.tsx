export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="13.5" stroke="#e8a020" strokeWidth="1.5" />

      {/* 3×3 dot grid — the "matrix" */}
      {/* Row 1 */}
      <circle cx="10" cy="10" r="1.4" fill="#e8a020" fillOpacity="0.35" />
      <circle cx="16" cy="10" r="1.4" fill="#e8a020" fillOpacity="0.7" />
      <circle cx="22" cy="10" r="1.4" fill="#e8a020" fillOpacity="0.35" />
      {/* Row 2 */}
      <circle cx="10" cy="16" r="1.4" fill="#e8a020" fillOpacity="0.7" />
      <circle cx="16" cy="16" r="2.6" fill="#e8a020" />
      <circle cx="22" cy="16" r="1.4" fill="#e8a020" fillOpacity="0.7" />
      {/* Row 3 */}
      <circle cx="10" cy="22" r="1.4" fill="#e8a020" fillOpacity="0.35" />
      <circle cx="16" cy="22" r="1.4" fill="#e8a020" fillOpacity="0.7" />
      <circle cx="22" cy="22" r="1.4" fill="#e8a020" fillOpacity="0.35" />
    </svg>
  );
}
