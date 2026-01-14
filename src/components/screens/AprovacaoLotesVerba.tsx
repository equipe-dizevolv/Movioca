/**
 * MOVIOCA - Aprovação de Lotes de Verba (Controladoria Interna)
 * 
 * Tela: "Conferência de Lotes de Verba"
 * Funcionalidades:
 * - Fila de lotes de prestação de contas
 * - Visualização detalhada de despesas individuais
 * - Glosa de itens específicos
 * - Aprovação parcial ou total
 * 
 * PRD 003 - Seção 3.3
 * História 5: Revisar e aprovar lotes de prestação de contas
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Wallet,
  Eye,
  Download,
  ArrowLeft,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

interface DespesaItem {
  id: string;
  cnpj: string;
  razaoSocial: string;
  numeroDocumento: string;
  dataCompra: Date;
  descritivo: string;
  valor: number;
  comprovante: string;
  glosado: boolean;
  motivoGlosa?: string;
}

interface LoteVerba {
  id: string;
  numeroLote: string;
  projeto: string;
  solicitante: string;
  valorTotal: number;
  quantidadeNotas: number;
  dataEnvio: Date;
  despesas: DespesaItem[];
  observacaoCD?: string;
}

interface AprovacaoLotesVerbaProps {
  onVoltar?: () => void;
}

export default function AprovacaoLotesVerba({ onVoltar }: AprovacaoLotesVerbaProps) {
  const { currentUser } = useAuth();

  // Estados
  const [loteExpandido, setLoteExpandido] = useState<string | null>(null);
  const [despesasGlosadas, setDespesasGlosadas] = useState<Set<string>>(new Set());
  const [modalAprovacao, setModalAprovacao] = useState(false);
  const [modalReprovacao, setModalReprovacao] = useState(false);
  const [loteEmAnalise, setLoteEmAnalise] = useState<LoteVerba | null>(null);
  const [observacaoAprovacao, setObservacaoAprovacao] = useState("");
  const [motivoReprovacao, setMotivoReprovacao] = useState("");

  // Mock Data - Lotes
  const hoje = new Date();
  
  const lotes: LoteVerba[] = [
    {
      id: "lote-001",
      numeroLote: "L-2025-001",
      projeto: "Série Documentário - História do Brasil",
      solicitante: "Bruno (Controladoria Dedicada)",
      valorTotal: 7500,
      quantidadeNotas: 4,
      dataEnvio: addDays(hoje, -1),
      observacaoCD: "Despesas de locação de equipamentos e transporte. Todos os comprovantes anexados.",
      despesas: [
        {
          id: "desp-001",
          cnpj: "12.345.678/0001-90",
          razaoSocial: "Locadora de Equipamentos Cine Ltda",
          numeroDocumento: "NF-12345",
          dataCompra: addDays(hoje, -10),
          descritivo: "Locação câmera RED Komodo 6K por 3 dias",
          valor: 4500,
          comprovante: "nota1.pdf",
          glosado: false,
        },
        {
          id: "desp-002",
          cnpj: "12.345.678/0001-90",
          razaoSocial: "Locadora de Equipamentos Cine Ltda",
          numeroDocumento: "NF-12346",
          dataCompra: addDays(hoje, -10),
          descritivo: "Locação lentes Zeiss CP.3 (set completo)",
          valor: 2000,
          comprovante: "nota2.pdf",
          glosado: false,
        },
        {
          id: "desp-003",
          cnpj: "98.765.432/0001-10",
          razaoSocial: "Transportes Rápidos São Paulo Ltda",
          numeroDocumento: "NF-78901",
          dataCompra: addDays(hoje, -9),
          descritivo: "Frete equipamentos - São Paulo para locação",
          valor: 800,
          comprovante: "nota3.pdf",
          glosado: false,
        },
        {
          id: "desp-004",
          cnpj: "11.222.333/0001-44",
          razaoSocial: "Auto Posto Bandeirantes",
          numeroDocumento: "CF-45678",
          dataCompra: addDays(hoje, -9),
          descritivo: "Abastecimento van de produção",
          valor: 200,
          comprovante: "nota4.pdf",
          glosado: false,
        },
      ],
    },
    {
      id: "lote-002",
      numeroLote: "L-2025-002",
      projeto: "Campanha Publicitária - Marca X",
      solicitante: "Bruno (Controladoria Dedicada)",
      valorTotal: 3200,
      quantidadeNotas: 6,
      dataEnvio: addDays(hoje, -2),
      observacaoCD: "Despesas de alimentação e materiais de escritório.",
      despesas: [
        {
          id: "desp-005",
          cnpj: "22.333.444/0001-55",
          razaoSocial: "Restaurante Bom Paladar Ltda",
          numeroDocumento: "CF-11111",
          dataCompra: addDays(hoje, -12),
          descritivo: "Almoço equipe de filmagem (15 pessoas)",
          valor: 450,
          comprovante: "nota5.pdf",
          glosado: false,
        },
        {
          id: "desp-006",
          cnpj: "22.333.444/0001-55",
          razaoSocial: "Restaurante Bom Paladar Ltda",
          numeroDocumento: "CF-11112",
          dataCompra: addDays(hoje, -11),
          descritivo: "Jantar equipe de filmagem (12 pessoas)",
          valor: 380,
          comprovante: "nota6.pdf",
          glosado: false,
        },
        {
          id: "desp-007",
          cnpj: "55.666.777/0001-88",
          razaoSocial: "Bar e Petiscaria do João",
          numeroDocumento: "CF-22222",
          dataCompra: addDays(hoje, -11),
          descritivo: "Bebidas alcoólicas para confraternização",
          valor: 320,
          comprovante: "nota7.pdf",
          glosado: false,
        },
        {
          id: "desp-008",
          cnpj: "33.444.555/0001-66",
          razaoSocial: "Papelaria Moderna Ltda",
          numeroDocumento: "NF-33333",
          dataCompra: addDays(hoje, -10),
          descritivo: "Materiais de escritório (canetas, papel A4, pastas)",
          valor: 180,
          comprovante: "nota8.pdf",
          glosado: false,
        },
        {
          id: "desp-009",
          cnpj: "44.555.666/0001-77",
          razaoSocial: "Tech Store Informática",
          numeroDocumento: "NF-44444",
          dataCompra: addDays(hoje, -8),
          descritivo: "HD externo 2TB para backup de arquivos",
          valor: 420,
          comprovante: "nota9.pdf",
          glosado: false,
        },
        {
          id: "desp-010",
          cnpj: "22.333.444/0001-55",
          razaoSocial: "Restaurante Bom Paladar Ltda",
          numeroDocumento: "CF-11113",
          dataCompra: addDays(hoje, -7),
          descritivo: "Lanche da tarde para equipe",
          valor: 150,
          comprovante: "nota10.pdf",
          glosado: false,
        },
      ],
    },
  ];

  // Calcular valor aprovado (total - glosados)
  const calcularValorAprovado = (lote: LoteVerba) => {
    const valorGlosado = lote.despesas
      .filter(d => despesasGlosadas.has(d.id))
      .reduce((acc, d) => acc + d.valor, 0);
    return lote.valorTotal - valorGlosado;
  };

  const calcularQuantidadeGlosada = (lote: LoteVerba) => {
    return lote.despesas.filter(d => despesasGlosadas.has(d.id)).length;
  };

  // Handlers
  const handleToggleGlosa = (despesaId: string) => {
    setDespesasGlosadas(prev => {
      const novo = new Set(prev);
      if (novo.has(despesaId)) {
        novo.delete(despesaId);
      } else {
        novo.add(despesaId);
      }
      return novo;
    });
  };

  const handleAbrirModalAprovacao = (lote: LoteVerba) => {
    setLoteEmAnalise(lote);
    setModalAprovacao(true);
  };

  const handleAprovarLote = () => {
    if (!loteEmAnalise) return;

    const quantidadeGlosada = calcularQuantidadeGlosada(loteEmAnalise);
    const valorAprovado = calcularValorAprovado(loteEmAnalise);

    if (quantidadeGlosada > 0) {
      toast.success(`Lote ${loteEmAnalise.numeroLote} aprovado com ${quantidadeGlosada} item(ns) glosado(s). Valor aprovado: R$ ${valorAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    } else {
      toast.success(`Lote ${loteEmAnalise.numeroLote} totalmente aprovado! Valor: R$ ${valorAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    }

    setModalAprovacao(false);
    setLoteEmAnalise(null);
    setObservacaoAprovacao("");
    setDespesasGlosadas(new Set());
  };

  const handleReprovarLote = () => {
    if (!loteEmAnalise || !motivoReprovacao) {
      toast.error("Motivo da reprovação é obrigatório.");
      return;
    }

    toast.warning(`Lote ${loteEmAnalise.numeroLote} reprovado e devolvido para correção.`);
    setModalReprovacao(false);
    setLoteEmAnalise(null);
    setMotivoReprovacao("");
    setDespesasGlosadas(new Set());
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Aprovação de Lotes de Verba</h2>
          <p className="text-muted-foreground mt-1">
            Conferência de lotes de prestação de contas enviados pela Controladoria Dedicada
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50/50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Fluxo de Aprovação de Verba</p>
              <p className="text-xs text-blue-700 mt-1">
                Estes lotes já foram pré-validados pela Controladoria Dedicada (Nível 1). 
                Sua aprovação final autoriza o reembolso. Você pode glosar itens específicos que não estejam em conformidade.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Lotes */}
      <div className="space-y-4">
        {lotes.map(lote => {
          const valorAprovado = calcularValorAprovado(lote);
          const quantidadeGlosada = calcularQuantidadeGlosada(lote);
          const temGlosa = quantidadeGlosada > 0;

          return (
            <Card key={lote.id} className={temGlosa ? "border-2 border-orange-300" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lote.numeroLote}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lote.projeto} • Enviado por {lote.solicitante}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Enviado em: {format(lote.dataEnvio, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="text-2xl font-bold text-amber-700">
                      R$ {lote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lote.quantidadeNotas} nota(s) fiscal(is)
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Resumo */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total do Lote</p>
                    <p className="text-lg font-medium">
                      R$ {lote.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Itens Glosados</p>
                    <p className={`text-lg font-medium ${temGlosa ? 'text-orange-600' : ''}`}>
                      {quantidadeGlosada} item(ns)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Valor Aprovado</p>
                    <p className="text-lg font-medium text-green-600">
                      R$ {valorAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {/* Observação da CD */}
                {lote.observacaoCD && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-blue-900">Observação da CD:</p>
                      <p className="text-xs text-blue-700 mt-1">{lote.observacaoCD}</p>
                    </div>
                  </div>
                )}

                {/* Tabela de Despesas */}
                <div>
                  <p className="text-sm font-medium mb-3">Despesas do Lote</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Glosar</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>NF/CF</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Comprovante</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lote.despesas.map(despesa => {
                        const isGlosado = despesasGlosadas.has(despesa.id);
                        return (
                          <TableRow key={despesa.id} className={isGlosado ? "bg-red-50/50" : ""}>
                            <TableCell>
                              <Checkbox
                                checked={isGlosado}
                                onCheckedChange={() => handleToggleGlosa(despesa.id)}
                              />
                            </TableCell>
                            <TableCell className="text-sm">
                              {format(despesa.dataCompra, "dd/MM/yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                              <p className="text-sm font-medium">{despesa.razaoSocial}</p>
                              <p className="text-xs text-muted-foreground">{despesa.cnpj}</p>
                            </TableCell>
                            <TableCell className="text-sm max-w-xs">
                              {despesa.descritivo}
                            </TableCell>
                            <TableCell className="text-sm font-mono">
                              {despesa.numeroDocumento}
                            </TableCell>
                            <TableCell className={`text-right text-sm font-medium ${isGlosado ? 'text-red-600 line-through' : ''}`}>
                              R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Ações */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="default" 
                    className="flex-1 gap-2"
                    onClick={() => handleAbrirModalAprovacao(lote)}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {temGlosa ? "Aprovar Lote Parcial" : "Aprovar Lote Total"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 gap-2"
                    onClick={() => {
                      setLoteEmAnalise(lote);
                      setModalReprovacao(true);
                    }}
                  >
                    <XCircle className="w-4 h-4" />
                    Reprovar Lote Total
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal: Aprovação */}
      <Dialog open={modalAprovacao} onOpenChange={setModalAprovacao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {loteEmAnalise && calcularQuantidadeGlosada(loteEmAnalise) > 0 
                ? "Aprovar Lote Parcial" 
                : "Aprovar Lote Total"}
            </DialogTitle>
            <DialogDescription>
              {loteEmAnalise && (
                <>
                  Lote: {loteEmAnalise.numeroLote} • {loteEmAnalise.projeto}
                  <br />
                  {calcularQuantidadeGlosada(loteEmAnalise) > 0 && (
                    <span className="text-orange-600 font-medium">
                      {calcularQuantidadeGlosada(loteEmAnalise)} item(ns) será(ão) glosado(s)
                    </span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {loteEmAnalise && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Valor Total do Lote</p>
                    <p className="text-lg font-medium">
                      R$ {loteEmAnalise.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Valor Aprovado para Reembolso</p>
                    <p className="text-lg font-bold text-green-700">
                      R$ {calcularValorAprovado(loteEmAnalise).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-2 block">Observação (Opcional)</label>
              <Textarea
                placeholder="Adicione observações sobre a aprovação..."
                value={observacaoAprovacao}
                onChange={(e) => setObservacaoAprovacao(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAprovacao(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleAprovarLote}>
              Confirmar Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Reprovação */}
      <Dialog open={modalReprovacao} onOpenChange={setModalReprovacao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Lote Total</DialogTitle>
            <DialogDescription>
              {loteEmAnalise && `Lote: ${loteEmAnalise.numeroLote} • ${loteEmAnalise.projeto}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Motivo da Reprovação*</label>
              <Textarea
                placeholder="Descreva o motivo da reprovação e as correções necessárias..."
                value={motivoReprovacao}
                onChange={(e) => setMotivoReprovacao(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalReprovacao(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReprovarLote}>
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}