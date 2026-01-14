/**
 * MOVIOCA - Painel de Reembolsos de Verba
 * 
 * Tela específica para o perfil Financeiro processar reembolsos de prestação de contas.
 * 
 * Histórias de Usuário (PRD 004):
 * - História 6: Processar "Reembolsos de Verba" aprovados (Lotes de Prestação de Contas)
 * 
 * Regra de Negócio RN-003:
 * - Agrupar despesas de um lote em um único lançamento financeiro
 * - Enviar rateio de centros de custo (Itens Orçamentários) para o OMIE
 * - Caso contrário, gerar lançamentos individuais
 * 
 * Fluxo:
 * 1. CI aprova lote de prestação de contas
 * 2. Lote aparece na fila de "Reembolsos Pendentes"
 * 3. Financeiro visualiza resumo contábil com rateio
 * 4. Financeiro clica em "Gerar Reembolso OMIE"
 * 5. Sistema cria conta a pagar no ERP (Favorecido: Movioca - reposição de caixa)
 * 6. Após confirmação bancária, marca como "Pago"
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
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
} from "../ui/sheet";
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Send,
  AlertCircle,
  FileText,
  Building2,
  RefreshCw,
  Calendar as CalendarIcon,
  Download,
  Filter,
  ChevronDown,
  CreditCard,
  User,
  Banknote,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// ============================================================================
// INTERFACES
// ============================================================================

interface ItemRateio {
  itemOrcamentario: string;
  descricao: string;
  valor: number;
  percentual: number;
}

interface NotaFiscal {
  id: string;
  cnpj: string;
  razaoSocial: string;
  numeroDocumento: string;
  dataCompra: Date;
  descritivo: string;
  valor: number;
  itemOrcamentario: string;
  comprovante?: string;
}

interface LoteReembolso {
  id: string;
  numeroLote: string;
  projeto: string;
  solicitante: string;
  departamento: string;
  valorTotal: number;
  dataAprovacaoCI: Date;
  statusReembolso: "Pendente" | "Enviado OMIE" | "Pago";
  statusOmie?: "Não enviado" | "Enviado" | "Confirmado";
  dataPagamento?: Date;
  observacoes?: string;
  notas: NotaFiscal[];
  rateioContabil: ItemRateio[];
  comprovantePagamento?: string;
}

// ============================================================================
// DADOS MOCK
// ============================================================================

const mockLotes: LoteReembolso[] = [
  {
    id: "R001",
    numeroLote: "Lote #023",
    projeto: "Projeto Alpha",
    solicitante: "Maria Costa",
    departamento: "Arte",
    valorTotal: 3500.00,
    dataAprovacaoCI: new Date(2024, 11, 1),
    statusReembolso: "Pendente",
    statusOmie: "Não enviado",
    notas: [
      {
        id: "NF001",
        cnpj: "12.345.678/0001-90",
        razaoSocial: "Arte Gráfica Ltda",
        numeroDocumento: "NF-12345",
        dataCompra: new Date(2024, 10, 28),
        descritivo: "Material de cenografia",
        valor: 1500.00,
        itemOrcamentario: "004.001 - Cenografia",
        comprovante: "comprovante1.pdf"
      },
      {
        id: "NF002",
        cnpj: "98.765.432/0001-10",
        razaoSocial: "Cores e Tintas SA",
        numeroDocumento: "NF-54321",
        dataCompra: new Date(2024, 10, 29),
        descritivo: "Tintas especiais",
        valor: 2000.00,
        itemOrcamentario: "004.002 - Pintura",
        comprovante: "comprovante2.pdf"
      }
    ],
    rateioContabil: [
      {
        itemOrcamentario: "004.001",
        descricao: "Cenografia",
        valor: 1500.00,
        percentual: 42.86
      },
      {
        itemOrcamentario: "004.002",
        descricao: "Pintura",
        valor: 2000.00,
        percentual: 57.14
      }
    ],
    observacoes: "Reembolso referente a compras emergenciais de arte"
  },
  {
    id: "R002",
    numeroLote: "Lote #024",
    projeto: "Projeto Beta",
    solicitante: "João Santos",
    departamento: "Transporte",
    valorTotal: 2800.00,
    dataAprovacaoCI: new Date(2024, 11, 2),
    statusReembolso: "Enviado OMIE",
    statusOmie: "Enviado",
    notas: [
      {
        id: "NF003",
        cnpj: "11.222.333/0001-44",
        razaoSocial: "Transporte Rápido Ltda",
        numeroDocumento: "NF-98765",
        dataCompra: new Date(2024, 10, 30),
        descritivo: "Frete de equipamentos",
        valor: 1800.00,
        itemOrcamentario: "008.001 - Transporte de Equipamentos",
      },
      {
        id: "NF004",
        cnpj: "22.333.444/0001-55",
        razaoSocial: "Combustíveis Star",
        numeroDocumento: "NF-11111",
        dataCompra: new Date(2024, 10, 30),
        descritivo: "Combustível para vans",
        valor: 1000.00,
        itemOrcamentario: "008.002 - Combustível",
      }
    ],
    rateioContabil: [
      {
        itemOrcamentario: "008.001",
        descricao: "Transporte de Equipamentos",
        valor: 1800.00,
        percentual: 64.29
      },
      {
        itemOrcamentario: "008.002",
        descricao: "Combustível",
        valor: 1000.00,
        percentual: 35.71
      }
    ]
  },
  {
    id: "R003",
    numeroLote: "Lote #019",
    projeto: "Projeto Gama",
    solicitante: "Paula Oliveira",
    departamento: "Alimentação",
    valorTotal: 5200.00,
    dataAprovacaoCI: new Date(2024, 10, 25),
    statusReembolso: "Pago",
    statusOmie: "Confirmado",
    dataPagamento: new Date(2024, 10, 28),
    notas: [
      {
        id: "NF005",
        cnpj: "33.444.555/0001-66",
        razaoSocial: "Buffet Premium",
        numeroDocumento: "NF-77777",
        dataCompra: new Date(2024, 10, 22),
        descritivo: "Alimentação equipe - 3 dias",
        valor: 5200.00,
        itemOrcamentario: "009.001 - Alimentação",
      }
    ],
    rateioContabil: [
      {
        itemOrcamentario: "009.001",
        descricao: "Alimentação",
        valor: 5200.00,
        percentual: 100
      }
    ],
    comprovantePagamento: "comprovante_reembolso_019.pdf"
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function PainelReembolsos() {
  const { currentUser, hasPermission } = useAuth();

  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pendentes");
  const [lotes, setLotes] = useState<LoteReembolso[]>(mockLotes);
  const [selectedLote, setSelectedLote] = useState<LoteReembolso | null>(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [modalGerarOmie, setModalGerarOmie] = useState(false);
  const [modalConfirmarOmie, setModalConfirmarOmie] = useState(false);
  const [modalRegistrarPagamento, setModalRegistrarPagamento] = useState(false);
  const [dataPagamento, setDataPagamento] = useState<Date | undefined>(undefined);
  const [comprovantePagamento, setComprovantePagamento] = useState("");
  const [observacoesPagamento, setObservacoesPagamento] = useState("");

  // Permissões
  const canProcessReembolsos = hasPermission((role) => 
    ['Administrador', 'Financeiro'].includes(role)
  );

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleGerarOmie = () => {
    if (!selectedLote) return;

    // Simula envio para OMIE
    setLotes(lotes.map(l => 
      l.id === selectedLote.id 
        ? { 
            ...l, 
            statusReembolso: "Enviado OMIE" as const,
            statusOmie: "Enviado" as const
          }
        : l
    ));

    toast.success("Reembolso enviado para o OMIE com sucesso!", {
      description: `${selectedLote.numeroLote} - ${selectedLote.projeto}`
    });

    setModalGerarOmie(false);
    setSelectedLote(null);
    setMostrarDetalhes(false);
  };

  const handleConfirmarOmie = () => {
    if (!selectedLote) return;

    setLotes(lotes.map(l => 
      l.id === selectedLote.id 
        ? { ...l, statusOmie: "Confirmado" as const }
        : l
    ));

    toast.success("Integração OMIE confirmada!");
    setModalConfirmarOmie(false);
  };

  const handleRegistrarPagamento = () => {
    if (!selectedLote || !dataPagamento || !comprovantePagamento) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLotes(lotes.map(l => 
      l.id === selectedLote.id 
        ? { 
            ...l, 
            statusReembolso: "Pago" as const,
            dataPagamento,
            comprovantePagamento,
            observacoes: observacoesPagamento || l.observacoes
          }
        : l
    ));

    toast.success("Pagamento de reembolso registrado com sucesso!");
    
    setModalRegistrarPagamento(false);
    setSelectedLote(null);
    setMostrarDetalhes(false);
    setDataPagamento(undefined);
    setComprovantePagamento("");
    setObservacoesPagamento("");
  };

  const handleVisualizarDetalhes = (lote: LoteReembolso) => {
    setSelectedLote(lote);
    setMostrarDetalhes(true);
  };

  // ============================================================================
  // FILTROS
  // ============================================================================

  const lotesFiltrados = lotes.filter(lote => {
    const matchSearch = 
      lote.numeroLote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lote.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lote.solicitante.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTab = 
      (activeTab === "pendentes" && lote.statusReembolso === "Pendente") ||
      (activeTab === "enviados" && lote.statusReembolso === "Enviado OMIE") ||
      (activeTab === "pagos" && lote.statusReembolso === "Pago") ||
      activeTab === "todos";

    return matchSearch && matchTab;
  });

  // ============================================================================
  // CÁLCULOS
  // ============================================================================

  const totalPendente = lotes
    .filter(l => l.statusReembolso === "Pendente")
    .reduce((acc, l) => acc + l.valorTotal, 0);

  const totalEnviado = lotes
    .filter(l => l.statusReembolso === "Enviado OMIE")
    .reduce((acc, l) => acc + l.valorTotal, 0);

  const totalPagoMes = lotes
    .filter(l => l.statusReembolso === "Pago" && l.dataPagamento)
    .reduce((acc, l) => acc + l.valorTotal, 0);

  // ============================================================================
  // UTILITÁRIOS
  // ============================================================================

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
          <Clock className="w-3 h-3 mr-1" />
          Pendente
        </Badge>;
      case "Enviado OMIE":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          <RefreshCw className="w-3 h-3 mr-1" />
          Enviado OMIE
        </Badge>;
      case "Pago":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Pago
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusOmieBadge = (statusOmie?: string) => {
    if (!statusOmie) return null;

    switch (statusOmie) {
      case "Não enviado":
        return <Badge variant="secondary" className="text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          Não enviado
        </Badge>;
      case "Enviado":
        return <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
          <RefreshCw className="w-3 h-3 mr-1" />
          Enviado
        </Badge>;
      case "Confirmado":
        return <Badge variant="outline" className="text-xs border-green-300 text-green-700">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Confirmado
        </Badge>;
      default:
        return null;
    }
  };

  // ============================================================================
  // RENDER: SHEET DE DETALHES
  // ============================================================================

  if (mostrarDetalhes && selectedLote) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setMostrarDetalhes(false);
              setSelectedLote(null);
            }}
          >
            ← Voltar para lista
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl text-foreground">{selectedLote.numeroLote}</h2>
              <p className="text-muted-foreground mt-1">
                Detalhes do reembolso de prestação de contas
              </p>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(selectedLote.statusReembolso)}
              {getStatusOmieBadge(selectedLote.statusOmie)}
            </div>
          </div>

          {/* Informações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações do Reembolso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label className="text-muted-foreground">Projeto</Label>
                  <p className="mt-1">{selectedLote.projeto}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Solicitante</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {selectedLote.solicitante}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Departamento</Label>
                  <p className="mt-1">{selectedLote.departamento}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Valor Total</Label>
                  <p className="mt-1 text-lg">
                    R$ {selectedLote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Data Aprovação CI</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    {format(selectedLote.dataAprovacaoCI, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
                {selectedLote.dataPagamento && (
                  <div>
                    <Label className="text-muted-foreground">Data Pagamento</Label>
                    <p className="mt-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {format(selectedLote.dataPagamento, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                )}
              </div>

              {selectedLote.observacoes && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <Label className="text-muted-foreground">Observações</Label>
                  <p className="mt-1 text-sm">{selectedLote.observacoes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumo Contábil - Rateio */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Resumo Contábil - Rateio por Item Orçamentário
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Classificação de custos para envio ao OMIE (RN-003)
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Orçamentário</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Percentual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedLote.rateioContabil.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {item.itemOrcamentario}
                        </code>
                      </TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell className="text-right">
                        R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {item.percentual.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2}>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>
                        R$ {selectedLote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </strong>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>100%</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notas Fiscais */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Fiscais Comprovadas ({selectedLote.notas.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Descritivo</TableHead>
                    <TableHead>Item Orçamentário</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Comprovante</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedLote.notas.map((nota) => (
                    <TableRow key={nota.id}>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {nota.numeroDocumento}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{nota.razaoSocial}</p>
                          <p className="text-xs text-muted-foreground">{nota.cnpj}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{nota.descritivo}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-primary/10 px-2 py-1 rounded">
                          {nota.itemOrcamentario}
                        </code>
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        {nota.comprovante ? (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Ações */}
          {canProcessReembolsos && (
            <Card>
              <CardHeader>
                <CardTitle>Ações de Processamento</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3">
                {selectedLote.statusReembolso === "Pendente" && (
                  <Button 
                    onClick={() => setModalGerarOmie(true)}
                    className="bg-primary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Gerar Reembolso OMIE
                  </Button>
                )}

                {selectedLote.statusReembolso === "Enviado OMIE" && 
                 selectedLote.statusOmie === "Enviado" && (
                  <Button 
                    onClick={() => setModalConfirmarOmie(true)}
                    variant="outline"
                    className="border-blue-300 text-blue-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmar OMIE
                  </Button>
                )}

                {selectedLote.statusReembolso === "Enviado OMIE" && 
                 selectedLote.statusOmie === "Confirmado" && (
                  <Button 
                    onClick={() => setModalRegistrarPagamento(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Banknote className="w-4 h-4 mr-2" />
                    Registrar Pagamento
                  </Button>
                )}

                {selectedLote.comprovantePagamento && (
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Comprovante
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modais */}
        <Dialog open={modalGerarOmie} onOpenChange={setModalGerarOmie}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerar Reembolso no OMIE</DialogTitle>
              <DialogDescription>
                Confirme o envio deste reembolso para o ERP OMIE
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Este reembolso será criado como uma <strong>Conta a Pagar</strong> no OMIE:
                </p>
                <ul className="mt-2 ml-6 text-sm text-blue-800 space-y-1">
                  <li>• <strong>Favorecido:</strong> Movioca (reposição de caixa)</li>
                  <li>• <strong>Valor:</strong> R$ {selectedLote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</li>
                  <li>• <strong>Rateio:</strong> {selectedLote.rateioContabil.length} itens orçamentários</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm text-muted-foreground">Resumo do Rateio</Label>
                <div className="mt-2 space-y-1">
                  {selectedLote.rateioContabil.map((item, index) => (
                    <div key={index} className="text-sm flex justify-between">
                      <span>{item.itemOrcamentario} - {item.descricao}</span>
                      <span>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setModalGerarOmie(false)}>
                Cancelar
              </Button>
              <Button onClick={handleGerarOmie} className="bg-primary">
                <Send className="w-4 h-4 mr-2" />
                Confirmar e Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={modalConfirmarOmie} onOpenChange={setModalConfirmarOmie}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Integração OMIE</DialogTitle>
              <DialogDescription>
                Confirme que o reembolso foi criado corretamente no ERP
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Certifique-se de que o lançamento foi criado corretamente no OMIE antes de confirmar.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setModalConfirmarOmie(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmarOmie} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirmar Integração
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={modalRegistrarPagamento} onOpenChange={setModalRegistrarPagamento}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Pagamento de Reembolso</DialogTitle>
              <DialogDescription>
                Confirme a execução do pagamento bancário deste reembolso
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Data do Pagamento <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left mt-2"
                    >
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
                <Label>Comprovante de Pagamento <span className="text-destructive">*</span></Label>
                <Input
                  type="file"
                  className="mt-2"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setComprovantePagamento(file.name);
                    }
                  }}
                />
                {comprovantePagamento && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Arquivo: {comprovantePagamento}
                  </p>
                )}
              </div>

              <div>
                <Label>Observações (opcional)</Label>
                <Textarea
                  placeholder="Informações adicionais sobre o pagamento..."
                  value={observacoesPagamento}
                  onChange={(e) => setObservacoesPagamento(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Ao confirmar, o status será alterado para <strong>"Pago"</strong> e o caixa da empresa será recomposto.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setModalRegistrarPagamento(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRegistrarPagamento} className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirmar e Marcar como Pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ============================================================================
  // RENDER: LISTA PRINCIPAL
  // ============================================================================

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-foreground">Reembolsos de Verba</h2>
            <p className="text-muted-foreground mt-1">
              Processamento de reembolsos de prestação de contas aprovados
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes de Envio</p>
                <p className="text-2xl mt-2">
                  R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lotes.filter(l => l.statusReembolso === "Pendente").length} lote(s)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enviados OMIE</p>
                <p className="text-2xl mt-2">
                  R$ {totalEnviado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lotes.filter(l => l.statusReembolso === "Enviado OMIE").length} lote(s)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pagos no Mês</p>
                <p className="text-2xl mt-2">
                  R$ {totalPagoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lotes.filter(l => l.statusReembolso === "Pago").length} lote(s)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por lote, projeto ou solicitante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs e Tabela */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendentes">
            Pendentes ({lotes.filter(l => l.statusReembolso === "Pendente").length})
          </TabsTrigger>
          <TabsTrigger value="enviados">
            Enviados OMIE ({lotes.filter(l => l.statusReembolso === "Enviado OMIE").length})
          </TabsTrigger>
          <TabsTrigger value="pagos">
            Pagos ({lotes.filter(l => l.statusReembolso === "Pago").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                    <TableHead>Data Aprovação CI</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>OMIE</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lotesFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        Nenhum reembolso encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    lotesFiltrados.map((lote) => (
                      <TableRow key={lote.id}>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {lote.numeroLote}
                          </code>
                        </TableCell>
                        <TableCell>{lote.projeto}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {lote.solicitante}
                          </div>
                        </TableCell>
                        <TableCell>{lote.departamento}</TableCell>
                        <TableCell className="text-right">
                          R$ {lote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          {format(lote.dataAprovacaoCI, "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>{getStatusBadge(lote.statusReembolso)}</TableCell>
                        <TableCell>{getStatusOmieBadge(lote.statusOmie)}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVisualizarDetalhes(lote)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}