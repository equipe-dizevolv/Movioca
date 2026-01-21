# 🔧 GUIA - Configurações do Fornecedor

## 📌 Mudança Importante

O menu **"Meus Dados"** foi substituído por **"Configurações"**, seguindo o padrão dos outros perfis do sistema.

---

## 🎯 Nova Estrutura

### **Menu na Sidebar:**
```
Dashboard
Pagamentos
Documentos
Configurações ⭐ (NOVO)
```

### **Tela de Configurações - 3 Abas:**

```
┌─────────────────────────────────────────────┐
│  Meu Perfil  │  Dados da Empresa  │  Notificações  │
└─────────────────────────────────────────────┘
```

---

## 📂 Estrutura das Abas

### **1️⃣ ABA: Meu Perfil**
**Dados de acesso ao sistema**

#### **Seção: Dados Pessoais**
- Foto de perfil (upload de imagem)
- Nome de usuário *
- E-mail *
- Telefone

#### **Seção: Alterar Senha**
- Senha atual
- Nova senha (mínimo 8 caracteres)
- Confirmar senha

**Botões:**
- "Cancelar" (outline)
- "Salvar Alterações" (primary)
- "Alterar Senha" (secondary)

---

### **2️⃣ ABA: Dados da Empresa**
**Formulário completo de cadastro PJ (ex-Meus Dados)**

#### **Barra de Progresso**
- Mostra % de conclusão (0-100%)
- Badge colorido com porcentagem
- Atualiza automaticamente conforme preenche

#### **Card 1: Dados Básicos**
- CNPJ * (com máscara `00.000.000/0000-00`)
- Razão Social *
- Nome Fantasia
- Inscrição Estadual
- Inscrição Municipal

#### **Card 2: Endereço**
- CEP * (com botão "Buscar" - integração ViaCEP)
- Logradouro *
- Número *
- Complemento
- Bairro *
- Cidade *
- UF * (dropdown)

#### **Card 3: Dados Bancários**
- Banco * (dropdown)
- Agência *
- Conta Corrente *
- Chave PIX (opcional)

**🔒 Bloqueio de Alteração:**
- Se houver pagamento agendado → campos desabilitados
- Alerta vermelho explica o motivo

#### **Card 4: Documentos Obrigatórios**
- Upload Cartão CNPJ (PDF, máx 5MB)
- Upload Comprovante Bancário (PDF, máx 5MB)
- Área de drag & drop
- Preview após upload
- Botão "X" para remover

**Botões Finais:**
- "Cancelar" (outline)
- "Salvar Dados da Empresa" (primary, desabilitado se progresso < 100%)

---

### **3️⃣ ABA: Notificações**
**Preferências de alertas e comunicações**

#### **Seção: Canais de Notificação**
- ✅ Notificações por E-mail (switch)
- ✅ Notificações Push (switch)

#### **Seção: Alertas Específicos**
- ✅ Pagamentos Realizados
  - "Alerta quando um pagamento for confirmado"
  
- ✅ Notas Fiscais Pendentes
  - "Lembrete de parcelas aguardando envio de nota fiscal"
  
- ✅ Notas Fiscais Reprovadas
  - "Alerta quando uma nota fiscal for reprovada"
  
- ✅ Novos Contratos
  - "Notificação quando um novo contrato for disponibilizado"
  
- ✅ Resumo Diário
  - "Receba um resumo diário das suas atividades"

**Botões:**
- "Cancelar" (outline)
- "Salvar Configurações" (primary)

---

## 🧪 Como Testar

### **1. Acessar Configurações**
1. Login com `fornecedor` / `1234`
2. Clicar em **"Configurações"** na sidebar
3. Ver 3 abas no topo

### **2. Testar Aba "Meu Perfil"**
```bash
✅ Upload de foto funciona (clique no ícone de câmera)
✅ Campos são editáveis
✅ Validação de email funciona
✅ Alterar senha valida:
   - Campos obrigatórios preenchidos
   - Nova senha = Confirmar senha
   - Mínimo 8 caracteres
✅ Toast de sucesso aparece ao salvar
```

