import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { AlertTriangle, TrendingUp, Calendar, Building2 } from "lucide-react@0.487.0";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Project {
  id: string;
  nome: string;
  status: string;
}

interface KPIsLiquidezProps {
  totalLiberado: number;
  totalComprometido: number;
  proximoCicloDia: 10 | 20 | 30;
  proximoCicloValor: number;
  saldoInicial: number;
  gastosReais: number;
  projects?: Project[];
  selectedProjectOrcamento?: string;
  onProjectChange?: (projectId: string) => void;
}

export default function KPIsLiquidez({
  totalLiberado,
  totalComprometido,
  proximoCicloDia,
  proximoCicloValor,
  saldoInicial,
  gastosReais,
  projects,
  selectedProjectOrcamento,
  onProjectChange,
}: KPIsLiquidezProps) {
  const resultadoConsolidado = saldoInicial - gastosReais;
  const percentualComprometido = totalLiberado > 0 
    ? Math.min((totalComprometido / totalLiberado) * 100, 100) 
    : 0;
  const isEstouro = resultadoConsolidado < 0;

  // Calcular próxima data baseada no dia do ciclo
  const getProximaData = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    
    // Cria uma data com o dia do ciclo no mês atual
    let proximaData = new Date(ano, mes, proximoCicloDia);
    
    // Se a data já passou, move para o próximo mês
    if (proximaData <= hoje) {
      proximaData = new Date(ano, mes + 1, proximoCicloDia);
    }
    
    return proximaData.toLocaleDateString('pt-BR');
  };

  return (
    <div 
      className="sticky top-0 z-20 bg-background border-b border-border shadow-sm pointer-events-auto"
      style={{ pointerEvents: 'auto', zIndex: 25, position: 'sticky' }}
    >
      <div className="p-3 md:p-6 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
        {/* Dropdown de filtro por projeto - ACIMA dos cards */}
        {projects && onProjectChange && (
          <div className="mb-4">
            <Select 
              value={selectedProjectOrcamento || "todos"} 
              onValueChange={onProjectChange}
            >
              <SelectTrigger className="w-full md:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Todos os Projetos - Resumo de Orçamento
                  </span>
                </SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
          {/* Card 1: Total Liberado vs. Comprometido */}
          <Card 
            className="border-2 border-purple-200 dark:border-purple-900 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto relative z-10"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <CardContent className="p-3 md:p-4 pointer-events-auto relative z-10" style={{ pointerEvents: 'auto' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm text-muted-foreground">Liberado vs. Comprometido</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Liberado:</span>
                    <span className="text-foreground">R$ {totalLiberado.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Comprometido:</span>
                    <span className={percentualComprometido > 90 ? "text-orange-600 dark:text-orange-400" : "text-foreground"}>
                      R$ {totalComprometido.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Barra de progresso comparativa */}
                <div className="space-y-1">
                  <Progress 
                    value={percentualComprometido} 
                    className="h-3"
                    indicatorClassName={
                      percentualComprometido > 90 
                        ? "bg-orange-500" 
                        : percentualComprometido > 75 
                        ? "bg-yellow-500" 
                        : "bg-purple-600"
                    }
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {percentualComprometido.toFixed(1)}% comprometido
                    </span>
                    {percentualComprometido > 90 && (
                      <Badge variant="destructive" className="text-xs">
                        Atenção
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Próximo Ciclo de Pagamento */}
          <Card 
            className="border-2 border-blue-200 dark:border-blue-900 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto relative z-10"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <CardContent className="p-3 md:p-4 pointer-events-auto relative z-10" style={{ pointerEvents: 'auto' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm text-muted-foreground">Próximo Ciclo de Pagamento</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                      Dia {proximoCicloDia}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{getProximaData()}</span>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-1">Valor total acumulado:</p>
                    <p className="text-2xl text-blue-600 dark:text-blue-400">
                      R$ {proximoCicloValor.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Resultado Consolidado */}
          <Card 
            className={`border-2 ${isEstouro ? 'border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30' : 'border-green-200 dark:border-green-900'} hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] pointer-events-auto relative z-10`}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <CardContent className="p-3 md:p-4 pointer-events-auto relative z-10" style={{ pointerEvents: 'auto' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {isEstouro ? (
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  <h3 className="text-sm text-muted-foreground">Resultado Consolidado</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Saldo Inicial:</span>
                    <span className="text-foreground">R$ {saldoInicial.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Gastos Reais:</span>
                    <span className="text-foreground">R$ {gastosReais.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm">Saldo Atual:</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl ${isEstouro ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          R$ {Math.abs(resultadoConsolidado).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    {isEstouro && (
                      <div className="flex items-center gap-1 mt-2">
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          ESTOURO
                        </Badge>
                        <span className="text-xs text-red-600 dark:text-red-400">
                          Orçamento excedido
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}