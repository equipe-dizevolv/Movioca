# 🔍 AUDITORIA DE PERMISSÕES - PERFIL PEI

**Data:** 05/12/2024  
**Status:** ⚠️ **CRÍTICO - PERMISSÕES FALTANDO**  

---

## 🚨 PROBLEMAS IDENTIFICADOS

### ❌ **PROBLEMA 1: Permissões Ausentes no AuthContext**

**Situação:** O AuthContext tem apenas 11 permissões genéricas, mas **faltam permissões específicas** para funcionalidades essenciais do PEI.

#### Permissões Existentes (AuthContext.tsx):
```typescript
1. canEditOrcamento ✅ - PEI incluído
2. canEditContratacao ✅ - PEI incluído  
3. canApprovePayments ❌ - PEI NÃO incluído
4. canExecutePayments ❌ - PEI NÃO incluído
5. canEditFornecedor ✅ - PEI incluído (mas sem tela na sidebar)
6. canManageUsers ❌ - PEI NÃO incluído (correto)
7. canAccessFullFinancial ❌ - PEI NÃO incluído (correto)
8. canCreateRubrica ✅ - PEI incluído
9. canDeleteItems ✅ - PEI incluído
10. isViewOnly ❌ - PEI NÃO é view-only (correto)
11. canEditAssignedOnly ❌ - PEI NÃO é restrito (correto)
```

#### Permissões FALTANDO (críticas para PRD 002):

| Permissão Faltando | Necessária Para | História/Requisito PRD 002 |
|-------------------|-----------------|---------------------------|
| **canManageProjetos** | Criar, editar, arquivar projetos | História 1 (Dashboard) + Fluxo 4.1 item 1 |
| **canViewAllProjetos** | Visualizar todos os projetos ativos no Dashboard Multi-Projeto | Req. 3.1 - Dashboard multi-projeto |
| **canCopyOrcamento** | Copiar orçamento de projeto anterior ou Plano de Contas | História 2 (Criação com cópia) |
| **canFreezeOrcamento** | Congelar versão do orçamento como "Aprovado" | História 5 (Controle de alterações) |
| **canDelegateGestao** | Atribuir gestão de rubricas a outros usuários | História 4 (Delegação) |
| **canApproveVerba** | Aprovar/reprovar solicitações de verba | Req. 3.1 + Gestão financeira |
| **canViewVerbas** | Visualizar e gerenciar fluxo de verbas | Tela "Verbas" na sidebar |
| **canManagePlanoContas** | Acessar e copiar estruturas de Plano de Contas | História 2 + Tela na sidebar |

---

### ❌ **PROBLEMA 2: Restrição Indevida em ControleDeVerba.tsx**

**Arquivo:** `/components/screens/ControleDeVerba.tsx`  
**Linha:** 889-891

```typescript
const isControladoria = hasPermission((role) => 
  ['Administrador', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)
);
```

**Problema:** PEI **NÃO está incluído** na verificação `isControladoria`, o que pode restringir funcionalidades críticas na tela de Verbas.

**Impacto:** 
- ❌ PEI pode não conseguir aprovar solicitações de verba
- ❌ PEI pode ter acesso somente-leitura em áreas que deveria poder editar
- ❌ Viola o PRD 002 que define PEI como gestor financeiro do projeto

**Correção necessária:**
```typescript
// Opção 1: Criar permissão específica
const canManageVerbas = hasPermission((role) => 
  ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)
);

// Opção 2: Adicionar no AuthContext
canApproveVerba: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role);
},
```

---

### ❌ **PROBLEMA 3: Sem Validações de Permissão em Telas Chave**

**Telas sem validação de permissão:**
1. **Projetos.tsx** - Não valida `canManageProjetos` antes de permitir criar/editar
2. **PlanoDeContas.tsx** - Não valida `canManagePlanoContas` antes de permitir copiar
3. **Orcamento.tsx** - Não valida `canFreezeOrcamento` ou `canDelegateGestao`

**Impacto:**
- ⚠️ Qualquer usuário com acesso à tela pode executar ações (falta granularidade)
- ⚠️ Não há auditoria de quem pode fazer o quê
- ⚠️ Risco de usuários executarem ações não autorizadas

---

### ⚠️ **PROBLEMA 4: Permissão canEditFornecedor sem Tela**

**Situação:** PEI tem permissão `canEditFornecedor` (linha 75 do AuthContext), mas **não tem a tela "Fornecedores" na sidebar**.

**Análise:**
- ✅ **Correto:** PEI não deve ver lista GLOBAL de fornecedores (isso é escopo Admin/Financeiro)
- ✅ **Correto:** PEI cria contratos na tela "Contratação" que automaticamente cadastra fornecedor vinculado ao projeto
- ❌ **Inconsistência:** Ter a permissão mas não a tela pode gerar confusão