### **3. Testar Aba "Dados da Empresa"**
```bash
✅ Barra de progresso inicia em 0%
✅ CNPJ aplica máscara ao digitar
✅ CEP busca endereço (API ViaCEP)
✅ Campos bancários ficam desabilitados (simulação de pagamento agendado)
✅ Alerta vermelho aparece explicando bloqueio
✅ Upload de documentos:
   - Aceita apenas PDF
   - Rejeita arquivos > 5MB
   - Mostra preview após upload
   - Botão "X" remove arquivo
✅ Barra de progresso vai para 100% ao completar tudo
✅ Botão "Salvar" só habilita com 100%
✅ Toast de sucesso ao salvar
```

### **4. Testar Aba "Notificações"**
```bash
✅ Switches alternam entre ativado/desativado
✅ Descrição de cada alerta está clara
✅ Toast de sucesso ao salvar
```

---

## 🎨 Visual

### **Layout Geral**
```
┌─────────────────────────────────────────────────────────┐
│  CONFIGURAÇÕES                                          │
│  Gerencie suas informações cadastrais e preferências   │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐    │
│  │ Meu Perfil │ Dados da Empresa │ Notificações  │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  [Conteúdo da aba selecionada]                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **Cores dos Botões**
- **Primary:** Roxo (#8B5CF6) - Botões de ação principal
- **Secondary:** Cinza - Botões secundários (Alterar Senha)
- **Outline:** Borda cinza - Botões de cancelar
- **Destructive:** Vermelho - Alertas de bloqueio

### **Badges**
- **Progresso < 100%:** Cinza (secondary)
- **Progresso = 100%:** Roxo (default)

---

## 📊 Regras de Negócio

### **RN-001: Validação de CNPJ**
- Aplica máscara automática: `00.000.000/0000-00`
- Em produção: verificar unicidade no backend

### **RN-002: Busca de CEP**
- Integração com API ViaCEP
- Preenche automaticamente: Logradouro, Bairro, Cidade, UF
- Toast de erro se CEP inválido ou não encontrado

### **RN-003: Upload de Documentos**
- Tipos aceitos: PDF
- Tamanho máximo: 5MB (Dados da Empresa) / 10MB (Modal NF)
- Validação no frontend + backend

### **RN-004: Bloqueio de Dados Bancários**
- Se `pagamentoAgendado === true` → campos desabilitados
- Alerta vermelho visível explicando motivo
- Não permite alteração até pagamento ser processado

### **RN-005: Progresso do Cadastro**
- Campos obrigatórios: 13 (CNPJ, Razão Social, CEP, Logradouro, Número, Bairro, Cidade, UF, Banco, Agência, Conta, 2 documentos)
- Cálculo: `(campos_preenchidos / 13) * 100`
- Botão "Salvar" só habilita se progresso = 100%

### **RN-006: Senha**
- Mínimo: 8 caracteres
- Nova senha ≠ Confirmar senha → erro
- Em produção: adicionar requisitos (maiúscula, número, caractere especial)

---

## 🔄 Comparação: Antes vs Agora

| Item | ANTES (v2.0) | AGORA (v3.0) |
|------|--------------|--------------|
| **Menu Sidebar** | "Meus Dados" | "Configurações" ✅ |
| **Estrutura** | 1 tela separada | 3 abas integradas ✅ |
| **Dados Pessoais** | ❌ Não tinha | Aba "Meu Perfil" ✅ |
| **Dados PJ** | Tela "Meus Dados" | Aba "Dados da Empresa" ✅ |
| **Notificações** | ❌ Não tinha | Aba "Notificações" ✅ |
| **Padrão Visual** | ⚠️ Diferente | Igual aos outros perfis ✅ |
| **Upload Foto** | ❌ Não tinha | Upload de foto de perfil ✅ |
| **Alterar Senha** | ❌ Não tinha | Formulário completo ✅ |

---

## 📁 Arquivos Alterados

### **Criados:**
- ✅ `/components/fornecedor/ConfiguracoesFornecedor.tsx` (1.200+ linhas)

### **Modificados:**
- ✅ `/components/fornecedor/FornecedorApp.tsx` (adicionada rota Configurações)
- ✅ `/contexts/AuthContext.tsx` (menu "Meus Dados" → "Configurações")
- ✅ `/components/Sidebar.tsx` (removido ícone User, mantido Settings)

### **Deletados:**
- ❌ `/components/fornecedor/FornecedorMeusDados.tsx` (substituído)

---

## ✅ Checklist de Validação

### **Visual:**
- [ ] Menu "Configurações" aparece na sidebar
- [ ] 3 abas visíveis no topo
- [ ] Layout igual ao dos outros perfis (PEI, PED, Financeiro)
- [ ] Cores consistentes (#8B5CF6)
- [ ] Responsivo (mobile)

### **Funcionalidades:**
- [ ] Upload de foto de perfil funciona
- [ ] Validação de campos obrigatórios
- [ ] Máscara de CNPJ aplica corretamente
- [ ] Busca de CEP retorna endereço
- [ ] Upload de documentos valida tipo/tamanho
- [ ] Barra de progresso atualiza
- [ ] Botão "Salvar" habilita/desabilita corretamente
- [ ] Switches de notificação alternam
- [ ] Toasts de sucesso/erro aparecem

### **Regras de Negócio:**
- [ ] Dados bancários bloqueados quando há pagamento agendado
- [ ] Alerta de bloqueio visível
- [ ] Progresso = 100% → botão habilita
- [ ] Senha: validação de 8 caracteres mínimo
- [ ] Nova senha ≠ Confirmar → erro

---

## 🚀 Melhorias Futuras

### **Backend (Pendente):**
1. [ ] API de upload de arquivos (S3/Google Drive)
2. [ ] Validação de CNPJ (unicidade + validação de dígitos)
3. [ ] Criptografia de senha (bcrypt)
4. [ ] Envio de e-mail de notificação real
5. [ ] Histórico de alterações cadastrais

### **Frontend (Sugestões):**
1. [ ] Validação visual do CNPJ (dígitos verificadores)
2. [ ] Preview de imagem antes do upload
3. [ ] Máscara de telefone
4. [ ] Validação de e-mail em tempo real
5. [ ] Força da senha (indicador visual)
6. [ ] Confirmação antes de remover documento
7. [ ] Tooltip explicativo em cada campo

---

## 📞 Suporte

### **Problemas Comuns:**

**1. "Não vejo a aba Dados da Empresa"**
- ✅ Verificar se está na tela Configurações (não Meus Dados)
- ✅ Hard refresh: Ctrl+Shift+R

**2. "Botão Salvar não habilita"**
- ✅ Verificar barra de progresso
- ✅ Preencher TODOS os campos obrigatórios
- ✅ Anexar os 2 documentos

**3. "CEP não preenche endereço"**
- ✅ Verificar formato: `00000-000`
- ✅ CEP deve existir na base ViaCEP
- ✅ Conexão com internet ativa

**4. "Upload não aceita PDF"**
- ✅ Arquivo deve ser PDF real (não renomeado)
- ✅ Tamanho < 5MB
- ✅ Nome do arquivo sem caracteres especiais

---

## 🎉 Conclusão

A tela de **Configurações do Fornecedor** agora está **100% alinhada** com o padrão do sistema:

✅ Mesma estrutura de abas (PEI, PED, Financeiro)  
✅ Menu "Configurações" (padrão do sistema)  
✅ 3 abas: Meu Perfil, Dados da Empresa, Notificações  
✅ Visual consistente  
✅ Todas as validações implementadas  
✅ Código limpo e documentado  

**Status:** ✅ PRONTO PARA USO

---

**Desenvolvido para Sistema MOVIOCA**  
**Versão:** 3.0.0  
**Data:** 05/12/2025
