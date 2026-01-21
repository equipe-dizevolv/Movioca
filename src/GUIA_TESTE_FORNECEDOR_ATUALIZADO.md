# 🧪 GUIA DE TESTE ATUALIZADO - PORTAL DO FORNECEDOR

## ✅ ATUALIZAÇÃO IMPORTANTE

O Portal do Fornecedor agora usa os **MESMOS componentes** de Sidebar e Header dos outros perfis do sistema!

---

## 🔐 Como Acessar

### **Opção 1: Login como Fornecedor**
1. Ir para a tela de login
2. Usar as credenciais:
   - **Usuário:** `fornecedor`
   - **Senha:** `1234`
3. O sistema automaticamente redireciona para o Portal do Fornecedor

### **Opção 2: Trocar de Perfil (se já logado)**
1. Clicar no **avatar do usuário** (canto superior direito)
2. No dropdown, clicar em **"Empresa ABC - Fornecedor"**
3. O sistema alterna para o perfil Fornecedor

---

## ✅ O QUE VOCÊ DEVE VER AGORA

### **1. SIDEBAR (Esquerda - ROXA IGUAL AOS OUTROS PERFIS)**
- ✅ **Fundo roxo padrão** (#8B5CF6)
- ✅ **Logo:** "Movioca" (branco, topo)
- ✅ **4 menus visíveis:**
  1. 📊 Dashboard
  2. 👤 Meus Dados
  3. 💰 Pagamentos
  4. 📄 Documentos
- ✅ **Footer:** "© 2025 Movioca. Todos os direitos reservados."

**IMPORTANTE:** A sidebar é IDÊNTICA à dos outros perfis, apenas mostra os 4 menus específicos do Fornecedor.

---

### **2. HEADER (Topo - IDÊNTICO AOS OUTROS PERFIS)**
- ✅ **Esquerda:** "Sistema de Gestão Integrada Movioca"
- ✅ **Direita - 3 elementos:**
  
  **1. 🔔 Notificações** (sino com badge vermelho)
  - Clique para ver dropdown com 3 notificações
  - Clique em "Ver todas" para abrir painel lateral
  
  **2. 🌙 Dark Mode** (botão toggle)
  - Alterna entre modo claro e escuro
  
  **3. 👤 Menu do Usuário** (avatar + nome)
  - Mostra: "Empresa ABC" + "Fornecedor"
  - Dropdown com opções:
    - **Trocar de Perfil** → Lista todos os 8 usuários disponíveis
    - **Sair** → Faz logout

**IMPORTANTE:** O header é EXATAMENTE o mesmo dos outros perfis!

---

## 🔄 COMO TROCAR DE PERFIL

### **Passo a Passo:**
1. Clicar no **avatar circular** (canto superior direito)
2. Verá o dropdown com:
   ```
   Empresa ABC
   Fornecedor
   ▼
   ```
3. No dropdown, verá a lista de usuários:
   - ✅ Maria - Administrador
   - ✅ João - Controladoria Interna
   - ✅ Carla - Financeiro
   - ✅ Pedro - Produção Executiva Interna
   - ✅ Ana - Produção Executiva Dedicada
   - ✅ Bruno - Controladoria Dedicada
   - ✅ Luiza - Equipe Dedicada
   - ✅ **Empresa ABC - Fornecedor** ← Atual (marcado)

4. Clicar em qualquer outro usuário para trocar
5. O sistema automaticamente:
   - Troca o usuário
   - Atualiza a sidebar com os menus do novo perfil
   - Redireciona para o Dashboard do novo perfil

### **Exemplo:**
- Se clicar em "Maria - Administrador":
  - Sidebar mostra 12 menus (todos os menus admin)
  - Header continua igual
  - Dashboard mostra visão de administrador

- Se clicar em "Empresa ABC - Fornecedor":
  - Sidebar mostra 4 menus (Dashboard, Meus Dados, Pagamentos, Documentos)
  - Header continua igual
  - Dashboard mostra visão de fornecedor

---

## 📊 TELAS DO FORNECEDOR

### **1. DASHBOARD (Tela Inicial)**
Ao fazer login como Fornecedor, você verá:

- ✅ **Título:** "Dashboard" + "Resumo operacional"
- ✅ **2 Cards principais:**
  
  **Card 1: Pagamentos** (clicável, ícone roxo 💰)
  - Próxima data: 30/01/2025
  - Quantidade de pagamentos: 5
  - Valor total: R$ 187.500,00
  - *Ao clicar → vai para tela Pagamentos*

  **Card 2: Alertas de Prazo** (ícone laranja ⚠️)
  - Mostra: "Nenhum alerta no momento"
  - Mensagem: "Tudo em dia! 🎉"

- ✅ **Resumo Financeiro:**
  - Valor a Receber: R$ 150.000,00 (roxo)
  - Valor Pago: R$ 37.500,00 (verde)

- ✅ **Seção "Ações Necessárias"** (2 cards de alerta):
  
  **Alerta 1: Notas Pendentes de Envio** (amarelo 📤)
  - Badge com número: "1"
  - Texto: "Você tem parcelas aguardando o envio de nota fiscal"
  - Clicável → navega para Pagamentos

  **Alerta 2: Notas Reprovadas** (vermelho ❌)
  - Badge com número: "1"
  - Texto: "Correções necessárias em notas fiscais enviadas"
  - Clicável → navega para Pagamentos

---

### **2. MEUS DADOS**
Clique em "Meus Dados" na sidebar:

- ✅ **Barra de Progresso do Cadastro**
  - Mostra: "0%" (campos vazios)
  - Vai até 100% conforme preenche

- ✅ **4 Seções de Formulário:**

  **A) Dados Básicos**
  - CNPJ* (com máscara automática)
  - Razão Social*
  - Nome Fantasia
  - Inscrição Estadual
  - Inscrição Municipal

  **B) Endereço**
  - CEP* (com botão "Buscar" que chama ViaCEP)
  - Logradouro*, Número*, Complemento
  - Bairro*, Cidade*, UF*

  **C) Dados Bancários**
  - Banco* (dropdown)
  - Agência*, Conta Corrente*
  - Chave PIX (opcional)
  
  **Se houver pagamento agendado:**
  - 🔒 Alerta laranja: "Alteração de dados bancários bloqueada"
  - Campos desabilitados

  **D) Documentos Obrigatórios**
  - Upload Cartão CNPJ (PDF, máx 5MB)
  - Upload Comprovante Bancário (PDF, máx 5MB)

