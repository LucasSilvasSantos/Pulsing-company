import { motion } from 'framer-motion'
import {
  LuNetwork,
  LuChartColumnIncreasing,
  LuTrendingUp,
  LuDatabase,
  LuTarget,
  LuGlobe,
} from 'react-icons/lu'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { PlatformCell } from '@/components/molecules/PlatformCell'
import { fadeUp, viewport } from '@/lib/motion'

const cells = [
  {
    icon: <LuNetwork size={26} strokeWidth={1.5} />,
    title: 'Orquestração Central',
    description: 'Um único fluxo unificado, do briefing à entrega.',
  },
  {
    icon: <LuChartColumnIncreasing size={26} strokeWidth={1.5} />,
    title: 'Produção em Escala',
    description: 'Conteúdo personalizado com alcance incomparável.',
  },
  {
    icon: <LuTrendingUp size={26} strokeWidth={1.5} />,
    title: 'Inteligência Preditiva',
    description: 'Antecipa o que vem a seguir — antes da concorrência.',
  },
  {
    icon: <LuDatabase size={26} strokeWidth={1.5} />,
    title: 'Backbone Unificado de Dados',
    description: 'Uma única fonte de verdade. Clareza para cada decisão.',
  },
  {
    icon: <LuTarget size={26} strokeWidth={1.5} />,
    title: 'Ativação Orientada a Resultado',
    description: 'Investimento em mídia conectado a resultados de negócio.',
  },
  {
    icon: <LuGlobe size={26} strokeWidth={1.5} />,
    title: 'Otimização Localizada',
    description: 'Escala global. Precisão local.',
  },
]

export function PulseIntelligence() {
  return (
    <section id="platform" className="section-py">
      <div className="container-pulsing">
        <div
          className="relative rounded-block border border-line overflow-hidden grid-texture"
          style={{
            padding: 'clamp(48px, 6vw, 80px) clamp(28px, 4.5vw, 56px) clamp(40px, 5vw, 56px)',
            background: `
              radial-gradient(ellipse 20% 20% at 50% 0%, rgba(255,26,26,0.12), transparent 70%),
              linear-gradient(180deg, #0a0a0a 0%, #050505 100%)
            `,
          }}
        >
          {/* platform-head */}
          <motion.div
            className="grid gap-10 mb-14"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <div className="flex flex-col gap-4">
              <motion.div variants={fadeUp} custom={0}>
                <Eyebrow>Pulse Intelligence</Eyebrow>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-sans font-semibold text-fg leading-[1.02] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                A plataforma de{' '}
                <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
                  inteligência
                </em>{' '}
                de marketing da Pulsing.
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[15px] text-fg-3 leading-[1.55] self-end"
            >
              Pulse une criatividade, mídia, dado e IA para que marcas cresçam com mais clareza,
              velocidade e impacto mensurável na era da influência.
            </motion.p>
          </motion.div>

          {/* platform-grid */}
          <div
            className="platform-grid border border-line rounded-[18px] overflow-hidden"
            style={{ gap: '1px', background: 'rgba(255,255,255,0.07)' }}
          >
            {cells.map((cell, i) => (
              <PlatformCell key={cell.title} {...cell} index={i} />
            ))}
          </div>

          <style>{`
            .platform-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 980px) { .platform-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .platform-grid { grid-template-columns: 1fr; } }
          `}</style>
        </div>
      </div>
    </section>
  )
}