**Recomendação:**
- Manter PEI sem tela "Fornecedores" (correto)
- Remover `canEditFornecedor` do PEI OU renomear para `canContractFornecedor` (mais claro)

---

## 📋 CHECKLIST DE CONFORMIDADE PRD 002

### História 1: Dashboard Multi-Projeto ✅
- [x] Dashboard PEI implementado
- [x] Cards de resumo (Projetos em Produção, Total Comprometido, Saldo de Contingência)
- [x] Tabela de projetos ativos
- [ ] **FALTANDO:** Permissão `canViewAllProjetos` formalizada

### História 2: Criação de Orçamento com Cópia ⚠️
- [x] Tela "Plano de Contas" na sidebar
- [x] Botão "Copiar Orçamento" implementado
- [ ] **FALTANDO:** Permissão `canCopyOrcamento` validada
- [ ] **FALTANDO:** Permissão `canManagePlanoContas` no AuthContext

### História 3: Matriz Orçamentária ✅
- [x] Tela "Orçamento" na sidebar
- [x] Visualização em matriz
- [x] Colunas de Fases (Desenv, Pré, Prod, Pós)
- [x] PEI tem permissão `canEditOrcamento`

### História 4: Delegação de Gestão ⚠️
- [x] Funcionalidade "Atribuir Gestão" implementada na matriz
- [ ] **FALTANDO:** Permissão `canDelegateGestao` validada
- [ ] **FALTANDO:** Auditoria de quem delegou o quê

### História 5: Congelar Versão do Orçamento ⚠️
- [x] Botão "Congelar Versão" implementado
- [ ] **FALTANDO:** Permissão `canFreezeOrcamento` validada
- [ ] **FALTANDO:** Sistema de versionamento com comparação

### História 6: Contratação de Chefes ✅
- [x] Tela "Contratação" na sidebar
- [x] Vinculação de contrato a Item Orçamentário
- [x] PEI tem permissão `canEditContratacao`
- [x] Valor marcado como "Comprometido"

---

## 🔄 COMPARAÇÃO: SIDEBAR vs. PERMISSÕES

### Sidebar PEI (AuthContext linha 36):
```
1. Dashboard       ✅ (sem permissão específica)
2. Projetos        ❌ (falta canManageProjetos)
3. Plano de Contas ❌ (falta canManagePlanoContas)
4. Orçamento       ✅ (canEditOrcamento existe)
5. Contratação     ✅ (canEditContratacao existe)
6. Verbas          ⚠️ (isControladoria não inclui PEI)
7. Documentos      ✅ (sem permissão específica)
8. Configurações   ✅ (todos têm acesso)
```

### Resumo:
- ✅ **3 telas OK** (Orçamento, Contratação, Configurações)
- ⚠️ **1 tela com restrição** (Verbas - PEI não incluído em isControladoria)
- ❌ **2 telas sem permissão** (Projetos, Plano de Contas)
- ✅ **2 telas genéricas** (Dashboard, Documentos)

---

## 🎯 IMPACTO NO PRD 002

### Fluxo 4.1: Criação e Estruturação de Orçamento

```
1. ❌ PEI cria projeto novo
   → BLOQUEADO: Sem permissão canManageProjetos

2. ⚠️ No setup, escolhe "Copiar de: [Projeto Anterior]"
   → RISCO: Sem permissão canCopyOrcamento

3. ✅ Sistema clona estrutura
   → OK: Backend pode fazer isso

4. ✅ PEI acessa Matriz de Orçamento
   → OK: canEditOrcamento existe

5. ✅ Revisa valores e edita rubricas
   → OK: canEditOrcamento existe

6. ⚠️ Seleciona linhas e clica "Atribuir Gestão"
   → RISCO: Sem permissão canDelegateGestao validada

7. ⚠️ Clica em "Congelar Versão"
   → RISCO: Sem permissão canFreezeOrcamento validada
```

**Resultado:** **3 de 7 etapas com problemas!**

---

## 🛠️ CORREÇÕES NECESSÁRIAS

### 1. **Adicionar Permissões Faltando no AuthContext.tsx**

```typescript
// Adicionar após linha 96
canManageProjetos: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna'].includes(role);
},

canViewAllProjetos: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna'].includes(role);
},

canCopyOrcamento: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna'].includes(role);
},

canFreezeOrcamento: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna'].includes(role);
},

canDelegateGestao: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna'].includes(role);
},

canApproveVerba: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role);
},

canManagePlanoContas: (role: UserRole) => {
  return ['Administrador', 'Produção Executiva Interna'].includes(role);
},
```

### 2. **Corrigir ControleDeVerba.tsx**

```typescript
// Linha 889 - ANTES:
const isControladoria = hasPermission((role) => 
  ['Administrador', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)
);

// Linha 889 - DEPOIS:
const canManageVerbas = hasPermission((role) => 
  ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)
);
```

### 3. **Adicionar Validações em Projetos.tsx**

