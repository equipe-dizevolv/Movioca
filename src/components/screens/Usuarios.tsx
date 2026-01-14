import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  status: "Ativo" | "Inativo";
  ultimoAcesso: string;
}

interface Permissao {
  id: string;
  recurso: string;
  categoria: string;
  ativa: boolean;
}

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openNovoUsuario, setOpenNovoUsuario] = useState(false);
  const [openEditarUsuario, setOpenEditarUsuario] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [openAtivarDesativar, setOpenAtivarDesativar] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  // Form states
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");
  const [permissoes, setPermissoes] = useState<Permissao[]>([
    // Categoria: Dashboard e Projetos
    { id: "dashboard", recurso: "Dashboard", categoria: "Geral", ativa: true },
    { id: "projetos", recurso: "Projetos", categoria: "Geral", ativa: true },
    { id: "orcamento", recurso: "Orçamento", categoria: "Geral", ativa: true },
    { id: "planoContas", recurso: "Plano de Contas", categoria: "Geral", ativa: true },
    
    // Categoria: Financeiro
    { id: "contratacao", recurso: "Contratação", categoria: "Financeiro", ativa: true },
    { id: "pagamentos", recurso: "Pagamentos", categoria: "Financeiro", ativa: true },
    { id: "controleVerba", recurso: "Controle de Verba", categoria: "Financeiro", ativa: true },
    { id: "verbas", recurso: "Verbas", categoria: "Financeiro", ativa: true },
    
    // Categoria: Administrativo
    { id: "relatorios", recurso: "Relatórios", categoria: "Administrativo", ativa: true },
    { id: "usuarios", recurso: "Usuários", categoria: "Administrativo", ativa: false },
    { id: "configuracoes", recurso: "Configurações", categoria: "Administrativo", ativa: false },
    
    // Categoria: Ações específicas
    { id: "aprovarOrcamento", recurso: "Aprovar Orçamento", categoria: "Ações", ativa: true },
    { id: "aprovarPagamento", recurso: "Aprovar Pagamento", categoria: "Ações", ativa: true },
    { id: "editarContrato", recurso: "Editar Contrato", categoria: "Ações", ativa: false },
    { id: "excluirRegistros", recurso: "Excluir Registros", categoria: "Ações", ativa: false },
    { id: "exportarDados", recurso: "Exportar Dados", categoria: "Ações", ativa: true },
  ]);

  const usuarios: Usuario[] = [
    {
      id: "1",
      nome: "Maria Silva",
      email: "maria.silva@movioca.com",
      perfil: "Admin",
      status: "Ativo",
      ultimoAcesso: "Hoje às 14:30",
    },
    {
      id: "2",
      nome: "João Santos",
      email: "joao.santos@movioca.com",
      perfil: "Produção executiva interna",
      status: "Ativo",
      ultimoAcesso: "Hoje às 12:15",
    },
    {
      id: "3",
      nome: "Ana Costa",
      email: "ana.costa@movioca.com",
      perfil: "Controladoria interna",
      status: "Ativo",
      ultimoAcesso: "Ontem às 18:45",
    },
    {
      id: "4",
      nome: "Carlos Mendes",
      email: "carlos.mendes@movioca.com",
      perfil: "Financeiro",
      status: "Ativo",
      ultimoAcesso: "Hoje às 09:20",
    },
    {
      id: "5",
      nome: "Fernanda Lima",
      email: "fernanda.lima@movioca.com",
      perfil: "Fornecedor",
      status: "Inativo",
      ultimoAcesso: "5 dias atrás",
    },
  ];

  const perfisDisponiveis = [
    "Administrador",
    "Financeiro",
    "Controladoria Dedicada",
    "Controladoria Interna",
    "Produção Executiva Dedicada",
    "Produção Executiva Interna",
    "Equipe Dedicada",
    "Fornecedor",
  ];

  const handleSalvarUsuario = () => {
    if (!nome || !email || !perfil) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("E-mail inválido");
      return;
    }

    toast.success(openEditarUsuario ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
    setOpenNovoUsuario(false);
    setOpenEditarUsuario(false);
    resetForm();
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setPerfil(usuario.perfil);
    setOpenEditarUsuario(true);
  };

  const handleExcluirUsuario = () => {
    toast.success("Usuário excluído com sucesso!");
    setOpenExcluir(false);
    setUsuarioSelecionado(null);
  };

  const handleAtivarDesativarUsuario = () => {
    const acao = usuarioSelecionado?.status === "Ativo" ? "desativado" : "ativado";
    toast.success(`Usuário ${acao} com sucesso!`);
    setOpenAtivarDesativar(false);
    setUsuarioSelecionado(null);
  };

  const resetForm = () => {
    setNome("");
    setEmail("");
    setPerfil("");
    setUsuarioSelecionado(null);
  };

  const togglePermissao = (permissaoId: string) => {
    setPermissoes(permissoes.map(p => 
      p.id === permissaoId ? { ...p, ativa: !p.ativa } : p
    ));
  };

  const handlePerfilChange = (novoPerfil: string) => {
    setPerfil(novoPerfil);
    
    // Auto-configurar permissões baseado no perfil
    if (novoPerfil === "Admin") {
      setPermissoes(permissoes.map(p => ({ ...p, ativa: true })));
    } else if (novoPerfil === "Fornecedor") {
      setPermissoes(permissoes.map(p => ({ 
        ...p, 
        ativa: ["dashboard", "projetos", "controleVerba", "verbas"].includes(p.id)
      })));
    } else if (novoPerfil === "Financeiro") {
      setPermissoes(permissoes.map(p => ({ 
        ...p, 
        ativa: !["usuarios", "configuracoes", "excluirRegistros"].includes(p.id)
      })));
    } else {
      // Configuração padrão para outros perfis
      setPermissoes(permissoes.map(p => ({ 
        ...p, 
        ativa: ["dashboard", "projetos", "orcamento", "planoContas", "exportarDados"].includes(p.id)
      })));
    }
  };

  const getPermissoesPorCategoria = () => {
    const categorias: Record<string, Permissao[]> = {};
    
    permissoes.forEach(permissao => {
      if (!categorias[permissao.categoria]) {
        categorias[permissao.categoria] = [];
      }
      categorias[permissao.categoria].push(permissao);
    });
    
    return categorias;
  };

  const permissoesPorCategoria = getPermissoesPorCategoria();

  const getStatusBadgeVariant = (status: string) => {
    return status === "Ativo" ? "default" : "secondary";
  };

  const getPerfilBadgeColor = (perfil: string) => {
    if (perfil === "Admin") return "bg-purple-100 text-purple-700 border-purple-300";
    if (perfil.includes("Controladoria")) return "bg-blue-100 text-blue-700 border-blue-300";
    if (perfil === "Financeiro") return "bg-green-100 text-green-700 border-green-300";
    if (perfil.includes("Produção")) return "bg-orange-100 text-orange-700 border-orange-300";
    if (perfil === "Fornecedor") return "bg-gray-100 text-gray-700 border-gray-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Usuários</h2>
          <p className="text-muted-foreground mt-1">
            Gestão de usuários e permissões
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Usuários cadastrados</CardTitle>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setOpenNovoUsuario(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo usuário
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último acesso</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getPerfilBadgeColor(usuario.perfil)}
                      >
                        {usuario.perfil}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(usuario.status)}>
                        {usuario.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {usuario.ultimoAcesso}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditarUsuario(usuario)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setUsuarioSelecionado(usuario);
                              setOpenAtivarDesativar(true);
                            }}
                          >
                            {usuario.status === "Ativo" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Desativar
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Ativar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setUsuarioSelecionado(usuario);
                              setOpenExcluir(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal - Novo/Editar Usuário */}
      <Dialog
        open={openEditarUsuario || openNovoUsuario}
        onOpenChange={(open) => {
          if (!open) {
            setOpenEditarUsuario(false);
            setOpenNovoUsuario(false);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="dialog-usuario-description">
          <DialogHeader>
            <DialogTitle>
              {openEditarUsuario ? "Editar usuário" : "Novo usuário"}
            </DialogTitle>
            <DialogDescription id="dialog-usuario-description">
              Configure o perfil e permissões do usuário
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Dados básicos */}
            <div>
              <h3 className="font-medium mb-4">Dados básicos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div>
                  <Label>E-mail <span className="text-destructive">*</span></Label>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Perfil */}
            <div>
              <h3 className="font-medium mb-4">Perfil</h3>
              <div>
                <Label>Selecione o perfil <span className="text-destructive">*</span></Label>
                <Select value={perfil} onValueChange={handlePerfilChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {perfisDisponiveis.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Ao selecionar um perfil, as permissões são configuradas automaticamente. 
                  Você pode personalizar individualmente abaixo.
                </p>
              </div>
            </div>

            <Separator />

            {/* Permissões avançadas */}
            <div>
              <h3 className="font-medium mb-4">Permissões avançadas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ative ou desative permissões individuais por recurso
              </p>

              <div className="space-y-6">
                {Object.entries(permissoesPorCategoria).map(([categoria, perms]) => (
                  <div key={categoria}>
                    <h4 className="text-sm font-medium text-primary mb-3">{categoria}</h4>
                    <div className="space-y-2 pl-2">
                      {perms.map((permissao) => (
                        <div 
                          key={permissao.id} 
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Switch
                              id={permissao.id}
                              checked={permissao.ativa}
                              onCheckedChange={() => togglePermissao(permissao.id)}
                            />
                            <label
                              htmlFor={permissao.id}
                              className="text-sm cursor-pointer"
                            >
                              {permissao.recurso}
                            </label>
                          </div>
                          <Badge 
                            variant={permissao.ativa ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {permissao.ativa ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo de permissões */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Resumo</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Permissões ativas:</span>
                  <span className="ml-2 font-medium">
                    {permissoes.filter(p => p.ativa).length} de {permissoes.length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Perfil selecionado:</span>
                  <span className="ml-2 font-medium">
                    {perfil || "Nenhum"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setOpenNovoUsuario(false);
                setOpenEditarUsuario(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90" 
              onClick={handleSalvarUsuario}
            >
              {openEditarUsuario ? "Salvar alterações" : "Criar usuário"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Excluir Usuário */}
      <Dialog open={openExcluir} onOpenChange={setOpenExcluir}>
        <DialogContent aria-describedby="dialog-excluir-usuario-description">
          <DialogHeader>
            <DialogTitle>Excluir usuário</DialogTitle>
            <DialogDescription id="dialog-excluir-usuario-description">
              Tem certeza que deseja excluir este usuário? Esta ação é irreversível.
            </DialogDescription>
          </DialogHeader>
          {usuarioSelecionado && (
            <div className="py-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">E-mail:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Perfil:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.perfil}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenExcluir(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700" 
              onClick={handleExcluirUsuario}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Ativar/Desativar Usuário */}
      <Dialog open={openAtivarDesativar} onOpenChange={setOpenAtivarDesativar}>
        <DialogContent aria-describedby="dialog-ativar-desativar-description">
          <DialogHeader>
            <DialogTitle>
              {usuarioSelecionado?.status === "Ativo" ? "Desativar" : "Ativar"} usuário
            </DialogTitle>
            <DialogDescription id="dialog-ativar-desativar-description">
              {usuarioSelecionado?.status === "Ativo" 
                ? "O usuário não poderá mais acessar o sistema após ser desativado." 
                : "O usuário poderá acessar o sistema novamente após ser ativado."}
            </DialogDescription>
          </DialogHeader>
          {usuarioSelecionado && (
            <div className="py-4 space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">E-mail:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Perfil:</span>
                  <span className="text-sm font-medium">{usuarioSelecionado.perfil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status atual:</span>
                  <Badge variant={getStatusBadgeVariant(usuarioSelecionado.status)}>
                    {usuarioSelecionado.status}
                  </Badge>
                </div>
              </div>
              {usuarioSelecionado.status === "Ativo" ? (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-start gap-2 text-orange-800 dark:text-orange-200">
                    <UserX className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Desativar usuário</p>
                      <p className="text-sm mt-1">
                        O usuário será desconectado e não conseguirá fazer login até ser reativado.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start gap-2 text-green-800 dark:text-green-200">
                    <UserCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Ativar usuário</p>
                      <p className="text-sm mt-1">
                        O usuário poderá fazer login e acessar o sistema normalmente.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAtivarDesativar(false)}>
              Cancelar
            </Button>
            <Button 
              className={usuarioSelecionado?.status === "Ativo" ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}
              onClick={handleAtivarDesativarUsuario}
            >
              {usuarioSelecionado?.status === "Ativo" ? (
                <>
                  <UserX className="w-4 h-4 mr-2" />
                  Desativar usuário
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Ativar usuário
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}