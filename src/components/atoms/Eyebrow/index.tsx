interface EyebrowProps {
  children: string
  showDot?: boolean
  className?: string
}

export function Eyebrow({ children, showDot = true, className = '' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3 ${className}`}>
      {showDot && (
        <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse-dot flex-shrink-0" />
      )}
      {children}
    </div>
  )
}
