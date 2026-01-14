# CHECKLIST DE DESENVOLVIMENTO SGIM - 14/01/2026

**Status Resumido:** As "carcaças" (telas) estão prontas. O "motor" (banco de dados e lógica) ainda não existe.

## ✅ O QUE JÁ ESTÁ FEITO (Frontend / Visual)
*Telas navegáveis e interface visual conforme documentação.*

### 1. Estrutura Geral
- [x] **Navegação:** Menu lateral completo com os 12 itens do sistema.
- [x] **Dashboard:** Tela inicial com gráficos e resumos (Pagamentos da semana, PC em aberto).
- [x] **Tema Visual:** Cores e identidade da Movioca aplicadas.

### 2. Módulos Principais (Telas Criadas)
- [x] **Login/Cadastro:** Telas visuais de entrada e registro.
- [x] **Projetos:** Lista de projetos e tela de cadastro de novo projeto (com campos de detalhes da produção).
- [x] **Orçamento (Módulo 1):** Tela de planilha orçamentária com estrutura de itens e subitens.
- [x] **Contratação (Módulo 2):** Tela de listagem de contratos.
- [x] **Pagamentos (Módulo 3):** Tela de fluxo de aprovação (visualização das 4 etapas).
- [x] **Verbas (Módulo 4):** Tela para solicitação de verba e prestação de contas.
- [x] **Portal Parceiro (Módulo 5):** Tela visual do fornecedor externo.

### 3. Ferramentas de Apoio
- [x] **Relatórios:** Tela de "Cost Report" visual.
- [x] **Usuários:** Tela de listagem de usuários com os 8 perfis separados.
- [x] **Plano de Contas:** Tela para visualizar modelos de orçamento.

---

## ❌ O QUE FALTA FAZER (Backend e Lógica Real)
*Funcionalidades que exigem servidor, banco de dados e integrações.*

### 1. Banco de Dados e Backend
- [ ] **Criar o Banco de Dados:** Modelagem e criação das tabelas (Projetos, Usuários, Orçamentos, etc.). Atualmente os dados são estáticos e resetam ao atualizar a página.
- [ ] **Configurar Servidor (Laravel/Supabase):** Implementação da API e lógica do servidor.
- [ ] **Autenticação Real:** Implementação de login seguro, sessões, recuperação de senha e controle de acesso por perfil (ACL).
- [ ] **Persistência de Arquivos:** Sistema de upload e armazenamento real para Notas Fiscais, Contratos e Comprovantes.

### 2. Regras de Negócio (Lógica do Sistema)
- [ ] **Cálculos Automáticos:** O sistema ainda não recalcula totais e saldos dinamicamente ao alterar valores.
- [ ] **Controle de Saldos:** Travas para impedir gastos superiores ao saldo da rubrica.
- [ ] **Workflow Funcional:** A transição real de estados (Aprovar -> Próximo Nível) e notificações automáticas.
- [ ] **Regra dos 50% (Verbas):** Bloqueio real de novas solicitações caso a regra não seja cumprida (atualmente é apenas visual).

### 3. Integrações e Avançado
- [ ] **Integração OMIE:** Conexão com o ERP para troca de dados financeiros.
- [ ] **Versionamento de Orçamento:** Histórico real de versões e snapshots ("Congelar Orçamento").
- [ ] **Exportação de Relatórios:** Geração real de PDFs e Excel com dados do banco.

---

### 📝 RESUMO DA AUDITORIA
O projeto possui um **protótipo de alta fidelidade** navegável (Frontend). Visualmente, o sistema está conforme o esperado, com todas as telas desenhadas. O próximo passo crítico é o desenvolvimento do **Backend**, onde a lógica de negócios, cálculos, segurança e persistência de dados serão implementados. Aproximadamente 60-70% do esforço de engenharia de software ainda é necessário para tornar o sistema operacional.
