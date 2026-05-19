import logoSrc from '@/assets/pulsing logo Site.png'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Pulsing"
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  )
}
