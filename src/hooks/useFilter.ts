import { useState, useMemo, useCallback } from 'react';

interface UseFilterOptions<T> {
  initialFilters?: Partial<T>;
  filterFn?: (item: T, filters: Partial<T>) => boolean;
}

/**
 * Hook para gerenciar filtros em listas de dados
 * @param data - Array de dados a filtrar
 * @param options - Opções de configuração
 */
export function useFilter<T extends Record<string, unknown>>(
  data: T[],
  options: UseFilterOptions<T> = {}
) {
  const { initialFilters = {}, filterFn } = options;
  
  const [filters, setFilters] = useState<Partial<T>>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFields, setSearchFields] = useState<(keyof T)[]>([]);

  // Função de filtro padrão
  const defaultFilterFn = useCallback((item: T, currentFilters: Partial<T>): boolean => {
    return Object.entries(currentFilters).every(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return true;
      }
      
      const itemValue = item[key as keyof T];
      
      // Comparação de arrays
      if (Array.isArray(value)) {
        return value.length === 0 || value.includes(itemValue);
      }
      
      // Comparação de strings (case-insensitive)
      if (typeof value === 'string' && typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }
      
      // Comparação direta
      return itemValue === value;
    });
  }, []);

  // Função de busca textual
  const searchFn = useCallback((item: T): boolean => {
    if (!searchTerm.trim()) return true;
    
    const fieldsToSearch = searchFields.length > 0 
      ? searchFields 
      : (Object.keys(item) as (keyof T)[]);
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    return fieldsToSearch.some((field: keyof T) => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(normalizedSearch);
      }
      if (typeof value === 'number') {
        return value.toString().includes(normalizedSearch);
      }
      return false;
    });
  }, [searchTerm, searchFields]);

  // Dados filtrados
  const filteredData = useMemo(() => {
    const filterFunction = filterFn || defaultFilterFn;
    
    return data.filter((item) => {
      const passesFilters = filterFunction(item, filters);
      const passesSearch = searchFn(item);
      return passesFilters && passesSearch;
    });
  }, [data, filters, filterFn, defaultFilterFn, searchFn]);

  // Atualizar um filtro específico
  const setFilter = useCallback(<K extends keyof T>(key: K, value: T[K] | undefined) => {
    setFilters((prev: Partial<T>) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Remover um filtro específico
  const removeFilter = useCallback((key: keyof T) => {
    setFilters((prev: Partial<T>) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  // Limpar todos os filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
  }, []);

  // Verificar se há filtros ativos
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value !== undefined && value !== null && value !== ''
    ) || searchTerm.trim() !== '';
  }, [filters, searchTerm]);

  // Contagem de filtros ativos
  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.values(filters).forEach((value) => {
      if (value !== undefined && value !== null && value !== '') {
        count++;
      }
    });
    if (searchTerm.trim()) count++;
    return count;
  }, [filters, searchTerm]);

  return {
    // Dados
    filteredData,
    originalData: data,
    
    // Estado de filtros
    filters,
    searchTerm,
    searchFields,
    
    // Ações de filtro
    setFilters,
    setFilter,
    removeFilter,
    clearFilters,
    
    // Ações de busca
    setSearchTerm,
    setSearchFields,
    
    // Informações
    hasActiveFilters,
    activeFilterCount,
    filteredCount: filteredData.length,
    totalCount: data.length,
  };
}

export default useFilter;
