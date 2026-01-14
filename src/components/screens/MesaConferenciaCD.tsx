/**
 * MOVIOCA - Mesa de Conferência CD
 * 
 * PRD 006 - Seção 3.2: Mesa de Conferência de Prestação de Contas
 * 
 * Tela dedicada para conferir lotes de prestação de contas.
 * CD confere despesas, corrige classificação orçamentária e glosa itens.
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Upload,
  CheckCircle2,
  XCircle,
  Edit,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface MesaConferenciaCDProps {
  onNavigate: (screen: string) => void;
  loteId?: number;
}

export default function MesaConferenciaCD({ onNavigate, loteId }: MesaConferenciaCDProps) {
  // Mock de dados - em produção viria do loteId
  const [lote, setLote] = useState({
    id: loteId || 1,
    solicitante: "Produtor de Arte",
    qtdDespesas: 18,
    valorTotal: 2450.0,
    dataSolicitacao: "2025-12-05",
    status: "Aguardando Conferência CD",
    despesas: [
      { id: 1, descricao: "Tinta acrílica", valor: 150.0, io: "3.02.01 - Material de Consumo", glosado: false },
      { id: 2, descricao: "Tecido algodão", valor: 280.0, io: "3.02.01 - Material de Consumo", glosado: false },
      { id: 3, descricao: "Cola quente", valor: 45.0, io: "3.02.01 - Material de Consumo", glosado: false },
      { id: 4, descricao: "Pincel kit", valor: 89.0, io: "3.02.01 - Material de Consumo", glosado: false },
      { id: 5, descricao: "Spray fixador", valor: 67.0, io: "3.02.01 - Material de Consumo", glosado: false },
    ],
  });

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [modalDevolverAberto, setModalDevolverAberto] = useState(false);
  const [modalValidarAberto, setModalValidarAberto] = useState(false);

  const handleToggleGlosar = (despesaId: number) => {
    const despesas = lote.despesas.map((d) =>
      d.id === despesaId ? { ...d, glosado: !d.glosado } : d
    );
    setLote({ ...lote, despesas });
  };

  const handleCorrigirIO = (despesaId: number, novoIO: string) => {
    const despesas = lote.despesas.map((d) =>
      d.id === despesaId ? { ...d, io: novoIO } : d
    );
    setLote({ ...lote, despesas });
    toast.success("Classificação orçamentária corrigida");
  };

  const handleUploadPdf = () => {
    setUploadingPdf(true);
    setTimeout(() => {
      setUploadingPdf(false);
      toast.success("PDF unificado anexado com sucesso");
    }, 1500);
  };

  const handleValidarLote = () => {
    const despesasGlosadas = lote.despesas.filter((d) => d.glosado);
    const valorGlosado = despesasGlosadas.reduce((sum, d) => sum + d.valor, 0);
    const valorAprovado = lote.valorTotal - valorGlosado;

    toast.success(`Lote validado e enviado para a CI`, {
      description: `Valor aprovado: R$ ${valorAprovado.toLocaleString("pt-BR")} | Glosado: R$ ${valorGlosado.toLocaleString("pt-BR")}`,
    });

    onNavigate("Conferência de Verba");
  };

  const handleDevolverLote = () => {
    toast.error("Lote devolvido ao solicitante para refazer");
    onNavigate("Conferência de Verba");
  };

  const calcularTotais = () => {
    const total = lote.valorTotal;
    const glosado = lote.despesas
      .filter((d) => d.glosado)
      .reduce((sum, d) => sum + d.valor, 0);
    const aprovado = total - glosado;

    return { total, glosado, aprovado };
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => onNavigate("Conferência de Verba")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Conferência de Verba
          </Button>
          <h2 className="text-3xl text-foreground">Mesa de Conferência de Prestação de Contas</h2>
          <p className="text-muted-foreground mt-2">
            Confira as despesas, corrija classificações e glosa itens inválidos
          </p>
        </div>
      </div>

      {/* Cabeçalho do Lote */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Solicitante</Label>
              <p className="font-medium">{lote.solicitante}</p>
            </div>
            <div>
              <Label>Valor Total Declarado</Label>
              <p className="font-medium">R$ {lote.valorTotal.toLocaleString("pt-BR")}</p>
            </div>
            <div>
              <Label>Quantidade de Notas</Label>
              <p className="font-medium">{lote.despesas.length}</p>
            </div>
            <div>
              <Label>Data de Envio</Label>
              <p className="font-medium">
                {new Date(lote.dataSolicitacao).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload de Comprovante Unificado */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-sm">Comprovante Unificado (Scan Profissional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleUploadPdf}
              disabled={uploadingPdf}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              {uploadingPdf ? "Enviando..." : "Substituir Comprovantes"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Substitua as fotos da equipe por um PDF escaneado de qualidade auditável
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Item Orçamentário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lote.despesas.map((despesa) => (
                <TableRow key={despesa.id} className={despesa.glosado ? "opacity-50" : ""}>
                  <TableCell>
                    {despesa.glosado ? (
                      <Badge variant="destructive">Glosado</Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-600">Aprovado</Badge>
                    )}
                  </TableCell>
                  <TableCell>{despesa.descricao}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{despesa.io}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => {
                          const novoIO = prompt("Corrigir classificação:", despesa.io);
                          if (novoIO) handleCorrigirIO(despesa.id, novoIO);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>R$ {despesa.valor.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={despesa.glosado ? "outline" : "destructive"}
                      onClick={() => handleToggleGlosar(despesa.id)}
                    >
                      {despesa.glosado ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Desglosar
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Glosar
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Totais Recalculados */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Valor Total</p>
              <p className="text-xl font-medium">
                R$ {calcularTotais().total.toLocaleString("pt-BR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Glosado</p>
              <p className="text-xl font-medium text-destructive">
                - R$ {calcularTotais().glosado.toLocaleString("pt-BR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Valor Aprovado</p>
              <p className="text-xl font-medium text-green-600">
                R$ {calcularTotais().aprovado.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerta de Glosa */}
      {calcularTotais().glosado > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Atenção: Lote contém itens glosados</p>
            <p className="text-sm text-muted-foreground mt-1">
              O valor de reembolso será menor que o solicitado. O solicitante será notificado.
            </p>
          </div>
        </div>
      )}

      {/* Ações Finais */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="destructive" onClick={() => setModalDevolverAberto(true)}>
          <XCircle className="w-4 h-4 mr-2" />
          Devolver Lote
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate("Conferência de Verba")}>
            Cancelar
          </Button>
          <Button className="bg-primary" onClick={() => setModalValidarAberto(true)}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Validar Lote para CI
          </Button>
        </div>
      </div>

      {/* Modal: Confirmar Devolução */}
      <Dialog open={modalDevolverAberto} onOpenChange={setModalDevolverAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Devolver Lote para Refazer</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja devolver este lote para o solicitante {lote.solicitante}?
              Ele precisará corrigir e reenviar.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor Total:</span>
              <span className="font-medium">R$ {lote.valorTotal.toLocaleString("pt-BR")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantidade de Notas:</span>
              <span className="font-medium">{lote.despesas.length}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalDevolverAberto(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                handleDevolverLote();
                setModalDevolverAberto(false);
              }}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Confirmar Devolução
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Confirmar Validação */}
      <Dialog open={modalValidarAberto} onOpenChange={setModalValidarAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validar Lote para CI</DialogTitle>
            <DialogDescription>
              Confirme os valores antes de enviar o lote para a Controladoria Interna.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valor Total Declarado:</span>
                <span className="font-medium">R$ {calcularTotais().total.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valor Glosado:</span>
                <span className="font-medium text-destructive">- R$ {calcularTotais().glosado.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Valor Aprovado:</span>
                <span className="font-bold text-green-600">R$ {calcularTotais().aprovado.toLocaleString("pt-BR")}</span>
              </div>
            </div>

            {calcularTotais().glosado > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-600">
                  Este lote contém itens glosados. O solicitante será notificado da diferença.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalValidarAberto(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-primary" 
              onClick={() => {
                handleValidarLote();
                setModalValidarAberto(false);
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirmar e Enviar para CI
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}