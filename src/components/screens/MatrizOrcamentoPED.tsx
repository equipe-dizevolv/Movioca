/**
 * MOVIOCA - Matriz Orçamentária PED
 * 
 * Versão filtrada da matriz orçamentária para Produção Executiva Dedicada.
 * 
 * Diferenças em relação à matriz da PEI:
 * - Exibe apenas rubricas delegadas à PED
 * - Campo "Liberado" é somente leitura (RN-002: Imutabilidade do Teto)
 * - Não exibe colunas de Contingência Global
 * - Permite sub-delegação para equipe
 * - Modal de rastreabilidade (ver contratos vinculados)
 * 
 * PRD 005 - Seção 3.2: Tela: Minha Matriz Orçamentária
 */

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Search,
  MoreVertical,
  Users,
  Eye,
  FileText,
  AlertCircle,
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";
import BarraSaldo from "../BarraSaldo";
import { formatCurrency } from "../../utils/orcamento";

interface MatrizOrcamentoPEDProps {
  onNavigate: (screen: string) => void;
}

interface BudgetRow {
  id: string;
  codigo: string;
  descricao: string;
  gestor: string;
  gestorNome: string;
  liberado: number;
  comprometido: number;
  realizado: number;
  saldo: number;
}

interface ContratoVinculado {
  id: string;
  numero: string;
  fornecedor: string;
  valor: number;
  status: string;
}

interface VerbaVinculada {
  id: string;
  numero: string;
  descricao: string;
  valor: number;
  status: string;
}

