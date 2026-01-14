/**
 * MOVIOCA - Dashboard Controladoria Interna
 * 
 * Dashboard específico para o perfil Controladoria Interna (CI), focado em:
 * - Fila de pagamentos aguardando aprovação final
 * - Alertas de prazo e vencimentos
 * - Lotes de verba pendentes de aprovação
 * - Indicadores de compliance e glosas
 * 
 * PRD 003 - Jornada da Controladoria Interna
 * História 1: Visualizar Fila de Pagamentos Pendentes consolidada
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileCheck,
  XCircle,
  TrendingUp,
  AlertCircle,
  FileText,
  DollarSign,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { format, addDays, isAfter, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

interface PagamentoPendente {
  id: string;
  fornecedor: string;
  projeto: string;
  valor: number;
  vencimento: Date;
  statusWorkflow: "Aguardando NF" | "Análise CD" | "Análise CI" | "Liberado Financeiro";
  temAlerta: boolean;
  motivoAlerta?: string;
}

interface LoteVerba {
  id: string;
  numeroLote: string;
  projeto: string;
  solicitante: string;
  valorTotal: number;
  quantidadeNotas: number;
  dataEnvio: Date;
}

interface AtividadeRecente {
  id: string;
  tipo: "aprovacao" | "reprovacao" | "glosa" | "alerta";
  descricao: string;
  timestamp: Date;
  projeto: string;
}

interface DashboardControladoriaInternaProps {
  onNavigate?: (screen: string, filtro?: string) => void;
}

export default function DashboardControladoriaInterna({ onNavigate }: DashboardControladoriaInternaProps) {
  const { currentUser } = useAuth();

  // Função de navegação
  const navegarPara = (tela: string, filtro?: string) => {
    if (onNavigate) {
      // Mapear as telas do dashboard para as telas reais do sistema
      const mapaDeNavegacao: { [key: string]: string } = {
        "Pagamentos": "Central de Aprovações",
        "Verbas": "Lotes de Verba",
      };

      const telaDestino = mapaDeNavegacao[tela] || tela;
      onNavigate(telaDestino);
    } else {
      toast.info(`Navegação para ${tela}${filtro ? ` (${filtro})` : ""}`);
    }
  };

  // Mock Data - Pagamentos
  const hoje = startOfDay(new Date());
  const amanha = addDays(hoje, 1);

  const pagamentosPendentes: PagamentoPendente[] = [
    {
      id: "pag-001",
      fornecedor: "Locadora XYZ Equipamentos",
      projeto: "Série Documentário - História",
      valor: 15000,
      vencimento: hoje,
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vence hoje"
    },
    {
      id: "pag-002",
      fornecedor: "Estúdio de Áudio Premium",
      projeto: "Campanha Publicitária - Marca X",
      valor: 8500,
      vencimento: hoje,
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vence hoje"
    },
    {
      id: "pag-003",
      fornecedor: "Produtora Criativa LTDA",
      projeto: "Filme Institucional",
      valor: 22000,
      vencimento: amanha,
      statusWorkflow: "Análise CI",
      temAlerta: false
    },
    {
      id: "pag-004",
      fornecedor: "Transportes Rápidos",
      projeto: "Série Documentário - História",
      valor: 3200,
      vencimento: addDays(hoje, 2),
      statusWorkflow: "Análise CI",
      temAlerta: false
    },
    {
      id: "pag-005",
      fornecedor: "Catering & Alimentação",
      projeto: "Campanha Publicitária - Marca X",
      valor: 4800,
      vencimento: addDays(hoje, 3),
      statusWorkflow: "Análise CI",
      temAlerta: false
    },
  ];

  const pagamentosAguardandoCD: PagamentoPendente[] = [
    {
      id: "pag-006",
      fornecedor: "Iluminação Total",
      projeto: "Filme Institucional",
      valor: 12000,
      vencimento: addDays(hoje, 5),
      statusWorkflow: "Análise CD",
      temAlerta: false
    },
    {
      id: "pag-007",
      fornecedor: "Cenografia & Arte",
      projeto: "Série Documentário - História",
      valor: 9500,
      vencimento: addDays(hoje, 6),
      statusWorkflow: "Análise CD",
      temAlerta: false
    },
  ];

  const pagamentosVencidos: PagamentoPendente[] = [
    {
      id: "pag-008",
      fornecedor: "Equipamentos Pro",
      projeto: "Campanha Publicitária - Marca X",
      valor: 7800,
      vencimento: addDays(hoje, -2),
      statusWorkflow: "Análise CI",
      temAlerta: true,
      motivoAlerta: "Vencido há 2 dias"
    },
  ];

  // Mock Data - Lotes de Verba
  const lotesVerbaPendentes: LoteVerba[] = [
    {
      id: "lote-001",
      numeroLote: "L-2025-001",
      projeto: "Série Documentário - História",
      solicitante: "Bruno (CD)",
      valorTotal: 7500,
      quantidadeNotas: 4,
      dataEnvio: addDays(hoje, -1)
    },
    {
      id: "lote-002",
      numeroLote: "L-2025-002",
      projeto: "Campanha Publicitária - Marca X",
      solicitante: "Bruno (CD)",
      valorTotal: 3200,
      quantidadeNotas: 6,
      dataEnvio: addDays(hoje, -2)
    },
  ];

  // Mock Data - Atividades Recentes
  const atividadesRecentes: AtividadeRecente[] = [
    {
      id: "ativ-001",
      tipo: "aprovacao",
      descricao: "Aprovado pagamento para Locadora ABC - R$ 5.500",
      timestamp: new Date(hoje.getTime() - 2 * 60 * 60 * 1000),
      projeto: "Filme Institucional"
    },
    {
      id: "ativ-002",
      tipo: "reprovacao",
      descricao: "Reprovado pagamento - NF sem retenção de IRRF",
      timestamp: new Date(hoje.getTime() - 4 * 60 * 60 * 1000),
      projeto: "Série Documentário"
    },
    {
      id: "ativ-003",
      tipo: "glosa",
      descricao: "Glosado 1 item do lote L-2025-003 (bebida alcoólica)",
      timestamp: new Date(hoje.getTime() - 6 * 60 * 60 * 1000),
      projeto: "Campanha Publicitária"
    },
    {
      id: "ativ-004",
      tipo: "aprovacao",
      descricao: "Aprovado lote de verba L-2025-004 - R$ 2.800",
      timestamp: new Date(hoje.getTime() - 8 * 60 * 60 * 1000),
      projeto: "Filme Institucional"
    },
    {
      id: "ativ-005",
      tipo: "alerta",
      descricao: "Detectada possível duplicidade de NF - Fornecedor XYZ",
      timestamp: new Date(hoje.getTime() - 10 * 60 * 60 * 1000),
      projeto: "Série Documentário"
    },
  ];

  // Cálculos
  const totalMinhaFila = pagamentosPendentes.length;
  const totalVencidosCI = pagamentosVencidos.length;
  const totalVenceHoje = pagamentosPendentes.filter(p => 
    format(p.vencimento, "yyyy-MM-dd") === format(hoje, "yyyy-MM-dd")
  ).length;
  const totalLotesVerba = lotesVerbaPendentes.length;
  const totalAguardandoCD = pagamentosAguardandoCD.length;

  const valorTotalMinhaFila = pagamentosPendentes.reduce((acc, p) => acc + p.valor, 0);
  const valorVencidosCI = pagamentosVencidos.reduce((acc, p) => acc + p.valor, 0);
  const valorLotesVerba = lotesVerbaPendentes.reduce((acc, l) => acc + l.valorTotal, 0);

  // Helpers
  const getIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case "aprovacao": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "reprovacao": return <XCircle className="w-4 h-4 text-red-600" />;
      case "glosa": return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "alerta": return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCorAtividade = (tipo: string) => {
    switch (tipo) {
      case "aprovacao": return "bg-green-100";
      case "reprovacao": return "bg-red-100";
      case "glosa": return "bg-orange-100";
      case "alerta": return "bg-blue-100";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Dashboard - Controladoria Interna</h2>
        <p className="text-muted-foreground mt-1">
          Central de aprovações e validação de compliance fiscal
        </p>
      </div>

      {/* KPIs Principais - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Minha Fila - Análise CI */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navegarPara("Pagamentos", "analise-ci")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Minha Fila (Análise CI)</p>
                <p className="text-2xl mt-2 text-primary">
                  {totalMinhaFila}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  R$ {valorTotalMinhaFila.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vencimentos Hoje */}
        <Card className={totalVenceHoje > 0 ? "border-2 border-orange-300 cursor-pointer hover:shadow-lg transition-shadow" : ""} onClick={() => totalVenceHoje > 0 && navegarPara("Pagamentos", "vence-hoje")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vence Hoje</p>
                <p className={`text-2xl mt-2 ${totalVenceHoje > 0 ? 'text-orange-600' : ''}`}>
                  {totalVenceHoje}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requer atenção urgente
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full ${totalVenceHoje > 0 ? 'bg-orange-100' : 'bg-gray-100'} flex items-center justify-center`}>
                <Clock className={`w-6 h-6 ${totalVenceHoje > 0 ? 'text-orange-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vencidos */}
        <Card className={totalVencidosCI > 0 ? "border-2 border-red-300 cursor-pointer hover:shadow-lg transition-shadow" : ""} onClick={() => totalVencidosCI > 0 && navegarPara("Pagamentos", "vencidos")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vencidos</p>
                <p className="text-2xl mt-2 text-red-600">
                  {totalVencidosCI}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  R$ {valorVencidosCI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aguardando CD */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aguardando CD</p>
                <p className="text-2xl mt-2">
                  {totalAguardandoCD}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Monitoramento (Nível 1)
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lotes de Verba Pendentes - História 5 */}
      <Card className="border-2 border-amber-200 bg-amber-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-base">Lotes de Verba Pendentes de Aprovação</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Prestações de contas validadas pela CD aguardando aprovação final (História 5)
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-2" onClick={() => navegarPara("Verbas", "aprovacao-ci")}>
              Ver Todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-lg text-amber-700">
                  R$ {valorLotesVerba.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {totalLotesVerba} lote(s) aguardando validação final
                </p>
              </div>
            </div>
            {lotesVerbaPendentes.slice(0, 2).map(lote => (
              <div key={lote.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{lote.numeroLote} - {lote.projeto}</p>
                    <p className="text-xs text-muted-foreground">
                      {lote.quantidadeNotas} notas • Enviado por {lote.solicitante}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-amber-600">
                  R$ {lote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid 2 colunas - Próximos na Fila + Atividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Próximos Pagamentos na Fila */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Próximos na Fila de Aprovação</CardTitle>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => navegarPara("Pagamentos", "analise-ci")}>
                Ir para Mesa de Análise
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagamentosPendentes.slice(0, 5).map(pagamento => (
                <div key={pagamento.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{pagamento.fornecedor}</p>
                      {pagamento.temAlerta && (
                        <Badge variant="destructive" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {pagamento.motivoAlerta}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{pagamento.projeto}</p>
                    <p className="text-xs text-muted-foreground">
                      Venc: {format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">
                      R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Minhas Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atividadesRecentes.slice(0, 5).map(atividade => (
                <div key={atividade.id} className="flex items-start gap-3 py-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCorAtividade(atividade.tipo)}`}>
                    {getIconeAtividade(atividade.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{atividade.descricao}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {atividade.projeto} • {format(atividade.timestamp, "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Atenção Necessária */}
      {(totalVencidosCI > 0 || totalVenceHoje > 0) && (
        <Card className="border-2 border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-base text-red-700">Atenção Necessária - Prazos Críticos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {totalVenceHoje > 0 && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Pagamentos Vencendo Hoje</p>
                      <p className="text-xs text-muted-foreground">
                        {totalVenceHoje} pagamento(s) requer aprovação urgente
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="default" onClick={() => navegarPara("Pagamentos", "vence-hoje")}>
                    Analisar Agora
                  </Button>
                </div>
              )}
              {totalVencidosCI > 0 && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Pagamentos Vencidos</p>
                      <p className="text-xs text-muted-foreground">
                        {totalVencidosCI} pagamento(s) - Total: R$ {valorVencidosCI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => navegarPara("Pagamentos", "vencidos")}>
                    Validar
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}