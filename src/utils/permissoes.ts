/**
 * MOVIOCA - Sistema de Permissões e Filtros
 * 
 * Responsável por gerenciar o acesso e visibilidade de dados
 * baseado no perfil do usuário logado.
 * 
 * Implementa as Regras de Negócio:
 * - RN-001: Escopo Restrito (Silo de Informação)
 * - RN-002: Imutabilidade do Teto
 * - RN-003: Responsabilidade Solidária
 */

// Tipos
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface BudgetRow {
  id: string;
  codigo: string;
  descricao: string;
  gestor?: string; // ID do usuário gestor
  gestorNome?: string; // Nome do gestor
  gestorPai?: string; // ID do gestor acima na hierarquia (sub-delegação)
  liberado: number;
  comprometido: number;
  realizado: number;
  aprovado: number;
}

export interface Contrato {
  id: string;
  itemOrcamentario: string;
  valor: number;
  status: string;
}

export interface Verba {
  id: string;
  itemOrcamentario: string;
  valorLiberado: number;
  status: string;
}

/**
 * RN-001: Escopo Restrito
 * Filtra rubricas orçamentárias baseado no perfil do usuário
 */
export const filtrarRubricasPorPermissao = (
  rubricas: BudgetRow[],
  usuario: User
): BudgetRow[] => {
  // Admin e PEI veem tudo
  if (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna"
  ) {
    return rubricas;
  }

  // PED vê apenas as rubricas que lhe foram delegadas
  if (usuario.role === "Produção Executiva Dedicada") {
    return rubricas.filter(
      (r) =>
        r.gestor === usuario.id || // Rubrica delegada diretamente
        r.gestorPai === usuario.id // Rubrica sub-delegada (consolidação)
    );
  }

  // Equipe Dedicada vê apenas suas rubricas específicas
  if (usuario.role === "Equipe Dedicada") {
    return rubricas.filter((r) => r.gestor === usuario.id);
  }

  // Outros perfis não veem orçamento
  return [];
};

/**
 * Verifica se usuário pode editar uma rubrica específica
 */
export const podeEditarRubrica = (
  rubrica: BudgetRow,
  usuario: User
): boolean => {
  // Admin e PEI podem editar tudo
  if (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna"
  ) {
    return true;
  }

  // PED e Equipe podem editar apenas suas rubricas
  if (
    usuario.role === "Produção Executiva Dedicada" ||
    usuario.role === "Equipe Dedicada"
  ) {
    return rubrica.gestor === usuario.id;
  }

  return false;
};

/**
 * RN-002: Imutabilidade do Teto
 * Verifica se usuário pode alterar o valor "Liberado"
 */
export const podeEditarTeto = (usuario: User): boolean => {
  // Apenas PEI pode alterar o teto (valor Liberado)
  return (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna"
  );
};

/**
 * Filtra contratos visíveis para o usuário
 */
export const filtrarContratosPorPermissao = (
  contratos: Contrato[],
  rubricas: BudgetRow[],
  usuario: User
): Contrato[] => {
  // Admin e PEI veem todos
  if (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna"
  ) {
    return contratos;
  }

  // Primeiro filtra as rubricas visíveis
  const rubricasVisiveis = filtrarRubricasPorPermissao(rubricas, usuario);
  const idsRubricasVisiveis = rubricasVisiveis.map((r) => r.id);

  // Depois filtra contratos vinculados a essas rubricas
  return contratos.filter((c) =>
    idsRubricasVisiveis.includes(c.itemOrcamentario)
  );
};

/**
 * Filtra verbas visíveis para o usuário
 */
export const filtrarVerbasPorPermissao = (
  verbas: Verba[],
  rubricas: BudgetRow[],
  usuario: User
): Verba[] => {
  // Admin e PEI veem todas
  if (
    usuario.role === "Admin" ||
    usuario.role === "ProduçãoExecutiva Interna"
  ) {
    return verbas;
  }

  // Filtra rubricas visíveis
  const rubricasVisiveis = filtrarRubricasPorPermissao(rubricas, usuario);
  const idsRubricasVisiveis = rubricasVisiveis.map((r) => r.id);

  // Filtra verbas vinculadas a essas rubricas
  return verbas.filter((v) => idsRubricasVisiveis.includes(v.itemOrcamentario));
};

/**
 * Verifica se usuário pode sub-delegar rubricas
 */
export const podeSubDelegar = (usuario: User): boolean => {
  return (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna" ||
    usuario.role === "Produção Executiva Dedicada"
  );
};

/**
 * Verifica se usuário pode convidar parceiros
 */
export const podeConvidarParceiros = (usuario: User): boolean => {
  return (
    usuario.role === "Admin" ||
    usuario.role === "Produção Executiva Interna" ||
    usuario.role === "Produção Executiva Dedicada"
  );
};
