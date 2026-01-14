/**
 * MOVIOCA - Gestão Financeira (Hub de Execução)
 * 
 * Interface unificada de execução financeira com precisão cirúrgica.
 * Foco: Gestão de liquidez e cumprimento do calendário de pagamentos (dias 10, 20 e 30).
 * 
 * Sistema segmentado por abas:
 * - Aba A: Equipe & Elenco (Rubricas 001-010, 012-014, 020)
 * - Aba B: Fornecedores (Rubricas 011, 015, 021-025)
 * - Aba C: Reembolsos & Cartões
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  CreditCard,
  Users,
  Building2,
  Wallet,
  Search,
  Filter,
  X,
  ExternalLink,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useProjectFilter } from "../../contexts/ProjectFilterContext";

interface PagamentoEquipe {
  id: string;
  nomeArtistico: string;
  cpfCnpj: string;
  tipo: "Pagamento de Contrato" | "Reembolso de Despesa";
  rubrica: string;
  banco: string;
  agencia: string;
  conta: string;
  chavePix?: string;
  valor: number;
  vencimento: string;
  ciclo: 10 | 20 | 30;
  statusOmie: "Aguardando" | "Enviado" | "Realizado";
  documentos: string[];
  aprovadoPorCI: boolean;
}

interface PagamentoFornecedor {
  id: string;
  razaoSocial: string;
  cnpj: string;
  cnae: string;
  cnaeValido: boolean;
  rubrica: string;
  banco: string;
  agencia: string;
  conta: string;
  valorNF: number;
  numeroNF: string;
  vencimento: string;
  ciclo: 10 | 20 | 30;
  statusOmie: "Aguardando" | "Enviado" | "Realizado";
  statusNF: "Validado" | "Pendente" | "Rejeitado";
  documentos: string[];
  aprovadoPorCI: boolean;
}

interface ReembolsoMovioca {
  id: string;
  descricao: string;
  projeto: string;
  valor: number;
  dataAntecipacao: string;
  statusFaturamento: "Pendente" | "Faturado" | "Pago";
  documentos: string[];
}

interface ControleCartao {
  id: string;
  responsavel: string;
  valorSolicitado: number;
  valorPrestado: number;
  saldoAberto: number;
  statusCarga: "Pendente" | "Autorizado" | "Transferido";
  dataSolicitacao: string;
}

// Drawer para visualização de documentos
interface DocumentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documentos: string[];
  titulo: string;
}

function DocumentDrawer({ isOpen, onClose, documentos, titulo }: DocumentDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="ml-auto relative w-[600px] bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{titulo}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {documentos.map((doc, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Preview simulado do documento */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FileText className="h-16 w-16 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Preview do Google Drive</p>
                    <p className="text-xs mt-1">Visualização lado a lado com dados bancários</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir no Drive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GestaoFinanceira() {
  const { selectedProject } = useProjectFilter();
  const [activeTab, setActiveTab] = useState("equipe");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentDocuments, setCurrentDocuments] = useState<string[]>([]);
  const [documentTitle, setDocumentTitle] = useState("");

  // Mock Data - Equipe & Elenco
  const pagamentosEquipe: PagamentoEquipe[] = [
    {
      id: "EQ001",
      nomeArtistico: "Maria da Luz",
      cpfCnpj: "123.456.789-00",
      tipo: "Pagamento de Contrato",
      rubrica: "001 - Elenco Principal",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      chavePix: "maria.luz@email.com",
      valor: 15000,
      vencimento: "30/12/2024",
      ciclo: 30,
      statusOmie: "Aguardando",
      documentos: ["Contrato_Maria_da_Luz.pdf", "RG_CPF.pdf", "Comprovante_Residencia.pdf"],
      aprovadoPorCI: true,
    },
    {
      id: "EQ002",
      nomeArtistico: "João Silva (Diretor)",
      cpfCnpj: "987.654.321-00",
      tipo: "Pagamento de Contrato",
      rubrica: "005 - Direção",
      banco: "Itaú",
      agencia: "9876",
      conta: "54321-0",
      chavePix: "+55 11 98765-4321",
      valor: 25000,
      vencimento: "30/12/2024",
      ciclo: 30,
      statusOmie: "Aguardando",
      documentos: ["Contrato_Direcao.pdf", "Documentos_Pessoais.pdf"],
      aprovadoPorCI: true,
    },
    {
      id: "EQ003",
      nomeArtistico: "Ana Costa (Roteirista)",
      cpfCnpj: "456.789.123-00",
      tipo: "Reembolso de Despesa",
      rubrica: "006 - Roteiro",
      banco: "Santander",
      agencia: "3456",
      conta: "67890-1",
      valor: 1200,
      vencimento: "20/12/2024",
      ciclo: 20,
      statusOmie: "Aguardando",
      documentos: ["Recibo_Pesquisa.pdf", "Nota_Fiscal.pdf"],
      aprovadoPorCI: true,
    },
  ];

  // Mock Data - Fornecedores
  const pagamentosFornecedores: PagamentoFornecedor[] = [
    {
      id: "FN001",
      razaoSocial: "Locadora XYZ Ltda",
      cnpj: "12.345.678/0001-90",
      cnae: "77.11-0-00 - Locação de automóveis",
      cnaeValido: true,
      rubrica: "021 - Locação de Veículos",
      banco: "Bradesco",
      agencia: "5555",
      conta: "98765-4",
      valorNF: 8500,
      numeroNF: "NF-12345",
      vencimento: "10/01/2025",
      ciclo: 10,
      statusOmie: "Aguardando",
      statusNF: "Validado",
      documentos: ["NF_12345.pdf", "Boleto.pdf", "Cartao_CNPJ.pdf", "Contrato_Social.pdf"],
      aprovadoPorCI: true,
    },
    {
      id: "FN002",
      razaoSocial: "Estúdio ABC Produções",
      cnpj: "98.765.432/0001-10",
      cnae: "59.11-1-00 - Produção cinematográfica",
      cnaeValido: true,
      rubrica: "015 - Estúdio e Equipamentos",
      banco: "Caixa Econômica",
      agencia: "7777",
      conta: "11111-2",
      valorNF: 45000,
      numeroNF: "NF-67890",
      vencimento: "10/01/2025",
      ciclo: 10,
      statusOmie: "Aguardando",
      statusNF: "Validado",
      documentos: ["NF_67890.pdf", "Contrato_Locacao.pdf", "Cartao_CNPJ.pdf"],
      aprovadoPorCI: true,
    },
    {
      id: "FN003",
      razaoSocial: "Catering Delícias ME",
      cnpj: "11.222.333/0001-44",
      cnae: "56.20-1-00 - Serviços de alimentação",
      cnaeValido: true,
      rubrica: "023 - Alimentação",
      banco: "Nubank",
      agencia: "0001",
      conta: "99999-9",
      valorNF: 3200,
      numeroNF: "NF-11111",
      vencimento: "20/12/2024",
      ciclo: 20,
      statusOmie: "Aguardando",
      statusNF: "Validado",
      documentos: ["NF_11111.pdf", "Comprovante_PIX.pdf"],
      aprovadoPorCI: true,
    },
  ];

  // Mock Data - Reembolsos Movioca
  const reembolsosMovioca: ReembolsoMovioca[] = [
    {
      id: "RM001",
      descricao: "Antecipação de locação de equipamento",
      projeto: selectedProject || "Love Taste 1T",
      valor: 12000,
      dataAntecipacao: "15/11/2024",
      statusFaturamento: "Pendente",
      documentos: ["Recibo_Equipamento.pdf", "Comprovante_Pagamento.pdf"],
    },
    {
      id: "RM002",
      descricao: "Despesas com passagens aéreas elenco",
      projeto: selectedProject || "Love Taste 1T",
      valor: 5400,
      dataAntecipacao: "20/11/2024",
      statusFaturamento: "Faturado",
      documentos: ["Bilhetes_Aereos.pdf", "Comprovante_Transferencia.pdf"],
    },
  ];

  // Mock Data - Controle de Cartões
  const controleCartoes: ControleCartao[] = [
    {
      id: "CC001",
      responsavel: "Ivan Carvalho",
      valorSolicitado: 15000,
      valorPrestado: 8500,
      saldoAberto: 6500,
      statusCarga: "Pendente",
      dataSolicitacao: "28/12/2024",
    },
    {
      id: "CC002",
      responsavel: "Mariana Souza",
      valorSolicitado: 10000,
      valorPrestado: 10000,
      saldoAberto: 0,
      statusCarga: "Transferido",
      dataSolicitacao: "20/12/2024",
    },
  ];

  const handleOpenDocuments = (docs: string[], title: string) => {
    setCurrentDocuments(docs);
    setDocumentTitle(title);
    setDrawerOpen(true);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (ids: string[]) => {
    if (selectedItems.length === ids.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(ids);
    }
  };

  const handleEnviarParaOmie = () => {
    if (selectedItems.length === 0) {
      toast.error("Selecione ao menos um item para enviar ao Omie");
      return;
    }

    // Simula envio para integração Omie
    toast.success(
      `${selectedItems.length} ${selectedItems.length === 1 ? "título enviado" : "títulos enviados"} para processamento no Omie`,
      {
        description: "ID de Processamento: #OMI-2024-001234",
      }
    );

    // Atualiza status dos itens selecionados
    setTimeout(() => {
      toast.success("Status atualizado: Títulos marcados como Realizados", {
        description: "Saldo Comprometido → Saldo Realizado",
      });
      setSelectedItems([]);
    }, 2000);
  };

  const handleAutorizarCarga = (cartaoId: string, responsavel: string, valor: number) => {
    toast.success(`Carga autorizada para ${responsavel}`, {
      description: `Valor: R$ ${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} • Transferência iniciada`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      Aguardando: { variant: "default", label: "Aguardando" },
      Enviado: { variant: "secondary", label: "Enviado" },
      Realizado: { variant: "outline", label: "Realizado" },
      Validado: { variant: "outline", label: "✓ Validado" },
      Pendente: { variant: "destructive", label: "Pendente" },
      Faturado: { variant: "secondary", label: "Faturado" },
      Pago: { variant: "outline", label: "Pago" },
      Autorizado: { variant: "secondary", label: "Autorizado" },
      Transferido: { variant: "outline", label: "Transferido" },
    };

    const config = variants[status] || { variant: "default", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCicloColor = (ciclo: number) => {
    if (ciclo === 10) return "text-blue-600 bg-blue-50 dark:bg-blue-950";
    if (ciclo === 20) return "text-purple-600 bg-purple-50 dark:bg-purple-950";
    return "text-green-600 bg-green-50 dark:bg-green-950";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Gestão Financeira</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hub unificado de execução de pagamentos e reembolsos • Projeto:{" "}
          <span className="font-medium text-purple-600">{selectedProject || "Todos os Projetos"}</span>
        </p>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, CPF/CNPJ, rubrica..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedItems.length} {selectedItems.length === 1 ? "selecionado" : "selecionados"}
                </Badge>
                <Button onClick={handleEnviarParaOmie} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar para Omie
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="equipe" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Equipe & Elenco
          </TabsTrigger>
          <TabsTrigger value="fornecedores" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Fornecedores
          </TabsTrigger>
          <TabsTrigger value="reembolsos" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Reembolsos & Cartões
          </TabsTrigger>
        </TabsList>

        {/* Aba A: Equipe & Elenco */}
        <TabsContent value="equipe" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Equipe & Elenco • Rubricas 001-010, 012-014, 020</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSelectAll(pagamentosEquipe.map((p) => p.id))}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  {selectedItems.length === pagamentosEquipe.length ? "Desmarcar Todos" : "Selecionar Todos"}
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cachês, salários e contratos artísticos (PF ou PJ Artista)
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left font-medium w-10"></th>
                      <th className="p-3 text-left font-medium">Nome Artístico</th>
                      <th className="p-3 text-left font-medium">CPF/CNPJ</th>
                      <th className="p-3 text-left font-medium">Tipo</th>
                      <th className="p-3 text-left font-medium">Rubrica</th>
                      <th className="p-3 text-left font-medium">Banco</th>
                      <th className="p-3 text-left font-medium">Ag/Conta</th>
                      <th className="p-3 text-left font-medium">Chave PIX</th>
                      <th className="p-3 text-right font-medium">Valor</th>
                      <th className="p-3 text-center font-medium">Ciclo</th>
                      <th className="p-3 text-center font-medium">Status</th>
                      <th className="p-3 text-center font-medium">Docs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagamentosEquipe.map((pag) => {
                      const isSelected = selectedItems.includes(pag.id);
                      const isRealizado = pag.statusOmie === "Realizado";

                      return (
                        <tr
                          key={pag.id}
                          className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            isRealizado ? "bg-green-50 dark:bg-green-950/20" : ""
                          } ${isSelected ? "bg-purple-50 dark:bg-purple-950/20" : ""}`}
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(pag.id)}
                              disabled={isRealizado}
                              className="rounded"
                            />
                          </td>
                          <td className="p-3 font-medium">{pag.nomeArtistico}</td>
                          <td className="p-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{pag.cpfCnpj}</td>
                          <td className="p-3">
                            <Badge variant={pag.tipo === "Pagamento de Contrato" ? "default" : "secondary"} className="text-xs">
                              {pag.tipo === "Pagamento de Contrato" ? "Contrato" : "Reembolso"}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs">{pag.rubrica}</td>
                          <td className="p-3 text-xs">{pag.banco}</td>
                          <td className="p-3 text-xs font-mono">
                            {pag.agencia} / {pag.conta}
                          </td>
                          <td className="p-3 text-xs font-mono text-gray-600 dark:text-gray-400">{pag.chavePix || "-"}</td>
                          <td className="p-3 text-right font-medium">
                            R$ {pag.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="p-3 text-center">
                            <Badge className={getCicloColor(pag.ciclo)}>Dia {pag.ciclo}</Badge>
                          </td>
                          <td className="p-3 text-center">{getStatusBadge(pag.statusOmie)}</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDocuments(pag.documentos, `Documentos - ${pag.nomeArtistico}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800 font-semibold border-t-2">
                    <tr>
                      <td colSpan={8} className="p-3 text-right">
                        Total:
                      </td>
                      <td className="p-3 text-right">
                        R${" "}
                        {pagamentosEquipe
                          .reduce((sum, p) => sum + p.valor, 0)
                          .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba B: Fornecedores */}
        <TabsContent value="fornecedores" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fornecedores • Rubricas 011, 015, 021-025</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSelectAll(pagamentosFornecedores.map((p) => p.id))}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  {selectedItems.length === pagamentosFornecedores.length ? "Desmarcar Todos" : "Selecionar Todos"}
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prestadores de serviços, locações e compras gerais
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left font-medium w-10"></th>
                      <th className="p-3 text-left font-medium">Razão Social</th>
                      <th className="p-3 text-left font-medium">CNPJ</th>
                      <th className="p-3 text-left font-medium">CNAE</th>
                      <th className="p-3 text-left font-medium">Rubrica</th>
                      <th className="p-3 text-left font-medium">Banco/Ag/Conta</th>
                      <th className="p-3 text-left font-medium">NF</th>
                      <th className="p-3 text-right font-medium">Valor NF</th>
                      <th className="p-3 text-center font-medium">Ciclo</th>
                      <th className="p-3 text-center font-medium">Status NF</th>
                      <th className="p-3 text-center font-medium">Status</th>
                      <th className="p-3 text-center font-medium">Docs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagamentosFornecedores.map((forn) => {
                      const isSelected = selectedItems.includes(forn.id);
                      const isRealizado = forn.statusOmie === "Realizado";

                      return (
                        <tr
                          key={forn.id}
                          className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            isRealizado ? "bg-green-50 dark:bg-green-950/20" : ""
                          } ${isSelected ? "bg-purple-50 dark:bg-purple-950/20" : ""}`}
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(forn.id)}
                              disabled={isRealizado}
                              className="rounded"
                            />
                          </td>
                          <td className="p-3 font-medium">{forn.razaoSocial}</td>
                          <td className="p-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{forn.cnpj}</td>
                          <td className="p-3 text-xs">
                            <div className="flex items-center gap-1">
                              {forn.cnaeValido ? (
                                <CheckCircle2 className="h-3 w-3 text-green-600" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-red-600" />
                              )}
                              <span className="truncate max-w-[150px]" title={forn.cnae}>
                                {forn.cnae}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-xs">{forn.rubrica}</td>
                          <td className="p-3 text-xs font-mono">
                            {forn.banco} • {forn.agencia}/{forn.conta}
                          </td>
                          <td className="p-3 text-xs font-mono">{forn.numeroNF}</td>
                          <td className="p-3 text-right font-medium">
                            R$ {forn.valorNF.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="p-3 text-center">
                            <Badge className={getCicloColor(forn.ciclo)}>Dia {forn.ciclo}</Badge>
                          </td>
                          <td className="p-3 text-center">{getStatusBadge(forn.statusNF)}</td>
                          <td className="p-3 text-center">{getStatusBadge(forn.statusOmie)}</td>
                          <td className="p-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDocuments(forn.documentos, `Documentos - ${forn.razaoSocial}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800 font-semibold border-t-2">
                    <tr>
                      <td colSpan={7} className="p-3 text-right">
                        Total:
                      </td>
                      <td className="p-3 text-right">
                        R${" "}
                        {pagamentosFornecedores
                          .reduce((sum, f) => sum + f.valorNF, 0)
                          .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td colSpan={4}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba C: Reembolsos & Cartões */}
        <TabsContent value="reembolsos" className="space-y-4">
          {/* Reembolsos Movioca */}
          <Card>
            <CardHeader>
              <CardTitle>Reembolsos Movioca</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Despesas antecipadas pela produtora a serem faturadas contra o projeto
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left font-medium">Descrição</th>
                      <th className="p-3 text-left font-medium">Projeto</th>
                      <th className="p-3 text-right font-medium">Valor</th>
                      <th className="p-3 text-center font-medium">Data Antecipação</th>
                      <th className="p-3 text-center font-medium">Status</th>
                      <th className="p-3 text-center font-medium">Docs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reembolsosMovioca.map((reemb) => (
                      <tr key={reemb.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3">{reemb.descricao}</td>
                        <td className="p-3 font-medium text-purple-600">{reemb.projeto}</td>
                        <td className="p-3 text-right font-medium">
                          R$ {reemb.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-center text-xs">{reemb.dataAntecipacao}</td>
                        <td className="p-3 text-center">{getStatusBadge(reemb.statusFaturamento)}</td>
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDocuments(reemb.documentos, `Documentos - ${reemb.descricao}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Controle de Cartões */}
          <Card>
            <CardHeader>
              <CardTitle>Controle de Cartões</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Saldo em aberto (Valor Solicitado - Valor Prestado) por responsável
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="p-3 text-left font-medium">Responsável</th>
                      <th className="p-3 text-right font-medium">Valor Solicitado</th>
                      <th className="p-3 text-right font-medium">Valor Prestado</th>
                      <th className="p-3 text-right font-medium">Saldo em Aberto</th>
                      <th className="p-3 text-center font-medium">Data Solicitação</th>
                      <th className="p-3 text-center font-medium">Status</th>
                      <th className="p-3 text-center font-medium">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controleCartoes.map((cartao) => (
                      <tr key={cartao.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3 font-medium flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                          {cartao.responsavel}
                        </td>
                        <td className="p-3 text-right">
                          R$ {cartao.valorSolicitado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right text-green-600">
                          R$ {cartao.valorPrestado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right font-semibold">
                          <span className={cartao.saldoAberto > 0 ? "text-orange-600" : "text-gray-400"}>
                            R$ {cartao.saldoAberto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td className="p-3 text-center text-xs">{cartao.dataSolicitacao}</td>
                        <td className="p-3 text-center">{getStatusBadge(cartao.statusCarga)}</td>
                        <td className="p-3 text-center">
                          {cartao.statusCarga === "Pendente" ? (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleAutorizarCarga(cartao.id, cartao.responsavel, cartao.valorSolicitado)
                              }
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Autorizar Carga
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Drawer */}
      <DocumentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        documentos={currentDocuments}
        titulo={documentTitle}
      />
    </div>
  );
}