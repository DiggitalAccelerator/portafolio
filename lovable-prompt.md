# Prompt Lovable — Landing Portafolio

**Proyecto:** Portafolio (regalo ManyChat)
**Marca:** Cristian White · Diggital Accelerator
**Tipo:** Página de entrega de regalo (no de venta)
**Estilo:** Dark, minimalista, Montserrat

---

```
Build a dark, minimalist "gift delivery" page in Spanish for Portafolio — a free Claude Code skill created by Cristian White from Diggital Accelerator. This is not a sales page. It's a thank-you/download page where the user receives the tool and learns how to use it.

VISUAL IDENTITY:
- Background: #0a0e1a
- Surface/cards: #111827
- Accent: #e94560 (use sparingly)
- Text primary: #e8eaf0
- Text muted: #8892a4
- Border: #2a3452
- Font: Montserrat (Google Fonts) — weights 400, 500, 600, 700
- Aesthetic: dark, clean, generous whitespace, minimal borders, no decorative elements

ALL TEXT ON THIS PAGE IS IN SPANISH.

PAGE STRUCTURE:

1. HEADER / HERO — Centered. Full viewport height.
   - Small eyebrow pill: "Regalo exclusivo · Diggital Accelerator"
   - H1: "Tu skill de análisis de inversiones ya está aquí." — large, bold, white
   - Subheadline: "Portafolio lanza 5 agentes de IA en paralelo para analizar crypto, acciones, forex y materias primas. Te entrega un reporte interactivo directo en tu navegador." — muted, max-width 580px
   - Primary CTA button: "Instalar Portafolio ahora" — filled #e94560, scrolls to install section
   - Below button: muted small text "Gratis · Open source · Compatible con Claude Code"

2. QUÉ HACE — Section title: "¿Qué hace Portafolio?". Three columns on desktop, 1 on mobile:
   - 5 agentes en paralelo — "Crypto, acciones, forex y materias primas. Cada agente investiga por su cuenta y el resultado se sintetiza en un solo reporte."
   - Adaptado a tu perfil — "Elegís tu perfil de riesgo: conservador, moderado o agresivo. Las recomendaciones, tamaños de posición y asignaciones se ajustan automáticamente."
   - Dashboard interactivo — "El reporte se abre en tu navegador en localhost:3420. Cambiá entre español e inglés en cualquier momento."
   Cards: 1px border #2a3452, rounded 12px, hover border brightens to #3d4f6e, 0.2s ease.

3. REQUISITOS — Section title: "Antes de instalar, verificá que tenés:". Simple numbered list style, left-aligned, max-width 600px centered:
   1. Claude Code instalado — link "Descargar Claude Code →" in accent color
   2. Node.js 18 o superior — link "Descargar Node.js →"
   3. Conexión a internet activa (los agentes investigan en tiempo real)
   Small note below in muted text: "¿No sabés si tenés Node.js? Abrí tu terminal y escribí: node --version"
   Code block styled: bg #0d1117, border #2a3452, rounded 8px, monospace.

4. INSTALACIÓN — Section title: "Cómo instalarlo". Three options as stacked cards, each with a number badge:

   Card 1 — Badge "01" + label pill "Recomendado":
   Title: "Una sola línea"
   Description: "Abrí tu terminal y pegá este comando. Clona el repositorio, enlaza el skill a Claude Code e instala el dashboard automáticamente."
   Code block: curl -sL https://raw.githubusercontent.com/Hainrixz/maia-skill/main/install.sh | bash

   Card 2 — Badge "02":
   Title: "Plugin de Claude Code"
   Code block: claude plugin install Hainrixz/maia-skill

   Card 3 — Badge "03":
   Title: "Instalación manual"
   Three sequential code blocks:
   git clone https://github.com/Hainrixz/maia-skill.git
   mkdir -p ~/.claude/skills && ln -s "$(pwd)/maia-skill/.claude/skills/investment-analysis" ~/.claude/skills/investment-analysis
   npm install --prefix maia-skill/dashboard

5. CÓMO USARLO — Section title: "Tu primer análisis". Step-by-step horizontal flow on desktop, vertical on mobile. Four steps connected with a subtle line:
   - Paso 1: "Abrí Claude Code" — "En cualquier conversación."
   - Paso 2: "Escribí el trigger" — "Frases como: 'Analizá los mercados', 'Dame un reporte de inversiones' o 'Corré /portafolio'."
   - Paso 3: "Elegí tu perfil" — "Conservador, moderado o agresivo. Esto determina cómo se calculan las recomendaciones."
   - Paso 4: "Abrí el dashboard" — "Los agentes trabajan en paralelo. Cuando terminan, el reporte se abre en localhost:3420."

6. PROGRAMARLO — Section title: "Dejalo en automático". Dark card, full width, slightly lighter bg #111827, border #2a3452, padding 48px, rounded 16px.
   Description: "Podés programar Portafolio para que corra solo, todos los días o todas las semanas, sin que tengas que hacer nada."
   Two code blocks side by side (stack on mobile):
   Left — Label "Reporte diario":
   /loop 24h /investment-analysis
   Right — Label "Reporte semanal":
   /loop 168h /investment-analysis
   Below: muted note "Usá el comando /loop de Claude Code. El reporte se genera solo y queda guardado en output/ con la fecha."

7. FOOTER — Single line. "Creado por Cristian White · Diggital Accelerator" left. "Gratis · MIT License" right. Border-top 1px #2a3452.

DESIGN REQUIREMENTS:
- Mobile-first, fully responsive
- Montserrat from Google Fonts (400, 500, 600, 700)
- No box shadows — 1px borders only
- Code blocks: bg #0d1117, border #2a3452, rounded 8px, padding 16px, monospace 0.85rem, color #a8d8a8 (soft green)
- Number badges on install cards: 2rem, font-weight 700, color #e94560, no bg
- Section padding: 80px vertical
- Max content width: 960px centered
- Smooth scroll
- CTA button: bg #e94560, white text, border-radius 6px, padding 14px 32px, font-weight 600, hover bg #c73652

Output a single self-contained HTML file. All CSS in <style> block. Montserrat via Google Fonts <link>. Minimal vanilla JS for smooth scroll only. No frameworks. No external CSS.
```
