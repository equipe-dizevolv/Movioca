"use client";

import { DollarSign, AlertTriangle, Upload, FileX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatarMoeda, formatarData } from "../../types/fornecedor";

interface FornecedorDashboardProps {
  onNavigate: (tela: "dashboard" | "meus-dados" | "pagamentos" | "documentos") => void;
}

export default function FornecedorDashboard({ onNavigate }: FornecedorDashboardProps) {
  // Dados mockados (serão dinâmicos na Fase 3)
  const resumo = {
    proximaData: new Date("2025-01-30"),
    quantidadePagamentos: 5,
    valorTotal: 187500,
    valorAReceber: 150000,
    valorPago: 37500,
  };

  const alertas = {
    pagamentosAtrasados: 0,
    notasPendentes: 1, // PRD 008: Alertas de notas pendentes
    notasReprovadas: 1, // PRD 008: Alertas de notas reprovadas
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl mb-1">Dashboard</h2>
        <p className="text-muted-foreground">Resumo operacional</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card: Pagamentos */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("pagamentos")}>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle>Pagamentos</CardTitle>
                <CardDescription className="mt-1">
                  Quantidade por próxima data de pagamento
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Próxima data */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Próxima data:</span>
              <span className="text-base">{formatarData(resumo.proximaData)}</span>
            </div>

            {/* Quantidade */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Quantidade de pagamentos:</span>
              <span className="text-2xl text-primary">{resumo.quantidadePagamentos}</span>
            </div>

            {/* Valor total */}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Valor total:</span>
              <span className="text-lg">{formatarMoeda(resumo.valorTotal)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card: Alertas de Prazo */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Alertas de prazo</CardTitle>
                  {alertas.pagamentosAtrasados > 0 && (
                    <Badge variant="destructive">{alertas.pagamentosAtrasados}</Badge>
                  )}
                </div>
                <CardDescription className="mt-1">
                  Itens que exigem atenção imediata
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Lista de Alertas */}
            <div className="space-y-4">
              {/* Alerta: Pagamentos Atrasados */}
              {alertas.pagamentosAtrasados > 0 && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">Pagamentos atrasados</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (data vencida e status diferente de Pago)
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {alertas.pagamentosAtrasados} {alertas.pagamentosAtrasados === 1 ? "item" : "itens"}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Estado vazio */}
              {alertas.pagamentosAtrasados === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">Nenhum alerta no momento</p>
                  <p className="text-xs mt-1">Tudo em dia! 🎉</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Financeiro */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Valor a Receber</p>
                <p className="text-2xl text-primary">{formatarMoeda(resumo.valorAReceber)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Valor Pago</p>
                <p className="text-2xl text-green-600 dark:text-green-400">{formatarMoeda(resumo.valorPago)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas de Notas Fiscais - PRD 008 */}
      {(alertas.notasPendentes > 0 || alertas.notasReprovadas > 0) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Ações Necessárias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notas Pendentes de Envio */}
            {alertas.notasPendentes > 0 && (
              <Card
                className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate("pagamentos")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-yellow-900 dark:text-yellow-200">
                          Notas Pendentes de Envio
                        </p>
                        <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 border-yellow-300">
                          {alertas.notasPendentes}
                        </Badge>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Você tem parcelas aguardando o envio de nota fiscal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notas Reprovadas */}
            {alertas.notasReprovadas > 0 && (
              <Card
                className="border-red-200 bg-red-50 dark:bg-red-950/20 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate("pagamentos")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <FileX className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-red-900 dark:text-red-200">
                          Notas Reprovadas
                        </p>
                        <Badge variant="outline" className="bg-red-100 dark:bg-red-900 border-red-300">
                          {alertas.notasReprovadas}
                        </Badge>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Correções necessárias em notas fiscais enviadas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}