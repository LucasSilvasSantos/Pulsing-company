import type { ReactNode } from 'react'

export interface GrowthStatData {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export interface NewsCardData {
  date: string
  category: string
  title: string
  excerpt: string
  delta: string
  chartType: 'rise' | 'bars' | 'up'
}

export interface PlatformCellData {
  icon: ReactNode
  title: string
  description: string
}

export interface CapabilityItem {
  label: string
  href?: string
}
