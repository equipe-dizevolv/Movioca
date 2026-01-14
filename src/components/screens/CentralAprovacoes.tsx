/**
 * MOVIOCA - Central de Aprovações (Controladoria Interna)
 * 
 * Tela: "Central de Gestão de Pagamentos"
 * Funcionalidades:
 * - Fila de trabalho com abas de pipeline
 * - Filtros por projeto, vencimento, fornecedor
 * - Ação de análise que abre a Mesa de Análise (Split View)
 * 
 * PRD 003 - Seção 3.1
 * História 1: Visualizar Fila de Pagamentos Pendentes consolidada
 */

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  FileText,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  FileCheck,
  XCircle,
  Filter,
} from "lucide-react";
import { format, addDays, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

type StatusWorkflow = "Aguardando NF" | "Análise CD" | "Análise CI" | "Liberado Financeiro" | "Pago";

interface Pagamento {
  id: string;
  fornecedor: string;
  projeto: string;
  valor: number;
  vencimento: Date;
  statusWorkflow: StatusWorkflow;
  temAlerta: boolean;
  motivoAlerta?: string;
  numeroNF?: string;
  dataCriacao: Date;
}

interface CentralAprovacoesProps {
  onNavigate?: (screen: string, pagamentoId?: string) => void;
  onAnalisar?: (pagamentoId: string) => void;
}

export default function CentralAprovacoes({ onNavigate, onAnalisar }: CentralAprovacoesProps) {
  const { currentUser } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState<string>("analise-ci");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroProjeto, setFiltroProjeto] = useState<string>("todos");
  const [filtroVencimento, setFiltroVencimento] = useState<string>("todos");

  const hoje = startOfDay(new Date());

  // Mock Data
  const todosPagamentos: Pagamento[] = [
    // Aguardando NF
    {
      id: "pag-001",
      fornecedor: "Equipamentos Cinema Pro",
      projeto: "Série Documentário - História",
      valor: 18000,
      vencimento: addDays(hoje, 10),
      statusWorkflow: "Aguardando NF",
      temAlerta: false,
      dataCriacao: addDays(hoje, -5)
    },
    {
      id: "pag-002",
      fornecedor: "Estúdio de Som Dolby",
      projeto: "Campanha Publicitária - Marca X",
      valor: 12500,
      vencimento: addDays(hoje, 12),
      statusWorkflow: "Aguardando NF",
      temAlerta: false,
      dataCriacao: addDays(hoje, -3)
    },

    // Análise CD
    {
      id: "pag-003",
      fornecedor: "Produtora Criativa ABC",
      projeto: "Filme Institucional",
      valor: 25000,
      vencimento: addDays(hoje, 7),
      statusWorkflow: "Análise CD",
      temAlerta: false,
      numeroNF: "NF-45678",
      dataCriacao: addDays(hoje, -2)
    },
    {
      id: "pag-004",
      fornecedor: "Iluminação Total LTDA",
      projeto: "Série Documentário - História",
      valor: 9800,
      vencimento: addDays(hoje, 8),
      statusWorkflow: "Análise CD",
      temAlerta: false,
      numeroNF: "NF-45679",
      dataCriacao: addDays(hoje, -1)
    },

    // Análise CI (Minha Fila)
    {
      id: "pag-005",
      fornecedor: "Locadora XYZ Equipamentos",
      projeto: "Série Documentário - História",
      valor: 15000,
      vencimento: hoje,
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vence hoje",
      numeroNF: "NF-12345",
      dataCriacao: addDays(hoje, -10)
    },
    {
      id: "pag-006",
      fornecedor: "Estúdio de Áudio Premium",
      projeto: "Campanha Publicitária - Marca X",
      valor: 8500,
      vencimento: hoje,
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vence hoje",
      numeroNF: "NF-12346",
      dataCriacao: addDays(hoje, -8)
    },
    {
      id: "pag-007",
      fornecedor: "Produtora Criativa LTDA",
      projeto: "Filme Institucional",
      valor: 22000,
      vencimento: addDays(hoje, 1),
      statusWorkflow: "Análise CI",
      temAlerta: false,
      numeroNF: "NF-12347",
      dataCriacao: addDays(hoje, -7)
    },
    {
      id: "pag-008",
      fornecedor: "Transportes Rápidos SP",
      projeto: "Série Documentário - História",
      valor: 3200,
      vencimento: addDays(hoje, 2),
      statusWorkflow: "Análise CI",
      temAlerta: false,
      numeroNF: "NF-12348",
      dataCriacao: addDays(hoje, -6)
    },
    {
      id: "pag-009",
      fornecedor: "Catering & Alimentação Pro",
      projeto: "Campanha Publicitária - Marca X",
      valor: 4800,
      vencimento: addDays(hoje, 3),
      statusWorkflow: "Análise CI",
      temAlerta: false,
      numeroNF: "NF-12349",
      dataCriacao: addDays(hoje, -5)
    },
    {
      id: "pag-010",
      fornecedor: "Cenografia & Arte Total",
      projeto: "Filme Institucional",
      valor: 16500,
      vencimento: addDays(hoje, -2),
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vencido há 2 dias",
      numeroNF: "NF-12350",
      dataCriacao: addDays(hoje, -15)
    },

    // Liberado Financeiro
    {
      id: "pag-011",
      fornecedor: "Locadora ABC Equipamentos",
      projeto: "Série Documentário - História",
      valor: 5500,
      vencimento: addDays(hoje, 5),
      statusWorkflow: "Liberado Financeiro",
      temAlerta: false,
      numeroNF: "NF-11001",
      dataCriacao: addDays(hoje, -12)
    },
    {
      id: "pag-012",
      fornecedor: "Pós-Produção Elite",
      projeto: "Campanha Publicitária - Marca X",
      valor: 28000,
      vencimento: addDays(hoje, 6),
      statusWorkflow: "Liberado Financeiro",
      temAlerta: false,
      numeroNF: "NF-11002",
      dataCriacao: addDays(hoje, -11)
    },

    // Pago
    {
      id: "pag-013",
      fornecedor: "Estúdio de Gravação Sound",
      projeto: "Filme Institucional",
      valor: 12000,
      vencimento: addDays(hoje, -5),
      statusWorkflow: "Pago",
      temAlerta: false,
      numeroNF: "NF-10001",
      dataCriacao: addDays(hoje, -20)
    },
    {
      id: "pag-014",
      fornecedor: "Fotografia Profissional Pro",
      projeto: "Campanha Publicitária - Marca X",
      valor: 7200,
      vencimento: addDays(hoje, -3),
      statusWorkflow: "Pago",
      temAlerta: false,
      numeroNF: "NF-10002",
      dataCriacao: addDays(hoje, -18)
    },
  ];

  // Filtrar pagamentos por aba
  const getPagamentosPorStatus = (status: StatusWorkflow) => {
    return todosPagamentos.filter(p => p.statusWorkflow === status);
  };

  // Aplicar filtros
  const aplicarFiltros = (pagamentos: Pagamento[]) => {
    let resultado = [...pagamentos];

    // Filtro de busca (fornecedor ou projeto)
    if (searchTerm) {
      resultado = resultado.filter(p =>
        p.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.projeto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de projeto
    if (filtroProjeto !== "todos") {
      resultado = resultado.filter(p => p.projeto === filtroProjeto);
    }

    // Filtro de vencimento
    if (filtroVencimento !== "todos") {
      const amanha = addDays(hoje, 1);
      const fimSemana = addDays(hoje, 7);

      switch (filtroVencimento) {
        case "hoje":
          resultado = resultado.filter(p => 
            format(p.vencimento, "yyyy-MM-dd") === format(hoje, "yyyy-MM-dd")
          );
          break;
        case "amanha":
          resultado = resultado.filter(p => 
            format(p.vencimento, "yyyy-MM-dd") === format(amanha, "yyyy-MM-dd")
          );
          break;
        case "esta-semana":
          resultado = resultado.filter(p => 
            p.vencimento >= hoje && p.vencimento <= fimSemana
          );
          break;
      }
    }

    // Ordenar por vencimento (ascendente)
    resultado.sort((a, b) => a.vencimento.getTime() - b.vencimento.getTime());

    return resultado;
  };

  // Obter lista de projetos únicos
  const projetos = Array.from(new Set(todosPagamentos.map(p => p.projeto)));

  // Handler para análise
  const handleAnalisar = (pagamentoId: string) => {
    if (onAnalisar) {
      onAnalisar(pagamentoId);
    } else {
      toast.info("Abrindo Mesa de Análise...");
      // Simular navegação
      if (onNavigate) {
        onNavigate("Mesa de Análise", pagamentoId);
      }
    }
  };

  // Renderizar badge de status
  const renderBadgeStatus = (status: StatusWorkflow) => {
    switch (status) {
      case "Aguardando NF":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700"><Clock className="w-3 h-3 mr-1" />Aguardando NF</Badge>;
      case "Análise CD":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700"><FileCheck className="w-3 h-3 mr-1" />CD</Badge>;
      case "Análise CI":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700"><FileCheck className="w-3 h-3 mr-1" />CI</Badge>;
      case "Liberado Financeiro":
        return <Badge variant="secondary" className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Liberado</Badge>;
      case "Pago":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3 mr-1" />Pago</Badge>;
    }
  };

  // Contar por aba
  const countAguardandoNF = getPagamentosPorStatus("Aguardando NF").length;
  const countAnaliseCD = getPagamentosPorStatus("Análise CD").length;
  const countAnaliseCI = getPagamentosPorStatus("Análise CI").length;
  const countLiberado = getPagamentosPorStatus("Liberado Financeiro").length;
  const countPago = getPagamentosPorStatus("Pago").length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Central de Aprovações</h2>
        <p className="text-muted-foreground mt-1">
          Fila de trabalho e gestão de pagamentos - Pipeline completo
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por fornecedor ou projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filtro Projeto */}
            <Select value={filtroProjeto} onValueChange={setFiltroProjeto}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os Projetos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Projetos</SelectItem>
                {projetos.map(proj => (
                  <SelectItem key={proj} value={proj}>{proj}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro Vencimento */}
            <Select value={filtroVencimento} onValueChange={setFiltroVencimento}>
              <SelectTrigger>
                <SelectValue placeholder="Vencimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="amanha">Amanhã</SelectItem>
                <SelectItem value="esta-semana">Esta Semana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Abas de Pipeline */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="aguardando-nf" className="relative">
            Aguardando NF
            {countAguardandoNF > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {countAguardandoNF}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analise-cd" className="relative">
            Análise CD
            {countAnaliseCD > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {countAnaliseCD}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analise-ci" className="relative">
            Análise CI
            {countAnaliseCI > 0 && (
              <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {countAnaliseCI}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="liberado" className="relative">
            Liberado
            {countLiberado > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {countLiberado}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pago">
            Pago
          </TabsTrigger>
        </TabsList>

        {/* Aba: Aguardando NF */}
        <TabsContent value="aguardando-nf">
          <Card>
            <CardContent className="pt-6">
              {aplicarFiltros(getPagamentosPorStatus("Aguardando NF")).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Nenhum pagamento aguardando nota fiscal</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Vencimento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aplicarFiltros(getPagamentosPorStatus("Aguardando NF")).map(pagamento => (
                      <TableRow key={pagamento.id}>
                        <TableCell>{format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell className="font-medium">{pagamento.fornecedor}</TableCell>
                        <TableCell>{pagamento.projeto}</TableCell>
                        <TableCell className="text-right">R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>{renderBadgeStatus(pagamento.statusWorkflow)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Análise CD */}
        <TabsContent value="analise-cd">
          <Card>
            <CardContent className="pt-6">
              {aplicarFiltros(getPagamentosPorStatus("Análise CD")).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-300" />
                  <p className="text-sm">Nenhum pagamento em análise pela Controladoria Dedicada</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Vencimento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aplicarFiltros(getPagamentosPorStatus("Análise CD")).map(pagamento => (
                      <TableRow key={pagamento.id}>
                        <TableCell>{format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell className="font-medium">{pagamento.fornecedor}</TableCell>
                        <TableCell>{pagamento.projeto}</TableCell>
                        <TableCell>{pagamento.numeroNF || "-"}</TableCell>
                        <TableCell className="text-right">R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>{renderBadgeStatus(pagamento.statusWorkflow)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Análise CI (Minha Fila) */}
        <TabsContent value="analise-ci">
          <Card>
            <CardContent className="pt-6">
              {aplicarFiltros(getPagamentosPorStatus("Análise CI")).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-300" />
                  <p className="text-sm">Parabéns! Sua fila de aprovação está zerada.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Vencimento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aplicarFiltros(getPagamentosPorStatus("Análise CI")).map(pagamento => (
                      <TableRow key={pagamento.id} className={pagamento.temAlerta ? "bg-red-50/50" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                            {pagamento.temAlerta && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{pagamento.fornecedor}</TableCell>
                        <TableCell>{pagamento.projeto}</TableCell>
                        <TableCell>{pagamento.numeroNF || "-"}</TableCell>
                        <TableCell className="text-right">R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {renderBadgeStatus(pagamento.statusWorkflow)}
                            {pagamento.temAlerta && (
                              <Badge variant="destructive" className="text-xs">
                                {pagamento.motivoAlerta}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-2"
                            onClick={() => handleAnalisar(pagamento.id)}
                          >
                            <FileCheck className="w-4 h-4" />
                            Analisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Liberado Financeiro */}
        <TabsContent value="liberado">
          <Card>
            <CardContent className="pt-6">
              {aplicarFiltros(getPagamentosPorStatus("Liberado Financeiro")).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Nenhum pagamento liberado aguardando execução</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Vencimento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aplicarFiltros(getPagamentosPorStatus("Liberado Financeiro")).map(pagamento => (
                      <TableRow key={pagamento.id}>
                        <TableCell>{format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell className="font-medium">{pagamento.fornecedor}</TableCell>
                        <TableCell>{pagamento.projeto}</TableCell>
                        <TableCell>{pagamento.numeroNF || "-"}</TableCell>
                        <TableCell className="text-right">R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>{renderBadgeStatus(pagamento.statusWorkflow)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Pago */}
        <TabsContent value="pago">
          <Card>
            <CardContent className="pt-6">
              {aplicarFiltros(getPagamentosPorStatus("Pago")).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Nenhum histórico de pagamentos</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Vencimento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aplicarFiltros(getPagamentosPorStatus("Pago")).map(pagamento => (
                      <TableRow key={pagamento.id}>
                        <TableCell>{format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell className="font-medium">{pagamento.fornecedor}</TableCell>
                        <TableCell>{pagamento.projeto}</TableCell>
                        <TableCell>{pagamento.numeroNF || "-"}</TableCell>
                        <TableCell className="text-right">R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell>{renderBadgeStatus(pagamento.statusWorkflow)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}