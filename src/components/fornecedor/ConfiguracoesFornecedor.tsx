/**
 * MOVIOCA - Configurações Fornecedor
 * 
 * Tela de configurações para o perfil Fornecedor PJ.
 * 
 * Abas:
 * - Meu Perfil: Dados pessoais de acesso (nome de usuário, email, senha)
 * - Dados da Empresa: Formulário completo de cadastro PJ (ex-Meus Dados)
 * - Notificações: Preferências de alertas
 * 
 * PRD 008 - Configurações do Perfil Fornecedor
 */

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Camera, User, Upload, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ConfiguracoesFornecedor() {
  const { currentUser } = useAuth();

  // ========================================
  // DADOS DO PERFIL (Acesso ao Sistema)
  // ========================================
  const [nome, setNome] = useState("Empresa ABC");
  const [email, setEmail] = useState("contato@empresaabc.com.br");
  const [telefone, setTelefone] = useState("(11) 3456-7890");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // ========================================
  // DADOS DA EMPRESA (Cadastro PJ)
  // ========================================
  // Dados Básicos
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  // Dados Bancários
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [contaCorrente, setContaCorrente] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [pagamentoAgendado] = useState(true); // Simular bloqueio

  // Documentos
  const [cartaoCnpj, setCartaoCnpj] = useState<File | null>(null);
  const [comprovanteBancario, setComprovanteBancario] = useState<File | null>(null);

  // ========================================
  // NOTIFICAÇÕES
  // ========================================
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [alertaPagamentos, setAlertaPagamentos] = useState(true);
  const [alertaNotasPendentes, setAlertaNotasPendentes] = useState(true);
  const [alertaNotasReprovadas, setAlertaNotasReprovadas] = useState(true);
  const [alertaContratosNovos, setAlertaContratosNovos] = useState(true);
  const [resumoDiario, setResumoDiario] = useState(true);

  // ========================================
  // HANDLERS
  // ========================================
  const handleSalvarPerfil = () => {
    if (!nome || !email) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleAlterarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }
    if (novaSenha.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    toast.success("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
        toast.success("Foto de perfil atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  const aplicarMascaraCnpj = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 14) {
      return numeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return valor;
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = aplicarMascaraCnpj(e.target.value);
    setCnpj(valorFormatado);
  };

  const handleBuscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      toast.error("CEP inválido");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setLogradouro(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setUf(data.uf);
      toast.success("Endereço encontrado!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    }
  };

  const handleUploadDocumento = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "cnpj" | "bancario"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF são permitidos");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo: 5MB");
      return;
    }

    if (tipo === "cnpj") {
      setCartaoCnpj(file);
      toast.success("Cartão CNPJ anexado com sucesso!");
    } else {
      setComprovanteBancario(file);
      toast.success("Comprovante bancário anexado com sucesso!");
    }
  };

  const handleRemoverDocumento = (tipo: "cnpj" | "bancario") => {
    if (tipo === "cnpj") {
      setCartaoCnpj(null);
      toast.info("Cartão CNPJ removido");
    } else {
      setComprovanteBancario(null);
      toast.info("Comprovante bancário removido");
    }
  };

  const handleSalvarDadosEmpresa = () => {
    // Validar campos obrigatórios
    if (!cnpj || !razaoSocial || !cep || !logradouro || !numero || !bairro || !cidade || !uf) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (!banco || !agencia || !contaCorrente) {
      toast.error("Complete os dados bancários");
      return;
    }

    if (!cartaoCnpj || !comprovanteBancario) {
      toast.error("Anexe todos os documentos obrigatórios");
      return;
    }

    toast.success("Dados da empresa salvos com sucesso!");
  };

  const handleSalvarNotificacoes = () => {
    toast.success("Configurações de notificações salvas");
  };

  // Cálculo do progresso do cadastro
  const calcularProgresso = () => {
    const campos = [
      cnpj, razaoSocial, cep, logradouro, numero, bairro, cidade, uf,
      banco, agencia, contaCorrente, cartaoCnpj, comprovanteBancario
    ];
    const preenchidos = campos.filter(c => c).length;
    return Math.round((preenchidos / campos.length) * 100);
  };

  const progresso = calcularProgresso();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações cadastrais e preferências
        </p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          <TabsTrigger value="empresa">Dados da Empresa</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        {/* ========================================
            ABA 1: MEU PERFIL (Dados de Acesso)
        ======================================== */}
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Foto de perfil */}
                <div className="flex items-center gap-6 pb-6 border-b">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {fotoPerfil ? (
                        <AvatarImage src={fotoPerfil} alt={nome} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <input
                        type="file"
                        id="foto-perfil"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadFoto}
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-8 w-8"
                        onClick={() => document.getElementById("foto-perfil")?.click()}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg">{nome}</h3>
                    <p className="text-sm text-muted-foreground">Fornecedor</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clique no ícone para alterar a foto
                    </p>
                  </div>
                </div>

                {/* Dados básicos */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome de Usuário *</Label>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome de usuário"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(11) 3456-7890"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancelar</Button>
                    <Button onClick={handleSalvarPerfil}>Salvar Alterações</Button>
                  </div>
                </div>

                {/* Alterar senha */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg">Alterar Senha</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input
                        id="senha-atual"
                        type="password"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                        placeholder="Digite sua senha atual"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nova-senha">Nova Senha</Label>
                        <Input
                          id="nova-senha"
                          type="password"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                          placeholder="Mínimo 8 caracteres"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                        <Input
                          id="confirmar-senha"
                          type="password"
                          value={confirmarSenha}
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          placeholder="Digite novamente"
                        />
                      </div>
                    </div>

                    <Button onClick={handleAlterarSenha} variant="secondary">
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================
            ABA 2: DADOS DA EMPRESA (Ex-Meus Dados)
        ======================================== */}
        <TabsContent value="empresa" className="space-y-4">
          {/* Barra de Progresso */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg">Progresso do Cadastro</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete todos os campos para habilitar o cadastro
                    </p>
                  </div>
                  <Badge variant={progresso === 100 ? "default" : "secondary"}>
                    {progresso}%
                  </Badge>
                </div>
                <Progress value={progresso} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Dados Básicos */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg mb-4">Dados Básicos</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={cnpj}
                      onChange={handleCnpjChange}
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razao-social">Razão Social *</Label>
                    <Input
                      id="razao-social"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      placeholder="Razão social da empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input
                      id="nome-fantasia"
                      value={nomeFantasia}
                      onChange={(e) => setNomeFantasia(e.target.value)}
                      placeholder="Nome fantasia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      value={inscricaoEstadual}
                      onChange={(e) => setInscricaoEstadual(e.target.value)}
                      placeholder="000.000.000.000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="im">Inscrição Municipal</Label>
                    <Input
                      id="im"
                      value={inscricaoMunicipal}
                      onChange={(e) => setInscricaoMunicipal(e.target.value)}
                      placeholder="000000-0"
                    />
                  </div>
                  <div></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg mb-4">Endereço</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleBuscarCep} variant="secondary" className="w-full">
                      Buscar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor="logradouro">Logradouro *</Label>
                    <Input
                      id="logradouro"
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                      placeholder="Rua, Avenida..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    placeholder="Apto, Sala, Bloco..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      placeholder="Bairro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uf">UF *</Label>
                    <Select value={uf} onValueChange={setUf}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="ES">ES</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Bancários */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg mb-4">Dados Bancários</h3>
              
              {pagamentoAgendado && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Alteração de Dados Bancários Bloqueada</AlertTitle>
                  <AlertDescription>
                    Você possui pagamentos agendados. Não é possível alterar dados bancários enquanto houver pagamentos pendentes.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="banco">Banco *</Label>
                    <Select value={banco} onValueChange={setBanco} disabled={pagamentoAgendado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="001">001 - Banco do Brasil</SelectItem>
                        <SelectItem value="237">237 - Bradesco</SelectItem>
                        <SelectItem value="104">104 - Caixa Econômica</SelectItem>
                        <SelectItem value="033">033 - Santander</SelectItem>
                        <SelectItem value="341">341 - Itaú</SelectItem>
                        <SelectItem value="260">260 - Nubank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencia">Agência *</Label>
                    <Input
                      id="agencia"
                      value={agencia}
                      onChange={(e) => setAgencia(e.target.value)}
                      placeholder="0000"
                      disabled={pagamentoAgendado}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conta">Conta Corrente *</Label>
                    <Input
                      id="conta"
                      value={contaCorrente}
                      onChange={(e) => setContaCorrente(e.target.value)}
                      placeholder="00000-0"
                      disabled={pagamentoAgendado}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pix">Chave PIX</Label>
                    <Input
                      id="pix"
                      value={chavePix}
                      onChange={(e) => setChavePix(e.target.value)}
                      placeholder="email@exemplo.com ou CNPJ"
                      disabled={pagamentoAgendado}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos Obrigatórios */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg mb-4">Documentos Obrigatórios</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Cartão CNPJ */}
                  <div className="space-y-2">
                    <Label>Cartão CNPJ *</Label>
                    <div className="border-2 border-dashed rounded-lg p-6">
                      {cartaoCnpj ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                              <Upload className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm">{cartaoCnpj.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(cartaoCnpj.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoverDocumento("cnpj")}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Arraste o arquivo ou clique para fazer upload
                          </p>
                          <input
                            type="file"
                            id="cartao-cnpj"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleUploadDocumento(e, "cnpj")}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("cartao-cnpj")?.click()}
                          >
                            Selecionar Arquivo
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            PDF, máximo 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comprovante Bancário */}
                  <div className="space-y-2">
                    <Label>Comprovante Bancário *</Label>
                    <div className="border-2 border-dashed rounded-lg p-6">
                      {comprovanteBancario ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                              <Upload className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm">{comprovanteBancario.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(comprovanteBancario.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoverDocumento("bancario")}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Arraste o arquivo ou clique para fazer upload
                          </p>
                          <input
                            type="file"
                            id="comprovante-bancario"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleUploadDocumento(e, "bancario")}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("comprovante-bancario")?.click()}
                          >
                            Selecionar Arquivo
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            PDF, máximo 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button 
                  onClick={handleSalvarDadosEmpresa}
                  disabled={progresso < 100}
                >
                  Salvar Dados da Empresa
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================
            ABA 3: NOTIFICAÇÕES
        ======================================== */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Canais */}
                <div className="space-y-4">
                  <h3 className="text-lg">Canais de Notificação</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notif-email" className="cursor-pointer">
                          Notificações por E-mail
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações no seu e-mail
                        </p>
                      </div>
                      <Switch
                        id="notif-email"
                        checked={notifEmail}
                        onCheckedChange={setNotifEmail}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notif-push" className="cursor-pointer">
                          Notificações Push
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receba alertas em tempo real no navegador
                        </p>
                      </div>
                      <Switch
                        id="notif-push"
                        checked={notifPush}
                        onCheckedChange={setNotifPush}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg mb-4">Alertas Específicos</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerta-pagamentos" className="cursor-pointer">
                          Pagamentos Realizados
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Alerta quando um pagamento for confirmado
                        </p>
                      </div>
                      <Switch
                        id="alerta-pagamentos"
                        checked={alertaPagamentos}
                        onCheckedChange={setAlertaPagamentos}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerta-notas-pendentes" className="cursor-pointer">
                          Notas Fiscais Pendentes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Lembrete de parcelas aguardando envio de nota fiscal
                        </p>
                      </div>
                      <Switch
                        id="alerta-notas-pendentes"
                        checked={alertaNotasPendentes}
                        onCheckedChange={setAlertaNotasPendentes}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerta-notas-reprovadas" className="cursor-pointer">
                          Notas Fiscais Reprovadas
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Alerta quando uma nota fiscal for reprovada
                        </p>
                      </div>
                      <Switch
                        id="alerta-notas-reprovadas"
                        checked={alertaNotasReprovadas}
                        onCheckedChange={setAlertaNotasReprovadas}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alerta-contratos" className="cursor-pointer">
                          Novos Contratos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notificação quando um novo contrato for disponibilizado
                        </p>
                      </div>
                      <Switch
                        id="alerta-contratos"
                        checked={alertaContratosNovos}
                        onCheckedChange={setAlertaContratosNovos}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="resumo-diario" className="cursor-pointer">
                          Resumo Diário
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo diário das suas atividades
                        </p>
                      </div>
                      <Switch
                        id="resumo-diario"
                        checked={resumoDiario}
                        onCheckedChange={setResumoDiario}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={handleSalvarNotificacoes}>
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}