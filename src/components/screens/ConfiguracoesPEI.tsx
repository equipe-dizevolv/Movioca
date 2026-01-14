/**
 * MOVIOCA - Configurações PEI
 * 
 * Tela de configurações para Produção Executiva Interna.
 * 
 * Diferenças em relação à visão Admin:
 * - Remove aba "Permissões" (exclusivo Admin)
 * - Mantém: Meu Perfil, Parâmetros e Notificações
 * - Parâmetros são apenas de preferências pessoais (não afetam sistema global)
 * 
 * PRD 002 - Configurações do Perfil PEI
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
import { Camera, User } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../../contexts/AuthContext";

export default function ConfiguracoesPEI() {
  const { currentUser } = useAuth();

  // Dados do Perfil
  const [nome, setNome] = useState(currentUser?.name || "Pedro Silva");
  const [email, setEmail] = useState("pedro.silva@movioca.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [cargo, setCargo] = useState("Produção Executiva Interna");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // Parâmetros Pessoais
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(true);
  const [alertaDesvioOrcamento, setAlertaDesvioOrcamento] = useState(true);
  const [alertaContingencia, setAlertaContingencia] = useState(true);
  const [alertaPrazos, setAlertaPrazos] = useState(true);

  const handleSalvarParametros = () => {
    toast.success("Preferências salvas com sucesso");
  };

  const handleSalvarNotificacoes = () => {
    toast.success("Configurações de notificações salvas");
  };

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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl text-foreground">Minhas Configurações</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas preferências pessoais e notificações
        </p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          <TabsTrigger value="parametros">Preferências</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        {/* Perfil */}
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
                        onClick={() =>
                          document.getElementById("foto-perfil")?.click()
                        }
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{nome}</h3>
                    <p className="text-sm text-muted-foreground">{cargo}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>

                {/* Dados pessoais */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Dados pessoais</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Nome completo{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        placeholder="(00) 00000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input
                        placeholder="Seu cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarPerfil}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alterar senha */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Alterar senha</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    A senha deve ter pelo menos 8 caracteres
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>
                      Senha atual <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Nova senha <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="Digite a nova senha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>
                        Confirmar nova senha{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSenhaAtual("");
                      setNovaSenha("");
                      setConfirmarSenha("");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleAlterarSenha}
                  >
                    Alterar senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferências Pessoais */}
        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Formato e Exibição</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure como os dados são exibidos para você
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Moeda</Label>
                    <Select value={moeda} onValueChange={setMoeda}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">BRL - Real Brasileiro</SelectItem>
                        <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Formato de data</Label>
                    <Select value={formatoData} onValueChange={setFormatoData}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                        <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Casas decimais</Label>
                  <Select
                    value={casasDecimais}
                    onValueChange={setCasasDecimais}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 casas decimais</SelectItem>
                      <SelectItem value="2">2 casas decimais</SelectItem>
                      <SelectItem value="4">4 casas decimais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarParametros}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Canais de Notificação</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Escolha como deseja receber notificações
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por email
                      </p>
                    </div>
                    <Switch
                      checked={notifEmail}
                      onCheckedChange={setNotifEmail}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações push no navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifPush}
                      onCheckedChange={setNotifPush}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumo diário</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber resumo diário de todos os projetos ativos
                      </p>
                    </div>
                    <Switch
                      checked={resumoDiario}
                      onCheckedChange={setResumoDiario}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-4">Alertas Específicos PEI</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Desvios de orçamento</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar quando (Realizado + Comprometido) &gt; Liberado
                        </p>
                      </div>
                      <Switch
                        checked={alertaDesvioOrcamento}
                        onCheckedChange={setAlertaDesvioOrcamento}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Saldo de contingência baixo</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar quando contingência &lt; 10% do orçamento
                        </p>
                      </div>
                      <Switch
                        checked={alertaContingencia}
                        onCheckedChange={setAlertaContingencia}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Prazos de contrato próximos</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar 7 dias antes do vencimento de contratos
                        </p>
                      </div>
                      <Switch
                        checked={alertaPrazos}
                        onCheckedChange={setAlertaPrazos}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSalvarNotificacoes}
                  >
                    Salvar
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