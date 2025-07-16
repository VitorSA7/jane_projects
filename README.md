# 📝 Sistema de Aprendizado de Grafologia

Sistema completo de aprendizado de Grafologia com chatbot IA, sistema SRS (Spaced Repetition System) e exames práticos.

## 🚀 Funcionalidades

- **🤖 Chatbot IA**: Tire dúvidas sobre grafologia com IA especializada
- **📚 Sistema SRS**: Revise conceitos importantes com repetição espaçada
- **📝 Exame Prático**: Teste seus conhecimentos analisando amostras de escrita

## 🛠️ Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jane_works.git
cd jane_works

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

## 🌐 Deploy no GitHub Pages

### Configuração Automática (Recomendado)

1. **Crie um repositório no GitHub** com o nome `jane_works`
2. **Faça push do código** para o repositório
3. **Configure o GitHub Pages**:
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
4. **O deploy será automático** quando você fizer push para a branch `main`

### Deploy Manual

```bash
# Build do projeto
npm run build

# Os arquivos estarão na pasta `out/`
# Faça upload da pasta `out/` para o GitHub Pages
```

## 📁 Estrutura do Projeto

```
jane_works/
├── src/
│   └── app/
│       ├── page.tsx              # Página inicial
│       ├── chatbot/page.tsx      # Chatbot IA
│       ├── aprendizado/page.tsx  # Sistema SRS
│       └── exame/page.tsx        # Exame prático
├── public/                       # Arquivos estáticos
├── .github/workflows/            # GitHub Actions
└── next.config.ts               # Configuração Next.js
```

## 🔧 Configurações

### Para GitHub Pages

O projeto está configurado para funcionar no GitHub Pages com:

- `output: 'export'` - Gera arquivos estáticos
- `basePath: '/jane_works'` - Configura o path base
- `trailingSlash: true` - Adiciona barra no final das URLs

### Variáveis de Ambiente

```env
# Para desenvolvimento local
NODE_ENV=development

# Para produção (GitHub Pages)
NODE_ENV=production
```

## 🚀 Próximos Passos

- [ ] Conectar API do OpenRouter no chatbot
- [ ] Adicionar imagens reais de amostras de escrita
- [ ] Implementar persistência de dados
- [ ] Expandir banco de questões

## 📄 Licença

MIT License

---

**Desenvolvido com ❤️ para aprendizado de Grafologia**
