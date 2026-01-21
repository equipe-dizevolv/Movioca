import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 
  | 'Administrador'
  | 'Controladoria Interna'
  | 'Financeiro'
  | 'Produção Executiva Interna'
  | 'Produção Executiva Dedicada'
  | 'Controladoria Dedicada'
  | 'Equipe Dedicada'
  | 'Fornecedor'
  | 'Elenco';

export interface User {
  name: string;
  role: UserRole;
}

export const users: User[] = [
  { name: 'Maria', role: 'Administrador' },
  { name: 'Carla', role: 'Financeiro' },
  { name: 'Bruno', role: 'Controladoria Dedicada' },
  { name: 'João', role: 'Controladoria Interna' },
  { name: 'Ana', role: 'Produção Executiva Dedicada' },
  { name: 'Pedro', role: 'Produção Executiva Interna' },
  { name: 'Luiza', role: 'Equipe Dedicada' },
  { name: 'Empresa ABC', role: 'Fornecedor' },
  { name: 'Maria da Luz', role: 'Elenco' },
];

// Sidebar menu configuration by role
export const sidebarMenus: Record<UserRole, string[]> = {
  'Administrador': [
    'Dashboard', 'Projetos', 'Plano de Contas', 'Orçamento', 'Contratação', 'Elenco & Equipe', 'Fornecedores', 'Pagamentos', 
    'Verbas', 'Relatórios', 'Usuários', 'Documentos', 'Configurações'
  ],
  'Produção Executiva Interna': [
    'Dashboard', 'Projetos', 'Plano de Contas', 'Orçamento', 'Contratação', 'Elenco & Equipe', 'Verbas', 'Documentos', 'Configurações'
  ],
  'Controladoria Interna': [
    'Dashboard', 'Central de Aprovações', 'Lotes de Verba', 'Fornecedores', 'Relatórios', 'Configurações'
  ],
  'Financeiro': [
    'Dashboard', 'Orçamento', 'Contratação', 'Gestão Financeira', 'Documentos', 'Relatórios', 'Configurações'
  ],
  'Produção Executiva Dedicada': [
    'Dashboard', 'Orçamento', 'Contratação', 'Elenco & Equipe', 'Verbas', 'Documentos', 'Configurações'
  ],
  'Controladoria Dedicada': [
    'Dashboard', 'Orçamento', 'Contratação', 'Gestão Financeira', 'Verbas', 'Relatórios', 'Configurações'
  ],
  'Equipe Dedicada': [
    'Dashboard', 'Meus Cartões', 'Lançar Despesas', 'Prestação de Contas', 'Orçamento', 'Configurações'
  ],
  'Fornecedor': [
    'Dashboard', 'Pagamentos', 'Documentos', 'Configurações'
  ],
  'Elenco': [
    'Dashboard', 'Documentos', 'Configurações'
  ],
};

