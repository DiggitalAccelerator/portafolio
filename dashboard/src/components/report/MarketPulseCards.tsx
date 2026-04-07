"use client"

import { useLanguage } from "@/hooks/use-language"
import type { ReportData, Asset } from "@/types/report"

function parseChange(val: string | number | undefined): number {
  if (val === undefined || val === null) return 0
  const s = String(val).replace(/[^0-9.\-+]/g, "")
  return parseFloat(s) || 0
}

function SentimentDot({ sentiment }: { sentiment: string }) {
  const color =
    sentiment === "bullish" ? "bg-emerald-500" :
    sentiment === "bearish" ? "bg-red-500" :
    "bg-amber-400"
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} title={sentiment} />
}

function PulseCard({ label, asset }: { label: string; asset: Asset | undefined }) {
  if (!asset) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--section-bg)] p-3">
        <p className="text-xs text-[var(--muted-text)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--muted-text)]">—</p>
      </div>
    )
  }

  const change24h = parseChange(asset.change_24h)
  const change7d = parseChange(asset.change_7d)
  const isUp24 = change24h >= 0
  const isUp7 = change7d >= 0

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--section-bg)] p-3 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-text)]">
            {asset.symbol}
          </p>
          <p className="text-xs text-[var(--muted-text)] truncate max-w-[120px]">{asset.name}</p>
        </div>
        <SentimentDot sentiment={asset.sentiment} />
      </div>
      <p className="text-lg font-semibold text-[var(--strong-text)] leading-none">
        {asset.current_price}
      </p>
      <div className="flex items-center gap-3 text-xs">
        <span className={isUp24 ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
          {isUp24 ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}% 24h
        </span>
        <span className={isUp7 ? "text-emerald-500" : "text-red-400"}>
          {isUp7 ? "+" : ""}{change7d.toFixed(2)}% 7d
        </span>
      </div>
    </div>
  )
}

export function MarketPulseCards({ data }: { data: ReportData }) {
  const { t } = useLanguage()

  const btc = data.sectors?.crypto?.assets?.find(
    (a) => a.symbol === "BTC"
  )
  const sp500 = data.sectors?.stocks?.assets?.find(
    (a) => a.symbol === "SPX" || a.symbol === "^GSPC" || a.name?.includes("S&P")
  )
  const nasdaq = data.sectors?.stocks?.assets?.find(
    (a) => a.symbol === "IXIC" || a.symbol === "^IXIC" || a.name?.includes("NASDAQ") || a.name?.includes("Nasdaq")
  )
  const localCurrency = data.local_currency
  const usdLocal = localCurrency
    ? data.sectors?.currencies?.assets?.find(
        (a) =>
          a.symbol === `USD/${localCurrency}` ||
          a.symbol === `${localCurrency}/USD` ||
          a.symbol?.includes(localCurrency)
      )
    : data.sectors?.currencies?.assets?.find((a) => a.symbol === "DXY")

  const cards = [
    { label: "Bitcoin", asset: btc },
    { label: "S&P 500", asset: sp500 },
    { label: "NASDAQ", asset: nasdaq },
    { label: localCurrency ? `USD / ${localCurrency}` : "USD Index", asset: usdLocal },
  ]

  return (
    <div className="border-b border-[var(--border)] bg-[var(--background)] px-4 py-2">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-text)]">
        {t("pulse.title")}
      </p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <PulseCard key={c.label} label={c.label} asset={c.asset} />
        ))}
      </div>
    </div>
  )
}
