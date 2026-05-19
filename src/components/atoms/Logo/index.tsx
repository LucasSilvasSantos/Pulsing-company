import logoSrc from '@/assets/pulsing logo Site.png'

interface LogoProps {
  compact?: boolean
  className?: string
}

export function Logo({ compact = false, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        style={{
          width: 52,
          height: 64,
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <img
          src={logoSrc}
          alt="Pulsing"
          style={{
            position: 'absolute',
            width: 90,
            height: 90,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'contain',
          }}
        />
      </div>

      
        
    
    </div>
  )
}