```typescript
// No início do componente:
const { currentUser, hasPermission } = useAuth();

const canManage = hasPermission(permissions.canManageProjetos);

// Antes do botão "Novo Projeto":
{canManage && (
  <Button onClick={() => setView('create')}>
    <Plus className="w-4 h-4 mr-2" />
    Novo Projeto
  </Button>
)}
```

### 4. **Adicionar Validações em PlanoDeContas.tsx**

```typescript
// No início do componente:
const { currentUser, hasPermission } = useAuth();

const canManage = hasPermission(permissions.canManagePlanoContas);

// Antes dos botões de ação:
{canManage && (
  <Button onClick={handleCopiar}>Copiar Estrutura</Button>
)}
```

### 5. **Adicionar Validações em Orcamento.tsx**

```typescript
// No início do componente:
const { currentUser, hasPermission } = useAuth();

const canFreeze = hasPermission(permissions.canFreezeOrcamento);
const canDelegate = hasPermission(permissions.canDelegateGestao);

// Antes dos botões:
{canFreeze && (
  <Button onClick={handleCongelarVersao}>Congelar Versão</Button>
)}

{canDelegate && (
  <Button onClick={handleAtribuirGestao}>Atribuir Gestão</Button>
)}
```

---

## 🔢 RESUMO ESTATÍSTICO

| Categoria | Quantidade |
|-----------|-----------|
| **Permissões existentes** | 11 |
| **Permissões faltando** | 7 |
| **Telas na sidebar PEI** | 8 |
| **Telas sem validação** | 3 |
| **Telas com restrição indevida** | 1 (Verbas) |
| **Histórias do PRD afetadas** | 6 de 6 |
| **Fluxos com problemas** | 2 de 2 |

---

## ⚠️ SEVERIDADE DOS PROBLEMAS

### 🔴 **CRÍTICO** (Bloqueia funcionalidade):
1. ❌ Sem `canManageProjetos` → PEI não pode criar projetos (Fluxo 4.1 item 1)
2. ❌ PEI excluído de `isControladoria` → Sem acesso a aprovar verbas

### 🟡 **ALTO** (Reduz controle/auditoria):
3. ⚠️ Sem `canFreezeOrcamento` → Qualquer um pode congelar orçamento
4. ⚠️ Sem `canDelegateGestao` → Qualquer um pode delegar tarefas
5. ⚠️ Sem `canCopyOrcamento` → Sem auditoria de cópias

### 🟢 **MÉDIO** (Inconsistência):
6. ⚠️ `canEditFornecedor` sem tela → Permissão sem uso prático
7. ⚠️ Sem `canManagePlanoContas` → Plano de Contas acessível a todos

---

## 📊 PRIORIDADE DE CORREÇÃO

### **FASE 1 - IMEDIATA** (Bloqueadores críticos):
1. ✅ Adicionar `canManageProjetos` no AuthContext
2. ✅ Adicionar `canApproveVerba` no AuthContext
3. ✅ Corrigir `isControladoria` em ControleDeVerba.tsx

### **FASE 2 - CURTO PRAZO** (Controle/Auditoria):
4. ✅ Adicionar `canFreezeOrcamento` no AuthContext
5. ✅ Adicionar `canDelegateGestao` no AuthContext
6. ✅ Adicionar validações em Orcamento.tsx

### **FASE 3 - MÉDIO PRAZO** (Completude):
7. ✅ Adicionar `canCopyOrcamento` no AuthContext
8. ✅ Adicionar `canManagePlanoContas` no AuthContext
9. ✅ Adicionar validações em Projetos.tsx e PlanoDeContas.tsx

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

### AuthContext.tsx:
- [ ] Adicionar 7 novas permissões
- [ ] Incluir PEI em `canApproveVerba`
- [ ] Documentar cada permissão com comentário

### ControleDeVerba.tsx:
- [ ] Renomear `isControladoria` para `canManageVerbas`
- [ ] Incluir PEI na verificação
- [ ] Testar aprovação de verbas como PEI

### Projetos.tsx:
- [ ] Importar `useAuth` e `permissions`
- [ ] Adicionar validação `canManageProjetos`
- [ ] Esconder botão "Novo Projeto" se não tiver permissão

### PlanoDeContas.tsx:
- [ ] Importar `useAuth` e `permissions`
- [ ] Adicionar validação `canManagePlanoContas`
- [ ] Esconder botões de ação se não tiver permissão

### Orcamento.tsx:
- [ ] Importar `useAuth` e `permissions`
- [ ] Adicionar validações `canFreezeOrcamento` e `canDelegateGestao`
- [ ] Esconder botões se não tiver permissão

---

**Última atualização:** 05/12/2024  
**Status:** ⚠️ **AGUARDANDO CORREÇÕES**  
**Próximo passo:** Implementar FASE 1 (bloqueadores críticos)
