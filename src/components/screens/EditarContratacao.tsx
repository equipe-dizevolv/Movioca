/**
 * MOVIOCA - Editar Contratação
 * 
 * Tela dedicada para edição de contratações existentes.
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, Save, FileText, Download, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface Documento {
  id: string;
  tipo: string;
  nome: string;
  dataUpload: string;
  url?: string;
}

interface DadosPagamento {
  banco: string;
  agencia: string;
  conta: string;
  tipoConta: string;
  chavePix?: string;
}

interface Contratacao {
  id: string;
  projeto: string;
  tipo: string;
  razaoSocial: string;
  cnpjCpf: string;
  socioContratado?: string;
  validarCNAE: "Pendente" | "Válido" | "Inválido";
  itemOrcamentario: string;
  grandeItem: string;
  inicio: string;
  fim: string;
  total: number;
  cadastro: "Pendente" | "Em análise" | "Concluído";
  acordo: "Pendente" | "Em negociação" | "Concluído";
  contrato: "Pendente" | "Assinatura pendente" | "Concluído";
  aditivo: "Não se aplica" | "Pendente" | "Concluído";
  distrato: "Não se aplica" | "Pendente" | "Concluído";
  pagamentoAtreladoEntrega: boolean;
  dadosPagamento?: DadosPagamento;
  documentos: Documento[];
}

interface EditarContratacaoProps {
  contratacao: Contratacao;
  onVoltar: () => void;
  onSalvar: (contratacao: Contratacao) => void;
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

export default function EditarContratacao({ contratacao, onVoltar, onSalvar }: EditarContratacaoProps) {
  // Estados para os campos do formulário
  const [cnpjCpf, setCnpjCpf] = useState(contratacao.cnpjCpf);
  const [razaoSocial, setRazaoSocial] = useState(contratacao.razaoSocial);
  const [socioContratado, setSocioContratado] = useState(contratacao.socioContratado || "");
  const [projeto, setProjeto] = useState(contratacao.projeto);
  const [tipo, setTipo] = useState(contratacao.tipo);
  const [itemOrcamentario, setItemOrcamentario] = useState(contratacao.itemOrcamentario);
  const [grandeItem, setGrandeItem] = useState(contratacao.grandeItem);
  const [total, setTotal] = useState(contratacao.total.toString());
  const [cadastro, setCadastro] = useState(contratacao.cadastro);
  const [validarCNAE, setValidarCNAE] = useState(contratacao.validarCNAE);
  const [acordo, setAcordo] = useState(contratacao.acordo);
  const [contrato, setContrato] = useState(contratacao.contrato);
  const [aditivo, setAditivo] = useState(contratacao.aditivo);
  const [distrato, setDistrato] = useState(contratacao.distrato);
  const [pagamentoAtreladoEntrega, setPagamentoAtreladoEntrega] = useState(contratacao.pagamentoAtreladoEntrega);
  const [banco, setBanco] = useState(contratacao.dadosPagamento?.banco || "");
  const [agencia, setAgencia] = useState(contratacao.dadosPagamento?.agencia || "");
  const [conta, setConta] = useState(contratacao.dadosPagamento?.conta || "");
  const [tipoConta, setTipoConta] = useState(contratacao.dadosPagamento?.tipoConta || "");
  const [chavePix, setChavePix] = useState(contratacao.dadosPagamento?.chavePix || "");
  const [documentos, setDocumentos] = useState<Documento[]>(contratacao.documentos);

  const listaSocios = ["João Silva", "Maria Santos", "Carlos Roberto Silva", "Ana Paula Costa"];

  const handleItemOrcamentarioChange = (value: string) => {
    setItemOrcamentario(value);
    const grandeItemMapeado = planoDeContasMap[value] || "";
    setGrandeItem(grandeItemMapeado);
  };

  const handleCNPJCPFBlur = () => {
    // Simulação de busca na API
    if (cnpjCpf.includes("/")) {
      // É CNPJ
      toast.success("CNPJ validado");
    } else {
      // É CPF
      toast.success("CPF validado");
    }
  };

  const handleSalvar = () => {
    if (!cnpjCpf || !razaoSocial || !projeto || !tipo || !itemOrcamentario || !total) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const contratacaoAtualizada: Contratacao = {
      ...contratacao,
      cnpjCpf,
      razaoSocial,
      socioContratado,
      projeto,
      tipo,
      itemOrcamentario,
      grandeItem,
      total: parseFloat(total) || 0,
      cadastro,
      acordo,
      contrato,
      aditivo,
      distrato,
      validarCNAE,
      pagamentoAtreladoEntrega,
      dadosPagamento: banco ? {
        banco,
        agencia,
        conta,
        tipoConta,
        chavePix
      } : undefined,
      documentos
    };

    onSalvar(contratacaoAtualizada);
    toast.success("Contratação atualizada com sucesso!");
  };

  const handleUploadDocumento = () => {
    const novoDoc: Documento = {
      id: `doc_${Date.now()}`,
      tipo: "Documento",
      nome: "documento_exemplo.pdf",
      dataUpload: new Date().toLocaleDateString("pt-BR"),
    };
    setDocumentos([...documentos, novoDoc]);
    toast.success("Documento anexado com sucesso!");
  };

  const handleRemoverDocumento = (docId: string) => {
    setDocumentos(documentos.filter(d => d.id !== docId));
    toast.success("Documento removido");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={onVoltar}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Contratações
          </Button>
          <h2 className="text-3xl text-foreground">Editar Contratação</h2>
          <p className="text-muted-foreground mt-2">
            {contratacao.razaoSocial} • {contratacao.cnpjCpf}
          </p>
        </div>
        <Button onClick={handleSalvar} className="bg-primary">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Dados do Fornecedor */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Fornecedor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cnpjCpf">
                CNPJ/CPF <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cnpjCpf"
                placeholder="Digite o CNPJ ou CPF"
                value={cnpjCpf}
                onChange={(e) => setCnpjCpf(e.target.value)}
                onBlur={handleCNPJCPFBlur}
              />
            </div>
            <div>
              <Label htmlFor="razaoSocial">
                Razão Social <span className="text-destructive">*</span>
              </Label>
              <Input
                id="razaoSocial"
                placeholder="Preenchido automaticamente"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="socioContratado">Sócio Contratado</Label>
            <Select value={socioContratado} onValueChange={setSocioContratado}>
              <SelectTrigger id="socioContratado">
                <SelectValue placeholder="Selecione o sócio (se aplicável)" />
              </SelectTrigger>
              <SelectContent>
                {listaSocios.map((socio) => (
                  <SelectItem key={socio} value={socio}>{socio}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dados da Contratação */}
      <Card>
        <CardHeader>
          <CardTitle>Dados da Contratação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projeto">
                Projeto <span className="text-destructive">*</span>
              </Label>
              <Select value={projeto} onValueChange={setProjeto}>
                <SelectTrigger id="projeto">
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
              <Label htmlFor="tipo">
                Tipo <span className="text-destructive">*</span>
              </Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger id="tipo">
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
              <Label htmlFor="itemOrcamentario">
                Item Orçamentário <span className="text-destructive">*</span>
              </Label>
              <Select value={itemOrcamentario} onValueChange={handleItemOrcamentarioChange}>
                <SelectTrigger id="itemOrcamentario">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="001.001">001.001 - Chefe de roteiro</SelectItem>
                  <SelectItem value="001.002">001.002 - Assistente de roteiro</SelectItem>
                  <SelectItem value="002.001">002.001 - Produtor executivo</SelectItem>
                  <SelectItem value="003.001">003.001 - Diretor(a)</SelectItem>
                  <SelectItem value="004.001">004.001 - Ator principal</SelectItem>
                  <SelectItem value="005.002">005.002 - Edição</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="grandeItem">Grande Item</Label>
              <Input
                id="grandeItem"
                placeholder="Preenchido automaticamente"
                value={grandeItem}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total">
                Total <span className="text-destructive">*</span>
              </Label>
              <Input
                id="total"
                placeholder="R$ 0,00"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status da Contratação */}
      <Card>
        <CardHeader>
          <CardTitle>Status da Contratação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cadastro">Cadastro</Label>
              <Select value={cadastro} onValueChange={(v: any) => setCadastro(v)}>
                <SelectTrigger id="cadastro">
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
              <Label htmlFor="validarCNAE">Validar CNAE</Label>
              <Select value={validarCNAE} onValueChange={(v: any) => setValidarCNAE(v)}>
                <SelectTrigger id="validarCNAE">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Válido">Válido</SelectItem>
                  <SelectItem value="Inválido">Inválido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="acordo">Acordo</Label>
              <Select value={acordo} onValueChange={(v: any) => setAcordo(v)}>
                <SelectTrigger id="acordo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em negociação">Em negociação</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contrato">Contrato</Label>
              <Select value={contrato} onValueChange={(v: any) => setContrato(v)}>
                <SelectTrigger id="contrato">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Assinatura pendente">Assinatura pendente</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="aditivo">Aditivo</Label>
              <Select value={aditivo} onValueChange={(v: any) => setAditivo(v)}>
                <SelectTrigger id="aditivo">
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
              <Label htmlFor="distrato">Distrato</Label>
              <Select value={distrato} onValueChange={(v: any) => setDistrato(v)}>
                <SelectTrigger id="distrato">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle>Dados de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco">Banco</Label>
              <Input
                id="banco"
                placeholder="Nome do banco"
                value={banco}
                onChange={(e) => setBanco(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="agencia">Agência</Label>
              <Input
                id="agencia"
                placeholder="0000-0"
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="conta">Conta</Label>
              <Input
                id="conta"
                placeholder="00000-0"
                value={conta}
                onChange={(e) => setConta(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tipoConta">Tipo de Conta</Label>
              <Select value={tipoConta} onValueChange={setTipoConta}>
                <SelectTrigger id="tipoConta">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                  <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
                  <SelectItem value="Conta Salário">Conta Salário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="chavePix">Chave PIX (opcional)</Label>
            <Input
              id="chavePix"
              placeholder="CPF, CNPJ, E-mail, Telefone ou Chave aleatória"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="pagamentoAtreladoEntrega"
              checked={pagamentoAtreladoEntrega}
              onCheckedChange={setPagamentoAtreladoEntrega}
            />
            <Label htmlFor="pagamentoAtreladoEntrega" className="cursor-pointer">
              Último pagamento atrelado à entrega
            </Label>
          </div>
          {pagamentoAtreladoEntrega && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Atenção:</strong> O último pagamento está atrelado à entrega do serviço. Confira se todas as entregas foram realizadas antes de aprovar o pagamento final.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Documentos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documentos Anexados</CardTitle>
            <Button onClick={handleUploadDocumento} variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Documento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documentos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhum documento anexado</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documentos.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{doc.tipo}</p>
                      <p className="text-sm text-muted-foreground">{doc.nome} • {doc.dataUpload}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoverDocumento(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onVoltar}>
          Cancelar
        </Button>
        <Button onClick={handleSalvar} className="bg-primary">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
