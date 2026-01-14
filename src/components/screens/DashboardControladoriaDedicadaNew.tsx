/**
 * MOVIOCA - Dashboard de Operação de Campo (Controladoria Dedicada)
 * 
 * Interface de alta performance para validação técnica de despesas e prestações de contas.
 * Foco na triagem primária e correção de dados na origem.
 * 
 * FUNCIONALIDADES:
 * - KPIs de Projeto (sticky header)
 * - Hub Unificado de Validação com 3 abas (Equipe & Elenco, Fornecedores, Documentos)
 * - Split-screen para visualização e edição de documentos
 * - Gestão de Verba e Cartões
 * - Filtros rápidos por departamento
 * - Atalhos de teclado para operação ágil
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  Building2,
  ChevronRight,
  MoreVertical,
  Download,
  Eye,
  Edit,
  Send,
  X,
  Check,
  AlertTriangle,
  Palette,
  Utensils,
  Shirt,
  Package,
  Clapperboard,
  Filter,
  Zap,
  DollarSign,
  Calendar,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useProjectFilter } from "../../contexts/ProjectFilterContext";

interface DashboardCDNewProps {
  onNavigate?: (screen: string) => void;
}

// Tipos para os dados
interface ItemEquipe {
  id: number;
  nome: string;
  cpfCnpj: string;
  rubrica: string;
  valor: number;
  data: string;
  status: "pendente" | "aprovada" | "reprovada" | "correcao";
  tipo: "Reembolso" | "Cache" | "Verba";
  departamento: string;
  documento?: string;
}

interface ItemFornecedor {
  id: number;
  razaoSocial: string;
  cnpj: string;
  numeroNF: string;
  valor: number;
  rubrica: string;
  data: string;
  status: "pendente" | "aprovada" | "reprovada" | "correcao";
  departamento: string;
  documento?: string;
  vencimento?: string;
}

interface Cartao {
  id: number;
  numero: string;
  responsavel: string;
  valorSolicitado: number;
  valorPrestado: number;
  departamento: string;
  status: "ativo" | "pendente_pc" | "baixado";
}

export default function DashboardControladoriaDedicadaNew({ onNavigate }: DashboardCDNewProps) {
  const { selectedProject } = useProjectFilter();
  const [selectedTab, setSelectedTab] = useState("equipe");
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string | null>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [showReprovarDialog, setShowReprovarDialog] = useState(false);
  const [justificativaReprova, setJustificativaReprova] = useState("");
  const [showSolicitarCargaDialog, setShowSolicitarCargaDialog] = useState(false);

  // Mock de dados - KPIs
  const kpis = {
    pendenciasTriagem: 23,
    rubricasAtribuidas: 8,
    verbaRecebida: 450000,
    verbaGasta: 287500,
    alertasCartao: 3,
  };

  // Mock de dados - Equipe & Elenco
  const [itensEquipe, setItensEquipe] = useState<ItemEquipe[]>([
    {
      id: 1,
      nome: "Maria da Luz Silva",
      cpfCnpj: "123.456.789-00",
      rubrica: "010 - Elenco Principal",
      valor: 15000,
      data: "2025-01-02",
      status: "pendente",
      tipo: "Cache",
      departamento: "ARTE",
      documento: "mock-documento-1.pdf",
    },
    {
      id: 2,
      nome: "João Costa Santos",
      cpfCnpj: "987.654.321-00",
      rubrica: "011 - Direção",
      valor: 25000,
      data: "2025-01-03",
      status: "pendente",
      tipo: "Cache",
      departamento: "PRODUÇÃO",
      documento: "mock-documento-2.pdf",
    },
    {
      id: 3,
      nome: "Ana Paula Oliveira",
      cpfCnpj: "456.789.123-00",
      rubrica: "015 - Figurino",
      valor: 1200,
      data: "2025-01-04",
      status: "pendente",
      tipo: "Reembolso",
      departamento: "FIGURINO",
      documento: "mock-documento-3.pdf",
    },
    {
      id: 4,
      nome: "Carlos Eduardo Lima",
      cpfCnpj: "321.654.987-00",
      rubrica: "012 - Fotografia",
      valor: 3500,
      data: "2025-01-05",
      status: "aprovada",
      tipo: "Verba",
      departamento: "ARTE",
      documento: "mock-documento-4.pdf",
    },
    {
      id: 5,
      nome: "Beatriz Ferreira",
      cpfCnpj: "789.123.456-00",
      rubrica: "018 - Gastronomia",
      valor: 850,
      data: "2025-01-06",
      status: "pendente",
      tipo: "Reembolso",
      departamento: "GASTRONOMIA",
      documento: "mock-documento-5.pdf",
    },
  ]);

  // Mock de dados - Fornecedores
  const [itensFornecedores, setItensFornecedores] = useState<ItemFornecedor[]>([
    {
      id: 101,
      razaoSocial: "Locadora de Veículos XYZ Ltda",
      cnpj: "12.345.678/0001-90",
      numeroNF: "NF-8542",
      valor: 4500,
      rubrica: "020 - Transporte",
      data: "2025-01-02",
      status: "pendente",
      departamento: "PRODUÇÃO",
      documento: "mock-nf-101.pdf",
      vencimento: "2025-01-12",
    },
    {
      id: 102,
      razaoSocial: "Catering Gourmet Ltda",
      cnpj: "98.765.432/0001-10",
      numeroNF: "NF-1247",
      valor: 2800,
      rubrica: "018 - Gastronomia",
      data: "2025-01-03",
      status: "pendente",
      departamento: "GASTRONOMIA",
      documento: "mock-nf-102.pdf",
      vencimento: "2025-01-13",
    },
    {
      id: 103,
      razaoSocial: "Equipamentos Cine Tech S/A",
      cnpj: "45.678.901/0001-23",
      numeroNF: "NF-9876",
      valor: 8200,
      rubrica: "025 - Equipamentos",
      data: "2025-01-04",
      status: "pendente",
      departamento: "ARTE",
      documento: "mock-nf-103.pdf",
      vencimento: "2025-01-14",
    },
    {
      id: 104,
      razaoSocial: "Figurino Designer Pro Ltda",
      cnpj: "78.901.234/0001-56",
      numeroNF: "NF-4521",
      valor: 6700,
      rubrica: "015 - Figurino",
      data: "2025-01-05",
      status: "aprovada",
      departamento: "FIGURINO",
      documento: "mock-nf-104.pdf",
      vencimento: "2025-01-15",
    },
    {
      id: 105,
      razaoSocial: "Objetos de Cena ABC Ltda",
      cnpj: "23.456.789/0001-67",
      numeroNF: "NF-7893",
      valor: 3400,
      rubrica: "022 - Objetos de Cena",
      data: "2025-01-06",
      status: "pendente",
      departamento: "OBJETOS",
      documento: "mock-nf-105.pdf",
      vencimento: "2025-01-16",
    },
  ]);

  // Mock de dados - Cartões
  const [cartoes, setCartoes] = useState<Cartao[]>([
    {
      id: 1,
      numero: "****1234",
      responsavel: "Carlos Eduardo Lima",
      valorSolicitado: 5000,
      valorPrestado: 3500,
      departamento: "ARTE",
      status: "ativo",
    },
    {
      id: 2,
      numero: "****5678",
      responsavel: "Ana Paula Oliveira",
      valorSolicitado: 3000,
      valorPrestado: 2800,
      departamento: "FIGURINO",
      status: "ativo",
    },
    {
      id: 3,
      numero: "****9012",
      responsavel: "Beatriz Ferreira",
      valorSolicitado: 2000,
      valorPrestado: 0,
      departamento: "GASTRONOMIA",
      status: "pendente_pc",
    },
    {
      id: 4,
      numero: "****3456",
      responsavel: "Roberto Santos",
      valorSolicitado: 4500,
      valorPrestado: 1200,
      departamento: "PRODUÇÃO",
      status: "ativo",
    },
  ]);

  const departamentos = [
    { id: "ARTE", nome: "Arte", icon: Palette, color: "bg-purple-500" },
    { id: "OBJETOS", nome: "Objetos", icon: Package, color: "bg-blue-500" },
    { id: "FIGURINO", nome: "Figurino", icon: Shirt, color: "bg-pink-500" },
    { id: "PRODUÇÃO", nome: "Produção", icon: Clapperboard, color: "bg-orange-500" },
    { id: "GASTRONOMIA", nome: "Gastronomia", icon: Utensils, color: "bg-green-500" },
  ];

  // Calcula saúde das rubricas
  const saudeRubricas = ((kpis.verbaRecebida - kpis.verbaGasta) / kpis.verbaRecebida) * 100;

  // Filtrar itens por departamento
  const itensFiltrados = (items: any[]) => {
    if (!departamentoFiltro) return items;
    return items.filter((item) => item.departamento === departamentoFiltro);
  };

  // Aprovar item
  const handleAprovar = (item: any, tipo: "equipe" | "fornecedor") => {
    if (tipo === "equipe") {
      setItensEquipe((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "aprovada" } : i))
      );
    } else {
      setItensFornecedores((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "aprovada" } : i))
      );
    }
    toast.success("Item aprovado e enviado para Controladoria Interna", {
      description: `${tipo === "equipe" ? item.nome : item.razaoSocial} - R$ ${item.valor.toLocaleString("pt-BR")}`,
    });
    setShowSplitScreen(false);
    setItemSelecionado(null);
  };

  // Reprovar item
  const handleReprovar = (item: any, tipo: "equipe" | "fornecedor") => {
    if (!justificativaReprova.trim()) {
      toast.error("Justificativa obrigatória para reprovação");
      return;
    }

    if (tipo === "equipe") {
      setItensEquipe((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "reprovada" } : i))
      );
    } else {
      setItensFornecedores((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "reprovada" } : i))
      );
    }

    toast.error("Item reprovado", {
      description: `Justificativa: ${justificativaReprova}`,
    });

    setShowReprovarDialog(false);
    setShowSplitScreen(false);
    setItemSelecionado(null);
    setJustificativaReprova("");
  };

  // Solicitar correção
  const handleSolicitarCorrecao = (item: any, tipo: "equipe" | "fornecedor") => {
    if (tipo === "equipe") {
      setItensEquipe((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "correcao" } : i))
      );
    } else {
      setItensFornecedores((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "correcao" } : i))
      );
    }
    toast.info("Solicitação de correção enviada");
    setShowSplitScreen(false);
    setItemSelecionado(null);
  };

  // Visualizar documento em split-screen
  const handleVisualizarDocumento = (item: any, tipo: "equipe" | "fornecedor") => {
    setItemSelecionado({ ...item, tipo });
    setShowSplitScreen(true);
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Só ativa se não estiver em um input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (itemSelecionado && showSplitScreen) {
        if (e.key.toLowerCase() === "a") {
          handleAprovar(itemSelecionado, itemSelecionado.tipo === "equipe" ? "equipe" : "fornecedor");
        } else if (e.key.toLowerCase() === "r") {
          setShowReprovarDialog(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [itemSelecionado, showSplitScreen]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-green-500">Aprovada pela Dedicada</Badge>;
      case "reprovada":
        return <Badge variant="destructive">Reprovada</Badge>;
      case "correcao":
        return <Badge variant="secondary">Aguardando Correção</Badge>;
      default:
        return <Badge variant="outline">Pendente Triagem</Badge>;
    }
  };

  const getDepartamentoIcon = (dept: string) => {
    const dep = departamentos.find((d) => d.id === dept);
    if (!dep) return null;
    const Icon = dep.icon;
    return (
      <div className={`${dep.color} w-8 h-8 rounded flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Sticky Header com KPIs */}
      <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="p-6 space-y-4">
          {/* Título */}
          <div>
            <h2 className="text-3xl text-foreground">Dashboard Operacional</h2>
            <p className="text-muted-foreground mt-1">
              Validação técnica de despesas • {selectedProject || "Todos os Projetos"}
            </p>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Pendências de Triagem */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-muted-foreground">
                  Pendências de Triagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{kpis.pendenciasTriagem}</span>
                  <span className="text-xs text-muted-foreground">itens</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ClipboardList className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">NFs e Pedidos</span>
                </div>
              </CardContent>
            </Card>

            {/* Saúde das Rubricas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-muted-foreground">
                  Saúde das Rubricas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl ${
                      saudeRubricas > 50 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {saudeRubricas.toFixed(0)}%
                  </span>
                  {saudeRubricas > 50 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {kpis.rubricasAtribuidas} rubricas atribuídas
                </p>
              </CardContent>
            </Card>

            {/* Verba Recebida */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-muted-foreground">
                  Verba Recebida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">
                    R$ {(kpis.verbaRecebida / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Total orçado
                </p>
              </CardContent>
            </Card>

            {/* Verba Gasta */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-muted-foreground">
                  Verba Gasta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">
                    R$ {(kpis.verbaGasta / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((kpis.verbaGasta / kpis.verbaRecebida) * 100).toFixed(0)}% executado
                </p>
              </CardContent>
            </Card>

            {/* Alertas de Cartão */}
            <Card className={kpis.alertasCartao > 0 ? "border-orange-500" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-muted-foreground">
                  Alertas de Cartão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl ${kpis.alertasCartao > 0 ? "text-orange-500" : ""}`}
                  >
                    {kpis.alertasCartao}
                  </span>
                  <span className="text-xs text-muted-foreground">alertas</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <CreditCard className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">Saldo crítico</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros Rápidos por Departamento */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtro rápido:
            </span>
            <Button
              variant={departamentoFiltro === null ? "default" : "outline"}
              size="sm"
              onClick={() => setDepartamentoFiltro(null)}
            >
              Todos
            </Button>
            {departamentos.map((dep) => {
              const Icon = dep.icon;
              return (
                <Button
                  key={dep.id}
                  variant={departamentoFiltro === dep.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDepartamentoFiltro(dep.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {dep.nome}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal com Tabs */}
      <div className="flex-1 overflow-hidden p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="equipe" className="gap-2">
              <Users className="w-4 h-4" />
              Equipe & Elenco
              <Badge variant="secondary" className="ml-2">
                {itensFiltrados(itensEquipe.filter((i) => i.status === "pendente")).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="fornecedores" className="gap-2">
              <Building2 className="w-4 h-4" />
              Fornecedores
              <Badge variant="secondary" className="ml-2">
                {itensFiltrados(itensFornecedores.filter((i) => i.status === "pendente")).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="cartoes" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Controle de Cartões
              <Badge variant="secondary" className="ml-2">
                {cartoes.filter((c) => c.status === "pendente_pc" || c.valorSolicitado - c.valorPrestado > 2000).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Aba Equipe & Elenco */}
          <TabsContent value="equipe" className="flex-1 overflow-auto mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Validação de Equipe & Elenco</span>
                  <Badge variant="outline">
                    {itensFiltrados(itensEquipe).length} itens
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dept.</TableHead>
                      <TableHead>Nome Artístico/Social</TableHead>
                      <TableHead>CPF/CNPJ</TableHead>
                      <TableHead>Rubrica</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados(itensEquipe).map((item) => (
                      <TableRow
                        key={item.id}
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => handleVisualizarDocumento(item, "equipe")}
                      >
                        <TableCell>{getDepartamentoIcon(item.departamento)}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell className="font-mono text-sm">{item.cpfCnpj}</TableCell>
                        <TableCell className="text-sm">{item.rubrica}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.tipo}</Badge>
                        </TableCell>
                        <TableCell>R$ {item.valor.toLocaleString("pt-BR")}</TableCell>
                        <TableCell>{new Date(item.data).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVisualizarDocumento(item, "equipe");
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar Documento
                              </DropdownMenuItem>
                              {item.status === "pendente" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAprovar(item, "equipe");
                                    }}
                                    className="text-green-600"
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Aprovar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setItemSelecionado({ ...item, tipo: "equipe" });
                                      setShowReprovarDialog(true);
                                    }}
                                    className="text-red-600"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reprovar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSolicitarCorrecao(item, "equipe");
                                    }}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Solicitar Correção
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {itensFiltrados(itensEquipe).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>Nenhum item pendente de validação</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Fornecedores */}
          <TabsContent value="fornecedores" className="flex-1 overflow-auto mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Validação de Fornecedores</span>
                  <Badge variant="outline">
                    {itensFiltrados(itensFornecedores).length} itens
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dept.</TableHead>
                      <TableHead>Razão Social</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Nº Documento</TableHead>
                      <TableHead>Rubrica</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados(itensFornecedores).map((item) => {
                      const diasVencimento = item.vencimento
                        ? Math.ceil(
                            (new Date(item.vencimento).getTime() - new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        : null;
                      const urgente = diasVencimento !== null && diasVencimento <= 2;

                      return (
                        <TableRow
                          key={item.id}
                          className={`cursor-pointer hover:bg-accent/50 ${
                            urgente ? "bg-red-50 dark:bg-red-950/20" : ""
                          }`}
                          onClick={() => handleVisualizarDocumento(item, "fornecedor")}
                        >
                          <TableCell>{getDepartamentoIcon(item.departamento)}</TableCell>
                          <TableCell>{item.razaoSocial}</TableCell>
                          <TableCell className="font-mono text-sm">{item.cnpj}</TableCell>
                          <TableCell className="font-mono text-sm">{item.numeroNF}</TableCell>
                          <TableCell className="text-sm">{item.rubrica}</TableCell>
                          <TableCell>R$ {item.valor.toLocaleString("pt-BR")}</TableCell>
                          <TableCell>
                            {item.vencimento && (
                              <div className="flex items-center gap-2">
                                {urgente && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                <span className={urgente ? "text-red-500" : ""}>
                                  {new Date(item.vencimento).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVisualizarDocumento(item, "fornecedor");
                                  }}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Visualizar Documento
                                </DropdownMenuItem>
                                {item.status === "pendente" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAprovar(item, "fornecedor");
                                      }}
                                      className="text-green-600"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Aprovar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setItemSelecionado({ ...item, tipo: "fornecedor" });
                                        setShowReprovarDialog(true);
                                      }}
                                      className="text-red-600"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reprovar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSolicitarCorrecao(item, "fornecedor");
                                      }}
                                    >
                                      <Edit className="w-4 h-4 mr-2" />
                                      Solicitar Correção
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {itensFiltrados(itensFornecedores).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>Nenhuma nota fiscal pendente de validação</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Controle de Cartões */}
          <TabsContent value="cartoes" className="flex-1 overflow-auto mt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Controle de Cartões Movioca</CardTitle>
                    <Button onClick={() => setShowSolicitarCargaDialog(true)} className="gap-2">
                      <Zap className="w-4 h-4" />
                      Solicitar Carga
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cartão</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Valor Solicitado</TableHead>
                        <TableHead>Valor Prestado</TableHead>
                        <TableHead>Saldo em Aberto</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartoes.map((cartao) => {
                        const saldoAberto = cartao.valorSolicitado - cartao.valorPrestado;
                        const critico = saldoAberto > 2000;

                        return (
                          <TableRow
                            key={cartao.id}
                            className={critico ? "bg-orange-50 dark:bg-orange-950/20" : ""}
                          >
                            <TableCell className="font-mono">{cartao.numero}</TableCell>
                            <TableCell>{cartao.responsavel}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDepartamentoIcon(cartao.departamento)}
                                <span>{cartao.departamento}</span>
                              </div>
                            </TableCell>
                            <TableCell>R$ {cartao.valorSolicitado.toLocaleString("pt-BR")}</TableCell>
                            <TableCell>R$ {cartao.valorPrestado.toLocaleString("pt-BR")}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {critico && <AlertCircle className="w-4 h-4 text-orange-500" />}
                                <span className={critico ? "text-orange-500" : ""}>
                                  R$ {saldoAberto.toLocaleString("pt-BR")}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {cartao.status === "pendente_pc" ? (
                                <Badge variant="destructive">Pendente PC</Badge>
                              ) : saldoAberto === 0 ? (
                                <Badge className="bg-green-500">Baixado</Badge>
                              ) : (
                                <Badge variant="secondary">Ativo</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  {cartao.valorPrestado > 0 && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCartoes((prev) =>
                                          prev.map((c) =>
                                            c.id === cartao.id
                                              ? { ...c, valorSolicitado: c.valorPrestado, status: "baixado" }
                                              : c
                                          )
                                        );
                                        toast.success("Baixa de PC realizada com sucesso");
                                      }}
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      Dar Baixa em PC
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Informação sobre Controle de Caixinha */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Controle de Caixinha:</span> Você pode
                        administrar sub-rubricas e o controle de "caixinha" dentro do orçamento
                        de cada departamento.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                        Configurar Controle de Caixinha
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Split-Screen Modal para Visualização de Documentos */}
      <Dialog open={showSplitScreen} onOpenChange={setShowSplitScreen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0" aria-describedby="dialog-split-screen-description">
          <DialogDescription id="dialog-split-screen-description" className="sr-only">
            Visualize o documento anexado e aprove ou reprove o item
          </DialogDescription>
          <div className="grid grid-cols-2 h-full">
            {/* Lado Esquerdo - Documento */}
            <div className="border-r p-6 overflow-auto bg-muted/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Documento Anexado</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Baixar PDF
                </Button>
              </div>
              <div className="border rounded-lg bg-white dark:bg-gray-900 p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-sm">
                    Visualização do documento:{" "}
                    <span className="font-mono">{itemSelecionado?.documento}</span>
                  </p>
                  <p className="text-xs mt-2">
                    (Em produção, este espaço exibiria o PDF do Google Drive)
                  </p>
                </div>
              </div>
            </div>

            {/* Lado Direito - Formulário de Edição */}
            <div className="p-6 overflow-auto">
              <DialogHeader>
                <DialogTitle>Validação de Dados</DialogTitle>
                <DialogDescription>
                  Confira os dados extraídos do documento e faça correções se necessário.
                  <br />
                  <span className="text-xs mt-1 block">
                    Atalhos: <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">A</kbd> =
                    Aprovar • <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">R</kbd> =
                    Reprovar
                  </span>
                </DialogDescription>
              </DialogHeader>

              {itemSelecionado && (
                <div className="space-y-4 mt-6">
                  {itemSelecionado.tipo === "equipe" ? (
                    <>
                      <div className="space-y-2">
                        <Label>Nome Artístico/Social</Label>
                        <Input defaultValue={itemSelecionado.nome} />
                      </div>
                      <div className="space-y-2">
                        <Label>CPF/CNPJ</Label>
                        <Input defaultValue={itemSelecionado.cpfCnpj} />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo de Pagamento</Label>
                        <Select defaultValue={itemSelecionado.tipo}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cache">Cache</SelectItem>
                            <SelectItem value="Reembolso">Reembolso</SelectItem>
                            <SelectItem value="Verba">Verba</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Razão Social</Label>
                        <Input defaultValue={itemSelecionado.razaoSocial} />
                      </div>
                      <div className="space-y-2">
                        <Label>CNPJ</Label>
                        <Input defaultValue={itemSelecionado.cnpj} />
                      </div>
                      <div className="space-y-2">
                        <Label>Número do Documento Fiscal</Label>
                        <Input defaultValue={itemSelecionado.numeroNF} />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label>Rubrica Orçamentária</Label>
                    <Select defaultValue={itemSelecionado.rubrica}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="010 - Elenco Principal">010 - Elenco Principal</SelectItem>
                        <SelectItem value="011 - Direção">011 - Direção</SelectItem>
                        <SelectItem value="012 - Fotografia">012 - Fotografia</SelectItem>
                        <SelectItem value="015 - Figurino">015 - Figurino</SelectItem>
                        <SelectItem value="018 - Gastronomia">018 - Gastronomia</SelectItem>
                        <SelectItem value="020 - Transporte">020 - Transporte</SelectItem>
                        <SelectItem value="022 - Objetos de Cena">022 - Objetos de Cena</SelectItem>
                        <SelectItem value="025 - Equipamentos">025 - Equipamentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Valor</Label>
                    <Input type="number" defaultValue={itemSelecionado.valor} />
                  </div>

                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input type="date" defaultValue={itemSelecionado.data} />
                  </div>

                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <Select defaultValue={itemSelecionado.departamento}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((dep) => (
                          <SelectItem key={dep.id} value={dep.id}>
                            {dep.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() =>
                        handleAprovar(itemSelecionado, itemSelecionado.tipo === "equipe" ? "equipe" : "fornecedor")
                      }
                      className="flex-1 bg-green-500 hover:bg-green-600 gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Aprovar (A)
                    </Button>
                    <Button
                      onClick={() => setShowReprovarDialog(true)}
                      variant="destructive"
                      className="flex-1 gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reprovar (R)
                    </Button>
                  </div>
                  <Button
                    onClick={() =>
                      handleSolicitarCorrecao(itemSelecionado, itemSelecionado.tipo === "equipe" ? "equipe" : "fornecedor")
                    }
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Solicitar Correção
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Reprovação */}
      <Dialog open={showReprovarDialog} onOpenChange={setShowReprovarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Item</DialogTitle>
            <DialogDescription>
              A justificativa é obrigatória para reprovar um item. O responsável receberá a
              notificação com o motivo da reprovação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Justificativa da Reprovação *</Label>
              <Textarea
                placeholder="Ex: Documento ilegível, dados inconsistentes, valor divergente do contratado..."
                value={justificativaReprova}
                onChange={(e) => setJustificativaReprova(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReprovarDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (itemSelecionado) {
                  handleReprovar(itemSelecionado, itemSelecionado.tipo === "equipe" ? "equipe" : "fornecedor");
                }
              }}
            >
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Solicitação de Carga */}
      <Dialog open={showSolicitarCargaDialog} onOpenChange={setShowSolicitarCargaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Nova Carga de Cartão</DialogTitle>
            <DialogDescription>
              Vincule a solicitação de carga a uma rubrica orçamentária específica.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Responsável pelo Cartão</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Carlos Eduardo Lima</SelectItem>
                  <SelectItem value="2">Ana Paula Oliveira</SelectItem>
                  <SelectItem value="3">Beatriz Ferreira</SelectItem>
                  <SelectItem value="4">Roberto Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rubrica Orçamentária</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a rubrica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="010">010 - Elenco Principal</SelectItem>
                  <SelectItem value="015">015 - Figurino</SelectItem>
                  <SelectItem value="018">018 - Gastronomia</SelectItem>
                  <SelectItem value="020">020 - Transporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Valor da Carga</Label>
              <Input type="number" placeholder="R$ 0,00" />
            </div>
            <div className="space-y-2">
              <Label>Justificativa</Label>
              <Textarea placeholder="Motivo da solicitação de carga..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSolicitarCargaDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                toast.success("Solicitação de carga enviada ao Financeiro");
                setShowSolicitarCargaDialog(false);
              }}
            >
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}