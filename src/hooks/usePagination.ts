import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

/**
 * Hook para gerenciar paginação de dados
 * @param totalItems - Total de itens
 * @param options - Opções de configuração
 */
export function usePagination(
  totalItems: number,
  options: UsePaginationOptions = {}
) {
  const {
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [10, 25, 50, 100],
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Cálculos de paginação
  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

  const startIndex = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);

  const endIndex = useMemo(
    () => Math.min(startIndex + pageSize, totalItems),
    [startIndex, pageSize, totalItems]
  );

  // Navegação
  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const firstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const lastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  // Alterar tamanho da página
  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  // Verificações
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Função para paginar dados
  const paginateData = useCallback(
    <T>(data: T[]): T[] => {
      return data.slice(startIndex, endIndex);
    },
    [startIndex, endIndex]
  );

  // Range de páginas para exibição (ex: 1, 2, 3, ..., 10)
  const pageRange = useMemo(() => {
    const range: (number | 'ellipsis')[] = [];
    const showPages = 5; // Quantidade de páginas para mostrar

    if (totalPages <= showPages + 2) {
      // Mostra todas as páginas
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Sempre mostra primeira página
      range.push(1);

      if (currentPage > 3) {
        range.push('ellipsis');
      }

      // Páginas ao redor da atual
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (currentPage < totalPages - 2) {
        range.push('ellipsis');
      }

      // Sempre mostra última página
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return {
    // Estado
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    
    // Navegação
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    
    // Verificações
    hasNextPage,
    hasPrevPage,
    
    // Utilitários
    changePageSize,
    paginateData,
    pageRange,
    pageSizeOptions,
  };
}

export default usePagination;
