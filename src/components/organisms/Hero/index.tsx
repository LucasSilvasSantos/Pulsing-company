import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useParticleField } from '@/hooks/useParticleField'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Button } from '@/components/atoms/Button'
import { CapPill } from '@/components/atoms/CapPill'
import laptopImg from '@/assets/laptop.webp'
import { fadeUp, viewport } from '@/lib/motion'

const capabilities = [
  'Tráfego Pago',
  'Branding',
  'Social Media',
  'SEO',
  'Criação de Sites',
  'Automação',
  'Conteúdo',
  'Analytics',
]

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleField(canvasRef, 1)

  return (
    <section
      className="relative flex flex-col overflow-hidden isolate"
      style={{ minHeight: '100svh', padding: '120px 28px 60px' }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Animated glows */}
        <div
          className="absolute animate-drift-1 pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            top: '-10%',
            left: '-5%',
            background: 'radial-gradient(ellipse, rgba(255,26,26,0.12), transparent 60%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute animate-drift-2 pointer-events-none"
          style={{
            width: '500px',
            height: '500px',
            top: '30%',
            right: '5%',
            background: 'radial-gradient(ellipse, rgba(255,26,26,0.08), transparent 60%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute animate-drift-3 pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            bottom: '0',
            left: '30%',
            background: 'radial-gradient(ellipse, rgba(255,26,26,0.07), transparent 60%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />

        {/* Laptop background */}
        <img
          src={laptopImg}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute animate-laptop-float"
          style={{
            right: '-10vmin',
            top: '50%',
            width: '80vmin',
            height: 'auto',
            opacity: 0.55,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.6)) drop-shadow(0 0 80px rgba(255,26,26,.35))',
          }}
          aria-hidden="true"
        />

        {/* Grain overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay pointer-events-none"
          aria-hidden="true"
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.3), transparent),
              linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)
            `,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Wordmark ── */}
      <div
        className="absolute z-[1] left-0 right-0 text-center pointer-events-none select-none overflow-hidden"
        style={{ bottom: '12vh' }}
        aria-hidden="true"
      >
        <div
          className="text-gradient-wordmark font-sans font-extrabold uppercase leading-[0.85] tracking-[-0.07em] inline-block"
          style={{ fontSize: 'clamp(80px, 22vw, 320px)' }}
        >
          PULSING
        </div>
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-[2] flex flex-col justify-center flex-1 max-w-[720px]"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeUp} custom={0} viewport={viewport}>
          <Eyebrow>Pulsing · Performance &amp; Branding</Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-sans font-semibold text-fg leading-[0.98] tracking-[-0.045em]"
          style={{ fontSize: 'clamp(40px, 6.4vw, 96px)' }}
        >
          A agência de{' '}
          <em className="font-serif not-italic" style={{ fontStyle: 'italic', color: '#C2C2C8', letterSpacing: '-0.02em' }}>
            marketing
          </em>{' '}
          e{' '}
          <em
            className="font-serif not-italic"
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #ffffff, #ff5050)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            performance
          </em>{' '}
          construída para o próximo ciclo.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 text-fg-3 leading-[1.55] tracking-[-0.01em] max-w-[520px]"
          style={{ fontSize: 'clamp(15px, 1.5vw, 19px)' }}
        >
          Estratégia, mídia, dado e tecnologia em uma única operação — para marcas que decidiram
          transformar presença digital em crescimento real e mensurável.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
          <Button as="a" href="#connected" variant="primary">
            Solicitar orçamento
          </Button>
          <Button as="a" href="#news" variant="ghost">
            Ver cases
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Capability pills ── */}
      <motion.div
        className="relative z-[2] mt-auto pt-16 flex flex-wrap gap-2"
        style={{ maxWidth: 'var(--max)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}
      >
        {capabilities.map((cap) => (
          <CapPill key={cap}>{cap}</CapPill>
        ))}
      </motion.div>

      {/* ── Meta bar ── */}
      <div
        className="absolute bottom-7 left-7 right-7 z-[2] hidden md:flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-fg-4"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse-dot" />
          Operação ativa · 2026
        </div>
        <div className="flex items-center gap-2">
          Role para baixo
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
