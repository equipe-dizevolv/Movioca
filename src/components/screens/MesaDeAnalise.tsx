/**
 * MOVIOCA - Mesa de Análise (Split View)
 * 
 * Tela: "Validação de Pagamento e Documentos"
 * Funcionalidades:
 * - Split View: Dados do Sistema (esquerda) + Visualizador de NF (direita)
 * - Conferência cruzada de valores e dados fiscais
 * - Links rápidos para Contrato e Cartão CNPJ
 * - Aprovação/Reprovação com justificativa obrigatória
 * 
 * PRD 003 - Seção 3.2
 * História 2, 3 e 4: Validação, Conferência e Aprovação
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  Building2,
  Calendar,
  DollarSign,
  CreditCard,
  ArrowLeft,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
} from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

interface DadosPagamento {
  id: string;
  fornecedor: string;
  cnpj: string;
  projeto: string;
  valorContrato: number;
  valorNota: number;
  vencimento: Date;
  competencia: string;
  numeroNF: string;
  dataEmissaoNF: Date;
  dadosBancarios: {
    banco: string;
    agencia: string;
    conta: string;
    chavePix?: string;
  };
  historicoAprovacao: {
    aprovaçãoCD: {
      aprovador: string;
      data: Date;
      observacao?: string;
    };
  };
  linkContrato: string;
  linkCartaoCNPJ: string;
  linkNotaFiscal: string;
  impostos: {
    inss?: number;
    irrf?: number;
    iss?: number;
  };
}

interface MesaDeAnaliseProps {
  pagamentoId?: string;
  onVoltar?: () => void;
  onProximoPagamento?: () => void;
}

export default function MesaDeAnalise({ pagamentoId, onVoltar, onProximoPagamento }: MesaDeAnaliseProps) {
  const { currentUser } = useAuth();

  // Estados
  const [observacoesInternas, setObservacoesInternas] = useState("");
  const [modalReprovacao, setModalReprovacao] = useState(false);
  const [motivoReprovacao, setMotivoReprovacao] = useState("");
  const [observacaoReprovacao, setObservacaoReprovacao] = useState("");
  const [modalContrato, setModalContrato] = useState(false);
  const [modalCartaoCNPJ, setModalCartaoCNPJ] = useState(false);
  const [zoomNF, setZoomNF] = useState(100);

  // Mock Data - Pagamento
  const pagamento: DadosPagamento = {
    id: pagamentoId || "pag-005",
    fornecedor: "Locadora XYZ Equipamentos LTDA",
    cnpj: "12.345.678/0001-90",
    projeto: "Série Documentário - História do Brasil",
    valorContrato: 15000,
    valorNota: 15000,
    vencimento: new Date(),
    competencia: "Janeiro/2025",
    numeroNF: "NF-12345",
    dataEmissaoNF: addDays(new Date(), -5),
    dadosBancarios: {
      banco: "Banco do Brasil (001)",
      agencia: "1234-5",
      conta: "67890-1",
      chavePix: "12345678000190",
    },
    historicoAprovacao: {
      aprovacaoCD: {
        aprovador: "Bruno (Controladoria Dedicada)",
        data: addDays(new Date(), -1),
        observacao: "Documentação completa. Valores conferidos."
      }
    },
    linkContrato: "#",
    linkCartaoCNPJ: "#",
    linkNotaFiscal: "#",
    impostos: {
      inss: 1650, // 11%
      irrf: 225,  // 1.5%
      iss: 750,   // 5%
    }
  };

  // Cálculos
  const temDivergenciaValor = pagamento.valorContrato !== pagamento.valorNota;
  const vencimentoFimDeSemana = isWeekend(pagamento.vencimento);
  const valorLiquido = pagamento.valorNota - (pagamento.impostos.inss || 0) - (pagamento.impostos.irrf || 0) - (pagamento.impostos.iss || 0);

  // Handlers
  const handleAprovar = () => {
    toast.success("Pagamento aprovado e enviado para o Financeiro!");
    if (onProximoPagamento) {
      setTimeout(() => {
        onProximoPagamento();
      }, 1500);
    }
  };

  const handleReprovar = () => {
    if (!motivoReprovacao) {
      toast.error("Motivo da reprovação é obrigatório.");
      return;
    }
    
    toast.warning(`Pagamento reprovado: ${motivoReprovacao}`);
    setModalReprovacao(false);
    
    if (onVoltar) {
      setTimeout(() => {
        onVoltar();
      }, 1500);
    }
  };

  const handleZoomIn = () => {
    setZoomNF(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomNF(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onVoltar} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div>
            <h2 className="text-3xl text-foreground">Mesa de Análise</h2>
            <p className="text-muted-foreground mt-1">
              Validação de pagamento e conformidade fiscal
            </p>
          </div>
        </div>
      </div>

      {/* Alertas de Validação */}
      {(temDivergenciaValor || vencimentoFimDeSemana) && (
        <div className="space-y-2">
          {temDivergenciaValor && (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">Divergência de Valor Detectada</p>
                <p className="text-xs text-red-700">
                  Valor da Nota (R$ {pagamento.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) 
                  difere do Valor do Contrato (R$ {pagamento.valorContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                </p>
              </div>
            </div>
          )}
          {vencimentoFimDeSemana && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900">Vencimento em Fim de Semana</p>
                <p className="text-xs text-yellow-700">
                  Considere antecipar o pagamento para a sexta-feira anterior
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Split View: Dados (Esquerda) + Visualizador NF (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LADO ESQUERDO: Dados do Sistema */}
        <div className="space-y-6">
          {/* Card: Cabeçalho de Conferência */}
          <Card className={temDivergenciaValor ? "border-2 border-red-300" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Conferência de Valores</CardTitle>
                {!temDivergenciaValor && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valor Programado (Contrato)</p>
                  <p className="text-lg font-medium">
                    R$ {pagamento.valorContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valor da Nota</p>
                  <p className={`text-lg font-medium ${temDivergenciaValor ? 'text-red-600' : 'text-green-600'}`}>
                    R$ {pagamento.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Dados do Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fornecedor</p>
                  <p className="text-sm font-medium">{pagamento.fornecedor}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pagamento.cnpj}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Projeto</p>
                  <p className="text-sm font-medium">{pagamento.projeto}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data de Vencimento</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(pagamento.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Competência</p>
                  <p className="text-sm font-medium">{pagamento.competencia}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Número NF</p>
                  <p className="text-sm font-medium">{pagamento.numeroNF}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Data Emissão NF</p>
                  <p className="text-sm font-medium">
                    {format(pagamento.dataEmissaoNF, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Impostos e Retenções */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Impostos e Retenções</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {pagamento.impostos.inss && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">INSS (11%)</span>
                    <span className="text-sm font-medium">
                      R$ {pagamento.impostos.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                {pagamento.impostos.irrf && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">IRRF (1,5%)</span>
                    <span className="text-sm font-medium">
                      R$ {pagamento.impostos.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                {pagamento.impostos.iss && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">ISS (5%)</span>
                    <span className="text-sm font-medium">
                      R$ {pagamento.impostos.iss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 bg-green-50 px-3 rounded-lg mt-2">
                  <span className="text-sm font-medium text-green-900">Valor Líquido</span>
                  <span className="text-base font-bold text-green-700">
                    R$ {valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Dados Bancários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados Bancários (Conferência)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Banco</span>
                <span className="text-sm font-medium">{pagamento.dadosBancarios.banco}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Agência</span>
                <span className="text-sm font-medium">{pagamento.dadosBancarios.agencia}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Conta</span>
                <span className="text-sm font-medium">{pagamento.dadosBancarios.conta}</span>
              </div>
              {pagamento.dadosBancarios.chavePix && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Chave PIX</span>
                  <span className="text-sm font-medium font-mono">{pagamento.dadosBancarios.chavePix}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card: Links de Referência Rápida */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documentos de Referência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-between"
                onClick={() => setModalContrato(true)}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Ver Contrato
                </div>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-between"
                onClick={() => setModalCartaoCNPJ(true)}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Ver Cartão CNPJ (KINAI)
                </div>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Card: Histórico de Aprovação */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Histórico de Aprovação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Aprovado pela Controladoria Dedicada</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {pagamento.historicoAprovacao.aprovacaoCD.aprovador}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(pagamento.historicoAprovacao.aprovacaoCD.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                  {pagamento.historicoAprovacao.aprovacaoCD.observacao && (
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      "{pagamento.historicoAprovacao.aprovacaoCD.observacao}"
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Observações Internas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Observações Internas (CI)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Adicione observações para registro interno (visível apenas para equipe interna)..."
                value={observacoesInternas}
                onChange={(e) => setObservacoesInternas(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-3">
            <Button 
              variant="default" 
              size="lg" 
              className="flex-1 gap-2"
              onClick={handleAprovar}
            >
              <CheckCircle2 className="w-5 h-5" />
              Aprovar Pagamento
            </Button>
            <Button 
              variant="destructive" 
              size="lg" 
              className="flex-1 gap-2"
              onClick={() => setModalReprovacao(true)}
            >
              <XCircle className="w-5 h-5" />
              Reprovar
            </Button>
          </div>
        </div>

        {/* LADO DIREITO: Visualizador de Nota Fiscal */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Nota Fiscal - {pagamento.numeroNF}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground">{zoomNF}%</span>
                  <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 min-h-[800px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm">Visualizador de Nota Fiscal</p>
                  <p className="text-xs mt-2">
                    (Em produção: Integração com Google Drive API)
                  </p>
                  <div className="mt-6 p-4 bg-white rounded-lg text-left max-w-md mx-auto">
                    <p className="text-xs font-medium mb-2">Informações da NF (Mock):</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Número: {pagamento.numeroNF}</li>
                      <li>• Emissão: {format(pagamento.dataEmissaoNF, "dd/MM/yyyy", { locale: ptBR })}</li>
                      <li>• Fornecedor: {pagamento.fornecedor}</li>
                      <li>• CNPJ: {pagamento.cnpj}</li>
                      <li>• Valor: R$ {pagamento.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal: Reprovação */}
      <Dialog open={modalReprovacao} onOpenChange={setModalReprovacao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Pagamento</DialogTitle>
            <DialogDescription>
              Selecione o motivo da reprovação e forneça orientações para correção
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Motivo da Reprovação*</label>
              <Select value={motivoReprovacao} onValueChange={setMotivoReprovacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="erro-impostos">Erro de Impostos/Retenção</SelectItem>
                  <SelectItem value="divergencia-valor">Divergência de Valor</SelectItem>
                  <SelectItem value="dados-incorretos">Dados Incorretos na NF</SelectItem>
                  <SelectItem value="nf-ilegivel">Nota Fiscal Ilegível</SelectItem>
                  <SelectItem value="kinai-incompativel">KINAI Incompatível com Serviço</SelectItem>
                  <SelectItem value="dados-bancarios">Dados Bancários Incorretos</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Orientação de Correção*</label>
              <Textarea
                placeholder="Descreva o que precisa ser corrigido..."
                value={observacaoReprovacao}
                onChange={(e) => setObservacaoReprovacao(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalReprovacao(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReprovar}>
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Contrato */}
      <Dialog open={modalContrato} onOpenChange={setModalContrato}>
        <DialogContent className="max-w-4xl max-h-[80vh]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Contrato - {pagamento.fornecedor}</DialogTitle>
          </DialogHeader>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 min-h-[500px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-sm">Visualização do Contrato</p>
              <p className="text-xs mt-2">(Integração com Google Drive)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: Cartão CNPJ */}
      <Dialog open={modalCartaoCNPJ} onOpenChange={setModalCartaoCNPJ}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Cartão CNPJ - {pagamento.fornecedor}</DialogTitle>
            <DialogDescription>
              Verifique se o KINAI (código de atividade econômica) é compatível com o serviço prestado
            </DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 min-h-[500px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-sm">Visualização do Cartão CNPJ</p>
              <p className="text-xs mt-2">(Integração com Google Drive)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}