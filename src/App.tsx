import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// MOVIOCA - Sistema de Gestão de Projetos Audiovisuais
import Dashboard from "./components/screens/Dashboard";
import DashboardPEI from "./components/screens/DashboardPEI";
import DashboardPED from "./components/screens/DashboardPED";
import DashboardFinanceiro from "./components/screens/DashboardFinanceiro";
import DashboardControladoriaInterna from "./components/screens/DashboardControladoriaInterna";
import DashboardControladoriaDedicada from "./components/screens/DashboardControladoriaDedicada";
import DashboardControladoriaDedicadaNew from "./components/screens/DashboardControladoriaDedicadaNew";
import DashboardEquipeDedicada from "./components/screens/DashboardEquipeDedicada";
import CentralAprovacoes from "./components/screens/CentralAprovacoes";
import MesaDeAnalise from "./components/screens/MesaDeAnalise";
import AprovacaoLotesVerba from "./components/screens/AprovacaoLotesVerba";
import TriagemPagamentos from "./components/screens/TriagemPagamentos";
import ConferenciaVerba from "./components/screens/ConferenciaVerba";
import MesaConferenciaCD from "./components/screens/MesaConferenciaCD";
import MatrizOrcamentoPED from "./components/screens/MatrizOrcamentoPED";
import ContratosPED from "./components/screens/ContratosPED";
import Projetos from "./components/screens/Projetos";
import ProjetoDetalhes from "./components/screens/ProjetoDetalhes";
import PlanoDeContas from "./components/screens/PlanoDeContas";
import Orcamento from "./components/screens/Orcamento";
import Contratacao from "./components/screens/Contratacao";
import NovaContratacao from "./components/screens/NovaContratacao";
import EditarContratacao from "./components/screens/EditarContratacao";
import Fornecedores from "./components/screens/Fornecedores";
import Pagamentos from "./components/screens/Pagamentos";
import ControleDeVerba from "./components/screens/ControleDeVerba";
import Verbas from "./components/screens/Verbas";
import Relatorios from "./components/screens/Relatorios";
import HistoricoGlosas from "./components/screens/HistoricoGlosas";
import Usuarios from "./components/screens/Usuarios";
import Integracoes from "./components/screens/Integracoes";
import Documentos from "./components/screens/Documentos";
import Configuracoes from "./components/screens/Configuracoes";
import ConfiguracoesPED from "./components/screens/ConfiguracoesPED";
import ConfiguracoesPEI from "./components/screens/ConfiguracoesPEI";
import ConfiguracoesFinanceiro from "./components/screens/ConfiguracoesFinanceiro";
import ConfiguracoesControladoriaInterna from "./components/screens/ConfiguracoesControladoriaInterna";
import ConfiguracoesControladoriaDedicada from "./components/screens/ConfiguracoesControladoriaDedicada";
import ConfiguracoesEquipeDedicada from "./components/screens/ConfiguracoesEquipeDedicada";
import MeusCartoes from "./components/screens/MeusCartoes";
import LancarDespesas from "./components/screens/LancarDespesas";
import PrestacaoContas from "./components/screens/PrestacaoContas";
import PainelReembolsos from "./components/screens/PainelReembolsos";
import FormularioCadastral from "./components/screens/FormularioCadastral";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import PublicRoutes from "./components/PublicRoutes";
import FornecedorApp from "./components/fornecedor/FornecedorApp";
import ElencoApp from "./components/elenco/ElencoApp";
import GestaoElenco from "./components/screens/GestaoElenco";
import GestaoFinanceira from "./components/screens/GestaoFinanceira";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProjectFilterProvider } from "./contexts/ProjectFilterContext";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const { isAuthenticated, currentUser } = useAuth();
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const [authScreen, setAuthScreen] = useState<"login" | "forgot-password">("login");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [contratacaoEmEdicao, setContratacaoEmEdicao] = useState<any>(null);
  const [accessingElenco, setAccessingElenco] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Verifica se está acessando uma rota pública via URL
  const [publicRoute, setPublicRoute] = useState<string | null>(null);

  useEffect(() => {
    // Simula detecção de rota pública via URL hash
    const hash = window.location.hash.replace("#", "");
    if (hash === "formulario-cadastral") {
      setPublicRoute("formulario-cadastral");
    }
  }, []);

  const handleCadastro = () => {
    setPublicRoute("formulario-cadastral");
    window.location.hash = "formulario-cadastral";
  };

  // Aplica a classe dark no elemento html para que os portals também recebam
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setCurrentScreen("ProjetoDetalhes");
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentScreen("Projetos");
  };

  const handleNovaContratacao = () => {
    setCurrentScreen("NovaContratacao");
  };

  const handleEditarContratacao = (contratacao: any) => {
    setContratacaoEmEdicao(contratacao);
    setCurrentScreen("EditarContratacao");
  };

  const handleSalvarContratacaoEditada = (contratacao: any) => {
    // Aqui você salvaria a contratação editada no backend
    console.log("Contratação salva:", contratacao);
    setContratacaoEmEdicao(null);
    setCurrentScreen("Contratação");
  };

  const handleBackToContratacao = () => {
    setContratacaoEmEdicao(null);
    setCurrentScreen("Contratação");
  };

  const handleNavigate = (screen: string, projectId?: string) => {
    setCurrentScreen(screen);
    // Futuramente, podemos usar projectId para filtrar dados específicos
    if (projectId) {
      console.log("Navegando para", screen, "do projeto", projectId);
    }
  };

  const renderScreen = () => {
    const isPED = currentUser?.role === "Produção Executiva Dedicada";
    const isPEI = currentUser?.role === "Produção Executiva Interna";
    const isFinanceiro = currentUser?.role === "Financeiro";
    const isControladoriaInterna = currentUser?.role === "Controladoria Interna";
    const isControladoriaDedicada = currentUser?.role === "Controladoria Dedicada";
    const isEquipeDedicada = currentUser?.role === "Equipe Dedicada";

    switch (currentScreen) {
      case "Dashboard":
        // Dashboard específico por perfil
        if (isPEI) {
          return <DashboardPEI onNavigate={handleNavigate} />;
        }
        if (isPED) {
          return <DashboardPED onNavigate={handleNavigate} />;
        }
        if (isFinanceiro) {
          return <DashboardFinanceiro onNavigate={handleNavigate} />;
        }
        if (isControladoriaInterna) {
          return <DashboardControladoriaInterna onNavigate={handleNavigate} />;
        }
        if (isControladoriaDedicada) {
          return <DashboardControladoriaDedicadaNew onNavigate={handleNavigate} />;
        }
        if (isEquipeDedicada) {
          return <DashboardEquipeDedicada onNavigate={handleNavigate} />;
        }
        return <Dashboard />;
      
      case "Orçamento - PED":
        // Matriz filtrada para PED
        return <MatrizOrcamentoPED onNavigate={handleNavigate} />;
      
      case "Contratos - PED":
        // Contratos filtrados para PED
        return <ContratosPED onNavigate={handleNavigate} />;
      
      // === TELAS ESPECÍFICAS CONTROLADORIA INTERNA (PRD 003) ===
      case "Central de Aprovações":
        return <CentralAprovacoes onNavigate={handleNavigate} onAnalisar={(pagamentoId) => {
          setCurrentScreen("Mesa de Análise");
        }} />;
      
      case "Mesa de Análise":
        return <MesaDeAnalise 
          onVoltar={() => setCurrentScreen("Central de Aprovações")}
          onProximoPagamento={() => {
            // Carrega próximo pagamento na fila
          }}
        />;
      
      case "Aprovação Lotes Verba":
        return <AprovacaoLotesVerba onVoltar={() => setCurrentScreen("Verbas")} />;
      
      case "Lotes de Verba":
        return <AprovacaoLotesVerba onVoltar={() => setCurrentScreen("Dashboard")} />;
      
      case "Triagem de Pagamentos":
        return <TriagemPagamentos onVoltar={() => setCurrentScreen("Central de Aprovações")} />;
      
      case "Conferência de Verba":
        return <ConferenciaVerba onVoltar={() => setCurrentScreen("Central de Aprovações")} onNavigate={handleNavigate} />;
      
      case "Mesa de Conferência CD":
        return <MesaConferenciaCD onNavigate={handleNavigate} />;
      
      case "Projetos":
        return <Projetos onViewProject={handleViewProject} />;
      case "ProjetoDetalhes":
        return <ProjetoDetalhes projeto={selectedProject} onBack={handleBackToProjects} />;
      case "Plano de Contas":
        return <PlanoDeContas />;
      case "Orçamento":
        // Se for PED, redireciona para versão filtrada
        if (isPED) {
          return <MatrizOrcamentoPED onNavigate={handleNavigate} />;
        }
        return <Orcamento />;
      case "Contratação":
        // Se for PED, redireciona para versão filtrada
        if (isPED) {
          return <ContratosPED onNavigate={handleNavigate} />;
        }
        return <Contratacao onNovaContratacao={handleNovaContratacao} onEditarContratacao={handleEditarContratacao} />;
      case "NovaContratacao":
        // Passa flag isPED para filtrar rubricas e validar saldo
        return <NovaContratacao onVoltar={handleBackToContratacao} isPED={isPED} currentUser={currentUser} />;
      case "EditarContratacao":
        if (!contratacaoEmEdicao) {
          // Se não houver contratação em edição, volta para a lista
          setCurrentScreen("Contratação");
          return <Contratacao onNovaContratacao={handleNovaContratacao} onEditarContratacao={handleEditarContratacao} />;
        }
        return <EditarContratacao contratacao={contratacaoEmEdicao} onVoltar={handleBackToContratacao} onSalvar={handleSalvarContratacaoEditada} />;
      case "Elenco & Equipe":
        return <GestaoElenco />;
      case "Fornecedores":
        return <Fornecedores />;
      case "Gestão Financeira":
        return <GestaoFinanceira />;
      case "Pagamentos":
        return <Pagamentos />;
      case "Controle de Verba":
        return <ControleDeVerba />;
      case "Verbas":
        return <ControleDeVerba />;
      case "Reembolsos":
        return <PainelReembolsos />;
      case "Relatórios":
        // Se for Controladoria Interna, redireciona para Histórico de Glosas
        if (isControladoriaInterna) {
          return <HistoricoGlosas />;
        }
        return <Relatorios />;
      case "Histórico de Glosas":
        return <HistoricoGlosas />;
      case "Usuários":
        return <Usuarios />;
      case "Integrações":
        return <Integracoes />;
      case "Documentos":
        return <Documentos />;
      case "Configurações":
        // Redirecionamentos por perfil
        if (isControladoriaInterna) {
          return <ConfiguracoesControladoriaInterna />;
        }
        if (isControladoriaDedicada) {
          return <ConfiguracoesControladoriaDedicada />;
        }
        if (isFinanceiro) {
          return <ConfiguracoesFinanceiro />;
        }
        if (isPEI) {
          return <ConfiguracoesPEI />;
        }
        if (isPED) {
          return <ConfiguracoesPED />;
        }
        if (isEquipeDedicada) {
          return <ConfiguracoesEquipeDedicada />;
        }
        return <Configuracoes />;
      case "Configurações - PED":
        return <ConfiguracoesPED />;
      case "Configurações - PEI":
        return <ConfiguracoesPEI />;
      case "Configurações - Financeiro":
        return <ConfiguracoesFinanceiro />;
      case "Configurações - CI":
        return <ConfiguracoesControladoriaInterna />;
      case "Configurações - CD":
        return <ConfiguracoesControladoriaDedicada />;
      case "Configurações - Equipe Dedicada":
        return <ConfiguracoesEquipeDedicada />;
      case "Meus Cartões":
        return <MeusCartoes />;
      case "Lançar Despesas":
        return <LancarDespesas />;
      case "Prestação de Contas":
        return <PrestacaoContas />;
      default:
        return <Dashboard />;
    }
  };

  // Rotas públicas (não requerem autenticação)
  if (publicRoute) {
    return (
      <>
        <PublicRoutes 
          route={publicRoute} 
          onBackToLogin={() => {
            setPublicRoute(null);
            window.location.hash = "";
          }} 
        />
        <Toaster theme={darkMode ? "dark" : "light"} />
      </>
    );
  }

  // Se não estiver autenticado, mostrar telas de login/recuperação
  if (!isAuthenticated) {
    // Se está acessando o portal do elenco, mostra o ElencoApp diretamente
    if (accessingElenco) {
      return (
        <>
          <ElencoApp onBackToLogin={() => setAccessingElenco(false)} />
          <Toaster theme={darkMode ? "dark" : "light"} />
        </>
      );
    }

    if (authScreen === "forgot-password") {
      return (
        <>
          <ForgotPassword onBackToLogin={() => setAuthScreen("login")} />
          <Toaster theme={darkMode ? "dark" : "light"} />
        </>
      );
    }
    
    return (
      <>
        <Login 
          onForgotPassword={() => setAuthScreen("forgot-password")} 
          onCadastro={handleCadastro}
          onAccessElenco={() => setAccessingElenco(true)}
        />
        <Toaster theme={darkMode ? "dark" : "light"} />
      </>
    );
  }

  // Se for fornecedor, redireciona para o Portal do Fornecedor
  if (currentUser?.role === "Fornecedor") {
    return (
      <>
        <FornecedorApp />
        <Toaster theme={darkMode ? "dark" : "light"} />
      </>
    );
  }

  // Se for elenco, redireciona para o Portal do Elenco
  if (currentUser?.role === "Elenco") {
    return (
      <>
        <ElencoApp />
        <Toaster theme={darkMode ? "dark" : "light"} />
      </>
    );
  }

  // Aplicação principal (Admin e outros perfis)
  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setMobileMenuOpen(false); // Fecha o menu ao navegar
        }}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 overflow-auto bg-background">
          {renderScreen()}
        </main>
      </div>
      <Toaster theme={darkMode ? "dark" : "light"} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectFilterProvider>
        <AppContent />
      </ProjectFilterProvider>
    </AuthProvider>
  );
}