// Permission checks
export const permissions = {
  canEditOrcamento: (role: UserRole) => {
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 
            'Produção Executiva Dedicada', 'Financeiro'].includes(role);
  },
  canViewOrcamento: (role: UserRole) => {
    // CD pode visualizar orçamento mas não editar (PRD 006 - História 7)
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna',
            'Produção Executiva Dedicada', 'Controladoria Dedicada', 'Financeiro', 'Equipe Dedicada'].includes(role);
  },
  canEditContratacao: (role: UserRole) => {
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna',
            'Produção Executiva Dedicada'].includes(role);
  },
  canViewContratacao: (role: UserRole) => {
    // CD pode visualizar contratos do projeto (PRD 006 - Seção 6.1)
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna',
            'Produção Executiva Dedicada', 'Controladoria Dedicada', 'Financeiro'].includes(role);
  },
  canApprovePayments: (role: UserRole) => {
    return ['Administrador', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role);
  },
  canExecutePayments: (role: UserRole) => {
    return ['Administrador', 'Financeiro'].includes(role);
  },
  canEditFornecedor: (role: UserRole) => {
    return ['Administrador', 'Financeiro', 'Produção Executiva Interna'].includes(role);
  },
  canManageUsers: (role: UserRole) => {
    return role === 'Administrador';
  },
  canAccessFullFinancial: (role: UserRole) => {
    return ['Administrador', 'Financeiro'].includes(role);
  },
  canCreateRubrica: (role: UserRole) => {
    return ['Administrador', 'Produção Executiva Interna', 'Produção Executiva Dedicada'].includes(role);
  },
  canDeleteItems: (role: UserRole) => {
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna',
            'Produção Executiva Dedicada', 'Controladoria Dedicada'].includes(role);
  },
  isViewOnly: (role: UserRole) => {
    return ['Equipe Dedicada', 'Fornecedor'].includes(role);
  },
  canEditAssignedOnly: (role: UserRole) => {
    return ['Produção Executiva Dedicada', 'Controladoria Dedicada', 'Equipe Dedicada'].includes(role);
  },
  // === NOVAS PERMISSÕES PEI (PRD 002) ===
  canManageProjetos: (role: UserRole) => {
    // PEI cria e gerencia projetos (Fluxo 4.1)
    return ['Administrador', 'Produção Executiva Interna'].includes(role);
  },
  canViewAllProjetos: (role: UserRole) => {
    // PEI visualiza todos os projetos ativos (Dashboard Multi-Projeto)
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna'].includes(role);
  },
  canCopyOrcamento: (role: UserRole) => {
    // PEI copia orçamento de projeto anterior ou Plano de Contas (História 2)
    return ['Administrador', 'Produção Executiva Interna'].includes(role);
  },
  canFreezeOrcamento: (role: UserRole) => {
    // PEI congela versão do orçamento como "Aprovado" (História 5)
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna'].includes(role);
  },
  canDelegateGestao: (role: UserRole) => {
    // PEI atribui gestão de rubricas a outros usuários (História 4)
    return ['Administrador', 'Produção Executiva Interna'].includes(role);
  },
  canApproveVerba: (role: UserRole) => {
    // PEI aprova solicitações de verba (Gestão financeira)
    return ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role);
  },
  canManagePlanoContas: (role: UserRole) => {
    // PEI acessa e copia estruturas de Plano de Contas (História 2)
    return ['Administrador', 'Produção Executiva Interna'].includes(role);
  },
  // === NOVAS PERMISSÕES FINANCEIRO (PRD 004) ===
  canConfirmCarga: (role: UserRole) => {
    // Financeiro confirma transferências bancárias para cartões (História 5)
    return ['Administrador', 'Financeiro'].includes(role);
  },
  canProcessReembolsos: (role: UserRole) => {
    // Financeiro processa reembolsos de prestação de contas (História 6)
    return ['Administrador', 'Financeiro'].includes(role);
  },
  canDownloadComprovantes: (role: UserRole) => {
    // Download de comprovantes em lote (Seção 3.1)
    return ['Administrador', 'Financeiro', 'Controladoria Interna'].includes(role);
  },
  canSendToOmie: (role: UserRole) => {
    // Enviar pagamentos para integração OMIE (História 2)
    return ['Administrador', 'Financeiro'].includes(role);
  },
  // === NOVAS PERMISSÕES CONTROLADORIA DEDICADA (PRD 006) ===
  canValidatePaymentsLevel1: (role: UserRole) => {
    // CD valida pagamentos nível 1 (pré-aprovação antes de CI) - História 2
    return ['Administrador', 'Controladoria Dedicada'].includes(role);
  },
  canEditLotesVerba: (role: UserRole) => {
    // CD edita lotes de verba (corrige IO, glosa itens) - História 4, 5, 6
    return ['Administrador', 'Controladoria Dedicada', 'Controladoria Interna'].includes(role);
  },
  canGlosarItens: (role: UserRole) => {
    // CD pode glosar itens individuais em lotes de verba - História 6
    return ['Administrador', 'Controladoria Dedicada', 'Controladoria Interna'].includes(role);
  },
  canUploadComprovanteUnificado: (role: UserRole) => {
    // CD faz upload de PDF unificado (scan profissional) - História 5
    return ['Administrador', 'Controladoria Dedicada'].includes(role);
  },
  canViewAssignedProjectOnly: (role: UserRole) => {
    // CD vê apenas dados do projeto vinculado (RN-003)
    return ['Controladoria Dedicada', 'Produção Executiva Dedicada', 'Equipe Dedicada'].includes(role);
  },
};

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  switchUser: (userName: string) => void;
  hasPermission: (permissionCheck: (role: UserRole) => boolean) => boolean;
  allowedMenus: string[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado com persistência em localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('movioca_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return users[0];
      }
    }
    return users[0];
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('movioca_is_authenticated');
    return savedAuth === 'true';
  });

  // Salva estado no localStorage sempre que mudar
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('movioca_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('movioca_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('movioca_is_authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    // Credenciais padrão: admin / 1234
    if (username === 'admin' && password === '1234') {
      const adminUser = users[0]; // Maria (Administrador)
      setCurrentUser(adminUser);
      setIsAuthenticated(true);
      return true;
    }
    
    // Credencial de teste: fornecedor / 1234
    if (username === 'fornecedor' && password === '1234') {
      const fornecedorUser = users.find(u => u.role === 'Fornecedor');
      if (fornecedorUser) {
        setCurrentUser(fornecedorUser);
        setIsAuthenticated(true);
        return true;
      }
    }
    
    // Credencial de teste: financeiro / 1234
    if (username === 'financeiro' && password === '1234') {
      const financeiroUser = users.find(u => u.role === 'Financeiro');
      if (financeiroUser) {
        setCurrentUser(financeiroUser);
        setIsAuthenticated(true);
        return true;
      }
    }
    
    // Credencial de teste: controladoria / 1234
    if (username === 'controladoria' && password === '1234') {
      const controladoriaUser = users.find(u => u.role === 'Controladoria Dedicada');
      if (controladoriaUser) {
        setCurrentUser(controladoriaUser);
        setIsAuthenticated(true);
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = (email: string): boolean => {
    // Simulação de envio de e-mail de recuperação
    // Em produção, isso enviaria um e-mail real
    if (email && email.includes('@')) {
      console.log(`E-mail de recuperação enviado para: ${email}`);
      return true;
    }
    return false;
  };

  const switchUser = (userName: string) => {
    const user = users.find(u => u.name === userName);
    if (user) {
      setCurrentUser(user);
    }
  };

  const hasPermission = (permissionCheck: (role: UserRole) => boolean) => {
    if (!currentUser) return false;
    return permissionCheck(currentUser.role);
  };

  const allowedMenus = currentUser ? sidebarMenus[currentUser.role] : [];

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      switchUser, 
      hasPermission, 
      allowedMenus,
      isAuthenticated,
      login,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};