- ✅ **Botões:**
  - "Cancelar" (outline)
  - "Salvar Dados" (roxo, só habilita com 100%)

**Teste de Validação:**
1. Preencha CNPJ: `12.345.678/0001-99` → aplica máscara
2. Digite CEP: `01310-100` → clique "Buscar" → preenche endereço
3. Anexe PDF > 5MB → vê erro
4. Anexe PDF válido → vê preview
5. Complete tudo → barra vai para 100%
6. Clique "Salvar" → toast verde de sucesso

---

### **3. PAGAMENTOS**
Clique em "Pagamentos" na sidebar:

- ✅ **2 Cards de Resumo:**
  - 💰 Valor a Receber: R$ 150.000,00 (4 parcelas)
  - ✅ Valor Pago: R$ 37.500,00 (1 parcela)

- ✅ **Tabela de Parcelas** (desktop) ou **Cards** (mobile)
  
  **5 Parcelas Mockadas:**

  1. **Projeto Alpha - Parcela 1/3**
     - Data: 30/01/2025 | Valor: R$ 50.000,00
     - Status: 🟡 **Aguardando NF**
     - Botão: [Enviar NF]

  2. **Projeto Alpha - Parcela 2/3**
     - Data: 28/02/2025 | Valor: R$ 50.000,00
     - Status: 🟣 **Agendado**
     - Sem ação

  3. **Projeto Beta - Parcela Única**
     - Data: 15/01/2025 | Valor: R$ 25.000,00
     - Status: 🟢 **Pago**
     - Botão: [Comprovante]

  4. **Projeto Alpha - Entrada**
     - Data: 05/01/2025 | Valor: R$ 12.500,00
     - Status: 🔴 **Correção Solicitada**
     - Botões: [Enviar NF] [Ver Motivo]

  5. **Projeto Gamma - Parcela 1/2**
     - Data: 20/02/2025 | Valor: R$ 37.500,00
     - Status: 🔵 **Em Análise**
     - Sem ação

**Testes:**
- Clicar "Enviar NF" → abre modal
- Clicar "Ver Motivo" → toast com erro
- Clicar "Comprovante" → toast de download

---

### **4. MODAL DE ENVIO DE NF**
Ao clicar em "Enviar NF":

- ✅ **Resumo da Parcela** (card cinza)
  - Projeto, Referência, Valor, Vencimento

- ✅ **Dados do Tomador** (card azul com ℹ️)
  - Razão Social: Movioca Produções Audiovisuais Ltda
  - CNPJ: 12.345.678/0001-99
  - Endereço completo
  - Código do Projeto: PROJ-2025-001

- ✅ **Formulário:**
  - Número da Nota*
  - Data de Emissão* (datepicker)
  - Valor da Nota* (R$)
  - Upload arquivo* (PDF ou XML, máx 10MB)

- ✅ **Botões:**
  - "Cancelar"
  - "Enviar para Análise" (roxo)

**Teste:**
1. Preencher campos
2. Anexar PDF
3. Clicar "Enviar"
4. Ver toast verde
5. Status muda para "Em Análise"

---

### **5. DOCUMENTOS**
Clique em "Documentos" na sidebar:

- ✅ **Filtros:**
  - 🔍 Busca por nome/projeto
  - Dropdown: Status (Todos/Vigente/Encerrado/Pendente)

