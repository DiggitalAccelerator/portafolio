"use client"

import { useState, useCallback } from "react"
import { useReportData } from "@/hooks/use-report-data"
import { LanguageProvider, useLanguage } from "@/hooks/use-language"
import { LanguagePicker } from "@/components/report/LanguagePicker"
import { ReportHeader } from "@/components/report/ReportHeader"
import { MarketPulseCards } from "@/components/report/MarketPulseCards"
import { MyPortfolio } from "@/components/report/MyPortfolio"
import { MacroEnvironment } from "@/components/report/MacroEnvironment"
import { PortfolioAllocation } from "@/components/report/PortfolioAllocation"
import { CrossSectorInsights } from "@/components/report/CrossSectorInsights"
import { Warnings } from "@/components/report/Warnings"
import { TopPicksGrid } from "@/components/report/TopPicksGrid"
import { SectorOverview } from "@/components/report/SectorOverview"
import { DetailedAnalysis } from "@/components/report/DetailedAnalysis"
import { HistoricalAccuracy } from "@/components/report/HistoricalAccuracy"
import { ChartsSection } from "@/components/report/ChartsSection"
import { Disclaimer } from "@/components/report/Disclaimer"
import { Footer } from "@/components/report/Footer"
import { LoadingSkeleton } from "@/components/report/LoadingSkeleton"

function ReportContent() {
  const { lang } = useLanguage()
  const { data, loading, error } = useReportData(lang)
  const [openSectors, setOpenSectors] = useState<string[]>([])

  const handleSectorClick = useCallback((sector: string) => {
    setOpenSectors((prev) =>
      prev.includes(sector) ? prev : [...prev, sector]
    )
  }, [])

  if (loading) return <LoadingSkeleton />

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--strong-text)]">
            portafolio.
          </h1>
          <p className="mt-3 text-sm text-[var(--muted-text)]">
            {error ?? "No report data found. Run /portafolio to generate a report."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--background)]">
      <LanguagePicker />

      {/* Header — fijo arriba */}
      <ReportHeader data={data} />

      {/* MarketPulse strip */}
      <MarketPulseCards data={data} />

      {/* 3 columnas con scroll independiente */}
      <div className="flex flex-1 overflow-hidden">

        {/* Columna izquierda */}
        <div className="w-1/3 overflow-y-auto border-r border-[var(--border)] p-4 space-y-4">
          <MacroEnvironment macro={data.macro_environment} />
          {data.warnings && data.warnings.length > 0 && (
            <Warnings warnings={data.warnings} />
          )}
          <PortfolioAllocation allocation={data.portfolio_allocation} />
          <CrossSectorInsights insights={data.cross_sector_insights} />
          <Disclaimer />
        </div>

        {/* Columna central */}
        <div className="w-1/3 overflow-y-auto border-r border-[var(--border)] p-4 space-y-4">
          {data.my_portfolio && <MyPortfolio data={data.my_portfolio} />}
          <SectorOverview
            sectors={data.sectors}
            onSectorClick={handleSectorClick}
          />
          <DetailedAnalysis
            sectors={data.sectors}
            openSectors={openSectors}
          />
        </div>

        {/* Columna derecha */}
        <div className="w-1/3 overflow-y-auto p-4 space-y-4">
          <TopPicksGrid
            picks={data.risk_adjusted_picks}
            sectors={data.sectors}
          />
          <ChartsSection
            sectors={data.sectors}
            picks={data.risk_adjusted_picks}
            allocation={data.portfolio_allocation}
          />
          <HistoricalAccuracy accuracy={data.historical_accuracy} />
        </div>

      </div>

      {/* Footer bar — fijo abajo */}
      <Footer generatedAt={data.generated_at} />
    </div>
  )
}

export default function ReportPage() {
  return (
    <LanguageProvider>
      <ReportContent />
    </LanguageProvider>
  )
}
