interface BadgeProps {
  children: string
  showDot?: boolean
  className?: string
}

export function Badge({ children, showDot = true, className = '' }: BadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-3 py-1.5 rounded-full
        bg-black/50 border border-line-2
        font-mono text-[10px] uppercase tracking-[0.15em] text-fg-2
        backdrop-blur-sm
        ${className}
      `}
    >
      {showDot && (
        <span className="w-[5px] h-[5px] rounded-full bg-accent animate-pulse-dot flex-shrink-0" />
      )}
      {children}
    </div>
  )
}
