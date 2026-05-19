import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import type { GrowthStatData } from '@/types'

interface GrowthStatProps extends GrowthStatData {
  index?: number
}

export function GrowthStat({ value, prefix, suffix, decimals = 0, label, index = 0 }: GrowthStatProps) {
  const [ref, isVisible] = useInView<HTMLDivElement>(0.4)
  const count = useCountUp(value, isVisible)

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toString()

  return (
    <div
      ref={ref}
      className="grid gap-5 py-7 reveal"
      style={{
        gridTemplateColumns: '1fr 1.6fr',
        alignItems: 'baseline',
        '--d': `${index * 80}ms`,
        borderTop: index > 0 ? '1px solid rgba(255,255,255,0.07)' : undefined,
      } as React.CSSProperties}
    >
      <div
        className="font-sans font-medium text-gradient-white-red leading-none tracking-[-0.04em]"
        style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}
      >
        {prefix && (
          <span className="opacity-70" style={{ fontSize: '0.5em' }}>
            {prefix}
          </span>
        )}
        {displayValue}
        {suffix && (
          <span className="opacity-70" style={{ fontSize: '0.55em' }}>
            {suffix}
          </span>
        )}
      </div>
      <p className="text-[15px] text-fg-3 leading-[1.55] tracking-[-0.01em]">{label}</p>
    </div>
  )
}
