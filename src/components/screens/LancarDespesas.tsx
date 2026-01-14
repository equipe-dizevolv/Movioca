/**
 * MOVIOCA - Lançar Despesas
 * 
 * Tela: "Registro de Gastos e Comprovantes"
 * 
 * Permite lançar despesas em tempo real, tirar foto da nota fiscal,
 * classificar por rubrica e vincular ao cartão corporativo.
 * Fluxo mobile-first otimizado para uso no dia a dia.
 * 
 * PRD 007 - Seção 3.3: Tela: Lançamento de Despesas
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
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
  Camera,
  Plus,
  Upload,
  X,
  Edit,
  Trash2,
  FileText,
  AlertCircle,
  CreditCard,
  Receipt,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

// Mock data - Cartões disponíveis
const mockCartoes = [
  { id: 1, apelido: "Cartão Arte", final: "1234", saldo: 1250.0 },
  { id: 2, apelido: "Cartão Figurino", final: "5678", saldo: 320.5 },
];

// Mock data - Rubricas delegadas ao usuário (filtradas por departamento)
const mockRubricas = [
  { id: 1, codigo: "004.001", nome: "Tinta e Material de Pintura" },
  { id: 2, codigo: "004.002", nome: "Madeira e Compensados" },
  { id: 3, codigo: "004.003", nome: "Ferramentas de Arte" },
  { id: 4, codigo: "004.004", nome: "Consumíveis de Arte" },
  { id: 5, codigo: "004.005", nome: "Tecidos para Cenário" },
];

// Mock data - Despesas em rascunho
const mockDespesasRascunho = [
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
];

export default function LancarDespesas() {
  const [despesas, setDespesas] = useState(mockDespesasRascunho);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState<any>(null);

  // Form fields
  const [cartaoId, setCartaoId] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [fornecedor, setFornecedor] = useState("");
  const [valor, setValor] = useState("");
  const [rubricaId, setRubricaId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [comprovante, setComprovante] = useState<string | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("");

  const handleNovaDespesa = () => {
    setDespesaSelecionada(null);
    setCartaoId("");
    setData(new Date().toISOString().split("T")[0]);
    setFornecedor("");
    setValor("");
    setRubricaId("");
    setDescricao("");
    setComprovante(null);
    setNomeArquivo("");
    setModalAberto(true);
  };

  const handleEditarDespesa = (despesa: any) => {
    setDespesaSelecionada(despesa);
    const cartao = mockCartoes.find((c) =>
      despesa.cartao.includes(c.final)
    );
    setCartaoId(cartao?.id.toString() || "");
    setData(despesa.data);
    setFornecedor(despesa.fornecedor);
    setValor(despesa.valor.toString());
    const rubrica = mockRubricas.find((r) => r.nome === despesa.rubrica);
    setRubricaId(rubrica?.id.toString() || "");
    setDescricao(despesa.descricao);
    setComprovante(despesa.comprovante);
    setNomeArquivo(despesa.comprovante);
    setModalAberto(true);
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simula upload - em produção, enviaria para Google Drive
      const reader = new FileReader();
      reader.onloadend = () => {
        setComprovante(reader.result as string);
        setNomeArquivo(file.name);
        toast.success("Foto anexada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTirarFoto = () => {
    // Simula acesso à câmera (em produção, usaria MediaDevices API)
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Força uso da câmera traseira
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setComprovante(reader.result as string);
          setNomeArquivo(file.name);
          toast.success("Foto capturada com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemoverFoto = () => {
    setComprovante(null);
    setNomeArquivo("");
  };

  const handleSalvarDespesa = () => {
    // Validações
    if (!comprovante) {
      toast.error("Foto do comprovante é obrigatória");
      return;
    }
    if (!cartaoId || !fornecedor || !valor || !rubricaId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const valorNum = parseFloat(valor);
    if (valorNum <= 0) {
      toast.error("Valor inválido");
      return;
    }

    const cartao = mockCartoes.find((c) => c.id.toString() === cartaoId);
    const rubrica = mockRubricas.find((r) => r.id.toString() === rubricaId);

    if (despesaSelecionada) {
      // Editar
      setDespesas(
        despesas.map((d) =>
          d.id === despesaSelecionada.id
            ? {
                ...d,
                cartao: `${cartao?.apelido} (${cartao?.final})`,
                data,
                fornecedor,
                valor: valorNum,
                rubrica: rubrica?.nome || "",
                descricao,
                comprovante: nomeArquivo,
              }
            : d
        )
      );
      toast.success("Despesa atualizada com sucesso!");
    } else {
      // Criar nova
      const novaDespesa = {
        id: despesas.length + 1,
        cartao: `${cartao?.apelido} (${cartao?.final})`,
        data,
        fornecedor,
        valor: valorNum,
        rubrica: rubrica?.nome || "",
        descricao,
        comprovante: nomeArquivo,
        status: "Rascunho",
      };
      setDespesas([novaDespesa, ...despesas]);
      toast.success("Despesa salva com sucesso!");
    }

    setModalAberto(false);
  };

  const handleExcluirDespesa = (id: number) => {
    setDespesas(despesas.filter((d) => d.id !== id));
    toast.success("Despesa excluída");
  };

  const totalDespesas = despesas.reduce((sum, d) => sum + d.valor, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-foreground">Lançar Despesas</h2>
          <p className="text-muted-foreground mt-2">
            Registre suas compras e anexe os comprovantes fiscais
          </p>
        </div>
        <Button onClick={handleNovaDespesa} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Ação Rápida - Mobile First */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Lançamento Rápido</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Acabou de fazer uma compra? Tire a foto da nota agora para não
                esquecer!
              </p>
              <Button
                onClick={handleNovaDespesa}
                className="mt-3 bg-primary"
                size="sm"
              >
                <Camera className="w-4 h-4 mr-2" />
                Tirar Foto e Lançar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Despesas em Rascunho
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {despesas.length}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Não Enviado
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  R${" "}
                  {totalDespesas.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <Receipt className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pendente de Envio
                </p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {despesas.length > 0 ? "Ação Necessária" : "Em Dia"}
                </p>
              </div>
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas Não Enviadas</CardTitle>
        </CardHeader>
        <CardContent>
          {despesas.length > 0 ? (
            <div className="space-y-3">
              {despesas.map((despesa) => (
                <div
                  key={despesa.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Receipt className="w-5 h-5 text-primary" />
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
                        <span>
                          {new Date(despesa.data).toLocaleDateString("pt-BR")}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {despesa.comprovante}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        R${" "}
                        {despesa.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-600 mt-1"
                      >
                        {despesa.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarDespesa(despesa)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDespesaSelecionada(despesa);
                          setModalExcluir(true);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted p-6 rounded-full">
                  <Receipt className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    Nenhuma despesa lançada
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Clique em "Nova Despesa" para começar a registrar seus
                    gastos
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Nova/Editar Despesa */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {despesaSelecionada ? "Editar Despesa" : "Nova Despesa"}
            </DialogTitle>
            <DialogDescription>
              {despesaSelecionada
                ? "Altere as informações da despesa"
                : "Registre uma nova compra e anexe o comprovante fiscal"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Upload de Comprovante - Destaque Principal */}
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
              <Label className="text-base font-medium mb-3 block">
                Comprovante Fiscal{" "}
                <span className="text-destructive">*</span>
              </Label>

              {!comprovante ? (
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleTirarFoto}
                    className="w-full bg-primary"
                    size="lg"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Tirar Foto da Nota Fiscal
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted-foreground/20"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">
                        ou
                      </span>
                    </div>
                  </div>

                  <label htmlFor="upload-comprovante">
                    <div className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 hover:bg-muted/50 cursor-pointer transition-colors text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">
                        Escolher da galeria
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG ou PDF até 5MB
                      </p>
                    </div>
                    <input
                      id="upload-comprovante"
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={handleUploadFoto}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="border rounded-lg p-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{nomeArquivo}</p>
                        <p className="text-xs text-muted-foreground">
                          Comprovante anexado
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoverFoto}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {comprovante.startsWith("data:image") && (
                      <img
                        src={comprovante}
                        alt="Preview"
                        className="mt-3 rounded-lg max-h-32 object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dados da Despesa */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cartao">
                  Cartão Utilizado <span className="text-destructive">*</span>
                </Label>
                <Select value={cartaoId} onValueChange={setCartaoId}>
                  <SelectTrigger id="cartao">
                    <SelectValue placeholder="Selecione o cartão" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCartoes.map((cartao) => (
                      <SelectItem key={cartao.id} value={cartao.id.toString()}>
                        {cartao.apelido} (Final {cartao.final}) - Saldo: R${" "}
                        {cartao.saldo.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="data">
                  Data da Compra <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fornecedor">
                  Fornecedor <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fornecedor"
                  placeholder="Nome do estabelecimento"
                  value={fornecedor}
                  onChange={(e) => setFornecedor(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="valor">
                  Valor Total (R$) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rubrica">
                Item Orçamentário (Rubrica){" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select value={rubricaId} onValueChange={setRubricaId}>
                <SelectTrigger id="rubrica">
                  <SelectValue placeholder="Selecione a rubrica" />
                </SelectTrigger>
                <SelectContent>
                  {mockRubricas.map((rubrica) => (
                    <SelectItem
                      key={rubrica.id}
                      value={rubrica.id.toString()}
                    >
                      {rubrica.codigo} - {rubrica.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Apenas rubricas delegadas ao seu departamento
              </p>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Detalhe breve do que foi comprado"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarDespesa} className="bg-primary">
              {despesaSelecionada ? "Salvar Alterações" : "Salvar Despesa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Excluir Despesa */}
      <Dialog open={modalExcluir} onOpenChange={setModalExcluir}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Excluir Despesa</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir esta despesa?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center gap-4">
              <div className="bg-red-500/10 p-2 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {despesaSelecionada?.fornecedor} - R${" "}
                  {despesaSelecionada?.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {despesaSelecionada?.rubrica} • {despesaSelecionada?.descricao}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalExcluir(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleExcluirDespesa(despesaSelecionada?.id);
                setModalExcluir(false);
              }}
              className="bg-red-500"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}