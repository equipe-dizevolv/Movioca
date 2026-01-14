import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  RefreshCw,
  Plus,
  AlertCircle,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NotaFiscal {
  id: string;
  cnpj: string;
  razaoSocial: string;
  numeroDocumento: string;
  dataCompra: Date;
  descritivo: string;
  valor: number;
  statusControladoria?: "Pendente" | "Aprovado" | "Reprovado";
  observacaoControladoria?: string;
  comprovante?: string;
}

interface Lote {
  id: string;
  numeroLote: number;
  descricao: string;
  valorTotal: number;
  status: string;
  dataEnvio: Date;
  dataAprovacao?: Date;
  observacaoControladoria?: string;
  notas: NotaFiscal[];
}

interface Prestacao {
  id: string;
  solicitacaoVerbaId: string;
  numeroCartao: string;
  solicitante: string;
  departamento: string;
  valorLiberado: number;
  valorPrestado: number;
  valorAprovado: number;
  dataLiberacao: Date;
  dataEnvioPrestacao: Date;
  lotes: Lote[];
  status: string;
  statusOmie: string;
  dataPrestacao: Date;
  dataAprovacao?: Date;
}

interface PrestacaoDeContasProps {
  prestacao: Prestacao;
  onVoltar: () => void;
  isControladoria?: boolean;
}

