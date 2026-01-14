import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarIcon, Upload, CheckCircle2, AlertCircle, Users, Building2, ArrowRight, ArrowLeft, Moon, Sun } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner@2.0.3";

interface FuncionarioAlocado {
  id: string;
  nome: string;
  funcao: string;
}

interface FormularioCadastralPublicoProps {
  onBackToLogin?: () => void;
}

export default function FormularioCadastralPublico({ onBackToLogin }: FormularioCadastralPublicoProps) {
  // Estado geral
  const [tipo, setTipo] = useState<"Equipe" | "Fornecedor" | "">("");
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [mostrarSelecaoPerfil, setMostrarSelecaoPerfil] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Dados básicos
  const [projeto, setProjeto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeCreditos, setNomeCreditos] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dtr, setDtr] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");

  // Dados da empresa
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [enderecoFiscal, setEnderecoFiscal] = useState("");
  const [bancoEmpresa, setBancoEmpresa] = useState("");
  const [agenciaEmpresa, setAgenciaEmpresa] = useState("");
  const [contaEmpresa, setContaEmpresa] = useState("");
  const [pixEmpresa, setPixEmpresa] = useState("");

  // Funcionários alocados (só fornecedor)
  const [funcionariosAlocados, setFuncionariosAlocados] = useState<FuncionarioAlocado[]>([]);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: "", funcao: "" });

  // Dados pessoais (só equipe)
  const [nome, setNome] = useState("");
  const [enderecoResidencial, setEnderecoResidencial] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [pisNit, setPisNit] = useState("");
  const [bancoPessoal, setBancoPessoal] = useState("");
  const [agenciaPessoal, setAgenciaPessoal] = useState("");
  const [contaPessoal, setContaPessoal] = useState("");
  const [pixPessoal, setPixPessoal] = useState("");

  // Representante legal (só fornecedor)
  const [nomeRepresentante, setNomeRepresentante] = useState("");
  const [cpfRepresentante, setCpfRepresentante] = useState("");
  const [emailRepresentante, setEmailRepresentante] = useState("");

  // Informações pessoais (só equipe)
  const [temAlergiaMedicamento, setTemAlergiaMedicamento] = useState<"sim" | "nao" | "">("");
  const [alergiaMedicamento, setAlergiaMedicamento] = useState("");
  const [temAlergiaAlimentar, setTemAlergiaAlimentar] = useState<"sim" | "nao" | "">("");
  const [alergiaAlimentar, setAlergiaAlimentar] = useState("");
  const [vegetarianoVegano, setVegetarianoVegano] = useState<"sim" | "nao" | "">("");
  const [contatoEmergencia, setContatoEmergencia] = useState("");

  // Documentos
  const [cartaoCnpj, setCartaoCnpj] = useState<File | null>(null);
  const [docPisNit, setDocPisNit] = useState<File | null>(null);
  const [docRg, setDocRg] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleAdicionarFuncionario = () => {
    if (!novoFuncionario.nome || !novoFuncionario.funcao) {
      toast.error("Preencha nome e função do funcionário");
      return;
    }

    setFuncionariosAlocados([
      ...funcionariosAlocados,
      {
        id: Date.now().toString(),
        nome: novoFuncionario.nome,
        funcao: novoFuncionario.funcao,
      },
    ]);
    setNovoFuncionario({ nome: "", funcao: "" });
    toast.success("Funcionário adicionado");
  };

  const handleRemoverFuncionario = (id: string) => {
    setFuncionariosAlocados(funcionariosAlocados.filter((f) => f.id !== id));
  };

  const validarEtapa1 = () => {
    if (!tipo) {
      toast.error("Selecione se você é Equipe ou Fornecedor");
      return false;
    }
    if (!projeto || !email || !telefone || !nomeCreditos || !funcao) {
      toast.error("Preencha todos os campos obrigatórios");
      return false;
    }
    if (tipo === "Equipe" && !departamento) {
      toast.error("Selecione o departamento");
      return false;
    }
    return true;
  };

  const validarEtapa2 = () => {
    if (!razaoSocial || !cnpj || !enderecoFiscal) {
      toast.error("Preencha todos os dados da empresa");
      return false;
    }
    if (!bancoEmpresa || !agenciaEmpresa || !contaEmpresa) {
      toast.error("Preencha todos os dados bancários da empresa");
      return false;
    }
    return true;
  };

  const validarEtapa3 = () => {
    if (tipo === "Equipe") {
      if (!nome || !enderecoResidencial || !rg || !cpf || !dataNascimento) {
        toast.error("Preencha todos os dados pessoais obrigatórios");
        return false;
      }
      if (!bancoPessoal || !agenciaPessoal || !contaPessoal) {
        toast.error("Preencha todos os dados bancários pessoais");
        return false;
      }
    } else {
      if (!nomeRepresentante || !cpfRepresentante || !emailRepresentante) {
        toast.error("Preencha todos os dados do representante legal");
        return false;
      }
    }
    return true;
  };

  const validarEtapa4 = () => {
    if (tipo === "Equipe") {
      if (!contatoEmergencia) {
        toast.error("Preencha o contato de emergência");
        return false;
      }
    }
    return true;
  };

  const handleProximaEtapa = () => {
    let isValid = false;

    switch (etapaAtual) {
      case 1:
        isValid = validarEtapa1();
        break;
      case 2:
        isValid = validarEtapa2();
        break;
      case 3:
        isValid = validarEtapa3();
        break;
      case 4:
        isValid = validarEtapa4();
        break;
    }

    if (isValid) {
      if (etapaAtual < 5) {
        setEtapaAtual(etapaAtual + 1);
      }
    }
  };

  const handleEtapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Cadastro realizado com sucesso!");
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
        {/* Background with enhanced dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" />

        {/* Dark Mode Toggle - Canto superior direito */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 rounded-full shadow-lg bg-background hover:bg-muted border-2"
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </Button>
        </div>

        <Card className="w-full max-w-2xl relative z-10">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Cadastro realizado com sucesso!</h2>
            <p className="text-muted-foreground mb-8">
              Seu cadastro foi enviado e está em análise. Você receberá um e-mail com as próximas
              instruções em breve.
            </p>
            <Button 
              onClick={() => {
                if (onBackToLogin) {
                  onBackToLogin();
                } else {
                  window.location.hash = "";
                  window.location.reload();
                }
              }}
            >
              Voltar para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de seleção de perfil
  if (mostrarSelecaoPerfil) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
        {/* Background with enhanced dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" />

        {/* Dark Mode Toggle - Canto superior direito */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 rounded-full shadow-lg bg-background hover:bg-muted border-2"
            title={darkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </Button>
        </div>

        {/* Botão Voltar - Canto superior esquerdo */}
        {onBackToLogin && (
          <div className="fixed top-6 left-6 z-50">
            <Button
              variant="outline"
              onClick={onBackToLogin}
              className="shadow-lg bg-background hover:bg-muted border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Login
            </Button>
          </div>
        )}

        <div className="w-full max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary mb-3">MOVIOCA</h1>
            <p className="text-2xl text-muted-foreground mb-2">Formulário Cadastral Único</p>
            <p className="text-lg text-muted-foreground">Selecione seu tipo de perfil para começar</p>
          </div>

          {/* Cards de seleção */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card Equipe */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
              onClick={() => {
                setTipo("Equipe");
                setMostrarSelecaoPerfil(false);
              }}
            >
              <CardContent className="pt-12 pb-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="w-14 h-14 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Equipe</h3>
                <p className="text-muted-foreground mb-8">
                  Para diretores, atores, técnicos e demais membros da equipe de produção contratados como pessoa física ou jurídica.
                </p>
                <div className="flex items-center justify-center text-primary group-hover:gap-3 transition-all">
                  <span className="font-semibold">Começar cadastro</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:ml-0 transition-all" />
                </div>
              </CardContent>
            </Card>

            {/* Card Fornecedor */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary group"
              onClick={() => {
                setTipo("Fornecedor");
                setMostrarSelecaoPerfil(false);
              }}
            >
              <CardContent className="pt-12 pb-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-14 h-14 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Fornecedor</h3>
                <p className="text-muted-foreground mb-8">
                  Para empresas prestadoras de serviço como locadoras, catering, estúdios e outros fornecedores.
                </p>
                <div className="flex items-center justify-center text-primary group-hover:gap-3 transition-all">
                  <span className="font-semibold">Começar cadastro</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:ml-0 transition-all" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Background with enhanced dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" />

      {/* Dark Mode Toggle - Canto superior direito */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 rounded-full shadow-lg bg-background hover:bg-muted border-2"
          title={darkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">MOVIOCA</h1>
          <p className="text-xl text-muted-foreground">Formulário Cadastral Único</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center ${step < 5 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= etapaAtual
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 dark:bg-gray-700 text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step < etapaAtual ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Dados Básicos</span>
            <span>Empresa</span>
            <span>{tipo === "Equipe" ? "Pessoais" : "Representante"}</span>
            <span>Informações</span>
            <span>Documentos</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {etapaAtual === 1 && "Etapa 1: Dados Básicos"}
              {etapaAtual === 2 && "Etapa 2: Dados da Empresa"}
              {etapaAtual === 3 &&
                (tipo === "Equipe" ? "Etapa 3: Dados Pessoais" : "Etapa 3: Representante Legal")}
              {etapaAtual === 4 && "Etapa 4: Informações Adicionais"}
              {etapaAtual === 5 && "Etapa 5: Documentos"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ETAPA 1: Dados Básicos */}
            {etapaAtual === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projeto">
                      Projeto <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="projeto"
                      value={projeto}
                      onChange={(e) => setProjeto(e.target.value)}
                      placeholder="Nome do projeto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      E-mail <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">
                      Telefone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeCreditos">
                      Nome para os créditos <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nomeCreditos"
                      value={nomeCreditos}
                      onChange={(e) => setNomeCreditos(e.target.value)}
                      placeholder="Nome completo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeSocial">Nome social</Label>
                    <Input
                      id="nomeSocial"
                      value={nomeSocial}
                      onChange={(e) => setNomeSocial(e.target.value)}
                      placeholder="Se não tiver, deixe em branco"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dtr">DTR</Label>
                    <Input
                      id="dtr"
                      value={dtr}
                      onChange={(e) => setDtr(e.target.value)}
                      placeholder="Se não tiver, deixe em branco"
                    />
                  </div>
                </div>

                {tipo === "Equipe" && (
                  <div className="space-y-2">
                    <Label htmlFor="departamento">
                      Departamento <span className="text-destructive">*</span>
                    </Label>
                    <Select value={departamento} onValueChange={setDepartamento}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="funcao">
                    Função <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="funcao"
                    value={funcao}
                    onChange={(e) => setFuncao(e.target.value)}
                    placeholder="Ex: Diretor, Editor, Produtor..."
                  />
                </div>
              </>
            )}

            {/* ETAPA 2: Dados da Empresa */}
            {etapaAtual === 2 && (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold">Dados da Empresa</h3>

                  <div className="space-y-2">
                    <Label htmlFor="razaoSocial">
                      Razão Social <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="razaoSocial"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      placeholder="Razão social da empresa"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">
                      CNPJ <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cnpj"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enderecoFiscal">
                      Endereço Fiscal <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="enderecoFiscal"
                      value={enderecoFiscal}
                      onChange={(e) => setEnderecoFiscal(e.target.value)}
                      placeholder="O mesmo endereço que consta do cartão CNPJ"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Dados Bancários da Empresa</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bancoEmpresa">
                        Banco <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="bancoEmpresa"
                        value={bancoEmpresa}
                        onChange={(e) => setBancoEmpresa(e.target.value)}
                        placeholder="Nome do banco"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agenciaEmpresa">
                        Agência <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="agenciaEmpresa"
                        value={agenciaEmpresa}
                        onChange={(e) => setAgenciaEmpresa(e.target.value)}
                        placeholder="0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contaEmpresa">
                        Conta <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contaEmpresa"
                        value={contaEmpresa}
                        onChange={(e) => setContaEmpresa(e.target.value)}
                        placeholder="00000-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pixEmpresa">PIX</Label>
                      <Input
                        id="pixEmpresa"
                        value={pixEmpresa}
                        onChange={(e) => setPixEmpresa(e.target.value)}
                        placeholder="Chave PIX"
                      />
                    </div>
                  </div>
                </div>

                {tipo === "Fornecedor" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Lista de funcionários alocados no projeto</h3>
                    <p className="text-sm text-muted-foreground">
                      Informação para os créditos e seguro
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Nome do funcionário"
                        value={novoFuncionario.nome}
                        onChange={(e) =>
                          setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })
                        }
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Função"
                          value={novoFuncionario.funcao}
                          onChange={(e) =>
                            setNovoFuncionario({ ...novoFuncionario, funcao: e.target.value })
                          }
                        />
                        <Button onClick={handleAdicionarFuncionario} type="button">
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {funcionariosAlocados.length > 0 && (
                      <div className="border rounded-md p-4 space-y-2">
                        {funcionariosAlocados.map((func) => (
                          <div
                            key={func.id}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <div>
                              <p className="font-medium">{func.nome}</p>
                              <p className="text-sm text-muted-foreground">{func.funcao}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoverFuncionario(func.id)}
                            >
                              Remover
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ETAPA 3: Dados Pessoais (Equipe) ou Representante Legal (Fornecedor) */}
            {etapaAtual === 3 && (
              <>
                {tipo === "Equipe" ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Dados Pessoais</h3>

                      <div className="space-y-2">
                        <Label htmlFor="nome">
                          Nome <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Nome completo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enderecoResidencial">
                          Endereço Residencial <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="enderecoResidencial"
                          value={enderecoResidencial}
                          onChange={(e) => setEnderecoResidencial(e.target.value)}
                          placeholder="Endereço completo"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rg">
                            RG <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="rg"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
                            placeholder="00.000.000-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cpf">
                            CPF <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="000.000.000-00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>
                            Data de Nascimento <span className="text-destructive">*</span>
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dataNascimento
                                  ? format(dataNascimento, "PPP", { locale: ptBR })
                                  : "Selecione"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dataNascimento}
                                onSelect={setDataNascimento}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pisNit">PIS ou NIT</Label>
                          <Input
                            id="pisNit"
                            value={pisNit}
                            onChange={(e) => setPisNit(e.target.value)}
                            placeholder="Se RPA, se não, deixe em branco"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Dados Bancários Pessoais</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bancoPessoal">
                            Banco <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="bancoPessoal"
                            value={bancoPessoal}
                            onChange={(e) => setBancoPessoal(e.target.value)}
                            placeholder="Nome do banco"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="agenciaPessoal">
                            Agência <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="agenciaPessoal"
                            value={agenciaPessoal}
                            onChange={(e) => setAgenciaPessoal(e.target.value)}
                            placeholder="0000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contaPessoal">
                            Conta <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="contaPessoal"
                            value={contaPessoal}
                            onChange={(e) => setContaPessoal(e.target.value)}
                            placeholder="00000-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pixPessoal">PIX</Label>
                          <Input
                            id="pixPessoal"
                            value={pixPessoal}
                            onChange={(e) => setPixPessoal(e.target.value)}
                            placeholder="Chave PIX"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Dados do Representante Legal da Empresa</h3>

                      <div className="space-y-2">
                        <Label htmlFor="nomeRepresentante">
                          Nome <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nomeRepresentante"
                          value={nomeRepresentante}
                          onChange={(e) => setNomeRepresentante(e.target.value)}
                          placeholder="Nome completo do representante"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpfRepresentante">
                          CPF <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="cpfRepresentante"
                          value={cpfRepresentante}
                          onChange={(e) => setCpfRepresentante(e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailRepresentante">
                          E-mail <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="emailRepresentante"
                          type="email"
                          value={emailRepresentante}
                          onChange={(e) => setEmailRepresentante(e.target.value)}
                          placeholder="O contrato será enviado para este e-mail"
                        />
                        <p className="text-xs text-muted-foreground">
                          O contrato será enviado para este e-mail
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ETAPA 4: Informações Adicionais */}
            {etapaAtual === 4 && (
              <>
                {tipo === "Equipe" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Informações Pessoais</h3>

                    <div className="space-y-2">
                      <Label>Possui alergia a algum medicamento?</Label>
                      <RadioGroup
                        value={temAlergiaMedicamento}
                        onValueChange={(value: any) => setTemAlergiaMedicamento(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="alergia-med-sim" />
                          <Label htmlFor="alergia-med-sim" className="cursor-pointer">
                            Sim
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="alergia-med-nao" />
                          <Label htmlFor="alergia-med-nao" className="cursor-pointer">
                            Não
                          </Label>
                        </div>
                      </RadioGroup>
                      {temAlergiaMedicamento === "sim" && (
                        <Textarea
                          value={alergiaMedicamento}
                          onChange={(e) => setAlergiaMedicamento(e.target.value)}
                          placeholder="Descreva quais medicamentos..."
                          rows={3}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Possui alguma alergia ou restrição alimentar?</Label>
                      <RadioGroup
                        value={temAlergiaAlimentar}
                        onValueChange={(value: any) => setTemAlergiaAlimentar(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="alergia-alim-sim" />
                          <Label htmlFor="alergia-alim-sim" className="cursor-pointer">
                            Sim
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="alergia-alim-nao" />
                          <Label htmlFor="alergia-alim-nao" className="cursor-pointer">
                            Não
                          </Label>
                        </div>
                      </RadioGroup>
                      {temAlergiaAlimentar === "sim" && (
                        <Textarea
                          value={alergiaAlimentar}
                          onChange={(e) => setAlergiaAlimentar(e.target.value)}
                          placeholder="Descreva quais alergias ou restrições..."
                          rows={3}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>É vegano(a) ou vegetariano(a)?</Label>
                      <RadioGroup
                        value={vegetarianoVegano}
                        onValueChange={(value: any) => setVegetarianoVegano(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sim" id="vegano-sim" />
                          <Label htmlFor="vegano-sim" className="cursor-pointer">
                            Sim
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao" id="vegano-nao" />
                          <Label htmlFor="vegano-nao" className="cursor-pointer">
                            Não
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contatoEmergencia">
                        Contato de Emergência <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="contatoEmergencia"
                        value={contatoEmergencia}
                        onChange={(e) => setContatoEmergencia(e.target.value)}
                        placeholder="Informe nome, contato e parentesco/relacionamento"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {tipo === "Fornecedor" && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhuma informação adicional necessária para fornecedores
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Clique em "Próximo" para ir para os documentos
                    </p>
                  </div>
                )}
              </>
            )}

            {/* ETAPA 5: Documentos */}
            {etapaAtual === 5 && (
              <div className="space-y-6">
                <h3 className="font-semibold">Documentos Anexados</h3>

                <div className="space-y-2">
                  <Label htmlFor="cartaoCnpj">Cartão CNPJ</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input
                      id="cartaoCnpj"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setCartaoCnpj(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="cartaoCnpj" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {cartaoCnpj ? cartaoCnpj.name : "Clique para fazer upload do Cartão CNPJ"}
                      </p>
                    </label>
                  </div>
                </div>

                {tipo === "Equipe" && pisNit && (
                  <div className="space-y-2">
                    <Label htmlFor="docPisNit">PIS ou NIT</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        id="docPisNit"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDocPisNit(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="docPisNit" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {docPisNit ? docPisNit.name : "Clique para fazer upload do PIS/NIT"}
                        </p>
                      </label>
                    </div>
                  </div>
                )}

                {tipo === "Equipe" && (
                  <div className="space-y-2">
                    <Label htmlFor="docRg">RG</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        id="docRg"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDocRg(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="docRg" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {docRg ? docRg.name : "Clique para fazer upload do RG"}
                        </p>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botões de navegação */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleEtapaAnterior}
                disabled={etapaAtual === 1}
              >
                Anterior
              </Button>

              {etapaAtual < 5 ? (
                <Button onClick={handleProximaEtapa}>Próximo</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}