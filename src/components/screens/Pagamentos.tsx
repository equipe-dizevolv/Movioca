import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  Check, 
  X,
  Calendar as CalendarIcon,
  Clock,
  Building2,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Filter,
  ChevronsUpDown,
  Upload
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";
import PagamentoDetalhes from "./PagamentoDetalhes";

interface Documentos {
  notaFiscal?: string;
  contrato?: string;
  aditivo?: string;
  comprovantePagamento?: string;
}

interface Parcela {
  id: string;
  numero: number;
  vencimento: Date;
  dataPagamento?: Date;
  valor: number;
  status: "Programado" | "Aguardando aprovação" | "Aprovado" | "Liberado para pagamento" | "Pago";
  etapaAtual: string;
  pipelineCompleto: {
    solicitacaoNF: "Pendente" | "Concluído" | "Reprovado";
    validacaoNF: "Pendente" | "Concluído" | "Reprovado";
    aprovacaoControladoriaD: "Pendente" | "Aprovado" | "Reprovado";
    aprovacaoControladoriaIConformidade: "Pendente" | "Aprovado" | "Reprovado";
    aprovacaoControladoriaIFinanceira: "Pendente" | "Aprovado" | "Reprovado";
    liberacaoFinanceiro: "Pendente" | "Concluído" | "Reprovado";
    pagamentoRealizado: "Pendente" | "Concluído";
  };
  statusOmie?: "Não enviado" | "Enviado" | "Confirmado";
  comprovante?: string;
  documentos?: Documentos;
}

interface DadosBancarios {
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  pix?: string;
}

interface Fornecedor {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpjCpf: string;
  projeto: string;
  itemOrcamentario: string;
  descritivo: string;
  totalContratado: number;
  totalPago: number;
  saldoPagar: number;
  statusAprovacao: string;
  parcelas: Parcela[];
  dadosBancarios: DadosBancarios;
  documentos: Documentos;
  isRPA: boolean;
  verificarEntregaAntesUltimoPgto: boolean;
  dataInicioContratacao: Date;
  dataFimContratacao: Date;
  observacoes?: string;
}

