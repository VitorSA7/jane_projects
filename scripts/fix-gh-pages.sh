#!/bin/bash

# Script para resolver conflitos do branch gh-pages
echo "🔧 Resolvendo conflitos do branch gh-pages..."

# Verificar se estamos no branch correto
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Por favor, mude para o branch main primeiro"
    exit 1
fi

# Remover branch gh-pages local se existir
echo "🗑️ Removendo branch gh-pages local..."
git branch -D gh-pages 2>/dev/null || true

# Remover branch gh-pages remoto
echo "🗑️ Removendo branch gh-pages remoto..."
git push origin --delete gh-pages 2>/dev/null || true

# Fazer build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

# Criar novo branch gh-pages
echo "🌿 Criando novo branch gh-pages..."
git checkout --orphan gh-pages

# Remover todos os arquivos exceto out/
echo "🧹 Limpando arquivos desnecessários..."
git rm -rf . || true
git checkout main -- out/
git add out/
git commit -m "Deploy to GitHub Pages"

# Fazer push forçado
echo "🚀 Fazendo push para GitHub Pages..."
git push origin gh-pages --force

# Voltar para main
echo "↩️ Voltando para branch main..."
git checkout main

echo "✅ Conflito resolvido! O deploy deve funcionar agora." 