/**
 * MOVIOCA - Dashboard de Liquidez e Previsão (Perfil Financeiro)
 * 
 * Dashboard focado em gestão de liquidez e cumprimento do calendário de pagamentos.
 * KPIs de Ciclo fixos no topo (dias 10, 20 e 30).
 * Cálculo dinâmico: Saldo Atual - Comprometido = Resultado Projetado
 * 
 * Baseado no "Esboço Padaria" com métricas em tempo real.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  CreditCard,
  FileText,
  ArrowRight,
  Building2,
  Users,
  Wallet,
} from "lucide-react";
import { useProjectFilter } from "../../contexts/ProjectFilterContext";

interface DashboardFinanceiroProps {
  onNavigate?: (screen: string) => void;
}

export default function DashboardFinanceiro({ onNavigate }: DashboardFinanceiroProps) {
  const { selectedProject } = useProjectFilter();

  // Mock Data baseado no "Esboço Padaria" - Love Taste 1T
  const mockData = {
    "Love Taste 1T": {
      proximoCiclo: {
        data: 10,
        mes: "Janeiro",
        ano: 2025,
        valorTotal: 53500,
        quantidadeTitulos: 2,
      },
      saldos: {
        saldoAtual1T: 150000,
        saldoAtual2T: 280000,
      },
      comprometido: {
        aprovadosPorCI: 95000, // Valores que já passaram pela aprovação da Controladoria Interna
      },
      ciclos: {
        dia10: {
          valor: 53500,
          titulos: 2,
          detalhes: [
            { tipo: "Fornecedor", descricao: "Locadora XYZ + Estúdio ABC", valor: 53500 },
          ],
        },
        dia20: {
          valor: 4400,
          titulos: 2,
          detalhes: [
            { tipo: "Equipe", descricao: "Ana Costa (Reembolso)", valor: 1200 },
            { tipo: "Fornecedor", descricao: "Catering Delícias", valor: 3200 },
          ],
        },
        dia30: {
          valor: 40000,
          titulos: 2,
          detalhes: [
            { tipo: "Elenco", descricao: "Maria da Luz", valor: 15000 },
            { tipo: "Equipe", descricao: "João Silva (Diretor)", valor: 25000 },
          ],
        },
      },
      reembolsos: {
        movioca: 17400,
        cartoesPendentes: 6500,
      },
      realizados: {
        totalRealizado: 450000,
        totalOrcado: 800000,
      },
    },
    "Love Taste 2T": {
      proximoCiclo: {
        data: 20,
        mes: "Janeiro",
        ano: 2025,
        valorTotal: 28000,
        quantidadeTitulos: 3,
      },
      saldos: {
        saldoAtual1T: 80000,
        saldoAtual2T: 320000,
      },
      comprometido: {
        aprovadosPorCI: 65000,
      },
      ciclos: {
        dia10: {
          valor: 15000,
          titulos: 1,
          detalhes: [{ tipo: "Fornecedor", descricao: "Equipamentos", valor: 15000 }],
        },
        dia20: {
          valor: 28000,
          titulos: 3,
          detalhes: [
            { tipo: "Equipe", descricao: "Direção de Arte", valor: 18000 },
            { tipo: "Fornecedor", descricao: "Locação Cenários", valor: 10000 },
          ],
        },
        dia30: {
          valor: 22000,
          titulos: 2,
          detalhes: [{ tipo: "Elenco", descricao: "Elenco Principal", valor: 22000 }],
        },
      },
      reembolsos: {
        movioca: 8500,
        cartoesPendentes: 3200,
      },
      realizados: {
        totalRealizado: 380000,
        totalOrcado: 750000,
      },
    },
  };

  const currentData = mockData[selectedProject as keyof typeof mockData] || mockData["Love Taste 1T"];

  // Cálculo dinâmico: Resultado Projetado
  const saldoDisponivelTotal = currentData.saldos.saldoAtual1T + currentData.saldos.saldoAtual2T;
  const resultadoProjetado = saldoDisponivelTotal - currentData.comprometido.aprovadosPorCI;
  const alertaEstouro = resultadoProjetado < 0;

  const proximoCicloData = new Date(
    currentData.proximoCiclo.ano,
    0, // Janeiro = 0
    currentData.proximoCiclo.data
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const handleNavigate = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard de Liquidez</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Gestão de liquidez e calendário de pagamentos • Projeto:{" "}
          <span className="font-medium text-purple-600">{selectedProject || "Love Taste 1T"}</span>
        </p>
      </div>

      {/* KPIs de Ciclo - Sticky Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 pb-4 -mx-6 px-6 pt-2 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Próxima Data de Pagamento */}
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Próximo Ciclo</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-purple-600">Dia {currentData.proximoCiclo.data}</p>
                    <p className="text-xs text-gray-500">{proximoCicloData}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {currentData.proximoCiclo.quantidadeTitulos} {currentData.proximoCiclo.quantidadeTitulos === 1 ? "título" : "títulos"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-lg font-bold">{formatCurrency(currentData.proximoCiclo.valorTotal)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saldo Atual 1T */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Saldo Atual 1T</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(currentData.saldos.saldoAtual1T)}</p>
              <p className="text-xs text-gray-500 mt-1">Disponível em conta</p>
            </CardContent>
          </Card>

          {/* Saldo Atual 2T */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Saldo Atual 2T</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(currentData.saldos.saldoAtual2T)}</p>
              <p className="text-xs text-gray-500 mt-1">Disponível em conta</p>
            </CardContent>
          </Card>

          {/* Resultado Projetado */}
          <Card className={alertaEstouro ? "border-2 border-red-500" : "border-2 border-green-200 dark:border-green-800"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {alertaEstouro ? (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                )}
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Resultado Projetado</p>
              </div>
              <p className={`text-2xl font-bold ${alertaEstouro ? "text-red-600" : "text-green-600"}`}>
                {formatCurrency(resultadoProjetado)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Saldo - Comprometido ({formatCurrency(currentData.comprometido.aprovadosPorCI)})
              </p>
              {alertaEstouro && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  ⚠ Alerta de Estouro
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendário de Pagamentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dia 10 */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <span className="text-blue-600 font-bold">10</span>
              </div>
              Ciclo Dia 10
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Programado</span>
              <span className="font-bold text-blue-600">{formatCurrency(currentData.ciclos.dia10.valor)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-4 w-4" />
              <span>{currentData.ciclos.dia10.titulos} {currentData.ciclos.dia10.titulos === 1 ? "título" : "títulos"}</span>
            </div>
            <div className="space-y-2 pt-2">
              {currentData.ciclos.dia10.detalhes.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <Badge variant="outline" className="text-xs">
                    {item.tipo}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">{item.descricao}</p>
                    <p className="text-gray-500">{formatCurrency(item.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dia 20 */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <span className="text-purple-600 font-bold">20</span>
              </div>
              Ciclo Dia 20
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Programado</span>
              <span className="font-bold text-purple-600">{formatCurrency(currentData.ciclos.dia20.valor)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-4 w-4" />
              <span>{currentData.ciclos.dia20.titulos} {currentData.ciclos.dia20.titulos === 1 ? "título" : "títulos"}</span>
            </div>
            <div className="space-y-2 pt-2">
              {currentData.ciclos.dia20.detalhes.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <Badge variant="outline" className="text-xs">
                    {item.tipo}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">{item.descricao}</p>
                    <p className="text-gray-500">{formatCurrency(item.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dia 30 */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                <span className="text-green-600 font-bold">30</span>
              </div>
              Ciclo Dia 30
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Programado</span>
              <span className="font-bold text-green-600">{formatCurrency(currentData.ciclos.dia30.valor)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="h-4 w-4" />
              <span>{currentData.ciclos.dia30.titulos} {currentData.ciclos.dia30.titulos === 1 ? "título" : "títulos"}</span>
            </div>
            <div className="space-y-2 pt-2">
              {currentData.ciclos.dia30.detalhes.map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <Badge variant="outline" className="text-xs">
                    {item.tipo}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300">{item.descricao}</p>
                    <p className="text-gray-500">{formatCurrency(item.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gestão Financeira */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate("Gestão Financeira")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Gestão Financeira</h3>
                  <p className="text-xs text-gray-500">Hub de execução de pagamentos</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Reembolsos Pendentes */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate("Reembolsos")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Reembolsos</h3>
                  <p className="text-xs text-gray-500">{formatCurrency(currentData.reembolsos.movioca)} pendentes</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Cartões Pendentes */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate("Gestão Financeira")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Cartões Corporativos</h3>
                  <p className="text-xs text-gray-500">{formatCurrency(currentData.reembolsos.cartoesPendentes)} em aberto</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Execução Orçamentária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Execução Orçamentária
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Orçado</span>
              <span className="font-semibold">{formatCurrency(currentData.realizados.totalOrcado)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Realizado</span>
              <span className="font-semibold text-green-600">{formatCurrency(currentData.realizados.totalRealizado)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
                style={{
                  width: `${(currentData.realizados.totalRealizado / currentData.realizados.totalOrcado) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {((currentData.realizados.totalRealizado / currentData.realizados.totalOrcado) * 100).toFixed(1)}% executado
              </span>
              <span className="text-gray-500">
                Saldo: {formatCurrency(currentData.realizados.totalOrcado - currentData.realizados.totalRealizado)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
