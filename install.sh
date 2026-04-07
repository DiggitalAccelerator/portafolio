#!/usr/bin/env bash
# Portafolio — Instalador
# Uso: curl -sL https://raw.githubusercontent.com/DiggitalAccelerator/portafolio/main/install.sh | bash

set -e

REPO="https://github.com/DiggitalAccelerator/portafolio.git"
SKILL_NAME="portafolio"
CLONE_DIR="$HOME/.claude/plugins/portafolio"
SKILL_DIR="$HOME/.claude/skills/$SKILL_NAME"

echo ""
echo "  Portafolio — Análisis Multi-Agente de Mercados"
echo "  by Cristhian White | Diggital Accelerator"
echo ""

# Si ya está instalado, actualizar
if [ -d "$CLONE_DIR" ]; then
  echo "  Ya instalado en $CLONE_DIR"
  echo "  Actualizando..."
  cd "$CLONE_DIR" && git pull --quiet
  echo "  Actualizado correctamente."
  echo ""
  exit 0
fi

# Clonar el repo
echo "  Clonando skill..."
mkdir -p "$HOME/.claude/plugins"
git clone --quiet "$REPO" "$CLONE_DIR"

# Symlink del skill
mkdir -p "$HOME/.claude/skills"
ln -sf "$CLONE_DIR/.claude/skills/$SKILL_NAME" "$SKILL_DIR"

# Instalar dependencias del dashboard si Node está disponible
if command -v npm &> /dev/null; then
  echo "  Instalando dependencias del dashboard..."
  npm install --prefix "$CLONE_DIR/dashboard" --silent 2>/dev/null
  echo "  Dashboard listo."
else
  echo "  Node.js no encontrado — el dashboard usará el fallback HTML."
  echo "  Instala Node.js 18+ para el dashboard interactivo."
fi

echo ""
echo "  ¡Instalado correctamente!"
echo ""
echo "  Primero configura tu perfil:"
echo "    /portafolio-setup"
echo ""
echo "  Luego ejecuta tu análisis:"
echo "    /portafolio"
echo "    \"analizar mercados\""
echo "    \"reporte de portafolio\""
echo ""
echo "  Para desinstalar:"
echo "    rm -rf $SKILL_DIR $CLONE_DIR"
echo ""
