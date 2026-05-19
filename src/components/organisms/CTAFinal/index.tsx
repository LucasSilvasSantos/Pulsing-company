import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Button } from '@/components/atoms/Button'
import { fadeUp, viewport } from '@/lib/motion'

export function CTAFinal() {
  return (
    <section className="section-py">
      <div className="container-pulsing">
        <motion.div
          className="relative rounded-block border overflow-hidden grid-texture-cta text-center"
          style={{
            padding: 'clamp(64px, 8vw, 100px) clamp(28px, 5vw, 60px)',
            borderColor: 'rgba(255,26,26,0.25)',
            background: `
              radial-gradient(ellipse 40% 40% at 50% 100%, rgba(255,26,26,0.3), transparent 70%),
              radial-gradient(ellipse 12% 12% at 50% 0%, rgba(255,26,26,0.15), transparent 70%),
              linear-gradient(180deg, #0a0a0a 0%, #050505 100%)
            `,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none animate-cta-glow"
            style={{
              width: '700px',
              height: '450px',
              background: 'radial-gradient(ellipse, rgba(255,26,26,0.25), transparent 60%)',
              filter: 'blur(70px)',
            }}
            aria-hidden="true"
          />

          <motion.div variants={fadeUp} custom={0} className="relative">
            <Eyebrow className="justify-center">Próximo passo</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="relative mt-6 font-sans font-semibold text-fg leading-[1.0] tracking-[-0.045em] mx-auto"
            style={{ fontSize: 'clamp(40px, 6vw, 84px)', maxWidth: '800px' }}
          >
            Sua marca está pronta para{' '}
            <em className="font-serif text-accent" style={{ fontStyle: 'italic' }}>
              pulsar?
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="relative mt-6 text-[15px] text-fg-3 leading-[1.55] mx-auto"
            style={{ maxWidth: '560px' }}
          >
            Diagnóstico gratuito de 30 minutos. Sem pitch, sem proposta forçada — só análise honesta
            do seu cenário atual e do que faria sentido nos próximos 90 dias.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="relative mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Button
              as="a"
              href="#connected"
              variant="primary"
              size="cta"
              className="shadow-btn-red-cta"
            >
              Solicitar diagnóstico
            </Button>
            <Button as="a" href="#news" variant="ghost" size="cta">
              Ver cases primeiro
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
