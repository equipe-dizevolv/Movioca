/**
 * MOVIOCA - Portal do Elenco/PF
 * 
 * Portal dedicado para atores, atrizes e equipe tecnica (Pessoa Fisica).
 * 
 * Funcionalidades:
 * - Dashboard com caches e contratos
 * - Ficha cadastral estendida (Nome Artistico, DRT, medidas, alergias)
 * - Visualizacao de contratos e pagamentos
 * - Upload de documentos (RG, CPF, Atestado Medico, etc.)
 * - Dados sensiveis (LGPD compliant)
 * 
 * PRD 009 - Jornada de Elenco/PF
 */

import { useState, useEffect } from "react";
import HeaderSimplified from "../HeaderSimplified";
import ElencoOnboarding from "./ElencoOnboarding";
import ElencoDashboard from "./ElencoDashboard";
import ElencoFicha from "./ElencoFicha";
import ElencoDocumentos from "./ElencoDocumentos";
import ElencoConfiguracoes from "./ElencoConfiguracoes";
import { Button } from "../ui/button";
import { Home, FileText, User, Settings } from "lucide-react";

type ElencoScreen = "onboarding" | "dashboard" | "ficha" | "documentos" | "configuracoes";

interface ElencoData {
  id: string;
  nome: string;
  nomeArtistico?: string;
  email: string;
  cpf: string;
  drt?: string;
  foto?: string;
}

interface ElencoAppProps {
  onBackToLogin?: () => void;
}

export default function ElencoApp({ onBackToLogin }: ElencoAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ElencoScreen>("onboarding");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [elencoData, setElencoData] = useState<ElencoData | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (data: ElencoData) => {
    setElencoData(data);
    setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setElencoData(null);
    setCurrentScreen("onboarding");
    // Volta para tela de login principal
    if (onBackToLogin) {
      onBackToLogin();
    }
  };

  // Aplica a classe dark no elemento html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isAuthenticated) {
    return <ElencoOnboarding onLogin={handleLogin} onBackToLogin={onBackToLogin} />;
  }

  const menuItems = [
    { id: "dashboard", label: "Inicio", icon: Home },
    { id: "ficha", label: "Minha Ficha", icon: User },
    { id: "documentos", label: "Documentos", icon: FileText },
    { id: "configuracoes", label: "Configuracoes", icon: Settings },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-white flex flex-col">
        {/* Logo - alinhado com o header */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center">
          <h1 className="text-xl font-bold">MOVIOCA</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive ? 'bg-white/20 text-white hover:bg-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                onClick={() => setCurrentScreen(item.id as ElencoScreen)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderSimplified
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          title="Portal do Elenco - MOVIOCA"
          userName={elencoData?.nome || "Usuário"}
          userRole="Elenco"
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto bg-background">
          {currentScreen === "dashboard" && (
            <ElencoDashboard 
              elencoData={elencoData} 
              onNavigateToFicha={() => setCurrentScreen("ficha")}
            />
          )}
          {currentScreen === "ficha" && <ElencoFicha elencoData={elencoData} onUpdate={setElencoData} />}
          {currentScreen === "documentos" && <ElencoDocumentos elencoData={elencoData} />}
          {currentScreen === "configuracoes" && <ElencoConfiguracoes elencoData={elencoData} />}
        </main>
      </div>
    </div>
  );
}