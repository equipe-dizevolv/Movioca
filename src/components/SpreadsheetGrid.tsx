import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "./ui/input";

export interface Column {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  type?: "text" | "number" | "currency";
}

export interface SpreadsheetGridProps {
  columns: Column[];
  data: any[];
  onCellEdit: (rowIndex: number, columnKey: string, newValue: any) => void;
  editableColumns?: string[];
  readonlyColumns?: string[];
  calculatedColumns?: { [key: string]: (row: any) => any };
  className?: string;
}

interface CellPosition {
  row: number;
  col: number;
}

interface SelectionRange {
  start: CellPosition;
  end: CellPosition;
}

interface HistoryEntry {
  type: "edit" | "delete" | "paste";
  changes: Array<{
    row: number;
    col: string;
    oldValue: any;
    newValue: any;
  }>;
}

export default function SpreadsheetGrid({
  columns,
  data,
  onCellEdit,
  editableColumns = [],
  readonlyColumns = [],
  calculatedColumns = {},
  className = "",
}: SpreadsheetGridProps) {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [editValue, setEditValue] = useState("");
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clipboard, setClipboard] = useState<any>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Verifica se uma coluna é editável
  const isColumnEditable = useCallback(
    (columnKey: string) => {
      if (readonlyColumns.includes(columnKey)) return false;
      if (Object.keys(calculatedColumns).includes(columnKey)) return false;
      if (editableColumns.length === 0) return true;
      return editableColumns.includes(columnKey);
    },
    [editableColumns, readonlyColumns, calculatedColumns]
  );

  // Verifica se uma célula está selecionada (dentro do range)
  const isCellInRange = useCallback(
    (row: number, col: number) => {
      if (!selectionRange) return false;
      const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
      const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
      const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
      const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);
      return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
    },
    [selectionRange]
  );

  // Obtém valor da célula
  const getCellValue = useCallback(
    (row: number, columnKey: string) => {
      if (calculatedColumns[columnKey]) {
        return calculatedColumns[columnKey](data[row]);
      }
      return data[row]?.[columnKey] ?? "";
    },
    [data, calculatedColumns]
  );

  // Formata valor para exibição
  const formatCellValue = useCallback((value: any, column: Column) => {
    if (value === null || value === undefined || value === "") return "";
    
    if (column.type === "currency") {
      const num = typeof value === "number" ? value : parseFloat(value);
      if (isNaN(num)) return value;
      return num.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    
    if (column.type === "number") {
      const num = typeof value === "number" ? value : parseFloat(value);
      if (isNaN(num)) return value;
      return num.toLocaleString("pt-BR");
    }
    
    return value;
  }, []);

  // Move seleção para célula específica
  const moveSelection = useCallback(
    (row: number, col: number) => {
      const maxRow = data.length - 1;
      const maxCol = columns.length - 1;

      const newRow = Math.max(0, Math.min(row, maxRow));
      const newCol = Math.max(0, Math.min(col, maxCol));

      setSelectedCell({ row: newRow, col: newCol });
      setSelectionRange(null);
      setEditingCell(null);
    },
    [data.length, columns.length]
  );

  // Inicia edição da célula
  const startEditing = useCallback(() => {
    if (!selectedCell) return;
    const columnKey = columns[selectedCell.col].key;
    if (!isColumnEditable(columnKey)) return;

    const currentValue = getCellValue(selectedCell.row, columnKey);
    setEditValue(String(currentValue));
    setEditingCell(selectedCell);

    // Foca no input após um pequeno delay
    setTimeout(() => {
      const cellKey = `${selectedCell.row}-${selectedCell.col}`;
      cellRefs.current[cellKey]?.focus();
      cellRefs.current[cellKey]?.select();
    }, 0);
  }, [selectedCell, columns, isColumnEditable, getCellValue]);

  // Salva edição da célula
  const saveEdit = useCallback(
    (value: string) => {
      if (!editingCell) return;

      const columnKey = columns[editingCell.col].key;
      const oldValue = getCellValue(editingCell.row, columnKey);
      
      // Converte valor baseado no tipo da coluna
      let newValue: any = value;
      const column = columns[editingCell.col];
      
      if (column.type === "number" || column.type === "currency") {
        // Remove formatação de moeda/número
        const cleanValue = value.replace(/[^\d,-]/g, "").replace(",", ".");
        newValue = cleanValue === "" ? "" : parseFloat(cleanValue);
        if (isNaN(newValue)) newValue = 0;
      }

      if (oldValue !== newValue) {
        // Adiciona ao histórico
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({
          type: "edit",
          changes: [
            {
              row: editingCell.row,
              col: columnKey,
              oldValue,
              newValue,
            },
          ],
        });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        onCellEdit(editingCell.row, columnKey, newValue);
      }

      setEditingCell(null);
    },
    [editingCell, columns, getCellValue, onCellEdit, history, historyIndex]
  );

  // Cancela edição
  const cancelEdit = useCallback(() => {
    setEditingCell(null);
    setEditValue("");
  }, []);

  // Limpa célula(s) selecionada(s)
  const clearSelection = useCallback(() => {
    if (!selectedCell && !selectionRange) return;

    const changes: Array<{ row: number; col: string; oldValue: any; newValue: any }> = [];

    if (selectionRange) {
      const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
      const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
      const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
      const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const columnKey = columns[col].key;
          if (isColumnEditable(columnKey)) {
            const oldValue = getCellValue(row, columnKey);
            changes.push({ row, col: columnKey, oldValue, newValue: "" });
            onCellEdit(row, columnKey, "");
          }
        }
      }
    } else if (selectedCell) {
      const columnKey = columns[selectedCell.col].key;
      if (isColumnEditable(columnKey)) {
        const oldValue = getCellValue(selectedCell.row, columnKey);
        changes.push({
          row: selectedCell.row,
          col: columnKey,
          oldValue,
          newValue: "",
        });
        onCellEdit(selectedCell.row, columnKey, "");
      }
    }

    if (changes.length > 0) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ type: "delete", changes });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [selectedCell, selectionRange, columns, isColumnEditable, getCellValue, onCellEdit, history, historyIndex]);

  // Copia seleção para clipboard
  const copySelection = useCallback(() => {
    if (!selectedCell && !selectionRange) return;

    const copiedData: any[][] = [];

    if (selectionRange) {
      const minRow = Math.min(selectionRange.start.row, selectionRange.end.row);
      const maxRow = Math.max(selectionRange.start.row, selectionRange.end.row);
      const minCol = Math.min(selectionRange.start.col, selectionRange.end.col);
      const maxCol = Math.max(selectionRange.start.col, selectionRange.end.col);

      for (let row = minRow; row <= maxRow; row++) {
        const rowData: any[] = [];
        for (let col = minCol; col <= maxCol; col++) {
          const columnKey = columns[col].key;
          rowData.push(getCellValue(row, columnKey));
        }
        copiedData.push(rowData);
      }
    } else if (selectedCell) {
      const columnKey = columns[selectedCell.col].key;
      copiedData.push([getCellValue(selectedCell.row, columnKey)]);
    }

    setClipboard(copiedData);

    // Tenta copiar para o clipboard do sistema
    try {
      const text = copiedData.map((row) => row.join("\t")).join("\n");
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Erro ao copiar para clipboard:", err);
    }
  }, [selectedCell, selectionRange, columns, getCellValue]);

  // Cola do clipboard
  const pasteClipboard = useCallback(() => {
    if (!clipboard || !selectedCell) return;

    const changes: Array<{ row: number; col: string; oldValue: any; newValue: any }> = [];
    let currentRow = selectedCell.row;

    for (const rowData of clipboard) {
      if (currentRow >= data.length) break;
      let currentCol = selectedCell.col;

      for (const value of rowData) {
        if (currentCol >= columns.length) break;
        const columnKey = columns[currentCol].key;

        if (isColumnEditable(columnKey)) {
          const oldValue = getCellValue(currentRow, columnKey);
          changes.push({ row: currentRow, col: columnKey, oldValue, newValue: value });
          onCellEdit(currentRow, columnKey, value);
        }

        currentCol++;
      }
      currentRow++;
    }

    if (changes.length > 0) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ type: "paste", changes });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [clipboard, selectedCell, data.length, columns, isColumnEditable, getCellValue, onCellEdit, history, historyIndex]);

  // Desfazer ação
  const undo = useCallback(() => {
    if (historyIndex < 0) return;

    const entry = history[historyIndex];
    for (const change of entry.changes) {
      onCellEdit(change.row, change.col, change.oldValue);
    }

    setHistoryIndex(historyIndex - 1);
  }, [history, historyIndex, onCellEdit]);

  // Refazer ação
  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const entry = history[historyIndex + 1];
    for (const change of entry.changes) {
      onCellEdit(change.row, change.col, change.newValue);
    }

    setHistoryIndex(historyIndex + 1);
  }, [history, historyIndex, onCellEdit]);

  // Handler de teclado global
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!selectedCell && !editingCell) return;

      // Modo de edição
      if (editingCell) {
        if (e.key === "Escape") {
          e.preventDefault();
          cancelEdit();
          return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          saveEdit(editValue);
          moveSelection(selectedCell?.row ? selectedCell.row + 1 : 0, selectedCell?.col ?? 0);
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          saveEdit(editValue);
          if (e.shiftKey) {
            moveSelection(selectedCell?.row ?? 0, (selectedCell?.col ?? 0) - 1);
          } else {
            moveSelection(selectedCell?.row ?? 0, (selectedCell?.col ?? 0) + 1);
          }
          return;
        }
        return; // Outras teclas são gerenciadas pelo input
      }

      // Modo de navegação
      const current = selectedCell || { row: 0, col: 0 };

      // Ctrl+C: Copiar
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        copySelection();
        return;
      }

      // Ctrl+V: Colar
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        pasteClipboard();
        return;
      }

      // Ctrl+X: Recortar
      if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        copySelection();
        clearSelection();
        return;
      }

      // Ctrl+Z: Desfazer
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl+Y: Refazer
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl+A: Selecionar tudo
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        setSelectionRange({
          start: { row: 0, col: 0 },
          end: { row: data.length - 1, col: columns.length - 1 },
        });
        return;
      }

      // Delete: Limpar
      if (e.key === "Delete") {
        e.preventDefault();
        clearSelection();
        return;
      }

      // Backspace: Limpar e editar
      if (e.key === "Backspace") {
        e.preventDefault();
        clearSelection();
        startEditing();
        return;
      }

      // Enter: Editar ou mover para baixo
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          moveSelection(current.row - 1, current.col);
        } else {
          startEditing();
        }
        return;
      }

      // Tab: Mover horizontal
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          moveSelection(current.row, current.col - 1);
        } else {
          moveSelection(current.row, current.col + 1);
        }
        return;
      }

      // Setas
      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveSelection(current.row - 1, current.col);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveSelection(current.row + 1, current.col);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveSelection(current.row, current.col - 1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveSelection(current.row, current.col + 1);
        return;
      }

      // Home/End
      if (e.key === "Home") {
        e.preventDefault();
        if (e.ctrlKey) {
          moveSelection(0, 0);
        } else {
          moveSelection(current.row, 0);
        }
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        if (e.ctrlKey) {
          moveSelection(data.length - 1, columns.length - 1);
        } else {
          moveSelection(current.row, columns.length - 1);
        }
        return;
      }

      // Qualquer letra/número: inicia edição
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const columnKey = columns[current.col].key;
        if (isColumnEditable(columnKey)) {
          setEditValue(e.key);
          setEditingCell(current);
          setTimeout(() => {
            const cellKey = `${current.row}-${current.col}`;
            cellRefs.current[cellKey]?.focus();
          }, 0);
        }
      }
    },
    [
      selectedCell,
      editingCell,
      editValue,
      columns,
      data.length,
      cancelEdit,
      saveEdit,
      moveSelection,
      copySelection,
      pasteClipboard,
      clearSelection,
      undo,
      redo,
      startEditing,
      isColumnEditable,
    ]
  );

  // Handler de click em célula
  const handleCellClick = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      e.preventDefault();

      if (e.shiftKey && selectedCell) {
        // Shift+Click: seleciona range
        setSelectionRange({
          start: selectedCell,
          end: { row, col },
        });
      } else if (e.ctrlKey) {
        // Ctrl+Click: seleção múltipla (simplificado como range)
        if (selectedCell) {
          setSelectionRange({
            start: selectedCell,
            end: { row, col },
          });
        } else {
          setSelectedCell({ row, col });
        }
      } else {
        // Click normal
        setSelectedCell({ row, col });
        setSelectionRange(null);
        setEditingCell(null);
      }
    },
    [selectedCell]
  );

  // Handler de duplo click
  const handleCellDoubleClick = useCallback(
    (row: number, col: number) => {
      const columnKey = columns[col].key;
      if (!isColumnEditable(columnKey)) return;

      setSelectedCell({ row, col });
      setSelectionRange(null);
      
      const currentValue = getCellValue(row, columnKey);
      setEditValue(String(currentValue));
      setEditingCell({ row, col });

      setTimeout(() => {
        const cellKey = `${row}-${col}`;
        cellRefs.current[cellKey]?.focus();
        cellRefs.current[cellKey]?.select();
      }, 0);
    },
    [columns, isColumnEditable, getCellValue]
  );

  // Handler de mouse down para arrastar
  const handleMouseDown = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      if (e.shiftKey || e.ctrlKey) return;
      setIsDragging(true);
      setSelectedCell({ row, col });
      setSelectionRange({ start: { row, col }, end: { row, col } });
    },
    []
  );

  // Handler de mouse move durante arraste
  const handleMouseMove = useCallback(
    (row: number, col: number) => {
      if (!isDragging || !selectionRange) return;
      setSelectionRange({
        ...selectionRange,
        end: { row, col },
      });
    },
    [isDragging, selectionRange]
  );

  // Handler de mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Adiciona listener global para mouse up
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  // Foca no grid quando montado
  useEffect(() => {
    if (gridRef.current && !selectedCell) {
      setSelectedCell({ row: 0, col: 0 });
    }
  }, []);

  return (
    <div
      ref={gridRef}
      className={`spreadsheet-grid overflow-auto border border-gray-200 rounded-lg ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, colIndex) => (
              <th
                key={column.key}
                className="border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 sticky top-0 bg-gray-50 z-10"
                style={{ width: column.width || "auto", textAlign: column.align || "left" }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50/50">
              {columns.map((column, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                const isInRange = isCellInRange(rowIndex, colIndex);
                const isReadonly = !isColumnEditable(column.key);
                const cellValue = getCellValue(rowIndex, column.key);
                const displayValue = formatCellValue(cellValue, column);
                const cellKey = `${rowIndex}-${colIndex}`;

                return (
                  <td
                    key={column.key}
                    className={`border border-gray-200 px-3 py-2 text-sm relative ${
                      isReadonly ? "bg-gray-50 text-gray-600" : ""
                    } ${isInRange && !isEditing ? "bg-blue-50" : ""} ${
                      isSelected && !isEditing ? "ring-2 ring-purple-500 ring-inset" : ""
                    } ${isEditing ? "bg-purple-50" : ""}`}
                    style={{ textAlign: column.align || "left" }}
                    onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                    onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)}
                    onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
                  >
                    {isEditing ? (
                      <Input
                        ref={(el) => (cellRefs.current[cellKey] = el)}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => saveEdit(editValue)}
                        className="w-full h-full border-0 p-0 focus:ring-0 bg-transparent"
                        style={{ textAlign: column.align || "left" }}
                      />
                    ) : (
                      <div className="w-full">{displayValue}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
