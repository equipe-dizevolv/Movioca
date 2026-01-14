/**
 * MOVIOCA - Gestão de Elenco & Equipe Técnica
 * 
 * Tela para Administrador e PED gerenciarem elenco e equipe técnica (PF).
 * Funcionalidades:
 * - Cadastrar pessoas físicas (atores, técnicos, etc)
 * - Enviar convites por e-mail com código de acesso
 * - Gerenciar status de cadastro e documentação
 * - Visualizar e editar dados cadastrais
 */

import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  FileText,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Download,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface PessoaElenco {
  id: string;
  nome: string;
  nomeArtistico?: string;
  email: string;
  telefone: string;
  cpf: string;
  drt?: string;
  funcao: string;
  projeto: string;
  status: "Convite enviado" | "Cadastro incompleto" | "Ativo" | "Inativo";
  codigoAcesso?: string;
  dataConvite?: string;
  dataAceite?: string;
  documentos: {
    tipo: string;
    status: "Pendente" | "Enviado" | "Aprovado" | "Reprovado";
  }[];
}

export default function GestaoElenco() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedFuncao, setSelectedFuncao] = useState("todos");
  const [openConviteModal, setOpenConviteModal] = useState(false);
  const [openVisualizarModal, setOpenVisualizarModal] = useState(false);
  const [openExcluirModal, setOpenExcluirModal] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<PessoaElenco | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Estados do formulário de convite
  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTelefone, setFormTelefone] = useState("");
  const [formCPF, setFormCPF] = useState("");
  const [formFuncao, setFormFuncao] = useState("");
  const [formProjeto, setFormProjeto] = useState("");
  const [formObservacoes, setFormObservacoes] = useState("");

  const [pessoas, setPessoas] = useState<PessoaElenco[]>([
    {
      id: "1",
      nome: "Maria Silva",
      nomeArtistico: "Maria da Luz",
      email: "maria.silva@email.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-00",
      drt: "DRT 12345/SP",
      funcao: "Atriz Principal",
      projeto: "Projeto Alpha",
      status: "Ativo",
      codigoAcesso: "1234",
      dataConvite: "15/11/2024",
      dataAceite: "16/11/2024",
      documentos: [
        { tipo: "RG/CPF", status: "Aprovado" },
        { tipo: "Comprovante de residência", status: "Aprovado" },
        { tipo: "Atestado médico", status: "Aprovado" },
      ],
    },
    {
      id: "2",
      nome: "João Santos",
      nomeArtistico: "João Astro",
      email: "joao.santos@email.com",
      telefone: "(21) 91234-5678",
      cpf: "987.654.321-00",
      drt: "DRT 54321/RJ",
      funcao: "Ator Coadjuvante",
      projeto: "Projeto Alpha",
      status: "Ativo",
      codigoAcesso: "5678",
      dataConvite: "20/11/2024",
      dataAceite: "21/11/2024",
      documentos: [
        { tipo: "RG/CPF", status: "Aprovado" },
        { tipo: "Comprovante de residência", status: "Aprovado" },
        { tipo: "Atestado médico", status: "Pendente" },
      ],
    },
    {
      id: "3",
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      telefone: "(11) 95555-1234",
      cpf: "456.789.123-00",
      funcao: "Figurinista",
      projeto: "Projeto Beta",
      status: "Convite enviado",
      codigoAcesso: "9012",
      dataConvite: "05/12/2024",
      documentos: [
        { tipo: "RG/CPF", status: "Pendente" },
        { tipo: "Comprovante de residência", status: "Pendente" },
      ],
    },
    {
      id: "4",
      nome: "Carlos Mendes",
      nomeArtistico: "Carlão",
      email: "carlos.mendes@email.com",
      telefone: "(11) 94444-9876",
      cpf: "321.654.987-00",
      funcao: "Diretor de Fotografia",
      projeto: "Projeto Beta",
      status: "Cadastro incompleto",
      codigoAcesso: "3456",
      dataConvite: "01/12/2024",
      dataAceite: "02/12/2024",
      documentos: [
        { tipo: "RG/CPF", status: "Enviado" },
        { tipo: "Comprovante de residência", status: "Pendente" },
        { tipo: "Atestado médico", status: "Pendente" },
      ],
    },
  ]);

  // Função para gerar código aleatório de 4 dígitos
  const gerarCodigoAcesso = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleEnviarConvite = () => {
    if (!formNome || !formEmail || !formTelefone || !formCPF || !formFuncao || !formProjeto) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const codigoAcesso = gerarCodigoAcesso();
    const novaPessoa: PessoaElenco = {
      id: Date.now().toString(),
      nome: formNome,
      email: formEmail,
      telefone: formTelefone,
      cpf: formCPF,
      funcao: formFuncao,
      projeto: formProjeto,
      status: "Convite enviado",
      codigoAcesso,
      dataConvite: new Date().toLocaleDateString("pt-BR"),
      documentos: [
        { tipo: "RG/CPF", status: "Pendente" },
        { tipo: "Comprovante de residência", status: "Pendente" },
        { tipo: "Atestado médico", status: "Pendente" },
      ],
    };

    setPessoas([...pessoas, novaPessoa]);
    toast.success(
      <div>
        <p className="font-semibold">Convite enviado com sucesso!</p>
        <p className="text-sm mt-1">
          E-mail enviado para <strong>{formEmail}</strong>
        </p>
        <p className="text-sm mt-1">
          Código de acesso: <strong className="text-primary">{codigoAcesso}</strong>
        </p>
      </div>,
      { duration: 5000 }
    );

    // Reset form
    setFormNome("");
    setFormEmail("");
    setFormTelefone("");
    setFormCPF("");
    setFormFuncao("");
    setFormProjeto("");
    setFormObservacoes("");
    setOpenConviteModal(false);
  };

  const handleReenviarConvite = (pessoa: PessoaElenco) => {
    toast.success(
      <div>
        <p className="font-semibold">Convite reenviado!</p>
        <p className="text-sm mt-1">
          E-mail enviado para <strong>{pessoa.email}</strong>
        </p>
        <p className="text-sm mt-1">
          Código de acesso: <strong className="text-primary">{pessoa.codigoAcesso}</strong>
        </p>
      </div>,
      { duration: 5000 }
    );
  };

  const handleExcluir = () => {
    if (deleteConfirmText === selectedPessoa?.nome) {
      setPessoas(pessoas.filter((p) => p.id !== selectedPessoa?.id));
      toast.success(`${selectedPessoa.nome} foi removido(a) com sucesso!`);
      setOpenExcluirModal(false);
      setSelectedPessoa(null);
      setDeleteConfirmText("");
    } else {
      toast.error("Nome incorreto. Digite exatamente como mostrado.");
    }
  };

  const getStatusBadge = (status: PessoaElenco["status"]) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Ativo</Badge>;
      case "Convite enviado":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Convite enviado</Badge>;
      case "Cadastro incompleto":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Cadastro incompleto</Badge>;
      case "Inativo":
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20">Inativo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentoIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Enviado":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "Reprovado":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // Filtros
  const pessoasFiltradas = pessoas.filter((pessoa) => {
    const matchSearch =
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm) ||
      (pessoa.nomeArtistico?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchProjeto = selectedProjeto === "todos" || pessoa.projeto === selectedProjeto;
    const matchStatus = selectedStatus === "todos" || pessoa.status === selectedStatus;
    const matchFuncao = selectedFuncao === "todos" || pessoa.funcao === selectedFuncao;

    return matchSearch && matchProjeto && matchStatus && matchFuncao;
  });

  const projetos = ["Projeto Alpha", "Projeto Beta", "Projeto Gamma"];
  const funcoes = [
    "Atriz Principal",
    "Ator Coadjuvante",
    "Figurinista",
    "Diretor de Fotografia",
    "Maquiador(a)",
    "Produtor(a) de Arte",
    "Sonoplasta",
    "Contrarregra",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Elenco & Equipe Técnica</h2>
          <p className="text-muted-foreground mt-1">
            Gerencie pessoas físicas vinculadas aos projetos
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setOpenConviteModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Enviar Convite
        </Button>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, e-mail, CPF ou nome artístico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <Select value={selectedProjeto} onValueChange={setSelectedProjeto}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os projetos</SelectItem>
                  {projetos.map((projeto) => (
                    <SelectItem key={projeto} value={projeto}>
                      {projeto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFuncao} onValueChange={setSelectedFuncao}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as funções</SelectItem>
                  {funcoes.map((funcao) => (
                    <SelectItem key={funcao} value={funcao}>
                      {funcao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Convite enviado">Convite enviado</SelectItem>
                  <SelectItem value="Cadastro incompleto">Cadastro incompleto</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pessoas.length}</p>
                  <p className="text-sm text-muted-foreground">Total de pessoas</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {pessoas.filter((p) => p.status === "Ativo").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ativos</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {pessoas.filter((p) => p.status === "Convite enviado").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Aguardando aceite</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {pessoas.filter((p) => p.status === "Cadastro incompleto").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Cadastro incompleto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="border rounded-lg max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documentos</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pessoasFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhuma pessoa encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  pessoasFiltradas.map((pessoa) => (
                    <TableRow key={pessoa.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{pessoa.nome}</p>
                          {pessoa.nomeArtistico && (
                            <p className="text-sm text-muted-foreground">
                              "{pessoa.nomeArtistico}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">
                            CPF: {pessoa.cpf}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{pessoa.funcao}</p>
                        {pessoa.drt && (
                          <p className="text-xs text-muted-foreground">{pessoa.drt}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{pessoa.projeto}</p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">{pessoa.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs">{pessoa.telefone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(pessoa.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {pessoa.documentos.map((doc, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1"
                              title={`${doc.tipo}: ${doc.status}`}
                            >
                              {getDocumentoIcon(doc.status)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPessoa(pessoa);
                                setOpenVisualizarModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            {pessoa.status === "Convite enviado" && (
                              <DropdownMenuItem onClick={() => handleReenviarConvite(pessoa)}>
                                <Send className="w-4 h-4 mr-2" />
                                Reenviar convite
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPessoa(pessoa);
                                setOpenExcluirModal(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Enviar Convite */}
      <Dialog open={openConviteModal} onOpenChange={setOpenConviteModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enviar Convite para Elenco/Equipe Técnica</DialogTitle>
            <DialogDescription>
              Preencha os dados da pessoa e envie um convite por e-mail com código de acesso ao Portal do Elenco.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  Nome Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Ex: Maria Silva"
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                />
              </div>
              <div>
                <Label>CPF <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="000.000.000-00"
                  value={formCPF}
                  onChange={(e) => setFormCPF(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={formTelefone}
                  onChange={(e) => setFormTelefone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  Função <span className="text-red-500">*</span>
                </Label>
                <Select value={formFuncao} onValueChange={setFormFuncao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {funcoes.map((funcao) => (
                      <SelectItem key={funcao} value={funcao}>
                        {funcao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>
                  Projeto <span className="text-red-500">*</span>
                </Label>
                <Select value={formProjeto} onValueChange={setFormProjeto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projetos.map((projeto) => (
                      <SelectItem key={projeto} value={projeto}>
                        {projeto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Observações (opcional)</Label>
              <Input
                placeholder="Ex: Prazo para envio de documentos, informações adicionais..."
                value={formObservacoes}
                onChange={(e) => setFormObservacoes(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    O que acontece após enviar o convite?
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Um e-mail será enviado com um código de acesso único de 4 dígitos</li>
                    <li>• A pessoa poderá acessar o Portal do Elenco usando este código</li>
                    <li>• Ela deverá completar o cadastro e enviar documentação obrigatória</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenConviteModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEnviarConvite} className="bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Enviar Convite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Visualizar Pessoa */}
      <Dialog open={openVisualizarModal} onOpenChange={setOpenVisualizarModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes de {selectedPessoa?.nome}</DialogTitle>
            <DialogDescription>
              Visualize todas as informações cadastrais, documentação e status de acesso.
            </DialogDescription>
          </DialogHeader>

          {selectedPessoa && (
            <div className="space-y-6">
              {/* Informações pessoais */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Informações Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nome Completo</Label>
                    <p className="text-sm mt-1">{selectedPessoa.nome}</p>
                  </div>
                  {selectedPessoa.nomeArtistico && (
                    <div>
                      <Label className="text-muted-foreground">Nome Artístico</Label>
                      <p className="text-sm mt-1">{selectedPessoa.nomeArtistico}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">CPF</Label>
                    <p className="text-sm mt-1">{selectedPessoa.cpf}</p>
                  </div>
                  {selectedPessoa.drt && (
                    <div>
                      <Label className="text-muted-foreground">DRT</Label>
                      <p className="text-sm mt-1">{selectedPessoa.drt}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contato */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Contato</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">E-mail</Label>
                    <p className="text-sm mt-1">{selectedPessoa.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Telefone</Label>
                    <p className="text-sm mt-1">{selectedPessoa.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Vinculação ao projeto */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Vinculação ao Projeto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Projeto</Label>
                    <p className="text-sm mt-1">{selectedPessoa.projeto}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Função</Label>
                    <p className="text-sm mt-1">{selectedPessoa.funcao}</p>
                  </div>
                </div>
              </div>

              {/* Status do convite */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Status do Convite</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedPessoa.status)}</div>
                  </div>
                  {selectedPessoa.codigoAcesso && (
                    <div>
                      <Label className="text-muted-foreground">Código de Acesso</Label>
                      <p className="text-sm mt-1 font-mono bg-primary/10 px-2 py-1 rounded inline-block">
                        {selectedPessoa.codigoAcesso}
                      </p>
                    </div>
                  )}
                  {selectedPessoa.dataConvite && (
                    <div>
                      <Label className="text-muted-foreground">Data do Convite</Label>
                      <p className="text-sm mt-1">{selectedPessoa.dataConvite}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documentos */}
              <div>
                <h3 className="font-semibold mb-3 text-foreground">Documentos</h3>
                <div className="space-y-2">
                  {selectedPessoa.documentos.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentoIcon(doc.status)}
                        <span className="text-sm">{doc.tipo}</span>
                      </div>
                      <Badge
                        variant={doc.status === "Aprovado" ? "default" : "outline"}
                        className={
                          doc.status === "Aprovado"
                            ? "bg-green-500/10 text-green-600"
                            : doc.status === "Enviado"
                            ? "bg-blue-500/10 text-blue-600"
                            : doc.status === "Reprovado"
                            ? "bg-red-500/10 text-red-600"
                            : ""
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenVisualizarModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Excluir */}
      <Dialog open={openExcluirModal} onOpenChange={setOpenExcluirModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Todos os dados e documentos serão permanentemente removidos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm">
              Para confirmar, digite o nome completo:{" "}
              <strong className="text-foreground">{selectedPessoa?.nome}</strong>
            </p>
            <Input
              placeholder="Digite o nome para confirmar"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenExcluirModal(false);
                setDeleteConfirmText("");
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleExcluir}
              disabled={deleteConfirmText !== selectedPessoa?.nome}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}