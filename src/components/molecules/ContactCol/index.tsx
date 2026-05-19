import type { ReactNode } from 'react'

interface ContactColProps {
  title: string
  children: ReactNode
  className?: string
}

export function ContactCol({ title, children, className = '' }: ContactColProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3">{title}</h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}
