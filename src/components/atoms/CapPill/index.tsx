interface CapPillProps {
  children: string
  className?: string
}

export function CapPill({ children, className = '' }: CapPillProps) {
  return (
    <span
      className={`
        inline-flex items-center px-[18px] py-[10px] rounded-full
        bg-white/[0.03] border border-line-2
        text-[13.5px] text-fg-2 tracking-[-0.005em]
        transition-all duration-200 cursor-default
        hover:bg-accent/[0.12] hover:border-accent/40 hover:-translate-y-0.5 hover:text-fg
        ${className}
      `}
    >
      {children}
    </span>
  )
}
