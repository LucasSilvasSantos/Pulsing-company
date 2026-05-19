import { lazy, Suspense } from 'react'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { Hero } from '@/components/organisms/Hero'
import { ConnectedCapabilities } from '@/components/organisms/ConnectedCapabilities'
import { PulseIntelligence } from '@/components/organisms/PulseIntelligence'
import { SustainedGrowth } from '@/components/organisms/SustainedGrowth'
import { CTAFinal } from '@/components/organisms/CTAFinal'

const News = lazy(() =>
  import('@/components/organisms/News').then((m) => ({ default: m.News })),
)
const StayConnected = lazy(() =>
  import('@/components/organisms/StayConnected').then((m) => ({ default: m.StayConnected })),
)

export default function Home() {
  return (
    <LandingTemplate>
      <Hero />
      <ConnectedCapabilities />
      <PulseIntelligence />
      <SustainedGrowth />
      <Suspense fallback={null}>
        <News />
      </Suspense>
      <CTAFinal />
      <Suspense fallback={null}>
        <StayConnected />
      </Suspense>
    </LandingTemplate>
  )
}
