/**
 * MOVIOCA - Meus Contratos (Fornecedor)
 * 
 * PRD 008 - História 6: Acesso aos Contratos Assinados
 * 
 * Lista de contratos assinados com funcionalidades de:
 * - Visualização de detalhes
 * - Download de PDF
 * - Filtros por projeto
 * - Responsivo (cards em mobile)
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FileText, Download, Eye, Search, Printer } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Contrato {
  id: string;
  nome: string;
  projeto: string;
  dataAssinatura: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  valorTotal: number;
  status: "Vigente" | "Encerrado" | "Pendente";
  pdfUrl?: string;
  objeto?: string;
  parcelamento?: string;
  observacoes?: string;
}

export default function FornecedorDocumentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState<Contrato | null>(null);

  // Dados mockados (em produção virão da API)
  const contratos: Contrato[] = [
    {
      id: "1",
      nome: "Contrato de Locação de Equipamentos - Projeto Alpha",
      projeto: "Projeto Alpha",
      dataAssinatura: "15/12/2024",
      vigenciaInicio: "01/01/2025",
      vigenciaFim: "31/03/2025",
      valorTotal: 150000,
      status: "Vigente",
      pdfUrl: "#",
      objeto: "Locação de equipamentos de filmagem (câmeras 4K, iluminação LED profissional, grua motorizada, slider automatizado) para produção audiovisual do Projeto Alpha.",
      parcelamento: "3 parcelas de R$ 50.000,00 - Vencimentos: 30/01, 28/02 e 31/03",
      observacoes: "Manutenção e seguro dos equipamentos inclusos. Prazo de entrega: até 27/12/2024.",
    },
    {
      id: "2",
      nome: "Contrato de Prestação de Serviços - Projeto Beta",
      projeto: "Projeto Beta",
      dataAssinatura: "10/11/2024",
      vigenciaInicio: "15/11/2024",
      vigenciaFim: "15/01/2025",
      valorTotal: 25000,
      status: "Vigente",
      pdfUrl: "#",
      objeto: "Prestação de serviços de catering para equipe de produção durante as gravações do Projeto Beta.",
      parcelamento: "Pagamento único em 15/01/2025",
      observacoes: "Cardápio vegetariano/vegano disponível. Atendimento para até 50 pessoas.",
    },
    {
      id: "3",
      nome: "Contrato de Locação de Veículos - Projeto Gamma",
      projeto: "Projeto Gamma",
      dataAssinatura: "05/09/2024",
      vigenciaInicio: "10/09/2024",
      vigenciaFim: "10/11/2024",
      valorTotal: 18000,
      status: "Encerrado",
      pdfUrl: "#",
      objeto: "Locação de 2 vans executivas para transporte de elenco e equipe técnica.",
      parcelamento: "2 parcelas de R$ 9.000,00",
      observacoes: "Contrato encerrado conforme previsto. Sem pendências.",
    },
    {
      id: "4",
      nome: "Aditivo Contratual - Projeto Alpha",
      projeto: "Projeto Alpha",
      dataAssinatura: "20/01/2025",
      vigenciaInicio: "01/02/2025",
      vigenciaFim: "31/03/2025",
      valorTotal: 12500,
      status: "Vigente",
      pdfUrl: "#",
      objeto: "Aditivo para inclusão de drone DJI Inspire 3 com operador certificado.",
      parcelamento: "Pagamento único em 31/03/2025",
      observacoes: "Certificação ANAC obrigatória. Seguro adicional incluído.",
    },
  ];

  // Filtros
  const contratosFiltrados = contratos.filter((contrato) => {
    const matchSearch =
      contrato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.projeto.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filtroStatus === "todos" || contrato.status === filtroStatus;

    return matchSearch && matchStatus;
  });

  // Configuração de status
  const getStatusBadge = (status: Contrato["status"]) => {
    const configs = {
      Vigente: {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      },
      Encerrado: {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
      },
      Pendente: {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      },
    };

    return configs[status];
  };

  // Ações
  const handleVisualizar = (contrato: Contrato) => {
    setContratoSelecionado(contrato);
    setModalVisualizarOpen(true);
    toast.success(`Abrindo contrato: ${contrato.nome}`);
    // Em produção, abrir PDF em nova aba
    // window.open(contrato.pdfUrl, '_blank');
  };

  const handleBaixar = (contrato: Contrato) => {
    toast.success(`Baixando: ${contrato.nome}`);
    // Em produção, fazer download do PDF
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-1">Meus Contratos</h2>
        <p className="text-muted-foreground">Documentos e contratos assinados</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome do contrato ou projeto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filtro de Status */}
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="Vigente">Vigente</SelectItem>
                <SelectItem value="Encerrado">Encerrado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>
            {contratosFiltrados.length} {contratosFiltrados.length === 1 ? "contrato" : "contratos"}{" "}
            {filtroStatus !== "todos" && `com status "${filtroStatus}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contratosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchTerm || filtroStatus !== "todos"
                  ? "Nenhum contrato encontrado com os filtros aplicados"
                  : "Nenhum contrato disponível no momento"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Contrato</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Data Assinatura</TableHead>
                  <TableHead>Vigência</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratosFiltrados.map((contrato) => {
                  const statusConfig = getStatusBadge(contrato.status);

                  return (
                    <TableRow key={contrato.id}>
                      <TableCell className="max-w-xs">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="font-medium line-clamp-2">{contrato.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell>{contrato.projeto}</TableCell>
                      <TableCell>{contrato.dataAssinatura}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{contrato.vigenciaInicio}</div>
                          <div className="text-muted-foreground">até {contrato.vigenciaFim}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {contrato.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig.variant} className={statusConfig.className}>
                          {contrato.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVisualizar(contrato)}
                            className="gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            Visualizar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBaixar(contrato)}
                            className="gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Baixar
                          </Button>
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

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {contratosFiltrados.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchTerm || filtroStatus !== "todos"
                  ? "Nenhum contrato encontrado"
                  : "Nenhum contrato disponível"}
              </p>
            </CardContent>
          </Card>
        ) : (
          contratosFiltrados.map((contrato) => {
            const statusConfig = getStatusBadge(contrato.status);

            return (
              <Card key={contrato.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight">{contrato.nome}</p>
                        <p className="text-xs text-muted-foreground mt-1">{contrato.projeto}</p>
                      </div>
                    </div>
                    <Badge variant={statusConfig.variant} className={statusConfig.className}>
                      {contrato.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Assinatura:</p>
                      <p className="font-medium">{contrato.dataAssinatura}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Valor Total:</p>
                      <p className="font-medium">
                        R$ {contrato.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Vigência:</p>
                      <p className="font-medium text-sm">
                        {contrato.vigenciaInicio} até {contrato.vigenciaFim}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVisualizar(contrato)}
                      className="flex-1 gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Visualizar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBaixar(contrato)}
                      className="flex-1 gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Baixar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Visualização */}
      <Dialog open={modalVisualizarOpen} onOpenChange={setModalVisualizarOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              Detalhes do Contrato
            </DialogTitle>
            <DialogDescription>
              Visualização completa do contrato e suas cláusulas principais
            </DialogDescription>
          </DialogHeader>
          
          {contratoSelecionado && (
            <div className="space-y-6">
              {/* Cabeçalho do Contrato */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1">{contratoSelecionado.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        Projeto: {contratoSelecionado.projeto}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={getStatusBadge(contratoSelecionado.status).variant} 
                    className={getStatusBadge(contratoSelecionado.status).className}
                  >
                    {contratoSelecionado.status}
                  </Badge>
                </div>
              </div>

              {/* Informações Gerais */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded"></div>
                  Informações Gerais
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Data de Assinatura</p>
                    <p className="font-semibold">{contratoSelecionado.dataAssinatura}</p>
                  </div>
                  
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Valor Total do Contrato</p>
                    <p className="font-semibold text-primary">
                      R$ {contratoSelecionado.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Início da Vigência</p>
                    <p className="font-semibold">{contratoSelecionado.vigenciaInicio}</p>
                  </div>
                  
                  <div className="bg-muted/50 border border-border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Término da Vigência</p>
                    <p className="font-semibold">{contratoSelecionado.vigenciaFim}</p>
                  </div>
                </div>
              </div>

              {/* Objeto do Contrato */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded"></div>
                  Objeto do Contrato
                </h4>
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{contratoSelecionado.objeto}</p>
                </div>
              </div>

              {/* Condições de Pagamento */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded"></div>
                  Condições de Pagamento
                </h4>
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
                    {contratoSelecionado.parcelamento}
                  </p>
                </div>
              </div>

              {/* Observações e Cláusulas Especiais */}
              {contratoSelecionado.observacoes && (
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded"></div>
                    Observações e Cláusulas Especiais
                  </h4>
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-900 dark:text-yellow-300 leading-relaxed">
                      {contratoSelecionado.observacoes}
                    </p>
                  </div>
                </div>
              )}

              {/* Informações Legais */}
              <div className="bg-muted/20 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Nota:</strong> Este é um resumo do contrato. Para acessar o documento completo com todas 
                  as cláusulas, anexos e assinaturas digitais, utilize o botão "Baixar PDF Completo" abaixo.
                </p>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setModalVisualizarOpen(false)}
              className="flex-1"
            >
              Fechar
            </Button>
            <Button
              variant="outline"
              onClick={() => contratoSelecionado && handleBaixar(contratoSelecionado)}
              className="flex-1 gap-2"
            >
              <Download className="w-4 h-4" />
              Baixar PDF Completo
            </Button>
            <Button
              onClick={() => {
                if (contratoSelecionado) {
                  toast.success("Preparando impressão...");
                  // Em produção: window.print() ou abrir PDF em nova aba
                }
              }}
              className="flex-1 gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}