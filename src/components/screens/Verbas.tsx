import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { PrestacaoDeContas } from "./PrestacaoDeContas";
import { SolicitacaoDeVerba } from "./SolicitacaoDeVerba";
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
  Upload,
  Calendar as CalendarIcon,
  Filter,
  Eye,
  FileText,
  Check,
  X,
  Download,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
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
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";

interface Verba {
  id: string;
  data: string;
  departamento: string;
  responsavel: string;
  cartao: string;
  projeto: string;
  valor: number;
  valorLiberado: number;
  valorPrestado: number;
  valorAprovado: number;
  valorPendente: number;
  finalidade: string;
  aprovacaoDepartamento: "Pendente" | "Aprovado" | "Reprovado";
  aprovacaoControladorDedicada: "Pendente" | "Aprovado" | "Reprovado";
  aprovacaoControladorInterna: "Pendente" | "Aprovado" | "Reprovado";
  statusGeral: string;
}

interface Comprovante {
  id: string;
  data: string;
  fornecedor: string;
  descricao: string;
  categoria: string;
  valor: number;
  comprovante?: File | string;
  status: "Pendente" | "Em análise" | "Aprovado" | "Reprovado";
}

interface ResumoDepartamento {
  departamento: string;
  previsto: number;
  liberado: number;
  prestado: number;
  aguardandoPrestacao: number;
  aguardandoReembolso: number;
}

