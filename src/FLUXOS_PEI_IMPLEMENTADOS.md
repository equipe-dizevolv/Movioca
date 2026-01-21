# 📘 FLUXOS DE USO - PRODUÇÃO EXECUTIVA INTERNA (PEI)

**Data de Criação:** 05/12/2024  
**Versão:** 1.0  
**Status:** ✅ Implementado  

---

## 📋 ÍNDICE

1. [Fluxo 1: Dashboard Multi-Projeto - Visão Consolidada](#fluxo-1-dashboard-multi-projeto)
2. [Fluxo 2: Criação de Orçamento](#fluxo-2-criação-de-orçamento)
3. [Fluxo 3: Delegação de Gestão com Teto Financeiro](#fluxo-3-delegação-de-gestão)
4. [Fluxo 4: Criação de Sub-itens](#fluxo-4-criação-de-sub-itens)
5. [Fluxo 5: Congelamento de Orçamento](#fluxo-5-congelamento-de-orçamento)
6. [Fluxo 6: Exportação de Planilha](#fluxo-6-exportação-de-planilha)
7. [Fluxo 7: Monitoramento de Contingência](#fluxo-7-monitoramento-de-contingência)

---

## FLUXO 1: Dashboard Multi-Projeto - Visão Consolidada

### 🎯 Objetivo
Permitir que a PEI visualize em uma única tela o status financeiro de todos os projetos ativos, identificando rapidamente projetos que precisam de intervenção.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Após login, a PEI é automaticamente direcionada para o **Dashboard de Produção Executiva**.

### 🔄 Passos do Fluxo

#### 1. Visualizar Resumo Global
**Ação:** PEI acessa o dashboard  
**Sistema exibe:**
- **Card 1:** Projetos em Produção (quantidade de projetos em fase de filmagem)
- **Card 2:** Total Comprometido Global (soma de todos os contratos formalizados)
- **Card 3:** Saldo de Contingência Disponível (R$ e % do total aprovado)

**Exemplo:**
```
Projetos em Produção: 2 de 5 projetos ativos
Total Comprometido: R$ 4.400.000
Contingência Disponível: R$ 420.000 (7,8% do total)
```

#### 2. Analisar Tabela de Projetos Ativos
**Ação:** PEI visualiza a tabela com todos os projetos  
**Sistema exibe para cada projeto:**

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **Código** | Identificador do projeto | PROJ-001 |
| **Nome** | Nome completo do projeto | Série Documentário - História |
| **Status** | Fase atual (Badge colorido) | 🟢 Prod / 🔵 Pré / 🟣 Pós |
| **Aprovado** | Orçamento total aprovado (Ancine) | R$ 1.500.000 |
| **Liberado** | Meta interna de trabalho | R$ 1.400.000 |
| **Contingência** | Reserva financeira (roxo) | R$ 100.000 |
| **% Executado** | Barra de progresso visual | 68% |
| **Alerta** | Ícone vermelho se houver desvio | 🔴 Desvio |

#### 3. Identificar Projetos com Desvio
**Lógica do Alerta:**
```
SE (Realizado + Comprometido) > Liberado
ENTÃO exibir 🔴 Alerta de Desvio
```

**Interpretação:**
- ✅ **Sem alerta:** Projeto dentro do orçamento planejado
- 🔴 **Com alerta:** Projeto está consumindo a contingência ou precisa de remanejamento

#### 4. Navegar para Orçamento Específico
**Ação:** PEI clica em "Ir para Orçamento" na linha do projeto  
**Sistema:**
- Redireciona para a tela de Matriz de Orçamento
- Já filtra os dados do projeto selecionado
- Permite edição detalhada

#### 5. Buscar Projeto Específico
**Ação:** PEI digita no campo de busca  
**Sistema:**
- Filtra a tabela em tempo real
- Busca por: Nome do Projeto OU Código

**Exemplo:** Digitando "Drama" filtra apenas "Longa-metragem - Drama"

### ✅ Critérios de Sucesso
- [x] Dashboard carrega em menos de 2 segundos
- [x] Cálculos de totais globais estão corretos
- [x] Alertas de desvio aparecem apenas quando necessário
- [x] Navegação para orçamento funciona corretamente
- [x] Estado vazio exibe mensagem adequada

### 📊 Estado Vazio
**Mensagem exibida quando não há projetos:**
> "Nenhum projeto ativo atribuído a você."

---

## FLUXO 2: Criação de Orçamento

### 🎯 Objetivo
Criar um novo orçamento a partir de um Plano de Contas padrão ou copiando um orçamento existente.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Menu lateral → **Orçamento** → Botão **"+ Novo orçamento"**

### 🔄 Passos do Fluxo

#### OPÇÃO A: A partir do Plano de Contas

**1. Abrir Modal de Criação**
- PEI clica em **"+ Novo orçamento"**
- Sistema exibe modal com 2 modos: **PLANO** e **COPIA**
- Modo **PLANO** vem selecionado por padrão

**2. Preencher Dados do Orçamento**
```
Campo: Projeto (obrigatório)
  └─ Dropdown: Projeto Alpha | Projeto Beta | Projeto Gama

Campo: Nome do orçamento (obrigatório)
  └─ Input: "Orçamento v1 - Ancine"

Campo: Plano de contas (obrigatório)
  └─ Dropdown: Ancine | Netflix v1 | Netflix v2 | Amazon | Outro

Campo: Versão do plano (opcional)
  └─ Input: "v2.3 - 2024"

Campo: Observações (opcional)
  └─ Textarea: "Orçamento para primeira temporada"
```

**3. Confirmar Criação**
- PEI clica em **"Criar orçamento"**
- Sistema valida campos obrigatórios
- Se válido: cria estrutura zerada baseada no plano selecionado
- Toast de sucesso: "Orçamento criado a partir do plano de contas."

**4. Resultado**
- Nova aba/versão de orçamento criada
- Todas as rubricas do plano carregadas com valores zerados
- PEI pode começar a preencher valores nas fases

#### OPÇÃO B: Copiar Orçamento Existente

**1. Selecionar Modo COPIA**
- PEI marca a opção **"Copiar orçamento existente"**

**2. Preencher Dados da Cópia**
```
Campo: Projeto de origem (obrigatório)
  └─ Dropdown: Projeto Alpha | Projeto Beta

Campo: Orçamento de origem (obrigatório)
  └─ Dropdown (filtrado pelo projeto): Orçamento v1 | Orçamento v2

Campo: Projeto de destino (obrigatório)
  └─ Dropdown: Projeto Alpha | Projeto Beta | Projeto Gama

Campo: Nome do novo orçamento (obrigatório)
  └─ Input: "Orçamento v1 - Temporada 2"

Campo: O que copiar? (obrigatório)
  └─ Radio:
     ○ Apenas estrutura (códigos e descrições)
     ● Estrutura + Valores
```

**3. Confirmar Cópia**
- PEI clica em **"Criar orçamento"**
- Sistema valida campos obrigatórios
- Se válido: duplica estrutura e/ou valores
- Toast de sucesso: "Orçamento copiado."

**4. Resultado**
- Novo orçamento criado com base no modelo
- Se "Apenas estrutura": valores zerados
- Se "Estrutura + Valores": valores copiados integralmente

### ✅ Critérios de Sucesso
- [x] Modal abre corretamente
- [x] Validação impede criação sem campos obrigatórios
- [x] Modo PLANO cria estrutura zerada
- [x] Modo COPIA duplica corretamente
- [x] Toast de sucesso exibido

### ⚠️ Validações
| Campo | Regra | Mensagem de Erro |
|-------|-------|------------------|
| Projeto | Obrigatório | "Preencha os campos obrigatórios" |
| Nome | Obrigatório | "Preencha os campos obrigatórios" |
| Plano | Obrigatório (PLANO) | "Preencha os campos obrigatórios" |
| Origem | Obrigatório (COPIA) | "Preencha os campos obrigatórios" |

---

## FLUXO 3: Delegação de Gestão com Teto Financeiro

### 🎯 Objetivo
Atribuir a gestão de um conjunto de rubricas para um responsável específico, com ou sem limite de valor.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Tela de Orçamento → Selecionar rubricas → Botão **"Atribuir gestão"**

### 🔄 Passos do Fluxo

**1. Selecionar Rubricas**
- PEI marca as checkboxes das rubricas desejadas
- Contador no botão atualiza: "Atribuir gestão (5)"
- Botão fica habilitado apenas se houver seleção

**Exemplo:** Selecionar todas as linhas do grupo "004 - Arte"

**2. Abrir Modal de Delegação**
- PEI clica em **"Atribuir gestão (5)"**
- Sistema exibe modal com:
  - Dropdown de responsável
  - Campo de valor liberado (opcional)
  - Card informativo com quantidade selecionada

**3. Definir Responsável**
```
Campo: Nova gestão (obrigatório)
  └─ Dropdown: Movioca | Executiva | Produção | Pós | Arte
  
Seleção: Arte
```

**4. Definir Teto Financeiro (Opcional)**
```
Campo: Valor Liberado (opcional)
  └─ Input: "R$ 50.000,00"
  
Descrição abaixo do campo:
"Define um teto máximo que este responsável pode gerenciar. 
Se vazio, assume o valor orçado total das rubricas selecionadas."
```

**Cenários:**

| Valor Preenchido | Comportamento |
|------------------|---------------|
| **Vazio** | Sistema assume a soma dos valores Liberados das 5 rubricas |
| **R$ 50.000** | Responsável pode gerenciar até R$ 50k nessas rubricas |

**5. Card Informativo**
```
ℹ️ Delegação de Gestão: 5 linha(s) selecionada(s). 
O responsável selecionado terá permissão de leitura e escrita 
apenas para estas rubricas.
```

**6. Confirmar Delegação**
- PEI clica em **"Atribuir"**
- Sistema:
  - Atualiza coluna "Gestão" das 5 linhas para "Arte"
  - Registra o teto de R$ 50.000 (se preenchido)
  - Limpa seleção
  - Fecha modal
- Toast: "Gestão atualizada em 5 linha(s) selecionada(s). Valor liberado: R$ 50.000,00"

**7. Resultado Visível na Matriz**
```
Antes:                  Depois:
Gestão: Movioca        Gestão: Arte
Gestão: Movioca        Gestão: Arte
Gestão: Movioca        Gestão: Arte
Gestão: Movioca        Gestão: Arte
Gestão: Movioca        Gestão: Arte
```

### 🔐 Impacto em Permissões
Após a delegação, o usuário "Arte" passa a:
- ✅ **Ver** apenas as 5 rubricas atribuídas a ele
- ✅ **Editar** valores dessas rubricas (respeitando o teto)
- ❌ **Não ver** outras rubricas do projeto

A PEI mantém:
- ✅ **Visão total** de todas as rubricas
- ✅ **Poder de revogar** a delegação a qualquer momento

### ✅ Critérios de Sucesso
- [x] Seleção múltipla funciona corretamente
- [x] Modal abre apenas com itens selecionados
- [x] Campo de valor é opcional
- [x] Toast mostra se há teto definido
- [x] Coluna Gestão atualiza visualmente

---

## FLUXO 4: Criação de Sub-itens

### 🎯 Objetivo
Criar sub-divisões de uma rubrica para gerenciar múltiplos profissionais/valores na mesma categoria.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Matriz de Orçamento → Ações de uma linha → **"Adicionar Sub-item"**

### 🔄 Passos do Fluxo

**1. Cenário de Uso**
```
Situação: PEI precisa contratar 2 Chefes de Roteiro com salários diferentes

Rubrica atual:
001.001 - Chefe de Roteiro
  └─ Valor único: R$ 20.000

Necessidade:
001.001.01 - Chefe de Roteiro A (R$ 12.000)
001.001.02 - Chefe de Roteiro B (R$ 8.000)
```

**2. Selecionar Rubrica Pai**
- PEI localiza a linha: `001.001 - Chefe de Roteiro`
- Clica no menu de ações (︙) da linha

**3. Menu de Ações**
```
Dropdown exibe:
- Editar rúbrica
- Editar Desenvolvimento
- Editar Pré-produção
- Editar Produção
- Editar Pós-produção
- Duplicar linha
→ Adicionar Sub-item  ← NOVA OPÇÃO
- Excluir
```

**4. Criar Sub-item**
- PEI clica em **"Adicionar Sub-item"**
- Sistema:
  - Calcula próximo número disponível (.01, .02, .03...)
  - Cria nova linha abaixo da rubrica pai
  - Mantém o código base (001.001)
  - Adiciona sufixo sequencial

**5. Sistema Cria Automaticamente**
```
Estrutura antes:
001.001 - Chefe de Roteiro

Estrutura depois:
001.001 - Chefe de Roteiro (linha pai - valores somados)
  └─ 001.001.01 - Chefe de Roteiro - 1 (nova linha criada)
```

**6. Editar Sub-item Criado**
- PEI clica em "Editar rúbrica" do sub-item
- Altera descrição: "Chefe de Roteiro A"
- Define valores nas fases desejadas

**7. Criar Mais Sub-itens**
- PEI repete o processo na linha pai
- Sistema cria: `001.001.02 - Chefe de Roteiro - 2`
- PEI edita para: "Chefe de Roteiro B"

**8. Resultado Final**
```
001.001 - Chefe de Roteiro
  ├─ Liberado: R$ 20.000 (TOTAL somado dos sub-itens)
  ├─ 001.001.01 - Chefe de Roteiro A
  │    └─ Liberado: R$ 12.000
  └─ 001.001.02 - Chefe de Roteiro B
       └─ Liberado: R$ 8.000
```

### 🎨 Representação Visual
```
Linha Pai (fundo cinza claro):
  └─ Exibe total somado
  └─ Pode ser expandida/colapsada

Sub-itens (identados):
  └─ Editáveis individualmente
  └─ Padding-left maior (visualmente identados)
```

### ✅ Critérios de Sucesso
- [x] Opção "Adicionar Sub-item" aparece apenas em linhas normais (não em grupos)
- [x] Sistema calcula próximo número automaticamente
- [x] Sub-item criado fica visível abaixo da linha pai
- [x] Toast de sucesso exibido
- [x] Linha pai exibe soma dos sub-itens

### 📋 Toast de Sucesso
```
✓ Sub-item 001.001.01 criado com sucesso!
```

---

## FLUXO 5: Congelamento de Orçamento

### 🎯 Objetivo
Fixar os valores do orçamento de trabalho (Liberado) como baseline oficial (Aprovado) para prestação de contas.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Tela de Orçamento → Header → Botão **"Congelar Orçamento"**

### 🔄 Passos do Fluxo

**1. Momento do Congelamento**
```
Situação ideal:
- Orçamento foi negociado com Ancine/financiador
- PEI finalizou ajustes nos valores de trabalho
- Valores da coluna LIBERADO estão corretos
- É necessário um snapshot para prestação de contas
```

**2. Iniciar Congelamento**
- PEI clica em **"Congelar Orçamento"**
- Sistema exibe modal de confirmação

**3. Modal de Confirmação**
```
Título: Confirmar congelamento do orçamento

Descrição:
Esta ação irá fixar todos os valores da coluna LIBERADO 
na coluna APROVADO (Congelado) para fins de prestação de contas.

⚠️ Card Amarelo - Atenção:
Após o congelamento, você ainda poderá alterar os valores 
na coluna de trabalho (Liberado), mas os valores congelados 
permanecerão fixos para referência da Ancine/Prestação de Contas.

📊 Card Roxo - Cálculo da Contingência:
Após o congelamento, a Contingência será calculada como:
Contingência = Aprovado (Congelado) - Liberado (Trabalho)

Botões:
[Cancelar]  [Confirmar Congelamento 🔒]
```

**4. Confirmar**
- PEI clica em **"Confirmar Congelamento"**
- Sistema executa:

```javascript
Para cada linha do orçamento:
  APROVADO (Congelado) ← LIBERADO (valor atual)
```

**5. Estado Pós-Congelamento**

**Botão no header muda:**
```
Antes: [Congelar Orçamento]
Depois: [Orçamento Congelado] (desabilitado, opaco)
```

**Cálculos ativos:**
```
Contingência = Aprovado - Liberado

Exemplo:
Linha 001.001:
  Aprovado: R$ 20.000 (FIXO - congelado)
  Liberado: R$ 20.000 (editável)
  Contingência: R$ 0

Se PEI alterar Liberado para R$ 18.000:
  Aprovado: R$ 20.000 (FIXO - não muda)
  Liberado: R$ 18.000 (novo valor)
  Contingência: R$ 2.000 (economizou R$ 2k)

Se PEI alterar Liberado para R$ 22.000:
  Aprovado: R$ 20.000 (FIXO - não muda)
  Liberado: R$ 22.000 (novo valor)
  Contingência: R$ -2.000 (queimou R$ 2k da contingência)
```

**6. Toast de Sucesso**
```
✓ Orçamento congelado com sucesso! 
Os valores da coluna Liberado foram fixados 
na coluna Aprovado (Congelado).
```

### 📊 Visualização na Matriz

**Cards de Totais (antes do congelamento):**
```
Aprovado:      R$ 40.000
Liberado:      R$ 40.000
Contingência:  R$ 0
```

**Cards de Totais (depois do congelamento e ajustes):**
```
Aprovado:      R$ 40.000 (FIXO)
Liberado:      R$ 38.000 (ajustado)
Contingência:  R$ 2.000 (economizado)
```

### ⚠️ Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| **RN-001** | Congelamento é ação única (não pode descongelar) |
| **RN-002** | Valores APROVADO não mudam após congelamento |
| **RN-003** | Valores LIBERADO continuam editáveis |
| **RN-004** | Contingência é calculada automaticamente |
| **RN-005** | Contingência negativa indica uso de reserva |

### ✅ Critérios de Sucesso
- [x] Modal de confirmação exibe avisos claros
- [x] Congelamento copia LIBERADO para APROVADO
- [x] Botão fica desabilitado após congelar
- [x] Contingência calcula corretamente
- [x] LIBERADO continua editável

---

## FLUXO 6: Exportação de Planilha

### 🎯 Objetivo
Exportar os dados da matriz de orçamento para um arquivo CSV para compartilhamento ou análise externa.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Tela de Orçamento → Toolbar → Botão **"Exportar planilha"**

### 🔄 Passos do Fluxo

**1. Preparar Dados para Exportação**
- PEI aplica filtros desejados (opcional):
  - Busca por texto
  - Filtro de Gestão
  - Filtro de Fase

**2. Clicar em Exportar**
- PEI clica em **"Exportar planilha"**
- Sistema:
  - Coleta todas as linhas visíveis (respeitando filtros)
  - Prepara dados no formato CSV
  - Inclui TODAS as colunas da matriz

**3. Estrutura do CSV Exportado**

```csv
Código,Subcódigo,Descrição,Gestão,Fornecedor,DES - Item,DES - Unidade,DES - Quantidade,DES - Valor,DES - Total,PRE - Item,PRE - Unidade,PRE - Quantidade,PRE - Valor,PRE - Total,PRO - Item,PRO - Unidade,PRO - Quantidade,PRO - Valor,PRO - Total,POS - Item,POS - Unidade,POS - Quantidade,POS - Valor,POS - Total,Aprovado,Liberado,Comprometido,Realizado,Total Gasto,Saldo Disponível,Observação
001,,"Roteiro",Movioca,,,Semana,0,0,0,,Semana,0,0,0,,Semana,0,0,0,,Semana,0,0,0,40000,40000,35000,30000,65000,-25000,
001.001,01,"Chefe de roteiro",Movioca,Movioca,2,Semana,2,5000,10000,2,Semana,2,5000,10000,1,Semana,0,0,0,1,Semana,0,0,0,20000,20000,15000,10000,25000,-5000,"Contratação prioritária"
```

**4. Nome do Arquivo**
```
Formato: orcamento_{projeto}_{data}.csv

Exemplo: orcamento_Projeto Alpha_2024-12-05.csv
```

**5. Download Automático**
- Navegador inicia download automaticamente
- Arquivo salvo na pasta de Downloads padrão
- Toast de sucesso exibido

**6. Toast de Sucesso**
```
✓ Planilha exportada com sucesso! 150 linhas exportadas.
```

### 📋 Colunas Exportadas

| Categoria | Colunas |
|-----------|---------|
| **Identificação** | Código, Subcódigo, Descrição, Gestão, Fornecedor |
| **Desenvolvimento** | DES - Item, Unidade, Quantidade, Valor, Total |
| **Pré-Produção** | PRE - Item, Unidade, Quantidade, Valor, Total |
| **Produção** | PRO - Item, Unidade, Quantidade, Valor, Total |
| **Pós-Produção** | POS - Item, Unidade, Quantidade, Valor, Total |
| **Totais** | Aprovado, Liberado, Comprometido, Realizado |
| **Calculados** | Total Gasto, Saldo Disponível |
| **Observação** | Observação |

### 🎯 Casos de Uso

**Caso 1: Enviar para Financiador**
```
Filtros: Nenhum
Resultado: Exporta TUDO (todos os 500 itens)
Uso: Prestação de contas completa
```

**Caso 2: Enviar apenas Departamento de Arte**
```
Filtros: Gestão = "Arte"
Resultado: Exporta apenas rubricas de Arte (50 itens)
Uso: Reunião com Diretor de Arte
```

**Caso 3: Análise de Pré-Produção**
```
Filtros: Busca = "Pré"
Resultado: Exporta itens que têm valores em Pré (80 itens)
Uso: Análise financeira de fase específica
```

### ⚠️ Tratamento de Dados

| Situação | Tratamento |
|----------|------------|
| **Valores com vírgula** | Escapados com aspas: `"Descrição, com vírgula"` |
| **Valores com aspas** | Aspas duplicadas: `"Texto com ""aspas"""` |
| **Valores vazios** | Campo vazio entre vírgulas: `,,` |
| **Números** | Sem formatação (puros): `10000` não `R$ 10.000,00` |

### ✅ Critérios de Sucesso
- [x] Exportação respeita filtros ativos
- [x] Todas as colunas são incluídas
- [x] Nome do arquivo contém projeto e data
- [x] Download inicia automaticamente
- [x] Toast mostra quantidade de linhas exportadas
- [x] CSV abre corretamente no Excel/Google Sheets

---

## FLUXO 7: Monitoramento de Contingência

### 🎯 Objetivo
Acompanhar o uso da reserva financeira (Contingência) em tempo real durante a execução do projeto.

### 👤 Ator Principal
Produção Executiva Interna (PEI)

### 📍 Ponto de Entrada
Múltiplas telas (Dashboard e Orçamento)

### 🔄 Passos do Fluxo

#### ETAPA 1: Monitoramento Global (Dashboard)

**1. Acessar Dashboard PEI**
- PEI visualiza **Card 3: Contingência Disponível**

**Card exibe:**
```
Contingência Disponível

R$ 420.000

[Barra de progresso: 7,8%]

do orçamento total aprovado
```

**Interpretação:**
- **Valor absoluto:** R$ 420.000 disponíveis de reserva
- **Percentual:** Representa 7,8% do total de R$ 5.400.000 aprovado
- **Cor da barra:** 
  - Verde: > 10% (saudável)
  - Amarelo: 5-10% (atenção)
  - Vermelho: < 5% (crítico)

**2. Identificar Projetos Críticos**
- PEI analisa a tabela de projetos
- Projetos com contingência baixa chamam atenção

**Exemplo:**
```
PROJ-002 - Longa Drama
  Contingência: R$ 200.000 (8% do aprovado)
  ⚠️ Atenção: Contingência abaixo de 10%

PROJ-003 - Curta Experimental
  Contingência: R$ 20.000 (4% do aprovado)
  🔴 Crítico: Contingência abaixo de 5%
```

#### ETAPA 2: Monitoramento Detalhado (Orçamento)

**1. Acessar Matriz de Orçamento**
- PEI clica em "Ir para Orçamento" do projeto com alerta

**2. Visualizar Card de Contingência**
```
Cards no topo da matriz:

[Aprovado]    [Liberado]    [Comprometido]    [Realizado]
R$ 500.000    R$ 480.000    R$ 280.000        R$ 150.000

[Total Gasto]           [Saldo Disponível]    [Contingência]
R$ 430.000 (rosa)       R$ 50.000 (laranja)   R$ 20.000 (roxo)
```

**Análise da PEI:**
```
Contingência = Aprovado - Liberado
            = R$ 500.000 - R$ 480.000
            = R$ 20.000

Diagnóstico:
✓ Economizou R$ 20.000 na meta interna
⚠️ Mas Saldo Disponível está baixo (R$ 50.000)
→ Projeto precisa atenção
```

**3. Analisar Linha por Linha**
```
Rubrica: 003.001 - Diretor de Fotografia
  Aprovado:      R$ 50.000
  Liberado:      R$ 48.000  (economizou R$ 2.000)
  Comprometido:  R$ 48.000  (contrato formalizado)
  Realizado:     R$ 30.000  (3 de 5 parcelas pagas)
  Total Gasto:   R$ 78.000  🔴
  Saldo Disp.:   R$ -30.000 🔴 (negativo!)

Alerta: Esta rubrica está R$ 30.000 acima do liberado!
```

#### ETAPA 3: Ações Corretivas

**Cenário 1: Contingência Suficiente**
```
Se Contingência Total > Estouro da Rubrica:
→ PEI pode remanejar valores entre rubricas
→ Aumenta Liberado da rubrica estourada
→ Diminui Liberado de rubrica com sobra
```

**Ação:**
```
1. Identificar rubrica com saldo positivo:
   001.002 - Supervisão de Roteiro
   Liberado: R$ 15.000
   Gasto: R$ 0 (não contratado)
   Saldo: R$ 15.000 (disponível)

2. Remanejar:
   001.002: Liberado R$ 15.000 → R$ 5.000 (reduz R$ 10k)
   003.001: Liberado R$ 48.000 → R$ 58.000 (aumenta R$ 10k)

3. Resultado:
   003.001 - Saldo Disponível: R$ -30.000 → R$ -20.000
   (melhora, mas ainda precisa mais ajustes)
```

**Cenário 2: Contingência Insuficiente**
```
Se Contingência Total < Estouro:
→ PEI precisa negociar com financiador
→ OU cortar custos em outras áreas
→ OU reduzir escopo do projeto
```

**Ação:**
```
1. Documentar estouro:
   - Exportar planilha com status atual
   - Destacar rubricas em vermelho
   - Preparar justificativa técnica

2. Negociar:
   - Reunião com Controladoria Interna
   - Apresentar necessidade de ajuste
   - Solicitar liberação de contingência adicional

3. Implementar decisão:
   - Se aprovado: atualizar valores Liberados
   - Se negado: ajustar escopo (ex: reduzir diárias)
```

### 📊 Fórmulas de Contingência

```javascript
// Nível de Projeto
Contingência Total = Aprovado Total - Liberado Total

// Nível de Rubrica
Contingência Rubrica = Aprovado - Liberado

// Saldo Disponível (diferente de Contingência!)
Saldo Disponível = Liberado - (Comprometido + Realizado)
```

### 🚨 Alertas e Thresholds

| Indicador | Verde ✅ | Amarelo ⚠️ | Vermelho 🔴 |
|-----------|---------|-----------|-------------|
| **Contingência %** | > 10% | 5-10% | < 5% |
| **Saldo Disponível** | > 0 | 0 | < 0 |
| **Total Gasto vs Liberado** | < 80% | 80-100% | > 100% |

### ✅ Critérios de Sucesso
- [x] Contingência calcula automaticamente
- [x] Dashboard exibe contingência global
- [x] Matriz exibe contingência por projeto
- [x] Saldo negativo fica em vermelho
- [x] PEI consegue identificar problemas rapidamente

---

## 📚 GLOSSÁRIO DE TERMOS

| Termo | Definição |
|-------|-----------|
| **Aprovado (Congelado)** | Valor oficial registrado para prestação de contas. Fixado no congelamento. |
| **Liberado (Trabalho)** | Meta interna de trabalho. Editável pela PEI mesmo após congelamento. |
| **Comprometido** | Soma dos contratos formalizados (ainda não pagos). Atualizado pelo módulo de Contratação. |
| **Realizado** | Soma dos pagamentos executados. Atualizado pelo módulo de Pagamentos. |
| **Total Gasto** | Comprometido + Realizado. Indica quanto já foi "consumido" do orçamento. |
| **Saldo Disponível** | Liberado - Total Gasto. Indica quanto ainda pode ser gasto. |
| **Contingência** | Aprovado - Liberado. Reserva financeira entre o teto oficial e a meta interna. |
| **Desvio** | Quando Total Gasto > Liberado. Indica que está consumindo contingência. |
| **Sub-item** | Subdivisão de uma rubrica (ex: 001.001.01). Permite múltiplos valores na mesma categoria. |
| **Delegação** | Atribuir gestão de rubricas para um responsável específico com permissões limitadas. |
| **Congelamento** | Ação de fixar valores Liberados como Aprovados. Irreversível. |

---

## 🎓 BOAS PRÁTICAS

### ✅ DO (Faça)

1. **Congele o orçamento** assim que a negociação com financiador for finalizada
2. **Monitore a contingência** semanalmente no Dashboard
3. **Delegue responsabilidades** para descentralizar o trabalho
4. **Use sub-itens** quando houver múltiplos profissionais na mesma rubrica
5. **Exporte planilhas** antes de reuniões importantes
6. **Documente observações** nas rubricas críticas

### ❌ DON'T (Não faça)

1. **Não congele** o orçamento antes de validar todos os valores
2. **Não ignore** alertas de desvio no Dashboard
3. **Não deixe** saldo disponível ficar negativo sem plano de ação
4. **Não delete** rubricas que já têm valores comprometidos
5. **Não esqueça** de definir teto ao delegar rubricas com alto valor
6. **Não altere** valores APROVADO após congelamento (sistema bloqueia)

---

## 📞 SUPORTE

**Dúvidas sobre os fluxos?**
- Consulte a documentação técnica: `/ANALISE_JORNADA_ADMINISTRADOR.md`
- Veja o PRD completo: PRD 002 - Jornada da Produção Executiva Interna

**Problemas técnicos?**
- Verifique os logs no console do navegador
- Reporte bugs para a equipe de desenvolvimento

---

**Última atualização:** 05/12/2024  
**Próxima revisão:** Após feedback da usuária Mari Guedes (PEI)
