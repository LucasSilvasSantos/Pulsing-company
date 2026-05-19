export function ChartUp() {
  return (
    <svg width="120" height="64" viewBox="0 0 120 64" fill="none">
      <defs>
        <linearGradient id="areaUpGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF1A1A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 56 C20 52, 40 44, 60 34 C80 24, 100 16, 120 8"
        stroke="#FF1A1A"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 56 C20 52, 40 44, 60 34 C80 24, 100 16, 120 8 L120 64 L0 64 Z"
        fill="url(#areaUpGrad)"
      />
    </svg>
  )
}

export function ChartRise() {
  return (
    <svg width="120" height="64" viewBox="0 0 120 64" fill="none">
      <defs>
        <linearGradient id="areaRiseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF1A1A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 58 C15 55, 30 50, 50 42 C70 32, 85 22, 100 14 C108 10, 114 6, 120 4"
        stroke="#FF1A1A"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 58 C15 55, 30 50, 50 42 C70 32, 85 22, 100 14 C108 10, 114 6, 120 4 L120 64 L0 64 Z"
        fill="url(#areaRiseGrad)"
      />
      <circle cx="120" cy="4" r="3" fill="#FF1A1A" />
    </svg>
  )
}

export function ChartBars() {
  const values = [22, 30, 28, 42, 38, 56, 64, 60, 78, 72, 90, 86]
  const max = 90
  const w = 120
  const h = 64
  const gap = 2
  const barW = (w - gap * (values.length - 1)) / values.length
  const redStart = values.length - 4

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      {values.map((v, i) => {
        const barH = (v / max) * h
        const x = i * (barW + gap)
        const y = h - barH
        const isRed = i >= redStart
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx="2"
            fill={isRed ? '#FF1A1A' : 'rgba(255,255,255,0.25)'}
            opacity={isRed ? 1 : 0.8}
          />
        )
      })}
    </svg>
  )
}
