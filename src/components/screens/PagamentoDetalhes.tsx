import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Download, 
  Upload, 
  FileText,
  Building2,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface PagamentoDetalhesProps {
  onVoltar: () => void;
  pagamentoId?: string;
}

export default function PagamentoDetalhes({ onVoltar, pagamentoId }: PagamentoDetalhesProps) {
  const [isRPA, setIsRPA] = useState(false);
  const [comprovanteAnexado, setComprovanteAnexado] = useState(false);
  const [observacoes, setObservacoes] = useState("");
  
  // Estados para modais
  const [openModalAprovar, setOpenModalAprovar] = useState(false);
  const [openModalReprovar, setOpenModalReprovar] = useState(false);
  const [openModalCorrecao, setOpenModalCorrecao] = useState(false);
  const [openModalRegistrarPagamento, setOpenModalRegistrarPagamento] = useState(false);
  
  // Estados para dados dos modais
  const [justificativaReprovacao, setJustificativaReprovacao] = useState("");
  const [motivoCorrecao, setMotivoCorrecao] = useState("");

  // Mock data - em produção viria do backend baseado no pagamentoId
  const pagamento = {
    id: pagamentoId || "PAG-001",
    projeto: "Projeto Alpha - Comercial XYZ",
    fornecedor: "João Silva Produções",
    cnpjCpf: "123.456.789-00",
    itemOrcamentario: "003.001 - Diretor(a)",
    parcela: "1/3",
    valor: 15000,
    vencimento: "15/12/2024",
    status: "Aguardando aprovação",
    etapaAtual: "Validação NF",
    formaPagamento: "Transferência bancária",
    dadosBancarios: {
      banco: "341 - Itaú",
      agencia: "1234",
      conta: "12345-6",
      tipoConta: "Conta Corrente",
      chavePix: "joao@email.com"
    },
    documentos: {
      notaFiscal: "NF-12345.pdf",
      contrato: "CONTRATO-001.pdf",
    },
    pipelineCompleto: [
      {
        id: 1,
        nome: "Envio do Pedido de NF",
        descricao: "Solicitação enviada ao fornecedor",
        responsavel: "Produção",
        status: "Concluído" as const,
        data: "28/11/2024",
        usuario: "Maria Silva"
      },
      {
        id: 2,
        nome: "Validação da Nota Fiscal",
        descricao: "Conferência de dados, valores e documentação",
        responsavel: "Controladoria D",
        status: "Em andamento" as const,
        data: null,
        usuario: null
      },
      {
        id: 3,
        nome: "Aprovação Controladoria D",
        descricao: "Primeira aprovação da controladoria descentralizada",
        responsavel: "Controladoria D",
        status: "Pendente" as const,
        data: null,
        usuario: null
      },
      {
        id: 4,
        nome: "Aprovação Conformidade",
        descricao: "Análise de conformidade documental e legal",
        responsavel: "Controladoria I",
        status: "Pendente" as const,
        data: null,
        usuario: null
      },
      {
        id: 5,
        nome: "Aprovação Financeira",
        descricao: "Validação de orçamento e disponibilidade financeira",
        responsavel: "Controladoria I",
        status: "Pendente" as const,
        data: null,
        usuario: null
      },
      {
        id: 6,
        nome: "Liberação para Pagamento",
        descricao: "Autorização final e inclusão na programação financeira",
        responsavel: "Controladoria I",
        status: "Pendente" as const,
        data: null,
        usuario: null
      },
      {
        id: 7,
        nome: "Pagamento Realizado",
        descricao: "Execução do pagamento e registro do comprovante",
        responsavel: "Financeiro",
        status: "Pendente" as const,
        data: null,
        usuario: null
      }
    ]
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className: string }> = {
      "Pendente": { variant: "secondary", className: "bg-gray-100 text-gray-700" },
      "Concluído": { variant: "default", className: "bg-green-100 text-green-700" },
      "Aprovado": { variant: "default", className: "bg-green-100 text-green-700" },
      "Reprovado": { variant: "destructive", className: "bg-red-100 text-red-700" },
    };

    const config = statusMap[status] || statusMap["Pendente"];
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const handleAnexarComprovante = () => {
    // Simula upload de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        setComprovanteAnexado(true);
        toast.success(`Comprovante "${file.name}" anexado com sucesso!`);
      }
    };
    input.click();
  };

  const handleAprovar = () => {
    setOpenModalAprovar(true);
  };

  const confirmarAprovacao = () => {
    toast.success("Pagamento aprovado pela Controladoria!");
    setOpenModalAprovar(false);
    // Aqui iria a lógica de aprovação no backend
  };

  const handleReprovar = () => {
    setOpenModalReprovar(true);
  };

  const confirmarReprovacao = () => {
    if (!justificativaReprovacao.trim()) {
      toast.error("Por favor, informe a justificativa da reprovação.");
      return;
    }
    toast.error("Pagamento reprovado!");
    setOpenModalReprovar(false);
    setJustificativaReprovacao("");
    // Aqui iria a lógica de reprovação no backend
  };

  const handleSolicitarCorrecao = () => {
    if (!motivoCorrecao.trim()) {
      toast.error("Por favor, descreva o que precisa ser corrigido.");
      return;
    }
    toast.info("Solicitação de correção enviada ao fornecedor!");
    setOpenModalCorrecao(false);
    setMotivoCorrecao("");
    // Aqui iria a lógica de solicitação de correção
  };

  const handleRegistrarPagamento = () => {
    if (!comprovanteAnexado) {
      toast.error("Por favor, anexe o comprovante de pagamento antes de registrar!");
      return;
    }
    setOpenModalRegistrarPagamento(true);
  };

  const confirmarRegistroPagamento = () => {
    toast.success("Pagamento registrado como realizado!");
    setOpenModalRegistrarPagamento(false);
    // Aqui iria a lógica de registro do pagamento no backend
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header com Breadcrumb */}
      <div>
        <Button 
          variant="ghost" 
          onClick={onVoltar}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Pagamentos
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-foreground">Detalhes do Pagamento</h2>
            <p className="text-muted-foreground mt-1">
              {pagamento.id} • {pagamento.projeto}
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 text-base px-4 py-2">
            {pagamento.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Coluna Principal - Informações do Pagamento */}
        <div className="col-span-2 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Projeto</Label>
                  <p className="mt-1">{pagamento.projeto}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Item Orçamentário</Label>
                  <p className="mt-1">{pagamento.itemOrcamentario}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Fornecedor</Label>
                  <p className="mt-1">{pagamento.fornecedor}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">CPF/CNPJ</Label>
                  <p className="mt-1">{pagamento.cnpjCpf}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Parcela</Label>
                  <p className="mt-1">{pagamento.parcela}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Vencimento</Label>
                  <p className="mt-1">{pagamento.vencimento}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Valor</Label>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {formatCurrency(pagamento.valor)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Forma de Pagamento</Label>
                  <p className="mt-1">{pagamento.formaPagamento}</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Toggle RPA */}
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <div>
                    <Label className="text-base">Pagamento RPA (Recibo de Pagamento a Autônomo)</Label>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Ative para tratamento fiscal diferenciado
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isRPA}
                  onCheckedChange={setIsRPA}
                />
              </div>

              {isRPA && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    ⚠️ Este pagamento será processado como RPA, com retenções fiscais apropriadas (INSS, IR, ISS).
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dados Bancários */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Dados Bancários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Banco</Label>
                  <p className="mt-1">{pagamento.dadosBancarios.banco}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Agência</Label>
                  <p className="mt-1">{pagamento.dadosBancarios.agencia}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Conta</Label>
                  <p className="mt-1">{pagamento.dadosBancarios.conta}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tipo de Conta</Label>
                  <p className="mt-1">{pagamento.dadosBancarios.tipoConta}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Chave PIX</Label>
                  <p className="mt-1">{pagamento.dadosBancarios.chavePix}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pagamento.documentos.notaFiscal && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Nota Fiscal</p>
                      <p className="text-xs text-muted-foreground">{pagamento.documentos.notaFiscal}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {pagamento.documentos.contrato && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Contrato</p>
                      <p className="text-xs text-muted-foreground">{pagamento.documentos.contrato}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Separator />

              {/* Comprovante de Pagamento */}
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <Label className="text-base flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Comprovante de Pagamento Final
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Essencial para registro do Realizado pelo Financeiro
                </p>
                {comprovanteAnexado ? (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Comprovante anexado</p>
                        <p className="text-xs text-muted-foreground">comprovante_pagamento.pdf</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setComprovanteAnexado(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full border-dashed"
                    onClick={handleAnexarComprovante}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Anexar Comprovante de Pagamento
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Adicione observações sobre este pagamento..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral - Pipeline e Ações */}
        <div className="space-y-6">
          {/* Pipeline de Aprovação */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pipeline de Aprovação</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Acompanhe cada etapa do fluxo de pagamento
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {pagamento.pipelineCompleto.map((etapa, index) => (
                <div key={etapa.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      {etapa.status === "Concluído" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : etapa.status === "Em andamento" ? (
                        <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 animate-pulse" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      )}
                      {index < pagamento.pipelineCompleto.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${
                          etapa.status === "Concluído" ? "bg-green-600" : "bg-gray-300"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium">{etapa.nome}</p>
                        {etapa.status === "Concluído" && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Concluído
                          </Badge>
                        )}
                        {etapa.status === "Em andamento" && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            Em andamento
                          </Badge>
                        )}
                        {etapa.status === "Pendente" && (
                          <Badge className="bg-gray-100 text-gray-700 text-xs">
                            Pendente
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {etapa.descricao}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">
                          <span className="font-medium">Responsável:</span> {etapa.responsavel}
                        </span>
                      </div>
                      {etapa.data && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{etapa.data}</span>
                          {etapa.usuario && (
                            <span className="ml-1">• {etapa.usuario}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Controladoria */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">CONTROLADORIA</Label>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleAprovar}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Aprovar Pagamento
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleReprovar}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reprovar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-amber-200 text-amber-600 hover:bg-amber-50"
                  onClick={() => setOpenModalCorrecao(true)}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Solicitar Correção
                </Button>
              </div>

              <Separator />

              {/* Financeiro */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">FINANCEIRO</Label>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleRegistrarPagamento}
                  disabled={!comprovanteAnexado}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Registrar Pagamento Realizado
                </Button>
                {!comprovanteAnexado && (
                  <p className="text-xs text-muted-foreground text-center">
                    Anexe o comprovante para habilitar
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Processo de Pagamento</p>
                  <p className="text-blue-700">
                    Esta página concentra todas as informações e ações necessárias para a conferência e aprovação pela Controladoria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modais */}
      <Dialog open={openModalAprovar} onOpenChange={setOpenModalAprovar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar Pagamento</DialogTitle>
            <DialogDescription>
              Você tem certeza de que deseja aprovar este pagamento?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenModalAprovar(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmarAprovacao}
            >
              Aprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModalReprovar} onOpenChange={setOpenModalReprovar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Pagamento</DialogTitle>
            <DialogDescription>
              Por favor, informe a justificativa para a reprovação deste pagamento.
            </DialogDescription>
          </DialogHeader>
          <CardContent>
            <Textarea
              placeholder="Justificativa da reprovação..."
              value={justificativaReprovacao}
              onChange={(e) => setJustificativaReprovacao(e.target.value)}
              rows={4}
            />
          </CardContent>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenModalReprovar(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmarReprovacao}
            >
              Reprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModalCorrecao} onOpenChange={setOpenModalCorrecao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Correção</DialogTitle>
            <DialogDescription>
              Por favor, descreva o que precisa ser corrigido neste pagamento.
            </DialogDescription>
          </DialogHeader>
          <CardContent>
            <Textarea
              placeholder="Motivo da correção..."
              value={motivoCorrecao}
              onChange={(e) => setMotivoCorrecao(e.target.value)}
              rows={4}
            />
          </CardContent>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenModalCorrecao(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSolicitarCorrecao}
            >
              Solicitar Correção
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openModalRegistrarPagamento} onOpenChange={setOpenModalRegistrarPagamento}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pagamento Realizado</DialogTitle>
            <DialogDescription>
              Você tem certeza de que deseja registrar este pagamento como realizado?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenModalRegistrarPagamento(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={confirmarRegistroPagamento}
            >
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}