/**
 * MOVIOCA - Dashboard Controladoria Dedicada (CD)
 * 
 * PRD 006 - Seção 3.3: Visão Geral de Compliance do Projeto
 * 
 * Profissional contratado para um projeto específico, atua no "front" da operação.
 * Mesa de Triagem Digital para validação de NFs e conferência de verbas.
 * 
 * CARDS DE PENDÊNCIA:
 * - NFs para validar (Triagem nível 1)
 * - Lotes de Verba para conferir
 * - Pagamentos devolvidos pela CI
 * 
 * GRÁFICO: Volume de pagamentos processados na semana
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertCircle,
  ClipboardCheck,
  FolderCheck,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DashboardCDProps {
  onNavigate: (screen: string) => void;
}

export default function DashboardControladoriaDedicada({ onNavigate }: DashboardCDProps) {
  // Dados do projeto vinculado à CD
  const projetoVinculado = "Filme A";

  // Mock de dados de pendências
  const pendenciasData = {
    nfsParaValidar: 8,
    lotesParaConferir: 3,
    pagamentosDevolvidos: 2,
  };

  // Mock de dados do gráfico semanal
  const graficoSemanal = [
    { dia: "Seg", validados: 5, devolvidos: 1 },
    { dia: "Ter", validados: 8, devolvidos: 0 },
    { dia: "Qua", validados: 6, devolvidos: 2 },
    { dia: "Qui", validados: 12, devolvidos: 1 },
    { dia: "Sex", validados: 4, devolvidos: 0 },
    { dia: "Sáb", validados: 0, devolvidos: 0 },
    { dia: "Dom", validados: 0, devolvidos: 0 },
  ];

  // Mock de NFs pendentes (últimas 5)
  const nfsPendentes = [
    {
      id: 1,
      fornecedor: "Locadora de Veículos XYZ",
      io: "2.01.01 - Transporte",
      valor: 4500.0,
      vencimento: "2025-12-08",
      urgente: true,
    },
    {
      id: 2,
      fornecedor: "Catering Gourmet Ltda",
      io: "3.04.02 - Alimentação de Set",
      valor: 2800.0,
      vencimento: "2025-12-09",
      urgente: true,
    },
    {
      id: 3,
      fornecedor: "Estúdio de Som Master",
      io: "5.02.03 - Mixagem",
      valor: 15000.0,
      vencimento: "2025-12-12",
      urgente: false,
    },
    {
      id: 4,
      fornecedor: "Equipamentos Cine Tech",
      io: "4.01.02 - Câmeras",
      valor: 8200.0,
      vencimento: "2025-12-15",
      urgente: false,
    },
    {
      id: 5,
      fornecedor: "Figurino Designer Pro",
      io: "3.03.01 - Figurino Principal",
      valor: 6700.0,
      vencimento: "2025-12-18",
      urgente: false,
    },
  ];

  // Mock de lotes de verba pendentes
  const lotesPendentes = [
    {
      id: 1,
      solicitante: "Produtor de Arte",
      qtdDespesas: 18,
      valorTotal: 2450.0,
      dataSolicitacao: "2025-12-05",
    },
    {
      id: 2,
      solicitante: "Diretor de Fotografia",
      qtdDespesas: 7,
      valorTotal: 890.0,
      dataSolicitacao: "2025-12-06",
    },
    {
      id: 3,
      solicitante: "Assistente de Produção",
      qtdDespesas: 22,
      valorTotal: 1320.0,
      dataSolicitacao: "2025-12-07",
    },
  ];

  const totalPendencias =
    pendenciasData.nfsParaValidar +
    pendenciasData.lotesParaConferir +
    pendenciasData.pagamentosDevolvidos;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-foreground">
              Visão Geral de Compliance
            </h2>
            <p className="text-muted-foreground mt-2">
              Projeto vinculado:{" "}
              <span className="text-foreground">{projetoVinculado}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {totalPendencias > 0 && (
              <Badge variant="destructive" className="h-8 px-3">
                {totalPendencias}{" "}
                {totalPendencias === 1 ? "pendência" : "pendências"}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Cards de Pendência */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NFs para Validar */}
        <Card className="hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => onNavigate("Triagem de Pagamentos")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              NFs para Validar
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl">{pendenciasData.nfsParaValidar}</div>
              <span className="text-sm text-muted-foreground">
                pagamentos aguardando triagem
              </span>
            </div>
            {pendenciasData.nfsParaValidar > 0 && (
              <Button
                variant="link"
                className="p-0 h-auto mt-3 text-primary"
                onClick={() => onNavigate("Triagem de Pagamentos")}
              >
                Ir para Triagem de Pagamentos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Lotes de Verba para Conferir */}
        <Card className="hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => onNavigate("Conferência de Verba")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lotes de Verba para Conferir
            </CardTitle>
            <FolderCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl">
                {pendenciasData.lotesParaConferir}
              </div>
              <span className="text-sm text-muted-foreground">
                lotes aguardando conferência
              </span>
            </div>
            {pendenciasData.lotesParaConferir > 0 && (
              <Button
                variant="link"
                className="p-0 h-auto mt-3 text-primary"
                onClick={() => onNavigate("Conferência de Verba")}
              >
                Ir para Conferência de Verba
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Pagamentos Devolvidos pela CI */}
        <Card className="border-destructive/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Devolvidos pela CI
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl text-destructive">
                {pendenciasData.pagamentosDevolvidos}
              </div>
              <span className="text-sm text-muted-foreground">
                com erro de validação
              </span>
            </div>
            {pendenciasData.pagamentosDevolvidos > 0 && (
              <Button
                variant="link"
                className="p-0 h-auto mt-3 text-destructive"
                onClick={() => onNavigate("Triagem de Pagamentos")}
              >
                Ver devoluções
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Fluxo Semanal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fluxo de Validação desta Semana</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Volume de pagamentos processados por dia
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graficoSemanal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="validados"
                fill="#8B5CF6"
                name="Validados"
              />
              <Bar
                dataKey="devolvidos"
                fill="#EF4444"
                name="Devolvidos"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabelas de Últimas Pendências */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NFs Urgentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>NFs Urgentes (Próximas 48h)</CardTitle>
              <Badge variant="destructive" className="h-6">
                {nfsPendentes.filter((nf) => nf.urgente).length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nfsPendentes
                .filter((nf) => nf.urgente)
                .map((nf) => (
                  <div
                    key={nf.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => onNavigate("Triagem de Pagamentos")}
                  >
                    <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{nf.fornecedor}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {nf.io}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          R$ {nf.valor.toLocaleString("pt-BR")}
                        </Badge>
                        <span className="text-xs text-destructive">
                          Vence {new Date(nf.vencimento).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              {nfsPendentes.filter((nf) => nf.urgente).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm">Nenhuma NF urgente no momento</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lotes de Verba Pendentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lotes de Verba Aguardando</CardTitle>
              <Badge variant="secondary" className="h-6">
                {lotesPendentes.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lotesPendentes.map((lote) => (
                <div
                  key={lote.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate("Conferência de Verba")}
                >
                  <FileText className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{lote.solicitante}</p>
                    <p className="text-xs text-muted-foreground">
                      {lote.qtdDespesas}{" "}
                      {lote.qtdDespesas === 1 ? "despesa" : "despesas"} • R${" "}
                      {lote.valorTotal.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enviado em{" "}
                      {new Date(lote.dataSolicitacao).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              ))}

              {lotesPendentes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm">Nenhum lote aguardando conferência</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Footer */}
      <Card className="bg-muted/30 border-muted">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">
                <span className="font-medium">Sua função:</span> Você é a
                primeira linha de auditoria. Valide se o serviço/produto foi
                entregue conforme o contratado e se a documentação está
                completa antes de enviar para a Controladoria Interna (CI).
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium">Lembre-se:</span> Você{" "}
                <span className="underline">não pode alterar valores</span> de
                pagamentos, apenas aprovar, reprovar ou solicitar correções. Em
                lotes de verba, você pode <span className="underline">glosar
                itens individuais</span> e <span className="underline">corrigir
                classificações orçamentárias</span>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}