/**
 * MOVIOCA - Utilitários de Cálculo Orçamentário
 * 
 * Funções para calcular valores consolidados de orçamento,
 * considerando hierarquias de delegação e sub-delegação.
 * 
 * Implementa RN-003: Responsabilidade Solidária
 */

import { BudgetRow, Contrato, Verba } from "./permissoes";

/**
 * Calcula o total liberado para um conjunto de rubricas
 */
export const calcularTotalLiberado = (rubricas: BudgetRow[]): number => {
  return rubricas.reduce((total, rubrica) => total + rubrica.liberado, 0);
};

/**
 * Calcula o total comprometido para um conjunto de rubricas
 */
export const calcularTotalComprometido = (rubricas: BudgetRow[]): number => {
  return rubricas.reduce((total, rubrica) => total + rubrica.comprometido, 0);
};

/**
 * Calcula o total realizado para um conjunto de rubricas
 */
export const calcularTotalRealizado = (rubricas: BudgetRow[]): number => {
  return rubricas.reduce((total, rubrica) => total + rubrica.realizado, 0);
};

/**
 * Calcula o saldo disponível para um conjunto de rubricas
 */
export const calcularSaldoDisponivel = (rubricas: BudgetRow[]): number => {
  const totalLiberado = calcularTotalLiberado(rubricas);
  const totalComprometido = calcularTotalComprometido(rubricas);
  return totalLiberado - totalComprometido;
};

/**
 * RN-003: Responsabilidade Solidária
 * Calcula o comprometido consolidado de uma rubrica,
 * incluindo sub-rubricas delegadas abaixo na hierarquia
 */
export const calcularComprometidoConsolidado = (
  rubrica: BudgetRow,
  todasRubricas: BudgetRow[],
  contratos: Contrato[],
  verbas: Verba[]
): number => {
  // 1. Contratos diretos desta rubrica
  const contratosRubrica = contratos.filter(
    (c) =>
      c.itemOrcamentario === rubrica.id &&
      (c.status === "Em Aprovação" || c.status === "Aprovado")
  );
  const totalContratos = contratosRubrica.reduce((sum, c) => sum + c.valor, 0);

  // 2. Verbas diretas desta rubrica
  const verbasRubrica = verbas.filter(
    (v) =>
      v.itemOrcamentario === rubrica.id &&
      (v.status === "Aprovada" || v.status === "Em uso")
  );
  const totalVerbas = verbasRubrica.reduce(
    (sum, v) => sum + v.valorLiberado,
    0
  );

  // 3. Sub-rubricas (delegadas abaixo desta)
  const subRubricas = todasRubricas.filter(
    (r) => r.gestorPai === rubrica.gestor && r.codigo.startsWith(rubrica.codigo)
  );
  const totalSubRubricas = subRubricas.reduce(
    (sum, sr) =>
      sum + calcularComprometidoConsolidado(sr, todasRubricas, contratos, verbas),
    0
  );

  return totalContratos + totalVerbas + totalSubRubricas;
};

/**
 * Calcula o percentual executado (comprometido / liberado)
 */
export const calcularPercentualExecutado = (rubricas: BudgetRow[]): number => {
  const totalLiberado = calcularTotalLiberado(rubricas);
  const totalComprometido = calcularTotalComprometido(rubricas);

  if (totalLiberado === 0) return 0;

  return (totalComprometido / totalLiberado) * 100;
};

/**
 * Verifica se há saldo suficiente para uma contratação
 */
export const validarSaldoParaContratacao = (
  rubrica: BudgetRow,
  valorContrato: number
): {
  temSaldo: boolean;
  saldoDisponivel: number;
  diferenca: number;
} => {
  const saldoDisponivel = rubrica.liberado - rubrica.comprometido;
  const temSaldo = valorContrato <= saldoDisponivel;
  const diferenca = valorContrato - saldoDisponivel;

  return {
    temSaldo,
    saldoDisponivel,
    diferenca: diferenca > 0 ? diferenca : 0,
  };
};

/**
 * Retorna a cor da barra de progresso baseado no percentual usado
 */
export const getCorBarraProgresso = (percentual: number): string => {
  if (percentual < 50) return "bg-green-500";
  if (percentual < 90) return "bg-yellow-500";
  return "bg-red-500";
};

/**
 * Agrupa rubricas por grande item (código base)
 */
export const agruparPorGrandeItem = (
  rubricas: BudgetRow[]
): Record<string, BudgetRow[]> => {
  const grupos: Record<string, BudgetRow[]> = {};

  rubricas.forEach((rubrica) => {
    // Pega os primeiros 3 dígitos do código (ex: "001" de "001.002.03")
    const codigoBase = rubrica.codigo.split(".")[0];

    if (!grupos[codigoBase]) {
      grupos[codigoBase] = [];
    }

    grupos[codigoBase].push(rubrica);
  });

  return grupos;
};

/**
 * Calcula totais agrupados por grande item
 */
export const calcularTotaisPorGrandeItem = (
  rubricas: BudgetRow[]
): Array<{
  codigo: string;
  descricao: string;
  liberado: number;
  comprometido: number;
  saldo: number;
  percentual: number;
}> => {
  const grupos = agruparPorGrandeItem(rubricas);
  const resultado: Array<{
    codigo: string;
    descricao: string;
    liberado: number;
    comprometido: number;
    saldo: number;
    percentual: number;
  }> = [];

  Object.keys(grupos).forEach((codigoBase) => {
    const rubricasGrupo = grupos[codigoBase];
    const liberado = calcularTotalLiberado(rubricasGrupo);
    const comprometido = calcularTotalComprometido(rubricasGrupo);
    const saldo = liberado - comprometido;
    const percentual = liberado > 0 ? (comprometido / liberado) * 100 : 0;

    // Pega a descrição do primeiro item (geralmente é o nome do grupo)
    const descricao = rubricasGrupo[0]?.descricao || "Sem descrição";

    resultado.push({
      codigo: codigoBase,
      descricao,
      liberado,
      comprometido,
      saldo,
      percentual,
    });
  });

  return resultado.sort((a, b) => a.codigo.localeCompare(b.codigo));
};

/**
 * Formata valor monetário para exibição
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formata percentual para exibição
 */
export const formatPercentual = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
