import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-bg-2 border border-line-2 shadow-toast text-fg text-[13px] font-medium"
      style={{ x: '-50%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 animate-pulse-dot" />
      {message}
    </motion.div>
  )
}
