/**
 * MOVIOCA - Meus Pagamentos (Fornecedor)
 * 
 * PRD 008 - Seção 3.3: Dashboard Financeira (Meus Pagamentos)
 * 
 * Lista completa de parcelas/pagamentos com:
 * - Resumo financeiro (Valor a Receber, Valor Pago)
 * - Tabela de parcelas com status
 * - Ações: Enviar Nota Fiscal, Ver Comprovante
 * - Responsivo (cards em mobile)
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DollarSign, Upload, Download, AlertCircle, FileText } from "lucide-react";
import ModalEnvioNF from "./ModalEnvioNF";
import { toast } from "sonner@2.0.3";

type StatusPagamento =
  | "Aguardando NF"
  | "Em Análise"
  | "Agendado"
  | "Pago"
  | "Correção Solicitada";

interface Parcela {
  id: string;
  projeto: string;
  referencia: string;
  dataPrevista: string;
  valorBruto: number;
  status: StatusPagamento;
  motivoRecusa?: string;
  comprovanteUrl?: string;
}

export default function FornecedorPagamentos() {
  const [modalNFOpen, setModalNFOpen] = useState(false);
  const [parcelaParaNF, setParcelaParaNF] = useState<Parcela | null>(null);
  const [modalMotivoOpen, setModalMotivoOpen] = useState(false);
  const [parcelaMotivo, setParcelaMotivo] = useState<Parcela | null>(null);

  // Dados mockados (em produção virão da API)
  const parcelas: Parcela[] = [
    {
      id: "1",
      projeto: "Projeto Alpha",
      referencia: "Parcela 1/3",
      dataPrevista: "30/01/2025",
      valorBruto: 50000,
      status: "Aguardando NF",
    },
    {
      id: "2",
      projeto: "Projeto Alpha",
      referencia: "Parcela 2/3",
      dataPrevista: "28/02/2025",
      valorBruto: 50000,
      status: "Agendado",
    },
    {
      id: "3",
      projeto: "Projeto Beta",
      referencia: "Parcela Única",
      dataPrevista: "15/01/2025",
      valorBruto: 25000,
      status: "Pago",
      comprovanteUrl: "#",
    },
    {
      id: "4",
      projeto: "Projeto Alpha",
      referencia: "Entrada",
      dataPrevista: "05/01/2025",
      valorBruto: 12500,
      status: "Correção Solicitada",
      motivoRecusa: "CNPJ do tomador incorreto na nota fiscal",
    },
    {
      id: "5",
      projeto: "Projeto Gamma",
      referencia: "Parcela 1/2",
      dataPrevista: "20/02/2025",
      valorBruto: 37500,
      status: "Em Análise",
    },
  ];

  // Calcular resumo
  const valorAReceber = parcelas
    .filter((p) => p.status !== "Pago")
    .reduce((acc, p) => acc + p.valorBruto, 0);

  const valorPago = parcelas
    .filter((p) => p.status === "Pago")
    .reduce((acc, p) => acc + p.valorBruto, 0);

  // Configuração de status
  const getStatusConfig = (status: StatusPagamento) => {
    const configs = {
      "Aguardando NF": {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      },
      "Em Análise": {
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      },
      Agendado: {
        variant: "secondary" as const,
        className: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      },
      Pago: {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      },
      "Correção Solicitada": {
        variant: "destructive" as const,
        className: "",
      },
    };

    return configs[status];
  };

  // Abrir modal de envio de NF
  const handleEnviarNF = (parcela: Parcela) => {
    setParcelaParaNF(parcela);
    setModalNFOpen(true);
  };

  // Callback do envio de NF
  const handleNFEnviada = (dados: any) => {
    console.log("NF enviada:", dados);
    // Em produção, atualizar o status da parcela via API
  };

  // Baixar comprovante
  const handleBaixarComprovante = (parcela: Parcela) => {
    toast.success(`Baixando comprovante de ${parcela.referencia}...`);
    // Em produção, fazer download do arquivo
  };

  // Ver motivo de recusa
  const handleVerMotivo = (parcela: Parcela) => {
    setParcelaMotivo(parcela);
    setModalMotivoOpen(true);
  };

  // Reenviar NF direto do modal de motivo
  const handleReenviarNF = () => {
    setModalMotivoOpen(false);
    if (parcelaMotivo) {
      handleEnviarNF(parcelaMotivo);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-1">Meus Pagamentos</h2>
        <p className="text-muted-foreground">Gestão de parcelas e notas fiscais</p>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Valor a Receber</CardTitle>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-primary">
              R$ {valorAReceber.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {parcelas.filter((p) => p.status !== "Pago").length} parcelas pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Valor Pago</CardTitle>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-green-600 dark:text-green-400">
              R$ {valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {parcelas.filter((p) => p.status === "Pago").length} parcelas quitadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Parcelas - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Lista de Parcelas</CardTitle>
          <CardDescription>
            Todas as parcelas de pagamento de seus contratos com a Movioca
          </CardDescription>
        </CardHeader>
        <CardContent>
          {parcelas.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum pagamento programado no momento</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead>Data Prevista</TableHead>
                  <TableHead className="text-right">Valor Bruto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelas.map((parcela) => {
                  const statusConfig = getStatusConfig(parcela.status);
                  
                  return (
                    <TableRow key={parcela.id}>
                      <TableCell className="font-medium">{parcela.projeto}</TableCell>
                      <TableCell>{parcela.referencia}</TableCell>
                      <TableCell>{parcela.dataPrevista}</TableCell>
                      <TableCell className="text-right">
                        R$ {parcela.valorBruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={statusConfig.variant}
                          className={statusConfig.className}
                        >
                          {parcela.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Enviar NF */}
                          {(parcela.status === "Aguardando NF" ||
                            parcela.status === "Correção Solicitada") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEnviarNF(parcela)}
                              className="gap-1"
                            >
                              <Upload className="w-3 h-3" />
                              Enviar NF
                            </Button>
                          )}

                          {/* Ver Motivo de Recusa */}
                          {parcela.status === "Correção Solicitada" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleVerMotivo(parcela)}
                              className="gap-1 text-destructive"
                            >
                              <AlertCircle className="w-3 h-3" />
                              Ver Motivo
                            </Button>
                          )}

                          {/* Baixar Comprovante */}
                          {parcela.status === "Pago" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBaixarComprovante(parcela)}
                              className="gap-1"
                            >
                              <Download className="w-3 h-3" />
                              Comprovante
                            </Button>
                          )}

                          {/* Em Análise / Agendado - sem ação */}
                          {(parcela.status === "Em Análise" || parcela.status === "Agendado") && (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Cards de Parcelas - Mobile */}
      <div className="md:hidden space-y-4">
        {parcelas.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum pagamento programado no momento</p>
            </CardContent>
          </Card>
        ) : (
          parcelas.map((parcela) => {
            const statusConfig = getStatusConfig(parcela.status);
            
            return (
              <Card key={parcela.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{parcela.projeto}</p>
                      <p className="text-sm text-muted-foreground">{parcela.referencia}</p>
                    </div>
                    <Badge variant={statusConfig.variant} className={statusConfig.className}>
                      {parcela.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Data Prevista:</p>
                      <p className="font-medium">{parcela.dataPrevista}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valor:</p>
                      <p className="font-medium">
                        R$ {parcela.valorBruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {parcela.motivoRecusa && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <p className="text-xs text-destructive">
                        <strong>Motivo da recusa:</strong> {parcela.motivoRecusa}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {(parcela.status === "Aguardando NF" ||
                      parcela.status === "Correção Solicitada") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEnviarNF(parcela)}
                        className="flex-1 gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        Enviar NF
                      </Button>
                    )}

                    {parcela.status === "Correção Solicitada" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVerMotivo(parcela)}
                        className="flex-1 gap-1 text-destructive"
                      >
                        <AlertCircle className="w-3 h-3" />
                        Ver Motivo
                      </Button>
                    )}

                    {parcela.status === "Pago" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBaixarComprovante(parcela)}
                        className="flex-1 gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Comprovante
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Envio de NF */}
      {parcelaParaNF && (
        <ModalEnvioNF
          open={modalNFOpen}
          onOpenChange={setModalNFOpen}
          parcela={{
            projeto: parcelaParaNF.projeto,
            referencia: parcelaParaNF.referencia,
            valor: parcelaParaNF.valorBruto,
            dataVencimento: parcelaParaNF.dataPrevista,
          }}
          onEnviar={handleNFEnviada}
        />
      )}

      {/* Modal de Motivo de Recusa */}
      {parcelaMotivo && (
        <Dialog open={modalMotivoOpen} onOpenChange={setModalMotivoOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                Correção Solicitada
              </DialogTitle>
              <DialogDescription>
                A nota fiscal desta parcela foi recusada e precisa ser corrigida
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Informações da Parcela */}
              <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Projeto</p>
                    <p className="font-semibold">{parcelaMotivo.projeto}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Referência</p>
                    <p className="font-semibold">{parcelaMotivo.referencia}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valor</p>
                    <p className="font-semibold">
                      R$ {parcelaMotivo.valorBruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Data Prevista</p>
                    <p className="font-semibold">{parcelaMotivo.dataPrevista}</p>
                  </div>
                </div>
              </div>

              {/* Motivo da Recusa */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-destructive mb-2">Motivo da recusa:</p>
                    <p className="text-sm">{parcelaMotivo.motivoRecusa}</p>
                  </div>
                </div>
              </div>

              {/* Instruções */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/20 rounded-lg p-4">
                <p className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                  Como proceder:
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
                  <li>Corrija as informações indicadas acima na sua nota fiscal</li>
                  <li>Gere uma nova nota fiscal com os dados corretos</li>
                  <li>Envie a nota fiscal corrigida através do botão abaixo</li>
                  <li>Aguarde a nova análise pela equipe financeira</li>
                </ul>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => setModalMotivoOpen(false)}
              >
                Fechar
              </Button>
              <Button
                onClick={handleReenviarNF}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Enviar NF Corrigida
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}