# Troubleshooting - GitHub Actions

## Problema: Workflow não está executando

### 🔍 **Verificações Necessárias:**

#### 1. **Estrutura de Arquivos**
Certifique-se de que os workflows estão na pasta correta:
```
.github/
└── workflows/
    ├── deploy.yml
    ├── test-simple.yml
    └── deploy-fallback.yml
```

#### 2. **Configuração do Repositório**
- ✅ Repositório deve estar público OU ter GitHub Pro
- ✅ GitHub Actions deve estar habilitado
- ✅ Branch `main` deve existir

#### 3. **Verificar GitHub Actions**
1. Vá para: https://github.com/VitorSA7/jane_projects/actions
2. Verifique se há workflows listados
3. Clique em "Run workflow" para executar manualmente

#### 4. **Configurações do Repositório**
1. Settings → Actions → General
2. Verifique se "Allow all actions and reusable workflows" está selecionado
3. Em "Workflow permissions", selecione "Read and write permissions"

### 🚀 **Soluções:**

#### **Solução 1: Execução Manual**
1. Vá para: https://github.com/VitorSA7/jane_projects/actions
2. Clique em "Deploy to GitHub Pages"
3. Clique em "Run workflow"
4. Selecione o branch `main`
5. Clique em "Run workflow"

#### **Solução 2: Verificar Branch**
```bash
# Verificar branch atual
git branch

# Se não estiver no main, mude para main
git checkout main

# Force push se necessário
git push origin main --force
```

#### **Solução 3: Reativar GitHub Actions**
1. Settings → Actions → General
2. Desabilite e reabilite GitHub Actions
3. Faça um novo commit

#### **Solução 4: Workflow Simples**
Use o workflow `test-simple.yml` para testar se o problema é específico do deploy.

### 📋 **Checklist de Verificação:**

- [ ] Workflow está na pasta `.github/workflows/`
- [ ] Arquivo tem extensão `.yml`
- [ ] Sintaxe YAML está correta
- [ ] Trigger `on: push: branches: [main]` está configurado
- [ ] Repositório está público ou tem GitHub Pro
- [ ] GitHub Actions está habilitado
- [ ] Branch `main` existe e é o padrão
- [ ] Último commit foi feito no branch `main`

### 🔧 **Comandos para Testar:**

```bash
# Verificar status do git
git status

# Verificar branch atual
git branch

# Verificar se o commit foi enviado
git log --oneline -5

# Verificar se os arquivos estão no repositório
git ls-files | grep workflow
```

### 📞 **Próximos Passos:**

1. **Execute o workflow manualmente** no GitHub
2. **Verifique os logs** se houver erro
3. **Teste o workflow simples** primeiro
4. **Verifique as configurações** do repositório

Se ainda não funcionar, pode ser um problema temporário do GitHub ou de configuração específica do repositório. 