import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
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
import { Plus, Search, MoreVertical, Calendar as CalendarIcon, Upload, FileText, AlertCircle, Download, Trash2, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react@0.487.0";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
import { toast } from "sonner@2.0.3";
import { Alert, AlertDescription } from "../ui/alert";

// Componente de ícone do Google Drive
const GoogleDriveIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
    <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
    <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
  </svg>
);

interface Documento {
  id: string;
  tipo: string;
  nome: string;
  dataUpload: string;
  url?: string;
  googleDriveUrl?: string;
}

interface DadosPagamento {
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  chavePix?: string;
}

interface Contratacao {
  id: string;
  projeto: string;
  tipo: string;
  razaoSocial: string;
  cnpjCpf: string;
  socioContratado?: string;
  validarCNAE: "Pendente" | "Solicitar inclusão" | "Aguardando inclusão" | "Ok";
  itemOrcamentario: string;
  grandeItem: string;
  inicio: string;
  fim: string;
  total: number;
  cadastro: "Pendente" | "Concluído";
  acordo: "Pendente" | "Enviado" | "Ok";
  contrato: "Pendente" | "Enviado" | "Concluído";
  aditivo: "Não se aplica" | "Pendente" | "Enviado" | "Concluído";
  distrato: "Não se aplica" | "Pendente" | "Enviado" | "Concluído";
  pagamentoAtreladoEntrega: boolean;
  isRPA?: boolean;
  dadosPagamento?: DadosPagamento;
  documentos: Documento[];
  cronogramaPagamento?: {
    parcela: number;
    data: string;
    valor: number;
    status: string;
  }[];
}

// Mapeamento de códigos do plano de contas para Grandes Itens
const planoDeContasMap: Record<string, string> = {
  "001.001": "001 - Roteiro",
  "001.002": "001 - Roteiro",
  "002.001": "002 - Produção",
  "002.002": "002 - Produção",
  "003.001": "003 - Direção",
  "003.002": "003 - Direção",
  "004.001": "004 - Elenco",
  "004.002": "004 - Elenco",
  "005.001": "005 - Pós-produção",
  "005.002": "005 - Pós-produção",
};

interface ContratacaoProps {
  onNovaContratacao: () => void;
  onEditarContratacao?: (contratacao: Contratacao) => void;
}

