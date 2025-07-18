# Guia de Deploy para GitHub Pages

## Problema Atual
Você está enfrentando um erro de conflito de referências no branch `gh-pages`:
```
! [remote rejected] gh-pages -> gh-pages (cannot lock ref 'refs/heads/gh-pages')
```

## Soluções

### Solução 1: Workflow Atualizado (Recomendado)
O arquivo `.github/workflows/deploy.yml` foi atualizado para usar o novo sistema de GitHub Pages com as seguintes melhorias:

- ✅ Usa `actions/deploy-pages@v4` (mais estável)
- ✅ Configuração de permissões adequadas
- ✅ Controle de concorrência para evitar conflitos
- ✅ Cache de dependências para builds mais rápidos

### Solução 2: Workflow Alternativo
Se a Solução 1 não funcionar, use o arquivo `.github/workflows/deploy-fallback.yml` que:

- ✅ Usa `force_orphan: true` para forçar recriação do branch
- ✅ Configuração específica para resolver conflitos de referência

### Solução 3: Resolução Manual
Execute o script local para resolver o conflito:

```bash
# No Windows (PowerShell)
chmod +x scripts/fix-gh-pages.sh
./scripts/fix-gh-pages.sh

# Ou execute manualmente:
git branch -D gh-pages
git push origin --delete gh-pages
npm run build
git checkout --orphan gh-pages
git rm -rf .
git checkout main -- out/
git add out/
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
git checkout main
```

## Configurações Importantes

### 1. GitHub Pages Settings
Certifique-se de que no repositório:
- Settings → Pages → Source: "Deploy from a branch"
- Branch: `gh-pages` (ou `main` se usar o novo workflow)
- Folder: `/ (root)`

### 2. Permissões do Workflow
O workflow precisa das seguintes permissões:
- `contents: read`
- `pages: write`
- `id-token: write`

### 3. Configuração do Next.js
O `next.config.ts` está configurado corretamente para:
- Exportação estática (`output: 'export'`)
- Base path para subdiretório (`/jane_projects`)
- Imagens não otimizadas (necessário para exportação estática)

## Troubleshooting

### Erro: "cannot lock ref"
- Use o script `fix-gh-pages.sh`
- Ou delete manualmente o branch `gh-pages` no GitHub

### Erro: "Build failed"
- Verifique se todas as dependências estão instaladas
- Execute `npm ci` localmente para testar

### Erro: "404 on GitHub Pages"
- Verifique se o `basePath` está correto no `next.config.ts`
- Confirme se o repositório está público ou tem GitHub Pro

## Próximos Passos

1. **Commit e push das mudanças:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

2. **Verificar o workflow:**
   - Vá para Actions no GitHub
   - Monitore o progresso do deploy

3. **Testar o site:**
   - Acesse `https://vitorsa7.github.io/jane_projects/`
   - Verifique se todas as páginas carregam corretamente

## Estrutura de Arquivos Importantes

```
jane_projects/
├── .github/workflows/
│   ├── deploy.yml          # Workflow principal atualizado
│   └── deploy-fallback.yml # Workflow alternativo
├── scripts/
│   └── fix-gh-pages.sh     # Script de resolução manual
├── next.config.ts          # Configuração do Next.js
├── package.json            # Scripts de build
└── DEPLOYMENT.md           # Este arquivo
``` 