import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { Button } from '@/components/atoms/Button'
import { NewsCard } from '@/components/molecules/NewsCard'
import { fadeUp, viewport } from '@/lib/motion'
import type { NewsCardData } from '@/types'

const newsData: NewsCardData[] = [
  {
    date: '14 Maio · 2026',
    category: 'E-commerce · Moda',
    title: 'Aurea Atelier escala 4,2× a receita em 8 meses de operação.',
    excerpt:
      'Reposicionamento de marca + reestruturação de mídia paga em 4 canais. Operação saiu de mídia reativa para um plano com tese e prova.',
    delta: '+418% receita',
    chartType: 'rise',
  },
  {
    date: '07 Maio · 2026',
    category: 'SaaS B2B',
    title: 'Nodal Systems multiplica MQLs com funil orientado a intent.',
    excerpt:
      'Conteúdo de autoridade + SEO técnico + automação de nutrição. Em 6 meses, leads qualificados saltaram mais de 6×.',
    delta: '+612% leads',
    chartType: 'bars',
  },
  {
    date: '28 Abril · 2026',
    category: 'Health · Clínica',
    title: 'Vertice Clínico corta CAC em 67% e dobra a base de pacientes.',
    excerpt:
      'Funil de consulta otimizado, mídia regionalizada e atribuição multitouch. Operação enxuta com time sênior dedicado.',
    delta: '−67% CAC',
    chartType: 'up',
  },
]

export function News() {
  return (
    <section id="news" className="section-py">
      <div className="container-pulsing">
        {/* Section head */}
        <motion.div
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp} custom={0}>
              <Eyebrow>Cases · O que está acontecendo</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-sans font-semibold text-fg leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Operações reais.{' '}
              <em className="font-serif" style={{ fontStyle: 'italic', color: '#C2C2C8' }}>
                Métricas reais.
              </em>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Button as="a" href="#connected" variant="link">
              Ver todos os cases ↗
            </Button>
          </motion.div>
        </motion.div>

        {/* News grid */}
        <div
          className="grid gap-[18px]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
        >
          {newsData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
            >
              <NewsCard data={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
