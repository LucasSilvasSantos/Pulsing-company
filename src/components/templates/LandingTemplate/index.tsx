import type { ReactNode } from 'react'
import { Nav } from '@/components/organisms/Nav'
import { useReveal } from '@/hooks/useReveal'

interface LandingTemplateProps {
  children: ReactNode
}

export function LandingTemplate({ children }: LandingTemplateProps) {
  useReveal()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-full focus:text-sm"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="main">{children}</main>
    </>
  )
}
