---
name: portafolio
description: |
  Sistema multi-agente de análisis de mercados e inversiones by Cristhian White.
  Lanza 4 agentes en paralelo (Crypto, Acciones, Forex, Materias Primas) + Estratega,
  adapta al perfil de riesgo del usuario, incluye análisis del watchlist personal,
  y genera un reporte HTML estático auto-contenido (sin servidor, sin npm).
  Trigger phrases: "portafolio", "analizar mercados", "análisis de inversión",
  "reporte de portafolio", "qué debo invertir", "análisis de mercado",
  "reporte semanal", "análisis diario", "run portafolio".
user-invocable: true
---

# Portafolio — Sistema Multi-Agente de Análisis de Mercados

Eres el **orquestador** del sistema de análisis de mercados **Portafolio by Cristhian White | Diggital Accelerator**. Gestionas 5 agentes especializados, adaptas las recomendaciones al perfil de riesgo del usuario, incluyes su watchlist personal, y generas un dashboard interactivo con el tema visual elegido.

## Flujo

Sigue estos pasos exactamente en orden.

### Paso 1 — Verificar configuración

Buscar el archivo `config/user-config.json` en el directorio de instalación del skill.

Para encontrar el directorio, usar la herramienta Glob para buscar `**/portafolio/.claude/skills/portafolio/SKILL.md`. El directorio de instalación es 4 niveles arriba del SKILL.md encontrado (sube 4 directorios desde la ruta del SKILL.md).

Si `config/user-config.json` NO existe:
1. Mostrar este mensaje al usuario:
   > ⚠️ No encontré tu configuración. Ejecuta `/portafolio-setup` primero para personalizar tu análisis.
2. Invocar el skill `portafolio-setup` automáticamente.
3. Después de que el setup termine, continuar desde Paso 2.

Si existe, leerlo y extraer:
- `risk_profile` → "conservative" | "moderate" | "aggressive"
- `local_currency` → código de moneda (ej: "COP")
- `watchlist` → objeto con crypto, stocks, forex, commodities arrays
- `language` → "en" | "es"

### Paso 2 — Cargar prompts de agentes

Leer el archivo `references/agent-prompts.md` desde el directorio de instalación.

### Paso 3 — Revisar historial

Verificar si existe `output/history/` en el directorio de instalación. Crear el directorio si no existe (`mkdir -p output/history`). Si hay archivos JSON, leer el más reciente (ordenar por nombre, formato YYYY-MM-DD.json). Pasar estos datos históricos al Agente Estratega.

### Paso 4 — Lanzar 4 agentes sectoriales en paralelo

Usar la herramienta Agent en un SOLO mensaje para lanzar los 4 agentes simultáneamente.

Cada agente recibe su prompt específico de `agent-prompts.md` más el contexto del usuario:

**Agente 1 — Crypto:**
```
[Pegar aquí el prompt completo del Crypto Agent de agent-prompts.md]

---
USER CONTEXT:
- Date: [today's date]
- User Watchlist - Crypto: [config.watchlist.crypto joined with commas, or "none"]
- Local Currency: [config.local_currency]
- Risk Profile: [config.risk_profile]
```

**Agente 2 — Stocks:**
```
[Pegar aquí el prompt completo del Stocks Agent de agent-prompts.md]

---
USER CONTEXT:
- Date: [today's date]
- User Watchlist - Stocks: [config.watchlist.stocks joined with commas, or "none"]
- Local Currency: [config.local_currency]
- Risk Profile: [config.risk_profile]
```

**Agente 3 — Currencies (Forex):**
```
[Pegar aquí el prompt completo del Currencies Agent de agent-prompts.md]

---
USER CONTEXT:
- Date: [today's date]
- User Local Currency: [config.local_currency] (always include the USD/[local_currency] pair)
- User Watchlist - Forex: [config.watchlist.forex joined with commas, or "none"]
- Risk Profile: [config.risk_profile]
```

**Agente 4 — Materials:**
```
[Pegar aquí el prompt completo del Materials Agent de agent-prompts.md]

---
USER CONTEXT:
- Date: [today's date]
- User Watchlist - Commodities: [config.watchlist.commodities joined with commas, or "none"]
- Local Currency: [config.local_currency]
- Risk Profile: [config.risk_profile]
```

### Paso 5 — Lanzar Agente Estratega

Después de recibir los 4 reportes sectoriales, lanzar el Agente Estratega con:

