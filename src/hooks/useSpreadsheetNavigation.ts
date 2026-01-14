import { useState, useCallback, useEffect, RefObject } from 'react';

interface CellPosition {
  row: number;
  col: number;
}

interface SpreadsheetNavigationOptions {
  totalRows: number;
  totalCols: number;
  onCellChange?: (row: number, col: number, value: any) => void;
  editableCols?: number[]; // Colunas que podem ser editadas
}

export const useSpreadsheetNavigation = (
  gridRef: RefObject<HTMLTableElement>,
  options: SpreadsheetNavigationOptions
) => {
  const { totalRows, totalCols, onCellChange, editableCols = [] } = options;
  
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Função para mover célula
  const moveCell = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setSelectedCell(prev => {
      if (!prev) return null;

      let newRow = prev.row;
      let newCol = prev.col;

      switch (direction) {
        case 'up':
          newRow = Math.max(0, prev.row - 1);
          break;
        case 'down':
          newRow = Math.min(totalRows - 1, prev.row + 1);
          break;
        case 'left':
          newCol = Math.max(0, prev.col - 1);
          break;
        case 'right':
          newCol = Math.min(totalCols - 1, prev.col + 1);
          break;
      }

      return { row: newRow, col: newCol };
    });
  }, [totalRows, totalCols]);

  // Handler de teclado
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Se estiver editando
    if (isEditing) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsEditing(false);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        setIsEditing(false);
        if (selectedCell) {
          moveCell('down');
        }
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        setIsEditing(false);
        if (selectedCell) {
          moveCell(e.shiftKey ? 'left' : 'right');
        }
        return;
      }
      // Durante edição, outras teclas são processadas normalmente pelo input
      return;
    }

    // Navegação sem edição
    if (e.key === 'Enter') {
      e.preventDefault();
      // Só entra em modo de edição se a coluna for editável
      if (selectedCell && (editableCols.length === 0 || editableCols.includes(selectedCell.col))) {
        setIsEditing(true);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!selectedCell) {
        setSelectedCell({ row: 0, col: 0 });
      } else {
        moveCell(e.shiftKey ? 'left' : 'right');
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!selectedCell) {
        setSelectedCell({ row: 0, col: 0 });
      } else {
        moveCell('up');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!selectedCell) {
        setSelectedCell({ row: 0, col: 0 });
      } else {
        moveCell('down');
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!selectedCell) {
        setSelectedCell({ row: 0, col: 0 });
      } else {
        moveCell('left');
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!selectedCell) {
        setSelectedCell({ row: 0, col: 0 });
      } else {
        moveCell('right');
      }
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      if (selectedCell) {
        setSelectedCell(prev => prev ? { ...prev, col: 0 } : null);
      }
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      if (selectedCell) {
        setSelectedCell(prev => prev ? { ...prev, col: totalCols - 1 } : null);
      }
      return;
    }

    // Ctrl+Home - vai para primeira célula
    if (e.ctrlKey && e.key === 'Home') {
      e.preventDefault();
      setSelectedCell({ row: 0, col: 0 });
      return;
    }

    // Ctrl+End - vai para última célula
    if (e.ctrlKey && e.key === 'End') {
      e.preventDefault();
      setSelectedCell({ row: totalRows - 1, col: totalCols - 1 });
      return;
    }

    // F2 - entra em modo de edição (Excel-like)
    if (e.key === 'F2') {
      e.preventDefault();
      if (selectedCell && (editableCols.length === 0 || editableCols.includes(selectedCell.col))) {
        setIsEditing(true);
      }
      return;
    }

    // Qualquer tecla alfanumérica inicia edição
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (selectedCell && (editableCols.length === 0 || editableCols.includes(selectedCell.col))) {
        setIsEditing(true);
      }
    }
  }, [isEditing, selectedCell, moveCell, totalCols, totalRows, editableCols]);

  // Verificar se uma célula está selecionada
  const isCellSelected = useCallback((row: number, col: number) => {
    return selectedCell?.row === row && selectedCell?.col === col;
  }, [selectedCell]);

  // Verificar se uma célula está em edição
  const isCellEditing = useCallback((row: number, col: number) => {
    return isEditing && selectedCell?.row === row && selectedCell?.col === col;
  }, [isEditing, selectedCell]);

  return {
    selectedCell,
    isEditing,
    setIsEditing,
    setSelectedCell,
    handleKeyDown,
    moveCell,
    isCellSelected,
    isCellEditing,
  };
};