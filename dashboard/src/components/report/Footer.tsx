"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"

export function Footer({ generatedAt }: { generatedAt: string }) {
  const { t } = useLanguage()
  const timestamp = new Date(generatedAt).toLocaleString()
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--header-border)] px-4 py-2 text-xs text-[var(--muted-text)]"
    >
      <div>
        portafolio. by{" "}
        <span className="font-medium text-[var(--strong-text)]">Cristhian White</span>
        {" "}|{" "}
        <span className="text-[var(--muted-text)]">Diggital Accelerator</span>
        {" "}—{" "}
        {t("footer.tagline")}
      </div>
      <div>{t("footer.generated")} {timestamp}</div>
    </motion.footer>
  )
}