export default function Verbas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openNovaSolicitacao, setOpenNovaSolicitacao] = useState(false);
  const [openPrestacao, setOpenPrestacao] = useState(false);
  const [openFiltros, setOpenFiltros] = useState(false);
  const [selectedVerba, setSelectedVerba] = useState<Verba | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'prestacao' | 'solicitacao'>('list');
  const [selectedPrestacaoData, setSelectedPrestacaoData] = useState<any>(null);
  const [selectedSolicitacaoData, setSelectedSolicitacaoData] = useState<any>(null);

  // Form states - Nova Solicitação
  const [departamento, setDepartamento] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [projeto, setProjeto] = useState("");
  const [valor, setValor] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [dataVencimento, setDataVencimento] = useState<Date>();
  const [cartaoDestino, setCartaoDestino] = useState("");
  const [origemAdiantamento, setOrigemAdiantamento] = useState("");

  // Form states - Prestação de Contas
  const [comprovantes, setComprovantes] = useState<Comprovante[]>([]);
  const [novoComprovante, setNovoComprovante] = useState<Partial<Comprovante>>({
    data: "",
    fornecedor: "",
    descricao: "",
    categoria: "",
    valor: 0,
    status: "Pendente",
  });

  // Filtros
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroProjeto, setFiltroProjeto] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPeriodoInicio, setFiltroPeriodoInicio] = useState<Date>();
  const [filtroPeriodoFim, setFiltroPeriodoFim] = useState<Date>();

  const verbas: Verba[] = [
    {
      id: "V-001",
      data: "15/11/2024",
      departamento: "Produção",
      responsavel: "Maria Silva",
      cartao: "Cartão Produção 01",
      projeto: "Projeto Alpha",
      valor: 15000,
      valorLiberado: 15000,
      valorPrestado: 12000,
      valorAprovado: 10000,
      valorPendente: 2000,
      finalidade: "Locação de equipamentos",
      aprovacaoDepartamento: "Aprovado",
      aprovacaoControladorDedicada: "Aprovado",
      aprovacaoControladorInterna: "Pendente",
      statusGeral: "Aguardando Controladoria interna",
    },
    {
      id: "V-002",
      data: "14/11/2024",
      departamento: "Direção",
      responsavel: "João Santos",
      cartao: "Cartão Direção 01",
      projeto: "Projeto Beta",
      valor: 8000,
      valorLiberado: 8000,
      valorPrestado: 8000,
      valorAprovado: 0,
      valorPendente: 8000,
      finalidade: "Despesas de viagem",
      aprovacaoDepartamento: "Aprovado",
      aprovacaoControladorDedicada: "Pendente",
      aprovacaoControladorInterna: "Pendente",
      statusGeral: "Aguardando Controladoria dedicada",
    },
    {
      id: "V-003",
      data: "13/11/2024",
      departamento: "Arte",
      responsavel: "Ana Costa",
      cartao: "Cartão Arte 01",
      projeto: "Projeto Alpha",
      valor: 12000,
      valorLiberado: 12000,
      valorPrestado: 12000,
      valorAprovado: 12000,
      valorPendente: 0,
      finalidade: "Materiais cenográficos",
      aprovacaoDepartamento: "Aprovado",
      aprovacaoControladorDedicada: "Aprovado",
      aprovacaoControladorInterna: "Aprovado",
      statusGeral: "Aprovado",
    },
    {
      id: "V-004",
      data: "12/11/2024",
      departamento: "Produção",
      responsavel: "Carlos Mendes",
      cartao: "Cartão Produção 02",
      projeto: "Projeto Beta",
      valor: 5000,
      valorLiberado: 5000,
      valorPrestado: 0,
      valorAprovado: 0,
      valorPendente: 0,
      finalidade: "Alimentação equipe",
      aprovacaoDepartamento: "Pendente",
      aprovacaoControladorDedicada: "Pendente",
      aprovacaoControladorInterna: "Pendente",
      statusGeral: "Aguardando Departamento",
    },
    {
      id: "V-005",
      data: "10/11/2024",
      departamento: "Fotografia",
      responsavel: "Pedro Lima",
      cartao: "Cartão Fotografia 01",
      projeto: "Projeto Alpha",
      valor: 20000,
      valorLiberado: 20000,
      valorPrestado: 15000,
      valorAprovado: 15000,
      valorPendente: 0,
      finalidade: "Equipamentos de iluminaão",
      aprovacaoDepartamento: "Aprovado",
      aprovacaoControladorDedicada: "Aprovado",
      aprovacaoControladorInterna: "Aprovado",
      statusGeral: "Aprovado",
    },
  ];

  const comprovantesExemplo: Comprovante[] = [
    {
      id: "c1",
      data: "10/11/2024",
      fornecedor: "Locadora XYZ",
      descricao: "Aluguel de câmera RED",
      categoria: "Equipamentos",
      valor: 5000,
      comprovante: "nota_fiscal_001.pdf",
      status: "Aprovado",
    },
    {
      id: "c2",
      data: "11/11/2024",
      fornecedor: "Hotel ABC",
      descricao: "Hospedagem equipe",
      categoria: "Hospedagem",
      valor: 3000,
      comprovante: "nota_fiscal_002.pdf",
      status: "Em análise",
    },
    {
      id: "c3",
      data: "12/11/2024",
      fornecedor: "Restaurante Gourmet",
      descricao: "Alimentação dia 12/11",
      categoria: "Alimentação",
      valor: 800,
      status: "Pendente",
    },
  ];

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const handleSalvarSolicitacao = () => {
    if (!departamento || !responsavel || !projeto || !valor || !cartaoDestino || !origemAdiantamento) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Solicitação de verba criada com sucesso!");
    setOpenNovaSolicitacao(false);
    resetFormSolicitacao();
  };

  const resetFormSolicitacao = () => {
    setDepartamento("");
    setResponsavel("");
    setProjeto("");
    setValor("");
    setFinalidade("");
    setDataVencimento(undefined);
    setCartaoDestino("");
    setOrigemAdiantamento("");
  };

  const handleAbrirPrestacao = (verba: Verba) => {
    // Dados mockados para a prestação de contas
    const prestacaoData = {
      id: verba.id,
      solicitacaoVerbaId: verba.id,
      numeroCartao: verba.cartao,
      solicitante: verba.responsavel,
      departamento: verba.departamento,
      valorLiberado: verba.valorLiberado,
      valorPrestado: verba.valorPrestado,
      valorAprovado: verba.valorAprovado,
      dataLiberacao: new Date(2024, 10, 15),
      dataEnvioPrestacao: new Date(2024, 10, 20),
      status: "Parcialmente aprovado",
      statusOmie: "Não enviado",
      dataPrestacao: new Date(2024, 10, 20),
      lotes: [
        {
          id: "lote-1",
          numeroLote: 1,
          descricao: "Despesas de produção - Semana 1",
          valorTotal: 5000,
          status: "Aprovado",
          dataEnvio: new Date(2024, 10, 20),
          dataAprovacao: new Date(2024, 10, 22),
          notas: [
            {
              id: "nota-1",
              cnpj: "12.345.678/0001-99",
              razaoSocial: "Locadora XYZ Ltda",
              numeroDocumento: "NF-001234",
              dataCompra: new Date(2024, 10, 16),
              descritivo: "Aluguel de equipamentos de filmagem",
              valor: 3000,
              statusControladoria: "Aprovado" as const,
              observacaoControladoria: "Documentação aprovada",
              comprovante: "nota_fiscal_001.pdf",
            },
            {
              id: "nota-2",
              cnpj: "98.765.432/0001-11",
              razaoSocial: "Hotel ABC",
              numeroDocumento: "NF-005678",
              dataCompra: new Date(2024, 10, 17),
              descritivo: "Hospedagem da equipe técnica",
              valor: 2000,
              statusControladoria: "Aprovado" as const,
              comprovante: "nota_fiscal_002.pdf",
            },
          ],
        },
        {
          id: "lote-2",
          numeroLote: 2,
          descricao: "Despesas de alimentação",
          valorTotal: 3000,
          status: "Pendente análise",
          dataEnvio: new Date(2024, 10, 21),
          notas: [
            {
              id: "nota-3",
              cnpj: "11.222.333/0001-44",
              razaoSocial: "Restaurante Gourmet",
              numeroDocumento: "CF-789012",
              dataCompra: new Date(2024, 10, 18),
              descritivo: "Refeições equipe de produção",
              valor: 1500,
              statusControladoria: "Pendente" as const,
            },
            {
              id: "nota-4",
              cnpj: "44.555.666/0001-77",
              razaoSocial: "Mercado Central",
              numeroDocumento: "NF-345678",
              dataCompra: new Date(2024, 10, 19),
              descritivo: "Compras para catering",
              valor: 1500,
              statusControladoria: "Pendente" as const,
            },
          ],
        },
      ],
    };

    setSelectedPrestacaoData(prestacaoData);
    setViewMode('prestacao');
  };

  const handleVisualizarSolicitacao = (verba: Verba) => {
    // Dados mockados para a solicitação de verba
    const solicitacaoData = {
      id: verba.id,
      data: new Date(2024, 10, 15, 10, 30),
      solicitante: verba.responsavel,
      departamento: verba.departamento,
      cartaoId: "cartao-001",
      numeroCartao: verba.cartao,
      cpfVinculado: "123.456.789-00",
      valorSolicitado: verba.valor,
      valorAprovado: verba.valorLiberado,
      justificativa: verba.finalidade,
      observacao: "Aprovado conforme análise da controladoria",
      status: verba.statusGeral,
      dataAprovacao: new Date(2024, 10, 16, 14, 20),
      aprovadoPor: "Ana Silva - Controladoria",
    };

    setSelectedSolicitacaoData(solicitacaoData);
    setViewMode('solicitacao');
  };

  const handleAdicionarComprovante = () => {
    if (!novoComprovante.fornecedor || !novoComprovante.valor || !novoComprovante.categoria) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const comprovante: Comprovante = {
      id: Date.now().toString(),
      data: novoComprovante.data || new Date().toLocaleDateString("pt-BR"),
      fornecedor: novoComprovante.fornecedor,
      descricao: novoComprovante.descricao || "",
      categoria: novoComprovante.categoria,
      valor: novoComprovante.valor || 0,
      comprovante: novoComprovante.comprovante,
      status: "Pendente",
    };

    setComprovantes([...comprovantes, comprovante]);
    setNovoComprovante({
      data: "",
      fornecedor: "",
      descricao: "",
      categoria: "",
      valor: 0,
      status: "Pendente",
    });
    toast.success("Comprovante adicionado!");
  };

  const handleFileUpload = (file: File) => {
    setNovoComprovante({ ...novoComprovante, comprovante: file });
    toast.success(`Arquivo ${file.name} carregado!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const calcularTotalPorCategoria = () => {
    const totais: Record<string, number> = {};
    comprovantes.forEach((c) => {
      if (!totais[c.categoria]) {
        totais[c.categoria] = 0;
      }
      totais[c.categoria] += c.valor;
    });
    return totais;
  };

  const calcularTotalGeral = () => {
    return comprovantes.reduce((sum, c) => sum + c.valor, 0);
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Aprovado") return "default";
    if (status === "Pendente") return "secondary";
    if (status === "Em análise") return "outline";
    if (status === "Reprovado") return "destructive";
    return "outline";
  };

  const getPipelineIcon = (status: "Pendente" | "Aprovado" | "Reprovado") => {
    if (status === "Aprovado") return <Check className="w-4 h-4 text-green-600" />;
    if (status === "Reprovado") return <X className="w-4 h-4 text-red-600" />;
    return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
  };

  // Cálculos para cards de visão geral
  const calcularVisaoGeral = () => {
    const previsto = verbas.reduce((sum, v) => sum + v.valor, 0);
    const liberado = verbas.reduce((sum, v) => sum + v.valorLiberado, 0);
    const prestado = verbas.reduce((sum, v) => sum + v.valorPrestado, 0);
    const aguardandoPrestacao = verbas
      .filter(v => v.valorLiberado > 0 && v.valorPrestado === 0)
      .reduce((sum, v) => sum + v.valorLiberado, 0);
    const aguardandoReembolso = verbas.reduce((sum, v) => sum + v.valorPendente, 0);

    return { previsto, liberado, prestado, aguardandoPrestacao, aguardandoReembolso };
  };

  // Cálculos para resumo por departamento
  const calcularResumoPorDepartamento = (): ResumoDepartamento[] => {
    const departamentos = Array.from(new Set(verbas.map(v => v.departamento)));
    
    return departamentos.map(dept => {
      const verbasDepto = verbas.filter(v => v.departamento === dept);
      
      return {
        departamento: dept,
        previsto: verbasDepto.reduce((sum, v) => sum + v.valor, 0),
        liberado: verbasDepto.reduce((sum, v) => sum + v.valorLiberado, 0),
        prestado: verbasDepto.reduce((sum, v) => sum + v.valorPrestado, 0),
        aguardandoPrestacao: verbasDepto
          .filter(v => v.valorLiberado > 0 && v.valorPrestado === 0)
          .reduce((sum, v) => sum + v.valorLiberado, 0),
        aguardandoReembolso: verbasDepto.reduce((sum, v) => sum + v.valorPendente, 0),
      };
    });
  };

  const visaoGeral = calcularVisaoGeral();
  const resumoDepartamentos = calcularResumoPorDepartamento();

  // Se estiver visualizando uma prestação de contas
  if (viewMode === 'prestacao' && selectedPrestacaoData) {
    return (
      <PrestacaoDeContas
        prestacao={selectedPrestacaoData}
        onVoltar={() => {
          setViewMode('list');
          setSelectedPrestacaoData(null);
        }}
        isControladoria={false}
      />
    );
  }

  // Se estiver visualizando uma solicitação de verba
  if (viewMode === 'solicitacao' && selectedSolicitacaoData) {
    return (
      <SolicitacaoDeVerba
        solicitacao={selectedSolicitacaoData}
        onVoltar={() => {
          setViewMode('list');
          setSelectedSolicitacaoData(null);
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Verbas</h2>
          <p className="text-muted-foreground mt-1">
            Gestão de solicitações de verba e prestações de contas
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por departamento, responsável ou projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setOpenFiltros(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Filtros avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="visao-geral" className="space-y-4">
        {/* TabsList com scroll horizontal no mobile */}
        <TabsList className="w-full md:grid md:grid-cols-3 flex overflow-x-auto whitespace-nowrap scrollbar-hide">
          <TabsTrigger value="visao-geral" className="flex-shrink-0">Visão geral</TabsTrigger>
          <TabsTrigger value="rastreamento" className="flex-shrink-0">Rastreamento de valores</TabsTrigger>
          <TabsTrigger value="solicitacoes" className="flex-shrink-0">Solicitações de verba</TabsTrigger>
        </TabsList>

        {/* Aba: Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-6">
          {/* Cards de Resumo Geral */}
          <div>
            <h3 className="text-lg font-medium mb-4">Resumo Geral</h3>
            <div className="grid grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    Previsto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(visaoGeral.previsto)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Liberado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(visaoGeral.liberado)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    Prestado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(visaoGeral.prestado)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Aguardando prestação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(visaoGeral.aguardandoPrestacao)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Aguardando reembolso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(visaoGeral.aguardandoReembolso)}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Resumo por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo por Departamento</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Controle geral de todas as verbas por departamento
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Previsto</TableHead>
                    <TableHead>Liberado</TableHead>
                    <TableHead>Prestado</TableHead>
                    <TableHead>Aguardando prestação</TableHead>
                    <TableHead>Aguardando reembolso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumoDepartamentos.map((dept) => (
                    <TableRow key={dept.departamento}>
                      <TableCell className="font-medium">{dept.departamento}</TableCell>
                      <TableCell>{formatCurrency(dept.previsto)}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {formatCurrency(dept.liberado)}
                      </TableCell>
                      <TableCell className="text-purple-600 font-medium">
                        {formatCurrency(dept.prestado)}
                      </TableCell>
                      <TableCell className="text-amber-600 font-medium">
                        {formatCurrency(dept.aguardandoPrestacao)}
                      </TableCell>
                      <TableCell className="text-orange-600 font-medium">
                        {formatCurrency(dept.aguardandoReembolso)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Linha de Total */}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>TOTAL</TableCell>
                    <TableCell>{formatCurrency(visaoGeral.previsto)}</TableCell>
                    <TableCell className="text-green-600">
                      {formatCurrency(visaoGeral.liberado)}
                    </TableCell>
                    <TableCell className="text-purple-600">
                      {formatCurrency(visaoGeral.prestado)}
                    </TableCell>
                    <TableCell className="text-amber-600">
                      {formatCurrency(visaoGeral.aguardandoPrestacao)}
                    </TableCell>
                    <TableCell className="text-orange-600">
                      {formatCurrency(visaoGeral.aguardandoReembolso)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Rastreamento de Valores */}
        <TabsContent value="rastreamento" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Rastreamento de Valores</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Controle detalhado de cada solicitação de verba
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Cartão</TableHead>
                      <TableHead>Valor liberado</TableHead>
                      <TableHead>Valor prestado</TableHead>
                      <TableHead>Valor aprovado</TableHead>
                      <TableHead>Valor pendente</TableHead>
                      <TableHead>Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verbas.map((verba) => {
                      const saldo = verba.valorLiberado - verba.valorPrestado;
                      return (
                        <TableRow key={verba.id}>
                          <TableCell className="font-medium">{verba.departamento}</TableCell>
                          <TableCell>{verba.responsavel}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {verba.cartao}
                          </TableCell>
                          <TableCell className="text-green-600 font-medium">
                            {formatCurrency(verba.valorLiberado)}
                          </TableCell>
                          <TableCell className="text-purple-600 font-medium">
                            {formatCurrency(verba.valorPrestado)}
                          </TableCell>
                          <TableCell className="text-blue-600 font-medium">
                            {formatCurrency(verba.valorAprovado)}
                          </TableCell>
                          <TableCell className="text-orange-600 font-medium">
                            {formatCurrency(verba.valorPendente)}
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${saldo > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                              {formatCurrency(saldo)}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Solicitações de verba */}
        <TabsContent value="solicitacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Solicitações de verba</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setOpenNovaSolicitacao(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Solicitação de verba
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Finalidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pipeline</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verbas.map((verba) => (
                      <TableRow key={verba.id}>
                        <TableCell className="font-mono text-sm">{verba.id}</TableCell>
                        <TableCell>{verba.data}</TableCell>
                        <TableCell>{verba.departamento}</TableCell>
                        <TableCell>{verba.responsavel}</TableCell>
                        <TableCell>{verba.projeto}</TableCell>
                        <TableCell>{formatCurrency(verba.valor)}</TableCell>
                        <TableCell>{verba.finalidade}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{verba.statusGeral}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col items-center">
                              {getPipelineIcon(verba.aprovacaoDepartamento)}
                              <span className="text-xs mt-1">Dept.</span>
                            </div>
                            <div className="w-4 h-px bg-gray-300" />
                            <div className="flex flex-col items-center">
                              {getPipelineIcon(verba.aprovacaoControladorDedicada)}
                              <span className="text-xs mt-1">C.Ded.</span>
                            </div>
                            <div className="w-4 h-px bg-gray-300" />
                            <div className="flex flex-col items-center">
                              {getPipelineIcon(verba.aprovacaoControladorInterna)}
                              <span className="text-xs mt-1">C.Int.</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleVisualizarSolicitacao(verba)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar solicitação
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAbrirPrestacao(verba)}>
                                <FileText className="w-4 h-4 mr-2" />
                                Prestação de contas
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
        </TabsContent>
      </Tabs>

      {/* Modal - Nova Solicitação de Verba */}
      <Dialog open={openNovaSolicitacao} onOpenChange={setOpenNovaSolicitacao}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova solicitação de verba</DialogTitle>
            <DialogDescription>
              Preencha os dados para solicitar uma nova verba
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Departamento <span className="text-destructive">*</span></Label>
                <Select value={departamento} onValueChange={setDepartamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Produção">Produção</SelectItem>
                    <SelectItem value="Direção">Direção</SelectItem>
                    <SelectItem value="Arte">Arte</SelectItem>
                    <SelectItem value="Fotografia">Fotografia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Responsável <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Nome do responsável"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Projeto <span className="text-destructive">*</span></Label>
                <Select value={projeto} onValueChange={setProjeto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                    <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                    <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valor <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="R$ 0,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                placeholder="Adicione observações sobre a solicitação (opcional)..."
                value={finalidade}
                onChange={(e) => setFinalidade(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label>Data de vencimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataVencimento ? format(dataVencimento, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataVencimento}
                    onSelect={setDataVencimento}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cartão de destino <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Número do cartão"
                  value={cartaoDestino}
                  onChange={(e) => setCartaoDestino(e.target.value)}
                />
              </div>
              <div>
                <Label>Origem do adiantamento <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Descrição da origem"
                  value={origemAdiantamento}
                  onChange={(e) => setOrigemAdiantamento(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNovaSolicitacao(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSalvarSolicitacao}>
              Criar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Prestação de Contas */}
      <Dialog open={openPrestacao} onOpenChange={setOpenPrestacao}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prestação de Contas - {selectedVerba?.projeto}</DialogTitle>
            <DialogDescription>
              Adicione comprovantes para prestar contas da verba liberada
            </DialogDescription>
          </DialogHeader>
          
          {selectedVerba && (
            <div className="space-y-6 mt-4">
              {/* Resumo da verba */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor solicitado</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedVerba.valor)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Departamento</p>
                      <p className="text-lg font-semibold">{selectedVerba.departamento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Responsável</p>
                      <p className="text-lg font-semibold">{selectedVerba.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="text-lg font-semibold">{selectedVerba.data}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adicionar novo comprovante */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Adicionar comprovante</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data <span className="text-destructive">*</span></Label>
                        <Input
                          type="date"
                          value={novoComprovante.data}
                          onChange={(e) => setNovoComprovante({ ...novoComprovante, data: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Fornecedor <span className="text-destructive">*</span></Label>
                        <Input
                          placeholder="Nome do fornecedor"
                          value={novoComprovante.fornecedor}
                          onChange={(e) => setNovoComprovante({ ...novoComprovante, fornecedor: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Categoria <span className="text-destructive">*</span></Label>
                        <Select 
                          value={novoComprovante.categoria} 
                          onValueChange={(value) => setNovoComprovante({ ...novoComprovante, categoria: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                            <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                            <SelectItem value="Alimentação">Alimentação</SelectItem>
                            <SelectItem value="Transporte">Transporte</SelectItem>
                            <SelectItem value="Materiais">Materiais</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Valor <span className="text-destructive">*</span></Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={novoComprovante.valor || ""}
                          onChange={(e) => setNovoComprovante({ ...novoComprovante, valor: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea
                        placeholder="Descrição da despesa..."
                        value={novoComprovante.descricao}
                        onChange={(e) => setNovoComprovante({ ...novoComprovante, descricao: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Comprovante (Nota Fiscal, Recibo, etc.)</Label>
                      <div
                        className={`
                          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                          transition-colors
                          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
                        `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-muted-foreground">
                          {novoComprovante.comprovante 
                            ? typeof novoComprovante.comprovante === 'string'
                              ? novoComprovante.comprovante
                              : novoComprovante.comprovante.name
                            : 'Arraste o arquivo ou clique para selecionar'}
                        </p>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleAdicionarComprovante}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar comprovante
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de comprovantes */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Comprovantes adicionados</CardTitle>
                    <Badge variant="outline">
                      {comprovantes.length} {comprovantes.length === 1 ? 'comprovante' : 'comprovantes'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {comprovantes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum comprovante adicionado ainda
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Fornecedor</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Comprovante</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {comprovantes.map((comp) => (
                            <TableRow key={comp.id}>
                              <TableCell>{comp.data}</TableCell>
                              <TableCell>{comp.fornecedor}</TableCell>
                              <TableCell>{comp.categoria}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{comp.descricao}</TableCell>
                              <TableCell>{formatCurrency(comp.valor)}</TableCell>
                              <TableCell>
                                {comp.comprovante && (
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge variant={getStatusBadgeVariant(comp.status)}>
                                  {comp.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Resumo por categoria */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Resumo por categoria</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(calcularTotalPorCategoria()).map(([categoria, total]) => (
                            <div key={categoria} className="p-3 border rounded-lg">
                              <p className="text-sm text-muted-foreground">{categoria}</p>
                              <p className="text-lg font-semibold">{formatCurrency(total)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total geral */}
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <span className="font-semibold">Total geral prestado</span>
                        <span className="text-xl font-bold">{formatCurrency(calcularTotalGeral())}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenPrestacao(false)}>
              Fechar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-2" />
              Enviar prestação de contas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Filtros Avançados */}
      <Dialog open={openFiltros} onOpenChange={setOpenFiltros}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtros avançados</DialogTitle>
            <DialogDescription>
              Filtre as solicitações de verba por diversos critérios
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Departamento</Label>
              <Select value={filtroDepartamento} onValueChange={setFiltroDepartamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os departamentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Produção">Produção</SelectItem>
                  <SelectItem value="Direção">Direção</SelectItem>
                  <SelectItem value="Arte">Arte</SelectItem>
                  <SelectItem value="Fotografia">Fotografia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Projeto</Label>
              <Select value={filtroProjeto} onValueChange={setFiltroProjeto}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os projetos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="reprovado">Reprovado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Período - Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filtroPeriodoInicio ? format(filtroPeriodoInicio, "PPP", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filtroPeriodoInicio}
                      onSelect={setFiltroPeriodoInicio}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Período - Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filtroPeriodoFim ? format(filtroPeriodoFim, "PPP", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filtroPeriodoFim}
                      onSelect={setFiltroPeriodoFim}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenFiltros(false)}>
              Limpar filtros
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpenFiltros(false)}>
              Aplicar filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}