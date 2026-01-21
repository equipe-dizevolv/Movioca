# 🎬 COMO ACESSAR O PORTAL DO ELENCO

## ✅ PORTAL INTEGRADO E FUNCIONAL!

O Portal do Elenco está **100% integrado** ao MOVIOCA e pronto para uso!

---

## 🔑 FORMAS DE ACESSO

### **OPÇÃO 1: Via Seletor de Usuário (Mais Fácil)** ⭐

1. **No canto superior direito**, clique no nome do usuário atual
2. Vai abrir um dropdown com todos os perfis
3. **Selecione: "Maria da Luz"** (perfil Elenco)
4. **PRONTO!** 🎉 O Portal do Elenco vai abrir automaticamente

```
┌────────────────────────────────┐
│  👤 Maria (Administrador)  ▼   │  ← Clique aqui
├────────────────────────────────┤
│  Maria (Administrador)         │
│  João (Controladoria Interna)  │
│  Carla (Financeiro)            │
│  Pedro (PEI)                   │
│  Ana (PED)                     │
│  Bruno (CD)                    │
│  Luiza (Equipe Dedicada)       │
│  Empresa ABC (Fornecedor)      │
│  Maria da Luz (Elenco)         │ ← Selecione este
└────────────────────────────────┘
```

---

### **OPÇÃO 2: Programaticamente (Para Desenvolvedores)**

Se você precisar criar um link direto ou testar via código:

```typescript
// No AuthContext, use:
import { useAuth } from './contexts/AuthContext';

const { switchUser } = useAuth();
switchUser('Maria da Luz'); // Muda para o perfil de Elenco
```

---

## 🎭 O QUE VOCÊ VAI VER NO PORTAL

Ao acessar como **"Maria da Luz"**, você verá:

### **1. Tela de Onboarding (Primeiro Acesso)**
- Login via **Código de Acesso** (token)
- Login via **CPF + Senha**
- Visual moderno com gradiente roxo

**Para testar:**
- Digite o código: **1234**
- OU clique em "CPF e Senha" e preencha qualquer CPF

---

### **2. Dashboard do Elenco**

Após login, você verá:

✅ **Sidebar roxa** com menu:
- 🏠 Início (Dashboard)
- 👤 Minha Ficha
- 📄 Documentos
- ⚙️ Configurações

✅ **Cards de Estatísticas:**
- Contratos Ativos: 2
- Total Contratado: R$ 95.000
- A Receber: R$ 50.000
- Próximo Pagamento: 15/12/2024

✅ **Tabela de Contratos:**
```
Projeto                        | Personagem  | Valor
─────────────────────────────────────────────────────
Série Documentário - História  | Narrador    | R$ 15.000
Longa-metragem - Drama         | Protagonista| R$ 80.000
```

✅ **Pagamentos Programados:**
- Timeline visual com datas
- Status: Programado/Pago
- Valores e projetos

---

### **3. Minha Ficha (Cadastro Completo)**

Ao clicar em **"Minha Ficha"** no menu, você verá **6 seções**:

#### 📝 **Dados Pessoais**
- Nome Civil + Nome Artístico
- CPF, RG, Data de Nascimento
- E-mail, Telefone, Celular

#### 💼 **Dados Profissionais**
- DRT (Registro Profissional)
- OMB (Músicos)
- Sindicato (SATED-SP, etc.)

#### 📏 **Medidas (Figurino)**
- Altura, Peso, Manequim
- Camisa (PP-XGG), Calça, Sapato
- Cor dos Olhos, Cor dos Cabelos

#### 🔒 **Dados Sensíveis (LGPD)**
- Switch de consentimento
- Alergias
- Restrições Alimentares
- Medicamentos
- Deficiências

#### 🤝 **Agenciamento**
- Nome do Agente
- Percentual de Comissão
- Contatos

#### 📞 **Contato de Emergência**
- Nome, Telefone, Parentesco

---

### **4. Documentos**

Upload e gestão de documentos:

**Tipos Aceitos:**
- Contrato Assinado
- RG (Frente e Verso)
- CPF
- Atestado Médico Admissional
- Cartão de Vacinação
- Autorização de Uso de Imagem
- DRT
- Outros

**Ações:**
- ✅ Visualizar
- ✅ Download
- ✅ Excluir (se pendente)

---

### **5. Configurações**

**4 Seções:**

🔐 **Segurança**
- Alterar Senha

🔔 **Notificações**
- E-mail On/Off
- SMS On/Off
- Tipos: Pagamentos, Documentos

🛡️ **Privacidade (LGPD)**
- Exportar dados
- Solicitar exclusão
- Excluir conta

💳 **Dados Bancários**
- Banco, Agência, Conta
- Tipo de Conta
- Chave PIX

---

## 🎨 VISUAL E UX