export default function Contratacao({ onNovaContratacao, onEditarContratacao }: ContratacaoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjeto, setSelectedProjeto] = useState("todos");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [openVisualizarContratacao, setOpenVisualizarContratacao] = useState(false);
  const [openEditarContratacao, setOpenEditarContratacao] = useState(false);
  const [openExcluirContratacao, setOpenExcluirContratacao] = useState(false);
  const [selectedContratacao, setSelectedContratacao] = useState<Contratacao | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
  // Estados para preview de documentos
  const [openPreviewDocumento, setOpenPreviewDocumento] = useState(false);
  const [documentoAtual, setDocumentoAtual] = useState<Documento | null>(null);
  const [documentosDisponiveis, setDocumentosDisponiveis] = useState<Documento[]>([]);
  const [indiceDocumentoAtual, setIndiceDocumentoAtual] = useState(0);
  const [loadingDocumento, setLoadingDocumento] = useState(false);

  // Estados para gerenciar os dados da tabela com status editáveis
  const [contratacoes, setContratacoes] = useState<Contratacao[]>([
    {
      id: "1",
      projeto: "Projeto Alpha",
      tipo: "Fornecedor",
      razaoSocial: "Produtora XYZ Ltda",
      cnpjCpf: "12.345.678/0001-99",
      socioContratado: "Carlos Roberto Silva",
      validarCNAE: "Ok",
      itemOrcamentario: "003.001 - Diretor(a)",
      grandeItem: "003 - Direção",
      inicio: "01/01/2024",
      fim: "30/06/2024",
      total: 50000,
      cadastro: "Concluído",
      acordo: "Ok",
      contrato: "Concluído",
      aditivo: "Não se aplica",
      distrato: "Não se aplica",
      pagamentoAtreladoEntrega: true,
      isRPA: false,
      dadosPagamento: {
        banco: "Banco do Brasil",
        agencia: "1234-5",
        conta: "12345-6",
        tipoConta: "Conta Corrente",
        chavePix: "12.345.678/0001-99"
      },
      cronogramaPagamento: [
        { parcela: 1, data: "15/02/2024", valor: 10000, status: "Pago" },
        { parcela: 2, data: "15/03/2024", valor: 10000, status: "Pago" },
        { parcela: 3, data: "15/04/2024", valor: 10000, status: "Pendente" },
        { parcela: 4, data: "15/05/2024", valor: 10000, status: "Pendente" },
        { parcela: 5, data: "30/06/2024", valor: 10000, status: "Pendente" },
      ],
      documentos: [
        { 
          id: "d1", 
          tipo: "Cartão CNPJ", 
          nome: "cartao_cnpj_produtora_xyz.pdf", 
          dataUpload: "10/12/2023",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          googleDriveUrl: "https://drive.google.com/file/d/exemplo123/view"
        },
        { 
          id: "d2", 
          tipo: "Contrato", 
          nome: "contrato_produtora_xyz.pdf", 
          dataUpload: "15/12/2023",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          googleDriveUrl: "https://drive.google.com/file/d/exemplo456/view"
        }
      ]
    },
    {
      id: "2",
      projeto: "Projeto Beta",
      tipo: "Equipe do projeto",
      razaoSocial: "João Silva",
      cnpjCpf: "123.456.789-00",
      validarCNAE: "Pendente",
      itemOrcamentario: "001.001 - Chefe de roteiro",
      grandeItem: "001 - Roteiro",
      inicio: "15/02/2024",
      fim: "15/05/2024",
      total: 30000,
      cadastro: "Concluído",
      acordo: "Enviado",
      contrato: "Pendente",
      aditivo: "Não se aplica",
      distrato: "Não se aplica",
      pagamentoAtreladoEntrega: false,
      isRPA: true,
      dadosPagamento: {
        banco: "Itaú",
        agencia: "0987",
        conta: "54321-0",
        tipoConta: "Conta Poupança",
        chavePix: "joao.silva@email.com"
      },
      cronogramaPagamento: [
        { parcela: 1, data: "28/02/2024", valor: 15000, status: "Pago" },
        { parcela: 2, data: "15/05/2024", valor: 15000, status: "Pendente" },
      ],
      documentos: []
    },
    {
      id: "3",
      projeto: "Projeto Alpha",
      tipo: "Fornecedor",
      razaoSocial: "Estúdio ABC",
      cnpjCpf: "98.765.432/0001-00",
      socioContratado: "Maria José Santos",
      validarCNAE: "Ok",
      itemOrcamentario: "005.002 - Edição",
      grandeItem: "005 - Pós-produção",
      inicio: "01/07/2024",
      fim: "31/12/2024",
      total: 80000,
      cadastro: "Concluído",
      acordo: "Ok",
      contrato: "Enviado",
      aditivo: "Não se aplica",
      distrato: "Não se aplica",
      pagamentoAtreladoEntrega: false,
      isRPA: false,
      dadosPagamento: {
        banco: "Santander",
        agencia: "3456",
        conta: "98765-4",
        tipoConta: "Conta Corrente",
        chavePix: "98.765.432/0001-00"
      },
      cronogramaPagamento: [
        { parcela: 1, data: "31/08/2024", valor: 40000, status: "Pendente" },
        { parcela: 2, data: "31/12/2024", valor: 40000, status: "Pendente" },
      ],
      documentos: [
        { 
          id: "d3", 
          tipo: "Cartão CNPJ", 
          nome: "cartao_cnpj_estudio_abc.pdf", 
          dataUpload: "20/05/2024",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        },
        { 
          id: "d4", 
          tipo: "Contrato", 
          nome: "contrato_estudio_abc.pdf", 
          dataUpload: "25/05/2024",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          googleDriveUrl: "https://drive.google.com/file/d/exemplo789/view"
        },
        { 
          id: "d5", 
          tipo: "Comprovante de Endereço", 
          nome: "comp_endereco_estudio.pdf", 
          dataUpload: "25/05/2024",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
      ]
    },
  ]);

  // Form states
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [socioContratado, setSocioContratado] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  
  const [projeto, setProjeto] = useState("");
  const [tipo, setTipo] = useState("");
  const [itemOrcamentario, setItemOrcamentario] = useState("");
  const [grandeItem, setGrandeItem] = useState("");
  const [inicio, setInicio] = useState<Date>();
  const [fim, setFim] = useState<Date>();
  const [pagamentoRPA, setPagamentoRPA] = useState(false);
  const [total, setTotal] = useState("");
  
  const [cadastro, setCadastro] = useState<"Pendente" | "Concluído">("Pendente");
  const [acordo, setAcordo] = useState<"Pendente" | "Enviado" | "Ok">("Pendente");
  const [contrato, setContrato] = useState<"Pendente" | "Enviado" | "Concluído">("Pendente");
  const [aditivo, setAditivo] = useState<"Não se aplica" | "Pendente" | "Enviado" | "Concluído">("Não se aplica");
  const [distrato, setDistrato] = useState<"Não se aplica" | "Pendente" | "Enviado" | "Concluído">("Não se aplica");
  const [validarCNAE, setValidarCNAE] = useState<"Pendente" | "Solicitar inclusão" | "Aguardando inclusão" | "Ok">("Pendente");
  const [pagamentoAtreladoEntrega, setPagamentoAtreladoEntrega] = useState(false);
  const [chavePix, setChavePix] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [listaSocios, setListaSocios] = useState<string[]>(["Carlos Roberto Silva", "Maria José Santos", "José Antonio Lima"]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const handleItemOrcamentarioChange = (value: string) => {
    setItemOrcamentario(value);
    // Auto-preencher Grande Item baseado no código
    const grandeItemValue = planoDeContasMap[value] || "";
    setGrandeItem(grandeItemValue);
  };

  const handleCNPJCPFBlur = () => {
    // Simular auto-preenchimento de fornecedor
    if (cnpjCpf === "12.345.678/0001-99") {
      setRazaoSocial("Produtora XYZ Ltda");
      toast.success("Fornecedor encontrado!");
    } else if (cnpjCpf === "123.456.789-00") {
      setRazaoSocial("João Silva");
      toast.success("Fornecedor encontrado!");
    }
  };

  const handleSalvarContratacao = () => {
    if (!projeto || !tipo || !razaoSocial || !cnpjCpf || !itemOrcamentario || !inicio || !fim || !total) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    /**
     * ============================================================================
     * INTEGRAÇÃO COM ORÇAMENTO - COMPROMETIMENTO DE VERBA
     * ============================================================================
     * Quando um contrato é formalizado (salvo), o sistema deve:
     * 
     * 1. Localizar a rúbrica orçamentária vinculada (itemOrcamentario)
     * 2. Somar o Valor Total do Contrato à coluna COMPROMETIDO
     * 
     * Importante: O valor comprometido é o TOTAL do contrato, não o valor 
     * individual de cada parcela. Mesmo que o contrato seja parcelado em 
     * várias parcelas, o comprometimento ocorre no momento da formalização.
     * 
     * Exemplo:
     * - Contrato de R$ 50.000 com 5 parcelas de R$ 10.000
     * - Ao salvar contratação: Comprometido += R$ 50.000
     * 
     * Posteriormente, quando cada parcela for paga (no módulo de Pagamentos),
     * o valor será transferido de COMPROMETIDO para REALIZADO gradualmente.
     * 
     * TODO: Implementar chamada à API para atualizar o orçamento
     * ============================================================================
     */

    console.log("Salvando contratação:", {
      cnpjCpf,
      razaoSocial,
      socioContratado,
      banco,
      agencia,
      conta,
      tipoConta,
      projeto,
      tipo,
      itemOrcamentario,
      grandeItem,
      inicio,
      fim,
      pagamentoRPA,
      total,
      cadastro,
      acordo,
      contrato,
      aditivo,
      distrato,
      validarCNAE,
    });

    toast.success("Contratação salva com sucesso!");
    resetForm();
  };

  const resetForm = () => {
    setCnpjCpf("");
    setRazaoSocial("");
    setSocioContratado("");
    setBanco("");
    setAgencia("");
    setConta("");
    setTipoConta("");
    setProjeto("");
    setTipo("");
    setItemOrcamentario("");
    setGrandeItem("");
    setInicio(undefined);
    setFim(undefined);
    setPagamentoRPA(false);
    setTotal("");
    setCadastro("Pendente");
    setAcordo("Pendente");
    setContrato("Pendente");
    setAditivo("Não se aplica");
    setDistrato("Não se aplica");
    setValidarCNAE("Pendente");
    setPagamentoAtreladoEntrega(false);
    setChavePix("");
    setDocumentos([]);
  };

  const handleUploadDocumento = (tipo: string) => {
    // Simular upload de documento
    const novoDoc: Documento = {
      id: `doc-${Date.now()}`,
      tipo,
      nome: `${tipo.toLowerCase().replace(/ /g, '_')}_${Date.now()}.pdf`,
      dataUpload: new Date().toLocaleDateString('pt-BR')
    };
    setDocumentos(prev => [...prev, novoDoc]);
    toast.success(`${tipo} anexado com sucesso!`);
  };

  const handleRemoverDocumento = (docId: string) => {
    setDocumentos(prev => prev.filter(doc => doc.id !== docId));
    toast.success("Documento removido");
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "Concluído" || status === "Ok") return "default";
    if (status === "Pendente") return "secondary";
    if (status === "Inválido") return "destructive";
    return "outline";
  };

  const handleVisualizar = (item: Contratacao) => {
    setSelectedContratacao(item);
    setOpenVisualizarContratacao(true);
  };

  const handleEditar = (item: Contratacao) => {
    // Se tiver a prop onEditarContratacao, chama ela (navega para tela dedicada)
    if (onEditarContratacao) {
      onEditarContratacao(item);
      return;
    }
    
    // Fallback: mantém lógica antiga com modal
    setSelectedContratacao(item);
    // Preencher formulário com dados do item
    setCnpjCpf(item.cnpjCpf);
    setRazaoSocial(item.razaoSocial);
    setSocioContratado(item.socioContratado || "");
    setProjeto(item.projeto);
    setTipo(item.tipo);
    setItemOrcamentario(item.itemOrcamentario);
    setGrandeItem(item.grandeItem);
    setTotal(item.total.toString());
    setCadastro(item.cadastro);
    setAcordo(item.acordo);
    setContrato(item.contrato);
    setAditivo(item.aditivo);
    setDistrato(item.distrato);
    setValidarCNAE(item.validarCNAE);
    setPagamentoAtreladoEntrega(item.pagamentoAtreladoEntrega);
    if (item.dadosPagamento) {
      setBanco(item.dadosPagamento.banco);
      setAgencia(item.dadosPagamento.agencia);
      setConta(item.dadosPagamento.conta);
      setTipoConta(item.dadosPagamento.tipoConta);
      setChavePix(item.dadosPagamento.chavePix || "");
    }
    setDocumentos(item.documentos || []);
    setOpenEditarContratacao(true);
  };

  const handleExcluir = (item: Contratacao) => {
    setSelectedContratacao(item);
    setDeleteConfirmText("");
    setOpenExcluirContratacao(true);
  };

  const confirmExcluir = () => {
    if (deleteConfirmText === selectedContratacao?.razaoSocial) {
      toast.success(`Contratação de "${selectedContratacao.razaoSocial}" excluída com sucesso!`);
      setOpenExcluirContratacao(false);
      setSelectedContratacao(null);
      setDeleteConfirmText("");
    } else {
      toast.error("Nome incorreto");
    }
  };

  const handleSalvarEdicao = () => {
    if (selectedContratacao) {
      setContratacoes(prev => 
        prev.map(item => 
          item.id === selectedContratacao.id 
            ? {
                ...item,
                cnpjCpf,
                razaoSocial,
                socioContratado,
                projeto,
                tipo,
                itemOrcamentario,
                grandeItem,
                total: parseFloat(total) || 0,
                cadastro,
                acordo,
                contrato,
                aditivo,
                distrato,
                validarCNAE,
                pagamentoAtreladoEntrega,
                dadosPagamento: banco ? {
                  banco,
                  agencia,
                  conta,
                  tipoConta,
                  chavePix
                } : undefined,
                documentos
              }
            : item
        )
      );
    }
    toast.success("Contratação atualizada com sucesso!");
    setOpenEditarContratacao(false);
    resetForm();
  };

  // Função para atualizar o status de Acordo diretamente na tabela
  const handleUpdateAcordo = (id: string, novoStatus: "Pendente" | "Enviado" | "Ok") => {
    setContratacoes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, acordo: novoStatus } : item
      )
    );
    toast.success("Status de Acordo atualizado!");
  };

  // Função para atualizar o status de Contrato diretamente na tabela
  const handleUpdateContrato = (id: string, novoStatus: "Pendente" | "Enviado" | "Concluído") => {
    setContratacoes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, contrato: novoStatus } : item
      )
    );
    toast.success("Status de Contrato atualizado!");
  };

  // Função para atualizar o status de Aditivo diretamente na tabela
  const handleUpdateAditivo = (id: string, novoStatus: "Não se aplica" | "Pendente" | "Enviado" | "Concluído") => {
    setContratacoes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, aditivo: novoStatus } : item
      )
    );
    toast.success("Status de Aditivo atualizado!");
  };

  // Função para atualizar o status de Distrato diretamente na tabela
  const handleUpdateDistrato = (id: string, novoStatus: "Não se aplica" | "Pendente" | "Enviado" | "Concluído") => {
    setContratacoes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, distrato: novoStatus } : item
      )
    );
    toast.success("Status de Distrato atualizado!");
  };

  // Função para atualizar o status de Validar CNAE diretamente na tabela
  const handleUpdateValidarCNAE = (id: string, novoStatus: "Pendente" | "Solicitar inclusão" | "Aguardando inclusão" | "Ok") => {
    setContratacoes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, validarCNAE: novoStatus } : item
      )
    );
    toast.success("Status de Validar CNAE atualizado!");
  };

  // Funções para gerenciar preview de documentos
  const handleAbrirPreview = (documento: Documento, todosDocumentos: Documento[]) => {
    setLoadingDocumento(true);
    setDocumentoAtual(documento);
    setDocumentosDisponiveis(todosDocumentos);
    const indice = todosDocumentos.findIndex(doc => doc.id === documento.id);
    setIndiceDocumentoAtual(indice);
    setOpenPreviewDocumento(true);
    
    // Simular loading
    setTimeout(() => {
      setLoadingDocumento(false);
    }, 500);
  };

  const handleProximoDocumento = () => {
    const proximoIndice = (indiceDocumentoAtual + 1) % documentosDisponiveis.length;
    setIndiceDocumentoAtual(proximoIndice);
    setDocumentoAtual(documentosDisponiveis[proximoIndice]);
    setLoadingDocumento(true);
    setTimeout(() => setLoadingDocumento(false), 300);
  };

  const handleDocumentoAnterior = () => {
    const indiceAnterior = indiceDocumentoAtual === 0 
      ? documentosDisponiveis.length - 1 
      : indiceDocumentoAtual - 1;
    setIndiceDocumentoAtual(indiceAnterior);
    setDocumentoAtual(documentosDisponiveis[indiceAnterior]);
    setLoadingDocumento(true);
    setTimeout(() => setLoadingDocumento(false), 300);
  };

  const handleBaixarDocumento = (documento: Documento) => {
    toast.success(`Download iniciado: ${documento.nome}`);
    // Aqui iria a lógica real de download
    if (documento.url) {
      window.open(documento.url, '_blank');
    }
  };

  const handleAbrirGoogleDrive = (googleDriveUrl: string) => {
    window.open(googleDriveUrl, '_blank');
    toast.success("Abrindo no Google Drive...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Contratação</h2>
          <p className="text-muted-foreground mt-1">
            Gestão de contratos e cadastros
          </p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Projeto</Label>
              <Select value={selectedProjeto} onValueChange={setSelectedProjeto}>
                <SelectTrigger>
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

            <div>
              <Label>Tipo</Label>
              <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                  <SelectItem value="Equipe do projeto">Equipe do projeto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nome, CNPJ/CPF ou projeto..."
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
            <div />
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={onNovaContratacao}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova contratação
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Razão social</TableHead>
                  <TableHead>CNPJ/CPF</TableHead>
                  <TableHead>Item orçamentário</TableHead>
                  <TableHead>Grande item</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead>Validar CNAE</TableHead>
                  <TableHead>Acordo</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Aditivo</TableHead>
                  <TableHead>Distrato</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratacoes
                  .filter((item) => {
                    // Filtro de projeto
                    if (selectedProjeto !== "todos" && item.projeto !== selectedProjeto) return false;
                    // Filtro de tipo
                    if (selectedTipo !== "todos" && item.tipo !== selectedTipo) return false;
                    // Filtro de busca
                    if (searchTerm) {
                      const search = searchTerm.toLowerCase();
                      return (
                        item.razaoSocial.toLowerCase().includes(search) ||
                        item.cnpjCpf.toLowerCase().includes(search) ||
                        item.projeto.toLowerCase().includes(search)
                      );
                    }
                    return true;
                  })
                  .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.projeto}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.razaoSocial}</TableCell>
                    <TableCell>{item.cnpjCpf}</TableCell>
                    <TableCell>{item.itemOrcamentario}</TableCell>
                    <TableCell>{item.grandeItem}</TableCell>
                    <TableCell>{item.inicio}</TableCell>
                    <TableCell>{item.fim}</TableCell>
                    <TableCell>{formatCurrency(item.total)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.cadastro)}>
                        {item.cadastro}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.validarCNAE} 
                        onValueChange={(v: any) => handleUpdateValidarCNAE(item.id, v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Solicitar inclusão">Solicitar inclusão</SelectItem>
                          <SelectItem value="Aguardando inclusão">Aguardando inclusão</SelectItem>
                          <SelectItem value="Ok">Ok</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.acordo} 
                        onValueChange={(v: any) => handleUpdateAcordo(item.id, v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Ok">Ok</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.contrato} 
                        onValueChange={(v: any) => handleUpdateContrato(item.id, v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.aditivo} 
                        onValueChange={(v: any) => handleUpdateAditivo(item.id, v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.distrato} 
                        onValueChange={(v: any) => handleUpdateDistrato(item.id, v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleVisualizar(item)}>Visualizar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditar(item)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleExcluir(item)}>
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

      {/* Modal - Visualizar Contratação */}
      <Dialog open={openVisualizarContratacao} onOpenChange={setOpenVisualizarContratacao}>
        <DialogContent className="max-w-[800px]" aria-describedby="dialog-visualizar-description">
          <DialogHeader>
            <DialogTitle>Detalhes da Contratação</DialogTitle>
            <DialogDescription id="dialog-visualizar-description">
              Visualize todas as informações desta contratação
            </DialogDescription>
          </DialogHeader>
          {selectedContratacao && (
            <div className="space-y-6 mt-4 max-h-[70vh] overflow-y-auto pr-2">
              {/* Informações Básicas */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">Projeto</Label>
                  <p className="mt-1 font-medium">{selectedContratacao.projeto}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Tipo</Label>
                  <p className="mt-1">{selectedContratacao.tipo}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Total do Contrato</Label>
                  <p className="mt-1 font-semibold text-lg text-primary">{formatCurrency(selectedContratacao.total)}</p>
                </div>
              </div>

              {/* Card CNPJ/CPF com Link de Validação */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Label className="text-muted-foreground text-sm">Razão Social / Nome</Label>
                    <p className="mt-1 font-semibold text-lg">{selectedContratacao.razaoSocial}</p>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground text-xs">CNPJ/CPF</Label>
                        <p className="mt-1 font-mono">{selectedContratacao.cnpjCpf}</p>
                      </div>
                      {selectedContratacao.socioContratado && (
                        <div>
                          <Label className="text-muted-foreground text-xs">Sócio Contratado</Label>
                          <p className="mt-1">{selectedContratacao.socioContratado}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                    onClick={() => window.open(`https://www.receitafederal.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao.asp`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Validar CNPJ
                  </Button>
                </div>
              </div>

              {/* Informações Orçamentárias e Período */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground text-sm">Item Orçamentário</Label>
                  <p className="mt-1 font-medium">{selectedContratacao.itemOrcamentario}</p>
                  <Label className="text-muted-foreground text-xs mt-2 block">Grande Item</Label>
                  <p className="mt-1">{selectedContratacao.grandeItem}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Período de Vigência</Label>
                  <p className="mt-1">{selectedContratacao.inicio} até {selectedContratacao.fim}</p>
                  {selectedContratacao.isRPA && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">Contratação via RPA</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block">Status</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cadastro</p>
                    <Badge variant={getStatusBadgeVariant(selectedContratacao.cadastro)}>
                      {selectedContratacao.cadastro}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Validar CNAE</p>
                    <Badge variant={getStatusBadgeVariant(selectedContratacao.validarCNAE)}>
                      {selectedContratacao.validarCNAE}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Acordo</p>
                    <Badge variant={getStatusBadgeVariant(selectedContratacao.acordo)}>
                      {selectedContratacao.acordo}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contrato</p>
                    <Badge variant={getStatusBadgeVariant(selectedContratacao.contrato)}>
                      {selectedContratacao.contrato}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Aditivo</p>
                    <Badge variant="outline">{selectedContratacao.aditivo}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Distrato</p>
                    <Badge variant="outline">{selectedContratacao.distrato}</Badge>
                  </div>
                </div>
              </div>

              {/* Cronograma de Pagamento */}
              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block font-semibold">Cronograma de Pagamento</Label>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Parcela</TableHead>
                        <TableHead>Data Prevista</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedContratacao.cronogramaPagamento && selectedContratacao.cronogramaPagamento.length > 0 ? (
                        selectedContratacao.cronogramaPagamento.map((parcela, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{parcela.parcela}ª</TableCell>
                            <TableCell>{parcela.data}</TableCell>
                            <TableCell>{formatCurrency(parcela.valor)}</TableCell>
                            <TableCell>
                              <Badge variant={parcela.status === "Pago" ? "default" : "secondary"}>
                                {parcela.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                            Nenhum cronograma de pagamento cadastrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Alerta de Pagamento Atrelado à Entrega */}
              {selectedContratacao.pagamentoAtreladoEntrega && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Atenção:</strong> O último pagamento está atrelado à entrega do serviço. Confira se todas as entregas foram realizadas antes de aprovar o pagamento final.
                  </AlertDescription>
                </Alert>
              )}

              {/* Dados de Pagamento */}
              {selectedContratacao.dadosPagamento && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground mb-3 block font-semibold">Dados Bancários</Label>
                  <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Banco</p>
                      <p className="font-medium">{selectedContratacao.dadosPagamento.banco}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Agência</p>
                      <p className="font-medium">{selectedContratacao.dadosPagamento.agencia}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conta</p>
                      <p className="font-medium">{selectedContratacao.dadosPagamento.conta}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipo de Conta</p>
                      <p className="font-medium">{selectedContratacao.dadosPagamento.tipoConta}</p>
                    </div>
                    {selectedContratacao.dadosPagamento.chavePix && (
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Chave PIX</p>
                        <p className="font-medium font-mono">{selectedContratacao.dadosPagamento.chavePix}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documentos com Links Clicáveis */}
              <div className="border-t pt-4">
                <Label className="text-muted-foreground mb-3 block font-semibold">Documentos da Contratação</Label>
                
                {/* Links para Documentos Principais */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => {
                      const doc = selectedContratacao.documentos.find(d => d.tipo === "Contrato");
                      if (doc) {
                        handleAbrirPreview(doc, selectedContratacao.documentos);
                      } else {
                        toast.error("Contrato não anexado");
                      }
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-medium">Contrato</span>
                      </div>
                      {selectedContratacao.documentos.find(d => d.tipo === "Contrato") ? (
                        <span className="text-xs text-muted-foreground">Clique para visualizar</span>
                      ) : (
                        <span className="text-xs text-destructive">Não anexado</span>
                      )}
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => {
                      const doc = selectedContratacao.documentos.find(d => d.tipo === "Aditivo");
                      if (doc) {
                        handleAbrirPreview(doc, selectedContratacao.documentos);
                      } else {
                        toast.info("Aditivo não aplicável ou não anexado");
                      }
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Aditivo</span>
                      </div>
                      {selectedContratacao.documentos.find(d => d.tipo === "Aditivo") ? (
                        <span className="text-xs text-muted-foreground">Clique para visualizar</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não aplicável</span>
                      )}
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => {
                      const doc = selectedContratacao.documentos.find(d => d.tipo === "Distrato");
                      if (doc) {
                        handleAbrirPreview(doc, selectedContratacao.documentos);
                      } else {
                        toast.info("Distrato não aplicável ou não anexado");
                      }
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-red-600" />
                        <span className="font-medium">Distrato</span>
                      </div>
                      {selectedContratacao.documentos.find(d => d.tipo === "Distrato") ? (
                        <span className="text-xs text-muted-foreground">Clique para visualizar</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Não aplicável</span>
                      )}
                    </div>
                  </Button>
                </div>

                {/* Todos os Documentos Anexados */}
                {selectedContratacao.documentos && selectedContratacao.documentos.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground text-sm mb-2 block">Todos os documentos anexados:</Label>
                    <div className="space-y-2">
                      {selectedContratacao.documentos.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleAbrirPreview(doc, selectedContratacao.documentos)}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{doc.tipo}</p>
                                {doc.googleDriveUrl && (
                                  <Badge variant="outline" className="text-xs">
                                    Google Drive
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{doc.nome} • {doc.dataUpload}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBaixarDocumento(doc);
                              }}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenVisualizarContratacao(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Editar Contratação */}
      <Dialog open={openEditarContratacao} onOpenChange={setOpenEditarContratacao}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-y-auto" aria-describedby="dialog-editar-description">
          <DialogHeader>
            <DialogTitle>Editar Contratação</DialogTitle>
            <DialogDescription id="dialog-editar-description">
              Atualize os dados desta contratação
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Seção: Dados do fornecedor */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Dados do fornecedor</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CNPJ/CPF <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Digite o CNPJ ou CPF"
                    value={cnpjCpf}
                    onChange={(e) => setCnpjCpf(e.target.value)}
                    onBlur={handleCNPJCPFBlur}
                  />
                </div>
                <div>
                  <Label>Razão social <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Preenchido automaticamente"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div>
                <Label>Sócio Contratado</Label>
                <Select value={socioContratado} onValueChange={setSocioContratado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sócio (se aplicável)" />
                  </SelectTrigger>
                  <SelectContent>
                    {listaSocios.map((socio) => (
                      <SelectItem key={socio} value={socio}>{socio}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Seção: Dados da contratação */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Dados da contratação</h3>
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
                  <Label>Tipo <span className="text-destructive">*</span></Label>
                  <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equipe fixa">Equipe fixa</SelectItem>
                      <SelectItem value="Equipe do projeto">Equipe do projeto</SelectItem>
                      <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                      <SelectItem value="Elenco">Elenco</SelectItem>
                      <SelectItem value="Gerenciamento">Gerenciamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Item orçamentário <span className="text-destructive">*</span></Label>
                  <Select value={itemOrcamentario} onValueChange={handleItemOrcamentarioChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="001.001">001.001 - Chefe de roteiro</SelectItem>
                      <SelectItem value="001.002">001.002 - Assistente de roteiro</SelectItem>
                      <SelectItem value="002.001">002.001 - Produtor executivo</SelectItem>
                      <SelectItem value="003.001">003.001 - Diretor(a)</SelectItem>
                      <SelectItem value="004.001">004.001 - Ator principal</SelectItem>
                      <SelectItem value="005.002">005.002 - Edição</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grande item</Label>
                  <Input
                    placeholder="Preenchido automaticamente"
                    value={grandeItem}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Total <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="R$ 0,00"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Status da contratação */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Status da contratação</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Cadastro</Label>
                  <Select value={cadastro} onValueChange={(v: any) => setCadastro(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Validar CNAE</Label>
                  <Select value={validarCNAE} onValueChange={(v: any) => setValidarCNAE(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Solicitar inclusão">Solicitar inclusão</SelectItem>
                      <SelectItem value="Aguardando inclusão">Aguardando inclusão</SelectItem>
                      <SelectItem value="Ok">Ok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Acordo</Label>
                  <Select value={acordo} onValueChange={(v: any) => setAcordo(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Ok">Ok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Contrato</Label>
                  <Select value={contrato} onValueChange={(v: any) => setContrato(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Aditivo</Label>
                  <Select value={aditivo} onValueChange={(v: any) => setAditivo(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Distrato</Label>
                  <Select value={distrato} onValueChange={(v: any) => setDistrato(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Concluído">Concludo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Dados de Pagamento */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Dados de Pagamento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Banco</Label>
                  <Input
                    placeholder="Nome do banco"
                    value={banco}
                    onChange={(e) => setBanco(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Agência</Label>
                  <Input
                    placeholder="0000-0"
                    value={agencia}
                    onChange={(e) => setAgencia(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Conta</Label>
                  <Input
                    placeholder="00000-0"
                    value={conta}
                    onChange={(e) => setConta(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tipo de Conta</Label>
                  <Select value={tipoConta} onValueChange={setTipoConta}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                      <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
                      <SelectItem value="Conta Salário">Conta Salário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Chave PIX (opcional)</Label>
                <Input
                  placeholder="CPF, CNPJ, E-mail, Telefone ou Chave aleatória"
                  value={chavePix}
                  onChange={(e) => setChavePix(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="pagamento-entrega"
                  checked={pagamentoAtreladoEntrega}
                  onCheckedChange={setPagamentoAtreladoEntrega}
                />
                <Label htmlFor="pagamento-entrega" className="cursor-pointer">
                  Último pagamento atrelado à entrega do serviço
                </Label>
              </div>
              {pagamentoAtreladoEntrega && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    Este contrato terá o último pagamento condicionado à confirmação de entrega do serviço.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Seção: Documentos */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Documentos da Contratação</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Cartão CNPJ")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Cartão CNPJ
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Contrato")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Contrato
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Aditivo")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Aditivo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Distrato")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Distrato
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("RPA")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar RPA
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Comprovante de Endereço")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Comp. Endereço
                </Button>
              </div>

              {/* Lista de documentos anexados */}
              {documentos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label className="text-sm text-muted-foreground">Documentos anexados:</Label>
                  {documentos.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.tipo}</p>
                          <p className="text-xs text-muted-foreground">{doc.nome} • {doc.dataUpload}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoverDocumento(doc.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditarContratacao(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSalvarEdicao}>
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Excluir Contratação */}
      <Dialog open={openExcluirContratacao} onOpenChange={setOpenExcluirContratacao}>
        <DialogContent aria-describedby="dialog-excluir-description">
          <DialogHeader>
            <DialogTitle>Excluir Contratação</DialogTitle>
            <DialogDescription id="dialog-excluir-description">
              Esta ação é irreversível. Digite o nome da razão social para confirmar a exclusão.
            </DialogDescription>
          </DialogHeader>
          {selectedContratacao && (
            <div className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Esta ação é irreversível. Para confirmar, digite o nome da razão social abaixo:
              </p>
              <div>
                <Label>Contratação a ser excluída:</Label>
                <p className="mt-1 font-medium">{selectedContratacao.razaoSocial}</p>
                <p className="text-sm text-muted-foreground">{selectedContratacao.projeto} - {selectedContratacao.itemOrcamentario}</p>
              </div>
              <div>
                <Label>Digite a razão social para confirmar</Label>
                <Input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={selectedContratacao.razaoSocial}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenExcluirContratacao(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmExcluir}
              disabled={deleteConfirmText !== selectedContratacao?.razaoSocial}
            >
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal - Preview de Documentos */}
      <Dialog open={openPreviewDocumento} onOpenChange={setOpenPreviewDocumento}>
        <DialogContent className="max-w-[920px] h-[85vh] flex flex-col overflow-hidden" aria-describedby="dialog-preview-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              {documentoAtual?.tipo}
            </DialogTitle>
            <DialogDescription id="dialog-preview-description" className="mt-1">
              {documentoAtual?.nome}
            </DialogDescription>
          </DialogHeader>

          {documentoAtual && (
            <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
              {/* Área de Preview */}
              <div className="flex-1 border rounded-lg bg-muted/20 overflow-hidden relative" style={{ maxHeight: 'calc(100% - 140px)' }}>
                {loadingDocumento ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Carregando documento...</p>
                    </div>
                  </div>
                ) : documentoAtual.url ? (
                  <iframe
                    src={documentoAtual.url}
                    className="w-full h-full"
                    title={documentoAtual.nome}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <FileText className="w-16 h-16 text-muted-foreground/50" />
                      <div>
                        <p className="font-medium">Preview não disponível</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Clique em "Baixar" para visualizar este documento
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleBaixarDocumento(documentoAtual)}
                        className="mt-2"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar Documento
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações do Documento */}
              <div className="border-t pt-3 pb-2 flex-shrink-0">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tipo</p>
                    <p className="font-medium">{documentoAtual.tipo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Data de Upload</p>
                    <p className="font-medium">{documentoAtual.dataUpload}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Armazenamento</p>
                    <p className="font-medium">
                      {documentoAtual.googleDriveUrl ? (
                        <span className="flex items-center gap-1">
                          <GoogleDriveIcon className="w-4 h-4" />
                          Google Drive
                        </span>
                      ) : (
                        "Sistema Local"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de Ações - Rodapé */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t flex-shrink-0">
                {/* Navegação à Esquerda */}
                <div className="flex items-center gap-2">
                  {documentosDisponiveis.length > 1 ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDocumentoAnterior}
                        disabled={loadingDocumento}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground px-2">
                        {indiceDocumentoAtual + 1} de {documentosDisponiveis.length}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleProximoDocumento}
                        disabled={loadingDocumento}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>

                {/* Ações à Direita */}
                <div className="flex items-center gap-2">
                  {/* Botão Google Drive */}
                  {documentoAtual.googleDriveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAbrirGoogleDrive(documentoAtual.googleDriveUrl!)}
                    >
                      <GoogleDriveIcon className="w-4 h-4 mr-2" />
                      Google Drive
                    </Button>
                  )}
                  
                  {/* Botão Download */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBaixarDocumento(documentoAtual)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>

                  {/* Botão Fechar */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenPreviewDocumento(false)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}