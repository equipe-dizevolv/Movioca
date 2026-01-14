# Sistema de Gestão Integrada Movioca (SGIM)

## Documentação Técnica Completa

---

> **Documento Consolidado**  
> **Versão:** 1.0  
> **Última Atualização:** 13/01/2026  
> **Status:** Em Desenvolvimento

---

## Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Problema de Negócio](#2-problema-de-negócio)
3. [Contexto da Empresa](#3-contexto-da-empresa)
4. [Escopo do MVP](#4-escopo-do-mvp)
5. [Módulos do Sistema](#5-módulos-do-sistema)
6. [Perfis de Usuários](#6-perfis-de-usuários)
7. [Requisitos Funcionais](#7-requisitos-funcionais)
8. [Requisitos Não Funcionais](#8-requisitos-não-funcionais)
9. [Fora do Escopo](#9-fora-do-escopo)
10. [Cronograma](#10-cronograma)
11. [Riscos e Dependências](#11-riscos-e-dependências)
12. [Equipe do Projeto](#12-equipe-do-projeto)
13. [Critérios de Sucesso](#13-critérios-de-sucesso)

---

# 1. Visão Geral do Projeto

## 1.1 O Produto

O **Sistema de Gestão Integrada Movioca (SGIM)** é uma plataforma **SaaS proprietária** desenvolvida em **Bubble.io**, voltada para a **gestão financeira e operacional de produções audiovisuais**.

### Finalidade Principal

Centralizar o **ciclo de vida financeiro dos projetos**, abrangendo:

| Etapa | Descrição |
|-------|-----------|
| **Orçamentação** | Criação e gestão de orçamentos de projetos |
| **Contratação** | Gestão de parceiros e contratos |
| **Pagamento** | Processamento e aprovação de pagamentos |
| **Prestação de Contas** | Controle e validação de gastos |

### Conceito Central

O SGIM atuará como a **"Única Fonte de Verdade" (Single Source of Truth)** para o status financeiro dos projetos.

### Integrações Principais

```
┌─────────────────────────────────────────────────────────────┐
│                          SGIM                               │
│              (Sistema de Gestão Integrada)                  │
└─────────────────┬───────────────────────┬───────────────────┘
                  │                       │
                  ▼                       ▼
        ┌─────────────────┐     ┌─────────────────┐
        │    OMIE (ERP)   │     │  Google Drive   │
        │ Execução Contábil│     │ Gestão Documental│
        └─────────────────┘     └─────────────────┘
```

---

# 2. Problema de Negócio

## 2.1 Cenário Atual

A Movioca enfrenta um cenário de **alta complexidade operacional** e **risco de conformidade** devido ao uso de ferramentas desconectadas:

- Planilhas Excel
- Trello
- Profilme (sistema legado)

## 2.2 Dores Identificadas

### 🔴 Risco de Glosa e Inconformidade

| Problema | Impacto |
|----------|---------|
| Falta de travas sistêmicas | Pagamentos sem documentação correta |
| Ausência de validação | Nota Fiscal, KINAI, contrato não verificados |
| **Consequência** | **Risco elevado de rejeição de contas (glosa) pela Ancine** |

### 🔴 Retrabalho Operacional Crítico

```
╔════════════════════════════════════════════════════════════╗
║  80% do tempo da equipe administrativa é gasto copiando    ║
║  e colando dados entre planilhas e o sistema financeiro    ║
╚════════════════════════════════════════════════════════════╝
```

**Consequências:**
- Aumento exponencial de erro humano
- Perda de produtividade
- Inconsistência de dados

### 🔴 Opacidade Financeira

A **Produção Executiva** não consegue visualizar em tempo real:

| Informação Necessária | Situação Atual |
|----------------------|----------------|
| Saldo real de cada rubrica | ❌ Não disponível |
| Orçado vs. Comprometido | ❌ Não disponível |
| Orçado vs. Pago | ❌ Não disponível |
| Gestão de contingências | ❌ Comprometida |

### 🔴 Gestão de Verba Descentralizada

O controle de **Adiantamentos em Cartão (Verba/AP)** apresenta:

- Controle feito em paralelo
- Sem conexão com orçamento principal
- Lacunas sobre dinheiro "na rua"
- Reconciliação apenas no reembolso

---

# 3. Contexto da Empresa

## 3.1 Perfil da Movioca

| Característica | Descrição |
|----------------|-----------|
| **Segmento** | Produtora Audiovisual |
| **Produtos** | Séries, Filmes, Reality Shows |
| **Porte Fixo** | ~8 pessoas (núcleo interno) |
| **Porte Escalado** | 120 a 150 pessoas (durante produções) |

## 3.2 Ferramentas Atuais

```
┌────────────────────────────────────────────────────────────┐
│                    ESTADO ATUAL                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐ │
│  │ Profilme │    │  Trello  │    │ Planilhas Excel      │ │
│  │ (Legado) │    │          │    │ (Controle Real)      │ │
│  └────┬─────┘    └────┬─────┘    └──────────┬───────────┘ │
│       │               │                      │             │
│       ▼               ▼                      ▼             │
│  Apenas         Pipeline          Dados Fragmentados      │
│  Contas         Criativo          e Descentralizados      │
│  a Pagar                                                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# 4. Escopo do MVP

## 4.1 Objetivos do MVP

### Objetivo 1: Centralização da Informação
> Migrar **100% dos dados** de orçamento e contratação para o SGIM, eliminando planilhas paralelas como fonte primária.

### Objetivo 2: Compliance Fiscal
> Garantir que **nenhum pagamento** seja enviado ao financeiro sem as validações hierárquicas de Controladoria (Dedicada e Interna).

### Objetivo 3: Automação de Processos
> Gerar **automaticamente**:
> - Programação de pagamentos
> - Lançamentos no OMIE
> 
> A partir dos dados inseridos na contratação.

### Objetivo 4: Visibilidade Orçamentária
> Permitir visualização granular do orçamento por projeto e departamento:

| Dimensão | Descrição |
|----------|-----------|
| **Orçado** | Valor previsto inicialmente |
| **Liberado** | Valor aprovado para uso |
| **Comprometido** | Valor já contratado |
| **Realizado** | Valor efetivamente pago |

### Objetivo 5: Gestão Eficiente de Parceiros
> Implementar **portal de autoatendimento** para que os **150+ parceiros** por projeto mantenham seus próprios dados cadastrais atualizados.

---

# 5. Módulos do Sistema

## Visão Geral dos Módulos

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SGIM - MÓDULOS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  MÓDULO 1   │  │  MÓDULO 2   │  │  MÓDULO 3   │  │  MÓDULO 4  │ │
│  │ Governança  │─▶│ Contratação │─▶│  Pagamento  │  │  Controle  │ │
│  │ e Orçamento │  │ e Programação│  │ e Aprovação │  │  de Verba  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
│         │                │                │               │         │
│         └────────────────┴────────────────┴───────────────┘         │
│                                   │                                 │
│                                   ▼                                 │
│                          ┌─────────────────┐                        │
│                          │    MÓDULO 5     │                        │
│                          │   Portal do     │                        │
│                          │    Parceiro     │                        │
│                          └─────────────────┘                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5.1 Módulo 1: Governança e Orçamento

### Descrição
Módulo focado na **criação de projetos**, **importação de templates de orçamento** (Planos de Contas) e **definição da estrutura de custos**.

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| Criação de Projetos | Setup inicial de novos projetos |
| Importação de Templates | Planos de Contas padronizados |
| Estrutura de Custos | Definição hierárquica de rubricas |
| Orçamento Aprovado | Congelamento do orçamento base |
| Orçamento de Trabalho | Versão dinâmica para gestão |

### Fluxo do Orçamento

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│    Template      │────▶│    Orçamento     │────▶│    Orçamento     │
│ (Plano de Contas)│     │    Aprovado      │     │   de Trabalho    │
│                  │     │   (Congelado)    │     │   (Dinâmico)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## 5.2 Módulo 2: Contratação e Programação

### Descrição
Gerencia o **ciclo de vida do parceiro**, desde o cadastro até a formalização do contrato e definição do cronograma de desembolso.

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| Cadastro de Parceiros | Registro de fornecedores e equipe |
| Formalização de Contratos | Gestão documental de contratos |
| Cronograma de Desembolso | Programação financeira |
| Status "Comprometido" | Atualização automática do orçamento |

### Ciclo de Vida do Parceiro

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────────┐
│Cadastro │───▶│Contrato │───▶│Cronograma│───▶│Comprometido │
│         │    │         │    │Financeiro│    │(no Orçamento)│
└─────────┘    └─────────┘    └─────────┘    └─────────────┘
```

---

## 5.3 Módulo 3: Pagamento e Aprovação

### Descrição
**Esteira de processamento financeiro** que controla a fila de pagamentos, validações fiscais e aprovação em múltiplos níveis.

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| Fila de Pagamentos | Gestão de solicitações pendentes |
| Validações Fiscais | Verificação de NF e Impostos |
| Aprovação Multi-nível | Workflow hierárquico |
| Integração OMIE | Envio para execução contábil |

### Workflow de Aprovação

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  EQUIPE     │───▶│CONTROLADORIA│───▶│CONTROLADORIA│───▶│ FINANCEIRO  │
│ (Solicita)  │    │  DEDICADA   │    │   INTERNA   │    │ (Executa)   │
│             │    │  (Valida)   │    │  (Aprova)   │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 5.4 Módulo 4: Controle de Verba (AP)

### Descrição
Módulo específico para gestão de **Adiantamento de Produção** (dinheiro em cartão).

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| Solicitação de Verba | Pedido de adiantamento |
| Carga de Cartão | Crédito no cartão corporativo |
| Prestação de Contas | Comprovação de gastos |
| Reembolso | Devolução de valores à empresa |

### Ciclo da Verba

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│Solicitação│───▶│  Carga   │───▶│Prestação │───▶│Reembolso │
│          │    │(no Cartão)│    │de Contas │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

## 5.5 Módulo 5: Portal do Parceiro

### Descrição
Interface **simplificada e responsiva** para que externos realizem operações de autoatendimento.

### Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| Cadastro | Auto-registro de dados |
| Atualização de Dados | Manutenção cadastral |
| Envio de Notas Fiscais | Upload de NFs |
| Histórico de Pagamentos | Consulta de transações |

### Características Técnicas

- ✅ Interface simplificada
- ✅ Totalmente responsivo (mobile-first)
- ✅ Autoatendimento sem suporte

---

# 6. Perfis de Usuários

## Visão Geral

O sistema comporta **9 perfis distintos**, divididos em 3 grupos:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      PERFIS DE USUÁRIOS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────────┐ │
│  │    GRUPO 1        │  │    GRUPO 2        │  │    GRUPO 3      │ │
│  │  EQUIPE FIXA      │  │ EQUIPE PROJETO    │  │   EXTERNOS      │ │
│  │   (Internos)      │  │   (Dedicados)     │  │                 │ │
│  ├───────────────────┤  ├───────────────────┤  ├─────────────────┤ │
│  │ • Administrador   │  │ • PED             │  │ • Fornecedor    │ │
│  │ • PEI             │  │ • Controladoria   │  │   (PJ)          │ │
│  │ • Controladoria   │  │   Dedicada        │  │ • Elenco/       │ │
│  │   Interna         │  │ • Equipe          │  │   Equipe        │ │
│  │ • Financeiro      │  │   Dedicada        │  │   Técnica (PF)  │ │
│  └───────────────────┘  └───────────────────┘  └─────────────────┘ │
│                                                                     │
│  Visão: Multi-projeto    Visão: Mono-projeto   Visão: Portal       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Grupo 1: Equipe Fixa (Internos)

> **Característica:** Visão Multi-projeto

### Perfil 1: Administrador (Admin)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Superusuário e guardião do sistema |
| **Responsável** | Márcio Yatsuda |
| **Acesso** | Irrestrito |

**Responsabilidades:**
- Gerenciar permissões de acesso
- Criar novos projetos
- Manter Planos de Contas (Master Data)
- Auditar logs do sistema

---

### Perfil 2: Produção Executiva Interna (PEI)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Cabeça da operação audiovisual |
| **Responsável** | Mari Guedes |

**Responsabilidades:**
- Criar e estruturar orçamentos
- Definir valores liberados para cada projeto
- Delegar gestão de blocos orçamentários
- Monitorar saldo de contingência global

---

### Perfil 3: Controladoria Interna (CI)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Garantia de conformidade fiscal e contábil |
| **Responsável** | Iasnaia/Naya |

**Responsabilidades:**
- **Último nível de aprovação** antes do pagamento
- Validar notas fiscais
- Validar impostos e dados bancários
- Aprovar prestação de contas final das verbas

---

### Perfil 4: Financeiro

| Atributo | Descrição |
|----------|-----------|
| **Função** | Execução tesouraria |
| **Responsável** | Jéssica |

**Responsabilidades:**
- Executar cargas de cartão de verba
- Processar pagamentos no banco/OMIE
- Atuar após liberação da Controladoria Interna

---

## Grupo 2: Equipe do Projeto (Dedicados)

> **Característica:** Visão Mono-projeto

### Perfil 5: Produção Executiva Dedicada (PED)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Gerente executivo de projeto específico |

**Responsabilidades:**
- Gerir orçamento delegado pela PEI
- Contratar equipe dentro do escopo
- Solicitar pagamentos
- Sub-delegar rubricas para departamentos

---

### Perfil 6: Controladoria Dedicada (CD)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Braço operacional da controladoria no projeto |

**Responsabilidades:**
- **Primeiro nível de validação**
- Receber NFs e prestações de contas
- Organizar documentação
- Pré-aprovar antes de enviar para CI

---

### Perfil 7: Equipe Dedicada (Gestor de Verba/Solicitante)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Chefes de departamento |
| **Exemplos** | Arte, Figurino, Logística |

**Responsabilidades:**
- Operacionalizar o projeto
- Solicitar verbas para cartões
- Realizar compras miúdas
- Montar prestação de contas

> ⚠️ **Importante:** Não aprovam pagamentos, apenas solicitam.

---

## Grupo 3: Externos (Portal de Autoatendimento)

### Perfil 8: Fornecedor (PJ)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Empresas prestadoras de serviço |
| **Exemplos** | Locadoras, Catering, etc. |

**Responsabilidades:**
- Cadastrar dados da empresa (CNPJ, Dados Bancários)
- Enviar notas fiscais
- Visualizar histórico de pagamentos

> 📋 **Cadastro:** Focado em dados jurídicos

---

### Perfil 9: Elenco e Equipe Técnica (PF/Específico)

| Atributo | Descrição |
|----------|-----------|
| **Função** | Atores, diretores e técnicos |
| **Tipo** | Pessoa Física ou Jurídica com características específicas |

**Responsabilidades:**
- Similar ao fornecedor
- Cadastro com campos adicionais sensíveis

**Campos Específicos:**
| Campo | Descrição |
|-------|-----------|
| Nome Artístico | Nome de cena/artístico |
| DRT | Registro profissional |
| Alergias Alimentares | Informação médica |
| Contato de Emergência | Segurança |
| Dados de Agente | Representante artístico |

---

# 7. Requisitos Funcionais

## RF-001: Estrutura de Código Imutável

> O sistema deve **impedir a edição manual** das descrições de rubricas orçamentárias nas telas de operação.

**Regra:** Descrições devem ser lidas exclusivamente do **Código do Item Orçamentário** para garantir integridade dos dados.

---

## RF-002: Workflow de Aprovação Hierárquica

> O fluxo de pagamento deve obrigar a passagem por **3 a 4 níveis de status**.

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│ SOLICITAÇÃO│───▶│ VALIDAÇÃO  │───▶│ APROVAÇÃO  │───▶│ LIBERAÇÃO  │
│  (Equipe)  │    │   (CD)     │    │   (CI)     │    │(Financeiro)│
└────────────┘    └────────────┘    └────────────┘    └────────────┘
```

---

## RF-003: Integração Bidirecional OMIE

> O sistema deve realizar integração **bidirecional** com o ERP OMIE.

| Direção | Descrição |
|---------|-----------|
| **SGIM → OMIE** | Enviar lançamentos de contas a pagar |
| **OMIE → SGIM** | Ler status "Pago" para atualizar orçamento realizado |

---

## RF-004: Visualização Integrada de Documentos

> Documentos do Google Drive devem ser visualizáveis **diretamente na tela de aprovação**.

**Requisitos:**
- ✅ Modal ou iframe integrado
- ✅ Sem necessidade de download
- ✅ Sem troca de aba

**Documentos:**
- Contratos
- Notas Fiscais

---

## RF-005: Separação de Conceitos Financeiros

> O sistema deve tratar como **entidades e fluxos distintos**:

| Conceito | Definição |
|----------|-----------|
| **Orçamento** | Previsão financeira |
| **Pagamento** | Transação bancária |
| **Verba** | Adiantamento em cartão |

> ⚠️ Conceitos **interconectados**, mas com fluxos próprios.

---

## RF-006: Gestão de Sub-Itens

> Deve ser possível criar **subdivisões** em uma linha orçamentária.

**Exemplo:**
```
001.001 (Rubrica Base)
├── 001.001.01 (Fornecedor A)
└── 001.001.02 (Fornecedor B)
```

**Finalidade:** Alocar múltiplos fornecedores a uma mesma rubrica orçamentária base.

---

# 8. Requisitos Não Funcionais

## 8.1 Tecnologia

### RNF-001: Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| **Plataforma** | Bubble.io (No-Code) |
| **Justificativa** | Agilidade e facilidade de manutenção futura pelo cliente |

---

## 8.2 Usabilidade

### RNF-002: Interface

| Requisito | Descrição |
|-----------|-----------|
| Design | Limpo e intuitivo |
| Modo de visualização | Dark/Light Mode |
| Foco | Reduzir cliques para aprovações em lote |

### RNF-003: Responsividade

| Componente | Requisito |
|------------|-----------|
| Portal do Parceiro (Perfis 8 e 9) | **Totalmente funcional em dispositivos móveis** |

---

## 8.3 Segurança

### RNF-004: LGPD

> Campos sensíveis devem ter **visibilidade restrita**.

**Campos Protegidos:**
- Alergias alimentares
- Dados pessoais de elenco

**Usuários Autorizados:**
- Admin
- PEI/PED pertinente

---

## 8.4 Performance

### RNF-005: Carregamento

| Cenário | Requisito |
|---------|-----------|
| Telas de orçamento (matrizes complexas) | Até 500 linhas em **< 3 segundos** |

---

# 9. Fora do Escopo

> Funcionalidades **NÃO incluídas** no MVP (Versão Futura)

| Item | Justificativa |
|------|---------------|
| Edição de orçamento estilo "Excel" (célula a célula) | Limitação da tecnologia Bubble |
| Gestão de Pipeline criativo (Kanban de ideias/roteiros) | Permanece no Trello |
| Cálculos automáticos complexos de impostos | Sistema apenas valida o enviado |
| Controle de múltiplas temporadas como objeto único | Tratado via duplicação de projetos na V1 |

---

# 10. Cronograma

## 10.1 Prazos Estimados

| Marco | Data |
|-------|------|
| **Início do Desenvolvimento** | Imediato após validação do PRD |
| **Entrega do MVP (Funcional)** | Final de Dezembro/2025 ⚠️ *Data Crítica* |
| **Integração OMIE** | Janeiro/2026 |

## 10.2 Fases de Entrega

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FASES DE ENTREGA                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FASE 1          FASE 2           FASE 3           FASE 4          │
│  ──────          ──────           ──────           ──────          │
│  Módulo de       Módulo de        Módulo de        Módulo de       │
│  Orçamento       Contratação      Pagamentos       Verbas          │
│  +               +                +                +                │
│  Cadastros       Portal do        Aprovações       Integrações     │
│  Básicos         Parceiro                          Finais          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 11. Riscos e Dependências

## 11.1 Riscos

### R01: Prazo Exíguo ⚠️ ALTO

> O prazo até dezembro é **extremamente desafiador** para a complexidade de:
> - 9 perfis de usuário
> - 4 módulos principais

### R02: Definição de Regras ⚠️ MÉDIO

> Regras de negócio específicas ainda dependem de envio de documentação pelo cliente:
> - Cálculo de contingência
> - Regras de impostos

---

## 11.2 Dependências

| Dependência | Status |
|-------------|--------|
| Envio das regras de cálculo de contingência | ⏳ Pendente |
| Validação dos campos obrigatórios por tipo de parceiro (PF/PJ/Elenco) | ⏳ Pendente |
| Acesso às APIs do OMIE para testes de integração | ⏳ Pendente |

---

# 12. Equipe do Projeto

## 12.1 Software House

| Papel | Responsabilidade |
|-------|------------------|
| **Product Manager** | Gestão do produto |
| **Tech Lead / Desenvolvedor Bubble** | Desenvolvimento técnico |
| **Designer UI/UX** | Interface e experiência |

## 12.2 Cliente (Movioca)

| Papel | Nome | Responsabilidade |
|-------|------|------------------|
| **Product Owner** | Márcio Yatsuda | Decisor Final |
| **Key User (Operação)** | Mari Guedes | Definição de Processos |
| **Key User (Compliance)** | Iasnaia | Validação de Fluxos Financeiros |

---

# 13. Critérios de Sucesso

## Métricas de Sucesso do MVP

| # | Critério | Meta |
|---|----------|------|
| 1 | Sistema em produção | Processando **100% dos novos pagamentos** a partir de Janeiro/2026 |
| 2 | Eliminação de planilhas | Sem preenchimento manual de "Pedido de Pagamento" |
| 3 | Autoatendimento | Parceiros externos realizando cadastro e envio de NFs **sem suporte** |

---

# 14. Checklist Comercial - Levantamento Inicial

> **Fonte:** Documento 01 - Checklist Comercial para Levantamento Inicial de Projetos

## 14.1 Objetivo Principal do Sistema

### Problema/Dor Resolvida

O sistema visa **substituir o controle orçamentário atual** feito em planilhas e ferramentas como Trello, centralizando:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CENTRALIZAÇÃO DE PROCESSOS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐              │
│  │ Orçamentação│   │  Aprovação  │   │ Contratação │              │
│  │             │   │  de Despesas│   │             │              │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘              │
│         │                 │                 │                      │
│         └─────────────────┼─────────────────┘                      │
│                           ▼                                        │
│                  ┌─────────────────┐                               │
│                  │   PLATAFORMA    │                               │
│                  │     ÚNICA E     │                               │
│                  │   AUTOMATIZADA  │                               │
│                  └─────────────────┘                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Processos a Serem Melhorados

| # | Processo | Situação Atual | Meta |
|---|----------|----------------|------|
| 1 | Orçamentação de projetos audiovisuais | Planilhas | Centralizado |
| 2 | Acompanhamento e aprovação de despesas | Manual/Trello | Automatizado |
| 3 | Contratação de equipe | Fragmentado | Integrado |
| 4 | Integração com ERP | Inexistente | OMIE conectado |
| 5 | Armazenamento de documentos | Disperso | Google Drive integrado |

### Indicadores de Sucesso

| Indicador | Descrição |
|-----------|-----------|
| ✅ Controle hierárquico | Orçamento com níveis de permissão |
| ✅ Integração ERP | Conectado ao OMIE |
| ✅ Controle de versões | Histórico de orçamentos |
| ✅ Gestão de compromissos | Visibilidade em tempo real |

---

## 14.2 Públicos e Tipos de Usuários (Visão Comercial)

### Usuários Principais

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TIPOS DE USUÁRIOS                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────┐  ┌────────────────────────────┐    │
│  │     EQUIPE INTERNA         │  │   FORNECEDORES EXTERNOS    │    │
│  ├────────────────────────────┤  ├────────────────────────────┤    │
│  │ • Gerente de Produção      │  │ • Prestadores de serviço   │    │
│  │   Executiva                │  │ • Locadoras                │    │
│  │ • Produtora Executiva      │  │ • Empresas terceirizadas   │    │
│  │   Contratada               │  │                            │    │
│  │ • Coordenadores de         │  │                            │    │
│  │   Produção                 │  │                            │    │
│  │ • Coordenadores de         │  │                            │    │
│  │   Pós-Produção             │  │                            │    │
│  └────────────────────────────┘  └────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Perfis e Permissões (Visão Simplificada)

| Perfil | Acesso | Capacidade |
|--------|--------|------------|
| **Superadministrador** | Visão total | Controle completo |
| **Gerente de orçamento** | Acesso global | Pode delegar |
| **Usuários parciais** | Acesso restrito | Apenas rubricas específicas |
| **Fornecedores** | Próprio cadastro | Dados e documentos próprios |

---

## 14.3 Segurança (Requisitos Comerciais)

| Requisito | Status |
|-----------|--------|
| Controle de acesso com login e senha | ✅ Necessário |
| Controle de permissões por perfil | ✅ Necessário |
| Conformidade LGPD | ✅ Obrigatório |

---

## 14.4 Funcionalidades Desejadas (Lista Comercial)

### Funcionalidades Core

| # | Funcionalidade | Prioridade |
|---|----------------|------------|
| 1 | Criar/cadastrar projetos e orçamentos | 🔴 Alta |
| 2 | Gerenciar diferentes versões de orçamentos | 🔴 Alta |
| 3 | Atribuir rubricas a responsáveis | 🔴 Alta |
| 4 | Acompanhar execuções e compromissos | 🔴 Alta |
| 5 | Gerar pedidos de compra | 🔴 Alta |
| 6 | Emitir relatórios (ex: Cost Report) | 🔴 Alta |
| 7 | Cadastrar fornecedores (autonomia via link/login) | 🟡 Média |
| 8 | Controlar prazos e pendências (alertas) | 🟡 Média |
| 9 | Integração direta com OMIE (ERP) | 🔴 Alta |
| 10 | Integração com Google Drive | 🔴 Alta |

---

## 14.5 Integrações Necessárias

### Status das Integrações

| Sistema | Finalidade | Status |
|---------|------------|--------|
| **OMIE (ERP)** | Fluxo financeiro, pedidos de compra, contas a pagar | ⏳ Em migração |
| **Google Drive** | Upload e leitura de documentos | ✅ Já utilizam Enterprise |

### Detalhe de Migração

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MIGRAÇÃO DE SISTEMAS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SISTEMA ATUAL              TRANSIÇÃO              SISTEMA NOVO    │
│  ─────────────              ─────────              ────────────    │
│                                                                     │
│  ┌──────────┐                                    ┌──────────┐      │
│  │ ProFilm  │ ──────────────────────────────────▶│   OMIE   │      │
│  │ (Legado) │           Substituição             │  (ERP)   │      │
│  └──────────┘                                    └──────────┘      │
│                                                                     │
│  ┌──────────┐                                    ┌──────────┐      │
│  │Planilhas │ ──────────────────────────────────▶│   SGIM   │      │
│  │ + Trello │           Centralização            │(Sistema) │      │
│  └──────────┘                                    └──────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 14.6 Sistemas Existentes (Antes da Migração)

| Sistema | Uso | Destino |
|---------|-----|---------|
| Planilhas Excel | Controle orçamentário | Substituído pelo SGIM |
| Trello | Gestão de tarefas | Parcialmente substituído |
| ProFilm (ERP atual) | Contas a pagar | Substituído pelo OMIE |
| Google Enterprise | Documentos | Mantido e integrado |

---

## 14.7 Fluxo de Uso (Experiência do Usuário)

### Jornada Principal

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE EXPERIÊNCIA DO USUÁRIO                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. LOGIN                    2. CADASTRO                           │
│  ┌─────────────┐            ┌─────────────┐                        │
│  │  Controle   │───────────▶│  Projeto    │                        │
│  │  de Acesso  │            │   Novo      │                        │
│  └─────────────┘            └──────┬──────┘                        │
│                                    │                                │
│                                    ▼                                │
│  3. PLANO DE CONTAS         4. ORÇAMENTO                           │
│  ┌─────────────┐            ┌─────────────┐                        │
│  │  Seleção    │───────────▶│  Criação    │                        │
│  │  Template   │            │  Modular    │                        │
│  └─────────────┘            └──────┬──────┘                        │
│                                    │                                │
│                                    ▼                                │
│  5. ATRIBUIÇÃO              6. CONTROLE                            │
│  ┌─────────────┐            ┌─────────────┐                        │
│  │  Rubricas   │───────────▶│  Versões    │                        │
│  │Responsáveis │            │ Orçamento   │                        │
│  └─────────────┘            └──────┬──────┘                        │
│                                    │                                │
│                                    ▼                                │
│  7. EXECUÇÃO                8. PEDIDOS                             │
│  ┌─────────────┐            ┌─────────────┐                        │
│  │Acompanhamento│──────────▶│Compromissos │                        │
│  │ Orçamento   │            │             │                        │
│  └─────────────┘            └──────┬──────┘                        │
│                                    │                                │
│                                    ▼                                │
│  9. RELATÓRIOS              10. DOCUMENTOS                         │
│  ┌─────────────┐            ┌─────────────┐                        │
│  │ Execução vs │───────────▶│   Upload    │                        │
│  │  Previsto   │            │  Consulta   │                        │
│  └─────────────┘            └─────────────┘                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 14.8 Dispositivos e Plataforma

| Plataforma | Suporte | Observação |
|------------|---------|------------|
| **Web (navegador)** | ✅ Sim | Principal |
| **Painel administrativo interno** | ✅ Sim | Desktop |
| **App mobile** | ❌ Não | Não mencionado |
| **Offline** | ❌ Não | Não necessário |

---

## 14.9 Regiões, Idiomas e Personalizações

| Aspecto | Configuração |
|---------|--------------|
| **País de uso** | Brasil |
| **Idioma** | Português |
| **Adaptações** | Modelos de financiamento (Ancine vs. Netflix) |
| **Customização** | Plano de contas configurável |

---

## 14.10 Painéis e Relatórios

### Relatórios Principais

| Relatório | Finalidade |
|-----------|------------|
| **Cost Report** | Execução orçamentária detalhada |
| **Prestação de Contas** | Compliance e auditoria |
| **Relatório Gerencial** | Tomada de decisão |

---

## 14.11 Design e Identidade Visual

### Referências Visuais

| Sistema | Elemento de Inspiração |
|---------|------------------------|
| **OMIE** | ERP amigável e intuitivo |
| **Trello** | Modelo Kanban e fluidez visual |
| **Planilhas** | Estrutura lógica de controle |

### Ambiente

- Utilizam **Google Enterprise**
- Interface deve ser **limpa e profissional**

---

## 14.12 Nível de Automação

| Automação | Status |
|-----------|--------|
| Alertas e pendências | ✅ Incluído |
| Compromissos financeiros automáticos | ✅ Incluído |
| Dedução automática do orçamento após contratação | ✅ Incluído |
| Uso de IA avançada | ❌ Não citado (potencial futuro) |

---

## 14.13 Prazos e Expectativas (Comercial)

| Aspecto | Detalhe |
|---------|---------|
| **Urgência** | Alta - migração ERP em poucos dias |
| **Abordagem** | MVP inicial aceitável |
| **Desenvolvimento** | Por fases (não escopo fechado) |

---

## 14.14 Orçamento do Projeto

| Item | Status |
|------|--------|
| Faixa de investimento | ❌ Não informada |
| Modelo de desenvolvimento | ✅ Por fases |

---

# 15. Especificação de Requisitos de Software

> **Fonte:** Documento 02 - Especificação de Requisitos de Software

## 15.1 Introdução

### 15.1.1 Propósito

Este documento orienta o desenvolvimento do sistema de gestão orçamentária voltado para produtoras audiovisuais, com foco em:

- Substituir processos baseados em planilhas
- Aumentar rastreabilidade
- Integração com ERP
- Automação de tarefas críticas

### 15.1.2 Escopo do Produto

O sistema permitirá:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ESCOPO DO PRODUTO                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐          │
│  │   Cadastro    │  │  Estruturação │  │   Controle    │          │
│  │  e Controle   │  │  Orçamentária │  │  Hierárquico  │          │
│  │  de Projetos  │  │    Modular    │  │   de Acesso   │          │
│  └───────────────┘  └───────────────┘  └───────────────┘          │
│                                                                     │
│  ┌───────────────┐  ┌───────────────┐                             │
│  │   Geração de  │  │  Integração   │                             │
│  │    Pedidos    │  │ OMIE + Drive  │                             │
│  └───────────────┘  └───────────────┘                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 15.1.3 Glossário Técnico

| Termo | Definição |
|-------|-----------|
| **Rubrica** | Item orçamentário principal |
| **Sub-rubrica** | Subdivisão da rubrica |
| **OMIE** | ERP utilizado pela empresa |
| **Cost Report** | Relatório de execução financeira |
| **Plano de Contas** | Estrutura pré-definida usada como esqueleto do orçamento |
| **Comprometido** | Valor reservado após contratação |

---

## 15.2 Descrição Geral

### 15.2.1 Perspectiva do Produto

| Característica | Descrição |
|----------------|-----------|
| **Tipo** | Produto novo |
| **Integração ERP** | OMIE |
| **Integração Docs** | Google Drive |

### 15.2.2 Funções do Produto

| # | Função | Descrição |
|---|--------|-----------|
| 1 | Cadastro de projetos | Registro e gestão de projetos |
| 2 | Criação/edição de orçamentos | Por rubrica e sub-rubrica |
| 3 | Atribuição de responsáveis | Delegação por rubrica |
| 4 | Controle de versões | Histórico de orçamentos |
| 5 | Execução e acompanhamento | Compromissos financeiros |
| 6 | Geração de pedidos | Pedidos de compra |
| 7 | Emissão de relatórios | Cost Report e outros |
| 8 | Controle de tarefas | Pendências com alertas |
| 9 | Integrações | OMIE e Google Drive |

### 15.2.3 Características dos Usuários (Técnico)

| Perfil | Descrição |
|--------|-----------|
| **Superadministrador** | Acesso total ao sistema |
| **Gerente de orçamento** | Gestão global com delegação |
| **Usuários parciais** | Acesso restrito por rubrica |
| **Fornecedores** | Autoatendimento via link |

### 15.2.4 Restrições Técnicas

| Restrição | Detalhe |
|-----------|---------|
| Interface | Web responsiva |
| Integrações | Via API (OMIE e Google Drive) |
| Compliance | LGPD obrigatório |
| Armazenamento | Google Drive (não local) |

### 15.2.5 Premissas e Dependências

| Premissa | Responsável |
|----------|-------------|
| Credenciais API OMIE | Cliente |
| Google Drive corporativo | Cliente (já em uso) |
| Plano de contas e lógica orçamentária | Cliente |

---

## 15.3 Requisitos Funcionais Detalhados

### RF-001: Login com Controle de Permissões

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Permitir acesso com login e senha, com perfis distintos |
| **Regras de Negócio** | Acesso conforme permissões atribuídas |
| **Critério de Aceite** | Redirecionamento para área correta com base no perfil |

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Login     │───▶│  Validação  │───▶│Redirecionamento│
│  Usuário    │    │   Perfil    │    │  por Perfil │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

### RF-002: Cadastro de Projeto

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Criar novo projeto com informações cadastrais |
| **Regras de Negócio** | Associar plano de contas obrigatoriamente |
| **Critério de Aceite** | Projeto salvo e visível em dashboard |

---

### RF-003: Criação de Orçamento com Rubricas

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Permitir criação de orçamento com rubricas e sub-rubricas |
| **Regras de Negócio** | Cada rubrica deve estar vinculada a um responsável |
| **Critério de Aceite** | Estrutura orçamentária gerada e editável |

**Estrutura de Rubricas:**

```
PROJETO
└── ORÇAMENTO
    ├── RUBRICA 001 (Responsável: Usuário A)
    │   ├── Sub-rubrica 001.01
    │   ├── Sub-rubrica 001.02
    │   └── Sub-rubrica 001.03
    ├── RUBRICA 002 (Responsável: Usuário B)
    │   ├── Sub-rubrica 002.01
    │   └── Sub-rubrica 002.02
    └── RUBRICA 003 (Responsável: Usuário C)
        └── Sub-rubrica 003.01
```

---

### RF-004: Controle de Versões

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Gerenciar múltiplas versões de orçamento por projeto |
| **Regras de Negócio** | Versão ativa pode ser congelada |
| **Critério de Aceite** | Histórico de versões acessível |

**Ciclo de Versões:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   v1.0      │───▶│   v1.1      │───▶│   v2.0      │
│  (Draft)    │    │ (Aprovada)  │    │ (Congelada) │
└─────────────┘    └─────────────┘    └─────────────┘
                         │
                         ▼
                   ┌─────────────┐
                   │  HISTÓRICO  │
                   │  Acessível  │
                   └─────────────┘
```

---

### RF-005: Execução Orçamentária e Compromissos

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Marcar rubricas como comprometidas após contratação |
| **Regras de Negócio** | Reduzir valor disponível no orçamento automaticamente |
| **Critério de Aceite** | Relatório atualizado automaticamente |

**Fluxo de Comprometimento:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Contratação │───▶│Rubrica Marcada│──▶│   Valor    │
│  Realizada  │    │Comprometida │    │ Deduzido   │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
                                    ┌─────────────┐
                                    │  Relatório  │
                                    │ Atualizado  │
                                    └─────────────┘
```

---

### RF-006: Geração de Pedido de Compra

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Enviar dados ao OMIE para gerar pedido ou conta a pagar |
| **Regras de Negócio** | A definir se será pedido ou conta direta |
| **Critério de Aceite** | Confirmação de envio e resposta do OMIE |

**Integração com OMIE:**

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    SGIM     │───API──▶│    OMIE     │───────▶│   Pedido/   │
│  (Sistema)  │         │   (ERP)     │         │Conta a Pagar│
└─────────────┘         └─────────────┘         └─────────────┘
       │                       │
       │                       │
       ▼                       ▼
┌─────────────┐         ┌─────────────┐
│ Confirmação │◀────────│   Status    │
│   Envio     │         │  Resposta   │
└─────────────┘         └─────────────┘
```

---

### RF-007: Cadastro e Acesso de Fornecedores

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Fornecedor pode preencher e manter seus dados |
| **Regras de Negócio** | Acesso restrito a dados próprios |
| **Critério de Aceite** | Dados validados e salvos |

---

### RF-008: Controle de Tarefas e Pendências

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Criar tarefas com prazos e alertas |
| **Regras de Negócio** | Notificações por e-mail ou no sistema |
| **Critério de Aceite** | Alerta emitido em caso de atraso |

**Sistema de Alertas:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Tarefa    │───▶│   Prazo     │───▶│   Alerta    │
│   Criada    │    │ Monitorado  │    │  Emitido    │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                         ┌──────────────────┴──────────────────┐
                         ▼                                     ▼
                  ┌─────────────┐                       ┌─────────────┐
                  │  E-mail     │                       │  Sistema    │
                  │ Notificação │                       │ Notificação │
                  └─────────────┘                       └─────────────┘
```

---

### RF-009: Emissão de Relatórios (Cost Report)

| Atributo | Descrição |
|----------|-----------|
| **Descrição** | Mostrar comparação entre orçamento, compromissos e pagamentos |
| **Regras de Negócio** | Dados extraídos do ERP OMIE |
| **Critério de Aceite** | Relatório gerado em tela ou exportável |

**Estrutura do Cost Report:**

| Coluna | Descrição |
|--------|-----------|
| Rubrica | Identificação do item |
| Orçado | Valor previsto |
| Comprometido | Valor já contratado |
| Pago | Valor efetivamente desembolsado |
| Saldo | Diferença disponível |
| % Execução | Percentual realizado |

---

## 15.4 Requisitos Não Funcionais Detalhados

### RNF - Desempenho

| Métrica | Requisito |
|---------|-----------|
| Tempo de resposta (buscas/filtros) | **≤ 2 segundos** |
| Carregamento de telas complexas | **≤ 3 segundos** |

### RNF - Segurança

| Requisito | Implementação |
|-----------|---------------|
| Criptografia | Dados em trânsito e em repouso |
| Controle de acesso | Por perfil de usuário |
| Conformidade | LGPD |

### RNF - Usabilidade

| Aspecto | Referência |
|---------|------------|
| Interface | Similar a Trello e OMIE |
| Experiência | Intuitiva e fluida |
| Curva de aprendizado | Baixa |

### RNF - Disponibilidade

| Métrica | Requisito |
|---------|-----------|
| **Uptime mínimo** | **99,5%** |
| Janela de manutenção | Fora do horário comercial |

---

## 15.5 Requisitos de Interface Externa

### Integração OMIE (ERP)

| Operação | Descrição |
|----------|-----------|
| **Enviar** | Dados para gerar pedidos |
| **Enviar** | Contas a pagar |
| **Receber** | Status de pagamentos |

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE INTEGRAÇÃO OMIE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SGIM                           OMIE                               │
│  ────                           ────                               │
│                                                                     │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │ Pedido de    │─────────────▶│   Pedido     │                    │
│  │ Compra       │    POST      │   Criado     │                    │
│  └──────────────┘              └──────────────┘                    │
│                                                                     │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │ Conta a      │─────────────▶│   Conta      │                    │
│  │ Pagar        │    POST      │   Lançada    │                    │
│  └──────────────┘              └──────────────┘                    │
│                                                                     │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │ Status       │◀─────────────│   Status     │                    │
│  │ Atualizado   │    GET       │   Pagamento  │                    │
│  └──────────────┘              └──────────────┘                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Integração Google Drive

| Operação | Descrição |
|----------|-----------|
| **Upload** | Envio de documentos (contratos, NFs) |
| **Leitura** | Visualização de documentos no sistema |
| **Associação** | Vincular documentos aos projetos |

```
┌─────────────────────────────────────────────────────────────────────┐
│                 FLUXO DE INTEGRAÇÃO GOOGLE DRIVE                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SGIM                         GOOGLE DRIVE                         │
│  ────                         ────────────                         │
│                                                                     │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │   Upload     │─────────────▶│  Documento   │                    │
│  │  Documento   │    API       │  Armazenado  │                    │
│  └──────────────┘              └──────────────┘                    │
│                                       │                            │
│                                       ▼                            │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │ Visualização │◀─────────────│    Link      │                    │
│  │  no Sistema  │   Embed/URL  │   Gerado     │                    │
│  └──────────────┘              └──────────────┘                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Metadados dos Documentos Base

### PRD 000 - Visão Geral e Contexto do Produto

| Campo | Valor |
|-------|-------|
| **ID do Documento** | PRD 000 |
| **Título Original** | Visão Geral e Contexto do Produto |
| **Status** | Em Protótipo (Validado) |
| **Autor** | Manuela |
| **Data de Criação** | 25/09/2025 |
| **Última Atualização** | 24/11/2025 |
| **Versão** | 1.2 |

### Documento 01 - Checklist Comercial

| Campo | Valor |
|-------|-------|
| **Título** | Checklist Comercial para Levantamento Inicial de Projetos |
| **Tipo** | Versão Não-Técnica |

### Documento 02 - Especificação de Requisitos

| Campo | Valor |
|-------|-------|
| **Título** | Especificação de Requisitos de Software |
| **Tipo** | Sistema de Gestão Orçamentária para Produtora Audiovisual |

---

# 16. Análise de Escopo e Gestão de Mudanças

> **Fonte:** Pontos de Alinhamento e Evidências de Escopo Adicional (Account Manager/PO Sênior)

## 16.1 Diagnóstico do Cronograma

### Causa Raiz Identificada

O problema no cronograma é resultado de **desvio de escopo (Scope Creep)**, impulsionado por:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FATORES DE SCOPE CREEP                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              ADIÇÕES CONTÍNUAS DE FUNCIONALIDADES           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              +                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │         ALTA GRANULARIDADE EXIGIDA NOS REQUISITOS           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              +                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │            APEGO AO FORMATO "PLANILHA-LIKE"                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 16.2 Análise de Escopo: Original vs. Adições

### Matriz Comparativa de Escopo

#### Área: Orçamento

| Escopo Original (Doc. 01/02) | Adição/Alteração do Cliente | Impacto |
|------------------------------|----------------------------|---------|
| Criar/cadastrar projetos e orçamentos; Gerenciar versões | Implementação da lógica de **Orçamento Congelado** (Aprovado vs. Trabalho) e **Contingência** | Nova regra de negócio complexa, exigindo gatilho de "Freeze Aprovado" no sistema |
| Atribuir rubricas a responsáveis (Gestão) | Requisito para atribuição de **Gestão em massa** (multiple selection/checkbox) com botão "Atribuir" | Funcionalidade de edição/delegação em lote além da simples atribuição por linha |

#### Área: Contratação

| Escopo Original (Doc. 01/02) | Adição/Alteração do Cliente | Impacto |
|------------------------------|----------------------------|---------|
| Cadastrar fornecedores (autonomia via link ou login) | Adição do campo **Cronograma de Pagamento** na tela de Contratação. Sistema deve gerar automaticamente lançamentos de Pagamento (parcelas) | Interdependência crítica e novo fluxo de trabalho entre Contratação e Pagamentos |
| N/A (Função não detalhada) | Adição de campo para selecionar **Sócio Contratado** (múltiplos sócios por CNPJ) | Aumento da complexidade do cadastro para gerenciar perfis de pagamento |

#### Área: Verbas / Fluxo de Aprovação

| Escopo Original (Doc. 01/02) | Adição/Alteração do Cliente | Impacto |
|------------------------------|----------------------------|---------|
| Acompanhar execuções e compromissos | Requisito para **três níveis de gestão/aprovação**: PEI → PED/CD → Coordenador/Departamento | Aprofundamento significativo da hierarquia de aprovação |

#### Área: Relatórios

| Escopo Original (Doc. 01/02) | Adição/Alteração do Cliente | Impacto |
|------------------------------|----------------------------|---------|
| Emitir relatórios (ex: Cost Report) | Demanda por **Relatórios Flexíveis/Customizáveis** (montar o relatório). Filtro por Grande Item e exportação **Itemizada** (Pagamento por Pagamento) | Mudança de relatórios estáticos para ferramenta de BI simplificada com drill-down |

---

## 16.3 O Desafio "Planilha-Like"

### Diagnóstico

O apego ao formato de planilha é uma **fonte de atrito e complexidade** que:
- Retarda o design (Wireframing/Prototipagem)
- Exige que a equipe "refaça" a lógica do Excel
- **Não é o propósito** de um sistema de gestão em Bubble

### Evidências e Impactos

```
┌─────────────────────────────────────────────────────────────────────┐
│                REQUISITOS "PLANILHA-LIKE"                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 1. ORÇAMENTO EM "PLANILHA CONGELADA"                          │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │ • Visualização "inteira, a linha inteira com todas as colunas"│ │
│  │ • "Sem colapsar" os dados                                     │ │
│  │ • Estrutura de esqueleto dos itens orçamentários              │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 2. EDIÇÃO EM MASSA VS. EDIÇÃO POR LINHA                       │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │ • Necessidade de editar em massa (ex: mudar todas as semanas  │ │
│  │   de produção de 500 linhas de uma vez)                       │ │
│  │ • Função típica de planilha vs. granularidade de sistema      │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 3. ALOCAÇÃO POR FASE (GRÁFICO DE GANTT-LIKE)                  │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │ • Visualizar alocação por fase (Desenvolvimento, Pré, Pós)    │ │
│  │ • Cada coluna representa um período de tempo                  │ │
│  │ • Transforma orçamento em ferramenta de timeline              │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 4. SUBCÓDIGO / QUEBRA DE RUBRICA                              │ │
│  ├───────────────────────────────────────────────────────────────┤ │
│  │ • Subcódigo (001.001.01, 001.001.02) ou 'A'/'B'               │ │
│  │ • Identificar cada fornecedor dentro da mesma rubrica         │ │
│  │ • Evitar que pagamentos "se juntem" no relatório              │ │
│  │ • Solução de "gambiarra de planilha" traduzida para sistema   │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 16.4 Alertas e Confirmações sobre Impacto no Cronograma

### Registro de Comunicações sobre Atrasos

| Evento | Descrição | Stakeholder |
|--------|-----------|-------------|
| **Atraso Conhecido** | Fase de protótipo deveria ter sido encerrada dia 3 (quarta-feira). Ajustes adicionais impactam cronograma | Leonora/Danilo |
| **Confirmação do Cliente** | "É realmente uma questão de funcionamento... do que eu conheço, é questão sistêmica" | Mari |
| **Atraso na Entrega Final** | "Pra dezembro, eu já não vejo essa plataforma... Peço encarecidamente que esse feedback venha no início da semana" | Leonora |
| **Reconhecimento da Complexidade** | "Eu estou entendendo que algumas coisas que a gente vai esbarrar é questão sistêmica mesmo... a gente vai cair num outro problema, mas não tem o que fazer" | Mari |

### Timeline de Impactos

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LINHA DO TEMPO DE IMPACTOS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ESCOPO         ADIÇÕES DE        COMPLEXIDADE      ENTREGA        │
│  ORIGINAL       ESCOPO            PLANILHA-LIKE     IMPACTADA      │
│     │              │                   │                │          │
│     ▼              ▼                   ▼                ▼          │
│  ┌──────┐      ┌──────┐            ┌──────┐        ┌──────┐       │
│  │ DOC  │─────▶│SCOPE │───────────▶│DESIGN│───────▶│ATRASO│       │
│  │01/02 │      │CREEP │            │ATRITO│        │ DEZ  │       │
│  └──────┘      └──────┘            └──────┘        └──────┘       │
│                                                                     │
│  Set/Out       Out/Nov              Nov             Dez/Jan        │
│  2025          2025                 2025            2025/26        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 17. Proposta de Roadmap: V1 → V2

> **Estratégia:** Transformando Complexidade em Oportunidade

## 17.1 Enquadramento Estratégico

### Mudança de Percepção

| De (Percepção Atual) | Para (Nova Proposta de Valor) |
|----------------------|-------------------------------|
| "O cronograma da V1 está atrasado" | "O sucesso da V1 nos permitiu desenvolver o Core do sistema com granularidade sem precedentes, validando a necessidade da V2" |
| "Minhas exigências são muito complexas para o Bubble" | "Nossas soluções de engenharia para traduzir regras de negócio em software são prova da nossa expertise no Bubble, preparando o sistema para a V2" |
| "As funcionalidades de planilha-like ficaram de fora (omissão)" | "As funcionalidades de V2 representam o futuro da sua gestão, focando em otimização de tempo e eliminação total do retrabalho manual" |

### Reposicionamento

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REPOSICIONAMENTO ESTRATÉGICO                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║                                                               ║ │
│  ║   "A V1 não atrasou; o cliente investiu tanto no             ║ │
│  ║    aprofundamento do escopo que, naturalmente,               ║ │
│  ║    consumiu o tempo alocado."                                ║ │
│  ║                                                               ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 17.2 Escopo da V2: "Must-Haves" da Próxima Fase

### Pilar A: Otimização de Processos e Controle Avançado

> **Público-Alvo:** Márcio (Lógica/Sistemas)  
> **Foco:** Contingência, Alertas Pró-Ativos e Gestão em Lote

#### Funcionalidade V2-A1: Gestão Pró-Ativa da Contingência

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Implementação completa da lógica de Orçamento Aprovado, Orçamento de Trabalho e Contingência |
| **Vantagem** | Eliminar controle manual. Sistema calcula saldo exato da contingência em tempo real |
| **Alerta** | Notificação quando estouro de rubrica começar a "comer" a reserva de contingência |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-A1: GESTÃO DE CONTINGÊNCIA                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ORÇAMENTO          ORÇAMENTO           CONTINGÊNCIA               │
│  APROVADO           DE TRABALHO         (RESERVA)                  │
│  (Congelado)        (Dinâmico)          (Monitorada)               │
│                                                                     │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐               │
│  │ R$ 1.000 │       │ R$ 1.100 │       │ R$ 100   │               │
│  │          │       │ (+10%)   │       │ (ALERTA!)│               │
│  └──────────┘       └──────────┘       └──────────┘               │
│       │                  │                  │                      │
│       └──────────────────┴──────────────────┘                      │
│                          │                                         │
│                          ▼                                         │
│               ┌──────────────────────┐                             │
│               │  CÁLCULO AUTOMÁTICO  │                             │
│               │  EM TEMPO REAL       │                             │
│               └──────────────────────┘                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Funcionalidade V2-A2: Edição e Delegação em Massa

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Atribuição de Gestão em lote via checkbox e filtros avançados |
| **Vantagem** | Editar alocação por fase (ex: mudar de 5 para 4 semanas em 500 linhas de uma única vez) |
| **Economia** | Horas de trabalho manual eliminadas |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-A2: EDIÇÃO EM MASSA                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ANTES (V1)                      DEPOIS (V2)                       │
│  ─────────                       ──────────                        │
│                                                                     │
│  ☐ Item 001 ─ Editar            ☑ Item 001 ┐                      │
│  ☐ Item 002 ─ Editar            ☑ Item 002 │                      │
│  ☐ Item 003 ─ Editar            ☑ Item 003 │                      │
│  ☐ Item 004 ─ Editar            ☑ Item 004 ├─▶ [EDITAR EM LOTE]   │
│  ☐ Item 005 ─ Editar            ☑ Item 005 │                      │
│  ...                            ...        │                      │
│  ☐ Item 500 ─ Editar            ☑ Item 500 ┘                      │
│                                                                     │
│  ⏱️ 500 cliques                  ⏱️ 1 clique                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Funcionalidade V2-A3: Alocação e Estrutura Orçamentária "Gantt-like"

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Estruturação visual do orçamento por fase (Desenvolvimento, Pré, Pós) |
| **Vantagem** | Visualização imediata tipo "Gantt", crucial para planejamento |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-A3: VISUALIZAÇÃO GANTT-LIKE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  RUBRICA      │ DEV │ PRÉ-PROD │ PRODUÇÃO │ PÓS-PROD │            │
│  ─────────────┼─────┼──────────┼──────────┼──────────┼            │
│  001 - Arte   │ ██  │ ████████ │ ████████ │          │            │
│  002 - Fig.   │     │ ████████ │ ████████ │ ██       │            │
│  003 - Loc.   │     │ ████     │ ████████ │          │            │
│  004 - Equip. │     │ ██       │ ████████ │ ████     │            │
│  005 - Elenco │     │ ████████ │ ████████ │          │            │
│                                                                     │
│  ██ = Alocação de recursos no período                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Pilar B: Eliminação de Retrabalho

> **Público-Alvo:** Mari (Usabilidade/Operação)  
> **Foco:** Relatórios Flexíveis, Granularidade e Automação de Pagamentos

#### Funcionalidade V2-B1: BI Flexível e Customizável

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Ferramenta de "montar o relatório" e exportação itemizada (Pagamento por Pagamento) |
| **Vantagem** | Filtrar e visualizar exatamente o necessário, sem planilhas externas |
| **Problema Resolvido** | Fim dos relatórios estáticos do ProFilm |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-B1: BI FLEXÍVEL                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    CONSTRUTOR DE RELATÓRIO                  │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  FILTROS:                                                   │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │   │
│  │  │ Grande Item ▼  │  │ Departamento ▼ │  │ Período ▼    │ │   │
│  │  └────────────────┘  └────────────────┘  └───────────────┘ │   │
│  │                                                             │   │
│  │  COLUNAS:                                                   │   │
│  │  ☑ Rubrica  ☑ Orçado  ☑ Comprometido  ☑ Pago  ☑ Saldo    │   │
│  │  ☐ Fornecedor  ☑ Data Pagamento  ☐ NF                     │   │
│  │                                                             │   │
│  │  AGRUPAMENTO:                                               │   │
│  │  ○ Por Rubrica  ● Por Pagamento  ○ Por Fornecedor          │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │              [GERAR RELATÓRIO]                      │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  │                                                             │   │
│  │  EXPORTAR: [PDF] [EXCEL] [CSV]                             │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Funcionalidade V2-B2: Automação do Fluxo Contratação → Pagamento

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Geração automática de todas as parcelas de pagamento a partir do Cronograma na Contratação |
| **Vantagem** | Eliminar lançamento manual e duplicação de informações |
| **Escala** | Até 18 meses de parcelas geradas automaticamente |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-B2: AUTOMAÇÃO CONTRATAÇÃO → PAGAMENTO              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ANTES (V1) - MANUAL                                               │
│  ────────────────────                                              │
│                                                                     │
│  Contratação ─────▶ Lançar Parcela 1 ─────▶ Lançar Parcela 2      │
│       │                    │                      │                │
│       │              ─────▶ Lançar Parcela 3 ─────▶ ...            │
│       │                    │                      │                │
│       └────────────────────┴──────────────────────┘                │
│                    (18 lançamentos manuais)                        │
│                                                                     │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                     │
│  DEPOIS (V2) - AUTOMÁTICO                                          │
│  ────────────────────────                                          │
│                                                                     │
│  ┌────────────┐         ┌─────────────────────────────────────┐   │
│  │CONTRATAÇÃO │         │         PARCELAS GERADAS            │   │
│  │            │         │                                     │   │
│  │ Cronograma:│────────▶│  ✓ Parcela 1 - Jan/2026            │   │
│  │ 18 meses   │  AUTO   │  ✓ Parcela 2 - Fev/2026            │   │
│  │ R$ 1.800   │         │  ✓ Parcela 3 - Mar/2026            │   │
│  │            │         │  ...                                │   │
│  └────────────┘         │  ✓ Parcela 18 - Jun/2027           │   │
│                         └─────────────────────────────────────┘   │
│                                                                     │
│                    (1 cadastro = 18 parcelas automáticas)          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### Funcionalidade V2-B3: Controle de Status e Prazos do Projeto

| Aspecto | Descrição |
|---------|-----------|
| **Funcionalidade** | Alertas e gestão de pendências incluindo prazos de entrega e relatórios Ancine |
| **Vantagem** | Reduzir risco de glosa e multas |

```
┌─────────────────────────────────────────────────────────────────────┐
│              V2-B3: GESTÃO DE PRAZOS E ALERTAS                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   CENTRAL DE ALERTAS                        │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  🔴 CRÍTICO  │ Relatório Ancine vence em 3 dias            │   │
│  │             │ Projeto: Série XYZ - Temporada 2             │   │
│  │                                                             │   │
│  │  🟡 ATENÇÃO  │ 5 NFs pendentes de validação                │   │
│  │             │ Prazo: 15/01/2026                            │   │
│  │                                                             │   │
│  │  🟡 ATENÇÃO  │ Contrato expira em 7 dias                   │   │
│  │             │ Fornecedor: Locadora ABC                     │   │
│  │                                                             │   │
│  │  🟢 INFO     │ 3 parcelas programadas para semana          │   │
│  │             │ Total: R$ 45.000,00                          │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 17.3 Resumo Comparativo V1 vs. V2

### Matriz de Funcionalidades

| Funcionalidade | V1 (MVP) | V2 (Evolução) |
|----------------|----------|---------------|
| **Orçamento básico** | ✅ Incluído | ✅ Mantido |
| **Controle de versões** | ✅ Incluído | ✅ Mantido |
| **Aprovação hierárquica** | ✅ Incluído | ✅ Mantido |
| **Portal do Parceiro** | ✅ Incluído | ✅ Mantido |
| **Integração OMIE** | ✅ Incluído | ✅ Mantido |
| **Gestão de Contingência automática** | ⚠️ Parcial | ✅ Completo |
| **Edição em massa** | ❌ Não incluído | ✅ Incluído |
| **Visualização Gantt-like** | ❌ Não incluído | ✅ Incluído |
| **BI Flexível/Customizável** | ❌ Não incluído | ✅ Incluído |
| **Automação Contratação→Pagamento** | ⚠️ Parcial | ✅ Completo |
| **Alertas pró-ativos (Ancine)** | ❌ Não incluído | ✅ Incluído |

---

## 17.4 Proposta de Valor V2

### Declaração de Fechamento

```
╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║  "Com a V1 finalizada e estável, o investimento na V2 não é        ║
║   apenas sobre adicionar funcionalidades; é sobre converter o      ║
║   conhecimento e as regras de negócio complexas que validamos      ║
║   juntos — como a lógica de contingência e a automação do fluxo    ║
║   de pagamentos — em VANTAGEM COMPETITIVA e EFICIÊNCIA             ║
║   OPERACIONAL DEFINITIVA para a Movioca."                          ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

### Benefícios Quantificáveis V2

| Métrica | Impacto Esperado |
|---------|------------------|
| **Tempo de edição em massa** | -95% (500 cliques → 1 clique) |
| **Lançamento de parcelas** | -100% manual (automação completa) |
| **Risco de glosa Ancine** | Redução significativa (alertas pró-ativos) |
| **Tempo em relatórios** | -80% (BI flexível vs. planilhas externas) |
| **Visibilidade de contingência** | 100% em tempo real |

---

# 18. Estrutura Analítica do Projeto (EAP) - Design UI/UX

> **Fonte:** EAP - Criação de Telas no Figma

## 18.1 Visão Geral da EAP de Design

```
┌─────────────────────────────────────────────────────────────────────┐
│           1.0 DESIGN DA PLATAFORMA (FIGMA DELIVERABLES)            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │    1.1      │  │    1.2      │  │    1.3      │  │   1.4     │ │
│  │  Sistema    │  │  Módulo     │  │  Módulo     │  │  Módulo   │ │
│  │   Base      │  │ Orçamento   │  │Contratação  │  │ Cadastros │ │
│  │             │  │             │  │& Pagamento  │  │& Configs  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 18.2 Sistema Base e Usabilidade (1.1)

### 1.1.1 Style Guide

| Elemento | Descrição |
|----------|-----------|
| **Tipografia** | Definição de fontes, tamanhos e hierarquia |
| **Cores** | Paleta principal e secundária |
| **Espaçamentos** | Grid e margens padrão |

### 1.1.2 Biblioteca de Componentes

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BIBLIOTECA DE COMPONENTES                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  BOTÕES                    INPUTS                   CARDS          │
│  ──────                    ──────                   ─────          │
│  ┌─────────┐              ┌─────────────┐         ┌──────────┐    │
│  │ Primário│              │ Text Input  │         │  Info    │    │
│  └─────────┘              └─────────────┘         │  Card    │    │
│  ┌─────────┐              ┌─────────────┐         └──────────┘    │
│  │Secundário│             │ Select/Drop │         ┌──────────┐    │
│  └─────────┘              └─────────────┘         │  Data    │    │
│  ┌─────────┐              ┌─────────────┐         │  Card    │    │
│  │ Terciário│             │ Checkbox    │         └──────────┘    │
│  └─────────┘              └─────────────┘                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.1.3 Dark Mode / Light Mode

| Modo | Características |
|------|-----------------|
| **Light Mode** | Fundo claro, texto escuro |
| **Dark Mode** | Fundo escuro, texto claro |
| **Alternância** | Toggle na Top Bar |

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ALTERNÂNCIA DE TEMA                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  LIGHT MODE                          DARK MODE                      │
│  ┌─────────────────────┐            ┌─────────────────────┐        │
│  │ ░░░░░░░░░░░░░░░░░░░ │            │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │        │
│  │ ░░ ████████████ ░░░ │            │ ▓▓ ░░░░░░░░░░░░ ▓▓▓ │        │
│  │ ░░ ████████████ ░░░ │  ◀──▶     │ ▓▓ ░░░░░░░░░░░░ ▓▓▓ │        │
│  │ ░░ ████████████ ░░░ │   🌓      │ ▓▓ ░░░░░░░░░░░░ ▓▓▓ │        │
│  │ ░░░░░░░░░░░░░░░░░░░ │            │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │        │
│  └─────────────────────┘            └─────────────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.1.4 Top Bar

```
┌─────────────────────────────────────────────────────────────────────┐
│  🏠  Sistema de Gestão Integrado Movioca          [🌓] [👤] [⚙️]  │
└─────────────────────────────────────────────────────────────────────┘
```

| Elemento | Função |
|----------|--------|
| **Logo/Home** | Navegação para dashboard |
| **Nome do Sistema** | Identificação visual |
| **Toggle Tema** | Dark/Light Mode |
| **Perfil** | Dados do usuário logado |
| **Configurações** | Acesso rápido |

---

## 18.3 Módulo Orçamento - Telas (1.2)

### 1.2.1 Tela de Criação/Edição de Projeto

#### 1.2.1.1 Formulário de Projeto

**Campos do Formulário:**

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome do Projeto | Text | ✅ |
| Gênero | Select | ✅ |
| Ano de Execução | Select/Date | ✅ |
| Status Movioca | Select | ✅ |
| Quantidade de Episódios | Number | ⚠️ Condicional |
| Duração dos Episódios | Number | ⚠️ Condicional |

**Status Movioca:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATUS DO PROJETO MOVIOCA                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐   ┌────────────┐   ┌──────────┐   ┌──────────────┐  │
│  │PROSPECÇÃO│──▶│CONTRATAÇÃO │──▶│ PRODUÇÃO │──▶│  EXPLORAÇÃO  │  │
│  └──────────┘   └────────────┘   └──────────┘   └──────────────┘  │
│                                                                     │
│  Identificação   Negociação     Execução do     Distribuição       │
│  de oportunidade e fechamento   projeto         e receitas         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 1.2.1.2 Campos Condicionais (Séries)

> Exibidos apenas quando **Gênero = Série**

| Campo | Descrição |
|-------|-----------|
| Quantidade de Episódios | Número total de episódios |
| Duração dos Episódios | Tempo em minutos por episódio |

#### 1.2.1.3 Modal de Criação de Orçamento

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CRIAR NOVO ORÇAMENTO                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Como deseja criar o orçamento?                                    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ○  COPIAR DE ORÇAMENTO EXISTENTE                           │   │
│  │     ─────────────────────────────                           │   │
│  │     Cópia completa de um orçamento já cadastrado            │   │
│  │     (inclui valores, estrutura e alocações)                 │   │
│  │                                                             │   │
│  │     Selecionar orçamento: [Dropdown ▼]                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ○  CRIAR A PARTIR DE PLANO DE CONTAS ZERADO                │   │
│  │     ─────────────────────────────────────                   │   │
│  │     Estrutura limpa baseada em template                     │   │
│  │     (apenas estrutura de rubricas, sem valores)             │   │
│  │                                                             │   │
│  │     Selecionar plano: [Dropdown ▼]                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                              [CANCELAR]  [CRIAR ORÇAMENTO]         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 1.2.2 Tela Orçamento Detalhado (Matriz de Custos)

#### 1.2.2.1 Layout com Fases Horizontais

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  ORÇAMENTO DETALHADO - Projeto XYZ                                    [Exportar ▼]     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  [Expandir Tudo] [Colapsar Tudo]                              Gestão: [Atribuir ▼]     │
│                                                                                         │
├────┬──────────────────────┬────────────┬────────────┬────────────┬────────────┬────────┤
│ ☐  │ CÓDIGO / DESCRIÇÃO   │DESENVOLV.  │  PRÉ-PROD  │  PRODUÇÃO  │  PÓS-PROD  │ TOTAL  │
├────┼──────────────────────┼────────────┼────────────┼────────────┼────────────┼────────┤
│    │ ▼ 001 - ARTE         │            │            │            │            │        │
│ ☐  │   001.001 - Cenografia│   5.000   │   15.000   │   80.000   │    -       │100.000 │
│ ☐  │   001.001.01 - Forn A │   2.500   │    7.500   │   40.000   │    -       │ 50.000 │
│ ☐  │   001.001.02 - Forn B │   2.500   │    7.500   │   40.000   │    -       │ 50.000 │
│ ☐  │   001.002 - Adereços  │   2.000   │    8.000   │   40.000   │    -       │ 50.000 │
├────┼──────────────────────┼────────────┼────────────┼────────────┼────────────┼────────┤
│    │ ▼ 002 - FIGURINO      │            │            │            │            │        │
│ ☐  │   002.001 - Compras   │     -     │   20.000   │   30.000   │    -       │ 50.000 │
│ ☐  │   002.002 - Aluguel   │     -     │   10.000   │   25.000   │   5.000    │ 40.000 │
├────┴──────────────────────┴────────────┴────────────┴────────────┴────────────┴────────┤
│                                                                                         │
│  RESUMO TOTAL                                                                          │
│  ┌────────────┬────────────┬──────────────┬────────────┬────────────┐                  │
│  │ ORÇAMENTO  │  APROVADO  │ COMPROMETIDO │ REALIZADO  │   SALDO    │                  │
│  ├────────────┼────────────┼──────────────┼────────────┼────────────┤                  │
│  │R$ 240.000  │R$ 220.000  │  R$ 150.000  │R$ 80.000   │R$ 70.000   │                  │
│  └────────────┴────────────┴──────────────┴────────────┴────────────┘                  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1.2.2.2 Subcódigo / Divisão de Linha

| Funcionalidade | Descrição |
|----------------|-----------|
| **Objetivo** | Permitir duplicação de rubrica por fornecedor individual |
| **Formato** | `XXX.XXX.XX` (ex: 001.001.01, 001.001.02) |
| **Uso** | Separar pagamentos de diferentes fornecedores na mesma rubrica |

```
RUBRICA ORIGINAL              APÓS DIVISÃO
─────────────────             ────────────────────────────────

001.001 - Cenografia  ──────▶ 001.001 - Cenografia (Pai)
    R$ 100.000                    │
                                  ├── 001.001.01 - Fornecedor A
                                  │       R$ 50.000
                                  │
                                  └── 001.001.02 - Fornecedor B
                                          R$ 50.000
```

#### 1.2.2.3 Atribuição em Massa

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ATRIBUIÇÃO EM MASSA                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. SELECIONAR ITENS                                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ ☑ Selecionar todos (15 itens)                              │    │
│  ├────────────────────────────────────────────────────────────┤    │
│  │ ☑ 001.001 - Cenografia                                     │    │
│  │ ☑ 001.002 - Adereços                                       │    │
│  │ ☑ 001.003 - Set Design                                     │    │
│  │ ☐ 002.001 - Figurino Compras                               │    │
│  │ ☑ 002.002 - Figurino Aluguel                               │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  2. ATRIBUIR GESTÃO                                                │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ Gestor Responsável: [Maria Silva - Arte        ▼]          │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
│                              [CANCELAR]  [ATRIBUIR SELECIONADOS]   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 1.2.2.4 Botões de Expansão/Colapso

| Botão | Ação |
|-------|------|
| **[▼ Expandir Tudo]** | Mostra todos os sub-itens e detalhes |
| **[▲ Colapsar Tudo]** | Mostra apenas os Grandes Itens (nível 1) |

#### 1.2.2.5 Campos de Resumo Total

| Campo | Descrição | Cálculo |
|-------|-----------|---------|
| **Orçamento** | Valor total previsto | Soma de todas as rubricas |
| **Aprovado** | Valor congelado/liberado | Valor após aprovação |
| **Comprometido** | Valor já contratado | Soma das contratações |
| **Realizado** | Valor efetivamente pago | Soma dos pagamentos |
| **Saldo** | Disponível para uso | Aprovado - Comprometido |

#### 1.2.2.6 Exportação

| Formato | Descrição |
|---------|-----------|
| **CSV** | Dados separados por vírgula |
| **XLS** | Planilha Excel |

---

## 18.4 Módulo Contratação e Workflow de Pagamento (1.3)

### 1.3.1 Tela Contratação/Programação

#### 1.3.1.1 Pop-up "Nova Contratação"

```
┌─────────────────────────────────────────────────────────────────────┐
│  ✖                    NOVA CONTRATAÇÃO                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  DADOS DA CONTRATAÇÃO                                              │
│  ─────────────────────                                             │
│                                                                     │
│  Tipo de Contratação:                                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ [Selecionar tipo ▼]                                         │   │
│  │  • Equipe Fixa                                              │   │
│  │  • Projeto                                                  │   │
│  │  • Fornecedor                                               │   │
│  │  • Elenco                                                   │   │
│  │  • Gerenciamento                                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Parceiro/Fornecedor:  [Buscar parceiro...            ▼]           │
│  Rubrica Vinculada:    [Selecionar rubrica            ▼]           │
│  Valor Total:          [R$ _______________]                        │
│                                                                     │
│  ───────────────────────────────────────────────────────────────   │
│                                                                     │
│  PROGRAMAÇÃO DE PAGAMENTO                                          │
│  ─────────────────────────                                         │
│                                                                     │
│  ┌────────────┬─────────────┬─────────────┬───────────┐            │
│  │  Parcela   │    Data     │    Valor    │  Status   │            │
│  ├────────────┼─────────────┼─────────────┼───────────┤            │
│  │  1/3       │ 15/01/2026  │ R$ 10.000   │Programado │            │
│  │  2/3       │ 15/02/2026  │ R$ 10.000   │Programado │            │
│  │  3/3       │ 15/03/2026  │ R$ 10.000   │Programado │            │
│  └────────────┴─────────────┴─────────────┴───────────┘            │
│                                                                     │
│  [+ Adicionar Parcela]                                             │
│                                                                     │
│                              [CANCELAR]  [SALVAR CONTRATAÇÃO]      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 1.3.1.2 Tipos de Contratação

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Equipe Fixa** | Funcionários permanentes da Movioca | Coordenador interno |
| **Projeto** | Contratados para projeto específico | Diretor de fotografia |
| **Fornecedor** | Empresas prestadoras de serviço | Locadora de equipamentos |
| **Elenco** | Atores e atrizes | Protagonista |
| **Gerenciamento** | Gestão terceirizada | Produtora Executiva externa |

#### 1.3.1.3 Programação de Pagamento

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Data de Vencimento | Date | Data prevista para pagamento |
| Valor | Currency | Valor da parcela |
| Status | Select | Programado, Pendente, Pago |

#### 1.3.1.4 Validações

| Validação | Ação |
|-----------|------|
| ⚠️ Campo "Grande Item" | **REMOVIDO** - Não utilizado |

---

### 1.3.2 Tela Pagamentos (Fila de Transações)

#### 1.3.2.1 Visualização Linear

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  PAGAMENTOS - Fila de Transações                                    [Filtros ▼]        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  Projeto: [Todos ▼]   Status: [Todos ▼]   Período: [Janeiro/2026 ▼]                    │
│                                                                                         │
├──────┬───────────────┬─────────────────┬─────────────┬────────────┬─────────┬──────────┤
│  ID  │  FORNECEDOR   │     RUBRICA     │    VALOR    │ VENCIMENTO │ STATUS  │  AÇÕES   │
├──────┼───────────────┼─────────────────┼─────────────┼────────────┼─────────┼──────────┤
│ 0001 │ Locadora ABC  │ 003.001 - Equip.│ R$ 15.000   │ 10/01/2026 │ 🟢 PAGO │  [👁️]   │
│ 0002 │ João Silva    │ 001.002 - Arte  │ R$ 8.500    │ 12/01/2026 │ 🟢 PAGO │  [👁️]   │
│ 0003 │ Maria Santos  │ 002.001 - Fig.  │ R$ 12.000   │ 15/01/2026 │ 🔴 PEND │  [✓][👁️]│
│ 0004 │ Catering XYZ  │ 004.003 - Alim. │ R$ 5.000    │ 18/01/2026 │ ⚪ PROG │  [👁️]   │
│ 0005 │ Produtora EFG │ 005.001 - Ger.  │ R$ 25.000   │ 20/01/2026 │ 🔴 PEND │  [✓][👁️]│
├──────┴───────────────┴─────────────────┴─────────────┴────────────┴─────────┴──────────┤
│                                                                                         │
│  Total na Página: R$ 65.500                     Mostrando 1-5 de 127     [◀ 1 2 3 ▶]  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1.3.2.2 Paleta de Status

| Status | Cor | Ícone | Descrição |
|--------|-----|-------|-----------|
| **Programado** | Cinza | ⚪ | Aguardando data de vencimento |
| **Pendente** | Vermelho | 🔴 | Vencido ou aguardando aprovação |
| **Pago** | Verde | 🟢 | Pagamento efetuado |

---

### 1.3.3 Tela de Aprovação da Controladoria

#### 1.3.3.1 Interface de Aprovação

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  APROVAÇÃO DE PAGAMENTO                                                     [✖]        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌────────────────────────────────────────┬────────────────────────────────────────┐   │
│  │         DADOS DO PAGAMENTO             │         DOCUMENTOS ANEXOS              │   │
│  ├────────────────────────────────────────┼────────────────────────────────────────┤   │
│  │                                        │                                        │   │
│  │  Fornecedor: Locadora ABC Ltda         │  📄 CONTRATO                          │   │
│  │  CNPJ: 12.345.678/0001-90              │     [Visualizar] [Download]           │   │
│  │  Rubrica: 003.001 - Equipamentos       │                                        │   │
│  │  Valor: R$ 15.000,00                   │  📄 NOTA FISCAL                       │   │
│  │  Vencimento: 10/01/2026                │     NF 12345 - R$ 15.000,00           │   │
│  │                                        │     [Visualizar] [Download]           │   │
│  │  ─────────────────────────────         │                                        │   │
│  │                                        │  📄 COMPROVANTES                      │   │
│  │  Dados Bancários:                      │     [Visualizar] [Download]           │   │
│  │  Banco: Itaú (341)                     │                                        │   │
│  │  Agência: 1234                         │                                        │   │
│  │  Conta: 56789-0                        │                                        │   │
│  │                                        │                                        │   │
│  └────────────────────────────────────────┴────────────────────────────────────────┘   │
│                                                                                         │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                        FLUXO DE APROVAÇÃO                                        │  │
│  ├──────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                  │  │
│  │  ┌────────────┐     ┌────────────────┐     ┌──────────────────┐     ┌─────────┐ │  │
│  │  │DEPARTAMENTO│────▶│ CONTROLADORIA  │────▶│  CONTROLADORIA   │────▶│FINANCEIRO│ │  │
│  │  │            │     │    PROJETO     │     │     INTERNA      │     │         │ │  │
│  │  │   ✅ OK    │     │   ✅ OK        │     │   ⏳ AGUARDANDO  │     │  ⬜     │ │  │
│  │  └────────────┘     └────────────────┘     └──────────────────┘     └─────────┘ │  │
│  │                                                                                  │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  Observações:                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                                  │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│                                    [REJEITAR]  [SOLICITAR AJUSTE]  [✓ APROVAR]        │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1.3.3.2 Fluxo Hierárquico de Aprovação

```
┌─────────────────────────────────────────────────────────────────────┐
│              HIERARQUIA DE APROVAÇÃO DE PAGAMENTOS                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  NÍVEL 1              NÍVEL 2              NÍVEL 3       NÍVEL 4   │
│  ───────              ───────              ───────       ───────   │
│                                                                     │
│  ┌──────────┐      ┌──────────────┐     ┌──────────┐   ┌────────┐ │
│  │DEPARTAMENTO│────▶│CONTROLADORIA│────▶│CONTROLAD.│──▶│FINANC. │ │
│  │(Solicitante)│    │  DEDICADA   │     │ INTERNA  │   │(Executa)│ │
│  └──────────┘      │  (Projeto)  │     │ (Movioca)│   └────────┘ │
│                    └──────────────┘     └──────────┘              │
│                                                                     │
│  • Solicita         • Valida docs       • Aprova      • Processa  │
│  • Justifica        • Confere NF        • Audita      • Paga      │
│                    • Pré-aprova        • Libera                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

| Status Visual | Significado |
|---------------|-------------|
| ✅ OK | Aprovado neste nível |
| ⏳ AGUARDANDO | Pendente de ação |
| ❌ REJEITADO | Reprovado (volta ao solicitante) |
| ⬜ PENDENTE | Ainda não chegou neste nível |

---

## 18.5 Módulo Cadastros e Configurações (1.4)

### 1.4.1 Portal de Autoatendimento (Mobile First)

#### 1.4.1.1 Formulário de Cadastro Único (Responsivo)

```
┌─────────────────────┐
│   📱 MOBILE VIEW    │
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │    MOVIOCA    │  │
│  │   Portal do   │  │
│  │   Parceiro    │  │
│  └───────────────┘  │
│                     │
│  Tipo de Cadastro:  │
│  ┌───────────────┐  │
│  │[Selecionar ▼] │  │
│  │• Fornecedor   │  │
│  │• Elenco       │  │
│  │• Equipe       │  │
│  └───────────────┘  │
│                     │
│  ─────────────────  │
│                     │
│  DADOS PESSOAIS     │
│  ┌───────────────┐  │
│  │ Nome Completo │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ CPF/CNPJ      │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ E-mail        │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Telefone      │  │
│  └───────────────┘  │
│                     │
│  ─────────────────  │
│                     │
│  DADOS BANCÁRIOS    │
│  ┌───────────────┐  │
│  │ Banco         │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Agência       │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Conta         │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │   [ENVIAR]    │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

#### 1.4.1.2 Tela de Confirmação de Status

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATUS DO CADASTRO                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │     ✅ CADASTRO ENVIADO COM SUCESSO!                       │   │
│  │                                                             │   │
│  │     Protocolo: CAD-2026-00123                              │   │
│  │     Data: 13/01/2026 às 14:32                              │   │
│  │                                                             │   │
│  │     Status Atual: EM ANÁLISE                               │   │
│  │                                                             │   │
│  │     ┌─────────┐  ┌─────────┐  ┌─────────┐                 │   │
│  │     │ ENVIADO │─▶│ ANÁLISE │─▶│ APROVADO│                 │   │
│  │     │   ✅    │  │   ⏳    │  │   ⬜    │                 │   │
│  │     └─────────┘  └─────────┘  └─────────┘                 │   │
│  │                                                             │   │
│  │     Você receberá um e-mail quando o cadastro              │   │
│  │     for aprovado.                                          │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                              [ATUALIZAR STATUS]                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 1.4.2 Tela Configurações

#### 1.4.2.1 Central de Planos de Contas

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  CONFIGURAÇÕES > Planos de Contas                                   [+ Novo Plano]     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Buscar plano...                                                              │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PLANO: Ancine - Padrão 2026                                      [Editar] [📋] │   │
│  ├─────────────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                                 │   │
│  │  ▼ GRANDE ITEM 001 - EQUIPE                                                    │   │
│  │      001.001 - Direção                                                         │   │
│  │      001.002 - Produção                                                        │   │
│  │      001.003 - Fotografia                                                      │   │
│  │                                                                                 │   │
│  │  ▼ GRANDE ITEM 002 - ELENCO                                                    │   │
│  │      002.001 - Elenco Principal                                                │   │
│  │      002.002 - Elenco Secundário                                               │   │
│  │      002.003 - Figuração                                                       │   │
│  │                                                                                 │   │
│  │  ▶ GRANDE ITEM 003 - CENOGRAFIA                                                │   │
│  │  ▶ GRANDE ITEM 004 - FIGURINO                                                  │   │
│  │  ▶ GRANDE ITEM 005 - EQUIPAMENTOS                                              │   │
│  │                                                                                 │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PLANO: Netflix - Padrão Internacional                            [Editar] [📋] │   │
│  ├─────────────────────────────────────────────────────────────────────────────────┤   │
│  │  ▶ Clique para expandir...                                                     │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 1.4.2.2 Gestão de Usuários e Permissões

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  CONFIGURAÇÕES > Usuários e Permissões                              [+ Novo Usuário]   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  FILTRAR POR PERFIL: [Todos ▼]                                                         │
│                                                                                         │
├────────────────────┬──────────────────────┬──────────────────┬────────────┬────────────┤
│      USUÁRIO       │       E-MAIL         │      PERFIL      │   STATUS   │   AÇÕES    │
├────────────────────┼──────────────────────┼──────────────────┼────────────┼────────────┤
│ Márcio Yatsuda     │ marcio@movioca.com   │ Administrador    │ 🟢 Ativo   │ [✏️] [🗑️] │
│ Mari Guedes        │ mari@movioca.com     │ PEI              │ 🟢 Ativo   │ [✏️] [🗑️] │
│ Iasnaia/Naya       │ naya@movioca.com     │ CI               │ 🟢 Ativo   │ [✏️] [🗑️] │
│ Jéssica            │ jessica@movioca.com  │ Financeiro       │ 🟢 Ativo   │ [✏️] [🗑️] │
│ Carlos Produtor    │ carlos@projeto.com   │ PED              │ 🟢 Ativo   │ [✏️] [🗑️] │
│ Ana Controladoria  │ ana@projeto.com      │ CD               │ 🟢 Ativo   │ [✏️] [🗑️] │
├────────────────────┴──────────────────────┴──────────────────┴────────────┴────────────┤
│                                                                                         │
│  ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│  LEGENDA DE PERFIS:                                                                    │
│  ┌────────────────┬────────────────┬────────────────┐                                  │
│  │    INTERNOS    │   DEDICADOS    │   EXTERNOS     │                                  │
│  ├────────────────┼────────────────┼────────────────┤                                  │
│  │ Admin          │ PED            │ Fornecedor     │                                  │
│  │ PEI            │ CD             │ Elenco/Equipe  │                                  │
│  │ CI             │ Equipe Ded.    │                │                                  │
│  │ Financeiro     │                │                │                                  │
│  └────────────────┴────────────────┴────────────────┘                                  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 18.6 Checklist de Entregas - EAP Design

### Resumo de Deliverables

| Código | Entrega | Status |
|--------|---------|--------|
| **1.1** | **Sistema Base e Usabilidade** | |
| 1.1.1 | Style Guide | ⬜ Pendente |
| 1.1.2 | Biblioteca de Componentes | ⬜ Pendente |
| 1.1.3 | Dark/Light Mode | ⬜ Pendente |
| 1.1.4 | Top Bar | ⬜ Pendente |
| **1.2** | **Módulo Orçamento** | |
| 1.2.1 | Tela Criação/Edição Projeto | ⬜ Pendente |
| 1.2.2 | Tela Orçamento Detalhado | ⬜ Pendente |
| **1.3** | **Módulo Contratação e Pagamento** | |
| 1.3.1 | Tela Contratação/Programação | ⬜ Pendente |
| 1.3.2 | Tela Pagamentos | ⬜ Pendente |
| 1.3.3 | Tela Aprovação Controladoria | ⬜ Pendente |
| **1.4** | **Módulo Cadastros e Configs** | |
| 1.4.1 | Portal Autoatendimento (Mobile) | ⬜ Pendente |
| 1.4.2 | Tela Configurações | ⬜ Pendente |

---

# 19. Análise de Requisitos: Workflow vs. Protótipo

> **Fonte:** Análise Aprofundada - Requisitos de Workflow vs. Protótipo

## 19.1 Necessidade Principal

```
╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║   A principal necessidade que a plataforma deve suprir é a         ║
║   criação de WORKFLOWS e LISTAS DE TAREFAS                         ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 19.2 Áreas Críticas Identificadas

### Matriz de Análise

| # | Área Crítica | Entendimento Confirmado | Impacto no Design/Dev |
|---|--------------|------------------------|----------------------|
| 1 | Confusão Verba vs. Orçamento | Principal dor é a mistura dos conceitos | Criar dois fluxos totalmente distintos |
| 2 | Hierarquia de Usuários | 8 tipos de usuários identificados | Atualizar PRD com nova hierarquia |
| 3 | Fluxo de Pagamento | Exige dois níveis de aprovação | Interface com fluxo de tarefas hierárquico |
| 4 | Fluxo de Contratação | Faltante no protótipo | Criar Módulo de Contratação |
| 5 | Execução Externa | Termo não reconhecido pelo cliente | Remover ou renomear |
| 6 | Visualização de Docs | Deve ser in-app (pop-up/lateral) | Priorizar visualização sem troca de aba |

---

### 19.2.1 Confusão Conceitual: Verba vs. Orçamento

#### Definições Clarificadas

```
┌─────────────────────────────────────────────────────────────────────┐
│            SEPARAÇÃO CONCEITUAL: ORÇAMENTO vs. VERBA               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │         ORÇAMENTO           │  │           VERBA             │  │
│  ├─────────────────────────────┤  ├─────────────────────────────┤  │
│  │                             │  │                             │  │
│  │  • Previsão de gasto total  │  │  • Dinheiro físico em       │  │
│  │    do projeto               │  │    cartão                   │  │
│  │                             │  │                             │  │
│  │  • Controle de itens        │  │  • Compras miúdas no campo  │  │
│  │    orçamentários            │  │                             │  │
│  │                             │  │  • Requer prestação de      │  │
│  │  • Quem mexe nos itens      │  │    contas separada          │  │
│  │                             │  │                             │  │
│  │  • Gestão por rubrica       │  │  • Adiantamento da Movioca  │  │
│  │                             │  │    para equipes             │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  │
│                                                                     │
│              ⚠️ FLUXOS TOTALMENTE DISTINTOS NO SISTEMA ⚠️          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Fluxo de Verba (4 Etapas)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MÓDULO DE VERBA - 4 ETAPAS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ETAPA 1           ETAPA 2           ETAPA 3           ETAPA 4     │
│  ────────          ────────          ────────          ────────     │
│                                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────┐ │
│  │SOLICITAÇÃO│──▶│  CARGA   │──▶│  PRESTAÇÃO   │──▶│ REEMBOLSO │ │
│  │          │    │NO CARTÃO │    │  DE CONTAS   │    │ À EMPRESA │ │
│  └──────────┘    └──────────┘    └──────────────┘    └──────────┘ │
│                                                                     │
│  Equipe        Financeiro       Equipe envia      Projeto         │
│  Dedicada      executa          comprovantes      reembolsa       │
│  solicita      a carga          de gastos         a Movioca       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Impacto no Dashboard

| Elemento | Recomendação |
|----------|--------------|
| Dashboard | **NÃO misturar** Orçamento e Verba |
| Soma de Orçamentos | Não relevante (múltiplos projetos) |
| Soma de Verbas | **RELEVANTE** para o caixa da empresa |

---

### 19.2.2 Hierarquia de Usuários (8 Perfis)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    8 PERFIS DE USUÁRIOS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      INTERNOS (Fixos)                       │   │
│  │          Visão Multi-projeto - Equipe Movioca               │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  1. Admin              2. PE Interna                        │   │
│  │     (Superusuário)        (Produção Executiva Fixa)         │   │
│  │                                                             │   │
│  │  3. Controladoria      4. Financeiro                        │   │
│  │     Interna               (Tesouraria)                      │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    DEDICADOS (Projeto)                      │   │
│  │          Visão Mono-projeto - Contratados                   │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  5. PE Dedicada        6. Controladoria                     │   │
│  │     (Produção Exec.       Dedicada                          │   │
│  │      do Projeto)          (Projeto)                         │   │
│  │                                                             │   │
│  │  7. Equipe Dedicada                                         │   │
│  │     (Departamentos)                                         │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                       EXTERNOS                              │   │
│  │              Portal de Autoatendimento                      │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  8. Fornecedor                                              │   │
│  │     (PJ/PF - Parceiros)                                     │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Desmembramento Crítico

| Papel | Interna (Fixa) | Dedicada (Projeto) |
|-------|----------------|-------------------|
| **Produção Executiva** | PE Interna - Olha todos os projetos | PE Dedicada - Contratada por projeto |
| **Controladoria** | Controladoria Interna - Aprovação final | Controladoria Dedicada - Validação inicial |

---

### 19.2.3 Fluxo de Pagamento (Múltiplos Níveis)

#### Workflow de 4 Níveis

```
┌─────────────────────────────────────────────────────────────────────┐
│              FLUXO DE PAGAMENTO - 4 NÍVEIS DE APROVAÇÃO            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  NÍVEL 1              NÍVEL 2              NÍVEL 3       NÍVEL 4   │
│  ───────              ───────              ───────       ───────   │
│                                                                     │
│  ┌──────────┐      ┌──────────────┐     ┌──────────┐   ┌────────┐ │
│  │DEPARTAMENTO│────▶│CONTROLADORIA│────▶│CONTROLAD.│──▶│FINANC. │ │
│  │           │     │  DEDICADA   │     │ INTERNA  │   │        │ │
│  │ SOLICITA  │     │  (Projeto)  │     │ (Movioca)│   │EXECUTA │ │
│  └──────────┘      │             │     │          │   └────────┘ │
│       │            │ APROVA/     │     │ APROVA/  │        │      │
│       │            │ REPROVA     │     │ REPROVA  │        │      │
│       │            └──────────────┘     └──────────┘        │      │
│       │                  │                   │              │      │
│       ▼                  ▼                   ▼              ▼      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    FILA DE TAREFAS                         │   │
│  │         (Workflow acionável - não listagem genérica)       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Interface da Controladoria - Requisitos

| Requisito | Descrição |
|-----------|-----------|
| ❌ NÃO | Interface genérica de listagem |
| ✅ SIM | Fila de pagamentos pendentes |
| ✅ SIM | Botão "Validar Descritivo" |
| ✅ SIM | Acesso in-app ao link da NF |
| ✅ SIM | Hierarquia de aprovação em cascata |

---

### 19.2.4 Fluxo de Contratação (Faltante)

#### Problema Identificado

> O fluxo de **Contratação** (que gera o **Comprometido**) foi reconhecido como **faltante** nas telas apresentadas.

#### Módulo de Contratação Necessário

```
┌─────────────────────────────────────────────────────────────────────┐
│              MÓDULO DE CONTRATAÇÃO - WORKFLOW                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  RESPONSÁVEL: PE (Produção Executiva) Interna                      │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    FLUXO DE STATUS                          │    │
│  ├────────────────────────────────────────────────────────────┤    │
│  │                                                            │    │
│  │  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   │    │
│  │  │ E-MAIL  │──▶│   OK    │──▶│APROVADO │──▶│CONTRATO │   │    │
│  │  │ ENVIADO │   │         │   │JURÍDICO │   │ ASSINADO│   │    │
│  │  └─────────┘   └─────────┘   └─────────┘   └─────────┘   │    │
│  │       │             │             │             │         │    │
│  │       ▼             ▼             ▼             ▼         │    │
│  │  ┌────────────────────────────────────────────────────┐  │    │
│  │  │              ATUALIZA AUTOMATICAMENTE              │  │    │
│  │  │         CAMPO "COMPROMETIDO" NO ORÇAMENTO         │  │    │
│  │  └────────────────────────────────────────────────────┘  │    │
│  │                                                            │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 19.2.5 Termo "Execução Externa"

| Aspecto | Detalhe |
|---------|---------|
| **Localização** | Módulo Financeiro |
| **Problema** | Termo **NÃO reconhecido** pelo cliente |
| **Ação** | Remover ou renomear após consulta técnica |

---

### 19.2.6 Visualização de Documentos

#### Requisito Crítico

```
╔═════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║   Documentos anexados do Drive devem ser visualizados              ║
║   DENTRO DA PRÓPRIA TELA (pop-up ou barra lateral)                 ║
║                                                                     ║
║   ❌ ELIMINAR a mudança de aba                                     ║
║   ✅ AGILIZAR processo de aprovação (~100 pagamentos/dia)          ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 19.3 Ações Imediatas para o Projeto

### Prioridade 1: Ajuste de Nomenclatura

| De | Para |
|----|------|
| "Verba" (genérico) | **Verba** = Dinheiro em cartão + Prestação de contas |
| "Orçamento" (genérico) | **Orçamento** = Previsão de gasto por rubrica |

> ⚠️ Atualizar **TODOS** os PRDs e o código imediatamente

### Prioridade 2: Modelagem de Usuários

Adicionar ao sistema os **8 perfis**, especialmente:
- Controladoria Interna ↔ Controladoria Dedicada
- PE Interna ↔ PE Dedicada

### Prioridade 3: Workflows Kanban

| Workflow | Passos |
|----------|--------|
| **Processo de Contratação** | 6 passos |
| **Processo de Pagamento** | 8 passos |

> 🔴 **URGENTE**: Time de Design/Frontend deve focar no desenvolvimento destes Kanbans

---

## 19.4 Comparação com o Protótipo

### Gaps Identificados

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GAPS DO PROTÓTIPO ATUAL                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. WORKFLOWS FALTANTES                                            │
│  ─────────────────────                                             │
│  ❌ Kanban "Processo de Contratação" (6 passos)                    │
│  ❌ Kanban "Processo de Pagamento" (8 passos)                      │
│  ⚠️ Cliente precisa ver FILA DE TAREFAS acionável                  │
│                                                                     │
│  2. CONFUSÃO CONCEITUAL VISUAL                                     │
│  ─────────────────────────────                                     │
│  ❌ Protótipo não diferencia claramente:                           │
│     • Orçamento (previsão)                                         │
│     • Verba (dinheiro em cartão)                                   │
│                                                                     │
│  3. VISUALIZAÇÃO DA CONTROLADORIA                                  │
│  ────────────────────────────────                                  │
│  Protótipo PRECISA ter:                                            │
│  ✅ Fila de pagamentos pendentes                                   │
│  ✅ Botão "Validar Descritivo"                                     │
│  ✅ Acesso in-app ao link da NF                                    │
│  ❌ Não apenas listagem de fornecedores                            │
│                                                                     │
│  4. AUTOMAÇÃO DE DOCUMENTOS                                        │
│  ──────────────────────────                                        │
│  ❌ Protótipo pode não transmitir visualmente a automação de:      │
│     • Geração de e-mails                                           │
│     • Geração de contratos                                         │
│  ⚠️ Requisito central de eliminação de retrabalho para PE          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 20. Registro de Inconsistências e Correções

> **Fonte:** Análise de Inconsistências Identificadas

## 20.1 Inconsistências Conceituais e de Fluxo

### 20.1.1 Mistura de Orçamento e Verba

| Aspecto | Detalhe |
|---------|---------|
| **Criticidade** | 🔴 MAIS CRÍTICA |
| **Requisito** | Orçamento e Verba são processos distintos e assíncronos |
| **Inconsistência** | Designer misturou termos e processos inicialmente |
| **Status** | ⚠️ Protótipos recentes corrigidos, mas dashboard do Gerente ainda tinha elementos misturados |

#### Regra de Relevância

| Cálculo | Relevância |
|---------|------------|
| Soma total dos orçamentos (múltiplos projetos) | ❌ NÃO relevante |
| Soma total das verbas (dentro de um projeto) | ✅ RELEVANTE para caixa |

---

### 20.1.2 Ausência/Ambiguidade no Fluxo de Contratação

| Aspecto | Detalhe |
|---------|---------|
| **Requisito** | Comprometimento deve ocorrer após formalização do acordo, ANTES do pagamento |
| **Processo** | Marcação de status (Minuta Enviada → Assinado) + Registro do valor |
| **Status Protótipo** | ✅ Perfis PE incluem "Central de Contratação e Comprometimento" |

---

### 20.1.3 Controle de Prestação de Contas Parciais

#### Requisito: Múltiplos Ciclos

```
┌─────────────────────────────────────────────────────────────────────┐
│           PRESTAÇÃO DE CONTAS PARCIAIS - EXEMPLO                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  VERBA LIBERADA: R$ 15.000,00                                      │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  LOTE 1                           R$ 5.000,00               │   │
│  │  Status: ✅ Aprovado                                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  LOTE 2                           R$ 9.000,00               │   │
│  │  Status: ⏳ Em Análise                                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  LOTE 3 (Pendente)                R$ 1.000,00               │   │
│  │  Status: ⬜ Não Enviado                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ─────────────────────────────────────────────────────────────     │
│                                                                     │
│  RESUMO:                                                           │
│  • Valor Liberado:                    R$ 15.000,00                 │
│  • Valor Prestado Conta:              R$ 14.000,00                 │
│  • Valor com Prestação Aprovada:      R$  5.000,00                 │
│  • Saldo Pendente:                    R$  1.000,00                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Regra dos 50%

```
╔═════════════════════════════════════════════════════════════════════╗
║                        REGRA DOS 50%                               ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  A Controladoria Dedicada usa a "Regra dos 50%" para BLOQUEAR      ║
║  novas solicitações de verba se o solicitante não tiver            ║
║  prestado conta de pelo menos METADE da verba anterior.            ║
║                                                                     ║
║  EXEMPLO:                                                          ║
║  • Verba anterior: R$ 10.000                                       ║
║  • Mínimo prestado para nova solicitação: R$ 5.000 (50%)           ║
║  • Se prestou menos: ❌ BLOQUEADO                                  ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

| Status | Implementação |
|--------|---------------|
| Regra dos 50% | ✅ Incorporada no protótipo |
| Soma dos valores (Liberado/Prestado/Aprovado) | ⚠️ Correção posterior solicitada por Márcio |

---

## 20.2 Inconsistências de Nomenclatura

### 20.2.1 Terminologia de Rubricas

| Termo | Uso Correto | Status |
|-------|-------------|--------|
| **Item Orçamentário** | ✅ Código de despesa | Padronizado |
| **Rubrica** | ❌ Evitar (entre parênteses se necessário) | Alguns locais ainda usam |
| **Pequeno Item** | ❌ Não usar | - |
| **Plano de Contas** | ✅ Template/Estrutura do orçamento (Ancine, Netflix) | Padronizado |

---

### 20.2.2 Campos de Documentação e Cadastro

| Aspecto | Detalhe |
|---------|---------|
| **Requisito** | Incluir dados de segurança e emergência |
| **Campos** | Alergias, Contato de emergência |
| **Status** | ✅ Protótipo "PARCEIRO" resolve com formulário adaptativo |

#### Formulário Inteligente

```
┌─────────────────────────────────────────────────────────────────────┐
│              FORMULÁRIO ADAPTATIVO POR PERFIL                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERFIL SELECIONADO      CAMPOS EXIBIDOS                           │
│  ─────────────────       ────────────────                          │
│                                                                     │
│  ┌──────────────┐        ┌─────────────────────────────────────┐   │
│  │   ELENCO     │   ──▶  │ • Dados Pessoais                   │   │
│  └──────────────┘        │ • Nome Artístico, DRT              │   │
│                          │ • Dados de Agente                   │   │
│                          │ • Segurança e Emergência           │   │
│                          └─────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────┐        ┌─────────────────────────────────────┐   │
│  │ FORNECEDOR   │   ──▶  │ • Dados Jurídicos (CNPJ)           │   │
│  └──────────────┘        │ • Dados Bancários                   │   │
│                          │ • Documentação Fiscal               │   │
│                          └─────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────┐        ┌─────────────────────────────────────┐   │
│  │EQUIPE TÉCNICA│   ──▶  │ • Dados Pessoais                   │   │
│  └──────────────┘        │ • Departamento e Função             │   │
│                          │ • Segurança e Emergência ✅         │   │
│                          └─────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 20.2.3 Visualização de Documentos

| Requisito | Status |
|-----------|--------|
| Visualizar docs diretamente na mesma tela | ⚠️ Potencial inconsistência |
| Pop-up ou barra lateral | Ideal para o cliente |
| Nova aba do navegador | ❌ Designer indicou inicialmente |
| "Acesso Rápido a Documentos" | ✅ Presente nas telas |

---

### 20.2.4 "Registrar Execução Externa"

| Aspecto | Detalhe |
|---------|---------|
| **Localização** | Telas do usuário Financeiro |
| **Função** | Confirmar pagamento fora do fluxo OMIE |
| **Problema** | Márcio **NÃO reconheceu** o termo |
| **Ação** | Exigiu esclarecimento da equipe de desenvolvimento |

---

### 20.2.5 Item Orçamentário na Solicitação de Verba

| Aspecto | Detalhe |
|---------|---------|
| **Inconsistência** | Tela incluía campo "Item Orçamentário" |
| **Correção** | Márcio e Mari afirmaram que solicitação de verba NÃO deve incluir Item Orçamentário |
| **Motivo** | Equipe Dedicada nem sempre sabe destinação exata |
| **Momento correto** | Amarração feita na **Prestação de Contas** (quando NFs são submetidas) |
| **Ação** | ✅ Campo removido da solicitação |

```
┌─────────────────────────────────────────────────────────────────────┐
│           FLUXO CORRETO: ITEM ORÇAMENTÁRIO                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SOLICITAÇÃO DE VERBA              PRESTAÇÃO DE CONTAS             │
│  ────────────────────              ────────────────────             │
│                                                                     │
│  ┌─────────────────────┐          ┌─────────────────────┐          │
│  │ • Valor             │          │ • Valor             │          │
│  │ • Justificativa     │          │ • Notas Fiscais     │          │
│  │ • Departamento      │          │ • Item Orçamentário │ ✅       │
│  │ ❌ Item Orçamentário │──────▶   │   (Obrigatório)     │          │
│  │    (REMOVIDO)       │          │ • Comprovantes      │          │
│  └─────────────────────┘          └─────────────────────┘          │
│                                                                     │
│  Equipe não sabe               Amarração correta                   │
│  destinação exata              no momento certo                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 20.3 Resumo de Status das Correções

### Matriz de Inconsistências

| # | Inconsistência | Criticidade | Status |
|---|----------------|-------------|--------|
| 1 | Mistura Orçamento/Verba | 🔴 Crítica | ⚠️ Parcialmente corrigido |
| 2 | Fluxo de Contratação | 🔴 Alta | ✅ Incluído no protótipo |
| 3 | Prestação de Contas Parciais | 🟡 Média | ✅ Regra 50% implementada |
| 4 | Terminologia Rubricas | 🟢 Baixa | ⚠️ Alguns locais pendentes |
| 5 | Campos Cadastro | 🟡 Média | ✅ Formulário adaptativo |
| 6 | Visualização de Docs | 🔴 Alta | ⚠️ Implementação pendente |
| 7 | "Execução Externa" | 🟡 Média | ⚠️ Aguardando definição |
| 8 | Item Orç. em Verba | 🟡 Média | ✅ Campo removido |

---

# 21. Modelo de Dados: Cadastro de Projeto

> **Fonte:** Especificação de Campos - Cadastro de Projeto

## 21.1 Estrutura do Cadastro de Projeto

### Campos Principais

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CADASTRO DE PROJETO                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   IDENTIFICAÇÃO                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Código:      [AUTO-GERADO]                                 │   │
│  │  Nome:        [_________________________________]           │   │
│  │  Descrição:   [_________________________________]           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   CLASSIFICAÇÃO                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Gênero:      [Selecionar ▼]                                │   │
│  │  Formato:     [Selecionar ▼]                                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   DURAÇÃO / EPISÓDIOS                       │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Nº Episódios:        [___] (se série)                      │   │
│  │  Duração/Episódio:    [___] min (se série)                  │   │
│  │  Duração Total:       [___] min                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   CONFIGURAÇÕES                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Execução de Múltiplas Temporadas Conjunta?  ○ Sim  ○ Não   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 21.2 Tabela de Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| **Código** | String (Auto) | ✅ | Identificador único do projeto |
| **Nome** | String | ✅ | Nome do projeto |
| **Descrição** | Text | ❌ | Descrição detalhada do projeto |
| **Gênero** | Enum | ✅ | Classificação por gênero |
| **Formato** | Enum | ✅ | Classificação por formato |
| **Parceiros** | Relacionamento | ❌ | Vínculo com outras empresas |
| **Número de Episódios** | Integer | ⚠️ Condicional | Obrigatório se Formato = Série |
| **Duração por Episódio** | Integer (min) | ⚠️ Condicional | Obrigatório se Formato = Série |
| **Duração Total** | Integer (min) | ✅ | Duração total do projeto |
| **Fontes de Financiamento** | Relacionamento | ✅ | Lista de fontes (multi-valor) |
| **Múltiplas Temporadas Conjuntas** | Boolean | ✅ | S/N - Impacta controle orçamentário |

---

## 21.3 Enumerações (Enum)

### Gênero

| Código | Valor |
|--------|-------|
| FIC | Ficção |
| DOC | Documentário |
| REA | Reality Show |
| VAR | Variedades |
| ANI | Animação |

### Formato

| Código | Valor |
|--------|-------|
| SER | Série |
| LNG | Longa Metragem |
| MED | Média Metragem |
| CUR | Curta Metragem |

---

## 21.4 Campos Condicionais (Série)

```
┌─────────────────────────────────────────────────────────────────────┐
│              LÓGICA CONDICIONAL - FORMATO SÉRIE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SE Formato = "Série" ENTÃO:                                       │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ✅ EXIBIR campos:                                          │   │
│  │     • Número de Episódios (obrigatório)                     │   │
│  │     • Duração por Episódio (obrigatório)                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔄 CALCULAR automaticamente:                               │   │
│  │     Duração Total = Nº Episódios × Duração por Episódio     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  SENÃO:                                                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ❌ OCULTAR campos de episódios                             │   │
│  │  ✅ EXIBIR apenas Duração Total (input manual)              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 21.5 Parceiros (Relacionamento)

### Descrição

Os **Parceiros** são outras empresas vinculadas ao projeto, cadastradas em tabela separada.

### Tipos de Parceiros

| Tipo | Descrição |
|------|-----------|
| **Produtor** | Co-produtores do projeto |
| **Distribuidor** | Responsável pela distribuição |
| **Exibidor** | Canal/Plataforma de exibição |
| **Outros** | Demais parceiros |

### Estrutura do Relacionamento

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PROJETO ◄──► PARCEIROS                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PROJETO                          TABELA: PARCEIROS                │
│  ───────                          ─────────────────                │
│                                                                     │
│  ┌──────────────┐                ┌──────────────────┐              │
│  │ Projeto XYZ  │◄──────────────▶│ Parceiro A (Prod)│              │
│  │              │                └──────────────────┘              │
│  │              │                ┌──────────────────┐              │
│  │              │◄──────────────▶│ Parceiro B (Dist)│              │
│  │              │                └──────────────────┘              │
│  │              │                ┌──────────────────┐              │
│  │              │◄──────────────▶│ Parceiro C (Exib)│              │
│  └──────────────┘                └──────────────────┘              │
│                                                                     │
│  Relacionamento N:N (um projeto pode ter vários parceiros,         │
│  um parceiro pode estar em vários projetos)                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 21.6 Fontes de Financiamento (Estrutura Crítica)

### Descrição

Um projeto pode ter **múltiplas fontes de financiamento**, cada uma compondo uma parte do valor total.

### Campos por Fonte de Financiamento

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| **Fonte** | String | ✅ | Nome da fonte (FSA, PROAC, etc.) |
| **Valor** | Currency | ✅ | Valor aportado pela fonte |
| **Código do Projeto na Fonte** | String | ✅ | Identificador do projeto para aquela fonte |
| **Orçamento Controlado à Parte** | Boolean | ✅ | Se o orçamento deve ser controlado separadamente |
| **Banco** | String | ✅ | Banco da conta vinculada |
| **Agência** | String | ✅ | Agência da conta |
| **Conta Corrente** | String | ✅ | Número da conta corrente |

### Exemplo de Múltiplas Fontes

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    FONTES DE FINANCIAMENTO - PROJETO XYZ                               │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  VALOR TOTAL DO PROJETO: R$ 3.500.000,00                                               │
│                                                                                         │
├────────────────────┬────────────────┬─────────────┬───────────────┬────────────────────┤
│  FONTE             │  VALOR         │ CÓD. FONTE  │ ORÇ. SEPARADO │ CONTA BANCÁRIA     │
├────────────────────┼────────────────┼─────────────┼───────────────┼────────────────────┤
│  FSA (Ancine)      │ R$ 1.000.000   │ FSA-2026-01 │ ✅ Sim        │ Itaú 1234 / 56789  │
│  PROAC             │ R$   800.000   │ PROAC-456   │ ✅ Sim        │ BB 5678 / 12345    │
│  Investidor Privado│ R$ 1.200.000   │ INV-XYZ-001 │ ❌ Não        │ Itaú 1234 / 56789  │
│  Netflix           │ R$   500.000   │ NF-BR-2026  │ ✅ Sim        │ Santander 999/1111 │
├────────────────────┴────────────────┴─────────────┴───────────────┴────────────────────┤
│                                                                                         │
│  TOTAL FINANCIADO: R$ 3.500.000,00                                                     │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Regra de Negócio: Orçamento Controlado à Parte

```
╔═════════════════════════════════════════════════════════════════════╗
║            ORÇAMENTO CONTROLADO À PARTE (Fonte)                    ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  Quando "Orçamento Controlado à Parte" = SIM para uma fonte:       ║
║                                                                     ║
║  • O sistema deve permitir controle orçamentário SEPARADO          ║
║  • Relatórios devem poder ser filtrados/agrupados por fonte        ║
║  • Prestação de contas específica para aquela fonte                ║
║  • Regras de compliance da fonte devem ser respeitadas             ║
║                                                                     ║
║  EXEMPLO:                                                          ║
║  • FSA (Ancine) → Plano de contas Ancine, prestação Ancine         ║
║  • Netflix → Plano de contas Netflix, relatórios Netflix           ║
║                                                                     ║
║  💡 Conforme Mari explicou: cada fonte pode ter seus próprios      ║
║     requisitos de controle e prestação de contas                   ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 21.7 Múltiplas Temporadas Conjuntas

### Campo: Execução de Múltiplas Temporadas de Forma Conjunta (S/N)

| Valor | Descrição | Impacto no Orçamento |
|-------|-----------|---------------------|
| **Sim** | Temporadas executadas juntas | Orçamento unificado para todas as temporadas |
| **Não** | Temporadas executadas separadamente | Cada temporada tem seu próprio orçamento |

### Implicações (Detalhamento Futuro)

```
┌─────────────────────────────────────────────────────────────────────┐
│          MÚLTIPLAS TEMPORADAS - IMPLICAÇÕES NO ORÇAMENTO           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ⚠️ NOTA: Detalhamento completo será explicado em reunião          │
│                                                                     │
│  EXECUÇÃO CONJUNTA (Sim)                                           │
│  ───────────────────────                                           │
│  • Orçamento único para múltiplas temporadas                       │
│  • Rubricas compartilhadas entre temporadas                        │
│  • Prestação de contas consolidada                                 │
│  • Possível economia de escala                                     │
│                                                                     │
│  EXECUÇÃO SEPARADA (Não)                                           │
│  ────────────────────────                                          │
│  • Cada temporada = projeto independente                           │
│  • Orçamentos separados                                            │
│  • Controle individualizado                                        │
│  • Duplicação de estruturas orçamentárias                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 21.8 Diagrama de Entidade-Relacionamento (Simplificado)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    MODELO DE DADOS - PROJETO                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌────────────────────┐                                                                │
│  │      PARCEIRO      │                                                                │
│  ├────────────────────┤                                                                │
│  │ PK id              │                                                                │
│  │    nome            │                                                                │
│  │    tipo            │                                                                │
│  │    cnpj            │                                                                │
│  └─────────┬──────────┘                                                                │
│            │ N:N                                                                       │
│            │                                                                           │
│  ┌─────────▼──────────┐         ┌────────────────────────┐                            │
│  │      PROJETO       │         │  FONTE_FINANCIAMENTO   │                            │
│  ├────────────────────┤         ├────────────────────────┤                            │
│  │ PK codigo          │ 1:N     │ PK id                  │                            │
│  │    nome            │◄────────│ FK projeto_id          │                            │
│  │    descricao       │         │    fonte               │                            │
│  │    genero          │         │    valor               │                            │
│  │    formato         │         │    codigo_fonte        │                            │
│  │    num_episodios   │         │    orcamento_separado  │                            │
│  │    duracao_ep      │         │    banco               │                            │
│  │    duracao_total   │         │    agencia             │                            │
│  │    temp_conjuntas  │         │    conta_corrente      │                            │
│  └─────────┬──────────┘         └────────────────────────┘                            │
│            │                                                                           │
│            │ 1:N                                                                       │
│            ▼                                                                           │
│  ┌────────────────────┐                                                                │
│  │     ORÇAMENTO      │                                                                │
│  ├────────────────────┤                                                                │
│  │ PK id              │                                                                │
│  │ FK projeto_id      │                                                                │
│  │    versao          │                                                                │
│  │    status          │                                                                │
│  │    ...             │                                                                │
│  └────────────────────┘                                                                │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 21.9 Formulário Visual - Cadastro de Projeto

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  CADASTRO DE PROJETO                                                        [✖]        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  IDENTIFICAÇÃO                                                                         │
│  ──────────────                                                                        │
│  Código:            [PRJ-2026-001] (auto)                                              │
│  Nome:              [_________________________________________________]               │
│  Descrição:         [_________________________________________________]               │
│                     [_________________________________________________]               │
│                                                                                         │
│  CLASSIFICAÇÃO                                                                         │
│  ─────────────                                                                         │
│  Gênero:            [Ficção               ▼]                                           │
│  Formato:           [Série                ▼]                                           │
│                                                                                         │
│  DURAÇÃO (exibido quando Formato = Série)                                              │
│  ───────                                                                               │
│  Nº de Episódios:       [10 ]                                                          │
│  Duração por Episódio:  [45 ] min                                                      │
│  Duração Total:         [450] min (calculado automaticamente)                          │
│                                                                                         │
│  ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│  PARCEIROS                                                              [+ Adicionar]  │
│  ─────────                                                                             │
│  ┌─────────────────────────────┬──────────────────┬─────────┐                          │
│  │ Nome                        │ Tipo             │ Ações   │                          │
│  ├─────────────────────────────┼──────────────────┼─────────┤                          │
│  │ Globo Filmes                │ Co-produtor      │ [🗑️]   │                          │
│  │ Netflix                     │ Exibidor         │ [🗑️]   │                          │
│  └─────────────────────────────┴──────────────────┴─────────┘                          │
│                                                                                         │
│  ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│  FONTES DE FINANCIAMENTO                                                [+ Adicionar]  │
│  ────────────────────────                                                              │
│  ┌────────────┬────────────┬───────────┬───────────┬──────────────────┬───────┐       │
│  │ Fonte      │ Valor      │ Cód.Fonte │ Orç.Sep.  │ Conta Bancária   │ Ações │       │
│  ├────────────┼────────────┼───────────┼───────────┼──────────────────┼───────┤       │
│  │ FSA        │R$1.000.000 │FSA-2026-01│ ✅        │ Itaú 1234/56789  │ [✏️🗑️]│       │
│  │ PROAC      │R$ 800.000  │PROAC-456  │ ✅        │ BB 5678/12345    │ [✏️🗑️]│       │
│  │ Inv.Privado│R$1.200.000 │INV-XYZ-001│ ❌        │ Itaú 1234/56789  │ [✏️🗑️]│       │
│  └────────────┴────────────┴───────────┴───────────┴──────────────────┴───────┘       │
│                                                                                         │
│  Total Financiado: R$ 3.000.000,00                                                     │
│                                                                                         │
│  ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│  CONFIGURAÇÕES                                                                         │
│  ─────────────                                                                         │
│  Execução de Múltiplas Temporadas de Forma Conjunta?                                   │
│  ○ Sim    ● Não                                                                        │
│                                                                                         │
│  ⓘ Esta configuração impacta a forma de controlar o orçamento quando                  │
│    houver mais de uma temporada do projeto.                                            │
│                                                                                         │
│                                              [CANCELAR]  [SALVAR PROJETO]              │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# 22. Feedback do Cliente e Solicitações de Ajuste

> **Fonte:** Mensagens do Cliente (Mari - Movioca)

## 22.1 Nomenclatura e Identidade

### Alteração do Nome do Sistema

| De | Para |
|----|------|
| ❌ Sistema de Suprimentos | ✅ **Sistema de Gestão Integrado Movioca** |

> ⚠️ "Não é comum o uso do termo suprimentos no audiovisual"

### Terminologia de Fases

| De | Para | Motivo |
|----|------|--------|
| Grupo | **Fase** | Terminologia mais adequada ao audiovisual |
| Status (Desenvolvimento, Pré, etc.) | **Status Movioca** | Contexto diferente |

---

## 22.2 Dashboard e Visualizações

### Pagamentos na Dashboard

| Solicitação Original | Ajuste Solicitado |
|---------------------|-------------------|
| "Pagamentos por mês" | **Pagamentos por data** |

```
╔═════════════════════════════════════════════════════════════════════╗
║                    AJUSTE: PAGAMENTOS NA DASHBOARD                 ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  ❌ ANTES: Pagamentos do mês (não faz sentido)                     ║
║                                                                     ║
║  ✅ DEPOIS: Próxima data de pagamento                              ║
║             Mostrando volume de pagamentos programados             ║
║                                                                     ║
║  📅 "Hoje pagamos sempre nos dias 10, 20 e 30"                     ║
║                                                                     ║
║  Mais importante acompanhar VOLUME POR DATA do que por mês         ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

### Prestação de Contas na Dashboard

| Informação | Relevância |
|------------|------------|
| Quantidade de verbas pendentes | ❌ Menos útil |
| **Valor de PC em aberto** | ✅ Mais útil |

> 💡 "A lógica aqui é ao contrário dos pagamentos, que é melhor saber a quantidade do que o valor"

### Filtros na Dashboard

| Filtro | Na Dashboard | Em Outras Telas |
|--------|--------------|-----------------|
| Gestão | ❌ Não faz sentido | ✅ Sim |
| Fase | ❌ Não faz sentido | ✅ Sim |
| Status | ❌ Não faz sentido | ✅ Sim |

### Itens a Remover/Esclarecer

| Item | Questionamento |
|------|----------------|
| "Processos e prorrogações de contrato" | "São pra quê mesmo?" |
| "Alertas de prazo" | "Seria bom entender melhor sobre o que deve alertar" |

---

## 22.3 Listagem de Projetos

### Colunas da Lista de Projetos

| Manter | Coluna |
|--------|--------|
| ✅ | Código |
| ✅ | Nome |
| ✅ | Formato |
| ✅ | Gênero |

### Coluna Status - Ajuste

| ❌ NÃO usar | ✅ USAR (Status Movioca) |
|-------------|-------------------------|
| Desenvolvimento | **Prospecção** |
| Pré-produção | **Contratação** |
| Produção | **Produção** |
| Pós-produção | **Exploração** |

---

## 22.4 Cadastro de Projeto - Campos Faltantes

### Campos Obrigatórios para Séries

```
┌─────────────────────────────────────────────────────────────────────┐
│              CAMPOS FALTANTES - CADASTRO DE PROJETO                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ⚠️ RECLAMAÇÃO: "Está faltando a informação de Qt de Episódios    │
│     e duração dos episódios"                                       │
│                                                                     │
│  ⚠️ "Não incluiu quantidade de episódios nem duração dos          │
│     episódios no cadastro do projeto"                              │
│                                                                     │
│  REGRA: "Estes campos devem ser habilitados se o formato for série"│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  SE Formato = "Série" ENTÃO:                                │   │
│  │     ✅ Exibir: Quantidade de Episódios                      │   │
│  │     ✅ Exibir: Duração dos Episódios                        │   │
│  │  SENÃO:                                                     │   │
│  │     ❌ Ocultar esses campos                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 22.5 Plano de Contas - Ajustes

### Remoção de Grupo/Fase

```
╔═════════════════════════════════════════════════════════════════════╗
║            PLANO DE CONTAS: NÃO PRECISA DE FASE                    ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  ❌ "A fase no plano de contas não precisa"                        ║
║                                                                     ║
║  ❌ "Não precisa de grupo/fase também, isso é definido no          ║
║     ORÇAMENTO e não no plano de contas"                            ║
║                                                                     ║
║  💡 MOTIVO: "A mesma função pode estar presente em diversas fases" ║
║                                                                     ║
║  EXEMPLO:                                                          ║
║  "Diretor por exemplo atua do desenvolvimento até a pós"           ║
║                                                                     ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  PLANO DE CONTAS          ORÇAMENTO                         │   ║
║  │  ────────────────         ─────────                         │   ║
║  │  • Apenas ITENS           • Item + FASE                     │   ║
║  │  • Sem fase               • Desenvolvimento                 │   ║
║  │  • Ex: Chefe de Roteiro   • Pré-produção                   │   ║
║  │                           • Produção                        │   ║
║  │                           • Pós-produção                    │   ║
║  └─────────────────────────────────────────────────────────────┘   ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

### Versionamento do Plano de Contas

| Solicitação | Decisão |
|-------------|---------|
| Versão do Plano de Contas | ❌ **NÃO precisa** |

> "Qualquer edição no mesmo plano de contas não precisa contar como versão e se for um plano diferente também não"

---

## 22.6 Criação de Novo Orçamento - Duas Formas

### Opções de Criação

```
┌─────────────────────────────────────────────────────────────────────┐
│              CRIAR NOVO ORÇAMENTO - DUAS OPÇÕES                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  OPÇÃO A: ORÇAMENTO ZERADO                                         │
│  ─────────────────────────                                         │
│  • Usuário escolhe a partir de qual Plano de Contas criar          │
│  • Estrutura limpa, sem valores                                    │
│  • Apenas rubricas do template                                     │
│                                                                     │
│  OPÇÃO B: COPIAR DE ORÇAMENTO EXISTENTE                           │
│  ──────────────────────────────────────                            │
│  • Cópia completa de um orçamento já cadastrado                    │
│  • Inclui valores, estrutura e alocações                           │
│  • Útil para projetos similares                                    │
│                                                                     │
│  ⚠️ "Conforme falamos na reunião passada, ainda está faltando ver" │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 22.7 Orçamento - Campo Item

### Problema Recorrente

```
╔═════════════════════════════════════════════════════════════════════╗
║          ⚠️ PROBLEMA RECORRENTE: CAMPO "ITEM" NO ORÇAMENTO         ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  "Bom dia. Na reunião passada eu já havia falado sobre essa        ║
║   questão: na coluna 'Item', não faz sentido ter informação        ║
║   textual ('Supervisor' no print acima)."                          ║
║                                                                     ║
║  ❌ ERRADO: Campo de texto (ex: "Supervisor")                      ║
║  ✅ CORRETO: Campo NUMÉRICO (quantidade do item)                   ║
║                                                                     ║
║  EXPLICAÇÃO:                                                       ║
║  "Trata-se da QUANTIDADE do item orçamentário.                     ║
║   No exemplo acima, seria a quantidade de Chefe de Roteiro,        ║
║   que seriam alocados na Fase de Desenvolvimento, por 2 Semanas."  ║
║                                                                     ║
║  ⚠️ "Peço por favor que confirmem esse entendimento, porque        ║
║      já falamos disso ao menos 3 vezes."                           ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

### Campo de Observação

| Solicitação | Status |
|-------------|--------|
| Campo de observação para cada linha | ⚠️ Faltando - Solicitado na última reunião |

---

## 22.8 Funcionalidades do Orçamento - Colapsar e Filtros

### Colapsar Tudo - Dúvidas

```
┌─────────────────────────────────────────────────────────────────────┐
│              DÚVIDAS: FUNCIONALIDADE "COLAPSAR TUDO"               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERGUNTA DO CLIENTE:                                              │
│                                                                     │
│  "Queria entender melhor o colapsar tudo e como funcionam os       │
│   filtros também."                                                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ? "Quando colapsa tudo ele oculta todas as fases?"         │   │
│  │  ? "Só as colunas de item, unidade e quantidade?"           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Filtros - Dúvidas e Requisitos

```
┌─────────────────────────────────────────────────────────────────────┐
│              DÚVIDAS: FUNCIONAMENTO DOS FILTROS                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERGUNTAS DO CLIENTE:                                             │
│                                                                     │
│  1. "Se escolho uma fase ele oculta a coluna das outras?"          │
│                                                                     │
│  2. "E nesses filtros tem como escolher mais de um?"               │
│                                                                     │
│  EXEMPLOS DESEJADOS:                                               │
│  • Ver Pré E Produção, mas NÃO ver Desenvolvimento                 │
│  • Ver alguns Grandes Itens apenas                                 │
│                                                                     │
│  ⚠️ "Os filtros vão poder filtrar mais de um item? Seria bom."     │
│  ⚠️ "Às vezes preciso ver mais de uma fase ou de um status"        │
│                                                                     │
│  ⚠️ "Ainda não ficou claro pra mim se quando filtro por fase       │
│      ele faz as colunas das demais fases ficarem ocultas"          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Requisito: Filtros Múltiplos

| Funcionalidade | Status Desejado |
|----------------|-----------------|
| Selecionar múltiplas fases | ✅ Necessário |
| Selecionar múltiplos status | ✅ Necessário |
| Selecionar múltiplos Grandes Itens | ✅ Necessário |

---

## 22.9 Duplicação e Edição de Linhas

### Duplicar Linha

```
┌─────────────────────────────────────────────────────────────────────┐
│              SOLICITAÇÃO: DUPLICAR LINHA                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PERGUNTA:                                                         │
│  "Tem também como duplicar uma linha sem ter que abrir a pop up    │
│   e preencher tudo igual novamente?"                               │
│                                                                     │
│  FUNCIONALIDADE DESEJADA:                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  [📋 Duplicar] ──▶ Copia todos os dados da linha            │   │
│  │                    Cria nova linha com mesmos valores        │   │
│  │                    Sem abrir pop-up                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Edição Inline (Sem Pop-up)

```
╔═════════════════════════════════════════════════════════════════════╗
║          SOLICITAÇÃO AVANÇADA: EDIÇÃO DIRETA NA LINHA              ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  "E indo um pouco além, alguma chance de ser preenchido direto     ║
║   nas linhas mesmo, sem pop up? 😬"                                 ║
║                                                                     ║
║  JUSTIFICATIVA:                                                    ║
║  "Pensando em orçamentos enormes que fazemos às vezes, seria       ║
║   bem mais rápido e prático que abrir 400 pop ups ao longo da      ║
║   elaboração do orçamento."                                        ║
║                                                                     ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  MODO ATUAL              MODO DESEJADO                      │   ║
║  │  ──────────              ─────────────                      │   ║
║  │                                                             │   ║
║  │  Clique ──▶ Pop-up       Clique ──▶ Edição inline          │   ║
║  │  Preencher               Digitar direto na célula          │   ║
║  │  Salvar                  Tab para próximo campo            │   ║
║  │  Fechar                  Auto-save                         │   ║
║  │                                                             │   ║
║  │  ⏱️ 400 pop-ups           ⏱️ Edição contínua                │   ║
║  └─────────────────────────────────────────────────────────────┘   ║
║                                                                     ║
║  💚 "Mas saibam que já tô bem mais feliz em ver um orçamento       ║
║      com cara de orçamento"                                        ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 22.10 Contingência e Congelamento (03/12/25)

### Cálculo de Contingência

| Aspecto | Definição |
|---------|-----------|
| **Abordagem** | Caminho mais simples |
| **Cálculo** | **Aprovado - Liberado** |

### Congelamento do Orçamento

```
┌─────────────────────────────────────────────────────────────────────┐
│              FUNCIONALIDADE: CONGELAR ORÇAMENTO                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "É realmente simples, seria incluir um botão de congelar          │
│   orçamento e a partir disso os valores inseridos até então        │
│   ficam congelados na coluna APROVADO enquanto o orçamento pode    │
│   ir sendo alterado ao longo do projeto."                          │
│                                                                     │
│  FLUXO:                                                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │  1. Orçamento em elaboração                                 │   │
│  │           │                                                 │   │
│  │           ▼                                                 │   │
│  │  2. [🔒 CONGELAR ORÇAMENTO]                                │   │
│  │           │                                                 │   │
│  │           ▼                                                 │   │
│  │  3. Valores atuais ──▶ Coluna "APROVADO" (fixo)            │   │
│  │           │                                                 │   │
│  │           ▼                                                 │   │
│  │  4. Orçamento continua editável (Orçamento de Trabalho)    │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Novas Colunas Solicitadas

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    INCLUSÃO DE COLUNAS - SOLICITAÇÃO                                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  COLUNA 1 (Rosa):    Comprometido + Realizado                                          │
│  COLUNA 2 (Laranja): Liberado - (Comprometido + Realizado)                             │
│  RESUMO (Azul):      Total da Contingência                                             │
│                                                                                         │
│  ┌─────────┬──────────┬─────────────┬───────────┬─────────────────┬────────────────┐   │
│  │ ITEM    │ APROVADO │ COMPROMETIDO│ REALIZADO │ COMPROM+REALIZ. │ LIBER-(C+R)    │   │
│  │         │          │             │           │     (Rosa)      │   (Laranja)    │   │
│  ├─────────┼──────────┼─────────────┼───────────┼─────────────────┼────────────────┤   │
│  │ 001.001 │ 100.000  │   50.000    │  10.000   │     60.000      │    40.000      │   │
│  │ 001.002 │  80.000  │   30.000    │  20.000   │     50.000      │    30.000      │   │
│  └─────────┴──────────┴─────────────┴───────────┴─────────────────┴────────────────┘   │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  RESUMO CONTINGÊNCIA (Azul): Total disponível após comprometimentos             │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Linkagem Comprometido/Realizado com Pagamentos

```
╔═════════════════════════════════════════════════════════════════════╗
║     ⚠️ IMPORTANTE: LINKAGEM COM INFORMAÇÕES DE PAGAMENTO           ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  "Uma coisa importante, que acredito que não tinha ficado clara    ║
║   antes, é que em comprometido e realizado esses números precisam  ║
║   estar LINKADOS com as informações de pagamento pra planilha ir   ║
║   atualizando e dando os valores reais pra gente."                 ║
║                                                                     ║
║  EXEMPLO PRÁTICO:                                                  ║
║  ┌─────────────────────────────────────────────────────────────┐   ║
║  │  Pessoa com 5 parcelas de R$ 10.000 cada                    │   ║
║  │  Total contratado: R$ 50.000                                │   ║
║  │                                                             │   ║
║  │  SITUAÇÃO 1: Nenhum pagamento feito                         │   ║
║  │  • Comprometido: R$ 50.000                                  │   ║
║  │  • Realizado: R$ 0                                          │   ║
║  │                                                             │   ║
║  │  SITUAÇÃO 2: Após pagar 1ª parcela                          │   ║
║  │  • Comprometido: R$ 40.000 (4 parcelas restantes)           │   ║
║  │  • Realizado: R$ 10.000 (1 parcela paga)                    │   ║
║  │                                                             │   ║
║  │  SITUAÇÃO 3: Após pagar todas                               │   ║
║  │  • Comprometido: R$ 0                                       │   ║
║  │  • Realizado: R$ 50.000                                     │   ║
║  └─────────────────────────────────────────────────────────────┘   ║
║                                                                     ║
║  🔄 ATUALIZAÇÃO AUTOMÁTICA conforme pagamentos são executados      ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 22.11 Coluna "Liberado" → "Contingência"

| Coluna Atual | Ajuste Solicitado |
|--------------|-------------------|
| "Liberado" | **"Contingência"** |

> ⚠️ "Liberado acho que também podemos substituir por contingência, mas posso explicar melhor amanhã"

---

## 22.12 Contratação e Pagamentos - Ajustes Pendentes

### Cadastro de Contrato

| Item | Status |
|------|--------|
| Cálculos de cachê | ⚠️ Precisa ajustar |
| Detalhamento da planilha | Pode ser resumido |

### Adição de Pagamento

| Item | Status |
|------|--------|
| Programação do pagamento | ⚠️ Precisa incluir |

---

## 22.13 Observações Gerais do Cliente (19/12/25)

### Feedback Consolidado

```
╔═════════════════════════════════════════════════════════════════════╗
║                    FEEDBACK GERAL - 19/12/25                       ║
╠═════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  "Queria só fazer uma observação que a gente continua indo e       ║
║   vindo com alguns avanços, teve uma tela de pagamento que eu      ║
║   até elogiei na reunião anterior a essa e agora a tela tá         ║
║   diferente e incompleta."                                         ║
║                                                                     ║
║  ⚠️ "Muita coisa relacionada ao perfil e função de cada usuário   ║
║      que mandamos em documentos bem lá no início e coisas que      ║
║      já falamos em reuniões anteriores não tão refletidos aqui..."  ║
║                                                                     ║
║  📅 Prazo de feedback: Terça de manhã (após reunião interna)       ║
║  🎯 Objetivo: "Tudo bem especificado pra evitar refação"           ║
║                                                                     ║
╚═════════════════════════════════════════════════════════════════════╝
```

---

## 22.14 Checklist de Ajustes Solicitados

### Prioridade Alta 🔴

| # | Ajuste | Status |
|---|--------|--------|
| 1 | Nome do sistema → "Sistema de Gestão Integrado Movioca" | ⬜ Pendente |
| 2 | Campo "Item" no orçamento → NUMÉRICO (não texto) | ⬜ Pendente |
| 3 | Incluir Qtd Episódios e Duração (condicional para Série) | ⬜ Pendente |
| 4 | Remover Fase/Grupo do Plano de Contas | ⬜ Pendente |
| 5 | Criar opção de novo orçamento: Zerado ou Copiar existente | ⬜ Pendente |
| 6 | Linkagem Comprometido/Realizado com Pagamentos | ⬜ Pendente |
| 7 | Botão "Congelar Orçamento" | ⬜ Pendente |

### Prioridade Média 🟡

| # | Ajuste | Status |
|---|--------|--------|
| 8 | Dashboard: Pagamentos por DATA (não por mês) | ⬜ Pendente |
| 9 | Dashboard: Valor de PC em aberto (não qtd verbas) | ⬜ Pendente |
| 10 | Status do projeto: Prospecção/Contratação/Produção/Exploração | ⬜ Pendente |
| 11 | Filtros múltiplos (selecionar mais de um item) | ⬜ Pendente |
| 12 | Campo de Observação por linha no orçamento | ⬜ Pendente |
| 13 | Novas colunas: Comprom+Realizado e Liber-(C+R) | ⬜ Pendente |
| 14 | Renomear "Liberado" para "Contingência" | ⬜ Pendente |

### Prioridade Baixa / Desejável 🟢

| # | Ajuste | Status |
|---|--------|--------|
| 15 | Duplicar linha sem pop-up | ⬜ Pendente |
| 16 | Edição inline (sem pop-up) - 400 linhas | ⬜ Avaliar viabilidade |
| 17 | Remover versão do Plano de Contas | ⬜ Pendente |
| 18 | Esclarecer "Processos e prorrogações de contrato" | ⬜ Pendente |
| 19 | Definir "Alertas de prazo" | ⬜ Pendente |

---

*Documento em construção - Aguardando documentos adicionais...*

---

# 23. Arquitetura Técnica e Stack Tecnológica

> **Fonte:** Definição da Equipe de Desenvolvimento

## 23.1 Visão Geral da Stack

A arquitetura do **Sistema de Gestão Integrado Movioca (SGIM)** foi definida utilizando tecnologias modernas e robustas para garantir escalabilidade, segurança e agilidade no desenvolvimento.

| Camada | Tecnologia | Detalhes |
|--------|------------|----------|
| **Frontend** | **React** | Biblioteca JavaScript para construção de interfaces de usuário interativas e responsivas. |
| **Backend** | **Laravel** | Framework PHP robusto para gestão de regras de negócio, APIs e integrações. |
| **Banco de Dados** | **Supabase** | Plataforma baseada em **PostgreSQL**, oferecendo banco relacional, autenticação e real-time. |

---

## 23.2 Diagrama de Arquitetura Simplificado

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DO SISTEMA (SGIM)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│      CLIENTE (Browser)                  SERVIDOR (API)              │
│  ┌──────────────────────┐           ┌──────────────────────┐        │
│  │                      │           │                      │        │
│  │    REACT (SPA)       │◄──JSON───►│    LARAVEL (API)     │        │
│  │   (Visualização)     │   HTTPS   │  (Regras de Negócio) │        │
│  │                      │           │                      │        │
│  └──────────┬───────────┘           └──────────┬───────────┘        │
│             │                                  │                    │
│             │ (Auth/Direct)                    │ (Query/ORM)        │
│             ▼                                  ▼                    │
│  ┌────────────────────────────────────────────────────────┐         │
│  │                                                        │         │
│  │                     SUPABASE                           │         │
│  │                   (PostgreSQL)                         │         │
│  │                                                        │         │
│  └────────────────────────────────────────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 23.3 Detalhamento dos Componentes

### Frontend: React
- **Componentização:** Reutilização de elementos de interface (tabelas de orçamento, modais de cadastro).
- **Gestão de Estado:** Controle eficiente dos dados complexos de orçamento e filtragem em tempo real.
- **SPA (Single Page Application):** Experiência fluida sem recarregamentos constantes de página.

### Backend: Laravel
- **API RESTful:** Endpoints padronizados para comunicação com o frontend.
- **Eloquent ORM:** Abstração e facilidade na manipulação dos dados relacionais complexos (Projetos <-> Rubricas <-> Pagamentos).
- **Filas e Jobs:** Processamento assíncrono para tarefas pesadas (ex: geração de relatórios consolidados, importação de planilhas).
- **Integrações:** Responsável pela comunicação segura com APIs externas (OMIE, Google Drive).

### Banco de Dados: Supabase
- **Base Relacional:** PostgreSQL garante integridade referencial forte, crucial para dados financeiros.
- **Autenticação:** Gestão segura de usuários e sessões.
- **Storage:** Armazenamento de arquivos (anexos, contratos) vinculado aos registros do banco.

---

## 23.4 Infraestrutura e Deploy (Preliminar)

- **Versionamento:** Git (GitHub/GitLab)
- **Ambientes:** Desenvolvimento, Homologação (Staging) e Produção.
- **CI/CD:** Pipelines automatizados para testes e deploy (a definir ferramenta).

---

*Documentação consolidada em 13/01/2026.*

## 23.5 Configuração do Ambiente (Supabase)

> **Fonte:** Link MCP fornecido pelo usuário

| Parâmetro | Valor |
|-----------|-------|
| **Project Ref** | `jirczxoaeltoyzqclrav` |
| **MCP URL** | `https://mcp.supabase.com/mcp?project_ref=jirczxoaeltoyzqclrav` |

---

# 24. Plano de Implementação

## 24.1 Estrutura do Projeto

O projeto será organizado em um monorrepo ou repositórios separados (a definir na configuração inicial), contendo:

- **/backend**: Aplicação Laravel (API)
- **/frontend**: Aplicação React (SPA)
- **/docs**: Documentação técnica

## 24.2 Próximos Passos Imediatos

1.  **Scaffolding do Backend (Laravel)**
    *   Instalação do Laravel
    *   Configuração do `.env` com Supabase (PostgreSQL)
    *   Criação das Migrations iniciais (Projetos, Orçamentos, Rubricas)

2.  **Scaffolding do Frontend (React)**
    *   Setup com Vite ou Next.js (a confirmar preferência, assumindo Vite para SPA pura)
    *   Configuração de rotas e layout base
    *   Integração com API Laravel

---

