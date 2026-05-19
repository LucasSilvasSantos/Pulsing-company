import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Button } from '@/components/atoms/Button'
import { GrowthStat } from '@/components/molecules/GrowthStat'
import { fadeUp, viewport } from '@/lib/motion'
import type { GrowthStatData } from '@/types'

const stats: GrowthStatData[] = [
  { value: 312, suffix: '%', label: 'ROAS médio em contas geridas' },
  { value: 48, label: 'Marcas ativas na operação' },
  { value: 127, prefix: 'R$', suffix: 'M', label: 'Em mídia gerida nos últimos 12 meses' },
  { value: 4.8, suffix: '×', decimals: 1, label: 'Velocidade média de execução vs. mercado' },
]

export function SustainedGrowth() {
  return (
    <section id="growth" className="section-py">
      <div className="container-pulsing">
        <div
          className="grid gap-[60px] items-center"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}
        >
          {/* Left column */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <Eyebrow>Track record · Pulsing™</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-sans font-semibold text-fg leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Um histórico de crescimento{' '}
              <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
                sustentado.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[15px] text-fg-3 leading-[1.55]"
              style={{ maxWidth: '460px' }}
            >
              Pulsing estabelece o padrão de liderança em performance e branding — construindo
              marcas mais fortes e entregando resultados auditáveis, ano após ano.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Button as="a" href="#news" variant="link">
                Ver cases completos ↗
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — stats */}
          <div
            className="flex flex-col"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            {stats.map((stat, i) => (
              <GrowthStat key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
