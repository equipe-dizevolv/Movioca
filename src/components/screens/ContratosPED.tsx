/**
 * MOVIOCA - Contratos PED
 * 
 * Versão filtrada da tela de contratos para Produção Executiva Dedicada.
 * 
 * Diferenças em relação à visão Admin/PEI:
 * - Exibe apenas contratos vinculados às rubricas da PED
 * - Permite upload de contrato assinado
 * - Validação de saldo ao criar contrato
 * 
 * PRD 005 - Seção 3.3: Tela: Gestão de Contratos (Visão PED)
 * História 6: Upload de Contratos Assinados
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Search,
  Plus,
  MoreVertical,
  Upload,
  Eye,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { formatCurrency } from "../../utils/orcamento";

interface ContratosPEDProps {
  onNavigate: (screen: string) => void;
}

interface Contrato {
  id: string;
  numero: string;
  fornecedor: string;
  itemOrcamentario: string;
  itemDescricao: string;
  valor: number;
  status: "Acordo" | "Minuta" | "Assinado";
  dataInicio: string;
  dataFim: string;
  contratoAnexo?: string;
}

export default function ContratosPED({ onNavigate }: ContratosPEDProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] =
    useState<Contrato | null>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);

  // Mock data - Contratos vinculados às rubricas da PED
  const contratos: Contrato[] = [
    {
      id: "cnt-001",
      numero: "CNT-001",
      fornecedor: "José Silva",
      itemOrcamentario: "002.001",
      itemDescricao: "Diretor",
      valor: 150000,
      status: "Assinado",
      dataInicio: "01/12/2024",
      dataFim: "31/03/2025",
      contratoAnexo: "contrato_jose_silva.pdf",
    },
    {
      id: "cnt-002",
      numero: "CNT-002",
      fornecedor: "Maria Santos",
      itemOrcamentario: "003.001",
      itemDescricao: "Diretor de Fotografia",
      valor: 200000,
      status: "Assinado",
      dataInicio: "05/12/2024",
      dataFim: "31/03/2025",
      contratoAnexo: "contrato_maria_santos.pdf",
    },
    {
      id: "cnt-003",
      numero: "CNT-003",
      fornecedor: "Pedro Costa",
      itemOrcamentario: "002.002",
      itemDescricao: "Assistente de Direção",
      valor: 60000,
      status: "Minuta",
      dataInicio: "10/12/2024",
      dataFim: "28/02/2025",
    },
    {
      id: "cnt-004",
      numero: "CNT-004",
      fornecedor: "Ana Paula Lima",
      itemOrcamentario: "003.002",
      itemDescricao: "Operador de Câmera",
      valor: 90000,
      status: "Minuta",
      dataInicio: "10/12/2024",
      dataFim: "31/03/2025",
    },
    {
      id: "cnt-005",
      numero: "CNT-015",
      fornecedor: "Locadora XYZ Equipamentos",
      itemOrcamentario: "005.001",
      itemDescricao: "Locação de Equipamentos",
      valor: 120000,
      status: "Acordo",
      dataInicio: "15/12/2024",
      dataFim: "31/03/2025",
    },
  ];

  // Filtro de busca
  const contratosFiltrados = contratos.filter(
    (c) =>
      c.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.itemOrcamentario.includes(searchTerm) ||
      c.itemDescricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estatísticas
  const totalContratos = contratos.length;
  const contratosAssinados = contratos.filter(
    (c) => c.status === "Assinado"
  ).length;
  const contratosMinuta = contratos.filter((c) => c.status === "Minuta").length;
  const valorTotal = contratos.reduce((sum, c) => sum + c.valor, 0);

  // Handlers
  const handleUploadContrato = (contrato: Contrato) => {
    if (contrato.status !== "Minuta") {
      toast.error("Apenas contratos em status 'Minuta' podem receber upload");
      return;
    }
    setContratoSelecionado(contrato);
    setOpenUpload(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleConfirmarUpload = () => {
    if (!arquivo) {
      toast.error("Selecione um arquivo");
      return;
    }

    // Simula upload
    toast.success(
      `Contrato ${contratoSelecionado?.numero} atualizado para "Assinado". O fluxo de pagamento foi liberado.`
    );

    // Reset
    setOpenUpload(false);
    setContratoSelecionado(null);
    setArquivo(null);
  };

  const getStatusBadge = (status: Contrato["status"]) => {
    switch (status) {
      case "Acordo":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            Acordo
          </Badge>
        );
      case "Minuta":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            Minuta
          </Badge>
        );
      case "Assinado":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Assinado
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div>
            <h2 className="text-3xl text-foreground">
              Meus Contratos e Equipe
            </h2>
            <p className="text-muted-foreground mt-1">
              Contratos vinculados às suas rubricas orçamentárias
            </p>
          </div>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => onNavigate("NovaContratacao")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Contratação
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Total de Contratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalContratos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Contratos Assinados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {contratosAssinados}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Aguardando Assinatura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {contratosMinuta}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(valorTotal)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Minuta */}
      {contratosMinuta > 0 && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>{contratosMinuta} contrato(s)</strong> em status
                  "Minuta". Faça o upload dos contratos assinados para liberar o
                  fluxo de pagamento na Controladoria.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Contratos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Contratos</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Apenas contratos das suas rubricas são exibidos
              </p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar contrato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Item Orçamentário</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? "Nenhum contrato encontrado."
                          : "Nenhum contrato vinculado às suas rubricas."}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  contratosFiltrados.map((contrato) => (
                    <TableRow key={contrato.id}>
                      <TableCell className="font-mono text-sm">
                        {contrato.numero}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{contrato.fornecedor}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {contrato.itemOrcamentario} -{" "}
                          {contrato.itemDescricao}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(contrato.valor)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {contrato.dataInicio} a {contrato.dataFim}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(contrato.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setContratoSelecionado(contrato);
                                setOpenDetalhes(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            {contrato.status === "Minuta" && (
                              <DropdownMenuItem
                                onClick={() => handleUploadContrato(contrato)}
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Contrato Assinado
                              </DropdownMenuItem>
                            )}
                            {contrato.contratoAnexo && (
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                Baixar Contrato
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Upload de Contrato Assinado */}
      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload de Contrato Assinado</DialogTitle>
            <DialogDescription>
              Faça o upload do contrato assinado para liberar o fluxo de
              pagamento
            </DialogDescription>
          </DialogHeader>

          {contratoSelecionado && (
            <div className="space-y-4">
              {/* Info do Contrato */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Número:</span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.numero}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Fornecedor:
                  </span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.fornecedor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(contratoSelecionado.valor)}
                  </span>
                </div>
              </div>

              {/* Upload */}
              <div>
                <Label>Arquivo do Contrato Assinado *</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos aceitos: PDF, DOC, DOCX
                </p>
              </div>

              {arquivo && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Arquivo selecionado: {arquivo.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  <strong>ℹ️ Importante:</strong> Após o upload, o status do
                  contrato será atualizado para "Assinado" e o fluxo de
                  pagamento será liberado automaticamente para a Controladoria.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenUpload(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarUpload} disabled={!arquivo}>
              <Upload className="w-4 h-4 mr-2" />
              Confirmar Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Detalhes do Contrato */}
      <Dialog open={openDetalhes} onOpenChange={setOpenDetalhes}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Contrato</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o contrato selecionado
            </DialogDescription>
          </DialogHeader>

          {contratoSelecionado && (
            <div className="space-y-4">
              {/* Info do Contrato */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Número:</span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.numero}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Fornecedor:
                  </span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.fornecedor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(contratoSelecionado.valor)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Período:
                  </span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.dataInicio} a {contratoSelecionado.dataFim}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-sm font-medium">
                    {getStatusBadge(contratoSelecionado.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Item Orçamentário:
                  </span>
                  <span className="text-sm font-medium">
                    {contratoSelecionado.itemOrcamentario} -{" "}
                    {contratoSelecionado.itemDescricao}
                  </span>
                </div>
              </div>
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