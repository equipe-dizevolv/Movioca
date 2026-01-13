# MOVIOCA React

Conversão do projeto MOVIOCA de HTML + Bootstrap para React.

## 📁 Estrutura do Projeto

```
movioca-react/
├── public/
│   └── images/         # Imagens do projeto
├── src/
│   ├── assets/
│   │   ├── css/        # Arquivos CSS (Bootstrap, estilos)
│   │   ├── font/       # Fontes
│   │   ├── icon/       # Ícones (icomoon)
│   │   ├── js/         # Scripts (apexcharts, etc)
│   │   └── scss/       # Arquivos SCSS
│   ├── components/
│   │   ├── Header.jsx      # Cabeçalho do dashboard
│   │   ├── Layout.jsx      # Layout principal
│   │   ├── Preloader.jsx   # Componente de carregamento
│   │   ├── Sidebar.jsx     # Menu lateral
│   │   └── index.js        # Exports
│   ├── pages/
│   │   ├── Account.jsx     # Página de conta
│   │   ├── Component.jsx   # Página de componentes
│   │   ├── Crypto.jsx      # Página de criptomoedas
│   │   ├── Exchange.jsx    # Página de exchange
│   │   ├── Index.jsx       # Dashboard principal
│   │   ├── Message.jsx     # Página de mensagens
│   │   ├── MyWallet.jsx    # Página da carteira
│   │   ├── Notifications.jsx # Notificações
│   │   ├── Settings.jsx    # Configurações
│   │   ├── SignIn.jsx      # Página de login
│   │   ├── SignUp.jsx      # Página de cadastro
│   │   └── Transaction.jsx # Transações
│   ├── App.jsx             # Componente principal com rotas
│   └── main.jsx            # Ponto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🛠️ Tecnologias

- **React 19** - Biblioteca de UI
- **React Router DOM 7** - Roteamento
- **Vite 6** - Build tool
- **Bootstrap** - Framework CSS (mantido do original)
- **ApexCharts** - Gráficos

## 📝 Conversão HTML → React

### Regras aplicadas:
- `class` → `className`
- `for` → `htmlFor`
- `style="..."` → `style={{...}}`
- `checked` → `defaultChecked`
- `value` → `defaultValue`
- Atributos SVG em camelCase (`stroke-width` → `strokeWidth`)

### Componentes Reutilizáveis:
- **Layout** - Wrapper para páginas internas (sidebar + header)
- **Sidebar** - Menu lateral com navegação
- **Header** - Cabeçalho com busca, notificações e perfil
- **Preloader** - Indicador de carregamento

## 🔗 Rotas

| Rota | Página |
|------|--------|
| `/` | Dashboard (Index) |
| `/account` | Conta |
| `/component` | Componentes |
| `/crypto` | Criptomoedas |
| `/exchange` | Exchange |
| `/message` | Mensagens |
| `/my-wallet` | Carteira |
| `/notifications` | Notificações |
| `/settings` | Configurações |
| `/sign-in` | Login |
| `/sign-up` | Cadastro |
| `/transaction` | Transações |

## ✅ Checklist de Conversão

- [x] Estrutura de pastas React
- [x] Componentes reutilizáveis
- [x] Todas as 12 páginas convertidas
- [x] CSS/Bootstrap preservado
- [x] Fontes e ícones funcionando
- [x] Rotas configuradas
- [x] Build funcional

## 📌 Observações

1. **Visual idêntico**: O layout, cores, fontes e espaçamentos são 100% idênticos ao projeto HTML original.

2. **Bootstrap**: O Bootstrap é carregado via CSS, mantendo todas as classes originais.

3. **Gráficos**: Os gráficos ApexCharts estão configurados como placeholders. Para funcionalidade completa, integrar com `react-apexcharts`.

4. **Scripts JS**: A funcionalidade de interação (menus, tabs, etc.) foi reimplementada no React via `useEffect` no App.jsx.

---

Desenvolvido como parte da conversão MOVIOCA HTML → React.
