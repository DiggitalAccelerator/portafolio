"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import type { MyPortfolio as MyPortfolioType } from "@/types/report"
import { SECTOR_COLORS } from "@/lib/constants"

const recStyles: Record<string, { bg: string; text: string; border: string }> = {
  buy:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200" },
  hold: { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
  sell: { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200" },
}

function formatLocalPrice(price: number | null, currency: string): string {
  if (price == null) return "N/A"
  if (price >= 1_000_000) return `${currency} ${(price / 1_000_000).toFixed(2)}M`
  if (price >= 1_000) return `${currency} ${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
  return `${currency} ${price.toFixed(4)}`
}

function ChangeChip({ value }: { value: number | null }) {
  if (value == null) return <span className="text-xs text-[var(--muted-text)]">—</span>
  const positive = value >= 0
  return (
    <span className={`text-xs font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
      {positive ? "+" : ""}{value.toFixed(2)}%
    </span>
  )
}

export function MyPortfolio({ data }: { data: MyPortfolioType }) {
  const { t } = useLanguage()

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--section-bg)] p-6"
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-text)]">
            {t("myportfolio.kicker")}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--strong-text)]">
            {t("myportfolio.title")}
          </h2>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-foreground)]">
          {data.total_assets} {t("myportfolio.assets")}
        </span>
      </div>

      {/* Strategy summary */}
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted-text)]">{data.summary}</p>

      {/* Asset grid */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {data.assets.map((asset, i) => {
          const rec = recStyles[asset.recommendation] ?? recStyles["hold"]
          const sectorColor = SECTOR_COLORS[asset.sector] ?? "#8892a4"
          return (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${sectorColor}20`, color: sectorColor }}
                >
                  {asset.sector}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${rec.bg} ${rec.text} ${rec.border}`}
                >
                  {asset.recommendation}
                </span>
              </div>

              <div className="text-base font-bold text-[var(--strong-text)]">{asset.symbol}</div>
              <div className="mb-1 text-xs text-[var(--muted-text)]">{asset.name}</div>

              <div className="mt-2 font-mono text-sm font-semibold text-[var(--strong-text)]">
                {asset.price_usd != null
                  ? `$${asset.price_usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
                  : "N/A"}
              </div>
              <div className="font-mono text-xs text-[var(--muted-text)]">
                {formatLocalPrice(asset.price_local, asset.local_currency)}
              </div>

              <div className="mt-2 flex gap-3">
                <div className="text-center">
                  <div className="text-[10px] text-[var(--muted-text)]">24h</div>
                  <ChangeChip value={asset.change_24h} />
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[var(--muted-text)]">7d</div>
                  <ChangeChip value={asset.change_7d} />
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[10px] text-[var(--muted-text)]">{t("picks.confidence")}</div>
                  <div className="text-xs font-semibold text-[var(--strong-text)]">{asset.confidence}/10</div>
                </div>
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted-text)] line-clamp-2">
                {asset.reasoning}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Rebalance suggestion */}
      {data.rebalance_suggestion && (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <span className="font-semibold">{t("myportfolio.rebalance")}: </span>
          {data.rebalance_suggestion}
        </div>
      )}

      {/* Correlations */}
      {data.correlations && data.correlations.length > 0 && (
        <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--section-bg)] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-text)]">
            Correlaciones
          </p>
          <div className="flex flex-col gap-2">
            {data.correlations.map((corr, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-[var(--strong-text)]">
                  {corr.pair[0]} ↔ {corr.pair[1]}
                </span>
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[var(--muted-text)]">
                  {corr.correlation}
                </span>
                <span className="text-[var(--muted-text)]">{corr.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk assessment */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-text)]">
        <span className="font-semibold uppercase tracking-wider">{t("myportfolio.risk")}:</span>
        <span>{data.risk_assessment}</span>
      </div>
    </motion.section>
  )
}
