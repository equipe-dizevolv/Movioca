/**
 * MOVIOCA - Triagem de Pagamentos (CD)
 * 
 * PRD 006 - Seção 3.1: Fila de Triagem de Pagamentos
 * História 1-3: Validação de NFs Nível 1
 * 
 * CD valida se serviço/produto foi entregue antes de enviar para CI.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ClipboardCheck,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Download,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

export default function TriagemPagamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [openValidar, setOpenValidar] = useState(false);
  const [openReprovar, setOpenReprovar] = useState(false);
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [motivoReprovacao, setMotivoReprovacao] = useState("");

  // Mock de dados (em produção, filtrado por projeto da CD)
  const pagamentos = [
    {
      id: 1,
      fornecedor: "Locadora de Veículos XYZ",
      io: "2.01.01 - Transporte",
      valor: 4500.0,
      vencimento: "2025-12-08",
      status: "Aguardando Validação CD",
      nfAnexada: true,
      urgente: true,
    },
    {
      id: 2,
      fornecedor: "Catering Gourmet Ltda",
      io: "3.04.02 - Alimentação de Set",
      valor: 2800.0,
      vencimento: "2025-12-09",
      status: "Aguardando Validação CD",
      nfAnexada: true,
      urgente: true,
    },
    {
      id: 3,
      fornecedor: "Estúdio de Som Master",
      io: "5.02.03 - Mixagem",
      valor: 15000.0,
      vencimento: "2025-12-12",
      status: "Aguardando Validação CD",
      nfAnexada: true,
      urgente: false,
    },
    {
      id: 4,
      fornecedor: "Equipamentos Cine Tech",
      io: "4.01.02 - Câmeras",
      valor: 8200.0,
      vencimento: "2025-12-15",
      status: "Devolvido pela CI",
      nfAnexada: true,
      urgente: false,
      motivoDevolucao: "Valor da NF difere do contratado",
    },
    {
      id: 5,
      fornecedor: "Figurino Designer Pro",
      io: "3.03.01 - Figurino Principal",
      valor: 6700.0,
      vencimento: "2025-12-18",
      status: "Aguardando Validação CD",
      nfAnexada: false,
      urgente: false,
    },
  ];

  const pagamentosFiltrados = pagamentos.filter((p) => {
    const matchSearch =
      p.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.io.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus =
      filtroStatus === "todos" ||
      (filtroStatus === "aguardando" && p.status === "Aguardando Validação CD") ||
      (filtroStatus === "devolvidos" && p.status === "Devolvido pela CI") ||
      (filtroStatus === "urgentes" && p.urgente);

    return matchSearch && matchStatus;
  });

  const handleValidar = (item: any) => {
    setSelectedItem(item);
    setOpenValidar(true);
  };

  const handleConfirmarValidacao = () => {
    toast.success(`Pagamento validado e enviado para a CI`, {
      description: `${selectedItem.fornecedor} - R$ ${selectedItem.valor.toLocaleString("pt-BR")}`,
    });
    setOpenValidar(false);
  };

  const handleReprovar = (item: any) => {
    setSelectedItem(item);
    setOpenReprovar(true);
  };

  const handleConfirmarReprovacao = () => {
    if (!motivoReprovacao.trim()) {
      toast.error("Informe o motivo da reprovação");
      return;
    }

    toast.error("Pagamento reprovado e devolvido", {
      description: `Motivo: ${motivoReprovacao}`,
    });
    setOpenReprovar(false);
    setMotivoReprovacao("");
  };

  const handleVerDetalhes = (item: any) => {
    setSelectedItem(item);
    setOpenDetalhes(true);
  };

  const handleBaixarNF = (item: any) => {
    // Simula download da NF
    toast.success("Download iniciado", {
      description: `NF_${item.id}_${item.fornecedor.replace(/\s+/g, '_')}.pdf`,
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "Aguardando Validação CD")
      return <Badge variant="secondary">Aguardando Validação</Badge>;
    if (status === "Devolvido pela CI")
      return <Badge variant="destructive">Devolvido pela CI</Badge>;
    return <Badge>{status}</Badge>;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Triagem de Pagamentos</h2>
        <p className="text-muted-foreground mt-2">
          Valide se o serviço/produto foi entregue conforme o contratado antes de enviar para a Controladoria Interna
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por fornecedor ou item orçamentário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="aguardando">Aguardando Validação</SelectItem>
                <SelectItem value="devolvidos">Devolvidos pela CI</SelectItem>
                <SelectItem value="urgentes">Urgentes (48h)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>
            {pagamentosFiltrados.length} {pagamentosFiltrados.length === 1 ? "pagamento encontrado" : "pagamentos encontrados"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Item Orçamentário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>NF</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagamentosFiltrados.map((pag) => (
                <TableRow key={pag.id} className={pag.urgente ? "bg-destructive/5" : ""}>
                  <TableCell>{getStatusBadge(pag.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {pag.urgente && <AlertTriangle className="w-4 h-4 text-destructive" />}
                      {pag.fornecedor}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{pag.io}</TableCell>
                  <TableCell>R$ {pag.valor.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(pag.vencimento).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {pag.nfAnexada ? (
                      <Badge variant="outline" className="gap-1">
                        <FileText className="w-3 h-3" />
                        Anexada
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Sem NF</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {pag.nfAnexada && pag.status === "Aguardando Validação CD" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleValidar(pag)}>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Validar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleReprovar(pag)}
                              className="text-destructive focus:text-destructive"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reprovar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleVerDetalhes(pag)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBaixarNF(pag)}>
                              <Download className="w-4 h-4 mr-2" />
                              Baixar NF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      {!pag.nfAnexada && (
                        <Badge variant="secondary">Aguardando NF</Badge>
                      )}
                      {pag.status === "Devolvido pela CI" && (
                        <Button size="sm" variant="outline" onClick={() => handleValidar(pag)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver motivo
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pagamentosFiltrados.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum pagamento encontrado com os filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Validar */}
      <Dialog open={openValidar} onOpenChange={setOpenValidar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validar Pagamento (Nível 1)</DialogTitle>
            <DialogDescription>
              Confirme que o serviço/produto foi entregue conforme o contratado
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Fornecedor</Label>
                  <p className="font-medium">{selectedItem.fornecedor}</p>
                </div>
                <div>
                  <Label>Valor</Label>
                  <p className="font-medium">R$ {selectedItem.valor.toLocaleString("pt-BR")}</p>
                </div>
                <div className="col-span-2">
                  <Label>Item Orçamentário</Label>
                  <p className="font-medium">{selectedItem.io}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Nota Fiscal anexada</p>
                    <p className="text-xs text-muted-foreground">NF_12345.pdf (245 KB)</p>
                    <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                      <Download className="w-3 h-3 mr-1" />
                      Baixar NF
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-medium">Atenção:</span> Ao validar, você confirma que:
                </p>
                <ul className="text-sm mt-2 space-y-1 ml-5 list-disc">
                  <li>O serviço/produto foi entregue conforme contratado</li>
                  <li>A NF corresponde ao pedido e ao contrato</li>
                  <li>Os dados da NF estão corretos</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenValidar(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary" onClick={handleConfirmarValidacao}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirmar Validação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Reprovar */}
      <Dialog open={openReprovar} onOpenChange={setOpenReprovar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprovar Pagamento</DialogTitle>
            <DialogDescription>
              Informe o motivo da reprovação para notificar o fornecedor/equipe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Motivo da reprovação <span className="text-destructive">*</span></Label>
              <Textarea
                placeholder="Ex: Serviço não finalizado, Valor incorreto, Nota fiscal com erro..."
                value={motivoReprovacao}
                onChange={(e) => setMotivoReprovacao(e.target.value)}
                rows={4}
              />
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive">
                O fornecedor e a equipe serão notificados sobre a reprovação e o motivo informado.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReprovar(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmarReprovacao}>
              <XCircle className="w-4 h-4 mr-2" />
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Detalhes */}
      <Dialog open={openDetalhes} onOpenChange={setOpenDetalhes}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pagamento</DialogTitle>
            <DialogDescription>
              Informações completas sobre o pagamento
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Fornecedor</Label>
                  <p className="font-medium">{selectedItem.fornecedor}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Item Orçamentário</Label>
                  <p className="font-medium">{selectedItem.io}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Valor</Label>
                  <p className="font-medium">R$ {selectedItem.valor.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Vencimento</Label>
                  <p className="font-medium">{new Date(selectedItem.vencimento).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Urgência</Label>
                  <p className="font-medium">
                    {selectedItem.urgente ? (
                      <span className="text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Urgente (48h)
                      </span>
                    ) : (
                      "Normal"
                    )}
                  </p>
                </div>
              </div>

              {selectedItem.nfAnexada && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <Label className="text-xs text-muted-foreground">Nota Fiscal</Label>
                  <div className="flex items-start gap-3 mt-2">
                    <FileText className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">NF_12345.pdf</p>
                      <p className="text-xs text-muted-foreground">245 KB • Anexada em 05/12/2025</p>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto mt-2"
                        onClick={() => handleBaixarNF(selectedItem)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Baixar arquivo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedItem.motivoDevolucao && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <Label className="text-xs text-destructive">Motivo da devolução pela CI</Label>
                  <p className="text-sm mt-1">{selectedItem.motivoDevolucao}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDetalhes(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}