"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import type { ReportData } from "@/types/report"

const profileStyles: Record<string, string> = {
  conservative: "bg-blue-50 text-blue-700 border-blue-200",
  moderate: "bg-amber-50 text-amber-700 border-amber-200",
  aggressive: "bg-red-50 text-red-700 border-red-200",
}

export function ReportHeader({ data }: { data: ReportData }) {
  const { t } = useLanguage()
  const date = new Date(data.generated_at).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-b border-[var(--header-border)] pb-6 pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--strong-text)] sm:text-5xl">
            portafolio.
          </h1>
          <p className="mt-1 text-sm text-[var(--muted-text)]">
            {t("header.subtitle")}{" "}
            <span className="font-semibold text-[var(--strong-text)]">Cristhian White</span>
            {" "}
            <span className="text-[var(--muted-text)]">| Diggital Accelerator</span>
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-[var(--muted-text)]">
            <strong className="block text-base font-semibold text-[var(--strong-text)]">{date}</strong>
            {t("header.report")}
          </p>
          <span className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${profileStyles[data.risk_profile]}`}>
            {data.risk_profile} {t("header.profile")}
          </span>
          {data.local_currency && (
            <span className="ml-2 mt-2 inline-block rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--muted-text)]">
              {data.local_currency}
            </span>
          )}
        </div>
      </div>
    </motion.header>
  )
}
