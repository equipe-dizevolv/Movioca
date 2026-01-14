import { Bell, Sun, Moon, User, CheckCircle, HourglassIcon, AlertTriangle, ChevronDown, X, Filter, Trash2, Check, LogOut, FileText, Calendar, DollarSign, Film, Menu } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { useAuth, users } from "../contexts/AuthContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function Header({
  darkMode,
  onToggleDarkMode,
  mobileMenuOpen,
  onToggleMobileMenu,
}: HeaderProps) {
  const { currentUser, switchUser, logout } = useAuth();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [searchNotification, setSearchNotification] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  // Notificações específicas para o elenco
  const elencoNotifications = [
    { 
      id: 1,
      text: "Upload de Atestado Médico (Admissional) necessário para o projeto 'Longa-metragem - Drama'", 
      icon: AlertTriangle, 
      color: "text-red-600",
      status: "urgente",
      time: "Há 2 horas",
      read: false,
      category: "Documento"
    },
    { 
      id: 2,
      text: "Cachê de R$ 5.000,00 será depositado em 15/12/2024", 
      icon: DollarSign, 
      color: "text-green-600",
      status: "programado",
      time: "Há 5 horas",
      read: false,
      category: "Pagamento"
    },
    { 
      id: 3,
      text: "Convocação para ensaio geral - Longa-metragem Drama - 20/12/2024 às 14h", 
      icon: Calendar, 
      color: "text-blue-600",
      status: "pendente",
      time: "Há 6 horas",
      read: false,
      category: "Convocação"
    },
    { 
      id: 4,
      text: "Contrato #CNT-002 assinado com sucesso", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "concluído",
      time: "Há 1 dia",
      read: true,
      category: "Contrato"
    },
    { 
      id: 5,
      text: "Data de gravação alterada para 25/01/2025 - Longa-metragem Drama", 
      icon: AlertTriangle, 
      color: "text-orange-600",
      status: "urgente",
      time: "Há 1 dia",
      read: true,
      category: "Cronograma"
    },
    { 
      id: 6,
      text: "Contrato #CNT-002 aguardando sua assinatura até 18/12/2024", 
      icon: HourglassIcon, 
      color: "text-yellow-600",
      status: "pendente",
      time: "Há 2 dias",
      read: true,
      category: "Contrato"
    },
    { 
      id: 7,
      text: "Você foi escalado(a) para novo projeto: 'Série Documentário - História'", 
      icon: Film, 
      color: "text-purple-600",
      status: "concluído",
      time: "Há 3 dias",
      read: true,
      category: "Projeto"
    },
    { 
      id: 8,
      text: "Complete sua ficha cadastral para evitar atrasos nos pagamentos", 
      icon: FileText, 
      color: "text-yellow-600",
      status: "pendente",
      time: "Há 4 dias",
      read: true,
      category: "Cadastro"
    },
    { 
      id: 9,
      text: "Atualize seus dados bancários para receber os próximos pagamentos", 
      icon: AlertTriangle, 
      color: "text-orange-600",
      status: "urgente",
      time: "Há 5 dias",
      read: true,
      category: "Dados Bancários"
    },
    { 
      id: 10,
      text: "Pagamento de R$ 5.000,00 processado com sucesso", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "concluído",
      time: "Há 1 semana",
      read: true,
      category: "Pagamento"
    },
  ];

  // Notificações padrão para outros perfis
  const defaultNotifications = [
    { 
      id: 1,
      text: "Contrato #C789 aprovado", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "aprovado",
      time: "Há 5 min",
      read: false,
      category: "Contrato"
    },
    { 
      id: 2,
      text: "Solicitação de pagamento #P245 pendente de NF", 
      icon: HourglassIcon, 
      color: "text-yellow-600",
      status: "pendente",
      time: "Há 12 min",
      read: false,
      category: "Pagamento"
    },
    { 
      id: 3,
      text: "Prestação #PR-032 devolvida", 
      icon: AlertTriangle, 
      color: "text-red-600",
      status: "urgente",
      time: "Há 1 hora",
      read: false,
      category: "Prestação"
    },
    { 
      id: 4,
      text: "Orçamento #002.045 atualizado", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "concluído",
      time: "Há 2 horas",
      read: true,
      category: "Orçamento"
    },
    { 
      id: 5,
      text: "Nova solicitação #S156 criada", 
      icon: HourglassIcon, 
      color: "text-yellow-600",
      status: "pendente",
      time: "Há 3 horas",
      read: true,
      category: "Solicitação"
    },
    { 
      id: 6,
      text: "Documento #DOC-089 anexado", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "concluído",
      time: "Há 4 horas",
      read: true,
      category: "Documento"
    },
    { 
      id: 7,
      text: "Contrato #C790 aguardando assinatura", 
      icon: HourglassIcon, 
      color: "text-blue-600",
      status: "pendente",
      time: "Há 5 horas",
      read: true,
      category: "Contrato"
    },
    { 
      id: 8,
      text: "Pagamento #P246 processado com sucesso", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "aprovado",
      time: "Há 6 horas",
      read: true,
      category: "Pagamento"
    },
    { 
      id: 9,
      text: "Verba #V102 com prazo próximo ao vencimento", 
      icon: AlertTriangle, 
      color: "text-orange-600",
      status: "urgente",
      time: "Há 1 dia",
      read: true,
      category: "Verba"
    },
    { 
      id: 10,
      text: "Relatório mensal disponível para download", 
      icon: CheckCircle, 
      color: "text-green-600",
      status: "concluído",
      time: "Há 1 dia",
      read: true,
      category: "Relatório"
    },
  ];

  // Selecionar notificações baseadas no usuário atual
  const [allNotifications, setAllNotifications] = useState(
    currentUser.name === "Maria da Luz" ? elencoNotifications : defaultNotifications
  );

  // Atualizar notificações quando o usuário mudar
  useEffect(() => {
    if (currentUser.name === "Maria da Luz") {
      setAllNotifications(elencoNotifications);
    } else {
      setAllNotifications(defaultNotifications);
    }
    // Limpar seleções ao trocar de usuário
    setSelectedNotifications([]);
  }, [currentUser.name]);

  const notifications = allNotifications.filter(n => !n.read).slice(0, 3);
  const unreadCount = allNotifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setAllNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success("Notificação marcada como lida");
  };

  const handleMarkAllAsRead = () => {
    setAllNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("Todas as notificações marcadas como lidas");
  };

  const handleDelete = (id: number) => {
    setAllNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notificação excluída");
  };

  const handleToggleSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleMarkSelectedAsRead = () => {
    if (selectedNotifications.length === 0) {
      toast.error("Selecione ao menos uma notificação");
      return;
    }
    setAllNotifications(prev => 
      prev.map(n => selectedNotifications.includes(n.id) ? { ...n, read: true } : n)
    );
    setSelectedNotifications([]);
    toast.success(`${selectedNotifications.length} notificação(ões) marcada(s) como lida(s)`);
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.length === 0) {
      toast.error("Selecione ao menos uma notificação");
      return;
    }
    setAllNotifications(prev => 
      prev.filter(n => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
    toast.success(`${selectedNotifications.length} notificação(ões) excluída(s)`);
  };

  const filteredNotifications = allNotifications.filter(notification => {
    const matchesSearch = 
      notification.text.toLowerCase().includes(searchNotification.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchNotification.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "todas" ||
      (filterStatus === "nao-lidas" && !notification.read) ||
      (filterStatus === "lidas" && notification.read);

    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white dark:bg-[#1E1746] border-b border-border px-6 h-16 flex items-center relative">
      <div className="flex items-center justify-between w-full">
        {/* Menu Hamburger - apenas mobile - branco quando menu aberto */}
        <button
          onClick={onToggleMobileMenu}
          className={`md:hidden absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors z-50 ${
            mobileMenuOpen ? 'text-white' : 'text-foreground dark:text-white'
          }`}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>

        <div className="ml-12 md:ml-0">
          <h1 className="text-foreground text-sm md:text-2xl">
            <span className="md:hidden font-bold">SGI</span>
            <span className="hidden md:inline">Sistema de Gestão Integrada</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground dark:text-white hover:bg-secondary">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2">
                <p className="font-medium">Notificações</p>
              </div>
              <DropdownMenuSeparator />
              {notifications.map((notification, idx) => {
                const Icon = notification.icon;
                return (
                  <DropdownMenuItem key={idx} className="px-3 py-3">
                    <div className="flex items-start gap-3 w-full">
                      <Icon className={`w-5 h-5 ${notification.color} mt-0.5`} />
                      <span className="flex-1 text-sm">{notification.text}</span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="px-3 py-2 text-center justify-center text-primary"
                onClick={() => setOpenNotifications(true)}
              >
                Ver todas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="text-foreground dark:text-white hover:bg-secondary"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* User Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-secondary rounded-full px-3 py-2 h-auto">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm text-foreground">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.role}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Trocar usuário</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {users.filter(u => u.role !== 'Fornecedor' && u.role !== 'Elenco').map((user) => (
                <DropdownMenuItem
                  key={user.name}
                  onClick={() => switchUser(user.name)}
                  className={currentUser.name === user.name ? "bg-secondary" : ""}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    {currentUser.name === user.name && (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 hover:text-red-600"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sheet lateral de todas as notificações */}
      <Sheet open={openNotifications} onOpenChange={setOpenNotifications}>
        <SheetContent className="w-full sm:max-w-lg p-0">
          <div className="h-full flex flex-col">
            {/* Header com padding */}
            <div className="p-6 border-b">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Todas as notificações</span>
                  <Badge variant="secondary">{allNotifications.length}</Badge>
                </SheetTitle>
                <SheetDescription>
                  Gerencie e visualize todas as suas notificações
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* Conteúdo com padding */}
            <div className="flex-1 overflow-hidden flex flex-col px-6 py-4 space-y-4">
              {/* Busca e Filtro na mesma linha */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Buscar notificações..."
                    value={searchNotification}
                    onChange={(e) => setSearchNotification(e.target.value)}
                    className="pr-10"
                  />
                  {searchNotification && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setSearchNotification("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="nao-lidas">Não lidas</SelectItem>
                    <SelectItem value="lidas">Lidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Barra de ações quando há seleção */}
              {selectedNotifications.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm flex-1">
                    {selectedNotifications.length} selecionada(s)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkSelectedAsRead}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Marcar como lida
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              )}

              {/* Checkbox para selecionar todas */}
              {filteredNotifications.length > 0 && (
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm text-muted-foreground cursor-pointer">
                    Selecionar todas ({filteredNotifications.length})
                  </label>
                </div>
              )}

              {/* Lista de notificações */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhuma notificação encontrada</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    const isSelected = selectedNotifications.includes(notification.id);
                    return (
                      <div
                        key={notification.id}
                        className={`
                          p-4 rounded-lg border
                          ${!notification.read ? 'bg-primary/5 border-primary/20' : 'border-border bg-background'}
                          ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                          hover:bg-muted/50 transition-all cursor-pointer
                        `}
                        onClick={() => handleToggleSelection(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleToggleSelection(notification.id)}
                            />
                          </div>
                          
                          {/* Ícone */}
                          <Icon className={`w-5 h-5 ${notification.color} mt-0.5 flex-shrink-0`} />
                          
                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                              {notification.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>

                          {/* Botões individuais */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                title="Marcar como lida"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(notification.id);
                              }}
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Rodapé com padding */}
            {filteredNotifications.length > 0 && (
              <div className="border-t px-6 py-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {filteredNotifications.length} notificação(ões)
                  </span>
                  <span>
                    {unreadCount} não lida(s)
                  </span>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}