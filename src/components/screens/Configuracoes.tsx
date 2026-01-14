import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  MoreVertical,
  Camera,
  User,
  Plus,
  Search,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react@0.487.0";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";
import { TabScrollContainer } from "../TabScrollContainer";

export default function Configuracoes() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "Administrador";
  
  const [selectedProject, setSelectedProject] = useState("Projeto Alpha");
  
  // Dados do Perfil
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@movioca.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [cargo, setCargo] = useState("Administrador");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  
  // Parâmetros
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");
  const [aprovacaoDuasEtapas, setAprovacaoDuasEtapas] = useState(true);
  const [exigirComprovante, setExigirComprovante] = useState(true);

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(true);
  const [falhasUpload, setFalhasUpload] = useState(true);

  // Permissões
  const [openEditarPermissao, setOpenEditarPermissao] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState<any>(null);

  const perfis = [
    {
      perfil: "Administrador",
      editarOrcamento: true,
      aprovarPagamento: true,
      verContratos: true,
    },
    {
      perfil: "Controladoria Interna",
      editarOrcamento: true,
      aprovarPagamento: true,
      verContratos: true,
    },
    {
      perfil: "Financeiro",
      editarOrcamento: false,
      aprovarPagamento: true,
      verContratos: false,
    },
    {
      perfil: "Produção Executiva Interna",
      editarOrcamento: true,
      aprovarPagamento: false,
      verContratos: true,
    },
    {
      perfil: "Produção Executiva Dedicada",
      editarOrcamento: true,
      aprovarPagamento: false,
      verContratos: true,
    },
    {
      perfil: "Controladoria Dedicada",
      editarOrcamento: false,
      aprovarPagamento: true,
      verContratos: true,
    },
    {
      perfil: "Equipe Dedicada",
      editarOrcamento: false,
      aprovarPagamento: false,
      verContratos: false,
    },
  ];

  // Estados para gestão de usuários (apenas Admin)
  const [searchTermUsuarios, setSearchTermUsuarios] = useState("");
  const [openNovoUsuario, setOpenNovoUsuario] = useState(false);
  const [openEditarUsuario, setOpenEditarUsuario] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [openAtivarDesativar, setOpenAtivarDesativar] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null);
  
  // Form states para usuários
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [perfilUsuario, setPerfilUsuario] = useState("");

  const usuarios = [
    {
      id: "1",
      nome: "Maria Silva",
      email: "maria.silva@movioca.com",
      perfil: "Administrador",
      status: "Ativo",
      ultimoAcesso: "Hoje às 14:30",
    },
    {
      id: "2",
      nome: "João Santos",
      email: "joao.santos@movioca.com",
      perfil: "Produção Executiva Interna",
      status: "Ativo",
      ultimoAcesso: "Hoje às 12:15",
    },
    {
      id: "3",
      nome: "Ana Costa",
      email: "ana.costa@movioca.com",
      perfil: "Controladoria Interna",
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
  ];

  const perfisDisponiveis = [
    "Administrador",
    "Financeiro",
    "Controladoria Dedicada",
    "Controladoria Interna",
    "Produção Executiva Dedicada",
    "Produção Executiva Interna",
    "Equipe Dedicada",
  ];

  const handleSalvarParametros = () => {
    toast.success("Parâmetros salvos com sucesso");
  };

  const handleSalvarNotificacoes = () => {
    toast.success("Configurações de notificações salvas");
  };

  const handleEditarPermissao = (perfil: any) => {
    setSelectedPerfil(perfil);
    setOpenEditarPermissao(true);
  };

  const handleSalvarPermissao = () => {
    setOpenEditarPermissao(false);
    toast.success(`Permissões do perfil ${selectedPerfil.perfil} atualizadas`);
  };

  const handleSalvarPerfil = () => {
    if (!nome || !email) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAlterarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }
    if (novaSenha.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    toast.success("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
        toast.success("Foto de perfil atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers para gestão de usuários
  const handleSalvarUsuario = () => {
    if (!nomeUsuario || !emailUsuario || !perfilUsuario) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUsuario)) {
      toast.error("E-mail inválido");
      return;
    }

    toast.success(openEditarUsuario ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
    setOpenNovoUsuario(false);
    setOpenEditarUsuario(false);
    setNomeUsuario("");
    setEmailUsuario("");
    setPerfilUsuario("");
    setUsuarioSelecionado(null);
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Parâmetros do sistema e permissões
        </p>
      </div>



      <Tabs defaultValue="perfil" className="w-full">
        {/* TabsList com scroll horizontal no mobile */}
        <TabScrollContainer className="w-full">
          <TabsList className="w-full md:grid md:grid-cols-5 inline-flex whitespace-nowrap mb-6">
            <TabsTrigger value="perfil" className="flex-shrink-0 px-6">Meu Perfil</TabsTrigger>
            <TabsTrigger value="parametros" className="flex-shrink-0 px-6">Parâmetros</TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex-shrink-0 px-6">Notificações</TabsTrigger>
            {isAdmin && <TabsTrigger value="usuarios" className="flex-shrink-0 px-6">Usuários</TabsTrigger>}
            <TabsTrigger value="permissoes" className="flex-shrink-0 px-6">Permissões</TabsTrigger>
          </TabsList>
        </TabScrollContainer>

        {/* Perfil */}
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Foto de perfil */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {fotoPerfil ? (
                        <AvatarImage src={fotoPerfil} alt={nome} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <input
                        type="file"
                        id="foto-perfil"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadFoto}
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-8 w-8"
                        onClick={() => document.getElementById("foto-perfil")?.click()}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{nome}</h3>
                    <p className="text-sm text-muted-foreground">{cargo}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>

                {/* Dados pessoais */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Dados pessoais</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome completo <span className="text-destructive">*</span></Label>
                      <Input
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email <span className="text-destructive">*</span></Label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        placeholder="(00) 00000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input
                        placeholder="Seu cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarPerfil}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alterar senha */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Alterar senha</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Senha atual <span className="text-destructive">*</span></Label>
                    <Input
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nova senha <span className="text-destructive">*</span></Label>
                      <Input
                        type="password"
                        placeholder="Digite a nova senha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Confirmar nova senha <span className="text-destructive">*</span></Label>
                      <Input
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSenhaAtual("");
                      setNovaSenha("");
                      setConfirmarSenha("");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleAlterarSenha}
                  >
                    Alterar senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parâmetros */}
        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Moeda</Label>
                    <Select value={moeda} onValueChange={setMoeda}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">BRL - Real Brasileiro</SelectItem>
                        <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Formato de data</Label>
                    <Select value={formatoData} onValueChange={setFormatoData}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                        <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Casas decimais</Label>
                  <Select value={casasDecimais} onValueChange={setCasasDecimais}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 casas decimais</SelectItem>
                      <SelectItem value="2">2 casas decimais</SelectItem>
                      <SelectItem value="4">4 casas decimais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Aprovação de pagamentos em duas etapas</Label>
                      <p className="text-sm text-muted-foreground">
                        Exigir duas aprovações para liberar pagamentos
                      </p>
                    </div>
                    <Switch
                      checked={aprovacaoDuasEtapas}
                      onCheckedChange={setAprovacaoDuasEtapas}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Exigir comprovante em prestações</Label>
                      <p className="text-sm text-muted-foreground">
                        Obrigar anexo de comprovante nas prestações de contas
                      </p>
                    </div>
                    <Switch
                      checked={exigirComprovante}
                      onCheckedChange={setExigirComprovante}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarParametros}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissões */}
        <TabsContent value="permissoes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Perfil</TableHead>
                    <TableHead className="text-center">Pode editar orçamento</TableHead>
                    <TableHead className="text-center">Pode aprovar pagamento</TableHead>
                    <TableHead className="text-center">Pode ver contratos</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perfis.map((perfil, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{perfil.perfil}</TableCell>
                      <TableCell className="text-center">
                        <span className={perfil.editarOrcamento ? "text-green-600" : "text-muted-foreground"}>
                          {perfil.editarOrcamento ? "✓" : "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={perfil.aprovarPagamento ? "text-green-600" : "text-muted-foreground"}>
                          {perfil.aprovarPagamento ? "✓" : "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={perfil.verContratos ? "text-green-600" : "text-muted-foreground"}>
                          {perfil.verContratos ? "✓" : "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditarPermissao(perfil)}>
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por email
                      </p>
                    </div>
                    <Switch
                      checked={notifEmail}
                      onCheckedChange={setNotifEmail}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações push no navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifPush}
                      onCheckedChange={setNotifPush}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumo diário</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber resumo diário de atividades
                      </p>
                    </div>
                    <Switch
                      checked={resumoDiario}
                      onCheckedChange={setResumoDiario}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Falhas de upload</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar em caso de falha no upload de arquivos
                      </p>
                    </div>
                    <Switch
                      checked={falhasUpload}
                      onCheckedChange={setFalhasUpload}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarNotificacoes}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuários (apenas Admin) */}
        {isAdmin && (
          <TabsContent value="usuarios" className="space-y-4">
            {/* Busca */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar por nome ou e-mail..."
                    value={searchTermUsuarios}
                    onChange={(e) => setSearchTermUsuarios(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de usuários */}
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
                          <Badge variant="outline">
                            {usuario.perfil}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={usuario.status === "Ativo" ? "default" : "secondary"}>
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
                              <DropdownMenuItem onClick={() => {
                                setUsuarioSelecionado(usuario);
                                setNomeUsuario(usuario.nome);
                                setEmailUsuario(usuario.email);
                                setPerfilUsuario(usuario.perfil);
                                setOpenEditarUsuario(true);
                              }}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setUsuarioSelecionado(usuario);
                                setOpenAtivarDesativar(true);
                              }}>
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
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Modal Editar Permissão */}
      <Dialog open={openEditarPermissao} onOpenChange={setOpenEditarPermissao}>
        <DialogContent aria-describedby="dialog-permissao-description">
          <DialogHeader>
            <DialogTitle>Permissões do perfil</DialogTitle>
            <DialogDescription id="dialog-permissao-description">
              Ajuste as permissões para {selectedPerfil?.perfil}
            </DialogDescription>
          </DialogHeader>
          {selectedPerfil && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label>Pode editar orçamento</Label>
                <Switch defaultChecked={selectedPerfil.editarOrcamento} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Pode aprovar pagamento</Label>
                <Switch defaultChecked={selectedPerfil.aprovarPagamento} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Pode ver contratos</Label>
                <Switch defaultChecked={selectedPerfil.verContratos} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditarPermissao(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSalvarPermissao}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Novo/Editar Usuário */}
      <Dialog open={openNovoUsuario || openEditarUsuario} onOpenChange={(open) => {
        if (!open) {
          setOpenNovoUsuario(false);
          setOpenEditarUsuario(false);
        }
      }}>
        <DialogContent aria-describedby="dialog-usuario-description">
          <DialogHeader>
            <DialogTitle>{openEditarUsuario ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
            <DialogDescription id="dialog-usuario-description">
              {openEditarUsuario ? "Atualize as informações do usuário" : "Crie um novo usuário"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Nome completo <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Seu nome"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
            </div>
            <div>
              <Label>Email <span className="text-destructive">*</span></Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
              />
            </div>
            <div>
              <Label>Perfil <span className="text-destructive">*</span></Label>
              <Select value={perfilUsuario} onValueChange={setPerfilUsuario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {perfisDisponiveis.map((perfil) => (
                    <SelectItem key={perfil} value={perfil}>
                      {perfil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setOpenNovoUsuario(false);
              setOpenEditarUsuario(false);
            }}>
              Cancelar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSalvarUsuario}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Excluir Usuário */}
      <Dialog open={openExcluir} onOpenChange={setOpenExcluir}>
        <DialogContent aria-describedby="dialog-excluir-description">
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
            <DialogDescription id="dialog-excluir-description">
              Você tem certeza que deseja excluir o usuário {usuarioSelecionado?.nome}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenExcluir(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleExcluirUsuario}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Ativar/Desativar Usuário */}
      <Dialog open={openAtivarDesativar} onOpenChange={setOpenAtivarDesativar}>
        <DialogContent aria-describedby="dialog-ativar-desativar-description">
          <DialogHeader>
            <DialogTitle>{usuarioSelecionado?.status === "Ativo" ? "Desativar Usuário" : "Ativar Usuário"}</DialogTitle>
            <DialogDescription id="dialog-ativar-desativar-description">
              Você tem certeza que deseja {usuarioSelecionado?.status === "Ativo" ? "desativar" : "ativar"} o usuário {usuarioSelecionado?.nome}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAtivarDesativar(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAtivarDesativarUsuario}
            >
              {usuarioSelecionado?.status === "Ativo" ? "Desativar" : "Ativar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}