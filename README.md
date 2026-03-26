# Portafolio — Multi-Agent Market Analysis Skill

**by Cristhian White | Diggital Accelerator**

A Claude Code skill that spawns 5 specialized AI research agents to analyze markets across crypto, stocks, forex, and commodities. Adapts to your risk profile and personal watchlist, tracks historical accuracy, and generates a branded interactive Next.js dashboard with 3 themes and full Spanish/English support.

> **[Leer en Español](#español)**

---

## What Is This?

**Portafolio** is a **Claude Code skill** — a reusable prompt-and-tooling package that extends what Claude can do. When installed, Claude gains the ability to run a full multi-agent market research workflow: 4 sector analysts research in parallel, a strategy agent synthesizes everything (including your personal watchlist), and the result is served as an interactive dashboard in your browser.

## How It Works

```
                         ┌──────────────┐
                    ┌────┤  You trigger  ├────┐
                    │    │  "analizar   │    │
                    │    │  mercados"   │    │
                    │    └──────────────┘    │
                    ▼                        ▼
            ┌──────────────┐        ┌──────────────┐
            │ User Config  │        │ Load History  │
            │ (watchlist,  │        │  (accuracy    │
            │  risk, theme)│        │   tracking)   │
            └──────┬───────┘        └──────┬───────┘
                   │                       │
                   ▼                       │
    ┌──────────────────────────────┐       │
    │     4 Sector Agents          │       │
    │  (parallel web research)     │       │
    │                              │       │
    │  ┌───────┐  ┌───────┐       │       │
    │  │Crypto │  │Stocks │       │       │
    │  └───────┘  └───────┘       │       │
    │  ┌───────┐  ┌──────────┐   │       │
    │  │ Forex │  │Materials │   │       │
    │  └───────┘  └──────────┘   │       │
    └──────────────┬───────────────┘       │
                   │                       │
                   ▼                       ▼
          ┌────────────────────────────────────┐
          │         Strategy Agent              │
          │  (cross-sector analysis,            │
          │   risk-adjusted ranking,            │
          │   portfolio allocation,             │
          │   Mi Portafolio — your watchlist)   │
          └────────────────┬───────────────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
            ┌────────────┐ ┌────────────┐
            │ report.json│ │report-es   │
            │ (English)  │ │  .json     │
            └──────┬─────┘ └──────┬─────┘
                   │              │
                   ▼              ▼
              ┌──────────────────────┐
              │   Next.js Dashboard  │
              │   localhost:3420     │
              │   3 themes | EN/ES  │
              └──────────────────────┘
```

## Features

| Feature | Description |
|---------|-------------|
| **5 AI Agents** | 4 sector researchers + 1 strategy synthesizer, all in parallel |
| **Mi Portafolio** | Personal section with your watchlist assets — price in USD + local currency, buy/hold/sell |
| **3 Dashboard Themes** | Dark Terminal, Dark Fintech, Light — set during setup |
| **Setup Wizard** | `/portafolio-setup` configures risk profile, local currency, watchlist, theme, and language |
| **Dynamic Asset Discovery** | Agents discover the most relevant assets based on current market conditions |
| **Risk Profiles** | Conservative, moderate, or aggressive — adapts recommendations, position sizes, and allocations |
| **Social Sentiment** | Twitter/X and Reddit sentiment analysis per asset |
| **Source Verification** | Cross-references prices from 2+ sources with agreement scoring |
| **Historical Accuracy** | Compares past recommendations to actual outcomes over time |
| **Cross-Sector Insights** | Correlations and divergences that individual agents can't see |
| **Spanish/English** | Full bilingual support — UI AND report data translate when you toggle |

## Sectors Covered

| Sector | Always Includes | Dynamically Discovers |
|--------|----------------|----------------------|
| Crypto | BTC, ETH + your watchlist | Trending altcoins, DeFi tokens, AI tokens |
| Stocks | S&P 500, NASDAQ + your watchlist | Top movers, catalyst-driven stocks |
| Forex | DXY + your local currency pair | Pairs affected by current macro events |
| Commodities | Gold, Oil WTI + your watchlist | Agricultural, energy, metals by market conditions |

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
- Node.js 18+ (for the dashboard)
- Active internet connection (agents perform live web research)

## Installation

### Option A: One-liner (fastest)

```bash
curl -sL https://raw.githubusercontent.com/DiggitalAccelerator/portafolio/main/install.sh | bash
```

This clones the repo, symlinks the skill into Claude Code, and installs dashboard dependencies automatically.

### Option B: Manual setup

```bash
# 1. Clone the repo
git clone https://github.com/DiggitalAccelerator/portafolio.git ~/.claude/plugins/portafolio

# 2. Symlink skill into Claude Code
mkdir -p ~/.claude/skills
ln -s ~/.claude/plugins/portafolio/.claude/skills/portafolio ~/.claude/skills/portafolio

# 3. Install dashboard dependencies
npm install --prefix ~/.claude/plugins/portafolio/dashboard
```

## Quick Start

**Step 1 — Configure your profile:**
```
/portafolio-setup
```
This sets your risk profile, local currency (COP, MXN, USD, etc.), personal watchlist, dashboard theme, and language.

**Step 2 — Run your analysis:**
```
/portafolio
```
Or just say: "analizar mercados", "reporte de portafolio", "market analysis"

The report opens at `http://localhost:3420`.

## Dashboard Themes

| Theme | Style |
|-------|-------|
| **Dark Terminal** | Black background, green monospace text, scanline effect |
| **Dark Fintech** | Deep navy, indigo/cyan accents, glassmorphism cards |
| **Light** | Clean white, blue accents, soft shadows |

Set your theme with `/portafolio-setup` — it applies automatically each time you run the skill.

## Project Structure

```
portafolio/
├── .claude/skills/portafolio/
│   ├── SKILL.md              # Orchestrator (10-step workflow)
│   └── setup.md              # Setup wizard skill
├── references/
│   └── agent-prompts.md      # Prompts for all 5 agents
├── config/
│   └── user-config.json      # Generated by /portafolio-setup
├── dashboard/                # Next.js interactive dashboard
│   ├── src/
│   │   ├── app/              # App router pages + themes CSS
│   │   ├── components/report/ # Report UI components
│   │   │   └── MyPortfolio.tsx  # Personal watchlist section
│   │   ├── hooks/            # Theme, language, data hooks
│   │   ├── lib/              # Translations, constants, themes
│   │   └── types/            # TypeScript types
│   └── public/data/          # Generated report JSON (runtime)
├── output/history/           # Report history for accuracy tracking
├── assets/
│   └── template.html         # Fallback HTML (no Node.js)
└── install.sh
```

## Customization

### Watchlist & Agent Behavior

Run `/portafolio-setup` to update your watchlist. For forex and commodities, edit `config/user-config.json` directly:

```json
{
  "watchlist": {
    "crypto": ["BTC", "ETH", "SOL"],
    "stocks": ["AAPL", "NVDA", "MELI"],
    "forex": ["USD/COP", "EUR/COP"],
    "commodities": ["Gold", "WTI", "Litio"]
  }
}
```

### Agent Prompts

Edit `references/agent-prompts.md` to change which assets each agent researches, how they search, or what data they prioritize.

### Translations

Add or modify UI translations in `dashboard/src/lib/translations.ts`.

## Disclaimer

This tool is for **informational and educational purposes only**. It does not constitute financial advice, investment recommendations, or solicitation to buy or sell any securities, cryptocurrencies, or commodities. AI-generated analysis may contain errors and should not be relied upon for investment decisions. Always consult a qualified financial advisor. Past performance is not indicative of future results.

---

<a id="español"></a>

# Portafolio — Skill de Análisis Multi-Agente de Mercados

**por Cristhian White | Diggital Accelerator**

Un skill de Claude Code que lanza 5 agentes de investigación especializados para analizar mercados en crypto, acciones, forex y materias primas. Se adapta a tu perfil de riesgo y watchlist personal, rastrea la precisión histórica y genera un dashboard interactivo con 3 temas y soporte completo español/inglés.

> **[Read in English](#portafolio--multi-agent-market-analysis-skill)**

---

## ¿Qué es esto?

**Portafolio** es un **skill de Claude Code** — un paquete reutilizable de prompts y herramientas que extiende lo que Claude puede hacer. Una vez instalado, Claude ejecuta un flujo completo de análisis de mercados con múltiples agentes: 4 analistas sectoriales investigan en paralelo, un agente estratégico sintetiza todo (incluyendo tu watchlist personal), y el resultado se sirve como dashboard interactivo en tu navegador.

## Características

| Función | Descripción |
|---------|-------------|
| **5 Agentes IA** | 4 investigadores sectoriales + 1 sintetizador de estrategia, todos en paralelo |
| **Mi Portafolio** | Sección personal con tus activos del watchlist — precio en USD + moneda local, comprar/mantener/vender |
| **3 Temas del Dashboard** | Dark Terminal, Dark Fintech, Light — se configura en el setup |
| **Wizard de Setup** | `/portafolio-setup` configura perfil de riesgo, moneda local, watchlist, tema e idioma |
| **Descubrimiento Dinámico** | Los agentes encuentran los activos más relevantes según condiciones actuales del mercado |
| **Perfiles de Riesgo** | Conservador, moderado o agresivo — adapta recomendaciones, tamaños de posición y asignaciones |
| **Sentimiento Social** | Análisis de sentimiento en Twitter/X y Reddit por activo |
| **Verificación de Fuentes** | Cruza precios de 2+ fuentes con puntuación de concordancia |
| **Precisión Histórica** | Compara recomendaciones pasadas con resultados reales |
| **Insights Inter-Sectoriales** | Correlaciones y divergencias que los agentes individuales no pueden ver |
| **Español/Inglés** | Soporte bilingüe completo — interfaz Y datos del reporte se traducen al cambiar idioma |

## Sectores Cubiertos

| Sector | Siempre Incluye | Descubre Dinámicamente |
|--------|----------------|----------------------|
| Crypto | BTC, ETH + tu watchlist | Altcoins en tendencia, tokens DeFi, tokens IA |
| Acciones | S&P 500, NASDAQ + tu watchlist | Mayores movimientos, acciones con catalizadores |
| Forex | DXY + par de tu moneda local | Pares afectados por eventos macro actuales |
| Materias Primas | Oro, Petróleo WTI + tu watchlist | Agrícolas, energía, metales según condiciones |

## Requisitos

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
- Node.js 18+ (para el dashboard)
- Conexión a internet activa (los agentes investigan en vivo)

## Instalación

### Opción A: Una sola línea (la más rápida)

```bash
curl -sL https://raw.githubusercontent.com/DiggitalAccelerator/portafolio/main/install.sh | bash
```

Esto clona el repo, enlaza el skill a Claude Code e instala las dependencias del dashboard automáticamente.

### Opción B: Configuración manual

```bash
# 1. Clonar el repo
git clone https://github.com/DiggitalAccelerator/portafolio.git ~/.claude/plugins/portafolio

# 2. Enlazar el skill en Claude Code
mkdir -p ~/.claude/skills
ln -s ~/.claude/plugins/portafolio/.claude/skills/portafolio ~/.claude/skills/portafolio

# 3. Instalar dependencias del dashboard
npm install --prefix ~/.claude/plugins/portafolio/dashboard
```

## Inicio Rápido

**Paso 1 — Configura tu perfil:**
```
/portafolio-setup
```
Configura tu perfil de riesgo, moneda local (COP, MXN, USD, etc.), watchlist personal, tema del dashboard e idioma.

**Paso 2 — Ejecuta tu análisis:**
```
/portafolio
```
O simplemente di: "analizar mercados", "reporte de portafolio", "market analysis"

El reporte se abre en `http://localhost:3420`.

## Temas del Dashboard

| Tema | Estilo |
|------|--------|
| **Dark Terminal** | Fondo negro, texto verde monoespacio, efecto scanline |
| **Dark Fintech** | Azul marino oscuro, acentos indigo/cyan, glassmorphism |
| **Light** | Blanco limpio, acentos azules, sombras suaves |

## Aviso Legal

Esta herramienta es **solo para fines informativos y educativos**. No constituye asesoramiento financiero, recomendaciones de inversión ni solicitud para comprar o vender valores, criptomonedas o materias primas. El análisis generado por IA puede contener errores y no debe utilizarse como base para decisiones de inversión. Siempre consulta a un asesor financiero calificado. El rendimiento pasado no es indicativo de resultados futuros.

## Licencia

MIT — ver [LICENSE](LICENSE)
