/**
 * MOVIOCA - Histórico de Glosas e Reprovações
 * 
 * Tela específica para Controladoria Interna visualizar histórico completo de:
 * - Itens glosados em lotes de verba
 * - Pagamentos reprovados
 * - Estatísticas por fornecedor e departamento
 * 
 * História 6: "Histórico completo de Itens Glosados ou Reprovados para identificar 
 * fornecedores ou departamentos com alto índice de erro e atuar preventivamente"
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  AlertTriangle,
  XCircle,
  TrendingUp,
  Download,
  Search,
  Filter,
  Building2,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react";
import { format, addDays, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";

interface ItemGlosado {
  id: string;
  tipo: "verba" | "pagamento";
  data: Date;
  loteOuPagamento: string;
  fornecedor: string;
  projeto: string;
  departamento: string;
  descricao: string;
  valorGlosado: number;
  motivo: string;
  analisadoPor: string;
}

interface EstatisticaFornecedor {
  fornecedor: string;
  totalGlosas: number;
  valorTotal: number;
  percentualErro: number;
}

export default function HistoricoGlosas() {
  const [abaAtiva, setAbaAtiva] = useState<string>("itens");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroProjeto, setFiltroProjeto] = useState<string>("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("mes-atual");

  const hoje = new Date();

  // Mock Data - Itens Glosados
  const itensGlosados: ItemGlosado[] = [
    {
      id: "g-001",
      tipo: "verba",
      data: subDays(hoje, 2),
      loteOuPagamento: "L-2025-003",
      fornecedor: "Restaurante Fino Paladar",
      projeto: "Série Documentário - História",
      departamento: "Produção",
      descricao: "Almoço em dia de folga (domingo)",
      valorGlosado: 180,
      motivo: "Despesa em dia não útil para o projeto",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-002",
      tipo: "verba",
      data: subDays(hoje, 3),
      loteOuPagamento: "L-2025-002",
      fornecedor: "Posto de Gasolina Central",
      projeto: "Campanha Publicitária - Marca X",
      departamento: "Logística",
      descricao: "Combustível sem nota fiscal",
      valorGlosado: 320,
      motivo: "Ausência de documento fiscal válido",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-003",
      tipo: "pagamento",
      data: subDays(hoje, 5),
      loteOuPagamento: "PAG-2025-045",
      fornecedor: "Equipamentos Pro LTDA",
      projeto: "Filme Institucional",
      departamento: "Equipamentos",
      descricao: "NF sem retenção de IRRF",
      valorGlosado: 7800,
      motivo: "Falta de retenção obrigatória de impostos",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-004",
      tipo: "verba",
      data: subDays(hoje, 6),
      loteOuPagamento: "L-2025-001",
      fornecedor: "Supermercado ABC",
      projeto: "Série Documentário - História",
      departamento: "Produção",
      descricao: "Bebida alcoólica",
      valorGlosado: 145,
      motivo: "Item não permitido pela Ancine",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-005",
      tipo: "pagamento",
      data: subDays(hoje, 8),
      loteOuPagamento: "PAG-2025-038",
      fornecedor: "Locadora XYZ Equipamentos",
      projeto: "Campanha Publicitária - Marca X",
      departamento: "Equipamentos",
      descricao: "Valor divergente do contrato",
      valorGlosado: 2500,
      motivo: "Valor da NF superior ao contratado",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-006",
      tipo: "verba",
      data: subDays(hoje, 10),
      loteOuPagamento: "L-2024-098",
      fornecedor: "Restaurante Fino Paladar",
      projeto: "Filme Institucional",
      departamento: "Produção",
      descricao: "Despesa fora do período de filmagem",
      valorGlosado: 220,
      motivo: "Despesa fora do cronograma do projeto",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-007",
      tipo: "pagamento",
      data: subDays(hoje, 12),
      loteOuPagamento: "PAG-2024-189",
      fornecedor: "Cenografia & Arte LTDA",
      projeto: "Série Documentário - História",
      departamento: "Arte",
      descricao: "CNPJ não corresponde ao KINAI",
      valorGlosado: 4200,
      motivo: "Atividade econômica incompatível com serviço contratado",
      analisadoPor: "João (CI)"
    },
    {
      id: "g-008",
      tipo: "verba",
      data: subDays(hoje, 15),
      loteOuPagamento: "L-2024-095",
      fornecedor: "Posto de Gasolina Central",
      projeto: "Campanha Publicitária - Marca X",
      departamento: "Logística",
      descricao: "Km excedente ao autorizado",
      valorGlosado: 280,
      motivo: "Quilometragem acima do limite aprovado",
      analisadoPor: "João (CI)"
    },
  ];

  // Estatísticas por Fornecedor
  const estatisticasFornecedor: EstatisticaFornecedor[] = [
    {
      fornecedor: "Restaurante Fino Paladar",
      totalGlosas: 2,
      valorTotal: 400,
      percentualErro: 25
    },
    {
      fornecedor: "Posto de Gasolina Central",
      totalGlosas: 2,
      valorTotal: 600,
      percentualErro: 30
    },
    {
      fornecedor: "Equipamentos Pro LTDA",
      totalGlosas: 1,
      valorTotal: 7800,
      percentualErro: 15
    },
    {
      fornecedor: "Locadora XYZ Equipamentos",
      totalGlosas: 1,
      valorTotal: 2500,
      percentualErro: 10
    },
    {
      fornecedor: "Cenografia & Arte LTDA",
      totalGlosas: 1,
      valorTotal: 4200,
      percentualErro: 18
    },
  ];

  // Estatísticas por Departamento
  const estatisticasDepartamento = [
    { departamento: "Produção", totalGlosas: 3, valorTotal: 545 },
    { departamento: "Equipamentos", totalGlosas: 2, valorTotal: 10300 },
    { departamento: "Logística", totalGlosas: 2, valorTotal: 600 },
    { departamento: "Arte", totalGlosas: 1, valorTotal: 4200 },
  ];

  // Filtros
  const aplicarFiltros = (itens: ItemGlosado[]) => {
    let resultado = [...itens];

    // Busca por texto
    if (searchTerm) {
      resultado = resultado.filter(item =>
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.motivo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filtroTipo !== "todos") {
      resultado = resultado.filter(item => item.tipo === filtroTipo);
    }

    // Filtro por projeto
    if (filtroProjeto !== "todos") {
      resultado = resultado.filter(item => item.projeto === filtroProjeto);
    }

    // Filtro por período
    if (filtroPeriodo === "mes-atual") {
      const inicioMes = startOfMonth(hoje);
      const fimMes = endOfMonth(hoje);
      resultado = resultado.filter(item => 
        item.data >= inicioMes && item.data <= fimMes
      );
    } else if (filtroPeriodo === "ultimos-30") {
      const inicio = subDays(hoje, 30);
      resultado = resultado.filter(item => item.data >= inicio);
    }

    return resultado;
  };

  // Listas únicas
  const projetos = Array.from(new Set(itensGlosados.map(i => i.projeto)));
  
  // Totalizadores
  const itensFiltrados = aplicarFiltros(itensGlosados);
  const totalItens = itensFiltrados.length;
  const totalValor = itensFiltrados.reduce((acc, item) => acc + item.valorGlosado, 0);

  // Badge de tipo
  const renderBadgeTipo = (tipo: "verba" | "pagamento") => {
    if (tipo === "verba") {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Verba</Badge>;
    }
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Pagamento</Badge>;
  };

  // Exportar relatório
  const handleExportar = () => {
    toast.success("Relatório de Glosas exportado com sucesso!");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Histórico de Glosas e Reprovações</h2>
        <p className="text-muted-foreground mt-1">
          Análise de itens glosados, reprovados e estatísticas de conformidade
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Glosas</p>
                <p className="text-2xl mt-2">{totalItens}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Glosado</p>
                <p className="text-2xl mt-2">
                  R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fornecedores com Erro</p>
                <p className="text-2xl mt-2">{estatisticasFornecedor.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Período</p>
                <p className="text-base mt-2">
                  {filtroPeriodo === "mes-atual" ? "Mês Atual" : filtroPeriodo === "ultimos-30" ? "Últimos 30 dias" : "Todo o período"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filtro Tipo */}
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="verba">Verba</SelectItem>
                <SelectItem value="pagamento">Pagamento</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro Projeto */}
            <Select value={filtroProjeto} onValueChange={setFiltroProjeto}>
              <SelectTrigger>
                <SelectValue placeholder="Projeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Projetos</SelectItem>
                {projetos.map(proj => (
                  <SelectItem key={proj} value={proj}>{proj}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro Período */}
            <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes-atual">Mês Atual</SelectItem>
                <SelectItem value="ultimos-30">Últimos 30 dias</SelectItem>
                <SelectItem value="todos">Todo o período</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Abas */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="itens">Itens Glosados ({totalItens})</TabsTrigger>
          <TabsTrigger value="fornecedores">Por Fornecedor</TabsTrigger>
          <TabsTrigger value="departamentos">Por Departamento</TabsTrigger>
        </TabsList>

        {/* Aba: Itens Glosados */}
        <TabsContent value="itens">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Itens Glosados e Reprovados</CardTitle>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportar}>
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              {itensFiltrados.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Nenhum item glosado encontrado no período selecionado.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Lote/Pagamento</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead className="text-right">Valor Glosado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{format(item.data, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                        <TableCell>{renderBadgeTipo(item.tipo)}</TableCell>
                        <TableCell className="font-medium">{item.loteOuPagamento}</TableCell>
                        <TableCell>{item.fornecedor}</TableCell>
                        <TableCell className="text-sm">{item.projeto}</TableCell>
                        <TableCell className="text-sm">{item.descricao}</TableCell>
                        <TableCell className="text-sm text-red-600">{item.motivo}</TableCell>
                        <TableCell className="text-right font-medium text-red-600">
                          R$ {item.valorGlosado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Por Fornecedor */}
        <TabsContent value="fornecedores">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Estatísticas por Fornecedor</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Fornecedores com maior índice de erro para ação preventiva
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportar}>
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-center">Total de Glosas</TableHead>
                    <TableHead className="text-right">Valor Total Glosado</TableHead>
                    <TableHead className="text-right">% Erro</TableHead>
                    <TableHead className="text-center">Risco</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estatisticasFornecedor.sort((a, b) => b.percentualErro - a.percentualErro).map(stat => (
                    <TableRow key={stat.fornecedor}>
                      <TableCell className="font-medium">{stat.fornecedor}</TableCell>
                      <TableCell className="text-center">{stat.totalGlosas}</TableCell>
                      <TableCell className="text-right">
                        R$ {stat.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">{stat.percentualErro}%</TableCell>
                      <TableCell className="text-center">
                        {stat.percentualErro >= 25 ? (
                          <Badge variant="destructive">Alto</Badge>
                        ) : stat.percentualErro >= 15 ? (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">Médio</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Baixo</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Por Departamento */}
        <TabsContent value="departamentos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Estatísticas por Departamento</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Departamentos que precisam de orientação preventiva
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportar}>
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    <TableHead className="text-center">Total de Glosas</TableHead>
                    <TableHead className="text-right">Valor Total Glosado</TableHead>
                    <TableHead className="text-right">Média por Glosa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estatisticasDepartamento.sort((a, b) => b.totalGlosas - a.totalGlosas).map(stat => (
                    <TableRow key={stat.departamento}>
                      <TableCell className="font-medium">{stat.departamento}</TableCell>
                      <TableCell className="text-center">{stat.totalGlosas}</TableCell>
                      <TableCell className="text-right">
                        R$ {stat.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {(stat.valorTotal / stat.totalGlosas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
