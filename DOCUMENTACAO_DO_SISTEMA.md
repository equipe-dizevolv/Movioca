# 📚 Documentação Completa do Sistema MOVIOCA

> **Sistema de Gestão de Projetos Audiovisuais**  
> Versão: 0.1.0 | Data: Janeiro 2026

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
3. [Sistema de Autenticação e Perfis](#sistema-de-autenticação-e-perfis)
4. [Módulo de Autenticação](#módulo-de-autenticação)
5. [Dashboards por Perfil](#dashboards-por-perfil)
6. [Módulo de Gestão de Projetos](#módulo-de-gestão-de-projetos)
7. [Módulo de Orçamento](#módulo-de-orçamento)
8. [Módulo de Contratação](#módulo-de-contratação)
9. [Módulo de Pagamentos](#módulo-de-pagamentos)
10. [Módulo de Verbas e Despesas](#módulo-de-verbas-e-despesas)
11. [Módulo de Controladoria e Aprovações](#módulo-de-controladoria-e-aprovações)
12. [Portal do Fornecedor](#portal-do-fornecedor)
13. [Portal do Elenco](#portal-do-elenco)
14. [Módulo de Relatórios](#módulo-de-relatórios)
15. [Módulo de Documentos](#módulo-de-documentos)
16. [Módulo de Configurações](#módulo-de-configurações)
17. [Componentes de UI](#componentes-de-ui)
18. [Contextos e Hooks](#contextos-e-hooks)
19. [Sistema de Permissões](#sistema-de-permissões)
20. [Credenciais de Teste](#credenciais-de-teste)

---

## Visão Geral

O **MOVIOCA** é um sistema completo de gestão de projetos audiovisuais que abrange desde o planejamento orçamentário até a execução financeira, incluindo controle de contratos, pagamentos, verbas e prestação de contas.

### Principais Características
- 🎬 Gestão multi-projeto com visão consolidada
- 💰 Controle orçamentário com congelamento e contingência
- 📄 Fluxo de contratação completo com validação de CNAE
- 💳 Gestão de verbas com cartões corporativos
- ✅ Pipeline de aprovação multi-etapas
- 🔐 Sistema de permissões granular por perfil (RBAC)
- 🌙 Suporte a Dark Mode
- 📱 Design responsivo

---

## Arquitetura e Tecnologias

### Stack Padrão
| Camada | Tecnologia |
|--------|------------|
| **Front-end** | React JS |
| **Back-end** | Node JS |
| **Banco de Dados** | Supabase |

### Stack Tecnológico Completo

#### Front-end
| Tecnologia | Uso |
|------------|-----|
| **React 18.3** | Framework principal |
| **TypeScript** | Tipagem estática |
| **Vite 6.3** | Build tool |
| **Tailwind CSS** | Estilização |
| **Radix UI** | Componentes de UI primitivos |
| **Recharts** | Gráficos e visualizações |
| **React Hook Form** | Gerenciamento de formulários |
| **date-fns** | Manipulação de datas |
| **Sonner** | Sistema de notificações (Toast) |
| **Lucide React** | Biblioteca de ícones |

#### Back-end
| Tecnologia | Uso |
|------------|-----|
| **Node.js** | Runtime JavaScript servidor |
| **Express** | Framework HTTP (futuro) |
| **Supabase Functions** | Serverless functions |

#### Banco de Dados
| Tecnologia | Uso |
|------------|-----|
| **Supabase** | Backend-as-a-Service |
| **PostgreSQL** | Banco relacional (via Supabase) |
| **Supabase Auth** | Autenticação de usuários |
| **Supabase Storage** | Armazenamento de arquivos |
| **Supabase Realtime** | Sincronização em tempo real |

### Estrutura de Pastas
```
src/
├── App.tsx                # Componente raiz e roteamento
├── main.tsx               # Ponto de entrada
├── index.css              # Estilos base
├── components/
│   ├── index.ts           # Exportações centralizadas
│   ├── auth/              # Telas de autenticação
│   ├── elenco/            # Portal do Elenco
│   ├── figma/             # Componentes Figma
│   ├── fornecedor/        # Portal do Fornecedor
│   ├── screens/           # Telas principais (53 arquivos)
│   └── ui/                # Componentes UI base (48 arquivos)
│       └── index.ts       # Exportações centralizadas de UI
├── contexts/
│   ├── index.ts           # Exportações centralizadas
│   ├── AuthContext.tsx    # Contexto de autenticação
│   └── ProjectFilterContext.tsx  # Filtro de projeto global
├── hooks/
│   ├── index.ts           # Exportações centralizadas
│   ├── useDebounce.ts     # Hook de debounce
│   ├── useFilter.ts       # Hook de filtros
│   ├── useLocalStorage.ts # Hook de localStorage
│   ├── usePagination.ts   # Hook de paginação
│   ├── useSpreadsheetNavigation.ts # Navegação em grids
│   └── useTableSort.ts    # Hook de ordenação
├── types/
│   ├── index.ts           # Exportações centralizadas
│   └── fornecedor.ts      # Tipos do fornecedor
├── utils/
│   ├── index.ts           # Exportações centralizadas
│   ├── orcamento.ts       # Utilitários de orçamento
│   └── permissoes.ts      # Sistema de permissões
└── styles/
    └── globals.css        # Estilos globais

doc/                       # Documentação do sistema
├── analise/               # Análises e auditorias
├── guias/                 # Guias de uso
└── implementacao/         # Documentação de implementação
```

---

## Sistema de Autenticação e Perfis

### Perfis de Usuário (UserRole)
O sistema possui **9 perfis** distintos com permissões específicas:

| Perfil | Descrição | Menus Disponíveis |
|--------|-----------|-------------------|
| **Administrador** | Acesso total ao sistema | Dashboard, Projetos, Plano de Contas, Orçamento, Contratação, Elenco & Equipe, Fornecedores, Pagamentos, Verbas, Relatórios, Usuários, Documentos, Configurações |
| **Produção Executiva Interna (PEI)** | Gestão completa de projetos | Dashboard, Projetos, Plano de Contas, Orçamento, Contratação, Elenco & Equipe, Verbas, Documentos, Configurações |
| **Produção Executiva Dedicada (PED)** | Gestão de projeto específico | Dashboard, Orçamento, Contratação, Elenco & Equipe, Verbas, Documentos, Configurações |
| **Controladoria Interna (CI)** | Aprovação final de pagamentos | Dashboard, Central de Aprovações, Lotes de Verba, Fornecedores, Relatórios, Configurações |
| **Controladoria Dedicada (CD)** | Validação técnica em campo | Dashboard, Orçamento, Contratação, Gestão Financeira, Verbas, Relatórios, Configurações |
| **Financeiro** | Execução de pagamentos | Dashboard, Orçamento, Contratação, Gestão Financeira, Documentos, Relatórios, Configurações |
| **Equipe Dedicada** | Gestão de cartões e despesas | Dashboard, Meus Cartões, Lançar Despesas, Prestação de Contas, Orçamento, Configurações |
| **Fornecedor** | Portal externo de fornecedores | Dashboard, Pagamentos, Documentos, Configurações |
| **Elenco** | Portal de atores/técnicos PF | Dashboard, Documentos, Configurações |

### Usuários de Demonstração
```typescript
const users = [
  { name: 'Maria', role: 'Administrador' },
  { name: 'Carla', role: 'Financeiro' },
  { name: 'Bruno', role: 'Controladoria Dedicada' },
  { name: 'João', role: 'Controladoria Interna' },
  { name: 'Ana', role: 'Produção Executiva Dedicada' },
  { name: 'Pedro', role: 'Produção Executiva Interna' },
  { name: 'Luiza', role: 'Equipe Dedicada' },
  { name: 'Empresa ABC', role: 'Fornecedor' },
  { name: 'Maria da Luz', role: 'Elenco' },
];
```

---

## Módulo de Autenticação

### Telas

#### 1. Login (`Login.tsx`)
- **Arquivo**: `src/components/auth/Login.tsx`
- **Linhas**: 208
- **Funcionalidades**:
  - Campo de usuário e senha
  - Toggle de Dark Mode na tela de login
  - Link para recuperação de senha
  - Botão de acesso ao Portal do Elenco
  - Botão de cadastro de fornecedor
  - Feedback visual de loading
  - Toast de erro/sucesso

#### 2. Recuperação de Senha (`ForgotPassword.tsx`)
- **Arquivo**: `src/components/auth/ForgotPassword.tsx`
- **Funcionalidades**:
  - Campo de e-mail
  - Envio de link de recuperação
  - Voltar para login

#### 3. Rotas Públicas (`PublicRoutes.tsx`)
- **Arquivo**: `src/components/PublicRoutes.tsx`
- **Funcionalidades**:
  - Acesso a formulário cadastral sem autenticação
  - Roteamento via hash URL

---

## Dashboards por Perfil

### 1. Dashboard Geral (`Dashboard.tsx`)
- **Arquivo**: `src/components/screens/Dashboard.tsx`
- **Linhas**: 451
- **Funcionalidades**:
  - KPIs de Liquidez consolidados
  - Filtro por projeto
  - Resumo de verbas
  - Alertas de vencimentos
  - Cards de ações pendentes

### 2. Dashboard PEI (`DashboardPEI.tsx`)
- **Arquivo**: `src/components/screens/DashboardPEI.tsx`
- **Linhas**: 407
- **Funcionalidades**:
  - Visão multi-projeto
  - Tabela de projetos ativos com métricas
  - Indicadores de desvio orçamentário
  - Alertas de contingência
  - Navegação rápida para detalhes do projeto

### 3. Dashboard PED (`DashboardPED.tsx`)
- **Arquivo**: `src/components/screens/DashboardPED.tsx`
- **Funcionalidades**:
  - Visão do projeto vinculado
  - Gráfico de progresso
  - Rubricas delegadas
  - Status de contratos

### 4. Dashboard Financeiro (`DashboardFinanceiro.tsx`)
- **Arquivo**: `src/components/screens/DashboardFinanceiro.tsx`
- **Linhas**: 463
- **Funcionalidades**:
  - **KPIs de Ciclo** (dias 10, 20, 30)
  - Saldos por conta (1T, 2T)
  - Valores comprometidos aprovados por CI
  - Resultado projetado (Saldo - Comprometido)
  - Detalhamento por ciclo de pagamento
  - Reembolsos pendentes

### 5. Dashboard Controladoria Interna (`DashboardControladoriaInterna.tsx`)
- **Arquivo**: `src/components/screens/DashboardControladoriaInterna.tsx`
- **Linhas**: 534
- **Funcionalidades**:
  - Fila de pagamentos pendentes de aprovação
  - Alertas de prazo e vencimento
  - Lotes de verba aguardando revisão
  - Indicadores de compliance
  - Estatísticas de glosas
  - Atividades recentes

### 6. Dashboard Controladoria Dedicada (`DashboardControladoriaDedicadaNew.tsx`)
- **Arquivo**: `src/components/screens/DashboardControladoriaDedicadaNew.tsx`
- **Linhas**: 1283
- **Funcionalidades**:
  - **KPIs de Projeto** (sticky header)
  - **Hub Unificado de Validação** com 3 abas:
    - Equipe & Elenco
    - Fornecedores
    - Documentos
  - Split-screen para visualização de documentos
  - Gestão de Verba e Cartões
  - Filtros rápidos por departamento
  - Atalhos de teclado

### 7. Dashboard Equipe Dedicada (`DashboardEquipeDedicada.tsx`)
- **Arquivo**: `src/components/screens/DashboardEquipeDedicada.tsx`
- **Linhas**: 457
- **Funcionalidades**:
  - "Minha Carteira de Produção"
  - Carrossel de cartões corporativos
  - Saldo disponível por cartão
  - Histórico de cargas
  - Atalhos: Solicitar carga, Lançar despesas

---

## Módulo de Gestão de Projetos

### 1. Lista de Projetos (`Projetos.tsx`)
- **Arquivo**: `src/components/screens/Projetos.tsx`
- **Linhas**: 1313
- **Funcionalidades**:
  - Listagem com busca e filtros
  - Criar novo projeto
  - Editar projeto existente
  - Duplicar projeto (com opção de copiar orçamento)
  - Excluir projeto (confirmação com código)
  - Gerenciar fontes de financiamento
  - Associar coprodutores
  - Definir formato (Série, Longa, etc.)

### 2. Detalhes do Projeto (`ProjetoDetalhes.tsx`)
- **Arquivo**: `src/components/screens/ProjetoDetalhes.tsx`
- **Funcionalidades**:
  - Informações completas do projeto
  - Métricas orçamentárias
  - Timeline de produção
  - Equipe vinculada
  - Navegação para módulos relacionados

---

## Módulo de Orçamento

### 1. Orçamento Principal (`Orcamento.tsx`)
- **Arquivo**: `src/components/screens/Orcamento.tsx`
- **Linhas**: 2378 ⚠️ (arquivo extenso)
- **Funcionalidades**:
  - **Matriz orçamentária completa** com colunas:
    - Gestão, Código, Descrição, Fornecedor
    - Liberado, Aprovado (Congelado), Comprometido, Realizado
    - Total Gasto, Saldo Disponível, Contingência
  - **Congelamento de orçamento** (copia Liberado para Aprovado)
  - Edição inline de células
  - Navegação por teclado (estilo planilha)
  - Delegação de rubricas a gestores
  - Exportação de dados
  - Filtros por departamento/gestor
  - **Integração automática**:
    - Comprometido: atualizado ao formalizar contrato
    - Realizado: atualizado ao pagar parcela

### 2. Matriz Orçamento PED (`MatrizOrcamentoPED.tsx`)
- **Arquivo**: `src/components/screens/MatrizOrcamentoPED.tsx`
- **Funcionalidades**:
  - Versão filtrada do orçamento
  - Apenas rubricas delegadas ao PED
  - Validação de saldo antes de contratar

### 3. Orçamento Dinâmico (`OrcamentoDinamico.tsx`)
- **Arquivo**: `src/components/screens/OrcamentoDinamico.tsx`
- **Funcionalidades**:
  - Versão alternativa do orçamento
  - Interface mais fluida

### 4. Plano de Contas (`PlanoDeContas.tsx`)
- **Arquivo**: `src/components/screens/PlanoDeContas.tsx`
- **Linhas**: 811
- **Funcionalidades**:
  - Gerenciar planos de contas
  - Criar novo plano
  - Editar itens existentes
  - **Wizard de criação** de orçamento a partir de plano
  - **Upload de planilha** com mapeamento de colunas
  - Copiar estrutura de projetos anteriores

---

## Módulo de Contratação

### 1. Lista de Contratações (`Contratacao.tsx`)
- **Arquivo**: `src/components/screens/Contratacao.tsx`
- **Linhas**: 1780
- **Funcionalidades**:
  - Listagem de contratos
  - Status: Cadastro, Acordo, Contrato, Aditivo, Distrato
  - Validação de CNAE
  - Cronograma de pagamento
  - Upload de documentos (Google Drive integration)
  - Dados bancários do fornecedor
  - Pagamento atrelado à entrega

### 2. Nova Contratação (`NovaContratacao.tsx`)
- **Arquivo**: `src/components/screens/NovaContratacao.tsx`
- **Funcionalidades**:
  - Formulário completo de nova contratação
  - Seleção de projeto e item orçamentário
  - Busca de fornecedor cadastrado
  - Validação de saldo disponível
  - Definição de cronograma de parcelas
  - Flag de RPA (Recibo Pagamento Autônomo)

### 3. Editar Contratação (`EditarContratacao.tsx`)
- **Arquivo**: `src/components/screens/EditarContratacao.tsx`
- **Funcionalidades**:
  - Edição de contrato existente
  - Histórico de alterações
  - Upload de aditivos

### 4. Contratos PED (`ContratosPED.tsx`)
- **Arquivo**: `src/components/screens/ContratosPED.tsx`
- **Funcionalidades**:
  - Visão filtrada para Produção Executiva Dedicada
  - Apenas contratos vinculados às rubricas delegadas

### 5. Fornecedores (`Fornecedores.tsx`)
- **Arquivo**: `src/components/screens/Fornecedores.tsx`
- **Linhas**: 668
- **Funcionalidades**:
  - Base de dados de fornecedores
  - Cadastro de PJ e PF
  - Dados bancários (Banco, Agência, Conta, PIX)
  - Histórico de projetos
  - Visualizar contratos do fornecedor

### 6. Formulário Cadastral (`FormularioCadastral.tsx`)
- **Arquivo**: `src/components/screens/FormularioCadastral.tsx`
- **Linhas**: 945
- **Funcionalidades**:
  - **Formulário público** para auto-cadastro
  - Seleção: Equipe ou Fornecedor
  - **4 etapas**:
    1. Dados de Produção e Alocação
    2. Dados da Empresa (PJ) ou Pessoais (PF)
    3. Dados Bancários
    4. Upload de Documentos
  - Alergias e informações de emergência (para Equipe)
  - Lista de funcionários alocados (para Fornecedor)

---

## Módulo de Pagamentos

### 1. Lista de Pagamentos (`Pagamentos.tsx`)
- **Arquivo**: `src/components/screens/Pagamentos.tsx`
- **Linhas**: 1737
- **Funcionalidades**:
  - Listagem de todas as parcelas
  - Filtros por status, fornecedor, projeto
  - **Pipeline de aprovação**:
    - Solicitação NF
    - Validação NF
    - Aprovação CD
    - Aprovação CI (Conformidade)
    - Aprovação CI (Financeira)
    - Liberação Financeiro
    - Pagamento Realizado
  - Integração OMIE (status de envio)
  - Download de comprovantes
  - Reagendamento de pagamentos

### 2. Detalhes do Pagamento (`PagamentoDetalhes.tsx`)
- **Arquivo**: `src/components/screens/PagamentoDetalhes.tsx`
- **Funcionalidades**:
  - Visualização completa do pagamento
  - Timeline de aprovações
  - Documentos anexados
  - Histórico de alterações

### 3. Gestão Financeira (`GestaoFinanceira.tsx`)
- **Arquivo**: `src/components/screens/GestaoFinanceira.tsx`
- **Funcionalidades**:
  - Visão consolidada para perfil Financeiro
  - Execução de pagamentos
  - Confirmação de transferências bancárias

### 4. Painel de Reembolsos (`PainelReembolsos.tsx`)
- **Arquivo**: `src/components/screens/PainelReembolsos.tsx`
- **Funcionalidades**:
  - Solicitações de reembolso
  - Status de processamento
  - Aprovação/Reprovação

---

## Módulo de Verbas e Despesas

### 1. Controle de Verba (`ControleDeVerba.tsx`)
- **Arquivo**: `src/components/screens/ControleDeVerba.tsx`
- **Linhas**: 1927
- **Funcionalidades**:
  - Previsão de demanda por departamento
  - Gestão de cartões corporativos
  - Solicitações de verba
  - Aprovação em cascata (Departamento → CD → CI)
  - Histórico de movimentações
  - Bloqueio/Desbloqueio de cartões

### 2. Verbas (`Verbas.tsx`)
- **Arquivo**: `src/components/screens/Verbas.tsx`
- **Linhas**: 1332
- **Funcionalidades**:
  - Dashboard de verbas
  - Resumo por departamento
  - Prestação de contas
  - Solicitação de verba
  - Comprovantes anexados

### 3. Meus Cartões (`MeusCartoes.tsx`)
- **Arquivo**: `src/components/screens/MeusCartoes.tsx`
- **Linhas**: 666
- **Funcionalidades**:
  - **Cadastrar cartão físico**
  - Apelido, número, bandeira
  - Solicitar carga de verba
  - Visualizar extrato
  - Editar/Excluir cartão
  - Status: Ativo/Bloqueado

### 4. Lançar Despesas (`LancarDespesas.tsx`)
- **Arquivo**: `src/components/screens/LancarDespesas.tsx`
- **Linhas**: 701
- **Funcionalidades**:
  - **Registro mobile-first**
  - Selecionar cartão
  - Data, fornecedor, valor
  - Classificar por rubrica
  - **Tirar foto** do comprovante
  - Upload de NF
  - Despesas em rascunho

### 5. Prestação de Contas (`PrestacaoContas.tsx`)
- **Arquivo**: `src/components/screens/PrestacaoContas.tsx`
- **Linhas**: 594
- **Funcionalidades**:
  - Selecionar despesas para envio
  - Criar lote de prestação
  - Enviar para CD
  - Histórico de lotes enviados
  - Status: Rascunho, Enviado, Aprovado, Reprovado

### 6. Solicitação de Verba (`SolicitacaoDeVerba.tsx`)
- **Arquivo**: `src/components/screens/SolicitacaoDeVerba.tsx`
- **Funcionalidades**:
  - Formulário de solicitação
  - Selecionar cartão destino
  - Justificativa obrigatória
  - Valor solicitado

### 7. Conferência de Verba (`ConferenciaVerba.tsx`)
- **Arquivo**: `src/components/screens/ConferenciaVerba.tsx`
- **Funcionalidades**:
  - Validação de uso de verbas
  - Conferência de comprovantes
  - Aprovação/Glosa de itens

---

## Módulo de Controladoria e Aprovações

### 1. Central de Aprovações (`CentralAprovacoes.tsx`)
- **Arquivo**: `src/components/screens/CentralAprovacoes.tsx`
- **Linhas**: 689
- **Funcionalidades**:
  - **Fila de trabalho** com abas:
    - Aguardando NF
    - Análise CD
    - Análise CI
    - Liberado Financeiro
    - Pago
  - Filtros por projeto, vencimento, fornecedor
  - Alertas de urgência
  - Navegação para Mesa de Análise

### 2. Mesa de Análise (`MesaDeAnalise.tsx`)
- **Arquivo**: `src/components/screens/MesaDeAnalise.tsx`
- **Linhas**: 604
- **Funcionalidades**:
  - **Split View**:
    - Esquerda: Dados do sistema
    - Direita: Visualizador de NF (PDF)
  - Conferência cruzada de valores
  - Links para Contrato e Cartão CNPJ
  - **Aprovação/Reprovação** com justificativa obrigatória
  - Zoom e rotação do documento
  - Próximo pagamento na fila

### 3. Triagem de Pagamentos (`TriagemPagamentos.tsx`)
- **Arquivo**: `src/components/screens/TriagemPagamentos.tsx`
- **Linhas**: 527
- **Funcionalidades**:
  - **Fila de validação CD** (Nível 1)
  - Verificar entrega de serviço/produto
  - Aprovar para envio à CI
  - Reprovar com motivo

### 4. Aprovação de Lotes de Verba (`AprovacaoLotesVerba.tsx`)
- **Arquivo**: `src/components/screens/AprovacaoLotesVerba.tsx`
- **Linhas**: 576
- **Funcionalidades**:
  - Fila de lotes de prestação de contas
  - Visualizar despesas individuais
  - **Glosar itens específicos**
  - Aprovação parcial ou total
  - Observações da CD

### 5. Mesa de Conferência CD (`MesaConferenciaCD.tsx`)
- **Arquivo**: `src/components/screens/MesaConferenciaCD.tsx`
- **Funcionalidades**:
  - Interface de conferência para Controladoria Dedicada
  - Validação técnica de despesas
  - Upload de PDF unificado (scan profissional)

### 6. Histórico de Glosas (`HistoricoGlosas.tsx`)
- **Arquivo**: `src/components/screens/HistoricoGlosas.tsx`
- **Linhas**: 582
- **Funcionalidades**:
  - **Histórico completo** de itens glosados/reprovados
  - Filtros por tipo, projeto, período
  - **Estatísticas por fornecedor**:
    - Total de glosas
    - Valor total glosado
    - Percentual de erro
  - Identificar padrões de erro
  - Exportar relatório

---

## Portal do Fornecedor

> Portal dedicado para fornecedores externos acessarem o sistema

### Estrutura
- **Arquivo Principal**: `src/components/fornecedor/FornecedorApp.tsx`
- **Telas**: 7 arquivos

### Telas do Portal

#### 1. Dashboard do Fornecedor (`FornecedorDashboard.tsx`)
- **Linhas**: 213
- **Funcionalidades**:
  - Resumo de pagamentos
  - Próxima data de pagamento
  - Quantidade de parcelas
  - **Alertas**:
    - Notas pendentes de envio
    - Notas reprovadas

#### 2. Meus Pagamentos (`FornecedorPagamentos.tsx`)
- **Linhas**: 523
- **Funcionalidades**:
  - Lista de parcelas/pagamentos
  - Resumo financeiro (A Receber / Pago)
  - Status: Aguardando NF, Em Análise, Agendado, Pago, Correção Solicitada
  - **Ações**:
    - Enviar Nota Fiscal (modal)
    - Ver comprovante de pagamento
    - Ver motivo de recusa

#### 3. Modal de Envio de NF (`ModalEnvioNF.tsx`)
- **Funcionalidades**:
  - Upload de arquivo NF
  - Campos de dados fiscais
  - Validação de formato

#### 4. Meus Contratos (`FornecedorDocumentos.tsx`)
- **Linhas**: 535
- **Funcionalidades**:
  - Lista de contratos assinados
  - Filtros por projeto e status
  - Visualizar detalhes do contrato
  - Download de PDF
  - Status: Vigente, Encerrado, Pendente

#### 5. Configurações do Fornecedor (`ConfiguracoesFornecedor.tsx`)
- **Funcionalidades**:
  - Atualizar dados cadastrais
  - Dados bancários
  - Notificações

---

## Portal do Elenco

> Portal dedicado para atores, atrizes e equipe técnica (Pessoa Física)

### Estrutura
- **Arquivo Principal**: `src/components/elenco/ElencoApp.tsx`
- **Linhas**: 137
- **Telas**: 6 arquivos

### Telas do Portal

#### 1. Onboarding (`ElencoOnboarding.tsx`)
- **Funcionalidades**:
  - Login com código de acesso
  - Primeiro acesso
  - Recuperação de senha

#### 2. Dashboard do Elenco (`ElencoDashboard.tsx`)
- **Linhas**: 348
- **Funcionalidades**:
  - Resumo de cachês
  - Contratos ativos
  - Pagamentos programados
  - **Avisos importantes**

#### 3. Minha Ficha (`ElencoFicha.tsx`)
- **Funcionalidades**:
  - **Ficha cadastral estendida**:
    - Nome Artístico
    - DRT
    - Medidas
    - Alergias
    - Contato de emergência
  - LGPD compliant

#### 4. Documentos do Elenco (`ElencoDocumentos.tsx`)
- **Funcionalidades**:
  - Upload de documentos:
    - RG, CPF
    - Atestado Médico
    - Comprovante de Residência
  - Status de validação

#### 5. Configurações do Elenco (`ElencoConfiguracoes.tsx`)
- **Funcionalidades**:
  - Dados pessoais
  - Notificações

---

## Módulo de Relatórios

### Relatórios (`Relatorios.tsx`)
- **Arquivo**: `src/components/screens/Relatorios.tsx`
- **Linhas**: 692
- **Funcionalidades**:
  - **Report Builder**:
    - Selecionar campos (drag & drop)
    - Definir agrupamentos
    - Preview antes de gerar
  - **Campos disponíveis**:
    - Projeto, Departamento, Gestão, Fase, Status
    - Item orçamentário, Grande item
    - Contratado, Comprometido, Realizado, Liberado, Saldo
  - **Filtros**:
    - Projeto
    - Departamento/Gestão
    - Fase
    - Status
    - Grande Item
  - **Exportação**:
    - Excel (XLS)
    - PDF
  - Relatórios pré-definidos

---

## Módulo de Documentos

### Documentos (`Documentos.tsx`)
- **Arquivo**: `src/components/screens/Documentos.tsx`
- **Linhas**: 422
- **Funcionalidades**:
  - Repositório central de arquivos
  - Filtros por projeto e tipo
  - **Tipos de documento**:
    - Contrato
    - Nota Fiscal
    - Prestação de Contas
  - Upload de novo documento
  - Visualizar documento
  - Editar metadados
  - Excluir (com confirmação)
  - Download

---

## Módulo de Configurações

### 1. Configurações Gerais (`Configuracoes.tsx`)
- **Arquivo**: `src/components/screens/Configuracoes.tsx`
- **Linhas**: 956
- **Abas**:
  - **Meu Perfil**: Nome, e-mail, telefone, foto, alterar senha
  - **Parâmetros**: Moeda, formato de data, casas decimais, aprovação em duas etapas
  - **Notificações**: E-mail, Push, Resumo diário, Falhas de upload
  - **Permissões** (só Admin): Matriz de perfis × recursos

### 2. Configurações PEI (`ConfiguracoesPEI.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesPEI.tsx`
- **Linhas**: 486
- **Diferenças**:
  - Remove aba "Permissões"
  - Notificações específicas: Desvio orçamentário, Contingência, Prazos

### 3. Configurações PED (`ConfiguracoesPED.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesPED.tsx`
- **Funcionalidades similares ao PEI**

### 4. Configurações Financeiro (`ConfiguracoesFinanceiro.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesFinanceiro.tsx`
- **Funcionalidades específicas para o perfil**

### 5. Configurações CI (`ConfiguracoesControladoriaInterna.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesControladoriaInterna.tsx`
- **Funcionalidades específicas para o perfil**

### 6. Configurações CD (`ConfiguracoesControladoriaDedicada.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesControladoriaDedicada.tsx`
- **Funcionalidades específicas para o perfil**

### 7. Configurações Equipe Dedicada (`ConfiguracoesEquipeDedicada.tsx`)
- **Arquivo**: `src/components/screens/ConfiguracoesEquipeDedicada.tsx`
- **Funcionalidades específicas para o perfil**

### 8. Usuários (`Usuarios.tsx`)
- **Arquivo**: `src/components/screens/Usuarios.tsx`
- **Linhas**: 672
- **Funcionalidades**:
  - Listagem de usuários
  - Criar novo usuário
  - Editar usuário
  - Ativar/Desativar
  - Excluir
  - **Matriz de permissões** por recurso

### 9. Integrações (`Integracoes.tsx`)
- **Arquivo**: `src/components/screens/Integracoes.tsx`
- **Linhas**: 124
- **Integrações disponíveis**:
  - **DocuSign**: Assinatura digital
  - **MXM/ERP**: Sistema de gestão
  - **Google Drive**: Armazenamento
- **Ferramenta de Migração MXM**

---

## Componentes de UI

### Componentes Base (48 arquivos)
| Componente | Descrição |
|------------|-----------|
| `accordion.tsx` | Painéis expansíveis |
| `alert-dialog.tsx` | Diálogos de alerta |
| `alert.tsx` | Mensagens de alerta |
| `avatar.tsx` | Avatar de usuário |
| `badge.tsx` | Badges/Tags |
| `breadcrumb.tsx` | Navegação breadcrumb |
| `button.tsx` | Botões |
| `calendar.tsx` | Seletor de data |
| `card.tsx` | Cards |
| `carousel.tsx` | Carrossel |
| `chart.tsx` | Gráficos (Recharts) |
| `checkbox.tsx` | Checkboxes |
| `collapsible.tsx` | Seções colapsáveis |
| `command.tsx` | Command palette |
| `context-menu.tsx` | Menu de contexto |
| `dialog.tsx` | Modais/Diálogos |
| `drawer.tsx` | Drawer lateral |
| `dropdown-menu.tsx` | Menus dropdown |
| `form.tsx` | Formulários (React Hook Form) |
| `hover-card.tsx` | Cards com hover |
| `input-otp.tsx` | Input OTP |
| `input.tsx` | Inputs de texto |
| `label.tsx` | Labels |
| `menubar.tsx` | Barra de menu |
| `navigation-menu.tsx` | Menu de navegação |
| `pagination.tsx` | Paginação |
| `popover.tsx` | Popovers |
| `progress.tsx` | Barras de progresso |
| `radio-group.tsx` | Radio buttons |
| `resizable.tsx` | Painéis redimensionáveis |
| `scroll-area.tsx` | Área com scroll |
| `select.tsx` | Selects/Dropdowns |
| `separator.tsx` | Separadores |
| `sheet.tsx` | Sheets laterais |
| `sidebar.tsx` | Sidebar |
| `skeleton.tsx` | Loading skeletons |
| `slider.tsx` | Sliders |
| `sonner.tsx` | Toasts (Sonner) |
| `switch.tsx` | Switches/Toggles |
| `table.tsx` | Tabelas |
| `tabs.tsx` | Abas |
| `textarea.tsx` | Áreas de texto |
| `toggle-group.tsx` | Grupos de toggle |
| `toggle.tsx` | Toggles |
| `tooltip.tsx` | Tooltips |
| `use-mobile.ts` | Hook para detecção mobile |
| `utils.ts` | Utilitários |

### Componentes Específicos

#### Header (`Header.tsx`)
- **Linhas**: 676
- **Funcionalidades**:
  - Logo e nome do sistema
  - Toggle Dark Mode
  - Seletor de usuário (demo)
  - **Central de Notificações**:
    - Sheet lateral
    - Filtros por status
    - Busca
    - Seleção múltipla
    - Marcar como lida
    - Excluir
  - Menu de usuário (logout)
  - Botão de menu mobile

#### Sidebar (`Sidebar.tsx`)
- **Linhas**: 163
- **Funcionalidades**:
  - Logo
  - Menu dinâmico baseado em permissões
  - Ícones por módulo
  - Indicador de tela ativa
  - Overlay mobile
  - Animação slide

#### Header Simplificado (`HeaderSimplified.tsx`)
- Para portais externos (Fornecedor, Elenco)

#### KPIs de Liquidez (`KPIsLiquidez.tsx`)
- **Linhas**: 238
- **Funcionalidades**:
  - Card de resultado consolidado
  - Indicador de próximo ciclo
  - Progress bar de comprometido
  - Alerta de estouro

#### Filtro Global de Projeto (`FiltroProjetoGlobal.tsx`)
- **Linhas**: 62
- **Funcionalidades**:
  - Seletor de projeto
  - Integração com contexto global

#### Gráfico de Progresso PED (`GraficoProgressoPED.tsx`)
- Visualização do progresso orçamentário

#### Barra de Saldo (`BarraSaldo.tsx`)
- Indicador visual de saldo disponível

#### Card Carousel (`CardCarousel.tsx`)
- Carrossel de cards (cartões)

#### Toolbar Carousel (`ToolbarCarousel.tsx`)
- Barra de ferramentas com scroll horizontal

#### Tab Scroll Container (`TabScrollContainer.tsx`)
- Container de abas com scroll

#### Spreadsheet Grid (`SpreadsheetGrid.tsx`)
- Grid estilo planilha
- Navegação por teclado

---

## Contextos e Hooks

### Contextos

#### AuthContext (`AuthContext.tsx`)
- **Linhas**: 320
- **Funcionalidades**:
  - Estado de autenticação
  - Usuário atual
  - Login/Logout
  - Switch user (demo)
  - Verificação de permissões
  - Menus permitidos por perfil
  - Persistência em localStorage

#### ProjectFilterContext (`ProjectFilterContext.tsx`)
- **Funcionalidades**:
  - Filtro de projeto selecionado
  - Compartilhamento entre telas

### Hooks

#### useSpreadsheetNavigation (`useSpreadsheetNavigation.ts`)
- **Funcionalidades**:
  - Navegação por teclado em grids
  - Setas, Tab, Enter
  - Edição de células

#### useLocalStorage (`useLocalStorage.ts`)
- **Funcionalidades**:
  - Persistência de estado no localStorage
  - Serialização/deserialização automática
  - Função de remoção de valor
  - Tipagem genérica TypeScript

#### useDebounce (`useDebounce.ts`)
- **Funcionalidades**:
  - Debounce de valores
  - Debounce de callbacks
  - Delay configurável
  - Útil para buscas e validações

#### usePagination (`usePagination.ts`)
- **Funcionalidades**:
  - Gerenciamento de paginação
  - Navegação entre páginas
  - Cálculo de índices
  - Range de páginas para UI
  - Tamanhos de página configuráveis

#### useTableSort (`useTableSort.ts`)
- **Funcionalidades**:
  - Ordenação de tabelas
  - Suporte a múltiplas colunas
  - Ciclo asc/desc/null
  - Comparadores customizados

#### useFilter (`useFilter.ts`)
- **Funcionalidades**:
  - Filtros em listas de dados
  - Busca textual multi-campo
  - Contagem de filtros ativos
  - Funções de filtro customizáveis

### Arquivo de Índice (`hooks/index.ts`)
Exportação centralizada para imports limpos:
```typescript
import { useLocalStorage, useDebounce, useFilter } from '@/hooks';
```

---

## Sistema de Permissões

### Arquivo: `src/utils/permissoes.ts`
- **Linhas**: 191

### Regras de Negócio Implementadas
- **RN-001**: Escopo Restrito (Silo de Informação)
- **RN-002**: Imutabilidade do Teto
- **RN-003**: Responsabilidade Solidária

### Funções de Permissão

```typescript
// Permissões básicas
canEditOrcamento(role)           // Editar orçamento
canViewOrcamento(role)           // Visualizar orçamento
canEditContratacao(role)         // Editar contratação
canViewContratacao(role)         // Visualizar contratação
canApprovePayments(role)         // Aprovar pagamentos
canExecutePayments(role)         // Executar pagamentos
canEditFornecedor(role)          // Editar fornecedores
canManageUsers(role)             // Gerenciar usuários
canAccessFullFinancial(role)     // Acesso financeiro completo
canCreateRubrica(role)           // Criar rubricas
canDeleteItems(role)             // Excluir itens
isViewOnly(role)                 // Somente visualização
canEditAssignedOnly(role)        // Editar apenas atribuídos

// Permissões PEI (PRD 002)
canManageProjetos(role)          // Gerenciar projetos
canViewAllProjetos(role)         // Visualizar todos os projetos
canCopyOrcamento(role)           // Copiar orçamento
canFreezeOrcamento(role)         // Congelar orçamento
canDelegateGestao(role)          // Delegar gestão de rubricas
canApproveVerba(role)            // Aprovar verbas
canManagePlanoContas(role)       // Gerenciar plano de contas

// Permissões Financeiro (PRD 004)
canConfirmCarga(role)            // Confirmar cargas de cartão
canProcessReembolsos(role)       // Processar reembolsos
canDownloadComprovantes(role)    // Download de comprovantes
canSendToOmie(role)              // Enviar para OMIE

// Permissões CD (PRD 006)
canValidatePaymentsLevel1(role)  // Validar pagamentos nível 1
canEditLotesVerba(role)          // Editar lotes de verba
canGlosarItens(role)             // Glosar itens
canUploadComprovanteUnificado(role) // Upload PDF unificado
canViewAssignedProjectOnly(role) // Ver apenas projeto vinculado
```

### Filtros de Dados

```typescript
// Filtrar rubricas por permissão do usuário
filtrarRubricasPorPermissao(rubricas, usuario)

// Verificar se pode editar rubrica específica
podeEditarRubrica(rubrica, usuario)
```

---

## Credenciais de Teste

### Acesso ao Sistema

| Usuário | Senha | Perfil |
|---------|-------|--------|
| `admin` | `1234` | Administrador (Maria) |
| `fornecedor` | `1234` | Fornecedor (Empresa ABC) |
| `financeiro` | `1234` | Financeiro (Carla) |
| `controladoria` | `1234` | Controladoria Dedicada (Bruno) |

### Troca de Perfil (Demo)
Após login como `admin`, é possível trocar de perfil pelo seletor no Header para testar diferentes visões do sistema.

---

## Resumo de Arquivos

### Estatísticas
- **Total de telas (screens)**: 53 arquivos
- **Componentes UI base**: 48 arquivos
- **Portal Fornecedor**: 7 arquivos
- **Portal Elenco**: 6 arquivos
- **Contextos**: 2 arquivos
- **Hooks**: 1 arquivo
- **Utilitários**: 2 arquivos

### Arquivos Mais Extensos
1. `Orcamento.tsx` - 2378 linhas
2. `ControleDeVerba.tsx` - 1927 linhas
3. `Contratacao.tsx` - 1780 linhas
4. `Pagamentos.tsx` - 1737 linhas
5. `Projetos.tsx` - 1313 linhas
6. `Verbas.tsx` - 1332 linhas
7. `DashboardControladoriaDedicadaNew.tsx` - 1283 linhas

---

## Changelog

### Versão 0.1.0 (Janeiro 2026)
- Implementação inicial do sistema
- 9 perfis de usuário
- Módulos completos de Orçamento, Contratação, Pagamentos, Verbas
- Portais externos (Fornecedor, Elenco)
- Sistema de permissões granular
- Dark Mode
- Design responsivo

---

*Documentação gerada em 14 de Janeiro de 2026*
