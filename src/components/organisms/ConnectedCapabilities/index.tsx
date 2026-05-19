import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { ShowcaseArt } from '@/components/molecules/ShowcaseArt'
import { fadeUp, viewport } from '@/lib/motion'

const capItems = [
  'Tráfego Pago',
  'Branding',
  'Social Media',
  'SEO Técnico',
  'Criação de Sites',
  'Automação',
  'Conteúdo',
  'Analytics',
]

export function ConnectedCapabilities() {
  return (
    <section id="capabilities" className="section-py">
      <div className="container-pulsing">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mb-16"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Eyebrow>Capacidades conectadas</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-sans font-semibold text-fg leading-[1.02] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Uma vantagem competitiva em{' '}
            <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
              cada dimensão
            </em>{' '}
            do marketing moderno.
          </motion.h2>
        </motion.div>

        {/* Showcase grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))' }}
        >
          {/* Left: showcase art */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <ShowcaseArt />
          </motion.div>

          {/* Right: text + cap list */}
          <motion.div
            className="flex flex-col justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            <div className="flex flex-col gap-4">
              <motion.div variants={fadeUp} custom={0}>
                <Eyebrow showDot={false}>Operação integrada</Eyebrow>
              </motion.div>
              <motion.h3
                variants={fadeUp}
                custom={1}
                className="font-sans font-semibold text-fg leading-[1.04] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}
              >
                Estratégia, mídia, dado e tecnologia{' '}
                <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
                  em um único squad.
                </em>
              </motion.h3>
              <motion.p variants={fadeUp} custom={2} className="text-[15px] text-fg-3 leading-[1.55]">
                Cada capacidade da Pulsing foi construída para funcionar em conjunto — não como
                serviços avulsos, mas como uma operação integrada que gera sinergia real.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="text-[15px] text-fg-3 leading-[1.55]">
                O resultado: execução mais rápida, dados mais limpos e resultados que se sustentam
                ao longo do tempo.
              </motion.p>
            </div>

            {/* Cap list */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="border-t border-line pt-[22px]"
            >
              <div className="grid grid-cols-2">
                {capItems.map((item) => (
                  <a
                    key={item}
                    href="#connected"
                    className="group flex items-center justify-between border-b border-line py-[10px] px-0.5 text-[14.5px] text-fg-2 hover:text-accent hover:pl-[6px] transition-all duration-200"
                  >
                    <span>{item}</span>
                    <span className="opacity-0 group-hover:opacity-60 transition-all duration-200 translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 text-[12px]">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