- ✅ **Tabela de Contratos** (desktop) ou **Cards** (mobile)
  
  **4 Contratos Mockados:**
  1. Contrato de Locação de Equipamentos - Projeto Alpha
     - Status: 🟢 Vigente | Valor: R$ 150.000,00
     - Ações: [Visualizar] [Baixar]

  2. Contrato de Prestação de Serviços - Projeto Beta
     - Status: 🟢 Vigente | Valor: R$ 25.000,00
     - Ações: [Visualizar] [Baixar]

  3. Contrato de Locação de Veículos - Projeto Gamma
     - Status: ⚫ Encerrado | Valor: R$ 18.000,00
     - Ações: [Visualizar] [Baixar]

  4. Aditivo Contratual - Projeto Alpha
     - Status: 🟢 Vigente | Valor: R$ 12.500,00
     - Ações: [Visualizar] [Baixar]

**Testes:**
- Buscar "Alpha" → filtra
- Filtrar "Encerrado" → mostra 1
- Clicar "Visualizar" → toast
- Clicar "Baixar" → toast

---

## 📱 RESPONSIVIDADE

### **Testando Mobile:**
1. Redimensionar navegador < 768px
2. OU usar F12 → Ctrl+Shift+M (device toolbar)

### **Mudanças em Mobile:**
- ✅ Tabelas viram CARDS empilhados
- ✅ Sidebar some (pode ter menu hambúrguer)
- ✅ Header compacto
- ✅ Botões full-width

---

## 🌙 DARK MODE

### **Como Testar:**
1. Clicar no botão 🌙 no header
2. Página alterna entre claro/escuro

### **Verificações:**
- ✅ Background escuro
- ✅ Texto claro
- ✅ Sidebar continua roxa
- ✅ Cards com contraste
- ✅ Badges mantêm cores

---

## ✅ CHECKLIST FINAL

### **Estrutura:**
- [ ] Sidebar ROXA idêntica aos outros perfis
- [ ] Header IDÊNTICO aos outros perfis
- [ ] 4 menus na sidebar: Dashboard, Meus Dados, Pagamentos, Documentos
- [ ] Trocar de perfil funciona (dropdown do avatar)
- [ ] Dark mode funciona

### **Funcionalidades:**
- [ ] Dashboard mostra resumo e alertas
- [ ] Meus Dados: formulário completo com validações
- [ ] Pagamentos: tabela com 5 status + modal de NF
- [ ] Documentos: lista de contratos com filtros
- [ ] Notificações funcionam (sino no header)

### **Validações:**
- [ ] CNPJ aplica máscara
- [ ] CEP busca endereço
- [ ] Upload valida tipo e tamanho
- [ ] Barra de progresso atualiza
- [ ] Status aparecem com cores corretas

---

## ❌ PROBLEMAS E SOLUÇÕES

### **"Não vejo as mudanças"**
✅ **Solução:** 
1. Fazer hard refresh: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
2. Limpar cache do navegador
3. Recarregar a página

### **"Não consigo trocar de perfil"**
✅ **Solução:**
1. Clicar no AVATAR (círculo roxo com iniciais)
2. NÃO clicar no nome, clicar no avatar
3. Ver dropdown com lista de usuários
4. Clicar em "Empresa ABC - Fornecedor"

### **"Sidebar está diferente"**
✅ **Verificar:**
- Está logado como Fornecedor?
- Sidebar deve ser ROXA igual aos outros
- Se estiver verde ou azul, não é o Fornecedor

### **"Header está diferente"**
✅ **Verificar:**
- Header deve ter: Logo + Sino + Lua + Avatar
- Altura: 64px (h-16)
- Fundo branco (claro) ou roxo escuro (dark mode)

---

## 🎉 TUDO FUNCIONANDO?

Se você vê:
1. ✅ Sidebar ROXA com 4 menus
2. ✅ Header IDÊNTICO aos outros perfis
3. ✅ Troca de perfil funciona (dropdown do avatar)
4. ✅ 5 telas completas e funcionais
5. ✅ Dark mode funciona
6. ✅ Notificações funcionam

**🎊 IMPLEMENTAÇÃO 100% CONCLUÍDA E INTEGRADA!**

---

## 🚀 DIFERENÇAS DA VERSÃO ANTERIOR

### **ANTES:**
- ❌ Sidebar e Header personalizados (diferentes dos outros)
- ❌ Layout próprio (FornecedorLayout)
- ❌ Sem troca de perfil
- ❌ Visual inconsistente

### **AGORA:**
- ✅ Usa MESMA Sidebar e Header do sistema
- ✅ Integração completa com AuthContext
- ✅ Troca de perfil funciona perfeitamente
- ✅ Visual 100% consistente com outros perfis

---

**Desenvolvido para Sistema MOVIOCA**  
**Versão:** 2.0.0 (Integrada)  
**Data:** 05/12/2025
