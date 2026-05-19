import { motion } from 'framer-motion'
import { ChartUp, ChartRise, ChartBars } from '@/components/molecules/ChartSvg'
import type { NewsCardData } from '@/types'

const chartMap = {
  up: ChartUp,
  rise: ChartRise,
  bars: ChartBars,
}

interface NewsCardProps {
  data: NewsCardData
}

export function NewsCard({ data }: NewsCardProps) {
  const Chart = chartMap[data.chartType]

  return (
    <motion.article
      className="flex flex-col rounded-card-lg border border-line bg-bg-2 min-h-[480px] cursor-pointer overflow-hidden"
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Art area */}
      <div
        className="relative overflow-hidden grid-texture-sm"
        style={{
          aspectRatio: '5/3',
          background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(255,26,26,0.25), transparent 70%), linear-gradient(180deg, #1a1a1a 0%, #050505 100%)',
        }}
      >
        {/* Delta chip */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full border font-mono text-[10px] uppercase tracking-[0.1em] text-accent"
          style={{ background: 'rgba(255,26,26,0.12)', borderColor: 'rgba(255,26,26,0.35)' }}>
          {data.delta}
        </div>

        {/* Chart */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <Chart />
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center gap-3">
          <span className="w-[22px] h-px bg-fg-4 flex-shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-4">
            {data.date} · {data.category}
          </span>
        </div>
        <h3
          className="font-sans font-medium text-fg leading-[1.25] tracking-[-0.02em]"
          style={{ fontSize: '19px' }}
        >
          {data.title}
        </h3>
        <p className="text-[14px] text-fg-3 leading-[1.55]">{data.excerpt}</p>
        <div className="mt-auto pt-2">
          <button className="group/read inline-flex items-center gap-2 text-[13px] font-medium text-fg-3 hover:text-accent transition-colors duration-200">
            Ler case completo
            <span className="transition-all duration-200 group-hover/read:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
