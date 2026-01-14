import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  FileText,
  Upload,
  RefreshCw,
  XCircle,
  Calendar as CalendarIcon,
  Building2,
  User,
  AlertTriangle,
  MoreVertical
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";

// ============================
// INTERFACES
// ============================

interface PrevisaoDemanda {
  id: string;
  departamento: string;
  valorEstimado: number;
  criadoPor: string;
  criadoEm: Date;
}

interface Cartao {
  id: string;
  numero: string;
  ultimos4: string;
  cpfVinculado: string;
  nomeVinculado: string;
  departamento: string;
  status: "Ativo" | "Bloqueado" | "Cancelado";
  limite: number;
}

interface SolicitacaoVerba {
  id: string;
  data: Date;
  solicitante: string;
  departamento: string;
  cartaoId: string;
  numeroCartao: string;
  valorSolicitado: number;
  valorAprovado?: number;
  observacao: string;
  status: "Aprovada" | "Carga realizada" | "Prestação pendente" | "Prestação parcial" | "Prestação realizada" | "Liberado para reembolso" | "Reembolso realizado";
  motivoAprovacaoParcial?: string;
  temPrestacaoPendente: boolean;
}

interface NotaFiscal {
  id: string;
  cnpj: string;
  razaoSocial: string;
  numeroDocumento: string;
  dataCompra: Date;
  descritivo: string;
  valor: number;
  comprovante?: string;
  statusControladoria?: "Aguardando" | "Aprovado" | "Reprovado";
  comprovanteCarimbado?: string;
  observacaoControladoria?: string;
}

interface LotePrestacao {
  id: string;
  numeroLote: number;
  descricao: string;
  valorTotal: number;
  notas: NotaFiscal[];
  status: "Em preenchimento" | "Submetido" | "Aprovado" | "Parcialmente aprovado" | "Reprovado";
  dataEnvio?: Date;
  dataAprovacao?: Date;
}

interface PrestacaoContas {
  id: string;
  solicitacaoVerbaId: string;
  numeroCartao: string;
  solicitante: string;
  departamento: string;
  valorLiberado: number;
  valorPrestado: number;
  valorAprovado: number;
  lotes: LotePrestacao[];
  status: "Em preenchimento" | "Aguardando controladoria" | "Parcialmente aprovado" | "Totalmente aprovado" | "Aguardando reembolso" | "Reembolsado";
  statusOmie?: "Não enviado" | "Enviado" | "Confirmado";
  dataLiberacao?: Date;
  dataEnvioPrestacao?: Date;
  dataPrestacao?: Date;
  dataAprovacao?: Date;
  dataReembolso?: Date;
}

// ============================
// COMPONENTE PRINCIPAL
// ============================

