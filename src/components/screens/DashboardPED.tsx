/**
 * MOVIOCA - Dashboard da Produção Executiva Dedicada (PED)
 * 
 * Tela principal do perfil PED, exibindo:
 * - Cards de resumo do orçamento delegado
 * - Alertas de ação (contratos, verbas pendentes)
 * - Lista de rubricas com barras de saldo
 * - Gráfico de progresso
 * 
 * PRD 005 - Seção 3.1: Tela: Dashboard do Projeto (Visão PED)
 * 
 * Histórias atendidas:
 * - História 1: Visualizar "Meu Orçamento"
 * - História 2: Ver Gráfico de Progresso
 */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertCircle,
  DollarSign,
  TrendingUp,
  FileText,
  AlertTriangle,
  Search,
  Plus,
  Eye,
} from "lucide-react";
import { useState } from "react";
import BarraSaldo from "../BarraSaldo";
import GraficoProgressoPED from "../GraficoProgressoPED";
import {
  calcularTotalLiberado,
  calcularTotalComprometido,
  calcularSaldoDisponivel,
  formatCurrency,
} from "../../utils/orcamento";

interface DashboardPEDProps {
  onNavigate: (screen: string, params?: any) => void;
}

interface RubricaPED {
  id: string;
  codigo: string;
  descricao: string;
  liberado: number;
  comprometido: number;
  realizado: number;
  saldo: number;
  percentualUsado: number;
}

