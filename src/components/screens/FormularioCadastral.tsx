"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { 
  Upload, 
  Save, 
  FileText, 
  Building2, 
  User, 
  AlertCircle,
  CheckCircle2,
  Plus,
  X
} from "lucide-react";
import { toast } from "sonner";

interface FuncionarioAlocado {
  nome: string;
  funcao: string;
}

export default function FormularioCadastral() {
  // Estado principal
  const [categoria, setCategoria] = useState<"Equipe" | "Fornecedor">("Equipe");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Dados de Produção e Alocação
  const [projeto, setProjeto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeCreditos, setNomeCreditos] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dtr, setDtr] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");
  
  // Dados da Empresa (PJ)
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [enderecoFiscal, setEnderecoFiscal] = useState("");
  const [bancoPJ, setBancoPJ] = useState("");
  const [agenciaPJ, setAgenciaPJ] = useState("");
  const [contaPJ, setContaPJ] = useState("");
  const [pixPJ, setPixPJ] = useState("");
  
  // Lista de funcionários (só Fornecedor)
  const [funcionarios, setFuncionarios] = useState<FuncionarioAlocado[]>([]);
  const [novoFuncNome, setNovoFuncNome] = useState("");
  const [novoFuncFuncao, setNovoFuncFuncao] = useState("");
  
  // Dados Pessoais (PF - só Equipe)
  const [nomePF, setNomePF] = useState("");
  const [enderecoResidencial, setEnderecoResidencial] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [pisNit, setPisNit] = useState("");
  const [bancoPF, setBancoPF] = useState("");
  const [agenciaPF, setAgenciaPF] = useState("");
  const [contaPF, setContaPF] = useState("");
  const [pixPF, setPixPF] = useState("");
  
  // Dados do Representante Legal (só Fornecedor)
  const [nomeRepresentante, setNomeRepresentante] = useState("");
  const [cpfRepresentante, setCpfRepresentante] = useState("");
  const [emailRepresentante, setEmailRepresentante] = useState("");
  
  // Informações Pessoais (só Equipe)
  const [temAlergiaMedicamento, setTemAlergiaMedicamento] = useState(false);
  const [alergiaMedicamento, setAlergiaMedicamento] = useState("");
  const [temAlergiaAlimentar, setTemAlergiaAlimentar] = useState(false);
  const [alergiaAlimentar, setAlergiaAlimentar] = useState("");
  const [veganVegetariano, setVeganVegetariano] = useState<"Sim" | "Não">("Não");
  const [contatoEmergencia, setContatoEmergencia] = useState("");
  
  // Documentos
  const [docCartaoCNPJ, setDocCartaoCNPJ] = useState<File | null>(null);
  const [docPisNit, setDocPisNit] = useState<File | null>(null);
  const [docRG, setDocRG] = useState<File | null>(null);

  const departamentos = [
    "Direção",
    "Roteiro / Conteúdo",
    "Elenco / Casting",
    "Arte",
    "Produção de Arte",
    "Produção de Objetos",
    "Figurino",
    "Maquiagem / Caracterização",
    "Fotografia",
    "Câmera",
    "Elétrica",
    "Maquinaria",
    "Som",
    "Produção Executiva",
    "Produção",
    "Controladoria",
    "Pós-produção",
    "Outros",
  ];

  const projetos = [
    { id: "1", codigo: "MOV-2024-001", nome: "Documentário Amazônia" },
    { id: "2", codigo: "MOV-2024-002", nome: "Série Drama S01" },
    { id: "3", codigo: "MOV-2024-003", nome: "Filme Ficção Científica" },
  ];

  const handleAdicionarFuncionario = () => {
    if (!novoFuncNome || !novoFuncFuncao) {
      toast.error("Preencha nome e função do funcionário");
      return;
    }
    
    setFuncionarios([...funcionarios, { nome: novoFuncNome, funcao: novoFuncFuncao }]);
    setNovoFuncNome("");
    setNovoFuncFuncao("");
    toast.success("Funcionário adicionado à lista");
  };

  const handleRemoverFuncionario = (index: number) => {
    setFuncionarios(funcionarios.filter((_, i) => i !== index));
    toast.success("Funcionário removido");
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
      toast.success(`Arquivo "${file.name}" carregado`);
    }
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!projeto || !email || !telefone || !nomeCreditos) {
      toast.error("Preencha todos os campos obrigatórios de Produção");
      return;
    }

    if (categoria === "Equipe" && !departamento) {
      toast.error("Selecione o departamento");
      return;
    }

    if (!razaoSocial || !cnpj || !enderecoFiscal) {
      toast.error("Preencha todos os dados da empresa");
      return;
    }

    if (categoria === "Fornecedor" && !nomeRepresentante) {
      toast.error("Preencha os dados do representante legal");
      return;
    }

    if (categoria === "Equipe" && (!nomePF || !cpf || !rg)) {
      toast.error("Preencha os dados pessoais obrigatórios");
      return;
    }

    // Simular envio
    toast.success("Cadastro realizado com sucesso!");
    console.log("Dados enviados:", {
      categoria,
      producao: { projeto, email, telefone, nomeCreditos, nomeSocial, dtr, departamento, funcao },
      empresa: { razaoSocial, cnpj, enderecoFiscal, bancoPJ, agenciaPJ, contaPJ, pixPJ },
      funcionarios: categoria === "Fornecedor" ? funcionarios : undefined,
      pessoal: categoria === "Equipe" ? { nomePF, enderecoResidencial, rg, cpf, dataNascimento, pisNit, bancoPF, agenciaPF, contaPF, pixPF } : undefined,
      representante: categoria === "Fornecedor" ? { nomeRepresentante, cpfRepresentante, emailRepresentante } : undefined,
      informacoes: categoria === "Equipe" ? { temAlergiaMedicamento, alergiaMedicamento, temAlergiaAlimentar, alergiaAlimentar, veganVegetariano, contatoEmergencia } : undefined,
      documentos: { docCartaoCNPJ, docPisNit, docRG },
    });
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!projeto || !email || !telefone || !nomeCreditos) {
        toast.error("Preencha todos os campos obrigatórios");
        return false;
      }
      if (categoria === "Equipe" && !departamento) {
        toast.error("Selecione o departamento");
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!razaoSocial || !cnpj || !enderecoFiscal) {
        toast.error("Preencha todos os dados da empresa");
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    setStep((step - 1) as 1 | 2 | 3 | 4);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-primary">Formulário Cadastral Único</h1>
        <p className="text-muted-foreground mt-2">
          Eliminando o retrabalho de múltiplos Google Forms - Registro único para contratação, pagamento e conformidade legal (LGPD e Ancine)
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Tipo e Produção" },
              { num: 2, label: "Dados da Empresa" },
              { num: 3, label: categoria === "Fornecedor" ? "Funcionários/Representante" : "Dados Pessoais" },
              { num: 4, label: "Documentos" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.num
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </div>
                  <p className="text-xs mt-2 text-center">{s.label}</p>
                </div>
                {idx < 3 && (
                  <div
                    className={`h-[2px] flex-1 ${
                      step > s.num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* STEP 1: Tipo e Dados de Produção */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Tipo de Colaborador e Dados de Produção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categoria */}
            <div>
              <Label className="text-base font-semibold">Você é: <span className="text-destructive">*</span></Label>
              <RadioGroup value={categoria} onValueChange={(v) => setCategoria(v as "Equipe" | "Fornecedor")} className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Equipe" id="equipe" />
                  <Label htmlFor="equipe" className="font-normal cursor-pointer">Equipe (Pessoa Física / RPA)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Fornecedor" id="fornecedor" />
                  <Label htmlFor="fornecedor" className="font-normal cursor-pointer">Fornecedor (Pessoa Jurídica)</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">
                {categoria === "Equipe" 
                  ? "Colaborador individual (contratação PF ou RPA) - aparecerá nos créditos e terá seguro de produção" 
                  : "Empresa fornecedora de serviços (contratação PJ) - enviaremos o contrato para o representante legal"}
              </p>
            </div>

            <Separator />

            {/* Dados de Produção */}
            <div className="space-y-4">
              <h3 className="font-semibold">1. Dados de Produção e Alocação</h3>
              <p className="text-sm text-muted-foreground">
                Define o papel criativo/operacional e é crucial para a Delegação de Orçamento e relatórios de produção
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Projeto <span className="text-destructive">*</span></Label>
                  <Select value={projeto} onValueChange={setProjeto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projetos.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.codigo} - {p.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>E-mail <span className="text-destructive">*</span></Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div>
                  <Label>Telefone <span className="text-destructive">*</span></Label>
                  <Input
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label>Nome para os créditos <span className="text-destructive">*</span></Label>
                  <Input
                    value={nomeCreditos}
                    onChange={(e) => setNomeCreditos(e.target.value)}
                    placeholder="Como aparecerá nos créditos"
                  />
                </div>

                <div>
                  <Label>Nome social</Label>
                  <Input
                    value={nomeSocial}
                    onChange={(e) => setNomeSocial(e.target.value)}
                    placeholder="Se não tiver, deixe em branco"
                  />
                </div>

                <div>
                  <Label>DTR</Label>
                  <Input
                    value={dtr}
                    onChange={(e) => setDtr(e.target.value)}
                    placeholder="Se não tiver, deixe em branco"
                  />
                </div>

                {categoria === "Equipe" && (
                  <>
                    <div>
                      <Label>Departamento <span className="text-destructive">*</span></Label>
                      <Select value={departamento} onValueChange={setDepartamento}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {departamentos.map((dep) => (
                            <SelectItem key={dep} value={dep}>
                              {dep}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Função</Label>
                      <Input
                        value={funcao}
                        onChange={(e) => setFuncao(e.target.value)}
                        placeholder="Ex: Chefe de Roteiro, DIT, etc."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Define a qual Item Orçamentário a contratação será amarrada
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Dados da Empresa (PJ) */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Dados da Empresa (Pessoa Jurídica)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Informação Crítica</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Estes dados garantem a conformidade fiscal e a correta alocação de Contas a Pagar no OMIE. 
                    Permite verificar CNAE, validade de NF e evitar glosas em auditorias do Tribunal de Contas.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Razão Social <span className="text-destructive">*</span></Label>
                  <Input
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                    placeholder="Razão social completa da empresa"
                  />
                </div>

                <div>
                  <Label>CNPJ <span className="text-destructive">*</span></Label>
                  <Input
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Endereço Fiscal <span className="text-destructive">*</span></Label>
                  <Input
                    value={enderecoFiscal}
                    onChange={(e) => setEnderecoFiscal(e.target.value)}
                    placeholder="O mesmo endereço que consta do cartão CNPJ"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Deve ser idêntico ao que consta no Cartão CNPJ da Receita Federal
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Dados Bancários (PJ)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Banco</Label>
                    <Input
                      value={bancoPJ}
                      onChange={(e) => setBancoPJ(e.target.value)}
                      placeholder="Nome ou código do banco"
                    />
                  </div>

                  <div>
                    <Label>Agência</Label>
                    <Input
                      value={agenciaPJ}
                      onChange={(e) => setAgenciaPJ(e.target.value)}
                      placeholder="0000"
                    />
                  </div>

                  <div>
                    <Label>Conta</Label>
                    <Input
                      value={contaPJ}
                      onChange={(e) => setContaPJ(e.target.value)}
                      placeholder="00000-0"
                    />
                  </div>

                  <div>
                    <Label>PIX</Label>
                    <Input
                      value={pixPJ}
                      onChange={(e) => setPixPJ(e.target.value)}
                      placeholder="Chave PIX (CNPJ, e-mail, telefone ou aleatória)"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Necessário para o Financeiro liquidar o pagamento no OMIE
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3A: Lista de Funcionários + Representante Legal (FORNECEDOR) */}
      {step === 3 && categoria === "Fornecedor" && (
        <Card>
          <CardHeader>
            <CardTitle>Funcionários Alocados e Representante Legal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lista de Funcionários */}
            <div>
              <h3 className="font-semibold mb-2">Lista de Funcionários Alocados no Projeto</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Informação necessária para os créditos finais e para o seguro de produção
              </p>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do funcionário"
                    value={novoFuncNome}
                    onChange={(e) => setNovoFuncNome(e.target.value)}
                  />
                  <Input
                    placeholder="Função"
                    value={novoFuncFuncao}
                    onChange={(e) => setNovoFuncFuncao(e.target.value)}
                  />
                  <Button onClick={handleAdicionarFuncionario}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {funcionarios.length > 0 && (
                  <div className="border rounded-lg p-4 space-y-2">
                    {funcionarios.map((func, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                        <div>
                          <p className="font-medium">{func.nome}</p>
                          <p className="text-sm text-muted-foreground">{func.funcao}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoverFuncionario(idx)}
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Representante Legal */}
            <div>
              <h3 className="font-semibold mb-2">Dados do Representante Legal da Empresa</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Informação exigida para emissão e assinatura do contrato (o e-mail é o canal para envio do documento legal)
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Nome <span className="text-destructive">*</span></Label>
                  <Input
                    value={nomeRepresentante}
                    onChange={(e) => setNomeRepresentante(e.target.value)}
                    placeholder="Nome completo do representante legal"
                  />
                </div>

                <div>
                  <Label>CPF <span className="text-destructive">*</span></Label>
                  <Input
                    value={cpfRepresentante}
                    onChange={(e) => setCpfRepresentante(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <Label>E-mail <span className="text-destructive">*</span></Label>
                  <Input
                    type="email"
                    value={emailRepresentante}
                    onChange={(e) => setEmailRepresentante(e.target.value)}
                    placeholder="O contrato será enviado para este e-mail"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3B: Dados Pessoais + Informações Pessoais (EQUIPE) */}
      {step === 3 && categoria === "Equipe" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Dados Pessoais e Informações de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Segurança Jurídica e Física</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Obrigatório para formalizar RPA, conformidade com folha de pagamento, seguro de produção e segurança no set
                  </p>
                </div>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="font-semibold">Dados Pessoais</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Nome Completo <span className="text-destructive">*</span></Label>
                  <Input
                    value={nomePF}
                    onChange={(e) => setNomePF(e.target.value)}
                    placeholder="Nome civil completo"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Endereço Residencial <span className="text-destructive">*</span></Label>
                  <Input
                    value={enderecoResidencial}
                    onChange={(e) => setEnderecoResidencial(e.target.value)}
                    placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                  />
                </div>

                <div>
                  <Label>RG <span className="text-destructive">*</span></Label>
                  <Input
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    placeholder="00.000.000-0"
                  />
                </div>

                <div>
                  <Label>CPF <span className="text-destructive">*</span></Label>
                  <Input
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <Label>Data de Nascimento <span className="text-destructive">*</span></Label>
                  <Input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </div>

                <div>
                  <Label>PIS ou NIT</Label>
                  <Input
                    value={pisNit}
                    onChange={(e) => setPisNit(e.target.value)}
                    placeholder="Caso a contratação seja RPA, se não, deixe em branco"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Dados Bancários PF */}
            <div>
              <h3 className="font-semibold mb-4">Dados Bancários (Pessoa Física)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Banco</Label>
                  <Input
                    value={bancoPF}
                    onChange={(e) => setBancoPF(e.target.value)}
                    placeholder="Nome ou código do banco"
                  />
                </div>

                <div>
                  <Label>Agência</Label>
                  <Input
                    value={agenciaPF}
                    onChange={(e) => setAgenciaPF(e.target.value)}
                    placeholder="0000"
                  />
                </div>

                <div>
                  <Label>Conta</Label>
                  <Input
                    value={contaPF}
                    onChange={(e) => setContaPF(e.target.value)}
                    placeholder="00000-0"
                  />
                </div>

                <div>
                  <Label>PIX</Label>
                  <Input
                    value={pixPF}
                    onChange={(e) => setPixPF(e.target.value)}
                    placeholder="Chave PIX"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="font-semibold">Informações Pessoais (Segurança no Set)</h3>
              <p className="text-sm text-muted-foreground">
                Crucial para segurança e logística de produção (alimentação, emergência médica)
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      id="alergiaMed"
                      checked={temAlergiaMedicamento}
                      onChange={(e) => setTemAlergiaMedicamento(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="alergiaMed" className="font-normal cursor-pointer">
                      Possui alergia a algum medicamento?
                    </Label>
                  </div>
                  {temAlergiaMedicamento && (
                    <Textarea
                      value={alergiaMedicamento}
                      onChange={(e) => setAlergiaMedicamento(e.target.value)}
                      placeholder="Descreva as alergias medicamentosas"
                      rows={2}
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      id="alergiaAlim"
                      checked={temAlergiaAlimentar}
                      onChange={(e) => setTemAlergiaAlimentar(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="alergiaAlim" className="font-normal cursor-pointer">
                      Possui alguma alergia ou restrição alimentar?
                    </Label>
                  </div>
                  {temAlergiaAlimentar && (
                    <Textarea
                      value={alergiaAlimentar}
                      onChange={(e) => setAlergiaAlimentar(e.target.value)}
                      placeholder="Descreva as alergias ou restrições alimentares"
                      rows={2}
                    />
                  )}
                </div>

                <div>
                  <Label>É vegano(a) ou vegetariano(a)?</Label>
                  <RadioGroup value={veganVegetariano} onValueChange={(v) => setVeganVegetariano(v as "Sim" | "Não")} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sim" id="vegan-sim" />
                      <Label htmlFor="vegan-sim" className="font-normal cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Não" id="vegan-nao" />
                      <Label htmlFor="vegan-nao" className="font-normal cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Contato de Emergência <span className="text-destructive">*</span></Label>
                  <Textarea
                    value={contatoEmergencia}
                    onChange={(e) => setContatoEmergencia(e.target.value)}
                    placeholder="Informe nome, contato e parentesco/relacionamento (Ex: Maria Silva - (11) 98888-8888 - Mãe)"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: Documentos */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Documentos Anexados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Anexe os documentos digitalizados necessários para validação e conformidade legal
            </p>

            <div className="space-y-4">
              {/* Cartão CNPJ - TODOS */}
              <div className="border rounded-lg p-4">
                <Label className="text-base font-semibold">Cartão CNPJ <span className="text-destructive">*</span></Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Documento oficial da Receita Federal com endereço fiscal e CNAE
                </p>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, setDocCartaoCNPJ)}
                    className="flex-1"
                  />
                  {docCartaoCNPJ && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {docCartaoCNPJ.name}
                    </Badge>
                  )}
                </div>
              </div>

              {/* PIS/NIT - SÓ EQUIPE */}
              {categoria === "Equipe" && (
                <div className="border rounded-lg p-4">
                  <Label className="text-base font-semibold">PIS ou NIT</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Caso a contratação seja RPA, se não, deixe em branco
                  </p>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, setDocPisNit)}
                      className="flex-1"
                    />
                    {docPisNit && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {docPisNit.name}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* RG - SÓ EQUIPE */}
              {categoria === "Equipe" && (
                <div className="border rounded-lg p-4">
                  <Label className="text-base font-semibold">RG <span className="text-destructive">*</span></Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Documento de identidade (frente e verso)
                  </p>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, setDocRG)}
                      className="flex-1"
                    />
                    {docRG && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {docRG.name}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm">
                <strong>Formatos aceitos:</strong> PDF, JPG, JPEG, PNG (máx. 10MB por arquivo)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Voltar
            </Button>

            {step < 4 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Finalizar Cadastro
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}