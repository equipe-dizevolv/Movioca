/**
 * MOVIOCA - Componente de Barra de Saldo
 * 
 * Exibe visualmente o progresso de utilização do orçamento
 * com cores que indicam o nível de comprometimento.
 * 
 * Verde: < 50% usado
 * Amarelo: 50-90% usado
 * Vermelho: > 90% usado
 */

import { formatCurrency } from "../utils/orcamento";

interface BarraSaldoProps {
  liberado: number;
  comprometido: number;
  showValues?: boolean;
  height?: "sm" | "md" | "lg";
}

export default function BarraSaldo({
  liberado,
  comprometido,
  showValues = true,
  height = "md",
}: BarraSaldoProps) {
  const percentual = liberado > 0 ? (comprometido / liberado) * 100 : 0;
  const saldoDisponivel = liberado - comprometido;

  const getColor = () => {
    if (percentual < 50) return "bg-green-500";
    if (percentual < 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = () => {
    if (percentual < 50) return "text-green-600 dark:text-green-400";
    if (percentual < 90) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getHeightClass = () => {
    switch (height) {
      case "sm":
        return "h-1.5";
      case "md":
        return "h-2";
      case "lg":
        return "h-3";
      default:
        return "h-2";
    }
  };

  return (
    <div className="space-y-1">
      {showValues && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Disponível</span>
          <span className={getTextColor()}>
            {Math.min(percentual, 100).toFixed(0)}% usado
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${getHeightClass()}`}>
        <div
          className={`${getColor()} ${getHeightClass()} rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(percentual, 100)}%` }}
        />
      </div>

      {showValues && (
        <div className="flex justify-between text-xs">
          <span className={getTextColor()}>
            {formatCurrency(saldoDisponivel)}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            de {formatCurrency(liberado)}
          </span>
        </div>
      )}
    </div>
  );
}