export default function Pagamentos() {
  const { currentUser, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState("todos");
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
  const [selectedParcela, setSelectedParcela] = useState<Parcela | null>(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [openRegistrarPagamento, setOpenRegistrarPagamento] = useState(false);
  const [openAprovar, setOpenAprovar] = useState(false);
  const [openReprovar, setOpenReprovar] = useState(false);
  const [openPagamentoAvulso, setOpenPagamentoAvulso] = useState(false);
  const [openConfirmarOmie, setOpenConfirmarOmie] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [pagamentoDetalheId, setPagamentoDetalheId] = useState<string>("");

  // Form states - Registrar Pagamento
  const [dataPagamento, setDataPagamento] = useState<Date>();
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [observacaoPagamento, setObservacaoPagamento] = useState("");

  // Form states - Reprovar
  const [motivoReprovacao, setMotivoReprovacao] = useState("");

  // Form states - Pagamento Avulso
  const [fornecedorAvulso, setFornecedorAvulso] = useState("");
  const [razaoSocialAvulso, setRazaoSocialAvulso] = useState("");
  const [projetoAvulso, setProjetoAvulso] = useState("");
  const [itemOrcamentarioAvulso, setItemOrcamentarioAvulso] = useState("");
  const [valorAvulso, setValorAvulso] = useState("");
  const [vencimentoAvulso, setVencimentoAvulso] = useState<Date>();
  const [descricaoAvulso, setDescricaoAvulso] = useState("");
  const [openFornecedorCombobox, setOpenFornecedorCombobox] = useState(false);
  const [openProjetoCombobox, setOpenProjetoCombobox] = useState(false);

  // Lista de fornecedores cadastrados
  const fornecedoresCadastrados = [
    { id: "FOR-001", nome: "Carlos Roberto Silva", razaoSocial: "Produtora XYZ Produções Ltda", cnpjCpf: "12.345.678/0001-99" },
    { id: "FOR-002", nome: "João Silva", razaoSocial: "João Silva - MEI", cnpjCpf: "123.456.789-00" },
    { id: "FOR-003", nome: "Maria José Santos", razaoSocial: "Estúdio ABC Edições Ltda", cnpjCpf: "98.765.432/0001-00" },
    { id: "FOR-004", nome: "Ana Paula Costa", razaoSocial: "Costa Produções Ltda", cnpjCpf: "11.222.333/0001-44" },
    { id: "FOR-005", nome: "Pedro Henrique Lima", razaoSocial: "Lima Audiovisual ME", cnpjCpf: "987.654.321-00" },
    { id: "FOR-006", nome: "Juliana Oliveira", razaoSocial: "JO Filmes e Produções", cnpjCpf: "22.333.444/0001-55" },
    { id: "FOR-007", nome: "Roberto Carlos Santos", razaoSocial: "RCS Produções Artísticas", cnpjCpf: "456.789.123-00" },
    { id: "FOR-008", nome: "Fernanda Silva", razaoSocial: "FS Criações Audiovisuais Ltda", cnpjCpf: "33.444.555/0001-66" },
  ];

  // Lista de projetos ativos
  const projetosAtivos = [
    { id: "PROJ-001", nome: "Projeto Alpha", status: "Ativo" },
    { id: "PROJ-002", nome: "Projeto Beta", status: "Ativo" },
    { id: "PROJ-003", nome: "Projeto Gama", status: "Ativo" },
    { id: "PROJ-004", nome: "Série Documentário - História", status: "Ativo" },
    { id: "PROJ-005", nome: "Longa-metragem - Drama", status: "Ativo" },
    { id: "PROJ-006", nome: "Curta-metragem Experimental", status: "Ativo" },
  ];

  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
    {
      id: "PAG-001",
      nome: "Carlos Roberto Silva",
      razaoSocial: "Produtora XYZ Produções Ltda",
      cnpjCpf: "12.345.678/0001-99",
      projeto: "Projeto Alpha",
      itemOrcamentario: "003.001 - Diretor(a)",
      descritivo: "Direção geral do projeto",
      totalContratado: 50000,
      totalPago: 25000,
      saldoPagar: 25000,
      statusAprovacao: "Aguardando Controladoria interna",
      isRPA: false,
      verificarEntregaAntesUltimoPgto: true,
      dataInicioContratacao: new Date(2024, 0, 1),
      dataFimContratacao: new Date(2024, 11, 31),
      observacoes: "Contratação com verificação de entrega antes do último pagamento",
      dadosBancarios: {
        banco: "341 - Itaú Unibanco",
        agencia: "1234",
        conta: "56789-0",
        tipoConta: "Conta Corrente",
        pix: "12.345.678/0001-99",
      },
      documentos: {
        notaFiscal: "NF_001_2024.pdf",
        contrato: "Contrato_XYZ_2024.pdf",
        aditivo: "",
      },
      parcelas: [
        {
          id: "p1",
          numero: 1,
          vencimento: new Date(2024, 1, 15),
          dataPagamento: new Date(2024, 1, 15),
          valor: 25000,
          status: "Pago",
          etapaAtual: "Pagamento Realizado",
          pipelineCompleto: {
            solicitacaoNF: "Concluído",
            validacaoNF: "Concluído",
            aprovacaoControladoriaD: "Aprovado",
            aprovacaoControladoriaIConformidade: "Aprovado",
            aprovacaoControladoriaIFinanceira: "Aprovado",
            liberacaoFinanceiro: "Concluído",
            pagamentoRealizado: "Concluído",
          },
          statusOmie: "Confirmado",
          comprovante: "comprovante_p1.pdf",
          documentos: {
            notaFiscal: "NF_P1_2024.pdf",
            contrato: "Contrato_XYZ_2024.pdf",
            comprovantePagamento: "comprovante_p1.pdf",
          },
        },
        {
          id: "p2",
          numero: 2,
          vencimento: new Date(2024, 4, 15),
          valor: 25000,
          status: "Aguardando aprovação",
          etapaAtual: "Aprovação Controladoria Interna - Conformidade",
          pipelineCompleto: {
            solicitacaoNF: "Concluído",
            validacaoNF: "Concluído",
            aprovacaoControladoriaD: "Aprovado",
            aprovacaoControladoriaIConformidade: "Pendente",
            aprovacaoControladoriaIFinanceira: "Pendente",
            liberacaoFinanceiro: "Pendente",
            pagamentoRealizado: "Pendente",
          },
          statusOmie: "Não enviado",
          documentos: {
            notaFiscal: "NF_P2_2024.pdf",
            contrato: "Contrato_XYZ_2024.pdf",
          },
        },
      ],
    },
    {
      id: "PAG-002",
      nome: "João Silva",
      razaoSocial: "João Silva - MEI",
      cnpjCpf: "123.456.789-00",
      projeto: "Projeto Beta",
      itemOrcamentario: "001.001 - Chefe de roteiro",
      descritivo: "Desenvolvimento de roteiro e script",
      totalContratado: 30000,
      totalPago: 0,
      saldoPagar: 30000,
      statusAprovacao: "Aguardando Solicitação de NF",
      isRPA: true,
      verificarEntregaAntesUltimoPgto: false,
      dataInicioContratacao: new Date(2024, 1, 1),
      dataFimContratacao: new Date(2024, 5, 30),
      observacoes: "RPA - Recibo de Pagamento Autônomo",
      dadosBancarios: {
        banco: "001 - Banco do Brasil",
        agencia: "9876",
        conta: "12345-6",
        tipoConta: "Conta Corrente",
        pix: "joao.silva@email.com",
      },
      documentos: {
        notaFiscal: "",
        contrato: "Contrato_JoaoSilva_2024.pdf",
        aditivo: "Aditivo_JoaoSilva_01.pdf",
      },
      parcelas: [
        {
          id: "p3",
          numero: 1,
          vencimento: new Date(2024, 2, 30),
          valor: 30000,
          status: "Aguardando aprovação",
          etapaAtual: "Solicitação de NF",
          pipelineCompleto: {
            solicitacaoNF: "Pendente",
            validacaoNF: "Pendente",
            aprovacaoControladoriaD: "Pendente",
            aprovacaoControladoriaIConformidade: "Pendente",
            aprovacaoControladoriaIFinanceira: "Pendente",
            liberacaoFinanceiro: "Pendente",
            pagamentoRealizado: "Pendente",
          },
          statusOmie: "Não enviado",
          documentos: {
            contrato: "Contrato_JoaoSilva_2024.pdf",
            aditivo: "Aditivo_JoaoSilva_01.pdf",
          },
        },
      ],
    },
    {
      id: "PAG-003",
      nome: "Maria José Santos",
      razaoSocial: "Estúdio ABC Edições Ltda",
      cnpjCpf: "98.765.432/0001-00",
      projeto: "Projeto Alpha",
      itemOrcamentario: "005.002 - Edição",
      descritivo: "Edição de vídeo e pós-produção",
      totalContratado: 80000,
      totalPago: 40000,
      saldoPagar: 40000,
      statusAprovacao: "Liberado para pagamento",
      isRPA: false,
      verificarEntregaAntesUltimoPgto: true,
      dataInicioContratacao: new Date(2024, 0, 1),
      dataFimContratacao: new Date(2024, 6, 31),
      observacoes: "",
      dadosBancarios: {
        banco: "237 - Bradesco",
        agencia: "5555",
        conta: "98765-4",
        tipoConta: "Conta Corrente",
        pix: "98.765.432/0001-00",
      },
      documentos: {
        notaFiscal: "NF_ABC_2024.pdf",
        contrato: "Contrato_ABC_2024.pdf",
      },
      parcelas: [
        {
          id: "p4",
          numero: 1,
          vencimento: new Date(2024, 0, 15),
          dataPagamento: new Date(2024, 0, 15),
          valor: 20000,
          status: "Pago",
          etapaAtual: "Pagamento Realizado",
          pipelineCompleto: {
            solicitacaoNF: "Concluído",
            validacaoNF: "Concluído",
            aprovacaoControladoriaD: "Aprovado",
            aprovacaoControladoriaIConformidade: "Aprovado",
            aprovacaoControladoriaIFinanceira: "Aprovado",
            liberacaoFinanceiro: "Concluído",
            pagamentoRealizado: "Concluído",
          },
          statusOmie: "Confirmado",
          comprovante: "comprovante_p4.pdf",
          documentos: {
            notaFiscal: "NF_ABC_P1.pdf",
            contrato: "Contrato_ABC_2024.pdf",
            comprovantePagamento: "comprovante_p4.pdf",
          },
        },
        {
          id: "p5",
          numero: 2,
          vencimento: new Date(2024, 2, 15),
          dataPagamento: new Date(2024, 2, 15),
          valor: 20000,
          status: "Pago",
          etapaAtual: "Pagamento Realizado",
          pipelineCompleto: {
            solicitacaoNF: "Concluído",
            validacaoNF: "Concluído",
            aprovacaoControladoriaD: "Aprovado",
            aprovacaoControladoriaIConformidade: "Aprovado",
            aprovacaoControladoriaIFinanceira: "Aprovado",
            liberacaoFinanceiro: "Concluído",
            pagamentoRealizado: "Concluído",
          },
          statusOmie: "Confirmado",
          comprovante: "comprovante_p5.pdf",
          documentos: {
            notaFiscal: "NF_ABC_P2.pdf",
            contrato: "Contrato_ABC_2024.pdf",
            comprovantePagamento: "comprovante_p5.pdf",
          },
        },
        {
          id: "p6",
          numero: 3,
          vencimento: new Date(2024, 4, 15),
          valor: 20000,
          status: "Liberado para pagamento",
          etapaAtual: "Liberação para Financeiro",
          pipelineCompleto: {
            solicitacaoNF: "Concluído",
            validacaoNF: "Concluído",
            aprovacaoControladoriaD: "Aprovado",
            aprovacaoControladoriaIConformidade: "Aprovado",
            aprovacaoControladoriaIFinanceira: "Aprovado",
            liberacaoFinanceiro: "Concluído",
            pagamentoRealizado: "Pendente",
          },
          statusOmie: "Enviado",
          documentos: {
            notaFiscal: "NF_ABC_P3.pdf",
            contrato: "Contrato_ABC_2024.pdf",
          },
        },
        {
          id: "p7",
          numero: 4,
          vencimento: new Date(2024, 6, 15),
          valor: 20000,
          status: "Programado",
          etapaAtual: "Programado",
          pipelineCompleto: {
            solicitacaoNF: "Pendente",
            validacaoNF: "Pendente",
            aprovacaoControladoriaD: "Pendente",
            aprovacaoControladoriaIConformidade: "Pendente",
            aprovacaoControladoriaIFinanceira: "Pendente",
            liberacaoFinanceiro: "Pendente",
            pagamentoRealizado: "Pendente",
          },
          statusOmie: "Não enviado",
        },
      ],
    },
  ]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const handleViewDetails = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setPagamentoDetalheId(fornecedor.id);
    setMostrarDetalhes(true);
  };

  const handleRegistrarPagamento = () => {
    if (!selectedParcela || !dataPagamento) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Atualiza o status da parcela para "Pago"
    setFornecedores(prev => prev.map(f => {
      if (f.id === selectedFornecedor?.id) {
        return {
          ...f,
          parcelas: f.parcelas.map(p => {
            if (p.id === selectedParcela.id) {
              return {
                ...p,
                status: "Pago" as const,
                etapaAtual: "Pagamento Realizado",
                pipelineCompleto: {
                  ...p.pipelineCompleto,
                  pagamentoRealizado: "Concluído" as const,
                },
                dataPagamento,
                comprovante: comprovante?.name,
              };
            }
            return p;
          }),
          totalPago: f.totalPago + selectedParcela.valor,
          saldoPagar: f.saldoPagar - selectedParcela.valor,
        };
      }
      return f;
    }));

    toast.success("Pagamento registrado e marcado como Pago!");
    setOpenRegistrarPagamento(false);
    setDataPagamento(undefined);
    setComprovante(null);
    setObservacaoPagamento("");
    setSelectedParcela(null);
  };

  const handleAprovar = () => {
    /**
     * ============================================================================
     * INTEGRAÇÃO COM ORÇAMENTO - ATUALIZAÇÃO AUTOMÁTICA
     * ============================================================================
     * Quando uma parcela é aprovada e marcada como "Realizado", o sistema deve:
     * 
     * 1. Localizar a rúbrica orçamentária vinculada a este pagamento
     * 2. Subtrair o valor da parcela da coluna COMPROMETIDO
     * 3. Adicionar o valor da parcela na coluna REALIZADO
     * 
     * Exemplo prático:
     * - Contrato: R$ 50.000 (5 parcelas de R$ 10.000)
     * - Ao formalizar contrato: Comprometido = R$ 50.000
     * - Ao aprovar 1ª parcela: Comprometido = R$ 40.000, Realizado = R$ 10.000
     * - Ao aprovar 2ª parcela: Comprometido = R$ 30.000, Realizado = R$ 20.000
     * 
     * TODO: Implementar chamada à API para atualizar o orçamento
     * ============================================================================
     */
    toast.success("Aprovação registrada com sucesso!");
    setOpenAprovar(false);
  };

  const handleReprovar = () => {
    if (!motivoReprovacao.trim()) {
      toast.error("O motivo da reprovação é obrigatório");
      return;
    }

    toast.success("Reprovação registrada com sucesso!");
    setOpenReprovar(false);
    setMotivoReprovacao("");
  };

  const handlePagamentoAvulso = () => {
    if (!fornecedorAvulso || !projetoAvulso || !valorAvulso || !vencimentoAvulso) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Pagamento criado com sucesso!");
    setOpenPagamentoAvulso(false);
    setFornecedorAvulso("");
    setRazaoSocialAvulso("");
    setProjetoAvulso("");
    setItemOrcamentarioAvulso("");
    setValorAvulso("");
    setVencimentoAvulso(undefined);
    setDescricaoAvulso("");
  };

  // Atualiza a razão social quando seleciona um fornecedor
  const handleSelectFornecedor = (fornecedorId: string) => {
    const fornecedor = fornecedoresCadastrados.find(f => f.id === fornecedorId);
    if (fornecedor) {
      setFornecedorAvulso(fornecedorId);
      setRazaoSocialAvulso(fornecedor.razaoSocial);
    }
    setOpenFornecedorCombobox(false);
  };

  // Obtém o nome do fornecedor para exibição
  const getFornecedorNome = (id: string) => {
    const fornecedor = fornecedoresCadastrados.find(f => f.id === id);
    return fornecedor ? `${fornecedor.nome} - ${fornecedor.cnpjCpf}` : "Selecione um fornecedor";
  };

  // Obtém o nome do projeto para exibição
  const getProjetoNome = (id: string) => {
    const projeto = projetosAtivos.find(p => p.id === id);
    return projeto ? projeto.nome : "Selecione um projeto";
  };

  const handleConfirmarOmie = () => {
    if (!selectedParcela) return;

    setFornecedores(prev => prev.map(f => {
      if (f.id === selectedFornecedor?.id) {
        return {
          ...f,
          parcelas: f.parcelas.map(p => {
            if (p.id === selectedParcela.id) {
              return {
                ...p,
                statusOmie: "Confirmado" as const,
              };
            }
            return p;
          }),
        };
      }
      return f;
    }));

    toast.success("Integração OMIE confirmada com sucesso!");
    setOpenConfirmarOmie(false);
    setSelectedParcela(null);
  };

  const handleEnviarOmie = (parcela: Parcela) => {
    setFornecedores(prev => prev.map(f => {
      if (f.id === selectedFornecedor?.id) {
        return {
          ...f,
          parcelas: f.parcelas.map(p => {
            if (p.id === parcela.id) {
              return {
                ...p,
                statusOmie: "Enviado" as const,
              };
            }
            return p;
          }),
        };
      }
      return f;
    }));

    toast.success("Dados enviados para o ERP OMIE!");
  };

  const getProximaParcela = (parcelas: Parcela[]) => {
    return parcelas.find(p => p.status === "Aguardando aprovação" || p.status === "Programado" || p.status === "Liberado para pagamento");
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Pago" || status === "Aprovado" || status === "Concluído") return "default";
    if (status === "Programado" || status === "Pendente") return "secondary";
    if (status === "Liberado para pagamento") return "default";
    if (status === "Aguardando aprovação") return "outline";
    return "outline";
  };

  const getPipelineStatusIcon = (status: "Pendente" | "Aprovado" | "Reprovado" | "Concluído") => {
    if (status === "Aprovado" || status === "Concluído") return <Check className="w-4 h-4 text-green-600" />;
    if (status === "Reprovado") return <X className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const getOmieStatusBadge = (status?: "Não enviado" | "Enviado" | "Confirmado") => {
    if (status === "Confirmado") {
      return <Badge variant="default" className="bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />OMIE OK</Badge>;
    }
    if (status === "Enviado") {
      return <Badge variant="outline" className="border-blue-600 text-blue-600"><RefreshCw className="w-3 h-3 mr-1" />Enviado OMIE</Badge>;
    }
    return <Badge variant="secondary" className="text-muted-foreground"><AlertCircle className="w-3 h-3 mr-1" />Não enviado</Badge>;
  };

  // Filtrar fornecedores baseado na aba ativa e filtros adicionais
  const filteredFornecedores = fornecedores.filter(f => {
    // Filtro de busca
    const matchesSearch = 
      f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.itemOrcamentario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filtro por projeto
    const matchesProjeto = selectedProjeto === "todos" || f.projeto === selectedProjeto;
    if (!matchesProjeto) return false;

    // Filtro por data (se definido)
    if (dataInicio || dataFim) {
      const hasParcelaInRange = f.parcelas.some(p => {
        const vencimento = p.vencimento;
        if (dataInicio && vencimento < dataInicio) return false;
        if (dataFim && vencimento > dataFim) return false;
        return true;
      });
      if (!hasParcelaInRange) return false;
    }

    // Filtros por aba
    if (activeTab === "todos") return true;
    
    if (activeTab === "aguardando") {
      return f.parcelas.some(p => p.status === "Aguardando aprovação");
    }
    
    if (activeTab === "liberados") {
      return f.parcelas.some(p => p.status === "Liberado para pagamento");
    }
    
    if (activeTab === "pagos") {
      return f.parcelas.some(p => p.status === "Pago");
    }

    return true;
  });

  const isFinanceiro = hasPermission((role) => role === 'Financeiro');

  // Se estiver vendo detalhes, mostrar a tela de detalhes
  if (mostrarDetalhes) {
    return (
      <PagamentoDetalhes 
        onVoltar={() => setMostrarDetalhes(false)}
        pagamentoId={pagamentoDetalheId}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Pagamentos</h2>
          <p className="text-muted-foreground mt-1">
            {isFinanceiro 
              ? "Gestão de liquidação de pagamentos e integração OMIE" 
              : "Gestão de pagamentos e aprovações"}
          </p>
        </div>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por ID, fornecedor, razão social, projeto ou item orçamentário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-[200px]">
              <Select value={selectedProjeto} onValueChange={setSelectedProjeto}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os projetos</SelectItem>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[200px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {dataInicio ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR }) : "Data início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={setDataInicio}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-[200px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {dataFim ? format(dataFim, "dd/MM/yyyy", { locale: ptBR }) : "Data fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Filtro */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="aguardando">Aguardando aprovação</TabsTrigger>
          <TabsTrigger value="liberados">
            {isFinanceiro ? "Liberados para pagamento" : "Liberados"}
          </TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {activeTab === "liberados" && isFinanceiro 
                      ? "Pagamentos liberados pela Controladoria" 
                      : "Pagamentos por fornecedor"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredFornecedores.length} {filteredFornecedores.length === 1 ? "fornecedor encontrado" : "fornecedores encontrados"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {isFinanceiro && filteredFornecedores.length > 0 && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast.success("Preparando download dos comprovantes...");
                        // Aqui seria implementada a lógica real de download em lote
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Comprovantes
                    </Button>
                  )}
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setOpenPagamentoAvulso(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo pagamento
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Razão Social</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Item orçamentário</TableHead>
                      <TableHead>Próxima data</TableHead>
                      <TableHead>Total contratado</TableHead>
                      <TableHead>Saldo a pagar</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFornecedores.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                          Nenhum pagamento encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFornecedores.map((fornecedor) => {
                        const proximaParcela = getProximaParcela(fornecedor.parcelas);
                        return (
                          <TableRow 
                            key={fornecedor.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewDetails(fornecedor)}
                          >
                            <TableCell className="font-mono text-sm">{fornecedor.id}</TableCell>
                            <TableCell>{fornecedor.nome}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{fornecedor.razaoSocial}</TableCell>
                            <TableCell>{fornecedor.projeto}</TableCell>
                            <TableCell>{fornecedor.itemOrcamentario}</TableCell>
                            <TableCell>
                              {proximaParcela ? (
                                <div>
                                  <p className="font-medium">
                                    {format(proximaParcela.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatCurrency(proximaParcela.valor)}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                            <TableCell>{formatCurrency(fornecedor.totalContratado)}</TableCell>
                            <TableCell>{formatCurrency(fornecedor.saldoPagar)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{fornecedor.statusAprovacao}</Badge>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => handleViewDetails(fornecedor)}>
                                    Ver detalhes
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sheet - Detalhes do fornecedor */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="w-[900px] sm:max-w-[900px] overflow-y-auto">
          {selectedFornecedor && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedFornecedor.nome}</SheetTitle>
                <SheetDescription>
                  ID: {selectedFornecedor.id} • Razão Social: {selectedFornecedor.razaoSocial} • {selectedFornecedor.projeto} • {selectedFornecedor.itemOrcamentario}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Cards de topo - REORDENADOS */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Card 1: Dados do Fornecedor (antes: Dados Bancários) */}
                  <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Dados do Fornecedor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Razão Social</p>
                        <p className="text-sm font-medium">{selectedFornecedor.razaoSocial}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CNPJ/CPF</p>
                        <p className="text-sm font-medium">{selectedFornecedor.cnpjCpf}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Banco</p>
                        <p className="text-sm font-medium">{selectedFornecedor.dadosBancarios.banco}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Agência</p>
                          <p className="text-sm font-medium">{selectedFornecedor.dadosBancarios.agencia}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Conta</p>
                          <p className="text-sm font-medium">{selectedFornecedor.dadosBancarios.conta}</p>
                        </div>
                      </div>
                      {selectedFornecedor.dadosBancarios.pix && (
                        <div>
                          <p className="text-xs text-muted-foreground">PIX</p>
                          <p className="text-sm font-medium">{selectedFornecedor.dadosBancarios.pix}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Card 2: Resumo da Contratação (antes: Resumo) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Resumo da Contratação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total contratado</span>
                        <span className="font-medium">{formatCurrency(selectedFornecedor.totalContratado)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total pago</span>
                        <span className="font-medium text-green-600">{formatCurrency(selectedFornecedor.totalPago)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Saldo a pagar</span>
                        <span className="font-medium text-primary">{formatCurrency(selectedFornecedor.saldoPagar)}</span>
                      </div>
                      <div className="pt-2 border-t space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">RPA</span>
                          <Badge variant={selectedFornecedor.isRPA ? "default" : "secondary"}>
                            {selectedFornecedor.isRPA ? "Sim" : "Não"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Verificar entrega</span>
                          <Badge variant={selectedFornecedor.verificarEntregaAntesUltimoPgto ? "default" : "secondary"}>
                            {selectedFornecedor.verificarEntregaAntesUltimoPgto ? "Sim" : "Não"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 3: Pagamento Vigente */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Pagamento vigente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(() => {
                        const proxima = getProximaParcela(selectedFornecedor.parcelas);
                        if (!proxima) {
                          return <p className="text-sm text-muted-foreground">Nenhum pagamento pendente</p>;
                        }
                        return (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Parcela</span>
                              <span className="font-medium">{proxima.numero}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Vencimento</span>
                              <span className="font-medium">
                                {format(proxima.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Valor</span>
                              <span className="font-medium">{formatCurrency(proxima.valor)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Status</span>
                              <Badge variant={getStatusBadgeVariant(proxima.status)}>
                                {proxima.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Etapa atual</span>
                              <Badge variant="outline" className="text-xs">{proxima.etapaAtual}</Badge>
                            </div>
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </div>

                {/* Informações da Contratação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Informações da Contratação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Descritivo</p>
                        <p className="text-sm">{selectedFornecedor.descritivo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Período da contratação</p>
                        <p className="text-sm">
                          {format(selectedFornecedor.dataInicioContratacao, "dd/MM/yyyy", { locale: ptBR })} até{" "}
                          {format(selectedFornecedor.dataFimContratacao, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      {selectedFornecedor.observacoes && (
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Observações</p>
                          <p className="text-sm">{selectedFornecedor.observacoes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Documentos Gerais */}
                <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Documentos da Contratação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 border rounded-lg bg-background">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Nota Fiscal</span>
                          </div>
                          {selectedFornecedor.documentos.notaFiscal ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        {selectedFornecedor.documentos.notaFiscal ? (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-3 h-3 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <p className="text-xs text-muted-foreground text-center">Não enviado</p>
                        )}
                      </div>

                      <div className="p-3 border rounded-lg bg-background">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Contrato</span>
                          </div>
                          {selectedFornecedor.documentos.contrato ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        {selectedFornecedor.documentos.contrato ? (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-3 h-3 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <p className="text-xs text-muted-foreground text-center">Não enviado</p>
                        )}
                      </div>

                      <div className="p-3 border rounded-lg bg-background">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Aditivo</span>
                          </div>
                          {selectedFornecedor.documentos.aditivo ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        {selectedFornecedor.documentos.aditivo ? (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-3 h-3 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <p className="text-xs text-muted-foreground text-center">Sem aditivo</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline - Cronograma de parcelas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cronograma de pagamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedFornecedor.parcelas
                        .sort((a, b) => a.vencimento.getTime() - b.vencimento.getTime())
                        .map((parcela) => {
                          const isPago = parcela.status === "Pago";
                          const isLiberado = parcela.status === "Liberado para pagamento";
                          const isProxima = parcela === getProximaParcela(selectedFornecedor.parcelas);
                          
                          return (
                            <div 
                              key={parcela.id} 
                              className={`
                                border rounded-lg p-4 
                                ${isPago ? 'opacity-50 bg-muted/30' : ''}
                                ${isProxima && !isPago ? 'border-primary border-2 shadow-sm' : ''}
                                ${isLiberado ? 'border-green-500 border-2 bg-green-50/50 dark:bg-green-950/20' : ''}
                              `}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    ${isPago ? 'bg-green-100 text-green-700' : isLiberado ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}
                                  `}>
                                    {parcela.numero}
                                  </div>
                                  <div>
                                    <p className="font-medium">Parcela {parcela.numero}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Vencimento: {format(parcela.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                                    </p>
                                    {parcela.dataPagamento && (
                                      <p className="text-xs text-green-600">
                                        Pago em: {format(parcela.dataPagamento, "dd/MM/yyyy", { locale: ptBR })}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(parcela.valor)}</p>
                                  <Badge variant={getStatusBadgeVariant(parcela.status)} className="mt-1">
                                    {parcela.status}
                                  </Badge>
                                  <div className="mt-2">
                                    {getOmieStatusBadge(parcela.statusOmie)}
                                  </div>
                                </div>
                              </div>

                              {/* Documentos da Parcela */}
                              {parcela.documentos && (
                                <div className="mt-3 pt-3 border-t">
                                  <p className="text-xs text-muted-foreground mb-2">Documentos desta parcela:</p>
                                  <div className="flex gap-2 flex-wrap">
                                    {parcela.documentos.notaFiscal && (
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <FileText className="w-3 h-3 mr-1" />
                                        Nota Fiscal
                                      </Button>
                                    )}
                                    {parcela.documentos.contrato && (
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <FileText className="w-3 h-3 mr-1" />
                                        Contrato
                                      </Button>
                                    )}
                                    {parcela.documentos.aditivo && (
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <FileText className="w-3 h-3 mr-1" />
                                        Aditivo
                                      </Button>
                                    )}
                                    {parcela.documentos.comprovantePagamento && (
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Comprovante
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Pipeline de aprovação DETALHADO */}
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-xs text-muted-foreground mb-3">Pipeline de aprovação:</p>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.solicitacaoNF)}
                                    <span className="text-xs flex-1">1. Solicitação de NF</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.solicitacaoNF}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.validacaoNF)}
                                    <span className="text-xs flex-1">2. Validação da NF</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.validacaoNF}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.aprovacaoControladoriaD)}
                                    <span className="text-xs flex-1">3. Aprovação Controladoria Dedicada</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.aprovacaoControladoriaD}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.aprovacaoControladoriaIConformidade)}
                                    <span className="text-xs flex-1">4. Aprovação Controladoria Interna - Conformidade</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.aprovacaoControladoriaIConformidade}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.aprovacaoControladoriaIFinanceira)}
                                    <span className="text-xs flex-1">5. Aprovação Controladoria Interna - Financeira</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.aprovacaoControladoriaIFinanceira}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.liberacaoFinanceiro)}
                                    <span className="text-xs flex-1">6. Liberação para Financeiro</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.liberacaoFinanceiro}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPipelineStatusIcon(parcela.pipelineCompleto.pagamentoRealizado)}
                                    <span className="text-xs flex-1">7. Pagamento Realizado</span>
                                    <Badge variant="outline" className="text-xs">
                                      {parcela.pipelineCompleto.pagamentoRealizado}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Ações da Parcela */}
                              <div className="mt-3 pt-3 border-t flex gap-2">
                                {hasPermission((role) => ['Administrador', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)) && 
                                 !isPago && parcela.status === "Aguardando aprovação" && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex-1"
                                      onClick={() => {
                                        setSelectedParcela(parcela);
                                        setOpenAprovar(true);
                                      }}
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      Aprovar
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex-1"
                                      onClick={() => {
                                        setSelectedParcela(parcela);
                                        setOpenReprovar(true);
                                      }}
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Reprovar
                                    </Button>
                                  </>
                                )}

                                {isFinanceiro && isLiberado && (
                                  <>
                                    {parcela.statusOmie === "Não enviado" && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleEnviarOmie(parcela)}
                                      >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Enviar OMIE
                                      </Button>
                                    )}
                                    {parcela.statusOmie === "Enviado" && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                          setSelectedParcela(parcela);
                                          setOpenConfirmarOmie(true);
                                        }}
                                      >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Confirmar OMIE
                                      </Button>
                                    )}
                                    {parcela.statusOmie === "Confirmado" && (
                                      <Button 
                                        variant="default" 
                                        size="sm"
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={() => {
                                          setSelectedParcela(parcela);
                                          setOpenRegistrarPagamento(true);
                                        }}
                                      >
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Registrar Pagamento
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog - Registrar Pagamento */}
      <Dialog open={openRegistrarPagamento} onOpenChange={setOpenRegistrarPagamento}>
        <DialogContent aria-describedby="dialog-registrar-description">
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription id="dialog-registrar-description">
              Informe a data e anexe o comprovante do pagamento realizado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Data do pagamento <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataPagamento ? format(dataPagamento, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataPagamento}
                    onSelect={setDataPagamento}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Comprovante de pagamento</Label>
              <Input 
                type="file" 
                onChange={(e) => setComprovante(e.target.files?.[0] || null)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formatos aceitos: PDF, JPG, PNG
              </p>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea
                placeholder="Informações adicionais sobre o pagamento (opcional)"
                value={observacaoPagamento}
                onChange={(e) => setObservacaoPagamento(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRegistrarPagamento(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleRegistrarPagamento}>
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Aprovar */}
      <Dialog open={openAprovar} onOpenChange={setOpenAprovar}>
        <DialogContent aria-describedby="dialog-aprovar-description">
          <DialogHeader>
            <DialogTitle>Aprovar Pagamento</DialogTitle>
            <DialogDescription id="dialog-aprovar-description">
              Você está prestes a aprovar este pagamento. Esta ação avançará o fluxo de aprovação.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAprovar(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleAprovar}>
              <Check className="w-4 h-4 mr-2" />
              Confirmar Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Reprovar */}
      <Dialog open={openReprovar} onOpenChange={setOpenReprovar}>
        <DialogContent aria-describedby="dialog-reprovar-description">
          <DialogHeader>
            <DialogTitle>Reprovar Pagamento</DialogTitle>
            <DialogDescription id="dialog-reprovar-description">
              Informe o motivo da reprovação. O pagamento será bloqueado e o solicitante será notificado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Motivo da reprovação <span className="text-destructive">*</span></Label>
              <Textarea
                placeholder="Descreva detalhadamente o motivo da reprovação..."
                value={motivoReprovacao}
                onChange={(e) => setMotivoReprovacao(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReprovar(false)}>
              Cancelar
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleReprovar}>
              <X className="w-4 h-4 mr-2" />
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Novo Pagamento */}
      <Dialog open={openPagamentoAvulso} onOpenChange={setOpenPagamentoAvulso}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-avulso-description">
          <DialogHeader>
            <DialogTitle>Criar Novo Pagamento</DialogTitle>
            <DialogDescription id="dialog-avulso-description">
              Crie um novo pagamento fora do fluxo padrão de contratação
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fornecedor <span className="text-destructive">*</span></Label>
                <Popover open={openFornecedorCombobox} onOpenChange={setOpenFornecedorCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openFornecedorCombobox}
                      className="w-full justify-between"
                    >
                      <span className="truncate">
                        {fornecedorAvulso
                          ? getFornecedorNome(fornecedorAvulso)
                          : "Selecione um fornecedor"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar fornecedor..." />
                      <CommandList>
                        <CommandEmpty>Nenhum fornecedor encontrado.</CommandEmpty>
                        <CommandGroup>
                          {fornecedoresCadastrados.map((fornecedor) => (
                            <CommandItem
                              key={fornecedor.id}
                              value={`${fornecedor.nome} ${fornecedor.razaoSocial} ${fornecedor.cnpjCpf}`}
                              onSelect={() => handleSelectFornecedor(fornecedor.id)}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  fornecedorAvulso === fornecedor.id ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">{fornecedor.nome}</span>
                                <span className="text-xs text-muted-foreground">
                                  {fornecedor.razaoSocial} • {fornecedor.cnpjCpf}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Razão Social</Label>
                <Input
                  placeholder="Preenchido automaticamente"
                  value={razaoSocialAvulso}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Projeto <span className="text-destructive">*</span></Label>
                <Popover open={openProjetoCombobox} onOpenChange={setOpenProjetoCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProjetoCombobox}
                      className="w-full justify-between"
                    >
                      <span className="truncate">
                        {projetoAvulso
                          ? getProjetoNome(projetoAvulso)
                          : "Selecione um projeto"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar projeto..." />
                      <CommandList>
                        <CommandEmpty>Nenhum projeto encontrado.</CommandEmpty>
                        <CommandGroup>
                          {projetosAtivos.map((projeto) => (
                            <CommandItem
                              key={projeto.id}
                              value={`${projeto.nome} ${projeto.id}`}
                              onSelect={() => {
                                setProjetoAvulso(projeto.id);
                                setOpenProjetoCombobox(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  projetoAvulso === projeto.id ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">{projeto.nome}</span>
                                <span className="text-xs text-muted-foreground">
                                  Código: {projeto.id} • Status: {projeto.status}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Item orçamentário</Label>
                <Input
                  placeholder="Ex: 003.001 - Diretor(a)"
                  value={itemOrcamentarioAvulso}
                  onChange={(e) => setItemOrcamentarioAvulso(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="R$ 0,00"
                  value={valorAvulso}
                  onChange={(e) => setValorAvulso(e.target.value)}
                />
              </div>
              <div>
                <Label>Vencimento <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {vencimentoAvulso ? format(vencimentoAvulso, "PPP", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={vencimentoAvulso}
                      onSelect={setVencimentoAvulso}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label>Descrição/Justificativa</Label>
              <Textarea
                placeholder="Descreva o motivo deste pagamento..."
                value={descricaoAvulso}
                onChange={(e) => setDescricaoAvulso(e.target.value)}
                rows={3}
              />
            </div>

            {/* Toggle RPA */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div className="space-y-0.5">
                <Label>RPA (Recibo de Pagamento Autônomo)</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar se o pagamento for para pessoa física sem vínculo empregatício
                </p>
              </div>
              <Switch />
            </div>

            {/* Anexo de Comprovante */}
            <div>
              <Label>Anexar Nota Fiscal/Recibo <span className="text-destructive">*</span></Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Clique para fazer upload ou arraste o arquivo
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG ou PNG (máx. 10MB)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenPagamentoAvulso(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handlePagamentoAvulso}>
              Criar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog - Confirmar OMIE */}
      <Dialog open={openConfirmarOmie} onOpenChange={setOpenConfirmarOmie}>
        <DialogContent aria-describedby="dialog-omie-description">
          <DialogHeader>
            <DialogTitle>Confirmar Integração OMIE</DialogTitle>
            <DialogDescription id="dialog-omie-description">
              Confirme que os dados foram corretamente integrados no ERP OMIE
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenConfirmarOmie(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmarOmie}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
