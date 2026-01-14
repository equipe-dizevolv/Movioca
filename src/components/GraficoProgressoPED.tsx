/**
 * MOVIOCA - Gráfico de Progresso PED
 * 
 * Exibe o progresso de execução orçamentária em formato
 * de gráfico de pizza (donut chart) usando Recharts.
 * 
 * História 2: "Como PED, eu quero ver um Gráfico de Progresso
 * do meu escopo para medir o ritmo de contratação"
 */

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency, formatPercentual } from "../utils/orcamento";

interface GraficoProgressoPEDProps {
  totalLiberado: number;
  totalComprometido: number;
  titulo?: string;
}

export default function GraficoProgressoPED({
  totalLiberado,
  totalComprometido,
  titulo = "Progresso do Orçamento",
}: GraficoProgressoPEDProps) {
  const saldoDisponivel = totalLiberado - totalComprometido;
  const percentualComprometido =
    totalLiberado > 0 ? (totalComprometido / totalLiberado) * 100 : 0;

  const data = [
    {
      name: "Comprometido",
      value: totalComprometido,
      percentual: percentualComprometido,
    },
    {
      name: "Disponível",
      value: saldoDisponivel,
      percentual: 100 - percentualComprometido,
    },
  ];

  // Cores do sistema (roxo principal + cinza)
  const COLORS = ["#8B5CF6", "#E5E7EB"];

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatPercentual(payload[0].payload.percentual)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{titulo}</CardTitle>
        <p className="text-xs text-muted-foreground">
          Visão consolidada da execução orçamentária
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="stroke-white dark:stroke-gray-900"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value: string) => (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Resumo Numérico */}
        <div className="mt-6 space-y-3">
          <div className="text-center">
            <p className="text-3xl text-purple-600 dark:text-purple-400">
              {formatPercentual(percentualComprometido)}
            </p>
            <p className="text-sm text-muted-foreground">
              do orçamento comprometido
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-muted-foreground">Total Liberado</p>
              <p className="text-sm font-medium">{formatCurrency(totalLiberado)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Saldo Disponível</p>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                {formatCurrency(saldoDisponivel)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