export default function MatrizOrcamentoPED({ onNavigate }: MatrizOrcamentoPEDProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openSubDelegar, setOpenSubDelegar] = useState(false);
  const [openRastreabilidade, setOpenRastreabilidade] = useState(false);
  const [rubricaSelecionada, setRubricaSelecionada] = useState<BudgetRow | null>(null);
  const [responsavelSubDelegacao, setResponsavelSubDelegacao] = useState("");
  const [valorLiberadoSubDelegacao, setValorLiberadoSubDelegacao] = useState("");

  // Mock data - Rubricas da PED (filtradas)
  const budgetData: BudgetRow[] = [
    {
      id: "rub-001",
      codigo: "002.001",
      descricao: "Diretor",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 150000,
      comprometido: 150000,
      realizado: 50000,
      saldo: 0,
    },
    {
      id: "rub-002",
      codigo: "002.002",
      descricao: "Assistente de Direção",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 80000,
      comprometido: 60000,
      realizado: 20000,
      saldo: 20000,
    },
    {
      id: "rub-003",
      codigo: "003.001",
      descricao: "Diretor de Fotografia",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 200000,
      comprometido: 200000,
      realizado: 80000,
      saldo: 0,
    },
    {
      id: "rub-004",
      codigo: "003.002",
      descricao: "Operador de Câmera",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 120000,
      comprometido: 90000,
      realizado: 30000,
      saldo: 30000,
    },
    {
      id: "rub-005",
      codigo: "004.001",
      descricao: "Diretor de Arte",
      gestor: "user-equipe-arte",
      gestorNome: "João (Arte) - Sub-delegado",
      liberado: 180000,
      comprometido: 120000,
      realizado: 40000,
      saldo: 60000,
    },
    {
      id: "rub-006",
      codigo: "004.002",
      descricao: "Cenógrafo",
      gestor: "user-equipe-arte",
      gestorNome: "João (Arte) - Sub-delegado",
      liberado: 100000,
      comprometido: 50000,
      realizado: 15000,
      saldo: 50000,
    },
    {
      id: "rub-007",
      codigo: "005.001",
      descricao: "Locação de Equipamentos",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 250000,
      comprometido: 180000,
      realizado: 60000,
      saldo: 70000,
    },
    {
      id: "rub-008",
      codigo: "010.001",
      descricao: "Transporte - Elenco",
      gestor: "user-ped",
      gestorNome: "Você",
      liberado: 60000,
      comprometido: 35000,
      realizado: 12000,
      saldo: 25000,
    },
  ];

  // Mock data - Contratos vinculados (para rastreabilidade)
  const getContratosVinculados = (rubricaId: string): ContratoVinculado[] => {
    const contratos: Record<string, ContratoVinculado[]> = {
      "rub-001": [
        {
          id: "c1",
          numero: "CNT-001",
          fornecedor: "José Silva (Diretor)",
          valor: 150000,
          status: "Aprovado",
        },
      ],
      "rub-003": [
        {
          id: "c2",
          numero: "CNT-003",
          fornecedor: "Maria Santos (DOP)",
          valor: 200000,
          status: "Aprovado",
        },
      ],
      "rub-007": [
        {
          id: "c3",
          numero: "CNT-015",
          fornecedor: "Locadora XYZ Equipamentos",
          valor: 120000,
          status: "Aprovado",
        },
        {
          id: "c4",
          numero: "CNT-016",
          fornecedor: "Cine Rent Ltda",
          valor: 60000,
          status: "Em Aprovação",
        },
      ],
    };
    return contratos[rubricaId] || [];
  };

  // Mock data - Verbas vinculadas
  const getVerbasVinculadas = (rubricaId: string): VerbaVinculada[] => {
    const verbas: Record<string, VerbaVinculada[]> = {
      "rub-008": [
        {
          id: "v1",
          numero: "V-005",
          descricao: "Transporte diário - Semana 1",
          valor: 15000,
          status: "Aprovada",
        },
        {
          id: "v2",
          numero: "V-008",
          descricao: "Transporte diário - Semana 2",
          valor: 20000,
          status: "Em uso",
        },
      ],
    };
    return verbas[rubricaId] || [];
  };

  // Filtro de busca
  const filteredData = budgetData.filter(
    (row) =>
      row.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
    }
  };

  const handleSubDelegar = () => {
    if (selectedRows.length === 0) {
      toast.error("Selecione ao menos uma rubrica para sub-delegar");
      return;
    }
    setOpenSubDelegar(true);
  };

  const handleConfirmarSubDelegacao = () => {
    if (!responsavelSubDelegacao) {
      toast.error("Selecione um responsável");
      return;
    }

    const membrosEquipe = [
      { id: "equipe-1", nome: "João Silva (Assistente de Produção)" },
      { id: "equipe-2", nome: "Maria Santos (Coord. de Transporte)" },
      { id: "equipe-3", nome: "Pedro Costa (Assistente de Arte)" },
    ];

    const responsavel = membrosEquipe.find((m) => m.id === responsavelSubDelegacao);

    let mensagem = `Gestão atribuída a ${responsavel?.nome} para ${selectedRows.length} rubrica(s).`;
    if (valorLiberadoSubDelegacao) {
      mensagem += ` Teto definido: ${valorLiberadoSubDelegacao}.`;
    }

    toast.success(mensagem);

    // Reset
    setOpenSubDelegar(false);
    setResponsavelSubDelegacao("");
    setValorLiberadoSubDelegacao("");
    setSelectedRows([]);
  };

  const handleVerDetalhes = (rubrica: BudgetRow) => {
    setRubricaSelecionada(rubrica);
    setOpenRastreabilidade(true);
  };

  const calcularTotalRastreado = () => {
    if (!rubricaSelecionada) return 0;
    const contratos = getContratosVinculados(rubricaSelecionada.id);
    const verbas = getVerbasVinculadas(rubricaSelecionada.id);
    const totalContratos = contratos.reduce((sum, c) => sum + c.valor, 0);
    const totalVerbas = verbas.reduce((sum, v) => sum + v.valor, 0);
    return totalContratos + totalVerbas;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div>
            <h2 className="text-3xl text-foreground">
              Gestão de Custos - Meu Orçamento
            </h2>
            <p className="text-muted-foreground mt-1">
              Visualização detalhada das rubricas sob sua gestão
            </p>
          </div>
        </div>
      </div>

      {/* Card Informativo - RN-002 */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>RN-002: Imutabilidade do Teto:</strong> O valor
                "Liberado" é definido pela Produção Executiva Interna e não pode
                ser alterado por você. Você gerencia <strong>como gastar</strong>
                , mas não <strong>quanto pode gastar no total</strong>. Para
                ajustes de teto, entre em contato com a PEI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por código ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {selectedRows.length > 0 && (
                <Button variant="outline" onClick={handleSubDelegar}>
                  <Users className="w-4 h-4 mr-2" />
                  Sub-delegar ({selectedRows.length})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedRows.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Gestor Atual</TableHead>
                  <TableHead className="text-right">
                    Liberado
                    <br />
                    <span className="text-xs text-muted-foreground">(Somente leitura)</span>
                  </TableHead>
                  <TableHead className="text-right">Comprometido</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead>Saldo Disponível</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? "Nenhuma rubrica encontrada."
                          : "Nenhuma rubrica delegada."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => handleSelectRow(row.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {row.codigo}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="font-medium">{row.descricao}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            row.gestorNome.includes("Sub-delegado")
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }
                        >
                          {row.gestorNome}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                          {formatCurrency(row.liberado)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(row.comprometido)}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(row.realizado)}
                      </TableCell>
                      <TableCell>
                        <BarraSaldo
                          liberado={row.liberado}
                          comprometido={row.comprometido}
                          showValues={true}
                          height="sm"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleVerDetalhes(row)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes (Rastreabilidade)
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRows([row.id]);
                                handleSubDelegar();
                              }}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Sub-delegar esta Rubrica
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Sub-delegação */}
      <Dialog open={openSubDelegar} onOpenChange={setOpenSubDelegar}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sub-delegar Rubricas</DialogTitle>
            <DialogDescription>
              Atribua a gestão dessas rubricas para um membro da sua equipe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                <strong>ℹ️ Sub-delegação:</strong> {selectedRows.length}{" "}
                rubrica(s) selecionada(s). O responsável terá permissão para
                visualizar e solicitar verbas. Os gastos consumirão o seu saldo
                (RN-003: Responsabilidade Solidária).
              </p>
            </div>

            <div>
              <Label>Responsável *</Label>
              <Select
                value={responsavelSubDelegacao}
                onValueChange={setResponsavelSubDelegacao}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um membro da equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipe-1">
                    João Silva (Assistente de Produção)
                  </SelectItem>
                  <SelectItem value="equipe-2">
                    Maria Santos (Coord. de Transporte)
                  </SelectItem>
                  <SelectItem value="equipe-3">
                    Pedro Costa (Assistente de Arte)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Valor Liberado (Opcional)</Label>
              <Input
                placeholder="Ex: R$ 50.000,00"
                value={valorLiberadoSubDelegacao}
                onChange={(e) => setValorLiberadoSubDelegacao(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Deixe em branco para liberar o valor total das rubricas
                selecionadas
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSubDelegar(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarSubDelegacao}>
              Confirmar Sub-delegação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Rastreabilidade */}
      <Dialog
        open={openRastreabilidade}
        onOpenChange={setOpenRastreabilidade}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Rastreabilidade:{" "}
              {rubricaSelecionada?.codigo} - {rubricaSelecionada?.descricao}
            </DialogTitle>
            <DialogDescription>
              Detalhamento dos contratos e verbas que compõem o valor
              "Comprometido"
            </DialogDescription>
          </DialogHeader>

          {rubricaSelecionada && (
            <div className="space-y-6">
              {/* Resumo */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Liberado</p>
                  <p className="text-sm font-medium">
                    {formatCurrency(rubricaSelecionada.liberado)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Comprometido</p>
                  <p className="text-sm font-medium text-orange-600">
                    {formatCurrency(rubricaSelecionada.comprometido)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Saldo</p>
                  <p className="text-sm font-medium text-green-600">
                    {formatCurrency(rubricaSelecionada.saldo)}
                  </p>
                </div>
              </div>

              {/* Contratos Vinculados */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Contratos Vinculados
                </h3>
                {getContratosVinculados(rubricaSelecionada.id).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhum contrato vinculado
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getContratosVinculados(rubricaSelecionada.id).map(
                      (contrato) => (
                        <div
                          key={contrato.id}
                          className="border rounded-lg p-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {contrato.numero} - {contrato.fornecedor}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Status: {contrato.status}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatCurrency(contrato.valor)}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Verbas Vinculadas */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Verbas Aprovadas
                </h3>
                {getVerbasVinculadas(rubricaSelecionada.id).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma verba vinculada
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getVerbasVinculadas(rubricaSelecionada.id).map((verba) => (
                      <div
                        key={verba.id}
                        className="border rounded-lg p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {verba.numero} - {verba.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Status: {verba.status}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatCurrency(verba.valor)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Rastreado */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Total Rastreado:</p>
                  <p className="text-lg font-medium text-orange-600">
                    {formatCurrency(calcularTotalRastreado())}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Soma de todos os contratos e verbas vinculados a esta rubrica
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setOpenRastreabilidade(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}