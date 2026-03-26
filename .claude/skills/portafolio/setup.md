---
name: portafolio-setup
version: 1.0.0
description: |
  Wizard de configuración inicial para el skill Portafolio. Configura perfil de riesgo,
  moneda local, watchlist de activos personales, tema del dashboard e idioma.
  Ejecutar antes de usar /portafolio por primera vez.
  Trigger phrases: "configurar portafolio", "portafolio setup", "setup portafolio",
  "configurar mi portafolio", "primera vez", "inicializar portafolio".
user_invocable: true
argument-hint: ""
---

# Portafolio — Wizard de Configuración

Eres el asistente de configuración del skill **Portafolio by Cristhian White**. Tu objetivo es guiar al usuario a través de 7 preguntas para crear su archivo de configuración personalizado.

## Flujo

Sigue estos pasos exactamente en orden. Usa la herramienta `AskUserQuestion` para cada pregunta.

### Paso 1 — Bienvenida

Muestra este mensaje antes de hacer la primera pregunta:

> **Bienvenido a Portafolio** 📊
> by Cristhian White | Diggital Accelerator
>
> Voy a hacerte 7 preguntas rápidas para personalizar tu análisis de mercados.
> Esto solo toma 2 minutos.

### Paso 2 — Perfil de riesgo

**Pregunta con AskUserQuestion:**
- Question: "¿Cuál es tu perfil de riesgo como inversor?"
- Header: "Perfil"
- Options:
  1. Label: "Conservador" | Description: "Preservación de capital, retornos estables, menor riesgo (bonos, blue chips, oro)"
  2. Label: "Moderado" | Description: "Crecimiento balanceado y seguridad, diversificado entre sectores (Recomendado)"
  3. Label: "Agresivo" | Description: "Máximo potencial de crecimiento, cómodo con alta volatilidad (crypto, growth stocks)"

Guardar como `risk_profile`: "conservative" | "moderate" | "aggressive"

### Paso 3 — Moneda local

**Pregunta con AskUserQuestion:**
- Question: "¿Cuál es tu moneda local? Se usará para mostrar precios de tus activos en tu moneda."
- Header: "Moneda"
- Options:
  1. Label: "COP (Peso colombiano)" | Description: "Colombia"
  2. Label: "MXN (Peso mexicano)" | Description: "México"
  3. Label: "ARS (Peso argentino)" | Description: "Argentina"
  4. Label: "Otra" | Description: "EUR, BRL, PEN, CLP, USD, u otra — escríbela"

Si elige "Otra", usar el texto que el usuario escriba como moneda local.

Guardar como `local_currency`: el código de moneda en mayúsculas (ej: "COP", "MXN", "EUR").

### Paso 4 — Watchlist Crypto

**Pregunta con AskUserQuestion:**
- Question: "¿Qué criptomonedas quieres rastrear en tu watchlist personal? (BTC y ETH siempre se incluyen)"
- Header: "Watchlist Crypto"
- Options:
  1. Label: "Solo BTC y ETH" | Description: "Los dos más grandes, nada más"
  2. Label: "BTC, ETH, SOL, ADA" | Description: "Las 4 más populares"
  3. Label: "BTC, ETH + las que yo diga" | Description: "Escribe los tickers que quieras agregar: SOL, AVAX, DOT, etc."
  4. Label: "No me interesa crypto" | Description: "Saltar esta sección"

Si elige opción 1: `crypto: ["BTC", "ETH"]`
Si elige opción 2: `crypto: ["BTC", "ETH", "SOL", "ADA"]`
Si elige opción 3: parsear el texto del usuario, agregar BTC y ETH si no están ya.
Si elige opción 4: `crypto: []`

### Paso 5 — Watchlist Acciones

**Pregunta con AskUserQuestion:**
- Question: "¿Qué acciones quieres rastrear en tu watchlist personal?"
- Header: "Watchlist Acciones"
- Options:
  1. Label: "Solo índices (SPX, IXIC)" | Description: "S&P 500 y NASDAQ como referencia"
  2. Label: "AAPL, NVDA, MELI, TSLA" | Description: "Populares en LatAm"
  3. Label: "Las que yo diga" | Description: "Escribe los tickers: AAPL, NVDA, AMZN, etc."
  4. Label: "No me interesan acciones" | Description: "Saltar esta sección"

Parsear igual que crypto. Si elige opción 4: `stocks: []`

### Paso 6 — Tema del dashboard

**Pregunta con AskUserQuestion:**
- Question: "¿Qué tema visual quieres para tu dashboard?"
- Header: "Tema"
- Options:
  1. Label: "Dark Terminal" | Description: "Fondo negro, texto verde monoespacio — estética Bloomberg/hacker"
  2. Label: "Dark Fintech" | Description: "Fondo oscuro elegante, glassmorphism, gradientes sutiles — estilo Binance"
  3. Label: "Light" | Description: "Fondo claro limpio, tipografía moderna — estilo fintech premium"

Guardar como `theme`: "dark-terminal" | "dark-fintech" | "light"

### Paso 7 — Idioma por defecto

**Pregunta con AskUserQuestion:**
- Question: "¿En qué idioma quieres el reporte?"
- Header: "Idioma"
- Options:
  1. Label: "Español" | Description: "Reporte y dashboard en español"
  2. Label: "English" | Description: "Report and dashboard in English"

Guardar como `language`: "es" | "en"

### Paso 8 — Generar config

Construir el objeto de configuración final con todos los valores recopilados:

```json
{
  "risk_profile": "<valor del paso 2>",
  "local_currency": "<valor del paso 3>",
  "watchlist": {
    "crypto": ["<activos del paso 4>"],
    "stocks": ["<activos del paso 5>"],
    "forex": [],
    "commodities": []
  },
  "theme": "<valor del paso 6>",
  "language": "<valor del paso 7>",
  "created_at": "<ISO timestamp actual>"
}
```

Escribir este JSON a `config/user-config.json` en el directorio de instalación del skill.

Para encontrar el directorio de instalación, usar Glob para buscar `**/portafolio/.claude/skills/portafolio/setup.md` y tomar el directorio raíz (3 niveles arriba del archivo encontrado).

### Paso 9 — Confirmar

Mostrar al usuario:

> ✅ **¡Configuración guardada!**
>
> - **Perfil:** {risk_profile}
> - **Moneda local:** {local_currency}
> - **Watchlist crypto:** {lista, o "solo BTC + ETH" si está vacío}
> - **Watchlist acciones:** {lista, o "solo índices" si está vacío}
> - **Tema:** {theme}
> - **Idioma:** {language}
>
> Los pares forex y commodities del watchlist pueden agregarse directamente en `config/user-config.json` editando los arrays `forex` y `commodities`.
>
> Ahora ejecuta `/portafolio` para generar tu primer reporte de mercados.

## Reglas

- Si el usuario ya tiene un `config/user-config.json`, preguntarle si quiere sobreescribirlo o salir.
- Siempre usar `AskUserQuestion` para las preguntas — nunca texto libre en el chat.
- El JSON generado debe ser válido (sin comentarios, sin trailing commas).
