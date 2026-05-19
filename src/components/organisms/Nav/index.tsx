import { motion } from 'framer-motion'
import { Logo } from '@/components/atoms/Logo'
import { Button } from '@/components/atoms/Button'
import { useScrollState } from '@/hooks/useScrollState'

const navLinks = [
  { label: 'Sobre', href: '#capabilities' },
  { label: 'Plataforma', href: '#platform' },
  { label: 'Crescimento', href: '#growth' },
  { label: 'Cases', href: '#news' },
  { label: 'Contato', href: '#connected' },
]

export function Nav() {
  const scrolled = useScrollState(24)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <motion.nav
        className="flex items-center justify-between container-pulsing"
        animate={{ paddingTop: scrolled ? 16 : 22, paddingBottom: scrolled ? 16 : 22 }}
        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <a href="#" aria-label="Pulsing — Página inicial">
          <Logo />
        </a>

        {/* Central links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium text-fg-2 hover:text-fg px-4 py-2 rounded-full hover:bg-white/[0.05] transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button as="a" href="#connected" variant="primary" size="compact">
          Fale com a gente
        </Button>
      </motion.nav>
    </motion.header>
  )
}
