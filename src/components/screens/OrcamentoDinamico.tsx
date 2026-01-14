import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown, ChevronRight, Plus, Download, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";

interface PhaseData {
  item: string;
  unidade: string;
  quantidade: number;
  valor: number;
  total: number;
}

interface BudgetRow {
  id: string;
  gestao: string;
  codigo: string;
  subcodigo: string;
  descricao: string;
  fornecedor: string;
  des: PhaseData;
  pre: PhaseData;
  pro: PhaseData;
  pos: PhaseData;
  aprovado: number;
  liberado: number;
  comprometido: number;
  realizado: number;
  observacao: string;
  status: string;
  isGroup?: boolean;
  parentId?: string;
}

export default function OrcamentoDinamico() {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission((role) => 
    ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 
     'Produção Executiva Dedicada', 'Financeiro'].includes(role)
  );

  const [expandedGroups, setExpandedGroups] = useState<string[]>(["001", "002", "003"]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado com dados do orçamento
  const [budgetData, setBudgetData] = useState<BudgetRow[]>([
    // 001 ROTEIRO - Grupo
    {
      id: "001",
      gestao: "Movioca",
      codigo: "001",
      subcodigo: "",
      descricao: "Roteiro",
      fornecedor: "",
      des: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 40000,
      liberado: 40000,
      comprometido: 35000,
      realizado: 30000,
      observacao: "",
      status: "Aprovado",
      isGroup: true,
    },
    {
      id: "001.00101",
      gestao: "Movioca",
      codigo: "001.001",
      subcodigo: "01",
      descricao: "Chefe de roteiro",
      fornecedor: "Movioca",
      des: { item: "2", unidade: "Semana", quantidade: 2, valor: 5000, total: 10000 },
      pre: { item: "2", unidade: "Semana", quantidade: 2, valor: 5000, total: 10000 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 20000,
      liberado: 20000,
      comprometido: 15000,
      realizado: 10000,
      observacao: "Contratação prioritária",
      status: "Aprovado",
      parentId: "001",
    },
    {
      id: "001.00102",
      gestao: "Movioca",
      codigo: "001.001",
      subcodigo: "02",
      descricao: "Assistente de roteiro",
      fornecedor: "",
      des: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "3", unidade: "Semana", quantidade: 3, valor: 3000, total: 9000 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 9000,
      liberado: 9000,
      comprometido: 8000,
      realizado: 7000,
      observacao: "",
      status: "Em análise",
      parentId: "001",
    },
    {
      id: "001.002",
      gestao: "Movioca",
      codigo: "001.002",
      subcodigo: "",
      descricao: "Supervisão de roteiro",
      fornecedor: "",
      des: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 0,
      liberado: 0,
      comprometido: 0,
      realizado: 0,
      observacao: "",
      status: "Bloqueado",
      parentId: "001",
    },
    // 002 CESSÃO DE DIREITOS - Grupo
    {
      id: "002",
      gestao: "Movioca",
      codigo: "002",
      subcodigo: "",
      descricao: "Cessão de direitos",
      fornecedor: "",
      des: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 25000,
      liberado: 20000,
      comprometido: 15000,
      realizado: 10000,
      observacao: "",
      status: "Aprovado",
      isGroup: true,
    },
    {
      id: "002.00101",
      gestao: "Movioca",
      codigo: "002.001",
      subcodigo: "01",
      descricao: "Cessão de direitos de roteiro",
      fornecedor: "Roteirista Fulano",
      des: { item: "1", unidade: "Projeto", quantidade: 1, valor: 15000, total: 15000 },
      pre: { item: "", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      aprovado: 15000,
      liberado: 12000,
      comprometido: 10000,
      realizado: 8000,
      observacao: "",
      status: "Aprovado",
      parentId: "002",
    },
    // 003 DIREÇÃO - Grupo
    {
      id: "003",
      gestao: "Executiva",
      codigo: "003",
      subcodigo: "",
      descricao: "Direção",
      fornecedor: "",
      des: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      aprovado: 80000,
      liberado: 80000,
      comprometido: 60000,
      realizado: 40000,
      observacao: "",
      status: "Aprovado",
      isGroup: true,
    },
    {
      id: "003.00101",
      gestao: "Executiva",
      codigo: "003.001",
      subcodigo: "01",
      descricao: "Diretor Geral",
      fornecedor: "Diretor X",
      des: { item: "1", unidade: "Semana", quantidade: 1, valor: 8000, total: 8000 },
      pre: { item: "4", unidade: "Semana", quantidade: 4, valor: 8000, total: 32000 },
      pro: { item: "6", unidade: "Semana", quantidade: 6, valor: 8000, total: 48000 },
      pos: { item: "2", unidade: "Semana", quantidade: 2, valor: 8000, total: 16000 },
      aprovado: 104000,
      liberado: 104000,
      comprometido: 80000,
      realizado: 50000,
      observacao: "",
      status: "Aprovado",
      parentId: "003",
    },
  ]);

  // Funções de atualização
  const updateField = (rowId: string, field: keyof BudgetRow, value: any) => {
    setBudgetData(prev => prev.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const updatePhaseField = (rowId: string, phase: 'des' | 'pre' | 'pro' | 'pos', field: keyof PhaseData, value: any) => {
    setBudgetData(prev => prev.map(row => {
      if (row.id !== rowId) return row;
      
      const newPhase = { ...row[phase] };
      newPhase[field] = value;
      
      // Recalcular total se quantidade ou valor mudaram
      if (field === 'quantidade' || field === 'valor') {
        newPhase.total = newPhase.quantidade * newPhase.valor;
      }
      
      return { ...row, [phase]: newPhase };
    }));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows(prev =>
      prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId]
    );
  };

  const duplicarLinha = (row: BudgetRow) => {
    const newId = `${row.codigo}.${(Math.random() * 10000).toFixed(0)}`;
    const newRow: BudgetRow = {
      ...row,
      id: newId,
      subcodigo: String(Number(row.subcodigo || "0") + 1).padStart(2, "0"),
    };
    
    setBudgetData(prev => {
      const index = prev.findIndex(r => r.id === row.id);
      const newData = [...prev];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });
    
    toast.success("Linha duplicada com sucesso!");
  };

  const excluirLinha = (rowId: string) => {
    setBudgetData(prev => prev.filter(row => row.id !== rowId));
    toast.success("Linha excluída!");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Funções de cor de fundo por fase
  const getPhaseBackgroundClass = (phase: string) => {
    switch (phase) {
      case "Desenvolvimento": return "bg-blue-50 dark:bg-blue-900/20";
      case "Pré-produção": return "bg-green-50 dark:bg-green-900/20";
      case "Produção": return "bg-yellow-50 dark:bg-yellow-900/20";
      case "Pós-produção": return "bg-purple-50 dark:bg-purple-900/20";
      default: return "";
    }
  };

  const getPhaseBackgroundClassForGroup = (phase: string) => {
    switch (phase) {
      case "Desenvolvimento": return "bg-blue-100 dark:bg-blue-900/40";
      case "Pré-produção": return "bg-green-100 dark:bg-green-900/40";
      case "Produção": return "bg-yellow-100 dark:bg-yellow-900/40";
      case "Pós-produção": return "bg-purple-100 dark:bg-purple-900/40";
      default: return "";
    }
  };

  // Filtragem de dados
  const filteredData = budgetData.filter(row => {
    // Filtro de busca
    if (searchTerm && !row.descricao.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !row.codigo.includes(searchTerm)) {
      return false;
    }
    
    // Se for filho, mostrar apenas se pai estiver expandido
    if (row.parentId && !expandedGroups.includes(row.parentId)) {
      return false;
    }
    
    return true;
  });

  // Cálculos para rodapé
  const totalAprovado = budgetData.reduce((sum, row) => sum + row.aprovado, 0);
  const totalLiberado = budgetData.reduce((sum, row) => sum + row.liberado, 0);
  const totalComprometido = budgetData.reduce((sum, row) => sum + row.comprometido, 0);
  const totalRealizado = budgetData.reduce((sum, row) => sum + row.realizado, 0);
  const totalGasto = totalComprometido + totalRealizado;
  const saldoDisponivel = totalLiberado - totalGasto;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Orçamento Dinâmico</h1>
          <p className="text-sm text-muted-foreground">Edição em tempo real com cálculos automáticos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Rúbrica
          </Button>
        </div>
      </div>

      {/* Barra de busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="Projeto Alpha">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela principal */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead className="w-[120px]">Gestão</TableHead>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead className="w-[60px]">Sub</TableHead>
                  <TableHead className="min-w-[200px]">Descrição</TableHead>
                  <TableHead className="w-[150px]">Fornecedor</TableHead>
                  
                  {/* Desenvolvimento */}
                  <TableHead colSpan={5} className="text-center bg-blue-100 dark:bg-blue-900/40 border-l-2 border-blue-300">
                    Desenvolvimento
                  </TableHead>
                  
                  {/* Pré-produção */}
                  <TableHead colSpan={5} className="text-center bg-green-100 dark:bg-green-900/40 border-l-2 border-green-300">
                    Pré-produção
                  </TableHead>
                  
                  {/* Produção */}
                  <TableHead colSpan={5} className="text-center bg-yellow-100 dark:bg-yellow-900/40 border-l-2 border-yellow-300">
                    Produção
                  </TableHead>
                  
                  {/* Pós-produção */}
                  <TableHead colSpan={5} className="text-center bg-purple-100 dark:bg-purple-900/40 border-l-2 border-purple-300">
                    Pós-produção
                  </TableHead>
                  
                  {/* Totais */}
                  <TableHead className="w-[120px] border-l-2 border-gray-300">Total</TableHead>
                  <TableHead className="w-[120px]">Aprovado</TableHead>
                  <TableHead className="w-[120px]">Liberado</TableHead>
                  <TableHead className="w-[120px]">Comprometido</TableHead>
                  <TableHead className="w-[120px]">Realizado</TableHead>
                  <TableHead className="w-[120px] bg-pink-50">Total Gasto</TableHead>
                  <TableHead className="w-[120px] bg-orange-50">Saldo Disp.</TableHead>
                  <TableHead className="w-[200px]">Observação</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
                
                {/* Sub-headers para campos das fases */}
                <TableRow className="text-xs">
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  
                  {/* Desenvolvimento */}
                  <TableHead className="h-8 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-300">Item</TableHead>
                  <TableHead className="h-8 bg-blue-50 dark:bg-blue-900/20">Unid.</TableHead>
                  <TableHead className="h-8 bg-blue-50 dark:bg-blue-900/20">Qtd</TableHead>
                  <TableHead className="h-8 bg-blue-50 dark:bg-blue-900/20">Valor</TableHead>
                  <TableHead className="h-8 bg-blue-50 dark:bg-blue-900/20">Total</TableHead>
                  
                  {/* Pré-produção */}
                  <TableHead className="h-8 bg-green-50 dark:bg-green-900/20 border-l-2 border-green-300">Item</TableHead>
                  <TableHead className="h-8 bg-green-50 dark:bg-green-900/20">Unid.</TableHead>
                  <TableHead className="h-8 bg-green-50 dark:bg-green-900/20">Qtd</TableHead>
                  <TableHead className="h-8 bg-green-50 dark:bg-green-900/20">Valor</TableHead>
                  <TableHead className="h-8 bg-green-50 dark:bg-green-900/20">Total</TableHead>
                  
                  {/* Produção */}
                  <TableHead className="h-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-2 border-yellow-300">Item</TableHead>
                  <TableHead className="h-8 bg-yellow-50 dark:bg-yellow-900/20">Unid.</TableHead>
                  <TableHead className="h-8 bg-yellow-50 dark:bg-yellow-900/20">Qtd</TableHead>
                  <TableHead className="h-8 bg-yellow-50 dark:bg-yellow-900/20">Valor</TableHead>
                  <TableHead className="h-8 bg-yellow-50 dark:bg-yellow-900/20">Total</TableHead>
                  
                  {/* Pós-produção */}
                  <TableHead className="h-8 bg-purple-50 dark:bg-purple-900/20 border-l-2 border-purple-300">Item</TableHead>
                  <TableHead className="h-8 bg-purple-50 dark:bg-purple-900/20">Unid.</TableHead>
                  <TableHead className="h-8 bg-purple-50 dark:bg-purple-900/20">Qtd</TableHead>
                  <TableHead className="h-8 bg-purple-50 dark:bg-purple-900/20">Valor</TableHead>
                  <TableHead className="h-8 bg-purple-50 dark:bg-purple-900/20">Total</TableHead>
                  
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                  <TableHead className="h-8"></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredData.map((row) => {
                  const totalRow = row.des.total + row.pre.total + row.pro.total + row.pos.total;
                  const totalGastoRow = row.comprometido + row.realizado;
                  const saldoDisponivelRow = row.liberado - totalGastoRow;
                  
                  return (
                  <TableRow 
                    key={row.id}
                    className={row.isGroup ? "font-semibold bg-muted/50" : ""}
                  >
                    {/* Checkbox */}
                    <TableCell>
                      {!row.isGroup && (
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                        />
                      )}
                    </TableCell>
                    
                    {/* Expand/Collapse */}
                    <TableCell>
                      {row.isGroup && (
                        <button onClick={() => toggleGroup(row.id)}>
                          {expandedGroups.includes(row.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </TableCell>
                    
                    {/* Gestão */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Select
                          value={row.gestao}
                          onValueChange={(value) => updateField(row.id, 'gestao', value)}
                        >
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Movioca">Movioca</SelectItem>
                            <SelectItem value="Executiva">Executiva</SelectItem>
                            <SelectItem value="Produção">Produção</SelectItem>
                            <SelectItem value="Pós">Pós</SelectItem>
                            <SelectItem value="Arte">Arte</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-sm">{row.gestao}</span>
                      )}
                    </TableCell>
                    
                    {/* Código */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      <span className="font-mono text-sm">{row.codigo}</span>
                    </TableCell>
                    
                    {/* Subcódigo */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {row.subcodigo && (
                        <span className="font-mono text-sm">.{row.subcodigo}</span>
                      )}
                    </TableCell>
                    
                    {/* Descrição */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      <span className="text-sm">{row.descricao}</span>
                    </TableCell>
                    
                    {/* Fornecedor */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          value={row.fornecedor}
                          onChange={(e) => updateField(row.id, 'fornecedor', e.target.value)}
                          className="h-8 text-sm italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      ) : (
                        <span className="text-sm">{row.fornecedor}</span>
                      )}
                    </TableCell>
                    
                    {/* ========== DESENVOLVIMENTO ========== */}
                    {/* Item */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento") + " border-l-2 border-blue-300"}>
                      {!row.isGroup && canEdit && (
                        <Input
                          value={row.des.item}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].des.item = e.target.value;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 text-sm w-[80px] italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
                    {/* Unidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && canEdit && (
                        <Select
                          value={row.des.unidade || "Unidade"}
                          onValueChange={(value) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].des.unidade = value;
                              setBudgetData(newData);
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hora">Hora</SelectItem>
                            <SelectItem value="Dia">Dia</SelectItem>
                            <SelectItem value="Semana">Semana</SelectItem>
                            <SelectItem value="Mês">Mês</SelectItem>
                            <SelectItem value="Unidade">Unidade</SelectItem>
                            <SelectItem value="Episódio">Episódio</SelectItem>
                            <SelectItem value="Projeto">Projeto</SelectItem>
                            <SelectItem value="Verba">Verba</SelectItem>
                            <SelectItem value="Pacote">Pacote</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    {/* Quantidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.des.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const qtd = Number(e.target.value) || 0;
                              newData[idx].des.quantidade = qtd;
                              newData[idx].des.total = qtd * newData[idx].des.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[70px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    {/* Valor */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.des.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const val = Number(e.target.value) || 0;
                              newData[idx].des.valor = val;
                              newData[idx].des.total = newData[idx].des.quantidade * val;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    {/* Total */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      <span className="text-sm font-semibold">
                        {row.des.total > 0 && formatCurrency(row.des.total)}
                      </span>
                    </TableCell>
                    
                    {/* ========== PRÉ-PRODUÇÃO ========== */}
                    {/* Item */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção") + " border-l-2 border-green-300"}>
                      {!row.isGroup && canEdit && (
                        <Input
                          value={row.pre.item}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pre.item = e.target.value;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 text-sm w-[80px] italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
                    {/* Unidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && canEdit && (
                        <Select
                          value={row.pre.unidade || "Unidade"}
                          onValueChange={(value) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pre.unidade = value;
                              setBudgetData(newData);
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hora">Hora</SelectItem>
                            <SelectItem value="Dia">Dia</SelectItem>
                            <SelectItem value="Semana">Semana</SelectItem>
                            <SelectItem value="Mês">Mês</SelectItem>
                            <SelectItem value="Unidade">Unidade</SelectItem>
                            <SelectItem value="Episódio">Episódio</SelectItem>
                            <SelectItem value="Projeto">Projeto</SelectItem>
                            <SelectItem value="Verba">Verba</SelectItem>
                            <SelectItem value="Pacote">Pacote</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    {/* Quantidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pre.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const qtd = Number(e.target.value) || 0;
                              newData[idx].pre.quantidade = qtd;
                              newData[idx].pre.total = qtd * newData[idx].pre.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[70px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    {/* Valor */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pre.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const val = Number(e.target.value) || 0;
                              newData[idx].pre.valor = val;
                              newData[idx].pre.total = newData[idx].pre.quantidade * val;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    {/* Total */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      <span className="text-sm font-semibold">
                        {row.pre.total > 0 && formatCurrency(row.pre.total)}
                      </span>
                    </TableCell>
                    
                    {/* ========== PRODUÇÃO ========== */}
                    {/* Item */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção") + " border-l-2 border-yellow-300"}>
                      {!row.isGroup && canEdit && (
                        <Input
                          value={row.pro.item}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pro.item = e.target.value;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 text-sm w-[80px] italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
                    {/* Unidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && canEdit && (
                        <Select
                          value={row.pro.unidade || "Unidade"}
                          onValueChange={(value) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pro.unidade = value;
                              setBudgetData(newData);
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hora">Hora</SelectItem>
                            <SelectItem value="Dia">Dia</SelectItem>
                            <SelectItem value="Semana">Semana</SelectItem>
                            <SelectItem value="Mês">Mês</SelectItem>
                            <SelectItem value="Unidade">Unidade</SelectItem>
                            <SelectItem value="Episódio">Episódio</SelectItem>
                            <SelectItem value="Projeto">Projeto</SelectItem>
                            <SelectItem value="Verba">Verba</SelectItem>
                            <SelectItem value="Pacote">Pacote</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    {/* Quantidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pro.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const qtd = Number(e.target.value) || 0;
                              newData[idx].pro.quantidade = qtd;
                              newData[idx].pro.total = qtd * newData[idx].pro.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[70px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    {/* Valor */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pro.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const val = Number(e.target.value) || 0;
                              newData[idx].pro.valor = val;
                              newData[idx].pro.total = newData[idx].pro.quantidade * val;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    {/* Total */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      <span className="text-sm font-semibold">
                        {row.pro.total > 0 && formatCurrency(row.pro.total)}
                      </span>
                    </TableCell>
                    
                    {/* ========== PÓS-PRODUÇÃO ========== */}
                    {/* Item */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção") + " border-l-2 border-purple-300"}>
                      {!row.isGroup && canEdit && (
                        <Input
                          value={row.pos.item}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pos.item = e.target.value;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 text-sm w-[80px] italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
                    {/* Unidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && canEdit && (
                        <Select
                          value={row.pos.unidade || "Unidade"}
                          onValueChange={(value) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pos.unidade = value;
                              setBudgetData(newData);
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hora">Hora</SelectItem>
                            <SelectItem value="Dia">Dia</SelectItem>
                            <SelectItem value="Semana">Semana</SelectItem>
                            <SelectItem value="Mês">Mês</SelectItem>
                            <SelectItem value="Unidade">Unidade</SelectItem>
                            <SelectItem value="Episódio">Episódio</SelectItem>
                            <SelectItem value="Projeto">Projeto</SelectItem>
                            <SelectItem value="Verba">Verba</SelectItem>
                            <SelectItem value="Pacote">Pacote</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    {/* Quantidade */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pos.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const qtd = Number(e.target.value) || 0;
                              newData[idx].pos.quantidade = qtd;
                              newData[idx].pos.total = qtd * newData[idx].pos.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[70px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    {/* Valor */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pos.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              const val = Number(e.target.value) || 0;
                              newData[idx].pos.valor = val;
                              newData[idx].pos.total = newData[idx].pos.quantidade * val;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    {/* Total */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      <span className="text-sm font-semibold">
                        {row.pos.total > 0 && formatCurrency(row.pos.total)}
                      </span>
                    </TableCell>
                    
                    {/* TOTAL DE TODAS AS FASES */}
                    <TableCell className={row.isGroup ? "bg-purple-200 dark:bg-purple-900/50 border-l-2 border-gray-300" : "bg-purple-100 dark:bg-purple-900/30 border-l-2 border-gray-300"}>
                      <span className="text-sm font-bold">
                        {formatCurrency(totalRow)}
                      </span>
                    </TableCell>
                    
                    {/* Aprovado */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          type="number"
                          value={row.aprovado}
                          onChange={(e) => updateField(row.id, 'aprovado', Number(e.target.value) || 0)}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-sm">{formatCurrency(row.aprovado)}</span>
                      )}
                    </TableCell>
                    
                    {/* Liberado */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          type="number"
                          value={row.liberado}
                          onChange={(e) => updateField(row.id, 'liberado', Number(e.target.value) || 0)}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-sm">{formatCurrency(row.liberado)}</span>
                      )}
                    </TableCell>
                    
                    {/* Comprometido */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          type="number"
                          value={row.comprometido}
                          onChange={(e) => updateField(row.id, 'comprometido', Number(e.target.value) || 0)}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-sm">{formatCurrency(row.comprometido)}</span>
                      )}
                    </TableCell>
                    
                    {/* Realizado */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          type="number"
                          value={row.realizado}
                          onChange={(e) => updateField(row.id, 'realizado', Number(e.target.value) || 0)}
                          className="h-8 w-[100px] text-right border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-sm">{formatCurrency(row.realizado)}</span>
                      )}
                    </TableCell>
                    
                    {/* Total Gasto (Comprometido + Realizado) */}
                    <TableCell className={row.isGroup ? "bg-pink-100 dark:bg-pink-900/50" : "bg-pink-50 dark:bg-pink-900/30"}>
                      <span className="text-sm font-semibold">
                        {formatCurrency(totalGastoRow)}
                      </span>
                    </TableCell>
                    
                    {/* Saldo Disponível (Liberado - Total Gasto) */}
                    <TableCell className={row.isGroup ? "bg-orange-100 dark:bg-orange-900/50" : "bg-orange-50 dark:bg-orange-900/30"}>
                      <span className="text-sm font-semibold">
                        {formatCurrency(saldoDisponivelRow)}
                      </span>
                    </TableCell>
                    
                    {/* Observação */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit && !row.isGroup ? (
                        <Input
                          value={row.observacao}
                          onChange={(e) => updateField(row.id, 'observacao', e.target.value)}
                          className="h-8 text-sm italic border-2 border-gray-300 hover:border-purple-400 focus:border-purple-600 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.observacao}</span>
                      )}
                    </TableCell>
                    
                    {/* Ações */}
                    <TableCell>
                      {!row.isGroup && canEdit && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              ︙
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => duplicarLinha(row)}>
                              Duplicar linha
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => excluirLinha(row.id)}
                              className="text-destructive"
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Rodapé com resumo */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Aprovado</p>
              <p className="text-lg font-semibold">
                {formatCurrency(totalAprovado)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Liberado</p>
              <p className="text-lg font-semibold">
                {formatCurrency(totalLiberado)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Comprometido</p>
              <p className="text-lg font-semibold">
                {formatCurrency(totalComprometido)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Realizado</p>
              <p className="text-lg font-semibold">
                {formatCurrency(totalRealizado)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Gasto</p>
              <p className="text-lg font-semibold text-pink-600">
                {formatCurrency(totalGasto)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Saldo Disponível</p>
              <p className={`text-lg font-semibold ${saldoDisponivel >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(saldoDisponivel)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
