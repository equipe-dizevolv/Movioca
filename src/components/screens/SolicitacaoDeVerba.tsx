import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  ChevronLeft,
  CreditCard,
  User,
  Building2,
  Calendar as CalendarIcon,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SolicitacaoVerba {
  id: string;
  data: Date;
  solicitante: string;
  departamento: string;
  cartaoId: string;
  numeroCartao: string;
  cpfVinculado: string;
  valorSolicitado: number;
  valorAprovado?: number;
  justificativa?: string;
  observacao?: string;
  status: string;
  dataAprovacao?: Date;
  aprovadoPor?: string;
}

interface SolicitacaoDeVerbaProps {
  solicitacao: SolicitacaoVerba;
  onVoltar: () => void;
}

export function SolicitacaoDeVerba({ solicitacao, onVoltar }: SolicitacaoDeVerbaProps) {
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status.includes("Aprovado") || status === "Liberado") return "default";
    if (status.includes("Aguardando") || status.includes("Pendente")) return "secondary";
    if (status.includes("Reprovado")) return "destructive";
    return "outline";
  };

  const getStatusIcon = (status: string) => {
    if (status.includes("Aprovado") || status === "Liberado para reembolso") {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (status.includes("Aguardando") || status.includes("Pendente")) {
      return <Clock className="w-5 h-5 text-orange-500" />;
    }
    if (status.includes("Reprovado")) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <FileText className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb e Header */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Verbas</span>
          <span>/</span>
          <span>Solicitações de Verba</span>
          <span>/</span>
          <span className="text-foreground font-medium">Detalhes</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onVoltar}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Solicitação de Verba</h1>
              <p className="text-sm text-muted-foreground">
                ID: {solicitacao.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Card de Status */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(solicitacao.status)}
                  <div>
                    <p className="text-sm text-muted-foreground">Status da Solicitação</p>
                    <Badge variant={getStatusBadgeVariant(solicitacao.status)} className="text-base px-4 py-1 mt-1">
                      {solicitacao.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Data da Solicitação</p>
                  <p className="text-lg font-semibold">
                    {format(solicitacao.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cards de Informação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações do Solicitante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações do Solicitante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-semibold text-lg">{solicitacao.solicitante}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Departamento</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{solicitacao.departamento}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Cartão */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Cartão Corporativo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número do Cartão</p>
                  <p className="font-mono font-semibold text-lg">{solicitacao.numeroCartao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF Vinculado</p>
                  <p className="font-mono font-medium">{solicitacao.cpfVinculado}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Valores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Valores da Solicitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground mb-1">Valor Solicitado</p>
                  <p className="text-3xl font-bold text-blue-600">{formatCurrency(solicitacao.valorSolicitado)}</p>
                </div>
                {solicitacao.valorAprovado !== undefined && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground mb-1">Valor Aprovado</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(solicitacao.valorAprovado)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Justificativa */}
          {solicitacao.justificativa && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Justificativa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{solicitacao.justificativa}</p>
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          {solicitacao.observacao && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{solicitacao.observacao}</p>
              </CardContent>
            </Card>
          )}

          {/* Informações de Aprovação */}
          {(solicitacao.dataAprovacao || solicitacao.aprovadoPor) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Informações de Aprovação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {solicitacao.aprovadoPor && (
                  <div>
                    <p className="text-sm text-muted-foreground">Aprovado por</p>
                    <p className="font-semibold">{solicitacao.aprovadoPor}</p>
                  </div>
                )}
                {solicitacao.dataAprovacao && (
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Aprovação</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">
                        {format(solicitacao.dataAprovacao, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timeline / Histórico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico da Solicitação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div className="w-0.5 h-full bg-border"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold">Solicitação Criada</p>
                    <p className="text-sm text-muted-foreground">
                      {format(solicitacao.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Por {solicitacao.solicitante}
                    </p>
                  </div>
                </div>

                {solicitacao.dataAprovacao && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      {solicitacao.status === "Liberado para reembolso" && <div className="w-0.5 h-full bg-border"></div>}
                    </div>
                    <div className={solicitacao.status === "Liberado para reembolso" ? "pb-4" : ""}>
                      <p className="font-semibold">Solicitação Aprovada</p>
                      <p className="text-sm text-muted-foreground">
                        {format(solicitacao.dataAprovacao, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                      {solicitacao.aprovadoPor && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Por {solicitacao.aprovadoPor}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {solicitacao.status === "Liberado para reembolso" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Aguardando Prestação de Contas</p>
                      <p className="text-sm text-muted-foreground">
                        A verba foi liberada no cartão e aguarda prestação de contas
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
