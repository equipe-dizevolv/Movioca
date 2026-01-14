import { useState, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState<T> {
  column: keyof T | null;
  direction: SortDirection;
}

interface UseTableSortOptions<T> {
  initialColumn?: keyof T;
  initialDirection?: SortDirection;
}

/**
 * Hook para gerenciar ordenação de tabelas
 * @param data - Array de dados para ordenar
 * @param options - Opções de configuração
 */
export function useTableSort<T extends Record<string, any>>(
  data: T[],
  options: UseTableSortOptions<T> = {}
) {
  const { initialColumn = null, initialDirection = null } = options;

  const [sortState, setSortState] = useState<SortState<T>>({
    column: initialColumn,
    direction: initialDirection,
  });

  // Função para alternar ordenação
  const toggleSort = useCallback((column: keyof T) => {
    setSortState((prev: SortState<T>) => {
      if (prev.column === column) {
        // Cicla: asc -> desc -> null
        if (prev.direction === 'asc') return { column, direction: 'desc' };
        if (prev.direction === 'desc') return { column: null, direction: null };
      }
      return { column, direction: 'asc' };
    });
  }, []);

  // Função para resetar ordenação
  const resetSort = useCallback(() => {
    setSortState({ column: null, direction: null });
  }, []);

  // Dados ordenados
  const sortedData = [...data].sort((a, b) => {
    if (!sortState.column || !sortState.direction) return 0;

    const aValue = a[sortState.column];
    const bValue = b[sortState.column];

    // Tratamento para null/undefined
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortState.direction === 'asc' ? 1 : -1;
    if (bValue == null) return sortState.direction === 'asc' ? -1 : 1;

    // Comparação por tipo
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue, 'pt-BR', { sensitivity: 'base' });
      return sortState.direction === 'asc' ? comparison : -comparison;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortState.direction === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Fallback para string
    const strA = String(aValue);
    const strB = String(bValue);
    const comparison = strA.localeCompare(strB);
    return sortState.direction === 'asc' ? comparison : -comparison;
  });

  return {
    sortedData,
    sortState,
    toggleSort,
    resetSort,
  };
}

export default useTableSort;
