/**
 * MOVIOCA - Prestação de Contas
 * 
 * Tela: "Envio de Prestação de Contas"
 * 
 * Permite selecionar despesas lançadas, criar lotes de prestação
 * e enviar para análise da Controladoria Dedicada.
 * 
 * PRD 007 - Seção 3.4: Tela: Fechamento de Lote (Prestação de Contas)
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
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
  FileArchive,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Send,
  FileText,
  Calendar,
  DollarSign,
  Package,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

// Mock data - Despesas disponíveis para envio
const mockDespesasDisponiveis = [
  {
    id: 1,
    cartao: "Cartão Arte (1234)",
    data: "2024-12-10",
    fornecedor: "Loja das Tintas",
    valor: 450.0,
    rubrica: "Tinta e Material de Pintura",
    descricao: "Tinta látex branca e pincéis",
    comprovante: "nota_123.jpg",
    status: "Rascunho",
  },
  {
    id: 2,
    cartao: "Cartão Arte (1234)",
    data: "2024-12-09",
    fornecedor: "Casa do Construtor",
    valor: 320.0,
    rubrica: "Ferramentas de Arte",
    descricao: "Serra tico-tico e furadeira",
    comprovante: "nota_124.jpg",
    status: "Rascunho",
  },
  {
    id: 3,
    cartao: "Cartão Figurino (5678)",
    data: "2024-12-08",
    fornecedor: "Mercado de Tecidos",
    valor: 780.5,
    rubrica: "Tecidos para Cenário",
    descricao: "Tecido chita e algodão cru",
    comprovante: "nota_125.jpg",
    status: "Rascunho",
  },
  {
    id: 4,
    cartao: "Cartão Arte (1234)",
    data: "2024-12-07",
    fornecedor: "Depósito de Madeiras",
    valor: 625.0,
    rubrica: "Madeira e Compensados",
    descricao: "Compensado naval 15mm",
    comprovante: "nota_126.jpg",
    status: "Rascunho",
  },
];

// Mock data - Histórico de lotes
const mockHistoricoLotes = [
  {
    id: "PC-ARTE-003",
    dataCriacao: "2024-12-05",
    dataEnvio: "2024-12-05",
    quantidade: 8,
    valorTotal: 2340.0,
    status: "Aprovado",
  },
  {
    id: "PC-ARTE-002",
    dataCriacao: "2024-11-28",
    dataEnvio: "2024-11-28",
    quantidade: 12,
    valorTotal: 3150.5,
    status: "Aprovado",
  },
  {
    id: "PC-ARTE-001",
    dataCriacao: "2024-11-20",
    dataEnvio: "2024-11-21",
    quantidade: 5,
    valorTotal: 1200.0,
    status: "Reprovado",
    motivoReprovacao: "Nota fiscal 3 ilegível. Por favor, refazer foto.",
  },
];

export default function PrestacaoContas() {
  const [despesasDisponiveis, setDespesasDisponiveis] = useState(
    mockDespesasDisponiveis
  );
  const [despesasSelecionadas, setDespesasSelecionadas] = useState<number[]>(
    []
  );
  const [lotes, setLotes] = useState(mockHistoricoLotes);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [loteDetalhes, setLoteDetalhes] = useState<any>(null);

  const handleToggleSelecao = (id: number) => {
    setDespesasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelecionarTodos = () => {
    if (despesasSelecionadas.length === despesasDisponiveis.length) {
      setDespesasSelecionadas([]);
    } else {
      setDespesasSelecionadas(despesasDisponiveis.map((d) => d.id));
    }
  };

  const handleCriarLote = () => {
    if (despesasSelecionadas.length === 0) {
      toast.error("Selecione pelo menos uma despesa para criar o lote");
      return;
    }
    setModalConfirmacao(true);
  };

  const handleEnviarLote = () => {
    const despesasDoLote = despesasDisponiveis.filter((d) =>
      despesasSelecionadas.includes(d.id)
    );
    const valorTotal = despesasDoLote.reduce((sum, d) => sum + d.valor, 0);

    const novoLote = {
      id: `PC-ARTE-${String(lotes.length + 1).padStart(3, "0")}`,
      dataCriacao: new Date().toISOString().split("T")[0],
      dataEnvio: new Date().toISOString().split("T")[0],
      quantidade: despesasSelecionadas.length,
      valorTotal,
      status: "Em Análise",
    };

    setLotes([novoLote, ...lotes]);
    setDespesasDisponiveis(
      despesasDisponiveis.filter((d) => !despesasSelecionadas.includes(d.id))
    );
    setDespesasSelecionadas([]);
    setModalConfirmacao(false);

    toast.success(
      `Lote ${novoLote.id} enviado com sucesso! Entregue o envelope físico com as notas para a Controladoria.`,
      { duration: 5000 }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-500/10 text-green-600";
      case "Em Análise":
        return "bg-blue-500/10 text-blue-600";
      case "Reprovado":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Em Análise":
        return <Clock className="w-4 h-4" />;
      case "Reprovado":
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileArchive className="w-4 h-4" />;
    }
  };

  const valorTotalSelecionado = despesasDisponiveis
    .filter((d) => despesasSelecionadas.includes(d.id))
    .reduce((sum, d) => sum + d.valor, 0);

  const totalPendente = despesasDisponiveis.reduce(
    (sum, d) => sum + d.valor,
    0
  );
  const totalLotesEnviados = lotes.reduce((sum, l) => sum + l.valorTotal, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Prestação de Contas</h2>
        <p className="text-muted-foreground mt-2">
          Agrupe suas despesas em lotes e envie para a Controladoria Dedicada
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendente Envio</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {despesasDisponiveis.length}
                </p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Pendente</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R${" "}
                  {totalPendente.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lotes Enviados</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {lotes.length}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enviado</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R${" "}
                  {totalLotesEnviados.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seleção de Despesas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Despesas Disponíveis para Envio</CardTitle>
            <div className="flex items-center gap-3">
              {despesasSelecionadas.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {despesasSelecionadas.length} selecionada(s) • R${" "}
                  {valorTotalSelecionado.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              )}
              <Button
                onClick={handleCriarLote}
                disabled={despesasSelecionadas.length === 0}
                className="bg-primary"
              >
                <Send className="w-4 h-4 mr-2" />
                Criar e Enviar Lote
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {despesasDisponiveis.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b">
                <Checkbox
                  id="selecionar-todos"
                  checked={
                    despesasSelecionadas.length ===
                    despesasDisponiveis.length
                  }
                  onCheckedChange={handleSelecionarTodos}
                />
                <Label
                  htmlFor="selecionar-todos"
                  className="text-sm font-medium cursor-pointer"
                >
                  Selecionar todas
                </Label>
              </div>

              <div className="space-y-3">
                {despesasDisponiveis.map((despesa) => (
                  <div
                    key={despesa.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                      despesasSelecionadas.includes(despesa.id)
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      id={`despesa-${despesa.id}`}
                      checked={despesasSelecionadas.includes(despesa.id)}
                      onCheckedChange={() => handleToggleSelecao(despesa.id)}
                    />
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{despesa.fornecedor}</p>
                          <Badge variant="outline" className="text-xs">
                            {despesa.cartao}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {despesa.rubrica} • {despesa.descricao}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(despesa.data).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {despesa.comprovante}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        R${" "}
                        {despesa.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted p-6 rounded-full">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    Nenhuma despesa pendente
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Todas as despesas foram enviadas em lotes
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Lotes */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Lotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID do Lote</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lotes.map((lote) => (
                <TableRow key={lote.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileArchive className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono font-medium">{lote.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(lote.dataEnvio).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{lote.quantidade} despesas</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R${" "}
                    {lote.valorTotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(lote.status)}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(lote.status)}
                        {lote.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lote.motivoReprovacao && (
                      <div className="flex items-start gap-2 max-w-xs">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <p className="text-sm text-red-600">
                          {lote.motivoReprovacao}
                        </p>
                      </div>
                    )}
                    {lote.status === "Aprovado" && (
                      <span className="text-sm text-green-600">
                        Lote aprovado e processado
                      </span>
                    )}
                    {lote.status === "Em Análise" && (
                      <span className="text-sm text-muted-foreground">
                        Aguardando análise da Controladoria
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal: Confirmação de Envio */}
      <Dialog open={modalConfirmacao} onOpenChange={setModalConfirmacao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Envio de Lote</DialogTitle>
            <DialogDescription>
              Você está prestes a enviar um lote de prestação de contas para
              análise da Controladoria Dedicada
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Quantidade de despesas:
                </span>
                <span className="font-bold">
                  {despesasSelecionadas.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Valor total:
                </span>
                <span className="font-bold text-lg">
                  R${" "}
                  {valorTotalSelecionado.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-600 mb-2">
                    Importante: Ação Física Necessária
                  </p>
                  <p className="text-muted-foreground">
                    Após enviar o lote digitalmente, você deve:
                  </p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>
                      Reunir todas as notas fiscais originais das despesas
                      selecionadas
                    </li>
                    <li>
                      Colocá-las em um envelope identificado com o ID do Lote
                      gerado
                    </li>
                    <li>
                      Entregar fisicamente para a Controladoria Dedicada
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-600">Atenção</p>
                  <p className="text-muted-foreground mt-1">
                    Após o envio, você não poderá mais editar ou excluir essas
                    despesas. Elas só poderão ser alteradas se o lote for
                    reprovado pela Controladoria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalConfirmacao(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleEnviarLote} className="bg-primary">
              <Send className="w-4 h-4 mr-2" />
              Confirmar e Enviar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}