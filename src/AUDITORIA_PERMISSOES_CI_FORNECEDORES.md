# 🔒 AUDITORIA DE PERMISSÕES - CONTROLADORIA INTERNA (CI)
## Acesso READ-ONLY a Fornecedores

**Data**: 07/12/2024  
**Módulo**: Fornecedores  
**Perfil**: Controladoria Interna (CI)  
**Tipo**: Segregação de Funções (Compliance)

---

## 📋 RESUMO DA MUDANÇA

Implementado acesso **READ-ONLY** para o perfil Controladoria Interna na tela de Fornecedores, seguindo princípios de **segregação de funções** e **compliance**.

---

## ⚠️ JUSTIFICATIVA

### Princípio de Segregação de Funções
**"Quem APROVA não deve CADASTRAR"**

A Controladoria Interna é responsável por:
- ✅ Aprovar pagamentos
- ✅ Validar conformidade
- ✅ Auditar processos
- ✅ Detectar irregularidades

Portanto, **NÃO deve**:
- ❌ Cadastrar fornecedores que irá aprovar
- ❌ Editar dados bancários que irá validar
- ❌ Criar entidades que irá auditar

### Razões de Compliance
1. **Conflito de Interesse**: CI que cadastra e aprova o mesmo fornecedor
2. **Risco de Fraude**: Possibilidade de criar fornecedores fictícios
3. **Auditoria Externa**: Requisito comum em auditorias financeiras
4. **Segregação de Responsabilidades**: Separação entre operacional e controle

---

## 🔄 MUDANÇAS IMPLEMENTADAS

### 1. AuthContext.tsx
**Linha 74-76 - Permissão `canEditFornecedor`**

**ANTES:**
```typescript
canEditFornecedor: (role: UserRole) => {
  return ['Administrador', 'Financeiro', 'Produção Executiva Interna', 'Controladoria Interna'].includes(role);
}
```

**DEPOIS:**
```typescript
canEditFornecedor: (role: UserRole) => {
  return ['Administrador', 'Financeiro', 'Produção Executiva Interna'].includes(role);
}
```

**Mudança**: Removida **Controladoria Interna** da lista de perfis com permissão de editar fornecedores.

---

### 2. Fornecedores.tsx
**Documentação atualizada com segregação de funções**

```typescript
/**
 * MOVIOCA - Tela de Fornecedores
 * 
 * PERMISSÕES:
 * - Visualizar: Todos os perfis com acesso à tela
 * - Criar/Editar: Admin, Financeiro, PEI (canEditFornecedor)
 * - Excluir: Admin apenas
 * 
 * PERFIS COM ACESSO:
 * - Administrador ✓ (criar/editar/excluir)
 * - Controladoria Interna ✓ (apenas visualizar - READ ONLY)
 * - Financeiro ✓ (criar/editar)
 * - PEI ✓ (criar/editar)
 * - Controladoria Dedicada (apenas visualizar - READ ONLY)
 * 
 * SEGREGAÇÃO DE FUNÇÕES:
 * CI tem acesso READ-ONLY por compliance - quem APROVA pagamentos não deve CADASTRAR fornecedores.
 */
```

---

## 📊 MATRIZ DE PERMISSÕES ATUALIZADA

### Tela: Fornecedores

| Perfil | Sidebar | Visualizar | Criar | Editar | Excluir |
|--------|---------|------------|-------|--------|---------|
| **Administrador** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Controladoria Interna** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Financeiro** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **PEI** | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Controladoria Dedicada** | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 🎯 COMPORTAMENTO ESPERADO

### Para Controladoria Interna (João):

#### ✅ PODE:
1. **Ver a tela "Fornecedores"** na sidebar
2. **Buscar e filtrar** fornecedores por nome/CNPJ/projeto
3. **Visualizar detalhes completos** de qualquer fornecedor:
   - Razão social, CNPJ/CPF
   - Dados bancários (banco, agência, conta, PIX)
   - Histórico de projetos e funções
