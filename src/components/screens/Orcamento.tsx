import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Plus, Search, MoreVertical, ChevronDown, ChevronRight, Users, Download, Lock, Keyboard } from "lucide-react@0.487.0";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";
import { useSpreadsheetNavigation } from "../../hooks/useSpreadsheetNavigation";
import { CardCarousel } from "../CardCarousel";
import { ToolbarCarousel } from "../ToolbarCarousel";

/**
 * ============================================================================
 * LÓGICA DE INTEGRAÇÃO: ORÇAMENTO ↔ CONTRATAÇÃO ↔ PAGAMENTO
 * ============================================================================
 * 
 * 1. CONGELAMENTO E CONTINGÊNCIA:
 *    - Ao clicar em "Congelar Orçamento", os valores da coluna LIBERADO são 
 *      copiados e fixados na coluna APROVADO (Congelado) para prestação de contas.
 *    - Após o congelamento, o Administrador/Gerente pode continuar alterando 
 *      os valores na coluna de trabalho (LIBERADO) sem afetar o registro APROVADO.
 *    - Contingência = Aprovado (Congelado) - Liberado (Trabalho)
 * 
 * 2. COLUNAS CALCULADAS:
 *    - Total Gasto (Rosa): Comprometido + Realizado
 *    - Saldo Disponível (Laranja): Liberado - (Comprometido + Realizado)
 * 
 * 3. ATUALIZAÇÃO AUTOMÁTICA POR PARCELA (CRÍTICO):
 *    - COMPROMETIDO: Quando um Contrato é formalizado no módulo de Contratação,
 *      o Valor Total do Contrato é somado à coluna COMPROMETIDO da rúbrica vinculada.
 *    
 *    - REALIZADO: Quando o Financeiro registra a execução de uma parcela do 
 *      pagamento (alterando status para "Realizado" no módulo de Pagamentos),
 *      o sistema deve automaticamente:
 *      a) Subtrair o valor da parcela de COMPROMETIDO
 *      b) Adicionar o valor da parcela em REALIZADO
 * 
 *    Exemplo: Contrato de R$ 50.000 com 5 parcelas de R$ 10.000
 *    - Ao formalizar: Comprometido += R$ 50.000
 *    - Ao pagar 1ª parcela: Comprometido -= R$ 10.000, Realizado += R$ 10.000
 *    - Ao pagar 2ª parcela: Comprometido -= R$ 10.000, Realizado += R$ 10.000
 *    - ... e assim sucessivamente até todas as parcelas serem pagas
 * 
 * ============================================================================
 */

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
  isSubItem?: boolean; // Novo: indica se é um sub-item
  subItems?: BudgetRow[]; // Novo: armazena sub-itens
}