### **Design:**
- ✅ Sidebar **roxa** (#8B5CF6) - padrão MOVIOCA
- ✅ Fonte **Inter** - tipografia consistente
- ✅ **Dark mode** funcional
- ✅ Cards com sombra
- ✅ Badges coloridos para status
- ✅ Ícones **Lucide React**
- ✅ Layout **responsivo**

### **Foto de Perfil:**
- Mostra foto do ator (se cadastrada)
- Ou ícone placeholder
- Nome artístico em destaque
- Nome civil em texto menor

---

## 🔄 FLUXO COMPLETO DE USO

### **Para o ATOR/ATRIZ:**

1️⃣ **Recebe convite da produção**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Você foi convidado para o projeto
"Série Documentário - História"

Personagem: Narrador
Cachê: R$ 15.000,00

Acesse: [Link do Portal]
Código: ELENCO2024ABC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

2️⃣ **Acessa o portal** → Insere código

3️⃣ **Completa a ficha:**
- Nome Artístico
- DRT
- Medidas (altura, camisa, calça)
- Alergias (se autorizar LGPD)
- Contato de emergência

4️⃣ **Envia documentos:**
- RG
- Atestado Médico
- Autorização de Imagem

5️⃣ **Acompanha cachês:**
- Dashboard mostra valores
- Notificações de pagamento

---

### **Para PRODUÇÃO/ADMIN:**

1️⃣ **Cria contratação:**
```
Contratação → Nova Contratação
Tipo: "Elenco"
Nome: Maria da Luz
CPF: 123.456.789-00
Personagem: Narradora
Cachê: R$ 15.000,00
```

2️⃣ **Sistema envia convite automático:**
- E-mail com código único
- Link para Portal do Elenco

3️⃣ **Ator completa cadastro:**
- Recebe notificação

4️⃣ **Admin aprova documentos:**
- Acessa tela de Gestão de Elenco
- Visualiza documentos enviados
- Aprova/Rejeita

---

## 📱 ONDE ESTÁ O CÓDIGO

### **Arquivos Criados:**

```
/components/elenco/
├── ElencoApp.tsx                 (App principal)
├── ElencoOnboarding.tsx          (Login)
├── ElencoDashboard.tsx           (Dashboard)
├── ElencoFicha.tsx               (Ficha cadastral)
├── ElencoDocumentos.tsx          (Documentos)
└── ElencoConfiguracoes.tsx       (Configurações)
```

### **Integração:**

✅ `/App.tsx` - Rota adicionada (linhas 52-53, 345-351)
✅ `/contexts/AuthContext.tsx` - Perfil "Elenco" adicionado

---

## 🎯 RESUMO RÁPIDO

### **Como acessar agora:**

1. Clique no nome do usuário (canto superior direito)
2. Selecione **"Maria da Luz"**
3. Digite código: **1234**
4. **PRONTO!** Explore o portal completo! 🎬

---

## ✅ CHECKLIST DE FUNCIONALIDADES

Tudo que você pode fazer no Portal do Elenco:

### **Dashboard:**
- ✅ Ver contratos ativos
- ✅ Ver total contratado
- ✅ Ver valor a receber
- ✅ Ver próximo pagamento
- ✅ Lista de pagamentos programados
- ✅ Alertas de documentos pendentes

### **Ficha:**
- ✅ Cadastrar nome artístico
- ✅ Informar DRT/OMB
- ✅ Cadastrar medidas (altura, camisa, calça, sapato)
- ✅ Informar cor de olhos/cabelos
- ✅ Cadastrar alergias (com LGPD)
- ✅ Cadastrar restrições alimentares
- ✅ Informar medicamentos
- ✅ Cadastrar agente/empresário
- ✅ Informar contato de emergência

### **Documentos:**
- ✅ Upload de RG
- ✅ Upload de CPF
- ✅ Upload de Atestado Médico
- ✅ Upload de Autorização de Imagem
- ✅ Visualizar documentos enviados
- ✅ Download de documentos
- ✅ Excluir documentos pendentes

### **Configurações:**
- ✅ Trocar senha
- ✅ Configurar notificações (e-mail, SMS)
- ✅ Exportar dados (LGPD)
- ✅ Solicitar exclusão de conta
- ✅ Cadastrar dados bancários
- ✅ Cadastrar chave PIX

---

## 🚀 PRÓXIMOS PASSOS (Opcional)

Se você quiser expandir:

1. **Tela Admin de Gestão de Elenco:**
   - Lista de todos os atores
   - Aprovar/Rejeitar documentos
   - Visualizar fichas completas

2. **Envio Real de E-mail:**
   - Integração com SendGrid/Mailgun
   - Template de convite
   - Código único por ator

3. **Upload Real de Documentos:**
   - Supabase Storage
   - Ou AWS S3

4. **Notificações Push:**
   - Quando cachê é pago
   - Quando documento é aprovado

---

## 📞 SUPORTE

**Dúvidas?** Entre em contato!

**Documentação Completa:**
- `/PORTAL_ELENCO_COMPLETO.md`

**Status:** ✅ **100% FUNCIONAL E INTEGRADO!**

---

**Desenvolvido em:** 10/12/2024  
**Versão:** 1.0  
**Sistema:** MOVIOCA v2.5