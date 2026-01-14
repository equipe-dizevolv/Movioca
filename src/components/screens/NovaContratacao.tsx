import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar as CalendarIcon, ChevronRight, ArrowLeft, Upload, FileText, Trash2, AlertCircle, Plus } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Documento {
  id: string;
  tipo: string;
  nome: string;
  dataUpload: string;
  url?: string;
}

interface Parcela {
  id: string;
  data: Date;
  valor: string;
}

interface NovaContratacaoProps {
  onVoltar: () => void;
  isPED?: boolean; // Indica se o usuário é PED (filtrar rubricas e validar saldo)
  currentUser?: { id: string; role: string }; // Usuário atual para filtro
}

// Mapeamento de códigos do plano de contas para Grandes Itens
const planoDeContasMap: Record<string, string> = {
  "001.001": "001 - Roteiro",
  "001.002": "001 - Roteiro",
  "002.001": "002 - Produção",
  "002.002": "002 - Produção",
  "003.001": "003 - Direção",
  "003.002": "003 - Direção",
  "004.001": "004 - Elenco",
  "004.002": "004 - Elenco",
  "005.001": "005 - Pós-produção",
  "005.002": "005 - Pós-produção",
};

export default function NovaContratacao({ onVoltar, isPED, currentUser }: NovaContratacaoProps) {
  // Form states
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [socioContratado, setSocioContratado] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  
  const [projeto, setProjeto] = useState("");
  const [tipo, setTipo] = useState("");
  const [itemOrcamentario, setItemOrcamentario] = useState("");
  const [grandeItem, setGrandeItem] = useState("");
  const [inicio, setInicio] = useState<Date>();
  const [fim, setFim] = useState<Date>();
  const [pagamentoRPA, setPagamentoRPA] = useState(false);
  const [total, setTotal] = useState("");
  
  const [cadastro, setCadastro] = useState<"Pendente" | "Em análise" | "Concluído">("Pendente");
  const [acordo, setAcordo] = useState<"Pendente" | "Em negociação" | "Concluído">("Pendente");
  const [contrato, setContrato] = useState<"Pendente" | "Assinatura pendente" | "Concluído">("Pendente");
  const [aditivo, setAditivo] = useState<"Não se aplica" | "Pendente" | "Concluído">("Não se aplica");
  const [distrato, setDistrato] = useState<"Não se aplica" | "Pendente" | "Concluído">("Não se aplica");
  const [validarCNAE, setValidarCNAE] = useState<"Pendente" | "Válido" | "Inválido">("Pendente");
  const [pagamentoAtreladoEntrega, setPagamentoAtreladoEntrega] = useState(false);
  const [chavePix, setChavePix] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [listaSocios] = useState<string[]>(["Carlos Roberto Silva", "Maria José Santos", "José Antonio Lima"]);
  const [parcelas, setParcelas] = useState<Parcela[]>([]);

  // Mock data - Rubricas disponíveis (todas para PEI/Admin, filtradas para PED)
  const todasRubricas = [
    { id: "001.001", nome: "001.001 - Chefe de roteiro", gestor: "user-pei", liberado: 100000, comprometido: 50000 },
    { id: "001.002", nome: "001.002 - Assistente de roteiro", gestor: "user-pei", liberado: 50000, comprometido: 30000 },
    { id: "002.001", nome: "002.001 - Diretor", gestor: "user-ped", liberado: 150000, comprometido: 150000 },
    { id: "002.002", nome: "002.002 - Assistente de Direção", gestor: "user-ped", liberado: 80000, comprometido: 60000 },
    { id: "003.001", nome: "003.001 - Diretor de Fotografia", gestor: "user-ped", liberado: 200000, comprometido: 200000 },
    { id: "003.002", nome: "003.002 - Operador de Câmera", gestor: "user-ped", liberado: 120000, comprometido: 90000 },
    { id: "004.001", nome: "004.001 - Ator principal", gestor: "user-pei", liberado: 300000, comprometido: 200000 },
    { id: "005.001", nome: "005.001 - Locação de Equipamentos", gestor: "user-ped", liberado: 250000, comprometido: 180000 },
    { id: "005.002", nome: "005.002 - Edição", gestor: "user-pei", liberado: 150000, comprometido: 100000 },
  ];

  // Filtrar rubricas se for PED
  const rubricasDisponiveis = isPED
    ? todasRubricas.filter(r => r.gestor === "user-ped") // Simula filtro por currentUser.id
    : todasRubricas;

  // Validação de saldo
  const validarSaldo = (valorContrato: string) => {
    if (!itemOrcamentario || !valorContrato) return null;

    const rubricaSelecionada = todasRubricas.find(r => r.id === itemOrcamentario);
    if (!rubricaSelecionada) return null;

    const saldoDisponivel = rubricaSelecionada.liberado - rubricaSelecionada.comprometido;
    const valorNumerico = parseFloat(valorContrato.replace(/\D/g, "")) / 100; // Converte de centavos

    if (valorNumerico > saldoDisponivel) {
      return {
        temSaldo: false,
        saldoDisponivel,
        diferenca: valorNumerico - saldoDisponivel,
      };
    }

    return {
      temSaldo: true,
      saldoDisponivel,
      diferenca: 0,
    };
  };

  const resultadoValidacao = validarSaldo(total);

  const handleItemOrcamentarioChange = (value: string) => {
    setItemOrcamentario(value);
    // Auto-preencher Grande Item baseado no código
    const grandeItemValue = planoDeContasMap[value] || "";
    setGrandeItem(grandeItemValue);
  };

  const handleCNPJCPFBlur = () => {
    // Simular auto-preenchimento de fornecedor
    if (cnpjCpf === "12.345.678/0001-99") {
      setRazaoSocial("Produtora XYZ Ltda");
      toast.success("Fornecedor encontrado!");
    } else if (cnpjCpf === "123.456.789-00") {
      setRazaoSocial("João Silva");
      toast.success("Fornecedor encontrado!");
    }
  };

  const handleUploadDocumento = (tipo: string) => {
    // Simular upload de documento
    const novoDoc: Documento = {
      id: `doc-${Date.now()}`,
      tipo,
      nome: `${tipo.toLowerCase().replace(/ /g, '_')}_${Date.now()}.pdf`,
      dataUpload: new Date().toLocaleDateString('pt-BR')
    };
    setDocumentos(prev => [...prev, novoDoc]);
    toast.success(`${tipo} anexado com sucesso!`);
  };

  const handleRemoverDocumento = (docId: string) => {
    setDocumentos(prev => prev.filter(doc => doc.id !== docId));
    toast.success("Documento removido");
  };

  const handleAdicionarParcela = () => {
    const novaParcela: Parcela = {
      id: `parcela-${Date.now()}`,
      data: new Date(),
      valor: ""
    };
    setParcelas(prev => [...prev, novaParcela]);
    toast.success("Parcela adicionada");
  };

  const handleRemoverParcela = (parcelaId: string) => {
    setParcelas(prev => prev.filter(parcela => parcela.id !== parcelaId));
    toast.success("Parcela removida");
  };

  const handleSalvarContratacao = () => {
    if (!projeto || !tipo || !razaoSocial || !cnpjCpf || !itemOrcamentario || !inicio || !fim || !total) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    console.log("Salvando contratação:", {
      cnpjCpf,
      razaoSocial,
      socioContratado,
      banco,
      agencia,
      conta,
      tipoConta,
      projeto,
      tipo,
      itemOrcamentario,
      grandeItem,
      inicio,
      fim,
      pagamentoRPA,
      total,
      cadastro,
      acordo,
      contrato,
      aditivo,
      distrato,
      validarCNAE,
    });

    toast.success("Contratação salva com sucesso!");
    onVoltar();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header com Breadcrumb e Botão Voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-foreground" onClick={onVoltar}>
            Contratação
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Nova contratação</span>
        </div>
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Título */}
      <div>
        <h2 className="text-3xl text-foreground">Nova contratação</h2>
        <p className="text-muted-foreground mt-1">
          Preencha os dados para criar uma nova contratação
        </p>
      </div>

      {/* Formulário */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-8">
            {/* Seção: Dados do fornecedor */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Dados do fornecedor</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CNPJ/CPF <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Digite o CNPJ ou CPF"
                    value={cnpjCpf}
                    onChange={(e) => setCnpjCpf(e.target.value)}
                    onBlur={handleCNPJCPFBlur}
                  />
                </div>
                <div>
                  <Label>Razão social <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Preenchido automaticamente"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sócio contratado</Label>
                  <Select value={socioContratado} onValueChange={setSocioContratado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sócio" />
                    </SelectTrigger>
                    <SelectContent>
                      {listaSocios.map((socio) => (
                        <SelectItem key={socio} value={socio}>{socio}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Banco</Label>
                  <Input
                    placeholder="Ex: Banco do Brasil"
                    value={banco}
                    onChange={(e) => setBanco(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Agência</Label>
                  <Input
                    placeholder="Ex: 1234-5"
                    value={agencia}
                    onChange={(e) => setAgencia(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Conta</Label>
                  <Input
                    placeholder="Ex: 12345-6"
                    value={conta}
                    onChange={(e) => setConta(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tipo de conta</Label>
                  <Select value={tipoConta} onValueChange={setTipoConta}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                      <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Chave PIX</Label>
                <Input
                  placeholder="CPF, CNPJ, e-mail ou telefone"
                  value={chavePix}
                  onChange={(e) => setChavePix(e.target.value)}
                />
              </div>
            </div>

            {/* Seção: Dados da contratação */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Dados da contratação</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Projeto <span className="text-destructive">*</span></Label>
                  <Select value={projeto} onValueChange={setProjeto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                      <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                      <SelectItem value="Projeto Gama">Projeto Gama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo <span className="text-destructive">*</span></Label>
                  <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equipe fixa">Equipe fixa</SelectItem>
                      <SelectItem value="Equipe do projeto">Equipe do projeto</SelectItem>
                      <SelectItem value="Fornecedor">Fornecedor</SelectItem>
                      <SelectItem value="Elenco">Elenco</SelectItem>
                      <SelectItem value="Gerenciamento">Gerenciamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Item orçamentário <span className="text-destructive">*</span></Label>
                  <Select value={itemOrcamentario} onValueChange={handleItemOrcamentarioChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {rubricasDisponiveis.map(rubrica => (
                        <SelectItem key={rubrica.id} value={rubrica.id}>{rubrica.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grande item</Label>
                  <Input
                    placeholder="Preenchido automaticamente"
                    value={grandeItem}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Início <span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {inicio ? format(inicio, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={inicio} onSelect={setInicio} locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Fim <span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fim ? format(fim, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={fim} onSelect={setFim} locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pagamento-rpa"
                      checked={pagamentoRPA}
                      onCheckedChange={setPagamentoRPA}
                    />
                    <Label htmlFor="pagamento-rpa" className="cursor-pointer">
                      Pagamento via RPA
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pagamento-atrelado"
                      checked={pagamentoAtreladoEntrega}
                      onCheckedChange={setPagamentoAtreladoEntrega}
                    />
                    <Label htmlFor="pagamento-atrelado" className="cursor-pointer">
                      Pagamento atrelado à entrega
                    </Label>
                  </div>
                </div>
                <div>
                  <Label>Total <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="R$ 0,00"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
              </div>

              {pagamentoAtreladoEntrega && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    Este contrato terá o último pagamento condicionado à confirmação de entrega do serviço.
                  </AlertDescription>
                </Alert>
              )}

              {resultadoValidacao && !resultadoValidacao.temSaldo && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Saldo insuficiente para esta rubrica. Saldo disponível: R$ {resultadoValidacao.saldoDisponivel.toFixed(2)}. Diferença: R$ {resultadoValidacao.diferenca.toFixed(2)}.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Seção: Cronograma de Pagamento */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-semibold">Cronograma de Pagamento</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAdicionarParcela}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Parcela
                </Button>
              </div>

              {parcelas.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Nenhuma parcela adicionada. Clique em "Adicionar Parcela" para inserir as datas e valores de pagamento.
                  </AlertDescription>
                </Alert>
              )}

              {/* Tabela de parcelas */}
              {parcelas.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Data de Pagamento</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parcelas.map((parcela, index) => (
                        <TableRow key={parcela.id}>
                          <TableCell className="font-medium">{index + 1}ª</TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {parcela.data ? format(parcela.data, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar 
                                  mode="single" 
                                  selected={parcela.data} 
                                  onSelect={(date) => {
                                    if (date) {
                                      setParcelas(prev => prev.map(p => p.id === parcela.id ? { ...p, data: date } : p));
                                    }
                                  }} 
                                  locale={ptBR} 
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="R$ 0,00"
                              value={parcela.valor}
                              onChange={(e) => {
                                setParcelas(prev => prev.map(p => p.id === parcela.id ? { ...p, valor: e.target.value } : p));
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoverParcela(parcela.id)}
                              className="hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Seção: Status da contratação */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Status da contratação</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Cadastro</Label>
                  <Select value={cadastro} onValueChange={(v: any) => setCadastro(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Em análise">Em análise</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Acordo</Label>
                  <Select value={acordo} onValueChange={(v: any) => setAcordo(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Em negociação">Em negociação</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Contrato</Label>
                  <Select value={contrato} onValueChange={(v: any) => setContrato(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Assinatura pendente">Assinatura pendente</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Aditivo</Label>
                  <Select value={aditivo} onValueChange={(v: any) => setAditivo(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Distrato</Label>
                  <Select value={distrato} onValueChange={(v: any) => setDistrato(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Validar CNAE</Label>
                  <Select value={validarCNAE} onValueChange={(v: any) => setValidarCNAE(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Válido">Válido</SelectItem>
                      <SelectItem value="Inválido">Inválido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Documentos */}
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Documentos da Contratação</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Cartão CNPJ")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Cartão CNPJ
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Contrato")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Contrato
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Aditivo")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Aditivo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Distrato")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Distrato
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("RPA")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar RPA
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUploadDocumento("Comprovante de Endereço")}
                  className="justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Comp. Endereço
                </Button>
              </div>

              {/* Lista de documentos anexados */}
              {documentos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label className="text-sm text-muted-foreground">Documentos anexados:</Label>
                  {documentos.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.tipo}</p>
                          <p className="text-xs text-muted-foreground">{doc.nome} • {doc.dataUpload}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoverDocumento(doc.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de ação */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onVoltar}>
          Cancelar
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleSalvarContratacao}>
          Salvar contratação
        </Button>
      </div>
    </div>
  );
}