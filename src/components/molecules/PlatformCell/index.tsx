import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PlatformCellProps {
  icon: ReactNode
  title: string
  description: string
  index?: number
}

export function PlatformCell({ icon, title, description, index = 0 }: PlatformCellProps) {
  return (
    <motion.div
      className="group relative flex flex-col gap-[18px] bg-[#060606] min-h-[260px] overflow-hidden cursor-default"
      style={{ padding: '36px 30px 32px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.06 }}
      whileHover={{ backgroundColor: '#0c0c0c' }}
    >
      {/* Top glow on hover */}
      <div
        className="absolute inset-x-0 top-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,26,26,0.15), transparent)',
        }}
      />

      <div
        className="relative w-14 h-14 rounded-[14px] border border-line-2 flex items-center justify-center text-fg-3 group-hover:text-accent transition-colors duration-300 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        }}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h4
          className="font-sans font-medium text-fg leading-[1.15] tracking-[-0.025em]"
          style={{ fontSize: '20px' }}
        >
          {title}
        </h4>
        <p className="text-[14px] text-fg-3 leading-[1.55] tracking-[-0.01em]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
