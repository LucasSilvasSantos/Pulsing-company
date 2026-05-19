import laptopImg from '@/assets/laptop.webp'
import { Badge } from '@/components/atoms/Badge'

export function ShowcaseArt() {
  return (
    <div
      className="relative rounded-block border border-line overflow-hidden grid-texture"
      style={{
        minHeight: '540px',
        background: `
          radial-gradient(ellipse 30% 30% at 100% 50%, rgba(255,26,26,0.18), transparent 60%),
          radial-gradient(ellipse 15% 15% at 20% 100%, rgba(255,26,26,0.12), transparent 60%),
          linear-gradient(135deg, #1a1a1a 0%, #050505 60%)
        `,
      }}
    >
      {/* Badge top-left */}
      <div className="absolute top-5 left-5 z-10">
        <Badge>Plataforma · Live</Badge>
      </div>

      {/* Corner label top-right */}
      <div className="absolute top-5 right-5 z-10 flex flex-col items-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-4">Velocity</span>
        <span className="font-sans text-[14px] font-medium text-fg">+4.8×</span>
      </div>

      {/* Ghost number */}
      <div
        className="absolute bottom-6 left-6 font-sans leading-none pointer-events-none select-none"
        style={{
          fontSize: '100px',
          fontWeight: 200,
          color: 'rgba(255,255,255,0.08)',
        }}
      >
        01
      </div>

      {/* Laptop image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={laptopImg}
          alt="Dashboard de performance — Pulsing"
          loading="eager"
          decoding="async"
          className="animate-showcase-float"
          style={{
            width: '92%',
            height: 'auto',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(255,26,26,0.3))',
          }}
        />
      </div>
    </div>
  )
}
