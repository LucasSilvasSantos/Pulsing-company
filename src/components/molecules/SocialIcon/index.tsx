import type { ReactNode, AnchorHTMLAttributes } from 'react'

interface SocialIconProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode
  label: string
  href: string
}

export function SocialIcon({ icon, label, href, className = '', ...rest }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-10 h-10 rounded-[12px] border border-line
        flex items-center justify-center
        text-fg-3 text-lg
        transition-all duration-200
        hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 hover:bg-accent/[0.08]
        ${className}
      `}
      {...rest}
    >
      {icon}
    </a>
  )
}