export default function DashboardPED({ onNavigate }: DashboardPEDProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Rubricas delegadas para a PED
  // Em produção, isso viria de: filtrarRubricasPorPermissao(todasRubricas, currentUser)
  const minhasRubricas: RubricaPED[] = [
    {
      id: "rub-001",
      codigo: "002.001",
      descricao: "Diretor",
      liberado: 150000,
      comprometido: 150000,
      realizado: 50000,
      saldo: 0,
      percentualUsado: 100,
    },
    {
      id: "rub-002",
      codigo: "002.002",
      descricao: "Assistente de Direção",
      liberado: 80000,
      comprometido: 60000,
      realizado: 20000,
      saldo: 20000,
      percentualUsado: 75,
    },
    {
      id: "rub-003",
      codigo: "003.001",
      descricao: "Diretor de Fotografia",
      liberado: 200000,
      comprometido: 200000,
      realizado: 80000,
      saldo: 0,
      percentualUsado: 100,
    },
    {
      id: "rub-004",
      codigo: "003.002",
      descricao: "Operador de Câmera",
      liberado: 120000,
      comprometido: 90000,
      realizado: 30000,
      saldo: 30000,
      percentualUsado: 75,
    },
    {
      id: "rub-005",
      codigo: "004.001",
      descricao: "Diretor de Arte",
      liberado: 180000,
      comprometido: 120000,
      realizado: 40000,
      saldo: 60000,
      percentualUsado: 66.7,
    },
    {
      id: "rub-006",
      codigo: "004.002",
      descricao: "Cenógrafo",
      liberado: 100000,
      comprometido: 50000,
      realizado: 15000,
      saldo: 50000,
      percentualUsado: 50,
    },
    {
      id: "rub-007",
      codigo: "005.001",
      descricao: "Locação de Equipamentos",
      liberado: 250000,
      comprometido: 180000,
      realizado: 60000,
      saldo: 70000,
      percentualUsado: 72,
    },
    {
      id: "rub-008",
      codigo: "010.001",
      descricao: "Transporte - Elenco",
      liberado: 60000,
      comprometido: 35000,
      realizado: 12000,
      saldo: 25000,
      percentualUsado: 58.3,
    },
    {
      id: "rub-009",
      codigo: "010.002",
      descricao: "Transporte - Equipe",
      liberado: 80000,
      comprometido: 40000,
      realizado: 15000,
      saldo: 40000,
      percentualUsado: 50,
    },
    {
      id: "rub-010",
      codigo: "011.001",
      descricao: "Alimentação",
      liberado: 120000,
      comprometido: 60000,
      realizado: 20000,
      saldo: 60000,
      percentualUsado: 50,
    },
  ];

  // Cálculos de totais
  const totalLiberado = calcularTotalLiberado(minhasRubricas);
  const totalComprometido = calcularTotalComprometido(minhasRubricas);
  const saldoDisponivel = calcularSaldoDisponivel(minhasRubricas);

  // Alertas de ação (mock)
  const contratosAguardandoAssinatura = 3;
  const solicitacoesVerbaPendentes = 2;

  // Filtro de busca
  const rubricasFiltradas = minhasRubricas.filter(
    (r) =>
      r.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetalharOrcamento = () => {
    onNavigate("Orçamento - PED");
  };

  const handleNovaContratacao = () => {
    onNavigate("NovaContratacao");
  };

  const handleVerContratos = () => {
    onNavigate("Contratos - PED");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Painel de Controle do Projeto</h2>
        <p className="text-muted-foreground mt-1">
          Gestão executiva do orçamento delegado - Série Documentário
        </p>
      </div>

      {/* Cards de Orçamento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Liberado */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-base">Total Liberado</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Minha meta orçamentária
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl text-purple-600 dark:text-purple-400">
                {formatCurrency(totalLiberado)}
              </p>
              <p className="text-xs text-muted-foreground">
                {minhasRubricas.length} rubricas sob sua gestão
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Total Comprometido */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-base">Total Comprometido</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contratos + Verbas aprovadas
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl text-orange-600 dark:text-orange-400">
                {formatCurrency(totalComprometido)}
              </p>
              <p className="text-xs text-muted-foreground">
                {((totalComprometido / totalLiberado) * 100).toFixed(1)}% do
                orçamento liberado
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Saldo Disponível */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-base">Saldo Disponível</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ainda pode ser contratado
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl text-green-600 dark:text-green-400">
                {formatCurrency(saldoDisponivel)}
              </p>
              <p className="text-xs text-muted-foreground">
                {((saldoDisponivel / totalLiberado) * 100).toFixed(1)}% ainda
                disponível
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas de Ação */}
      {(contratosAguardandoAssinatura > 0 ||
        solicitacoesVerbaPendentes > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alerta: Contratos Aguardando Assinatura */}
          {contratosAguardandoAssinatura > 0 && (
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>{contratosAguardandoAssinatura} contratos</strong>{" "}
                      aguardando assinatura
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Faça o upload dos contratos assinados para liberar o
                      fluxo de pagamento
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    onClick={handleVerContratos}
                  >
                    Ver Contratos
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alerta: Solicitações de Verba */}
          {solicitacoesVerbaPendentes > 0 && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>{solicitacoesVerbaPendentes} solicitações</strong>{" "}
                      de verba da equipe
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Membros da sua equipe precisam de aprovação para carga de
                      cartão
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    onClick={() => onNavigate("Controle de Verba")}
                  >
                    Aprovar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Grid: Lista de Rubricas + Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Minhas Rubricas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Minhas Rubricas</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Itens orçamentários sob sua gestão
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDetalharOrcamento}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Detalhar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleNovaContratacao}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Contratação
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Busca */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por código ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabela */}
              {rubricasFiltradas.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Nenhuma rubrica encontrada com este critério."
                      : "Nenhuma rubrica delegada a você neste projeto. Contate a PEI."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Liberado</TableHead>
                        <TableHead>Saldo Disponível</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rubricasFiltradas.map((rubrica) => (
                        <TableRow key={rubrica.id}>
                          <TableCell className="font-mono text-sm">
                            {rubrica.codigo}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="font-medium truncate">
                              {rubrica.descricao}
                            </p>
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {formatCurrency(rubrica.liberado)}
                          </TableCell>
                          <TableCell>
                            <BarraSaldo
                              liberado={rubrica.liberado}
                              comprometido={rubrica.comprometido}
                              showValues={true}
                              height="sm"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Progresso */}
        <div className="lg:col-span-1">
          <GraficoProgressoPED
            totalLiberado={totalLiberado}
            totalComprometido={totalComprometido}
            titulo="Execução Orçamentária"
          />
        </div>
      </div>

      {/* Card Informativo */}
      <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>Sobre o seu orçamento:</strong> Você tem autonomia para
                contratar e programar pagamentos dentro do valor liberado. O
                valor "Liberado" é definido pela Produção Executiva Interna e
                não pode ser alterado por você. Para ajustes, entre em contato
                com a PEI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}