export default function Orcamento() {
  const { hasPermission, currentUser } = useAuth();
  const canEdit = hasPermission((role) => 
    ['Administrador', 'Produção Executiva Interna', 'Controladoria Interna', 
     'Produção Executiva Dedicada', 'Financeiro'].includes(role)
  );
  const [selectedProject, setSelectedProject] = useState("Projeto Alpha");
  const [gestaoFilters, setGestaoFilters] = useState<string[]>(["Movioca", "Executiva", "Produção", "Pós", "Arte"]);
  const [faseFilters, setFaseFilters] = useState<string[]>(["Desenvolvimento", "Pré-produção", "Produção", "Pós-produção"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["001", "002", "003", "004", "005"]);
  const [selectedItem, setSelectedItem] = useState<BudgetRow | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState("");
  const [openNovaRubrica, setOpenNovaRubrica] = useState(false);
  const [openEditarRubrica, setOpenEditarRubrica] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAtribuirGestao, setOpenAtribuirGestao] = useState(false);
  
  // Estados para edição inline de células
  const [editingCell, setEditingCell] = useState<{rowId: string, field: string, phase?: string} | null>(null);
  const [editingValue, setEditingValue] = useState<string | number>("");
  const [novaGestao, setNovaGestao] = useState("");
  const [valorLiberadoDelegacao, setValorLiberadoDelegacao] = useState(""); // Novo: teto de valor na delegação
  const [openNovoOrcamento, setOpenNovoOrcamento] = useState(false);
  const [orcamentoCongelado, setOrcamentoCongelado] = useState(false);
  const [openCongelarConfirm, setOpenCongelarConfirm] = useState(false);
  
  // Ref para a tabela e navegação spreadsheet
  const tableRef = useRef<HTMLTableElement>(null);
  
  // Form values for Nova Rúbrica
  const [novaRubricaGestao, setNovaRubricaGestao] = useState("");
  const [novaRubricaCodigo, setNovaRubricaCodigo] = useState("");
  const [novaRubricaSubcodigo, setNovaRubricaSubcodigo] = useState("");
  const [novaRubricaDescricao, setNovaRubricaDescricao] = useState("");
  const [novaRubricaFornecedor, setNovaRubricaFornecedor] = useState("");

  // Form values for Novo Orçamento
  const [modoCriacao, setModoCriacao] = useState("PLANO");
  const [projetoPLANO, setProjetoPLANO] = useState("");
  const [nomeOrcamentoPLANO, setNomeOrcamentoPLANO] = useState("");
  const [planoContas, setPlanoContas] = useState("");
  const [versaoPlano, setVersaoPlano] = useState("");
  const [observacoesPLANO, setObservacoesPLANO] = useState("");
  const [projetoOrigem, setProjetoOrigem] = useState("");
  const [orcamentoOrigem, setOrcamentoOrigem] = useState("");
  const [projetoDestino, setProjetoDestino] = useState("");
  const [nomeOrcamentoCOPIA, setNomeOrcamentoCOPIA] = useState("");
  const [oqueCopiar, setOqueCopiar] = useState("FULL");
  
  // Form values for Editar Rúbrica
  const [editGestao, setEditGestao] = useState("");
  const [editCodigo, setEditCodigo] = useState("");
  const [editSubcodigo, setEditSubcodigo] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editFornecedor, setEditFornecedor] = useState("");
  const [editObservacao, setEditObservacao] = useState("");


  
  // Estados para edição de observação
  const [editingObservacaoId, setEditingObservacaoId] = useState<string | null>(null);
  const [editingObservacaoValue, setEditingObservacaoValue] = useState("");

  // Complete budget data
  const [budgetData, setBudgetData] = useState<BudgetRow[]>([
    // 001 ROTEIRO
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
      pro: { item: "1", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "1", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
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
      des: { item: "1", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "3", unidade: "Semana", quantidade: 3, valor: 3000, total: 9000 },
      pro: { item: "2", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "1", unidade: "Semana", quantidade: 0, valor: 0, total: 0 },
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
    // 002 CESSÃO DE DIREITOS
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
      pre: { item: "2", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      pro: { item: "3", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      pos: { item: "1", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      aprovado: 15000,
      liberado: 12000,
      comprometido: 10000,
      realizado: 8000,
      observacao: "",
      status: "Aprovado",
      parentId: "002",
    },
    // 003 DIREÇÃO
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
      liberado: 70000,
      comprometido: 60000,
      realizado: 50000,
      observacao: "",
      status: "Aprovado",
      isGroup: true,
    },
    {
      id: "003.00101",
      gestao: "Executiva",
      codigo: "003.001",
      subcodigo: "01",
      descricao: "Diretor(a)",
      fornecedor: "Produtora XYZ",
      des: { item: "1", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      pre: { item: "2", unidade: "Projeto", quantidade: 1, valor: 25000, total: 25000 },
      pro: { item: "3", unidade: "Projeto", quantidade: 1, valor: 25000, total: 25000 },
      pos: { item: "2", unidade: "Projeto", quantidade: 0, valor: 0, total: 0 },
      aprovado: 50000,
      liberado: 45000,
      comprometido: 40000,
      realizado: 35000,
      observacao: "Contrato assinado",
      status: "Aprovado",
      parentId: "003",
    },
  ]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleRowCheckbox = (rowId: string, checked: boolean) => {
    const row = budgetData.find(r => r.id === rowId);
    if (!row) return;

    if (row.isGroup) {
      // Se é um grupo, seleciona/deseleciona todos os filhos
      const childrenIds = budgetData
        .filter(r => r.parentId === rowId)
        .map(r => r.id);
      
      if (checked) {
        setSelectedRows([...new Set([...selectedRows, rowId, ...childrenIds])]);
      } else {
        setSelectedRows(selectedRows.filter(id => id !== rowId && !childrenIds.includes(id)));
      }
    } else {
      // Se é um item normal
      if (checked) {
        setSelectedRows([...selectedRows, rowId]);
      } else {
        setSelectedRows(selectedRows.filter(id => id !== rowId));
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(budgetData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleAtribuirGestao = () => {
    if (!novaGestao || selectedRows.length === 0) return;
    
    // Atualiza a gestão das linhas selecionadas
    const updatedCount = selectedRows.length;
    
    let mensagem = `Gestão atualizada em ${updatedCount} linha(s) selecionada(s).`;
    
    if (valorLiberadoDelegacao) {
      console.log(`Atribuindo gestão "${novaGestao}" com teto de ${valorLiberadoDelegacao} para ${updatedCount} linha(s)`, selectedRows);
      mensagem += ` Valor liberado: ${valorLiberadoDelegacao}`;
    } else {
      console.log(`Atribuindo gestão "${novaGestao}" para ${updatedCount} linha(s)`, selectedRows);
    }
    
    // Fecha o modal e limpa a seleção
    setOpenAtribuirGestao(false);
    setSelectedRows([]);
    setNovaGestao("");
    setValorLiberadoDelegacao("");
    
    // Mostra toast de sucesso
    toast.success(mensagem);
  };

  const handleGestaoChange = (rowId: string, newGestao: string) => {
    console.log(`Alterando gestão da linha ${rowId} para ${newGestao}`);
    // Lógica para atualizar gestão individual
  };

  const handleUnidadeChange = (rowId: string, phase: string, newUnidade: string) => {
    setBudgetData(prevData => {
      return prevData.map(row => {
        if (row.id !== rowId) return row;
        
        const newRow = { ...row };
        const phaseKey = phase === "Desenvolvimento" ? "des" : 
                        phase === "Pré-produção" ? "pre" :
                        phase === "Produção" ? "pro" : "pos";
        
        newRow[phaseKey] = { ...newRow[phaseKey], unidade: newUnidade };
        return newRow;
      });
    });
    toast.success("Unidade atualizada!");
  };

  const handleDuplicarLinha = (row: BudgetRow) => {
    const currentSubcodigo = row.subcodigo || "00";
    const nextNumber = parseInt(currentSubcodigo) + 1;
    const nextSubcodigo = String(nextNumber).padStart(2, '0');
    console.log("Duplicando linha:", row, "Próximo subcódigo:", nextSubcodigo);
    toast.success(`Linha duplicada com sucesso! Novo subcódigo: .${nextSubcodigo}`);
  };

  const handleNovaRubrica = () => {
    console.log("Criando nova rubrica:", {
      gestao: novaRubricaGestao,
      codigo: novaRubricaCodigo,
      subcodigo: novaRubricaSubcodigo,
      descricao: novaRubricaDescricao,
      fornecedor: novaRubricaFornecedor
    });
    setOpenNovaRubrica(false);
    setNovaRubricaGestao("");
    setNovaRubricaCodigo("");
    setNovaRubricaSubcodigo("");
    setNovaRubricaDescricao("");
    setNovaRubricaFornecedor("");
  };

  const toggleGestaoFilter = (gestao: string) => {
    setGestaoFilters(prev =>
      prev.includes(gestao)
        ? prev.filter(g => g !== gestao)
        : [...prev, gestao]
    );
  };

  const toggleFaseFilter = (fase: string) => {
    setFaseFilters(prev =>
      prev.includes(fase)
        ? prev.filter(f => f !== fase)
        : [...prev, fase]
    );
  };

  const filteredData = useMemo(() => {
    return budgetData.filter(row => {
      // Filtro de gestão
      if (!gestaoFilters.includes(row.gestao)) return false;
      
      // Filtro de busca
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          row.codigo.toLowerCase().includes(search) ||
          row.descricao.toLowerCase().includes(search) ||
          row.fornecedor.toLowerCase().includes(search)
        );
      }
      
      return true;
    });
  }, [searchTerm, gestaoFilters]);

  const visibleRows = useMemo(() => {
    return filteredData.filter((row) => {
      if (row.isGroup) return true;
      if (!row.parentId) return true;
      return expandedGroups.includes(row.parentId);
    });
  }, [filteredData, expandedGroups]);

  const totals = useMemo(() => {
    const sum = filteredData.reduce(
      (acc, row) => {
        if (!row.isGroup) {
          acc.aprovado += row.aprovado;
          acc.liberado += row.liberado;
          acc.comprometido += row.comprometido;
          acc.realizado += row.realizado;
        }
        return acc;
      },
      { aprovado: 0, liberado: 0, comprometido: 0, realizado: 0 }
    );
    
    // Coluna Rosa: Comprometido + Realizado (Total Gasto)
    const totalGasto = sum.comprometido + sum.realizado;
    
    // Coluna Laranja: Saldo Disponível = Liberado - (Comprometido + Realizado)
    const saldoDisponivel = sum.liberado - totalGasto;
    
    // Contingência = Aprovado - Liberado
    const contingencia = sum.aprovado - sum.liberado;
    
    return { ...sum, totalGasto, saldoDisponivel, contingencia };
  }, [filteredData]);

  // Hook de navegação spreadsheet
  const {
    selectedCell,
    isEditing: isSpreadsheetEditing,
    setIsEditing: setIsSpreadsheetEditing,
    handleKeyDown: handleSpreadsheetKeyDown,
    isCellSelected,
    isCellEditing,
  } = useSpreadsheetNavigation(tableRef, {
    totalRows: visibleRows.length,
    totalCols: 18, // Colunas: Checkbox, Gestão, Código, Descrição, Fornecedor, 4 fases (cada uma com 3 subcolunas), Total, Aprovado, Liberado, Comprometido, Realizado, Total Gasto, Saldo Disp, Observação, Ações
    editableCols: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16], // Descrição, Fornecedor, fases, totais, observação
  });

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  };

  const handleEditRubrica = (item: BudgetRow) => {
    setSelectedItem(item);
    setEditGestao(item.gestao);
    setEditCodigo(item.codigo);
    setEditSubcodigo(item.subcodigo);
    setEditDescricao(item.descricao);
    setEditFornecedor(item.fornecedor);
    setEditObservacao(item.observacao);
    setOpenEditarRubrica(true);
  };

  const handleSaveRubrica = () => {
    // Validação: subcódigo deve ter formato .01, .02, etc
    if (editSubcodigo && !/^\d{2}$/.test(editSubcodigo)) {
      toast.error("Subcódigo deve ter formato numérico de 2 dígitos (ex: 01, 02, 03)");
      return;
    }

    console.log("Salvando rúbrica:", {
      gestao: editGestao,
      codigo: editCodigo, // não editável (mantido original)
      subcodigo: editSubcodigo,
      descricao: editDescricao, // não editável (mantido original)
      fornecedor: editFornecedor
    });
    
    toast.success("Rúbrica editada com sucesso!");
    setOpenEditarRubrica(false);
  };

  const handleDeleteItem = (item: BudgetRow) => {
    setSelectedItem(item);
    setDeleteConfirmCode("");
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmCode === selectedItem?.codigo) {
      console.log("Excluindo rubrica:", selectedItem);
      toast.success(`Rúbrica ${selectedItem.codigo} excluída com sucesso!`);
      setOpenDelete(false);
      setDeleteConfirmCode("");
    }
  };

  // Edição inline de células - FUNCIONAL COMPLETA
  const startEditCell = (rowId: string, field: string, currentValue: any, phase?: string) => {
    setEditingCell({ rowId, field, phase });
    setEditingValue(currentValue ?? "");
  };

  const saveEditCell = (rowId: string, field: string, phase?: string, moveToNext?: 'tab' | 'enter' | 'shift-tab') => {
    if (!editingCell) return;
    
    // Atualizar budgetData com o novo valor
    setBudgetData(prevData => {
      return prevData.map(row => {
        if (row.id !== rowId) return row;
        
        const newRow = { ...row };
        
        if (phase) {
          // Edição de campos de fase (des, pre, pro, pos)
          const phaseKey = phase === "Desenvolvimento" ? "des" : 
                          phase === "Pré-produção" ? "pre" :
                          phase === "Produção" ? "pro" : "pos";
          
          newRow[phaseKey] = { ...newRow[phaseKey] };
          
          if (field === "item") {
            newRow[phaseKey].item = String(editingValue);
          } else if (field === "quantidade") {
            const quantidade = Number(editingValue) || 0;
            newRow[phaseKey].quantidade = quantidade;
            // Recalcular total automaticamente
            newRow[phaseKey].total = quantidade * newRow[phaseKey].valor;
          } else if (field === "valor") {
            const valor = Number(editingValue) || 0;
            newRow[phaseKey].valor = valor;
            // Recalcular total automaticamente
            newRow[phaseKey].total = newRow[phaseKey].quantidade * valor;
          }
        }
        
        return newRow;
      });
    });
    
    toast.success("Valor atualizado!");
    
    // Navegação após salvar
    if (moveToNext) {
      navigateToNextCell(rowId, field, phase, moveToNext);
    } else {
      setEditingCell(null);
      setEditingValue("");
    }
  };

  const cancelEditCell = () => {
    setEditingCell(null);
    setEditingValue("");
  };

  // Navegação entre células
  const navigateToNextCell = (currentRowId: string, currentField: string, currentPhase?: string, direction: 'tab' | 'enter' | 'shift-tab' = 'tab') => {
    const editableFields = ['item', 'quantidade', 'valor'];
    const phases = ['Desenvolvimento', 'Pré-produção', 'Produção', 'Pós-produção'];
    
    // Encontrar índice da linha atual
    const rowIndex = budgetData.findIndex(r => r.id === currentRowId);
    if (rowIndex === -1) {
      setEditingCell(null);
      return;
    }
    
    if (direction === 'enter') {
      // Enter: mover para baixo (mesma coluna/fase/campo)
      let nextRowIndex = rowIndex + 1;
      while (nextRowIndex < budgetData.length) {
        const nextRow = budgetData[nextRowIndex];
        if (!nextRow.isGroup) {
          // Encontrou próxima linha editável
          const phaseKey = currentPhase === "Desenvolvimento" ? "des" : 
                          currentPhase === "Pré-produção" ? "pre" :
                          currentPhase === "Produção" ? "pro" : "pos";
          const nextValue = currentField === "item" ? nextRow[phaseKey].item :
                           currentField === "quantidade" ? nextRow[phaseKey].quantidade :
                           nextRow[phaseKey].valor;
          
          setEditingCell({ rowId: nextRow.id, field: currentField, phase: currentPhase });
          setEditingValue(nextValue ?? "");
          return;
        }
        nextRowIndex++;
      }
      // Se não encontrou, fecha edição
      setEditingCell(null);
      return;
    }
    
    if (direction === 'tab' || direction === 'shift-tab') {
      // Tab/Shift+Tab: mover horizontalmente
      const currentFieldIndex = editableFields.indexOf(currentField);
      const currentPhaseIndex = currentPhase ? phases.indexOf(currentPhase) : -1;
      
      let nextFieldIndex = currentFieldIndex;
      let nextPhaseIndex = currentPhaseIndex;
      
      if (direction === 'tab') {
        // Mover para direita
        nextFieldIndex++;
        if (nextFieldIndex >= editableFields.length) {
          nextFieldIndex = 0;
          nextPhaseIndex++;
          if (nextPhaseIndex >= phases.length) {
            // Fim das fases, ir para próxima linha
            let nextRowIndex = rowIndex + 1;
            while (nextRowIndex < budgetData.length) {
              const nextRow = budgetData[nextRowIndex];
              if (!nextRow.isGroup) {
                setEditingCell({ rowId: nextRow.id, field: 'item', phase: 'Desenvolvimento' });
                setEditingValue(nextRow.des.item ?? "");
                return;
              }
              nextRowIndex++;
            }
            setEditingCell(null);
            return;
          }
        }
      } else {
        // Mover para esquerda (Shift+Tab)
        nextFieldIndex--;
        if (nextFieldIndex < 0) {
          nextFieldIndex = editableFields.length - 1;
          nextPhaseIndex--;
          if (nextPhaseIndex < 0) {
            // Início das fases, ir para linha anterior
            let prevRowIndex = rowIndex - 1;
            while (prevRowIndex >= 0) {
              const prevRow = budgetData[prevRowIndex];
              if (!prevRow.isGroup) {
                setEditingCell({ rowId: prevRow.id, field: 'valor', phase: 'Pós-produção' });
                setEditingValue(prevRow.pos.valor ?? "");
                return;
              }
              prevRowIndex--;
            }
            setEditingCell(null);
            return;
          }
        }
      }
      
      const nextPhase = phases[nextPhaseIndex];
      const nextField = editableFields[nextFieldIndex];
      const phaseKey = nextPhase === "Desenvolvimento" ? "des" : 
                      nextPhase === "Pré-produção" ? "pre" :
                      nextPhase === "Produção" ? "pro" : "pos";
      const row = budgetData[rowIndex];
      const nextValue = nextField === "item" ? row[phaseKey].item :
                       nextField === "quantidade" ? row[phaseKey].quantidade :
                       row[phaseKey].valor;
      
      setEditingCell({ rowId: currentRowId, field: nextField, phase: nextPhase });
      setEditingValue(nextValue ?? "");
    }
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, rowId: string, field: string, phase?: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEditCell(rowId, field, phase, 'enter');
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEditCell();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        saveEditCell(rowId, field, phase, 'shift-tab');
      } else {
        saveEditCell(rowId, field, phase, 'tab');
      }
    }
  };

  const handleStartEditObservacao = (row: BudgetRow) => {
    setEditingObservacaoId(row.id);
    setEditingObservacaoValue(row.observacao);
  };

  const handleSaveObservacao = (rowId: string) => {
    console.log("Salvando observação:", { rowId, valor: editingObservacaoValue });
    // Aqui você salvaria no backend
    toast.success("Observação atualizada");
    setEditingObservacaoId(null);
    setEditingObservacaoValue("");
  };

  const handleCancelEditObservacao = () => {
    setEditingObservacaoId(null);
    setEditingObservacaoValue("");
  };

  const getPhaseBackgroundClass = (phase: string) => {
    switch (phase) {
      case "Desenvolvimento":
        return "bg-[#E6F0FF] dark:bg-[#143B66]";
      case "Pré-produção":
        return "bg-[#EAF7EE] dark:bg-[#164A2E]";
      case "Produção":
        return "bg-[#EEE9FF] dark:bg-[#2E2157]";
      case "Pós-produção":
        return "bg-[#FFF1E6] dark:bg-[#5A2E12]";
      default:
        return "";
    }
  };

  // Retorna cor mais escura para Grandes Itens (linhas de grupo)
  const getPhaseBackgroundClassForGroup = (phase: string) => {
    switch (phase) {
      case "Desenvolvimento":
        return "bg-[#B8D4FF] dark:bg-[#0F2D4D]"; // Azul mais escuro
      case "Pré-produção":
        return "bg-[#C5E6CE] dark:bg-[#0F3820]"; // Verde mais escuro
      case "Produção":
        return "bg-[#D6CAFF] dark:bg-[#1F1642]"; // Roxo mais escuro
      case "Pós-produção":
        return "bg-[#FFD9B8] dark:bg-[#42210B]"; // Laranja mais escuro
      default:
        return "";
    }
  };

  // Função helper para aplicar destaque em células selecionadas
  const getCellClassName = (rowIndex: number, colIndex: number, baseClassName: string = "") => {
    const isSelected = isCellSelected(rowIndex, colIndex);
    const isCurrentlyEditing = isCellEditing(rowIndex, colIndex);
    
    let className = baseClassName;
    if (isSelected && !isCurrentlyEditing) {
      className += " ring-2 ring-purple-500 ring-inset";
    }
    if (isCurrentlyEditing) {
      className += " ring-2 ring-purple-600 ring-inset bg-purple-50 dark:bg-purple-900/20";
    }
    
    return className;
  };

  const handleCollapseAll = () => {
    setExpandedGroups([]);
  };

  const handleExpandAll = () => {
    const allGroupIds = budgetData
      .filter(row => row.isGroup)
      .map(row => row.id);
    setExpandedGroups(allGroupIds);
  };

  const handleCongelarOrcamento = () => {
    // Congela o orçamento, copiando os valores de Liberado para Aprovado
    setOrcamentoCongelado(true);
    setOpenCongelarConfirm(false);
    toast.success("Orçamento congelado com sucesso! Os valores da coluna Liberado foram fixados na coluna Aprovado (Congelado).");
  };

  const handleCriarOrcamento = () => {
    if (modoCriacao === "PLANO") {
      if (!projetoPLANO || !nomeOrcamentoPLANO || !planoContas) {
        toast.error("Preencha os campos obrigatórios");
        return;
      }
      console.log("Criando orçamento a partir do plano de contas:", {
        projeto: projetoPLANO,
        nome: nomeOrcamentoPLANO,
        planoContas,
        versaoPlano,
        observacoes: observacoesPLANO
      });
      toast.success("Orçamento criado a partir do plano de contas.");
    } else {
      if (!projetoOrigem || !orcamentoOrigem || !projetoDestino || !nomeOrcamentoCOPIA || !oqueCopiar) {
        toast.error("Preencha os campos obrigatórios");
        return;
      }
      console.log("Copiando orçamento:", {
        projetoOrigem,
        orcamentoOrigem,
        projetoDestino,
        nome: nomeOrcamentoCOPIA,
        modo: oqueCopiar
      });
      toast.success("Orçamento copiado.");
    }
    
    // Limpar formulário
    setOpenNovoOrcamento(false);
    setModoCriacao("PLANO");
    setProjetoPLANO("");
    setNomeOrcamentoPLANO("");
    setPlanoContas("");
    setVersaoPlano("");
    setObservacoesPLANO("");
    setProjetoOrigem("");
    setOrcamentoOrigem("");
    setProjetoDestino("");
    setNomeOrcamentoCOPIA("");
    setOqueCopiar("FULL");
  };

  const handleAdicionarSubItem = (parentItem: BudgetRow) => {
    if (!parentItem) return;
    
    // Encontra todos os sub-itens existentes deste item pai
    const existingSubItems = budgetData.filter(
      row => row.parentId === parentItem.id && row.codigo === parentItem.codigo
    );
    
    // Calcula o próximo número de sub-item
    const nextSubNumber = existingSubItems.length + 1;
    const nextSubCode = nextSubNumber.toString().padStart(2, '0');
    
    console.log("Adicionando sub-item:", {
      parentId: parentItem.id,
      parentCodigo: parentItem.codigo,
      nextSubCode,
      descricao: `${parentItem.descricao} - ${nextSubNumber}`
    });
    
    toast.success(`Sub-item ${parentItem.codigo}.${nextSubCode} criado com sucesso!`);
    
    // Aqui seria a implementação real de adicionar ao array budgetData
    // Por enquanto, apenas mostra o toast de sucesso
  };

  const handleExportarPlanilha = () => {
    try {
      // Prepara os dados para exportação
      const dadosExportacao = filteredData.map(row => ({
        'Código': row.codigo,
        'Subcódigo': row.subcodigo,
        'Descrição': row.descricao,
        'Gestão': row.gestao,
        'Fornecedor': row.fornecedor,
        'DES - Item': row.des.item,
        'DES - Unidade': row.des.unidade,
        'DES - Quantidade': row.des.quantidade,
        'DES - Valor': row.des.valor,
        'DES - Total': row.des.total,
        'PRE - Item': row.pre.item,
        'PRE - Unidade': row.pre.unidade,
        'PRE - Quantidade': row.pre.quantidade,
        'PRE - Valor': row.pre.valor,
        'PRE - Total': row.pre.total,
        'PRO - Item': row.pro.item,
        'PRO - Unidade': row.pro.unidade,
        'PRO - Quantidade': row.pro.quantidade,
        'PRO - Valor': row.pro.valor,
        'PRO - Total': row.pro.total,
        'POS - Item': row.pos.item,
        'POS - Unidade': row.pos.unidade,
        'POS - Quantidade': row.pos.quantidade,
        'POS - Valor': row.pos.valor,
        'POS - Total': row.pos.total,
        'Aprovado': row.aprovado,
        'Liberado': row.liberado,
        'Comprometido': row.comprometido,
        'Realizado': row.realizado,
        'Total Gasto': row.comprometido + row.realizado,
        'Saldo Disponível': row.liberado - (row.comprometido + row.realizado),
        'Observação': row.observacao,
      }));

      // Converte para CSV
      const headers = Object.keys(dadosExportacao[0]);
      const csvContent = [
        headers.join(','),
        ...dadosExportacao.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            // Escapa valores que contêm vírgula ou aspas
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ].join('\n');

      // Cria o blob e faz o download
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orcamento_${selectedProject}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Planilha exportada com sucesso! ${dadosExportacao.length} linhas exportadas.`);
    } catch (error) {
      console.error('Erro ao exportar planilha:', error);
      toast.error('Erro ao exportar planilha. Tente novamente.');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-full">
      {/* Banner de Status - PRD 002 História 5 */}
      {orcamentoCongelado && (
        <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Lock className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Orçamento Aprovado (Congelado)</p>
              <p className="text-sm text-muted-foreground">
                Os valores da coluna "Aprovado" estão fixados. Você pode continuar editando a coluna "Liberado" (Trabalho).
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Contingência disponível</p>
            <p className="text-lg font-semibold text-primary">R$ 150.000,00</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-shrink min-w-0">
          <h2 className="text-3xl text-foreground">Orçamento</h2>
          <p className="text-muted-foreground mt-1">
            Gestão detalhada do orçamento por fases {orcamentoCongelado && <span className="text-primary font-semibold">(Versão de Trabalho)</span>}
          </p>
        </div>
        
        {/* Botões do header com scroll horizontal em mobile */}
        <div className="w-full md:w-auto md:max-w-[50vw] lg:max-w-[650px] xl:max-w-[750px] flex-shrink-0 min-w-0">
          <ToolbarCarousel>
            {!canEdit && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md whitespace-nowrap flex-shrink-0">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Modo visualização - {currentUser?.role}</span>
                <span className="sm:hidden">Visualização</span>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => setOpenCongelarConfirm(true)}
              disabled={orcamentoCongelado || !canEdit}
              className={`whitespace-nowrap flex-shrink-0 ${orcamentoCongelado || !canEdit ? "opacity-50" : ""}`}
            >
              <Lock className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{orcamentoCongelado ? "Orçamento Congelado" : "Congelar Orçamento"}</span>
              <span className="sm:hidden">Congelar</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenAtribuirGestao(true)}
              disabled={selectedRows.length === 0 || !canEdit}
              className="whitespace-nowrap flex-shrink-0"
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Atribuir gestão {selectedRows.length > 0 && `(${selectedRows.length})`}</span>
              <span className="sm:hidden">Atribuir</span>
            </Button>
            
            <Dialog open={openNovoOrcamento} onOpenChange={setOpenNovoOrcamento}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap flex-shrink-0" disabled={!canEdit}>
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Novo orçamento</span>
                  <span className="sm:hidden">Novo</span>
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl" aria-describedby="dialog-criar-orcamento-description">
              <DialogHeader>
                <DialogTitle>Criar orçamento</DialogTitle>
                <DialogDescription id="dialog-criar-orcamento-description">
                  Escolha como deseja criar o novo orçamento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Modo de criação */}
                <div>
                  <Label>Modo de criação <span className="text-destructive">*</span></Label>
                  <RadioGroup value={modoCriacao} onValueChange={setModoCriacao} className="mt-3">
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="PLANO" id="plano" />
                      <Label htmlFor="plano" className="cursor-pointer flex-1">
                        A partir do plano de contas
                        <p className="text-xs text-muted-foreground mt-1">Cria estrutura zerada baseada no plano selecionado</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="COPIA" id="copia" />
                      <Label htmlFor="copia" className="cursor-pointer flex-1">
                        Copiar orçamento existente
                        <p className="text-xs text-muted-foreground mt-1">Duplica estrutura e/ou valores de outro orçamento</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Campos MODO: PLANO */}
                {modoCriacao === "PLANO" && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Projeto <span className="text-destructive">*</span></Label>
                        <Select value={projetoPLANO} onValueChange={setProjetoPLANO}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                            <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                            <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nome do orçamento <span className="text-destructive">*</span></Label>
                        <Input
                          placeholder="Ex: Orçamento v1"
                          value={nomeOrcamentoPLANO}
                          onChange={(e) => setNomeOrcamentoPLANO(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Plano de contas <span className="text-destructive">*</span></Label>
                        <Select value={planoContas} onValueChange={setPlanoContas}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o plano" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ancine">Ancine</SelectItem>
                            <SelectItem value="Netflix v1">Netflix v1</SelectItem>
                            <SelectItem value="Netflix v2">Netflix v2</SelectItem>
                            <SelectItem value="Amazon">Amazon</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Versão do plano</Label>
                        <Input
                          placeholder="Ex: 2024"
                          value={versaoPlano}
                          onChange={(e) => setVersaoPlano(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Observações sobre o orçamento"
                        value={observacoesPLANO}
                        onChange={(e) => setObservacoesPLANO(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Campos MODO: COPIA */}
                {modoCriacao === "COPIA" && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Projeto de origem <span className="text-destructive">*</span></Label>
                        <Select value={projetoOrigem} onValueChange={setProjetoOrigem}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                            <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                            <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Orçamento de origem <span className="text-destructive">*</span></Label>
                        <Select value={orcamentoOrigem} onValueChange={setOrcamentoOrigem}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o orçamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="orc1">Orçamento v1 - Jan/2024</SelectItem>
                            <SelectItem value="orc2">Orçamento v2 - Fev/2024</SelectItem>
                            <SelectItem value="orc3">Orçamento Final - Mar/2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Projeto de destino <span className="text-destructive">*</span></Label>
                        <Select value={projetoDestino} onValueChange={setProjetoDestino}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                            <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                            <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nome do novo orçamento <span className="text-destructive">*</span></Label>
                        <Input
                          placeholder="Ex: Orçamento v2"
                          value={nomeOrcamentoCOPIA}
                          onChange={(e) => setNomeOrcamentoCOPIA(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>O que copiar? <span className="text-destructive">*</span></Label>
                      <RadioGroup value={oqueCopiar} onValueChange={setOqueCopiar} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="FULL" id="full" />
                          <Label htmlFor="full" className="cursor-pointer">Estrutura e valores</Label>
                        </div>
                      </RadioGroup>
                      <p className="text-xs text-muted-foreground mt-2">
                        O orçamento será copiado com toda a estrutura e valores preenchidos
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNovoOrcamento(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleCriarOrcamento}>
                  Criar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </ToolbarCarousel>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Projeto</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                  <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Gestão</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {gestaoFilters.length === 5 ? "Todas" : `${gestaoFilters.length} selecionadas`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    {["Movioca", "Executiva", "Produção", "Pós", "Arte"].map((gestao) => (
                      <div key={gestao} className="flex items-center space-x-2">
                        <Checkbox
                          id={`gestao-${gestao}`}
                          checked={gestaoFilters.includes(gestao)}
                          onCheckedChange={() => toggleGestaoFilter(gestao)}
                        />
                        <label
                          htmlFor={`gestao-${gestao}`}
                          className="text-sm cursor-pointer"
                        >
                          {gestao}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Fase</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {faseFilters.length === 4 ? "Todas" : `${faseFilters.length} selecionadas`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    {["Desenvolvimento", "Pré-produção", "Produção", "Pós-produção"].map((fase) => (
                      <div key={fase} className="flex items-center space-x-2">
                        <Checkbox
                          id={`fase-${fase}`}
                          checked={faseFilters.includes(fase)}
                          onCheckedChange={() => toggleFaseFilter(fase)}
                        />
                        <label
                          htmlFor={`fase-${fase}`}
                          className="text-sm cursor-pointer"
                        >
                          {fase}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Totals Cards - Carrossel Responsivo */}
      <div className="min-h-[200px] pb-8">
        <CardCarousel 
          cardsPerView={{ mobile: 1, desktop: 4 }}
          cards={[
        <Card key="aprovado" className="h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-muted-foreground mb-2">Aprovado</p>
            <p className="text-lg md:text-base font-semibold">{formatCurrency(totals.aprovado)}</p>
          </CardContent>
        </Card>,
        <Card key="liberado" className="h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-muted-foreground mb-2">Liberado</p>
            <p className="text-lg md:text-base font-semibold">{formatCurrency(totals.liberado)}</p>
          </CardContent>
        </Card>,
        <Card key="comprometido" className="h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-muted-foreground mb-2">Comprometido</p>
            <p className="text-lg md:text-base font-semibold">{formatCurrency(totals.comprometido)}</p>
          </CardContent>
        </Card>,
        <Card key="realizado" className="h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-muted-foreground mb-2">Realizado</p>
            <p className="text-lg md:text-base font-semibold">{formatCurrency(totals.realizado)}</p>
          </CardContent>
        </Card>,
        <Card key="total-gasto" className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-pink-700 dark:text-pink-300 mb-2">Total Gasto</p>
            <p className="text-lg md:text-base font-semibold text-pink-800 dark:text-pink-200">{formatCurrency(totals.totalGasto)}</p>
          </CardContent>
        </Card>,
        <Card key="saldo" className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">Saldo Disponível</p>
            <p className={`text-lg md:text-base font-semibold ${totals.saldoDisponivel < 0 ? 'text-destructive' : 'text-orange-800 dark:text-orange-200'}`}>
              {formatCurrency(totals.saldoDisponivel)}
            </p>
          </CardContent>
        </Card>,
        <Card key="contingencia" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 h-auto">
          <CardContent className="pt-5 pb-5 px-2 text-center h-full">
            <p className="text-xs text-purple-700 dark:text-purple-300 mb-2">Contingência</p>
            <p className="text-lg md:text-base font-semibold text-purple-800 dark:text-purple-200">{formatCurrency(totals.contingencia)}</p>
          </CardContent>
        </Card>
      ]} />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar item orçamentário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <ToolbarCarousel>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExpandAll}
              className="whitespace-nowrap flex-shrink-0"
            >
              Expandir tudo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCollapseAll}
              className="whitespace-nowrap flex-shrink-0"
            >
              Colapsar tudo
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedRows.length === 0}
              onClick={() => setOpenAtribuirGestao(true)}
              className="whitespace-nowrap flex-shrink-0"
            >
              <Users className="w-4 h-4 mr-2" />
              Atribuir gestão
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportarPlanilha}
              className="whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar planilha
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 whitespace-nowrap flex-shrink-0"
                >
                  <Keyboard className="w-4 h-4 mr-2" />
                  Atalhos
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Atalhos de Teclado - Navegação Spreadsheet</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Navegação:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">↑ ↓ ← →</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Próxima célula:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Tab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Célula anterior:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Shift + Tab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Editar célula:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Enter / F2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cancelar edição:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Esc</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salvar e descer:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Enter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Início da linha:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Home</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fim da linha:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">End</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Primeira célula:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Ctrl + Home</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última célula:</span>
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">Ctrl + End</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-3 pt-3 border-t">
                    💡 Clique em qualquer célula ou pressione Enter para editar. A célula selecionada fica destacada em roxo.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </ToolbarCarousel>
        </CardContent>
      </Card>

      {/* Budget Table */}
      <Card>
        <CardContent className="pt-6">
          {/* Indicador de navegação spreadsheet */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Célula selecionada:</span>
              {selectedCell ? (
                <span className="text-xs font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                  Linha {selectedCell.row + 1}, Coluna {selectedCell.col + 1}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Nenhuma (clique ou use as setas)
                </span>
              )}
              {isSpreadsheetEditing && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded animate-pulse">
                  ✓ Editando
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground italic">
              💡 Use as setas ↑↓←→ para navegar, Tab para próxima célula, Enter para editar
            </p>
          </div>
          
          <div 
            className="overflow-x-auto max-h-[600px] relative"
            onKeyDown={handleSpreadsheetKeyDown}
            tabIndex={0}
          >
            <Table ref={tableRef}>
              <TableHeader className="sticky top-0 z-10 bg-background">
                {/* Linha 1: Títulos das Fases */}
                <TableRow>
                  <TableHead rowSpan={2} className="w-[50px]">
                    <Checkbox
                      checked={selectedRows.length === budgetData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead rowSpan={2}>Gestão</TableHead>
                  <TableHead rowSpan={2}>Código</TableHead>
                  <TableHead rowSpan={2}>Subcódigo</TableHead>
                  <TableHead rowSpan={2}>Descrição</TableHead>
                  <TableHead rowSpan={2}>Fornecedor</TableHead>
                  <TableHead 
                    colSpan={5} 
                    className={`text-left ${getPhaseBackgroundClass("Desenvolvimento")} border-b-0`}
                  >
                    Desenvolvimento
                  </TableHead>
                  <TableHead 
                    colSpan={5} 
                    className={`text-left ${getPhaseBackgroundClass("Pré-produção")} border-b-0`}
                  >
                    Pré-produção
                  </TableHead>
                  <TableHead 
                    colSpan={5} 
                    className={`text-left ${getPhaseBackgroundClass("Produção")} border-b-0`}
                  >
                    Produção
                  </TableHead>
                  <TableHead 
                    colSpan={5} 
                    className={`text-left ${getPhaseBackgroundClass("Pós-produção")} border-b-0`}
                  >
                    Pós-produção
                  </TableHead>
                  <TableHead rowSpan={2} className="bg-purple-100 dark:bg-purple-900/30">Total</TableHead>
                  <TableHead rowSpan={2}>Aprovado</TableHead>
                  <TableHead rowSpan={2}>Liberado</TableHead>
                  <TableHead rowSpan={2}>Comprometido</TableHead>
                  <TableHead rowSpan={2}>Realizado</TableHead>
                  <TableHead rowSpan={2} className="bg-pink-100 dark:bg-pink-900/30">Total Gasto</TableHead>
                  <TableHead rowSpan={2} className="bg-orange-100 dark:bg-orange-900/30">Saldo Disp.</TableHead>
                  <TableHead rowSpan={2}>Observação</TableHead>
                  <TableHead rowSpan={2}>Ações</TableHead>
                </TableRow>
                {/* Linha 2: Headers das Colunas */}
                <TableRow>
                  <TableHead className={getPhaseBackgroundClass("Desenvolvimento")}>Item</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Desenvolvimento")}>Unidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Desenvolvimento")}>Quantidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Desenvolvimento")}>Valor</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Desenvolvimento")}>Total</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pré-produção")}>Item</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pré-produção")}>Unidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pré-produção")}>Quantidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pré-produção")}>Valor</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pré-produção")}>Total</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Produção")}>Item</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Produção")}>Unidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Produção")}>Quantidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Produção")}>Valor</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Produção")}>Total</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pós-produção")}>Item</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pós-produção")}>Unidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pós-produção")}>Quantidade</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pós-produção")}>Valor</TableHead>
                  <TableHead className={getPhaseBackgroundClass("Pós-produção")}>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    className={row.isGroup ? "font-semibold" : ""}
                  >
                    <TableCell className={getCellClassName(rowIndex, 0, row.isGroup ? "bg-gray-100 dark:bg-gray-800" : "")}>
                      {canEdit && (
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onCheckedChange={(checked) => handleRowCheckbox(row.id, checked as boolean)}
                        />
                      )}
                    </TableCell>
                    <TableCell className={getCellClassName(rowIndex, 1, row.isGroup ? "bg-gray-100 dark:bg-gray-800" : "")}>
                      {!row.isGroup && canEdit && (
                        <Select 
                          value={row.gestao}
                          onValueChange={(value) => handleGestaoChange(row.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
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
                      )}
                      {(!canEdit || row.isGroup) && row.gestao}
                    </TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{row.codigo}</TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{row.subcodigo}</TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      <div className="flex items-center gap-2">
                        {row.isGroup && (
                          <button onClick={() => toggleGroup(row.id)}>
                            {expandedGroups.includes(row.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        {row.descricao}
                      </div>
                    </TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{row.fornecedor}</TableCell>

                    {/* Desenvolvimento */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
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
                          className="h-8 text-sm w-full italic border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
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
                          <SelectTrigger className="w-[100px]">
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
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.des.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].des.quantidade = Number(e.target.value) || 0;
                              newData[idx].des.total = newData[idx].des.quantidade * newData[idx].des.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-20 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.des.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].des.valor = Number(e.target.value) || 0;
                              newData[idx].des.total = newData[idx].des.quantidade * newData[idx].des.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-28 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Desenvolvimento") : getPhaseBackgroundClass("Desenvolvimento")}>
                      {!row.isGroup && row.des.total > 0 && formatCurrency(row.des.total)}
                    </TableCell>

                    {/* Pré-produção */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
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
                          className="h-8 text-sm w-full italic border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
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
                          <SelectTrigger className="w-[100px]">
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
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pre.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pre.quantidade = Number(e.target.value) || 0;
                              newData[idx].pre.total = newData[idx].pre.quantidade * newData[idx].pre.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-20 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pre.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pre.valor = Number(e.target.value) || 0;
                              newData[idx].pre.total = newData[idx].pre.quantidade * newData[idx].pre.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-28 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pré-produção") : getPhaseBackgroundClass("Pré-produção")}>
                      {!row.isGroup && row.pre.total > 0 && formatCurrency(row.pre.total)}
                    </TableCell>

                    {/* Produção */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
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
                          className="h-8 text-sm w-full italic border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
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
                          <SelectTrigger className="w-[100px]">
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
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pro.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pro.quantidade = Number(e.target.value) || 0;
                              newData[idx].pro.total = newData[idx].pro.quantidade * newData[idx].pro.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-20 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pro.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pro.valor = Number(e.target.value) || 0;
                              newData[idx].pro.total = newData[idx].pro.quantidade * newData[idx].pro.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-28 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Produção") : getPhaseBackgroundClass("Produção")}>
                      {!row.isGroup && row.pro.total > 0 && formatCurrency(row.pro.total)}
                    </TableCell>

                    {/* Pós-produção */}
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
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
                          className="h-8 text-sm w-full italic border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="Clique para editar"
                        />
                      )}
                    </TableCell>
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
                          <SelectTrigger className="w-[100px]">
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
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pos.quantidade}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pos.quantidade = Number(e.target.value) || 0;
                              newData[idx].pos.total = newData[idx].pos.quantidade * newData[idx].pos.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-20 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && canEdit && (
                        <Input
                          type="number"
                          value={row.pos.valor}
                          onChange={(e) => {
                            const newData = [...budgetData];
                            const idx = newData.findIndex(r => r.id === row.id);
                            if (idx !== -1) {
                              newData[idx].pos.valor = Number(e.target.value) || 0;
                              newData[idx].pos.total = newData[idx].pos.quantidade * newData[idx].pos.valor;
                              setBudgetData(newData);
                            }
                          }}
                          className="h-8 w-28 text-right border-2 border-gray-400 hover:border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 rounded px-2"
                          placeholder="0.00"
                        />
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? getPhaseBackgroundClassForGroup("Pós-produção") : getPhaseBackgroundClass("Pós-produção")}>
                      {!row.isGroup && row.pos.total > 0 && formatCurrency(row.pos.total)}
                    </TableCell>

                    {/* Total de todas as fases */}
                    <TableCell className={row.isGroup ? "bg-purple-200 dark:bg-purple-900/50" : "bg-purple-100 dark:bg-purple-900/30"}>
                      {!row.isGroup && formatCurrency(row.des.total + row.pre.total + row.pro.total + row.pos.total)}
                    </TableCell>

                    {/* Totais */}
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{formatCurrency(row.aprovado)}</TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{formatCurrency(row.liberado)}</TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{formatCurrency(row.comprometido)}</TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>{formatCurrency(row.realizado)}</TableCell>
                    
                    {/* Total Gasto (Comprometido + Realizado) */}
                    <TableCell className={row.isGroup ? "bg-pink-200 dark:bg-pink-900/50" : "bg-pink-100 dark:bg-pink-900/30"}>
                      {!row.isGroup ? (
                        <span className="font-semibold">
                          {formatCurrency((row.comprometido || 0) + (row.realizado || 0))}
                        </span>
                      ) : (
                        <span>{formatCurrency((row.comprometido || 0) + (row.realizado || 0))}</span>
                      )}
                    </TableCell>
                    
                    {/* Saldo Disponível (Liberado - Total Gasto) */}
                    <TableCell className={row.isGroup ? "bg-orange-200 dark:bg-orange-900/50 text-center px-2" : "bg-orange-100 dark:bg-orange-900/30 text-center px-2"}>
                      {!row.isGroup ? (
                        (() => {
                          const totalGasto = (row.comprometido || 0) + (row.realizado || 0);
                          const saldo = (row.liberado || 0) - totalGasto;
                          return (
                            <span className={saldo < 0 ? "text-red-600 font-semibold" : "text-green-600"}>
                              R$ {saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                          );
                        })()
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {editingObservacaoId === row.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editingObservacaoValue}
                            onChange={(e) => setEditingObservacaoValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveObservacao(row.id);
                              if (e.key === 'Escape') handleCancelEditObservacao();
                            }}
                            className="h-8"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSaveObservacao(row.id)}
                            className="h-8 px-2"
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEditObservacao}
                            className="h-8 px-2"
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        canEdit ? (
                          <div 
                            className="max-w-[200px] truncate cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
                            onClick={() => handleStartEditObservacao(row)}
                            title={row.observacao || "Clique para adicionar observação"}
                          >
                            {row.observacao || <span className="text-muted-foreground italic">Adicionar...</span>}
                          </div>
                        ) : (
                          <div className="max-w-[200px] truncate" title={row.observacao || ""}>
                            {row.observacao || <span className="text-muted-foreground">-</span>}
                          </div>
                        )
                      )}
                    </TableCell>
                    <TableCell className={row.isGroup ? "bg-gray-100 dark:bg-gray-800" : ""}>
                      {canEdit ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              ︙
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditRubrica(row)}>
                              Editar rúbrica
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicarLinha(row)}>
                              Duplicar linha
                            </DropdownMenuItem>
                            {!row.isGroup && (
                              <DropdownMenuItem onClick={() => handleAdicionarSubItem(row)}>
                                Adicionar Sub-item
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDeleteItem(row)}
                              className="text-destructive"
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Congelar Orçamento */}
      <Dialog open={openCongelarConfirm} onOpenChange={setOpenCongelarConfirm}>
        <DialogContent aria-describedby="dialog-congelar-description">
          <DialogHeader>
            <DialogTitle>Confirmar congelamento do orçamento</DialogTitle>
            <DialogDescription id="dialog-congelar-description">
              Esta ação irá fixar todos os valores da coluna <strong>Liberado</strong> na coluna <strong>Aprovado (Congelado)</strong> para fins de prestação de contas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ Atenção:</strong> Após o congelamento, você ainda poderá alterar os valores na coluna de trabalho (Liberado), mas os valores congelados permanecerão fixos para referência da Ancine/Prestação de Contas.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>📊 Cálculo da Contingência:</strong> Após o congelamento, a Contingência será calculada como: <br />
                <code className="mt-1 block">Contingência = Aprovado (Congelado) - Liberado (Trabalho)</code>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCongelarConfirm(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleCongelarOrcamento}>
              <Lock className="w-4 h-4 mr-2" />
              Confirmar Congelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Atribuir Gestão - PRD 002 História 4 */}
      <Dialog open={openAtribuirGestao} onOpenChange={setOpenAtribuirGestao}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="dialog-atribuir-gestao-description">
          <DialogHeader>
            <DialogTitle>Delegar Gestão de Rubricas</DialogTitle>
            <DialogDescription id="dialog-atribuir-gestao-description">
              Atribua a gestão das rubricas selecionadas a um usuário específico (PED ou Equipe Dedicada)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Resumo das Rubricas Selecionadas */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">{selectedRows.length}</span> Rubrica(s) Selecionada(s)
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedRows && selectedRows.length > 0 && selectedRows.map((rowId) => {
                  const row = budgetData.find(r => r.id === rowId);
                  if (!row) return null;
                  return (
                    <div key={rowId} className="flex justify-between items-center text-sm py-1 border-b last:border-0">
                      <span className="text-muted-foreground">{row.codigo}</span>
                      <span className="flex-1 mx-3">{row.descricao}</span>
                      <span className="font-mono text-xs">
                        R$ {row.liberado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between items-center font-semibold">
                <span>Valor Total Liberado:</span>
                <span className="text-primary">
                  R$ {(selectedRows && selectedRows.length > 0 ? selectedRows.reduce((sum, rowId) => {
                    const row = budgetData.find(r => r.id === rowId);
                    return sum + (row?.liberado || 0);
                  }, 0) : 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Seletor de Usuário */}
            <div>
              <Label>Atribuir para <span className="text-destructive">*</span></Label>
              <Select value={novaGestao} onValueChange={setNovaGestao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ana - PED">Ana - Produção Executiva Dedicada</SelectItem>
                  <SelectItem value="Bruno - CD">Bruno - Controladoria Dedicada</SelectItem>
                  <SelectItem value="Luiza - Equipe (Arte)">Luiza - Equipe Dedicada (Arte)</SelectItem>
                  <SelectItem value="Carlos - Equipe (Figurino)">Carlos - Equipe Dedicada (Figurino)</SelectItem>
                  <SelectItem value="Daniela - Equipe (Transporte)">Daniela - Equipe Dedicada (Transporte)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                O usuário selecionado terá acesso exclusivo às rubricas delegadas
              </p>
            </div>

            {/* Valor Liberado (Teto Opcional) */}
            <div>
              <Label>Teto de Valor (Opcional)</Label>
              <Input
                placeholder="Ex: R$ 50.000,00"
                value={valorLiberadoDelegacao}
                onChange={(e) => setValorLiberadoDelegacao(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Define um limite específico para este usuário. Se vazio, assume o valor total liberado das rubricas.
              </p>
            </div>

            {/* Alertas e Informações */}
            <div className="space-y-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>ℹ️ Permissões:</strong> O usuário delegado poderá visualizar e editar APENAS estas rubricas. Você (PEI) mantém permissão total e pode revogar a qualquer momento.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Importante:</strong> O sistema atualizará automaticamente a coluna "Gestão" na matriz orçamentária e filtrará a visualização do usuário delegado.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setOpenAtribuirGestao(false);
              setNovaGestao("");
              setValorLiberadoDelegacao("");
            }}>
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90" 
              onClick={handleAtribuirGestao}
              disabled={!novaGestao}
            >
              <Users className="w-4 h-4 mr-2" />
              Confirmar Delegação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Editar Rúbrica */}
      <Dialog open={openEditarRubrica} onOpenChange={setOpenEditarRubrica}>
        <DialogContent aria-describedby="dialog-editar-rubrica-description">
          <DialogHeader>
            <DialogTitle>Editar rúbrica</DialogTitle>
            <DialogDescription id="dialog-editar-rubrica-description">
              Atualize os detalhes desta rúbrica orçamentária
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Gestão <span className="text-destructive">*</span></Label>
              <Select value={editGestao} onValueChange={setEditGestao}>
                <SelectTrigger>
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
            </div>
            <div>
              <Label>Subcódigo <span className="text-muted-foreground text-xs">(Ex: 01, 02, 03)</span></Label>
              <Input 
                value={editSubcodigo} 
                onChange={(e) => setEditSubcodigo(e.target.value)}
                placeholder="01"
                maxLength={2}
                pattern="\d{2}"
              />
            </div>
            <div>
              <Label>Fornecedor</Label>
              <Input 
                value={editFornecedor} 
                onChange={(e) => setEditFornecedor(e.target.value)}
                placeholder="Digite o nome do fornecedor"
              />
            </div>
            <div className="bg-muted/50 p-3 rounded-md border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Código:</strong> {editCodigo} (não editável)<br />
                <strong>Descrição:</strong> {editDescricao} (definida pelo código do plano de contas)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditarRubrica(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveRubrica}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Excluir rúbrica */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent aria-describedby="dialog-delete-rubrica-description">
          <DialogHeader>
            <DialogTitle>Excluir esta rubrica?</DialogTitle>
            <DialogDescription id="dialog-delete-rubrica-description">
              Confirme a exclusão desta rúbrica do orçamento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
              <p className="text-sm">
                <strong>Rúbrica:</strong> {selectedItem?.codigo} - {selectedItem?.descricao}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Para confirmar a exclusão, digite o código <strong>{selectedItem?.codigo}</strong> abaixo:
            </p>
            <Input
              placeholder="Digite o código"
              value={deleteConfirmCode}
              onChange={(e) => setDeleteConfirmCode(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteConfirmCode !== selectedItem?.codigo}
              className="bg-[#DC2626] hover:bg-[#DC2626]/90"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
