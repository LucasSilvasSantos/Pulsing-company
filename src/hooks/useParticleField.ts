import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 'red' | 'white'
  a: number
}

export function useParticleField(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  density = 1,
) {
  const rafRef = useRef<number>(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const count = Math.floor(80 * density)
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    const initParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.3 + Math.random() * 1.4,
        hue: Math.random() < 0.25 ? 'red' : 'white',
        a: 0.2 + Math.random() * 0.6,
      } as Particle))
    }

    const loop = () => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 14000) {
            const alpha = (1 - dist2 / 14000) * 0.4
            const isRed = p.hue === 'red' || q.hue === 'red'
            ctx.beginPath()
            ctx.strokeStyle = isRed
              ? `rgba(255,26,26,${alpha})`
              : `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        const color = p.hue === 'red' ? `rgba(255,26,26,${p.a})` : `rgba(255,255,255,${p.a})`
        ctx.fillStyle = color
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      pausedRef.current = !entry.isIntersecting
    })
    visibilityObserver.observe(canvas)

    const ro = new ResizeObserver(() => {
      resize()
      initParticles()
    })
    ro.observe(canvas)

    resize()
    initParticles()
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      visibilityObserver.disconnect()
      ro.disconnect()
    }
  }, [canvasRef, density])
}
