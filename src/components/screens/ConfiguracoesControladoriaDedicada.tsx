/**
 * MOVIOCA - Configurações CD (Controladoria Dedicada)
 * 
 * Tela de configurações para Controladoria Dedicada.
 * 
 * Diferenças em relação à visão Admin:
 * - Remove aba "Permissões" (exclusivo Admin)
 * - Mantém: Meu Perfil, Preferências e Notificações
 * - Preferências são apenas pessoais (não afetam sistema global)
 * 
 * PRD 006 - Configurações do Perfil CD
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

export default function ConfiguracoesControladoriaDedicada() {
  const { currentUser } = useAuth();

  // Dados do Perfil
  const [nome, setNome] = useState(currentUser?.name || "Carlos Mendes");
  const [email, setEmail] = useState("carlos.mendes@movioca.com");
  const [telefone, setTelefone] = useState("(11) 97654-3210");
  const [cargo, setCargo] = useState("Controladoria Dedicada");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // Preferências Pessoais
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(true);
  const [alertaNFsPendentes, setAlertaNFsPendentes] = useState(true);
  const [alertaLotesVerba, setAlertaLotesVerba] = useState(true);
  const [alertaDevolucoes, setAlertaDevolucoes] = useState(true);

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
                    <h3 className="font-medium">{nome}</h3>
                    <p className="text-sm text-muted-foreground">{cargo}</p>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">
                      Nome Completo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      E-mail <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" value={cargo} disabled />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleSalvarPerfil} className="bg-primary">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alteração de Senha */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Alterar Senha</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input
                      id="senha-atual"
                      type="password"
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input
                      id="nova-senha"
                      type="password"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmar-senha">
                      Confirmar Nova Senha
                    </Label>
                    <Input
                      id="confirmar-senha"
                      type="password"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleAlterarSenha} className="bg-primary">
                    Alterar Senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferências */}
        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Preferências de Exibição</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="moeda">Moeda Padrão</Label>
                      <Select value={moeda} onValueChange={setMoeda}>
                        <SelectTrigger id="moeda">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRL">Real (BRL)</SelectItem>
                          <SelectItem value="USD">Dólar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="formato-data">Formato de Data</Label>
                      <Select
                        value={formatoData}
                        onValueChange={setFormatoData}
                      >
                        <SelectTrigger id="formato-data">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/MM/yyyy">DD/MM/AAAA</SelectItem>
                          <SelectItem value="MM/dd/yyyy">MM/DD/AAAA</SelectItem>
                          <SelectItem value="yyyy-MM-dd">AAAA-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="casas-decimais">Casas Decimais</Label>
                      <Select
                        value={casasDecimais}
                        onValueChange={setCasasDecimais}
                      >
                        <SelectTrigger id="casas-decimais">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 casas</SelectItem>
                          <SelectItem value="2">2 casas</SelectItem>
                          <SelectItem value="3">3 casas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleSalvarParametros}
                    className="bg-primary"
                  >
                    Salvar Preferências
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
                  <h3 className="font-medium mb-4">Canais de Notificação</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificações por E-mail</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba alertas importantes por e-mail
                        </p>
                      </div>
                      <Switch
                        checked={notifEmail}
                        onCheckedChange={setNotifEmail}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações no navegador
                        </p>
                      </div>
                      <Switch
                        checked={notifPush}
                        onCheckedChange={setNotifPush}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Alertas Específicos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Resumo Diário</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo das atividades do dia
                        </p>
                      </div>
                      <Switch
                        checked={resumoDiario}
                        onCheckedChange={setResumoDiario}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>NFs Pendentes</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertas de novas NFs aguardando validação
                        </p>
                      </div>
                      <Switch
                        checked={alertaNFsPendentes}
                        onCheckedChange={setAlertaNFsPendentes}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Lotes de Verba</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertas de novos lotes para conferência
                        </p>
                      </div>
                      <Switch
                        checked={alertaLotesVerba}
                        onCheckedChange={setAlertaLotesVerba}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Devoluções pela CI</Label>
                        <p className="text-sm text-muted-foreground">
                          Alertas de pagamentos devolvidos pela CI
                        </p>
                      </div>
                      <Switch
                        checked={alertaDevolucoes}
                        onCheckedChange={setAlertaDevolucoes}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleSalvarNotificacoes}
                    className="bg-primary"
                  >
                    Salvar Notificações
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
