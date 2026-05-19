import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'link'
type Size = 'default' | 'compact' | 'cta'

interface BaseProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?: 'button'
}

interface AnchorProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  as: 'a'
  href: string
}

type Props = ButtonProps | AnchorProps

const sizeClasses: Record<Size, string> = {
  default: 'px-6 py-[13px] text-[13px]',
  compact: 'px-4 py-[10px] text-[13px]',
  cta: 'px-[30px] py-[17px] text-[13px]',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-accent to-accent-deep text-white shadow-btn-red hover:shadow-btn-red-hover active:scale-[0.98]',
  ghost:
    'border border-line-3 text-fg-2 hover:text-fg hover:border-line bg-transparent',
  link: 'text-fg-2 underline underline-offset-4 hover:text-accent bg-transparent !px-0 !py-0',
}

export function Button(props: Props) {
  const { variant = 'primary', size = 'default', children, className = '' } = props

  const base =
    'inline-flex items-center gap-2 rounded-full font-medium tracking-[-0.005em] transition-all duration-200 will-change-transform cursor-pointer'
  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (props.as === 'a') {
    const { as: _, variant: _v, size: _s, className: _cl, ...rest } = props
    return <a {...rest} className={classes}>{children}</a>
  }

  const { as: _, variant: _v, size: _s, className: _cl, ...rest } = props as ButtonProps
  return <button {...rest} className={classes}>{children}</button>
}