export default function ControleDeVerba() {
  const { currentUser, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("visao-geral");
  
  // View states
  const [currentView, setCurrentView] = useState<"main" | "prestacao-detalhes" | "solicitacao-detalhes">("main");
  
  // Modals states
  const [openNovaPrevisao, setOpenNovaPrevisao] = useState(false);
  const [openNovaSolicitacao, setOpenNovaSolicitacao] = useState(false);
  const [openPrestacaoContas, setOpenPrestacaoContas] = useState(false);
  const [openAdicionarLote, setOpenAdicionarLote] = useState(false);
  const [openAprovarLote, setOpenAprovarLote] = useState(false);
  const [openReprovarLote, setOpenReprovarLote] = useState(false);
  const [openSolicitarOmie, setOpenSolicitarOmie] = useState(false);
  const [openConfirmarCarga, setOpenConfirmarCarga] = useState(false); // NOVO: PRD 004

  // Selected items
  const [selectedPrevisao, setSelectedPrevisao] = useState<PrevisaoDemanda | null>(null);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoVerba | null>(null);
  const [selectedPrestacao, setSelectedPrestacao] = useState<PrestacaoContas | null>(null);
  const [selectedLote, setSelectedLote] = useState<LotePrestacao | null>(null);
  const [selectedSolicitacaoCarga, setSelectedSolicitacaoCarga] = useState<SolicitacaoVerba | null>(null); // NOVO: PRD 004

  // Form states - Previsão de Demanda
  const [previsaoDepartamento, setPrevisaoDepartamento] = useState("");
  const [previsaoValor, setPrevisaoValor] = useState("");

  // Form states - Solicitação de Verba
  const [solCartaoId, setSolCartaoId] = useState("");
  const [solValor, setSolValor] = useState("");
  const [solObservacao, setSolObservacao] = useState("");



  // Form states - Lote de Prestação
  const [loteDescricao, setLoteDescricao] = useState("");
  const [loteValor, setLoteValor] = useState("");
  const [loteDataGasto, setLoteDataGasto] = useState<Date>();
  const [loteCategoria, setLoteCategoria] = useState("");
  const [loteItemOrcamentario, setLoteItemOrcamentario] = useState("");
  const [loteComprovante, setLoteComprovante] = useState<File | null>(null);

  // Form states - Aprovação de Lote
  const [loteComprovanteCarimbado, setLoteComprovanteCarimbado] = useState<File | null>(null);
  const [loteObservacaoControladoria, setLoteObservacaoControladoria] = useState("");

  // Form states - Confirmação de Carga (PRD 004 - História 5)
  const [comprovanteCarga, setComprovanteCarga] = useState<File | null>(null);
  const [observacoesCarga, setObservacoesCarga] = useState("");

  // ============================
  // DADOS MOCK
  // ============================

  const [previsoes, setPrevisoes] = useState<PrevisaoDemanda[]>([
    {
      id: "prev1",
      departamento: "Produção",
      valorEstimado: 50000,
      criadoPor: "Maria Silva",
      criadoEm: new Date(2024, 10, 15),
    },
    {
      id: "prev2",
      departamento: "Arte",
      valorEstimado: 25000,
      criadoPor: "João Santos",
      criadoEm: new Date(2024, 10, 10),
    },
  ]);

  const cartoes: Cartao[] = [
    {
      id: "c1",
      numero: "5421 **** **** 1234",
      ultimos4: "1234",
      cpfVinculado: "123.456.789-00",
      nomeVinculado: "Maria Silva",
      departamento: "Produção",
      status: "Ativo",
      limite: 50000,
    },
    {
      id: "c2",
      numero: "4532 **** **** 5678",
      ultimos4: "5678",
      cpfVinculado: "987.654.321-00",
      nomeVinculado: "João Santos",
      departamento: "Arte",
      status: "Ativo",
      limite: 30000,
    },
    {
      id: "c3",
      numero: "6011 **** **** 9012",
      ultimos4: "9012",
      cpfVinculado: "456.789.123-00",
      nomeVinculado: "Pedro Oliveira",
      departamento: "Direção",
      status: "Ativo",
      limite: 40000,
    },
  ];

  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoVerba[]>([
    {
      id: "sol1",
      data: new Date(2024, 10, 20),
      solicitante: "Maria Silva",
      departamento: "Produção",
      cartaoId: "c1",
      numeroCartao: "5421 **** **** 1234",
      valorSolicitado: 15000,
      valorAprovado: 10000,
      observacao: "Necessário para filmagens em externa",
      status: "Prestação pendente",
      temPrestacaoPendente: true,
    },
    {
      id: "sol2",
      data: new Date(2024, 10, 22),
      solicitante: "João Santos",
      departamento: "Arte",
      cartaoId: "c2",
      numeroCartao: "4532 **** **** 5678",
      valorSolicitado: 8000,
      valorAprovado: 8000,
      observacao: "Compra de materiais para cenário da cena 5",
      status: "Carga realizada",
      temPrestacaoPendente: false,
    },
    {
      id: "sol3",
      data: new Date(2024, 10, 23),
      solicitante: "Pedro Oliveira",
      departamento: "Direção",
      cartaoId: "c3",
      numeroCartao: "6011 **** **** 9012",
      valorSolicitado: 12000,
      observacao: "Viagem técnica para locações",
      status: "Aprovada",
      temPrestacaoPendente: false,
    },
    {
      id: "sol4",
      data: new Date(2024, 10, 24),
      solicitante: "Maria Silva",
      departamento: "Produção",
      cartaoId: "c1",
      numeroCartao: "5421 **** **** 1234",
      valorSolicitado: 20000,
      valorAprovado: 20000,
      observacao: "Equipamentos e alimentação",
      status: "Liberado para reembolso",
      temPrestacaoPendente: false,
    },
    {
      id: "sol5",
      data: new Date(2024, 10, 25),
      solicitante: "João Santos",
      departamento: "Arte",
      cartaoId: "c2",
      numeroCartao: "4532 **** **** 5678",
      valorSolicitado: 5000,
      valorAprovado: 5000,
      observacao: "Materiais diversos",
      status: "Reembolso realizado",
      temPrestacaoPendente: false,
    },
  ]);

  const [prestacoes, setPrestacoes] = useState<PrestacaoContas[]>([
    {
      id: "prest1",
      solicitacaoVerbaId: "sol1",
      numeroCartao: "5421 **** **** 1234",
      solicitante: "Maria Silva",
      departamento: "Produção",
      valorLiberado: 10000,
      valorPrestado: 9850,
      valorAprovado: 8750,
      dataLiberacao: new Date(2024, 10, 21),
      dataEnvioPrestacao: new Date(2024, 10, 26),
      lotes: [
        {
          id: "lote1",
          numeroLote: 1,
          descricao: "Prestação Parcial 1 - Equipamentos e Transporte",
          valorTotal: 7500,
          status: "Aprovado",
          dataEnvio: new Date(2024, 10, 26),
          dataAprovacao: new Date(2024, 10, 27),
          notas: [
            {
              id: "nota1",
              cnpj: "12.345.678/0001-90",
              razaoSocial: "Locadora de Equipamentos Cine Ltda",
              numeroDocumento: "NF-12345",
              dataCompra: new Date(2024, 10, 15),
              descritivo: "Locação câmera RED Komodo 6K por 3 dias",
              valor: 4500,
              comprovante: "nota1.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota2",
              cnpj: "12.345.678/0001-90",
              razaoSocial: "Locadora de Equipamentos Cine Ltda",
              numeroDocumento: "NF-12346",
              dataCompra: new Date(2024, 10, 15),
              descritivo: "Locação lentes Zeiss CP.3 (set completo)",
              valor: 2000,
              comprovante: "nota2.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota3",
              cnpj: "98.765.432/0001-10",
              razaoSocial: "Transportes Rápidos São Paulo Ltda",
              numeroDocumento: "NF-78901",
              dataCompra: new Date(2024, 10, 16),
              descritivo: "Frete equipamentos - São Paulo para locação",
              valor: 800,
              comprovante: "nota3.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota4",
              cnpj: "11.222.333/0001-44",
              razaoSocial: "Auto Posto Bandeirantes",
              numeroDocumento: "CF-45678",
              dataCompra: new Date(2024, 10, 16),
              descritivo: "Abastecimento van de produção",
              valor: 200,
              comprovante: "nota4.pdf",
              statusControladoria: "Aprovado",
            },
          ],
        },
        {
          id: "lote2",
          numeroLote: 2,
          descricao: "Prestação Parcial 2 - Alimentação e Outros",
          valorTotal: 2350,
          status: "Parcialmente aprovado",
          dataEnvio: new Date(2024, 10, 28),
          notas: [
            {
              id: "nota5",
              cnpj: "55.666.777/0001-88",
              razaoSocial: "Restaurante Bom Sabor Ltda",
              numeroDocumento: "NF-11111",
              dataCompra: new Date(2024, 10, 17),
              descritivo: "Almoço equipe de filmagem - 15 pessoas",
              valor: 450,
              comprovante: "nota5.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota6",
              cnpj: "55.666.777/0001-88",
              razaoSocial: "Restaurante Bom Sabor Ltda",
              numeroDocumento: "NF-11112",
              dataCompra: new Date(2024, 10, 17),
              descritivo: "Jantar equipe de filmagem - 15 pessoas",
              valor: 550,
              comprovante: "nota6.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota7",
              cnpj: "33.444.555/0001-99",
              razaoSocial: "Padaria e Confeitaria Central",
              numeroDocumento: "CF-22222",
              dataCompra: new Date(2024, 10, 18),
              descritivo: "Café da manhã e lanches para equipe",
              valor: 250,
              comprovante: "nota7.pdf",
              statusControladoria: "Aprovado",
            },
            {
              id: "nota8",
              cnpj: "77.888.999/0001-22",
              razaoSocial: "Mercado Super Econômico",
              numeroDocumento: "CF-33333",
              dataCompra: new Date(2024, 10, 18),
              descritivo: "Compras sem comprovante fiscal legível",
              valor: 1100,
              comprovante: "nota8.pdf",
              statusControladoria: "Reprovado",
              observacaoControladoria: "Comprovante ilegível, favor reenviar nota fiscal em melhor qualidade",
            },
          ],
        },
      ],
      status: "Parcialmente aprovado",
      statusOmie: "Não enviado",
      dataPrestacao: new Date(2024, 10, 28),
    },
    {
      id: "prest2",
      solicitacaoVerbaId: "sol2",
      numeroCartao: "4532 **** **** 5678",
      solicitante: "João Santos",
      departamento: "Arte",
      valorLiberado: 15000,
      valorPrestado: 14650,
      valorAprovado: 14650,
      dataLiberacao: new Date(2024, 10, 10),
      dataEnvioPrestacao: new Date(2024, 10, 22),
      lotes: [
        {
          id: "lote3",
          numeroLote: 1,
          descricao: "Prestação Única - Materiais de Arte e Figurino",
          valorTotal: 14650,
          status: "Aprovado",
          dataEnvio: new Date(2024, 10, 22),
          dataAprovacao: new Date(2024, 10, 24),
          notas: [
            {
              id: "nota9",
              cnpj: "22.333.444/0001-55",
              razaoSocial: "Arte e Cor Materiais Ltda",
              numeroDocumento: "NF-50001",
              dataCompra: new Date(2024, 10, 11),
              descritivo: "Tintas acrílicas profissionais - 20 unidades",
              valor: 850,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota10",
              cnpj: "22.333.444/0001-55",
              razaoSocial: "Arte e Cor Materiais Ltda",
              numeroDocumento: "NF-50002",
              dataCompra: new Date(2024, 10, 11),
              descritivo: "Pincéis e espátulas - kit profissional",
              valor: 420,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota11",
              cnpj: "22.333.444/0001-55",
              razaoSocial: "Arte e Cor Materiais Ltda",
              numeroDocumento: "NF-50003",
              dataCompra: new Date(2024, 10, 11),
              descritivo: "Telas canvas 100x150cm - 5 unidades",
              valor: 1250,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota12",
              cnpj: "66.777.888/0001-99",
              razaoSocial: "Tecidos e Aviamentos Central",
              numeroDocumento: "NF-78500",
              dataCompra: new Date(2024, 10, 12),
              descritivo: "Tecido seda natural - 15 metros",
              valor: 1800,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota13",
              cnpj: "66.777.888/0001-99",
              razaoSocial: "Tecidos e Aviamentos Central",
              numeroDocumento: "NF-78501",
              dataCompra: new Date(2024, 10, 12),
              descritivo: "Tecido linho premium - 20 metros",
              valor: 2200,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota14",
              cnpj: "66.777.888/0001-99",
              razaoSocial: "Tecidos e Aviamentos Central",
              numeroDocumento: "NF-78502",
              dataCompra: new Date(2024, 10, 12),
              descritivo: "Aviamentos diversos (botões, zíperes, linhas)",
              valor: 580,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota15",
              cnpj: "88.999.000/0001-11",
              razaoSocial: "Papelaria e Escritório Total",
              numeroDocumento: "CF-12345",
              dataCompra: new Date(2024, 10, 13),
              descritivo: "Papéis especiais e cartolinas",
              valor: 320,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota16",
              cnpj: "44.555.666/0001-77",
              razaoSocial: "Ferragens e Ferramentas Industrial",
              numeroDocumento: "NF-99888",
              dataCompra: new Date(2024, 10, 14),
              descritivo: "Ferramentas para cenografia (martelo, serra, alicate)",
              valor: 680,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota17",
              cnpj: "33.444.555/0001-22",
              razaoSocial: "Madeiras Nobres São Paulo",
              numeroDocumento: "NF-44556",
              dataCompra: new Date(2024, 10, 15),
              descritivo: "Madeira MDF 15mm - 10 chapas",
              valor: 950,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota18",
              cnpj: "33.444.555/0001-22",
              razaoSocial: "Madeiras Nobres São Paulo",
              numeroDocumento: "NF-44557",
              dataCompra: new Date(2024, 10, 15),
              descritivo: "Madeira compensado 10mm - 8 chapas",
              valor: 720,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota19",
              cnpj: "11.222.333/0001-88",
              razaoSocial: "Adesivos e Colas Express",
              numeroDocumento: "CF-77889",
              dataCompra: new Date(2024, 10, 16),
              descritivo: "Colas especiais para cenografia",
              valor: 280,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota20",
              cnpj: "55.666.777/0001-44",
              razaoSocial: "Iluminação Profissional Ltda",
              numeroDocumento: "NF-33221",
              dataCompra: new Date(2024, 10, 17),
              descritivo: "Lâmpadas LED especiais para set - 12 unidades",
              valor: 1450,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota21",
              cnpj: "99.888.777/0001-66",
              razaoSocial: "Armarinho do Centro",
              numeroDocumento: "CF-55443",
              dataCompra: new Date(2024, 10, 18),
              descritivo: "Elásticos, fitas e rendas para figurino",
              valor: 390,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota22",
              cnpj: "77.666.555/0001-33",
              razaoSocial: "Espumas e Estofados Premium",
              numeroDocumento: "NF-88776",
              dataCompra: new Date(2024, 10, 19),
              descritivo: "Espuma D33 para adereços",
              valor: 560,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota23",
              cnpj: "22.111.000/0001-99",
              razaoSocial: "Tintas Industriais ABC",
              numeroDocumento: "NF-22334",
              dataCompra: new Date(2024, 10, 20),
              descritivo: "Tinta spray diversas cores - 24 unidades",
              valor: 720,
              statusControladoria: "Aprovado",
            },
            {
              id: "nota24",
              cnpj: "88.777.666/0001-55",
              razaoSocial: "Acessórios Cênicos Profissionais",
              numeroDocumento: "NF-11223",
              dataCompra: new Date(2024, 10, 21),
              descritivo: "Adereços e acessórios variados para cena",
              valor: 1480,
              statusControladoria: "Aprovado",
            },
          ],
        },
      ],
      status: "Aguardando reembolso",
      statusOmie: "Enviado",
      dataPrestacao: new Date(2024, 10, 22),
      dataAprovacao: new Date(2024, 10, 24),
    },
  ]);

  // ============================
  // FUNÇÕES AUXILIARES
  // ============================

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status.includes("Aprovado") || status === "Reembolsado") return "default";
    if (status.includes("Aguardando") || status.includes("pendente")) return "secondary";
    if (status.includes("Reprovado")) return "destructive";
    return "outline";
  };

  const getOmieStatusBadge = (status?: "Não enviado" | "Enviado" | "Confirmado") => {
    if (status === "Confirmado") {
      return <Badge variant="default" className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />OMIE OK</Badge>;
    }
    if (status === "Enviado") {
      return <Badge variant="outline" className="border-blue-600 text-blue-600"><RefreshCw className="w-3 h-3 mr-1" />Enviado OMIE</Badge>;
    }
    return <Badge variant="secondary" className="text-muted-foreground"><AlertCircle className="w-3 h-3 mr-1" />Não enviado</Badge>;
  };

  // ============================
  // HANDLERS
  // ============================

  const handleNovaPrevisao = () => {
    if (!previsaoDepartamento || !previsaoValor) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const novaPrevisao: PrevisaoDemanda = {
      id: `prev${previsoes.length + 1}`,
      departamento: previsaoDepartamento,
      valorEstimado: parseFloat(previsaoValor),
      criadoPor: currentUser.name,
      criadoEm: new Date(),
    };

    setPrevisoes([...previsoes, novaPrevisao]);
    toast.success("Previsão de demanda criada com sucesso!");
    setOpenNovaPrevisao(false);
    
    setPrevisaoDepartamento("");
    setPrevisaoValor("");
  };

  const handleNovaSolicitacao = () => {
    if (!solCartaoId || !solValor) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const cartao = cartoes.find(c => c.id === solCartaoId);
    if (!cartao) {
      toast.error("Cartão não encontrado");
      return;
    }

    const novaSolicitacao: SolicitacaoVerba = {
      id: `sol${solicitacoes.length + 1}`,
      data: new Date(),
      solicitante: currentUser.name,
      departamento: cartao.departamento,
      cartaoId: solCartaoId,
      numeroCartao: cartao.numero,
      valorSolicitado: parseFloat(solValor),
      observacao: solObservacao,
      status: "Aprovada",
      temPrestacaoPendente: false,
    };

    setSolicitacoes([...solicitacoes, novaSolicitacao]);
    toast.success("Solicitação de verba criada com sucesso!");
    setOpenNovaSolicitacao(false);

    setSolCartaoId("");
    setSolValor("");
    setSolObservacao("");
  };



  const handleAdicionarLote = () => {
    if (!loteDescricao || !loteValor || !loteDataGasto || !loteCategoria || !loteItemOrcamentario) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (!selectedPrestacao) return;

    const novoLote: LotePrestacao = {
      id: `lot${Date.now()}`,
      item: selectedPrestacao.lotes.length + 1,
      descricao: loteDescricao,
      valor: parseFloat(loteValor),
      dataGasto: loteDataGasto,
      categoria: loteCategoria,
      itemOrcamentario: loteItemOrcamentario,
      comprovante: loteComprovante?.name,
      statusSolicitante: "Submetido",
      statusControladoria: "Aguardando",
    };

    setPrestacoes(prev => prev.map(p => {
      if (p.id === selectedPrestacao.id) {
        const novosLotes = [...p.lotes, novoLote];
        const novoValorPrestado = novosLotes.reduce((acc, l) => acc + l.valor, 0);
        
        return {
          ...p,
          lotes: novosLotes,
          valorPrestado: novoValorPrestado,
          status: "Aguardando controladoria" as const,
        };
      }
      return p;
    }));

    toast.success("Lote adicionado com sucesso!");
    setOpenAdicionarLote(false);

    setLoteDescricao("");
    setLoteValor("");
    setLoteDataGasto(undefined);
    setLoteCategoria("");
    setLoteItemOrcamentario("");
    setLoteComprovante(null);
  };

  const handleAprovarLote = () => {
    if (!selectedLote || !selectedPrestacao) return;

    if (!loteComprovanteCarimbado) {
      toast.error("Anexe o comprovante carimbado");
      return;
    }

    setPrestacoes(prev => prev.map(p => {
      if (p.id === selectedPrestacao.id) {
        const lotesAtualizados = p.lotes.map(l => {
          if (l.id === selectedLote.id) {
            return {
              ...l,
              statusControladoria: "Aprovado" as const,
              comprovanteCarimbado: loteComprovanteCarimbado.name,
              observacaoControladoria: loteObservacaoControladoria,
            };
          }
          return l;
        });

        const novoValorAprovado = lotesAtualizados
          .filter(l => l.statusControladoria === "Aprovado")
          .reduce((acc, l) => acc + l.valor, 0);

        const todosAprovados = lotesAtualizados.every(l => 
          l.statusControladoria === "Aprovado"
        );

        return {
          ...p,
          lotes: lotesAtualizados,
          valorAprovado: novoValorAprovado,
          status: todosAprovados ? "Totalmente aprovado" as const : "Parcialmente aprovado" as const,
          dataAprovacao: todosAprovados ? new Date() : p.dataAprovacao,
        };
      }
      return p;
    }));

    toast.success("Lote aprovado pela Controladoria!");
    setOpenAprovarLote(false);
    setLoteComprovanteCarimbado(null);
    setLoteObservacaoControladoria("");
    setSelectedLote(null);
  };

  const handleReprovarLote = () => {
    if (!selectedLote || !selectedPrestacao) return;

    if (!loteObservacaoControladoria.trim()) {
      toast.error("Informe o motivo da reprovação");
      return;
    }

    setPrestacoes(prev => prev.map(p => {
      if (p.id === selectedPrestacao.id) {
        const lotesAtualizados = p.lotes.map(l => {
          if (l.id === selectedLote.id) {
            return {
              ...l,
              statusControladoria: "Reprovado" as const,
              observacaoControladoria: loteObservacaoControladoria,
            };
          }
          return l;
        });

        return {
          ...p,
          lotes: lotesAtualizados,
        };
      }
      return p;
    }));

    toast.success("Lote reprovado");
    setOpenReprovarLote(false);
    setLoteObservacaoControladoria("");
    setSelectedLote(null);
  };

  const handleSolicitarOmie = () => {
    if (!selectedPrestacao) return;

    setPrestacoes(prev => prev.map(p => {
      if (p.id === selectedPrestacao.id) {
        return {
          ...p,
          statusOmie: "Enviado" as const,
          status: "Aguardando reembolso" as const,
        };
      }
      return p;
    }));

    toast.success("Solicitação de Contas a Pagar enviada para OMIE!");
    setOpenSolicitarOmie(false);
  };

  // PRD 004 - História 5: Confirmar Carga de Verba (Financeiro)
  const handleConfirmarCarga = () => {
    if (!selectedSolicitacaoCarga || !comprovanteCarga) {
      toast.error("Anexe o comprovante de transferência bancária");
      return;
    }

    setSolicitacoes(prev => prev.map(s => {
      if (s.id === selectedSolicitacaoCarga.id) {
        return {
          ...s,
          status: "Carga realizada" as const,
        };
      }
      return s;
    }));

    toast.success(`Carga confirmada! O saldo do cartão foi atualizado e ${selectedSolicitacaoCarga.solicitante} foi notificado.`);
    setOpenConfirmarCarga(false);
    setSelectedSolicitacaoCarga(null);
    setComprovanteCarga(null);
    setObservacoesCarga("");
  };

  // ============================
  // CÁLCULOS DASHBOARD
  // ============================

  const totaisGerais = {
    previstoMes: previsoes.reduce((acc, p) => acc + p.valorEstimado, 0),
    solicitado: solicitacoes.reduce((acc, s) => acc + s.valorSolicitado, 0),
    aprovado: solicitacoes.reduce((acc, s) => acc + (s.valorAprovado || 0), 0),
    prestado: prestacoes.reduce((acc, p) => acc + p.valorPrestado, 0),
    aprovadoPrestacao: prestacoes.reduce((acc, p) => acc + p.valorAprovado, 0),
    aguardandoReembolso: prestacoes
      .filter(p => p.status === "Aguardando reembolso")
      .reduce((acc, p) => acc + p.valorAprovado, 0),
  };

  const isControladoria = hasPermission((role) => 
    ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 'Controladoria Dedicada'].includes(role)
  );

  // PRD 004: Permissões do Financeiro
  const isFinanceiro = currentUser?.role === 'Financeiro';
  const canConfirmCarga = hasPermission((role) => ['Administrador', 'Financeiro'].includes(role));

  // View: Tela de Prestação de Contas
  if (currentView === "prestacao-detalhes" && selectedPrestacao) {
    return (
      <PrestacaoDeContas
        prestacao={selectedPrestacao}
        onVoltar={() => {
          setCurrentView("main");
          setSelectedPrestacao(null);
        }}
        isControladoria={isControladoria}
      />
    );
  }

  // View: Tela de Solicitação de Verba
  if (currentView === "solicitacao-detalhes" && selectedSolicitacao) {
    return (
      <SolicitacaoDeVerba
        solicitacao={selectedSolicitacao}
        onVoltar={() => {
          setCurrentView("main");
          setSelectedSolicitacao(null);
        }}
      />
    );
  }

  // View: Tela Principal
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-foreground">Verbas</h2>
        <p className="text-muted-foreground mt-1">
          Controle Rigoroso de Verbas: Rastreamento de adiantamentos de cartão e Prestação de Contas por Lotes para auditoria e reembolso do projeto.
        </p>
        <p className="text-sm text-muted-foreground mt-2 italic">
          Nota: Este não é o fluxo de pagamento de contratos (cachê/parcelas fixas). Para pagamentos contratuais, acesse a tela "Pagamentos".
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={isFinanceiro ? "grid w-full grid-cols-6" : "grid w-full grid-cols-5"}>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="previsao">Previsão de Demanda</TabsTrigger>
          <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          <TabsTrigger value="prestacoes">Prestações de Contas</TabsTrigger>
          <TabsTrigger value="cartoes">Cartões</TabsTrigger>
          {isFinanceiro && (
            <TabsTrigger value="cargas-pendentes">
              Cargas Pendentes ({solicitacoes.filter(s => s.status === "Aprovada").length})
            </TabsTrigger>
          )}
        </TabsList>

        {/* TAB: VISÃO GERAL */}
        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Previsto (mês)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totaisGerais.previstoMes)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimativa de demanda dos departamentos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Liberado (cartões)</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(totaisGerais.aprovado)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Valor aprovado e carregado nos cartões
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aguardando Reembolso</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totaisGerais.aguardandoReembolso)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Prestações aprovadas pela Controladoria
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rastreamento de Valores (3 pontos de controle)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Solicitante</TableHead>
                        <TableHead className="font-semibold">Cartão</TableHead>
                        <TableHead className="font-semibold">Valor Liberado</TableHead>
                        <TableHead className="font-semibold">Valor Prestado</TableHead>
                        <TableHead className="font-semibold">Valor Aprovado</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prestacoes.map((p, index) => (
                        <TableRow key={p.id} className={index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"}>
                          <TableCell className="font-medium">{p.solicitante}</TableCell>
                          <TableCell className="font-mono text-sm">{p.numeroCartao}</TableCell>
                          <TableCell className="text-blue-600 font-semibold">
                            {formatCurrency(p.valorLiberado)}
                          </TableCell>
                          <TableCell className="text-orange-600 font-semibold">
                            {formatCurrency(p.valorPrestado)}
                          </TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            {formatCurrency(p.valorAprovado)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(p.status)}>
                              {p.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Valor Liberado
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Montante carregado no cartão após aprovação da Controladoria
                  </p>
                </div>
                <div>
                  <p className="font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Valor Prestado
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Soma dos lotes de gastos submetidos pelo solicitante
                  </p>
                </div>
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Valor Aprovado
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Montante aprovado pela Controladoria (passível de reembolso)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: PREVISÃO DE DEMANDA */}
        <TabsContent value="previsao" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Previsões de Demanda de Verba</CardTitle>
                <Button onClick={() => setOpenNovaPrevisao(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Previsão
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Departamento</TableHead>
                        <TableHead className="font-semibold">Valor Estimado</TableHead>
                        <TableHead className="font-semibold">Criado por</TableHead>
                        <TableHead className="font-semibold">Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previsoes.map((prev, index) => (
                        <TableRow key={prev.id} className={index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"}>
                          <TableCell className="font-medium">{prev.departamento}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(prev.valorEstimado)}</TableCell>
                          <TableCell>{prev.criadoPor}</TableCell>
                          <TableCell>{format(prev.criadoEm, "dd/MM/yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: SOLICITAÇÕES */}
        <TabsContent value="solicitacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Solicitações de Verba (Carga no Cartão)</CardTitle>
                <Button onClick={() => setOpenNovaSolicitacao(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Solicitação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Data</TableHead>
                        <TableHead className="font-semibold">Departamento</TableHead>
                        <TableHead className="font-semibold">Solicitante</TableHead>
                        <TableHead className="font-semibold">Cartão</TableHead>
                        <TableHead className="font-semibold">Valor Solicitado</TableHead>
                        <TableHead className="font-semibold">Valor Aprovado</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {solicitacoes.map((sol, index) => (
                        <TableRow key={sol.id} className={index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"}>
                          <TableCell>{format(sol.data, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{sol.departamento}</TableCell>
                          <TableCell>{sol.solicitante}</TableCell>
                          <TableCell className="font-mono text-sm">{sol.numeroCartao}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(sol.valorSolicitado)}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            {sol.valorAprovado ? formatCurrency(sol.valorAprovado) : "—"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(sol.status)}>
                              {sol.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSolicitacao(sol);
                                    setCurrentView("solicitacao-detalhes");
                                  }}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                {sol.status === "Liberado para reembolso" && (
                                  <DropdownMenuItem>
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Processar reembolso
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: PRESTAÇÕES */}
        <TabsContent value="prestacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prestações de Contas (Lotes e Valores)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Departamento</TableHead>
                        <TableHead className="font-semibold">Solicitante</TableHead>
                        <TableHead className="font-semibold">Cartão</TableHead>
                        <TableHead className="font-semibold">Data Liberação</TableHead>
                        <TableHead className="font-semibold">Data Envio</TableHead>
                        <TableHead className="font-semibold">Liberado</TableHead>
                        <TableHead className="font-semibold">Prestado</TableHead>
                        <TableHead className="font-semibold">Aprovado</TableHead>
                        <TableHead className="font-semibold">Lotes</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Reembolso (OMIE)</TableHead>
                        <TableHead className="font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prestacoes.map((prest, index) => (
                        <TableRow key={prest.id} className={index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"}>
                          <TableCell className="font-medium">{prest.departamento}</TableCell>
                          <TableCell>{prest.solicitante}</TableCell>
                          <TableCell className="font-mono text-sm">{prest.numeroCartao}</TableCell>
                          <TableCell>
                            {prest.dataLiberacao ? format(prest.dataLiberacao, "dd/MM/yyyy") : "—"}
                          </TableCell>
                          <TableCell>
                            {prest.dataEnvioPrestacao ? format(prest.dataEnvioPrestacao, "dd/MM/yyyy") : "—"}
                          </TableCell>
                          <TableCell className="text-blue-600 font-semibold">
                            {formatCurrency(prest.valorLiberado)}
                          </TableCell>
                          <TableCell className="text-orange-600 font-semibold">
                            {formatCurrency(prest.valorPrestado)}
                          </TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            {formatCurrency(prest.valorAprovado)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{prest.lotes.length} lotes</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(prest.status)}>
                              {prest.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getOmieStatusBadge(prest.statusOmie)}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedPrestacao(prest);
                                setCurrentView("prestacao-detalhes");
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: CARTÕES */}
        <TabsContent value="cartoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cartões Corporativos Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Número</TableHead>
                        <TableHead className="font-semibold">CPF Vinculado</TableHead>
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Departamento</TableHead>
                        <TableHead className="font-semibold">Limite</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartoes.map((cartao, index) => (
                        <TableRow key={cartao.id} className={index % 2 === 0 ? "bg-background hover:bg-muted/50" : "bg-muted/30 hover:bg-muted/50"}>
                          <TableCell className="font-mono">{cartao.numero}</TableCell>
                          <TableCell>{cartao.cpfVinculado}</TableCell>
                          <TableCell className="font-medium">{cartao.nomeVinculado}</TableCell>
                          <TableCell>{cartao.departamento}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(cartao.limite)}</TableCell>
                          <TableCell>
                            <Badge variant={cartao.status === "Ativo" ? "default" : "destructive"}>
                              {cartao.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: CARGAS PENDENTES (PRD 004 - História 4 e 5) */}
        {isFinanceiro && (
          <TabsContent value="cargas-pendentes" className="space-y-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Tesouraria de Cartões - Cargas Aprovadas
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Solicitações aprovadas aguardando transferência bancária. Realize o PIX/TED e confirme a carga.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-muted/50">
                          <TableHead className="font-semibold">Data Solicitação</TableHead>
                          <TableHead className="font-semibold">Solicitante</TableHead>
                          <TableHead className="font-semibold">Departamento</TableHead>
                          <TableHead className="font-semibold">Cartão</TableHead>
                          <TableHead className="font-semibold text-right">Valor Aprovado</TableHead>
                          <TableHead className="font-semibold">Observação</TableHead>
                          <TableHead className="font-semibold text-center">Ação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {solicitacoes.filter(s => s.status === "Aprovada").length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-200" />
                              <p>Nenhuma carga pendente no momento</p>
                              <p className="text-sm mt-1">Todas as solicitações aprovadas foram carregadas</p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          solicitacoes
                            .filter(s => s.status === "Aprovada")
                            .map((sol, index) => (
                              <TableRow 
                                key={sol.id} 
                                className={`${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-green-50/50 transition-colors`}
                              >
                                <TableCell>
                                  {format(sol.data, "dd/MM/yyyy", { locale: ptBR })}
                                </TableCell>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    {sol.solicitante}
                                  </div>
                                </TableCell>
                                <TableCell>{sol.departamento}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                                    <code className="text-xs">{sol.numeroCartao}</code>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="text-lg text-green-600">
                                    {formatCurrency(sol.valorAprovado || 0)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                                  {sol.observacao}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                      setSelectedSolicitacaoCarga(sol);
                                      setOpenConfirmarCarga(true);
                                    }}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Confirmar Carga
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {solicitacoes.filter(s => s.status === "Aprovada").length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Fluxo de Confirmação de Carga:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                          <li>Acesse seu internet banking</li>
                          <li>Realize a transferência (PIX/TED) para o cartão do solicitante</li>
                          <li>Salve o comprovante da transação (PDF/imagem)</li>
                          <li>Clique em "Confirmar Carga" e faça upload do comprovante</li>
                          <li>O solicitante será notificado automaticamente e o saldo do cartão será atualizado</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Todos os modais e sheet vão aqui - continua no próximo bloco */}
      
      {/* MODAL: Nova Previsão de Demanda */}
      <Dialog open={openNovaPrevisao} onOpenChange={setOpenNovaPrevisao}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-nova-previsao-description">
          <DialogHeader>
            <DialogTitle>Nova Previsão de Demanda</DialogTitle>
            <DialogDescription id="dialog-nova-previsao-description">
              Estime quanto de verba seu departamento precisará. Esta informação alimenta o dashboard gerencial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Departamento <span className="text-destructive">*</span></Label>
              <Select value={previsaoDepartamento} onValueChange={setPrevisaoDepartamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produção">Produção</SelectItem>
                  <SelectItem value="Arte">Arte</SelectItem>
                  <SelectItem value="Direção">Direção</SelectItem>
                  <SelectItem value="Fotografia">Fotografia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Valor Estimado <span className="text-destructive">*</span></Label>
              <Input
                placeholder="R$ 0,00"
                value={previsaoValor}
                onChange={(e) => setPrevisaoValor(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNovaPrevisao(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleNovaPrevisao}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Previsão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Nova Solicitação de Verba */}
      <Dialog open={openNovaSolicitacao} onOpenChange={setOpenNovaSolicitacao}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-nova-solicitacao-description">
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Verba (Carga no Cartão)</DialogTitle>
            <DialogDescription id="dialog-nova-solicitacao-description">
              Solicite carga de verba no cartão corporativo. A alocação do gasto só será feita na Prestação de Contas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Número do Cartão <span className="text-destructive">*</span></Label>
              <Select value={solCartaoId} onValueChange={setSolCartaoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cartão" />
                </SelectTrigger>
                <SelectContent>
                  {cartoes.filter(c => c.status === "Ativo").map((cartao) => (
                    <SelectItem key={cartao.id} value={cartao.id}>
                      {cartao.numero} - {cartao.nomeVinculado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Valor Solicitado <span className="text-destructive">*</span></Label>
              <Input
                placeholder="R$ 0,00"
                value={solValor}
                onChange={(e) => setSolValor(e.target.value)}
              />
            </div>
            <div>
              <Label>Observação</Label>
              <Textarea
                placeholder="Informações adicionais sobre a solicitação..."
                value={solObservacao}
                onChange={(e) => setSolObservacao(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNovaSolicitacao(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleNovaSolicitacao}>
              <Plus className="w-4 h-4 mr-2" />
              Solicitar Verba
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Solicitar OMIE */}
      <Dialog open={openSolicitarOmie} onOpenChange={setOpenSolicitarOmie}>
        <DialogContent aria-describedby="dialog-omie-description">
          <DialogHeader>
            <DialogTitle>Solicitar Reembolso (OMIE)</DialogTitle>
            <DialogDescription id="dialog-omie-description">
              Criar registro de Contas a Pagar no ERP OMIE para reembolso ao solicitante.
            </DialogDescription>
          </DialogHeader>
          {selectedPrestacao && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <p className="text-sm"><strong>Solicitante:</strong> {selectedPrestacao.solicitante}</p>
                <p className="text-sm"><strong>Valor Aprovado:</strong> {formatCurrency(selectedPrestacao.valorAprovado)}</p>
                <p className="text-sm"><strong>Lotes aprovados:</strong> {selectedPrestacao.lotes.filter(l => l.statusControladoria === "Aprovado").length}</p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Esta ação criará um registro de Contas a Pagar no OMIE para reembolsar o solicitante pelo valor aprovado.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSolicitarOmie(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSolicitarOmie}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Enviar para OMIE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Confirmar Carga de Verba (PRD 004 - História 5) */}
      <Dialog open={openConfirmarCarga} onOpenChange={setOpenConfirmarCarga}>
        <DialogContent aria-describedby="dialog-confirmar-carga-description">
          <DialogHeader>
            <DialogTitle>Confirmar Carga de Verba</DialogTitle>
            <DialogDescription id="dialog-confirmar-carga-description">
              Confirme a transferência bancária realizada e anexe o comprovante
            </DialogDescription>
          </DialogHeader>
          
          {selectedSolicitacaoCarga && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">
                    <strong>Solicitante:</strong> {selectedSolicitacaoCarga.solicitante}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">
                    <strong>Cartão:</strong> {selectedSolicitacaoCarga.numeroCartao}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">
                    <strong>Valor Aprovado:</strong> {formatCurrency(selectedSolicitacaoCarga.valorAprovado || 0)}
                  </p>
                </div>
                {selectedSolicitacaoCarga.observacao && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Observação:</strong> {selectedSolicitacaoCarga.observacao}
                  </p>
                )}
              </div>

              <div>
                <Label>Comprovante de Transferência <span className="text-destructive">*</span></Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-2"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setComprovanteCarga(file);
                    }
                  }}
                />
                {comprovanteCarga && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ✓ Arquivo selecionado: {comprovanteCarga.name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos aceitos: PDF, JPG, PNG
                </p>
              </div>

              <div>
                <Label>Observações (opcional)</Label>
                <Textarea
                  placeholder="Informações adicionais sobre a transferência..."
                  value={observacoesCarga}
                  onChange={(e) => setObservacoesCarga(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Ao confirmar:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>O status da solicitação será alterado para "Carga realizada"</li>
                      <li>O saldo do cartão será atualizado no sistema</li>
                      <li>{selectedSolicitacaoCarga.solicitante} receberá notificação automática</li>
                      <li>O comprovante ficará arquivado para auditoria</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setOpenConfirmarCarga(false);
                setComprovanteCarga(null);
                setObservacoesCarga("");
              }}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConfirmarCarga}
              disabled={!comprovanteCarga}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar Carga
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Adicionar Lote */}
      <Dialog open={openAdicionarLote} onOpenChange={setOpenAdicionarLote}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-adicionar-lote-description">
          <DialogHeader>
            <DialogTitle>Adicionar Lote de Gasto</DialogTitle>
            <DialogDescription id="dialog-adicionar-lote-description">
              Detalhe cada gasto realizado com o cartão corporativo. Aqui você vincula o Item Orçamentário.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Descrição do Gasto <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Ex: Locação de câmera RED por 3 dias"
                value={loteDescricao}
                onChange={(e) => setLoteDescricao(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="R$ 0,00"
                  value={loteValor}
                  onChange={(e) => setLoteValor(e.target.value)}
                />
              </div>
              <div>
                <Label>Data do Gasto <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {loteDataGasto ? format(loteDataGasto, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={loteDataGasto}
                      onSelect={setLoteDataGasto}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria <span className="text-destructive">*</span></Label>
                <Select value={loteCategoria} onValueChange={setLoteCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Materiais">Materiais</SelectItem>
                    <SelectItem value="Hospedagem">Hospedagem</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Item Orçamentário <span className="text-destructive">*</span></Label>
                <Select value={loteItemOrcamentario} onValueChange={setLoteItemOrcamentario}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="005.001 - Locação de equipamentos">005.001 - Locação de equipamentos</SelectItem>
                    <SelectItem value="006.003 - Materiais de arte">006.003 - Materiais de arte</SelectItem>
                    <SelectItem value="007.002 - Figurino">007.002 - Figurino</SelectItem>
                    <SelectItem value="010.002 - Transporte">010.002 - Transporte</SelectItem>
                    <SelectItem value="011.001 - Alimentação">011.001 - Alimentação</SelectItem>
                    <SelectItem value="012.004 - Hospedagem">012.004 - Hospedagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Comprovante (NF ou recibo)</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setLoteComprovante(e.target.files?.[0] || null)}
              />
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                O Item Orçamentário é definido AQUI na prestação de contas, não na solicitação inicial. Isso permite flexibilidade para ajustes durante a execução.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdicionarLote(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleAdicionarLote}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Aprovar Lote */}
      <Dialog open={openAprovarLote} onOpenChange={setOpenAprovarLote}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-aprovar-lote-description">
          <DialogHeader>
            <DialogTitle>Aprovar Lote (Controladoria)</DialogTitle>
            <DialogDescription id="dialog-aprovar-lote-description">
              Anexe o comprovante carimbado e aprove o lote. Este valor será somado ao total aprovado.
            </DialogDescription>
          </DialogHeader>
          {selectedLote && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <p className="text-sm"><strong>Descrição:</strong> {selectedLote.descricao}</p>
                <p className="text-sm"><strong>Valor:</strong> {formatCurrency(selectedLote.valor)}</p>
                <p className="text-sm"><strong>Data:</strong> {format(selectedLote.dataGasto, "dd/MM/yyyy", { locale: ptBR })}</p>
                <p className="text-sm"><strong>Item Orçamentário:</strong> {selectedLote.itemOrcamentario}</p>
                {selectedLote.comprovante && (
                  <p className="text-sm"><strong>Comprovante:</strong> {selectedLote.comprovante}</p>
                )}
              </div>

              <div>
                <Label>Comprovante Carimbado <span className="text-destructive">*</span></Label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setLoteComprovanteCarimbado(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Anexe o comprovante com carimbo da Controladoria
                </p>
              </div>

              <div>
                <Label>Observações da Controladoria</Label>
                <Textarea
                  placeholder="Observações adicionais (opcional)..."
                  value={loteObservacaoControladoria}
                  onChange={(e) => setLoteObservacaoControladoria(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-900 dark:text-green-100">
                  Ao aprovar, o valor será adicionado ao "Valor Aprovado" da prestação de contas.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAprovarLote(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleAprovarLote}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprovar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Reprovar Lote */}
      <Dialog open={openReprovarLote} onOpenChange={setOpenReprovarLote}>
        <DialogContent aria-describedby="dialog-reprovar-lote-description">
          <DialogHeader>
            <DialogTitle>Reprovar Lote (Controladoria)</DialogTitle>
            <DialogDescription id="dialog-reprovar-lote-description">
              Informe o motivo da reprovação. O solicitante precisará corrigir e reenviar.
            </DialogDescription>
          </DialogHeader>
          {selectedLote && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <p className="text-sm"><strong>Descrição:</strong> {selectedLote.descricao}</p>
                <p className="text-sm"><strong>Valor:</strong> {formatCurrency(selectedLote.valor)}</p>
              </div>

              <div>
                <Label>Motivo da Reprovação <span className="text-destructive">*</span></Label>
                <Textarea
                  placeholder="Ex: Comprovante ilegível, Data incorreta, etc."
                  value={loteObservacaoControladoria}
                  onChange={(e) => setLoteObservacaoControladoria(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReprovarLote(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReprovarLote}>
              <XCircle className="w-4 h-4 mr-2" />
              Reprovar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nota: Sheet de Prestação de Contas e Modal de Solicitação foram removidos - agora usam telas dedicadas com breadcrumb */}
    </div>
  );
}