export function PrestacaoDeContas({ prestacao, onVoltar, isControladoria = false }: PrestacaoDeContasProps) {
  const [openAdicionarLote, setOpenAdicionarLote] = useState(false);
  const [openAdicionarNota, setOpenAdicionarNota] = useState(false);
  const [openAprovarNota, setOpenAprovarNota] = useState(false);
  const [openReprovarNota, setOpenReprovarNota] = useState(false);
  const [openSolicitarOmie, setOpenSolicitarOmie] = useState(false);
  const [selectedNota, setSelectedNota] = useState<NotaFiscal | null>(null);
  const [selectedLoteId, setSelectedLoteId] = useState<string>("");
  const [notaObservacao, setNotaObservacao] = useState("");
  
  // Form states para novo lote
  const [novoLoteDescricao, setNovoLoteDescricao] = useState("");
  
  // Form states para nova nota
  const [novaNota, setNovaNota] = useState({
    cnpj: "",
    razaoSocial: "",
    numeroDocumento: "",
    dataCompra: "",
    descritivo: "",
    valor: "",
  });

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status.includes("Aprovado") || status === "Reembolsado") return "default";
    if (status.includes("Aguardando") || status.includes("Pendente")) return "secondary";
    if (status.includes("Reprovado")) return "destructive";
    return "outline";
  };

  const getNotaStatusBadge = (status?: string) => {
    if (!status || status === "Pendente") {
      return <Badge variant="secondary">Pendente</Badge>;
    }
    if (status === "Aprovado") {
      return <Badge variant="default" className="bg-green-600">Aprovado</Badge>;
    }
    if (status === "Reprovado") {
      return <Badge variant="destructive">Reprovado</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const handleAprovarNota = () => {
    console.log("Aprovando nota:", selectedNota?.id, "Observação:", notaObservacao);
    setOpenAprovarNota(false);
    setSelectedNota(null);
    setNotaObservacao("");
  };

  const handleReprovarNota = () => {
    console.log("Reprovando nota:", selectedNota?.id, "Motivo:", notaObservacao);
    setOpenReprovarNota(false);
    setSelectedNota(null);
    setNotaObservacao("");
  };

  const handleAdicionarLote = () => {
    console.log("Adicionando lote:", novoLoteDescricao);
    setOpenAdicionarLote(false);
    setNovoLoteDescricao("");
  };

  const handleAdicionarNota = () => {
    console.log("Adicionando nota ao lote:", selectedLoteId, novaNota);
    setOpenAdicionarNota(false);
    setNovaNota({
      cnpj: "",
      razaoSocial: "",
      numeroDocumento: "",
      dataCompra: "",
      descritivo: "",
      valor: "",
    });
  };

  const handleSolicitarOmie = () => {
    console.log("Enviando para OMIE:", prestacao.id);
    setOpenSolicitarOmie(false);
  };

  const totalNotas = prestacao.lotes.reduce((acc, lote) => acc + lote.notas.length, 0);
  const notasAprovadas = prestacao.lotes.reduce(
    (acc, lote) => acc + lote.notas.filter((n) => n.statusControladoria === "Aprovado").length,
    0
  );

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb e Header */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Verbas</span>
          <span>/</span>
          <span>Prestações de Contas</span>
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
              <h1 className="text-2xl font-semibold">Prestação de Contas</h1>
              <p className="text-sm text-muted-foreground">
                {prestacao.departamento} • {prestacao.solicitante}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isControladoria && prestacao.status === "Totalmente aprovado" && prestacao.statusOmie !== "Enviado" && (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setOpenSolicitarOmie(true)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Processar Reembolso (OMIE)
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Informações Gerais */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Liberado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{formatCurrency(prestacao.valorLiberado)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Prestado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-blue-600">{formatCurrency(prestacao.valorPrestado)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Aprovado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-green-600">{formatCurrency(prestacao.valorAprovado)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={getStatusBadgeVariant(prestacao.status)} className="text-sm px-3 py-1">
                  {prestacao.status}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Informações da Prestação */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Prestação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cartão Utilizado</p>
                  <p className="font-mono font-medium">{prestacao.numeroCartao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Liberação</p>
                  <p className="font-medium">{format(prestacao.dataLiberacao, "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Envio</p>
                  <p className="font-medium">{format(prestacao.dataEnvioPrestacao, "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status OMIE</p>
                  <Badge variant={prestacao.statusOmie === "Enviado" ? "default" : "secondary"}>
                    {prestacao.statusOmie}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Notas Fiscais</p>
                  <p className="font-medium">{totalNotas} nota(s)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Notas Aprovadas</p>
                  <p className="font-medium text-green-600">{notasAprovadas} de {totalNotas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lotes e Notas Fiscais */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lotes de Gastos e Notas Fiscais</CardTitle>
                <Button size="sm" onClick={() => setOpenAdicionarLote(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Lote
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {prestacao.lotes.map((lote, loteIndex) => (
                <div key={lote.id} className="border rounded-lg overflow-hidden">
                  {/* Header do Lote */}
                  <div className="bg-muted/50 px-4 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Lote #{lote.numeroLote}</span>
                          <Badge variant={getStatusBadgeVariant(lote.status)}>{lote.status}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{lote.descricao}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Valor Total</p>
                          <p className="font-semibold">{formatCurrency(lote.valorTotal)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedLoteId(lote.id);
                            setOpenAdicionarNota(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Nota
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tabela de Notas Fiscais */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[140px]">CNPJ</TableHead>
                          <TableHead>Razão Social</TableHead>
                          <TableHead className="w-[130px]">Nº Documento</TableHead>
                          <TableHead className="w-[110px]">Data Compra</TableHead>
                          <TableHead>Descritivo</TableHead>
                          <TableHead className="w-[120px] text-right">Valor</TableHead>
                          <TableHead className="w-[120px]">Status</TableHead>
                          {isControladoria && <TableHead className="w-[160px]">Ações</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lote.notas.map((nota, notaIndex) => (
                          <TableRow
                            key={nota.id}
                            className={notaIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}
                          >
                            <TableCell className="font-mono text-xs">{nota.cnpj}</TableCell>
                            <TableCell>{nota.razaoSocial}</TableCell>
                            <TableCell className="font-mono text-sm">{nota.numeroDocumento}</TableCell>
                            <TableCell>{format(nota.dataCompra, "dd/MM/yyyy")}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{nota.descritivo}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(nota.valor)}</TableCell>
                            <TableCell>{getNotaStatusBadge(nota.statusControladoria)}</TableCell>
                            {isControladoria && (
                              <TableCell>
                                {(!nota.statusControladoria || nota.statusControladoria === "Pendente") && (
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 border-green-600 hover:bg-green-50"
                                      onClick={() => {
                                        setSelectedNota(nota);
                                        setOpenAprovarNota(true);
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Aprovar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={() => {
                                        setSelectedNota(nota);
                                        setOpenReprovarNota(true);
                                      }}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Reprovar
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Footer do Lote com observações */}
                  {lote.observacaoControladoria && (
                    <div className="px-4 py-3 bg-muted/30 border-t">
                      <p className="text-sm font-medium mb-1">Observações da Controladoria:</p>
                      <p className="text-sm text-muted-foreground">{lote.observacaoControladoria}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* MODAL: Adicionar Lote */}
      <Dialog open={openAdicionarLote} onOpenChange={setOpenAdicionarLote}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Lote de Gastos</DialogTitle>
            <DialogDescription>
              Crie um novo lote para organizar suas notas fiscais
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Descrição do Lote <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Ex: Alimentação - Semana 1, Transporte - Novembro, etc."
                value={novoLoteDescricao}
                onChange={(e) => setNovoLoteDescricao(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdicionarLote(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdicionarLote}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Adicionar Nota Fiscal */}
      <Dialog open={openAdicionarNota} onOpenChange={setOpenAdicionarNota}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Nota Fiscal</DialogTitle>
            <DialogDescription>
              Preencha os dados da nota fiscal para adicionar ao lote
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CNPJ <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="00.000.000/0000-00"
                  value={novaNota.cnpj}
                  onChange={(e) => setNovaNota({ ...novaNota, cnpj: e.target.value })}
                />
              </div>
              <div>
                <Label>Número do Documento <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="NF-12345 ou CF-67890"
                  value={novaNota.numeroDocumento}
                  onChange={(e) => setNovaNota({ ...novaNota, numeroDocumento: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Razão Social <span className="text-destructive">*</span></Label>
              <Input
                placeholder="Nome da empresa"
                value={novaNota.razaoSocial}
                onChange={(e) => setNovaNota({ ...novaNota, razaoSocial: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data da Compra <span className="text-destructive">*</span></Label>
                <Input
                  type="date"
                  value={novaNota.dataCompra}
                  onChange={(e) => setNovaNota({ ...novaNota, dataCompra: e.target.value })}
                />
              </div>
              <div>
                <Label>Valor <span className="text-destructive">*</span></Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={novaNota.valor}
                  onChange={(e) => setNovaNota({ ...novaNota, valor: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Descritivo do Gasto <span className="text-destructive">*</span></Label>
              <Textarea
                placeholder="Descreva os itens adquiridos..."
                value={novaNota.descritivo}
                onChange={(e) => setNovaNota({ ...novaNota, descritivo: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Comprovante (Foto/PDF)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Clique para fazer upload ou arraste o arquivo</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG ou PNG até 5MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdicionarNota(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdicionarNota}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Aprovar Nota */}
      <Dialog open={openAprovarNota} onOpenChange={setOpenAprovarNota}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar Nota Fiscal</DialogTitle>
            <DialogDescription>
              Confirme a aprovação desta nota fiscal
            </DialogDescription>
          </DialogHeader>
          {selectedNota && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <p className="text-sm"><strong>CNPJ:</strong> {selectedNota.cnpj}</p>
                <p className="text-sm"><strong>Razão Social:</strong> {selectedNota.razaoSocial}</p>
                <p className="text-sm"><strong>Documento:</strong> {selectedNota.numeroDocumento}</p>
                <p className="text-sm"><strong>Valor:</strong> {formatCurrency(selectedNota.valor)}</p>
              </div>

              <div>
                <Label>Observações (opcional)</Label>
                <Textarea
                  placeholder="Observações sobre a aprovação..."
                  value={notaObservacao}
                  onChange={(e) => setNotaObservacao(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAprovarNota(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleAprovarNota}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprovar Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Reprovar Nota */}
      <Dialog open={openReprovarNota} onOpenChange={setOpenReprovarNota}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Nota Fiscal</DialogTitle>
            <DialogDescription>
              Informe o motivo da reprovação desta nota fiscal
            </DialogDescription>
          </DialogHeader>
          {selectedNota && (
            <div className="space-y-4 mt-4">
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <p className="text-sm"><strong>CNPJ:</strong> {selectedNota.cnpj}</p>
                <p className="text-sm"><strong>Razão Social:</strong> {selectedNota.razaoSocial}</p>
                <p className="text-sm"><strong>Documento:</strong> {selectedNota.numeroDocumento}</p>
                <p className="text-sm"><strong>Valor:</strong> {formatCurrency(selectedNota.valor)}</p>
              </div>

              <div>
                <Label>Motivo da Reprovação <span className="text-destructive">*</span></Label>
                <Textarea
                  placeholder="Ex: Comprovante ilegível, Data incorreta, etc."
                  value={notaObservacao}
                  onChange={(e) => setNotaObservacao(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReprovarNota(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReprovarNota}>
              <XCircle className="w-4 h-4 mr-2" />
              Reprovar Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: Solicitar OMIE */}
      <Dialog open={openSolicitarOmie} onOpenChange={setOpenSolicitarOmie}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Processar Reembolso (OMIE)</DialogTitle>
            <DialogDescription>
              Confirme o envio desta prestação de contas para o sistema OMIE para processamento do reembolso
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Esta ação irá:
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                    <li>Enviar a prestação aprovada para o OMIE</li>
                    <li>Processar o reembolso de <strong>{formatCurrency(prestacao.valorAprovado)}</strong></li>
                    <li>Atualizar o status para "Aguardando reembolso"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg space-y-1">
              <p className="text-sm"><strong>Solicitante:</strong> {prestacao.solicitante}</p>
              <p className="text-sm"><strong>Valor aprovado:</strong> {formatCurrency(prestacao.valorAprovado)}</p>
              <p className="text-sm"><strong>Notas aprovadas:</strong> {notasAprovadas} de {totalNotas}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSolicitarOmie(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSolicitarOmie}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Enviar para OMIE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
