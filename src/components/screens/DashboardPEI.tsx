import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AlertCircle, TrendingUp, Briefcase, DollarSign, Search, Plus } from "lucide-react";
import { useState } from "react";

interface DashboardPEIProps {
  onNavigate: (screen: string, projectId?: string) => void;
}

interface ProjetoAtivo {
  id: string;
  nome: string;
  codigo: string;
  status: string;
  orcamentoAprovado: number;
  orcamentoLiberado: number;
  comprometido: number;
  realizado: number;
  contingencia: number;
  percentualExecutado: number;
  temDesvio: boolean;
}

export default function DashboardPEI({ onNavigate }: DashboardPEIProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Projetos ativos da PEI
  const projetosAtivos: ProjetoAtivo[] = [
    {
      id: "proj-001",
      nome: "Série Documentário - História",
      codigo: "PROJ-001",
      status: "Prod",
      orcamentoAprovado: 1500000,
      orcamentoLiberado: 1400000,
      comprometido: 950000,
      realizado: 620000,
      contingencia: 100000,
      percentualExecutado: 68,
      temDesvio: false,
    },
    {
      id: "proj-002",
      nome: "Longa-metragem - Drama",
      codigo: "PROJ-002",
      status: "Pré",
      orcamentoAprovado: 2500000,
      orcamentoLiberado: 2300000,
      comprometido: 1800000,
      realizado: 1200000,
      contingencia: 200000,
      percentualExecutado: 78,
      temDesvio: true, // Realizado + Comprometido > Liberado
    },
    {
      id: "proj-003",
      nome: "Curta-metragem - Experimental",
      codigo: "PROJ-003",
      status: "Pós",
      orcamentoAprovado: 500000,
      orcamentoLiberado: 480000,
      comprometido: 280000,
      realizado: 150000,
      contingencia: 20000,
      percentualExecutado: 56,
      temDesvio: false,
    },
    {
      id: "proj-004",
      nome: "Websérie - Comédia",
      codigo: "PROJ-004",
      status: "Prod",
      orcamentoAprovado: 800000,
      orcamentoLiberado: 750000,
      comprometido: 520000,
      realizado: 380000,
      contingencia: 50000,
      percentualExecutado: 69,
      temDesvio: false,
    },
    {
      id: "proj-005",
      nome: "Documentário - Meio Ambiente",
      codigo: "PROJ-005",
      status: "Pré",
      orcamentoAprovado: 1200000,
      orcamentoLiberado: 1150000,
      comprometido: 850000,
      realizado: 420000,
      contingencia: 50000,
      percentualExecutado: 74,
      temDesvio: false,
    },
  ];

  // Cálculos globais
  const totaisGlobais = projetosAtivos.reduce(
    (acc, proj) => ({
      projetosEmProducao: acc.projetosEmProducao + (proj.status === "Prod" ? 1 : 0),
      totalComprometido: acc.totalComprometido + proj.comprometido,
      totalContingencia: acc.totalContingencia + proj.contingencia,
      totalAprovado: acc.totalAprovado + proj.orcamentoAprovado,
    }),
    {
      projetosEmProducao: 0,
      totalComprometido: 0,
      totalContingencia: 0,
      totalAprovado: 0,
    }
  );

  const percentualContingenciaGlobal = totaisGlobais.totalAprovado > 0
    ? (totaisGlobais.totalContingencia / totaisGlobais.totalAprovado) * 100
    : 0;

  // Filtro de busca
  const projetosFiltrados = projetosAtivos.filter((proj) =>
    proj.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pré":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Prod":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Pós":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const handleIrParaOrcamento = (projectId: string) => {
    if (onNavigate) {
      onNavigate("Orçamento", projectId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Visão Geral de Produção</h2>
          <p className="text-muted-foreground mt-1">
            Monitoramento consolidado de todos os projetos ativos
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => onNavigate("Projetos")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Cards de Resumo Global */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Projetos em Produção */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Projetos em Produção</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fase de filmagem/captação ativa
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl text-blue-600 dark:text-blue-400">
                {totaisGlobais.projetosEmProducao}
              </span>
              <span className="text-sm text-muted-foreground">
                de {projetosAtivos.length} projetos ativos
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Total Comprometido */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-base">Total Comprometido</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Soma global de todos os projetos
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl text-orange-600 dark:text-orange-400">
                {formatCurrency(totaisGlobais.totalComprometido)}
              </p>
              <p className="text-xs text-muted-foreground">
                Contratos formalizados aguardando pagamento
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Saldo de Contingência Disponível */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-base">Contingência Disponível</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Reserva financeira global
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl text-purple-600 dark:text-purple-400">
                {formatCurrency(totaisGlobais.totalContingencia)}
              </p>
              <div className="flex items-center gap-2">
                <Progress 
                  value={percentualContingenciaGlobal} 
                  className="flex-1 h-2"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {percentualContingenciaGlobal.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                do orçamento total aprovado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar projeto por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Projetos Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Projetos Ativos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Monitoramento financeiro e status de cada projeto
          </p>
        </CardHeader>
        <CardContent>
          {projetosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Nenhum projeto encontrado com este critério de busca."
                  : "Nenhum projeto ativo atribuído a você."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome do Projeto</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Aprovado</TableHead>
                    <TableHead className="text-right">Liberado</TableHead>
                    <TableHead className="text-right">Contingência</TableHead>
                    <TableHead className="text-center">% Executado</TableHead>
                    <TableHead className="text-center">Alerta</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projetosFiltrados.map((projeto) => (
                    <TableRow key={projeto.id}>
                      <TableCell className="font-mono text-sm">
                        {projeto.codigo}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div>
                          <p className="font-medium">{projeto.nome}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusBadgeColor(projeto.status)}>
                          {projeto.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(projeto.orcamentoAprovado)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(projeto.orcamentoLiberado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-purple-600 dark:text-purple-400">
                          {formatCurrency(projeto.contingencia)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={projeto.percentualExecutado} 
                              className="flex-1 h-2"
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap w-10 text-right">
                              {projeto.percentualExecutado}%
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {projeto.temDesvio && (
                          <div className="flex items-center justify-center gap-1">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <span className="text-xs text-red-600 dark:text-red-400">
                              Desvio
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleIrParaOrcamento(projeto.id)}
                        >
                          Ir para Orçamento
                          <Plus className="w-4 h-4 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card Informativo */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Alerta de Desvio:</strong> Indica que o total gasto (Comprometido + Realizado) 
                ultrapassou o valor Liberado internamente. Isso sinaliza que o projeto está consumindo 
                a contingência ou precisa de remanejamento orçamentário.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}