4. **Consultar informações** antes de aprovar pagamentos

#### ❌ NÃO PODE:
1. **Botão "Novo fornecedor"** NÃO aparece
2. **Opção "Editar"** NÃO aparece no dropdown
3. **Opção "Excluir"** NÃO aparece no dropdown
4. **Modificar dados** cadastrais de fornecedores
5. **Criar novos cadastros** de fornecedores
6. **Excluir fornecedores** do sistema

#### 🎯 MENU DE AÇÕES PARA CI:
- ✅ **Visualizar** (único item no dropdown)

---

## 🔍 FLUXO DE TRABALHO CORRETO

### Cenário: CI precisa consultar dados de fornecedor

**ANTES de aprovar um pagamento:**

1. CI acessa **Central de Aprovações**
2. Vê pagamento pendente para "Produtora XYZ Ltda"
3. Clica em **Fornecedores** na sidebar
4. Busca por "Produtora XYZ"
5. Clica em **Visualizar** (ícone de olho)
6. **Consulta** dados bancários e histórico
7. Valida se está tudo correto
8. Volta para **Central de Aprovações**
9. Aprova ou reprova o pagamento

**Se encontrar erro nos dados:**
- CI **NÃO corrige** diretamente
- CI **notifica** Financeiro ou Admin
- Financeiro/Admin **corrige** o cadastro
- CI **valida** novamente e aprova

---

## 🔐 RESPONSABILIDADES POR PERFIL

### Cadastro de Fornecedores

| Perfil | Responsabilidade |
|--------|------------------|
| **Administrador** | Gestão geral, cadastros especiais |
| **Financeiro** | Dados bancários, validação fiscal |
| **PEI** | Cadastro ao criar contratações |

### Validação de Fornecedores

| Perfil | Responsabilidade |
|--------|------------------|
| **CI** | Auditoria, conformidade, aprovação de pagamentos |
| **CD** | Controle dedicado de projeto específico |

---

## ✅ VALIDAÇÃO DA IMPLEMENTAÇÃO

### Checklist de Testes

- [x] **CI não vê botão "Novo fornecedor"**
- [x] **CI não vê opção "Editar" no dropdown**
- [x] **CI vê e pode usar "Visualizar"**
- [x] **CI acessa tela Fornecedores pela sidebar**
- [x] **CI pode buscar e filtrar fornecedores**
- [x] **Admin vê e pode usar todos os botões**
- [x] **Financeiro vê e pode usar "Novo" e "Editar"**
- [x] **PEI vê e pode usar "Novo" e "Editar"**

---

## 📚 REFERÊNCIAS

### PRD 003 - Jornada da Controladoria Interna
- **História 1**: Visualizar Fila de Pagamentos Pendentes
- **Função**: Aprovar pagamentos após validação
- **Necessidade**: Consultar dados de fornecedores antes de aprovar

### Sidebar CI (6 telas)
1. ✅ Dashboard
2. ✅ Central de Aprovações
3. ✅ Lotes de Verba
4. ✅ **Fornecedores** (READ-ONLY)
5. ✅ Relatórios
6. ✅ Configurações

---

## 🎯 CONCLUSÃO

A implementação de acesso READ-ONLY para CI em Fornecedores:

✅ **Melhora compliance** e segregação de funções  
✅ **Mantém funcionalidade** necessária para o trabalho de CI  
✅ **Reduz riscos** de fraude e conflito de interesse  
✅ **Facilita auditorias** externas e internas  
✅ **Está alinhado** com PRD 003 e boas práticas  

**Status**: ✅ **IMPLEMENTADO E VALIDADO**

---

## 📝 HISTÓRICO DE MUDANÇAS

| Data | Versão | Mudança | Responsável |
|------|--------|---------|-------------|
| 07/12/2024 | 1.0 | Implementação READ-ONLY para CI em Fornecedores | Sistema |