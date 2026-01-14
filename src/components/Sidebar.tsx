import {
  LayoutDashboard,
  FileText,
  Receipt,
  Users,
  BarChart3,
  CreditCard,
  DollarSign,
  Settings,
  FileStack,
  Folder,
  List,
  Building2,
} from "lucide-react@0.487.0";
import { useAuth } from "../contexts/AuthContext";
import logoWhite from "figma:asset/0e588a2cd1ae883ddc283f360db1fd55b9002906.png";

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, isOpen, onClose }: SidebarProps) {
  const { allowedMenus, currentUser } = useAuth();

  const allMenuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Orçamento", icon: Receipt },
    { name: "Contratação", icon: FileStack },
    { name: "Pagamentos", icon: DollarSign },
    { name: "Verbas", icon: CreditCard },
    { name: "Relatórios", icon: BarChart3 },
    { name: "Fornecedores", icon: Building2 },
    { name: "Projetos", icon: FileText },
    { name: "Plano de Contas", icon: List },
    { name: "Documentos", icon: Folder },
    { name: "Configurações", icon: Settings },
  ];

  // Filter menu items based on user permissions
  const menuItems = allMenuItems.filter(item => allowedMenus.includes(item.name));

  const handleNavigate = (itemName: string) => {
    // Se for PED e clicar em Configurações, navega para tela específica
    if (currentUser?.role === "Produção Executiva Dedicada" && itemName === "Configurações") {
      onNavigate("Configurações - PED");
      return;
    }
    
    // Se for PEI e clicar em Configurações, navega para tela específica
    if (currentUser?.role === "Produção Executiva Interna" && itemName === "Configurações") {
      onNavigate("Configurações - PEI");
      return;
    }
    
    // Se for Financeiro e clicar em Configurações, navega para tela específica (PRD 004)
    if (currentUser?.role === "Financeiro" && itemName === "Configurações") {
      onNavigate("Configurações - Financeiro");
      return;
    }
    
    // Se for Controladoria Interna e clicar em Configurações, navega para tela específica (PRD 003)
    if (currentUser?.role === "Controladoria Interna" && itemName === "Configurações") {
      onNavigate("Configurações - CI");
      return;
    }
    
    // Se for Controladoria Dedicada e clicar em Configurações, navega para tela específica (PRD 006)
    if (currentUser?.role === "Controladoria Dedicada" && itemName === "Configurações") {
      onNavigate("Configurações - CD");
      return;
    }
    
    // Se for Equipe Dedicada e clicar em Configurações, navega para tela específica (PRD 007)
    if (currentUser?.role === "Equipe Dedicada" && itemName === "Configurações") {
      onNavigate("Configurações - Equipe Dedicada");
      return;
    }
    
    onNavigate(itemName);
  };

  return (
    <>
      {/* Overlay escuro - apenas mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar com animação slide */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        bg-sidebar dark:bg-sidebar w-64 md:w-64 max-w-[280px] md:max-w-none h-screen flex flex-col text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        {/* Logo - com espaçamento maior para respirar */}
        <div className="h-24 md:h-24 pt-20 md:pt-0 flex items-center justify-center border-b border-sidebar-border px-6 shrink-0">
          <img 
            src={logoWhite} 
            alt="Movioca" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Navigation - com espaço extra no topo */}
        <nav className="flex-1 overflow-y-auto px-4 pt-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Ajusta comparaão para PED e PEI
              let isActive = currentScreen === item.name;
              
              if (item.name === "Configurações") {
                if (currentUser?.role === "Produção Executiva Dedicada") {
                  isActive = currentScreen === "Configurações - PED";
                } else if (currentUser?.role === "Produção Executiva Interna") {
                  isActive = currentScreen === "Configurações - PEI";
                } else if (currentUser?.role === "Financeiro") {
                  isActive = currentScreen === "Configurações - Financeiro";
                } else if (currentUser?.role === "Controladoria Interna") {
                  isActive = currentScreen === "Configurações - CI";
                } else if (currentUser?.role === "Controladoria Dedicada") {
                  isActive = currentScreen === "Configurações - CD";
                } else if (currentUser?.role === "Equipe Dedicada") {
                  isActive = currentScreen === "Configurações - Equipe Dedicada";
                }
              }

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="h-16 border-t border-sidebar-border flex items-center justify-center px-4">
          <p className="text-xs text-white/70 text-center">
            © 2026 Movioca. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </>
  );
}