# 🎬 MOVIOCA - Fluxos da Produção Executiva Dedicada (PED)

**Data:** 05/12/2024  
**Versão:** 1.0  
**PRD:** PRD 005 - Jornada da Produção Executiva Dedicada  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Fluxo 1: Acessar Dashboard](#fluxo-1-acessar-dashboard)
3. [Fluxo 2: Consultar Matriz Orçamentária](#fluxo-2-consultar-matriz-orçamentária)
4. [Fluxo 3: Criar Nova Contratação](#fluxo-3-criar-nova-contratação)
5. [Fluxo 4: Sub-delegar Rubrica](#fluxo-4-sub-delegar-rubrica)
6. [Fluxo 5: Rastrear Gastos de Rubrica](#fluxo-5-rastrear-gastos-de-rubrica)
7. [Fluxo 6: Upload de Contrato Assinado](#fluxo-6-upload-de-contrato-assinado)
8. [Glossário de Termos](#glossário-de-termos)

---

## 🎯 VISÃO GERAL

A **Produção Executiva Dedicada (PED)** é um perfil focado na **execução operacional** de um projeto específico. Ao contrário da PEI (que gerencia múltiplos projetos e a contingência global), a PED tem:

### Características do Perfil PED

- **Escopo:** Mono-projeto (um projeto por vez)
- **Autonomia:** Pode contratar e programar pagamentos dentro do orçamento delegado
- **Restrições:** Não pode alterar o teto orçamentário (Valor Liberado)
- **Visibilidade:** Vê apenas suas rubricas (RN-001: Silo de Informação)
- **Responsabilidade:** Solidária pelos gastos da equipe subordinada (RN-003)

### Regras de Negócio Principais

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| **RN-001** | Escopo Restrito (Silo) | Filtro de rubricas em todas as telas |
| **RN-002** | Imutabilidade do Teto | Campo "Liberado" desabilitado |
| **RN-003** | Responsabilidade Solidária | Cálculo consolidado de gastos |

---

## FLUXO 1: ACESSAR DASHBOARD

### Objetivo
Visualizar um resumo executivo do orçamento delegado e identificar ações pendentes.

### Pré-condições
- Usuário autenticado como "Produção Executiva Dedicada"
- Possui rubricas delegadas no projeto ativo

### Passos

1. **Login no Sistema**
   - Acessa o sistema MOVIOCA
   - Sistema identifica perfil = "Produção Executiva Dedicada"
   - Redireciona automaticamente para `DashboardPED.tsx`

2. **Visualizar Cards de Resumo**
   - **Total Liberado:** Soma de todas as rubricas delegadas
   - **Total Comprometido:** Contratos + Verbas
   - **Saldo Disponível:** Liberado - Comprometido
   
   ```
   Exemplo Visual:
   ┌─────────────────────┬─────────────────────┬─────────────────────┐
   │ Total Liberado      │ Total Comprometido  │ Saldo Disponível    │
   │ R$ 1.340.000        │ R$ 985.000          │ R$ 355.000          │
   │ 10 rubricas         │ 73,5% executado     │ 26,5% disponível    │
   └─────────────────────┴─────────────────────┴─────────────────────┘
   ```

3. **Identificar Alertas**
   - **Contratos Aguardando Assinatura:** Quantidade de contratos em status "Minuta"
   - **Solicitações de Verba:** Pedidos da equipe subordinada

4. **Consultar Lista de Rubricas**
   - Tabela com Código, Descrição, Liberado, Barra de Saldo
   - Cores da barra:
     - 🟢 Verde: < 50% usado
     - 🟡 Amarelo: 50-90% usado
     - 🔴 Vermelho: > 90% usado

5. **Analisar Gráfico de Progresso**
   - Gráfico de pizza (donut chart)
   - Percentual comprometido vs disponível
   - Resumo numérico abaixo do gráfico

### Ações Disponíveis

| Botão | Ação |
|-------|------|
| **Nova Contratação** | Navega para formulário de contratação |
| **Detalhar Orçamento** | Abre Matriz Orçamentária Filtrada |
| **Ver Contratos** | Abre lista de contratos com upload |
| **Aprovar** (verbas) | Abre tela de Controle de Verba |

### Resultado Esperado
- PED tem visão consolidada do seu escopo
- Identifica rapidamente ações necessárias
- Pode navegar para fluxos de ação

---

## FLUXO 2: CONSULTAR MATRIZ ORÇAMENTÁRIA

### Objetivo
Visualizar detalhadamente todas as rubricas sob gestão da PED, com rastreabilidade de gastos.

### Pré-condições
- Estar no Dashboard PED
- Clicar em "Detalhar Orçamento"

### Passos

1. **Acessar Matriz Filtrada**
   - Sistema carrega `MatrizOrcamentoPED.tsx`
   - Aplica filtro: `WHERE gestor = usuarioAtual`
   - Exibe apenas rubricas delegadas

2. **Visualizar Tabela Detalhada**
   
   **Colunas Exibidas:**
   - ✅ Código (ex: 002.001)
   - ✅ Descrição (ex: Diretor)
   - ✅ Gestor Atual (você ou sub-delegado)
   - ✅ Liberado (somente leitura - RN-002)
   - ✅ Comprometido
   - ✅ Realizado
   - ✅ Saldo Disponível (com barra visual)

   **Colunas NÃO Exibidas:**
   - ❌ Contingência Global (visão exclusiva PEI)
   - ❌ Rubricas de outros departamentos

3. **Buscar Rubrica**
   - Campo de busca por código ou descrição
   - Filtro em tempo real

4. **Selecionar Rubricas**
   - Checkbox individual ou "Selecionar Todas"
   - Contador de seleção: "(X rubricas selecionadas)"

### Ações Disponíveis

#### 4.1. Ver Detalhes (Rastreabilidade)
- Botão no menu dropdown de cada linha
- Abre modal mostrando:
  - **Contratos Vinculados:** Listagem com número, fornecedor, valor, status
  - **Verbas Aprovadas:** Listagem com número, descrição, valor, status
  - **Total Rastreado:** Soma de contratos + verbas

#### 4.2. Sub-delegar Rubrica
- Seleciona uma ou mais rubricas
- Clica em "Sub-delegar"
- Modal com:
  - Dropdown de membros da equipe
  - Campo opcional "Valor Liberado" (teto para sub-delegado)
  - Aviso de RN-003 (Responsabilidade Solidária)

### Resultado Esperado
- PED visualiza apenas suas rubricas (RN-001)
- Não consegue editar o teto (RN-002)
- Pode rastrear 100% dos gastos comprometidos
- Pode sub-delegar com segurança (RN-003)

---

## FLUXO 3: CRIAR NOVA CONTRATAÇÃO

### Objetivo
Registrar um novo contrato vinculado a uma rubrica orçamentária da PED, com validação automática de saldo.

### Pré-condições
- Estar no Dashboard PED ou Matriz Orçamentária
- Ter rubricas com saldo disponível > 0

### Passos

1. **Iniciar Contratação**
   - Clica em "Nova Contratação"
   - Sistema abre `NovaContratacao.tsx` com flag `isPED=true`

2. **Preencher Dados do Fornecedor**
   - CNPJ/CPF (auto-preenche razão social)
   - Dados bancários
   - Chave PIX

3. **Selecionar Item Orçamentário**
   
   **DIFERENÇA CRÍTICA:** Dropdown filtrado!
   
   ```typescript
   // PEI vê TODAS as rubricas
   const rubricasDisponiveis = todasRubricas; // 100+ rubricas
   
   // PED vê APENAS suas rubricas
   const rubricasDisponiveis = todasRubricas.filter(r => r.gestor === "user-ped"); // 10 rubricas
   ```

4. **Preencher Valor do Contrato**
   - Digita valor total
   - **Sistema valida automaticamente:**

   ```typescript
   const rubricaSelecionada = rubricas.find(r => r.id === itemOrcamentario);
   const saldoDisponivel = rubricaSelecionada.liberado - rubricaSelecionada.comprometido;
   
   if (valorContrato > saldoDisponivel) {
     // ⚠️ ALERTA VERMELHO APARECE
     return {
       temSaldo: false,
       mensagem: "Saldo insuficiente para esta rubrica"
     };
   }
   ```

5. **Visualizar Alerta de Saldo (se aplicável)**
   
   ```
   ┌────────────────────────────────────────────────────────────┐
   │ ⚠️ Atenção: Saldo insuficiente nesta rubrica              │
   │                                                             │
   │ Saldo disponível: R$ 20.000,00                             │
   │ Valor do contrato: R$ 30.000,00                            │
   │ Diferença: R$ 10.000,00                                     │
   │                                                             │
   │ Contate a PEI para ajustar o valor liberado desta rubrica │
   └────────────────────────────────────────────────────────────┘
   ```

6. **Definir Cronograma de Pagamento**
   - Adiciona parcelas com datas e valores
   - Sistema cria programação para Controladoria

7. **Salvar Contratação**
   - Se saldo OK: Salva com sucesso
   - Se saldo insuficiente: Bloqueia salvamento (MVP)
   - Futuro: Envia para aprovação PEI

### Resultado Esperado
- PED só pode contratar nas suas rubricas
- Sistema previne estouros automaticamente
- Valor comprometido é reservado imediatamente

---

## FLUXO 4: SUB-DELEGAR RUBRICA

### Objetivo
Atribuir a gestão de uma ou mais rubricas para um membro da equipe dedicada, descentralizando o trabalho.

### Pré-condições
- Estar na Matriz Orçamentária PED
- Ter rubricas delegadas (ser o gestor)

### Passos

1. **Selecionar Rubricas**
   - Na Matriz Orçamentária PED
   - Marca checkbox de 1 ou mais rubricas
   - Exemplo: Seleciona 004.001 (Diretor de Arte) e 004.002 (Cenógrafo)

2. **Iniciar Sub-delegação**
   - Clica em "Sub-delegar (X)"
   - Sistema abre modal

3. **Escolher Responsável**
   - Dropdown com membros da Equipe Dedicada
   - Exemplo: "João Silva (Assistente de Arte)"

4. **Definir Teto (Opcional)**
   - Campo "Valor Liberado"
   - Se preenchido: João pode gastar ATÉ esse valor
   - Se vazio: João vê o valor total das rubricas

5. **Ler Aviso de RN-003**
   
   ```
   ℹ️ Sub-delegação:
   2 rubrica(s) selecionada(s). O responsável terá permissão para 
   visualizar e solicitar verbas. Os gastos consumirão o seu saldo 
   (RN-003: Responsabilidade Solidária).
   ```

6. **Confirmar**
   - Clica em "Confirmar Sub-delegação"
   - Sistema:
     - Atualiza `gestor` das rubricas para João
     - Atualiza `gestorPai` para manter vínculo com PED
     - Concede permissões de leitura/escrita para João
     - Exibe toast de sucesso

### Resultado Esperado
- João agora vê essas 2 rubricas no seu dashboard
- PED continua vendo as rubricas (consolidação)
- Gastos de João aparecem no comprometido da PED (RN-003)

### Cálculo Consolidado (RN-003)

```typescript
// Dashboard PED mostra consolidado
const calcularComprometidoConsolidado = () => {
  // Contratos diretos da PED
  const contratosDirectos = sum(contratos.where(gestor = PED));
  
  // Contratos de João (sub-delegado)
  const contratosSubDelegados = sum(contratos.where(gestorPai = PED));
  
  // Total que consome saldo da PED
  return contratosDirectos + contratosSubDelegados;
};
```

---

## FLUXO 5: RASTREAR GASTOS DE RUBRICA

### Objetivo
Entender exatamente o que compõe o valor "Comprometido" de uma rubrica específica.

### Pré-condições
- Estar na Matriz Orçamentária PED
- Selecionar uma rubrica com comprometido > 0

### Passos

1. **Selecionar Rubrica**
   - Na Matriz Orçamentária
   - Clica no menu de ações (⋮) da linha
   - Seleciona "Ver Detalhes (Rastreabilidade)"

2. **Visualizar Modal de Rastreabilidade**
   
   **Cabeçalho:**
   - Código e Descrição da rubrica
   - Resumo: Liberado, Comprometido, Saldo

   **Seção 1: Contratos Vinculados**
   ```
   📄 Contratos Vinculados
   
   ┌──────────────────────────────────────────────────────┐
   │ CNT-001 - José Silva (Diretor)                       │
   │ Status: Aprovado                           R$ 150.000│
   └──────────────────────────────────────────────────────┘
   
   ┌──────────────────────────────────────────────────────┐
   │ CNT-003 - Maria Santos (DOP)                         │
   │ Status: Aprovado                           R$ 200.000│
   └──────────────────────────────────────────────────────┘
   ```

   **Seção 2: Verbas Aprovadas**
   ```
   📄 Verbas Aprovadas
   
   ┌──────────────────────────────────────────────────────┐
   │ V-005 - Transporte diário - Semana 1                 │
   │ Status: Aprovada                            R$ 15.000│
   └──────────────────────────────────────────────────────┘
   ```

   **Rodapé: Total Rastreado**
   ```
   ─────────────────────────────────────────────────────────
   Total Rastreado: R$ 365.000
   Soma de todos os contratos e verbas vinculados a esta rubrica
   ```

3. **Conferir Valores**
   - Total Rastreado deve bater com Comprometido
   - Se divergir: Sinalizar para Controladoria

### Resultado Esperado
- 100% de transparência na composição do comprometido
- Rastreabilidade completa (auditoria)
- Facilita tomada de decisão sobre remanejamentos

---

## FLUXO 6: UPLOAD DE CONTRATO ASSINADO

### Objetivo
Enviar o documento de contrato assinado para liberar o fluxo de pagamento na Controladoria.

### Pré-condições
- Estar na tela "Contratos - PED"
- Ter contratos em status "Minuta"

### Passos

1. **Acessar Lista de Contratos**
   - Dashboard PED > "Ver Contratos" OU
   - Menu lateral > Contratação (sistema detecta PED e carrega ContratosPED)

2. **Identificar Contratos Pendentes**
   
   **Card de Alerta:**
   ```
   ⚠️ 3 contrato(s) em status "Minuta". Faça o upload dos contratos 
   assinados para liberar o fluxo de pagamento na Controladoria.
   ```

   **Tabela:**
   - Filtro visual: Badge amarelo "Minuta"
   - Contratos assinados: Badge verde "Assinado"

3. **Iniciar Upload**
   - Clica no menu (⋮) do contrato
   - Seleciona "Upload Contrato Assinado"
   - Sistema valida: `if (status !== "Minuta") { erro }`

4. **Anexar Arquivo**
   
   **Modal de Upload:**
   ```
   Upload de Contrato Assinado
   
   Número: CNT-003
   Fornecedor: Pedro Costa
   Valor: R$ 60.000,00
   
   ┌────────────────────────────────────┐
   │ [ Escolher arquivo... ]            │
   │ Formatos aceitos: PDF, DOC, DOCX   │
   └────────────────────────────────────┘
   
   ℹ️ Importante: Após o upload, o status será atualizado 
   para "Assinado" e o fluxo de pagamento será liberado 
   automaticamente para a Controladoria.
   ```

5. **Confirmar Upload**
   - Clica em "Confirmar Upload"
   - Sistema:
     - Simula upload do arquivo
     - Atualiza `status = "Assinado"`
     - Atualiza `contratoAnexo = nome_arquivo.pdf`
     - Libera para fila de pagamento

6. **Visualizar Confirmação**
   
   **Toast:**
   ```
   ✅ Contrato CNT-003 atualizado para "Assinado". 
   O fluxo de pagamento foi liberado.
   ```

   **Tabela atualizada:**
   - Badge muda de amarelo para verde
   - Contador de alertas diminui

### Resultado Esperado
- Controladoria pode agendar pagamentos
- Histórico de documentos completo
- Fluxo de trabalho desbloqueado

---

## 📊 GLOSSÁRIO DE TERMOS

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| **Rubrica** | Linha do orçamento vinculada a um custo específico | 002.001 - Diretor |
| **Liberado** | Valor máximo que pode ser gasto (teto) | R$ 150.000 |
| **Comprometido** | Valor já contratado mas não pago | R$ 120.000 (contratos + verbas) |
| **Realizado** | Valor efetivamente pago | R$ 50.000 |
| **Saldo** | Liberado - Comprometido | R$ 30.000 |
| **Gestor** | Usuário responsável pela rubrica | user-ped, user-equipe |
| **Gestor Pai** | Gestor que sub-delegou (RN-003) | user-ped (pai de user-equipe) |
| **Sub-delegação** | Passar gestão para nível abaixo | PED → Assistente de Arte |
| **Rastreabilidade** | Ver origem do valor comprometido | Contratos + Verbas |
| **Minuta** | Contrato criado mas não assinado | Status aguardando upload |
| **Assinado** | Contrato com arquivo anexado | Liberado para pagamento |
| **RN-001** | Escopo Restrito (Silo) | PED vê apenas suas rubricas |
| **RN-002** | Imutabilidade do Teto | PED não altera Liberado |
| **RN-003** | Responsabilidade Solidária | Gastos da equipe = gastos da PED |

---

## 📁 ARQUIVOS RELACIONADOS

- **Componentes:**
  - `/components/screens/DashboardPED.tsx`
  - `/components/screens/MatrizOrcamentoPED.tsx`
  - `/components/screens/ContratosPED.tsx`
  - `/components/screens/NovaContratacao.tsx` (com filtro PED)
  
- **Utilitários:**
  - `/utils/permissoes.ts`
  - `/utils/orcamento.ts`
  
- **Componentes Visuais:**
  - `/components/BarraSaldo.tsx`
  - `/components/GraficoProgressoPED.tsx`

- **Documentação:**
  - `/ANALISE_PED_PENDENCIAS.md` (análise de conformidade)
  - `/IMPLEMENTACAO_PED_RESUMO.md` (resumo técnico)
  - PRD 005 - Jornada da Produção Executiva Dedicada

---

**Última atualização:** 05/12/2024  
**Próximas etapas:** Testar fluxos com usuário real PED (Mari Guedes ou similar)