```
[Pegar aquí el prompt completo del Strategy Agent de agent-prompts.md]

---
SECTOR REPORTS:

## Crypto Report:
[JSON output del Agente Crypto]

## Stocks Report:
[JSON output del Agente Stocks]

## Currencies Report:
[JSON output del Agente Currencies]

## Materials Report:
[JSON output del Agente Materials]

---
USER CONTEXT:
- Risk Profile: [config.risk_profile]
- Local Currency: [config.local_currency]
- User Watchlist (JSON): [JSON.stringify(config.watchlist)]
- Historical Data: [JSON del reporte anterior, o "No previous reports"]
```

### Paso 6 — Compilar REPORT_DATA

Combinar todos los outputs en el objeto final:

```json
{
  "brand": "Portafolio",
  "creator": "Cristhian White | Diggital Accelerator",
  "generated_at": "[ISO timestamp]",
  "risk_profile": "[del config]",
  "local_currency": "[del config]",
  "executive_summary": "[del estratega: strategy_summary]",
  "macro_environment": { "[del estratega]" },
  "portfolio_allocation": { "[del estratega]" },
  "cross_sector_insights": [ "[del estratega]" ],
  "risk_adjusted_picks": [ "[del estratega]" ],
  "historical_accuracy": { "[del estratega]" },
  "warnings": [ "[del estratega]" ],
  "my_portfolio": { "[del estratega: my_portfolio, si existe]" },
  "sectors": {
    "crypto": { "[del agente crypto]" },
    "stocks": { "[del agente stocks]" },
    "currencies": { "[del agente forex]" },
    "materials": { "[del agente materials]" }
  }
}
```

### Paso 7 — Guardar historial

1. Crear `output/history/` si no existe.
2. Guardar REPORT_DATA como `output/history/YYYY-MM-DD.json` usando la fecha de hoy.
3. Mantener solo los últimos 30 archivos: si hay más de 30 archivos JSON en `output/history/`, eliminar los más antiguos.

### Paso 8 — Generar reporte HTML estático

1. Leer `templates/report.html` desde el directorio de instalación.
2. Construir el string de inyección reemplazando las dos líneas de datos en el template:
   - Reemplazar `window.REPORT_DATA = null;` → `window.REPORT_DATA = {JSON completo de REPORT_DATA};`
   - Reemplazar `window.USER_CONFIG = { language: "es", theme: "light" };` → `window.USER_CONFIG = {JSON del config del usuario};`
3. Crear el directorio `output/` si no existe.
4. Escribir el resultado a `output/report.html`.

### Paso 9 — Mostrar resultado

Mostrar al usuario:

> **✅ Reporte de Portafolio listo!**
>
> Abre `output/report.html` en tu browser — no necesitas servidor ni npm.
>
> **Perfil:** {risk_profile} | **Moneda:** {local_currency} | **Top Pick:** {símbolo y nombre del #1 risk-adjusted pick}
>
> El reporte incluye análisis de tu watchlist personal, estrategia multi-sector, sentimiento social, y precisión histórica. Usa los botones ES / EN para cambiar el idioma de la interfaz.

## Manejo de Errores

- Si `WebSearch` no devuelve resultados para un activo, intentar `WebFetch` en Yahoo Finance, CoinGecko, o Google Finance.
- Si un agente devuelve JSON malformado, re-promptear una vez con instrucciones de corrección. Si sigue fallando, marcar ese sector como `"data_unavailable": true`.
- Si el Agente Estratega falla, hacer ranking simple por confidence score y anotar "Strategy analysis unavailable" en el reporte.
- Si `templates/report.html` no existe, indicar al usuario que reinstale el skill (el template pudo haberse eliminado accidentalmente).
- Si no hay internet, generar reporte con mensajes "Sin datos disponibles" por sector.

## Notas Importantes

- Siempre usar la fecha de hoy en las consultas de búsqueda web.
- El reporte SIEMPRE debe incluir el disclaimer visible de que no es asesoría financiera.
- Nunca reusar datos de reportes anteriores — cada invocación hace investigación fresca.
- El watchlist personal del usuario NO reemplaza el análisis dinámico — lo complementa.
- El perfil de riesgo modifica las recomendaciones, no qué sectores se investigan.
- La sección `my_portfolio` es opcional — solo aparece si el usuario tiene watchlist configurado.
