interface LogoProps {
  compact?: boolean
  className?: string
}

export function Logo({ compact = false, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <div
        className="w-7 h-7 rounded-[8px] relative flex-shrink-0"
        style={{
          background: 'radial-gradient(circle at 50% 85%, #2a2a2a 0%, #0a0a0a 100%)',
        }}
      >
        <span
          className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"
          style={{ boxShadow: '0 0 8px rgba(255,26,26,0.8)' }}
        />
      </div>
      {!compact && (
        <span className="font-sans font-semibold text-base text-fg tracking-[-0.01em]">
          Pulsing
        </span>
      )}
    </div>
  )
}
