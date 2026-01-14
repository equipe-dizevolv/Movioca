/**
 * MOVIOCA - Configurações Equipe Dedicada
 * 
 * Tela de configurações para Equipe Dedicada (Gestor de Verba).
 * 
 * Diferenças em relação à visão Admin:
 * - Remove aba "Permissões" (exclusivo Admin)
 * - Mantém: Meu Perfil, Preferências e Notificações
 * - Preferências são apenas pessoais (não afetam sistema global)
 * - Foco em notificações relacionadas a cartões, despesas e prestação de contas
 * 
 * PRD 007 - Configurações do Perfil Equipe Dedicada
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

export default function ConfiguracoesEquipeDedicada() {
  const { currentUser } = useAuth();

  // Dados do Perfil
  const [nome, setNome] = useState(currentUser?.name || "Luiza Santos");
  const [email, setEmail] = useState("luiza.santos@movioca.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [cargo, setCargo] = useState("Equipe Dedicada");
  const [departamento, setDepartamento] = useState("Arte");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // Preferências Pessoais
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");

  // Notificações - Específicas para Equipe Dedicada
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true); // Mobile importante para equipe
  const [alertaCargaAprovada, setAlertaCargaAprovada] = useState(true);
  const [alertaSaldoBaixo, setAlertaSaldoBaixo] = useState(true);
  const [alertaLoteRecebido, setAlertaLoteRecebido] = useState(true);
  const [alertaLoteReprovado, setAlertaLoteReprovado] = useState(true);
  const [resumoDespesas, setResumoDespesas] = useState(true);

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
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl text-foreground">Configurações</h2>
        <p className="text-muted-foreground mt-2">
          Gerencie suas preferências pessoais e notificações
        </p>
      </div>

      {/* Tabs de Configuração */}
      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          <TabsTrigger value="preferencias">Preferências</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        {/* Aba: Meu Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Foto de Perfil */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={fotoPerfil} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="upload-foto"
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="upload-foto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadFoto}
                    />
                  </label>
                </div>
                <div>
                  <p className="font-medium">Foto de perfil</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG ou GIF, máximo 5MB
                  </p>
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">
                    Nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
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
                    placeholder="seu.email@movioca.com"
                  />
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <Label htmlFor="cargo">Perfil</Label>
                  <Input
                    id="cargo"
                    value={cargo}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <Label htmlFor="departamento">Departamento</Label>
                  <Input
                    id="departamento"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    placeholder="Ex: Arte, Figurino, Transporte..."
                  />
                </div>
              </div>

              <Button onClick={handleSalvarPerfil} className="bg-primary">
                Salvar alterações
              </Button>
            </CardContent>
          </Card>

          {/* Alterar Senha */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-medium">Alterar senha</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="senhaAtual">Senha atual</Label>
                  <Input
                    id="senhaAtual"
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div>
                  <Label htmlFor="novaSenha">Nova senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Digite a senha novamente"
                  />
                </div>
              </div>

              <Button onClick={handleAlterarSenha} variant="outline">
                Alterar senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Preferências */}
        <TabsContent value="preferencias" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Preferências de Exibição
                </h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="moeda">Moeda padrão</Label>
                    <Select value={moeda} onValueChange={setMoeda}>
                      <SelectTrigger id="moeda">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">BRL (R$)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="formatoData">Formato de data</Label>
                    <Select value={formatoData} onValueChange={setFormatoData}>
                      <SelectTrigger id="formatoData">
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
                    <Label htmlFor="casasDecimais">
                      Casas decimais (valores monetários)
                    </Label>
                    <Select
                      value={casasDecimais}
                      onValueChange={setCasasDecimais}
                    >
                      <SelectTrigger id="casasDecimais">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 casas (R$ 1.234,56)</SelectItem>
                        <SelectItem value="0">
                          0 casas (R$ 1.235)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarParametros} className="bg-primary">
                Salvar preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Canais de notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifEmail">Notificações por e-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas importantes no seu e-mail
                      </p>
                    </div>
                    <Switch
                      id="notifEmail"
                      checked={notifEmail}
                      onCheckedChange={setNotifEmail}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifPush">Notificações push (celular)</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas no seu dispositivo móvel
                      </p>
                    </div>
                    <Switch
                      id="notifPush"
                      checked={notifPush}
                      onCheckedChange={setNotifPush}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  Alertas de Cartões e Despesas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alertaCargaAprovada">
                        Carga aprovada no cartão
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando uma solicitação de carga for aprovada
                      </p>
                    </div>
                    <Switch
                      id="alertaCargaAprovada"
                      checked={alertaCargaAprovada}
                      onCheckedChange={setAlertaCargaAprovada}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alertaSaldoBaixo">
                        Saldo baixo no cartão
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alerta quando o saldo estiver abaixo de R$ 100,00
                      </p>
                    </div>
                    <Switch
                      id="alertaSaldoBaixo"
                      checked={alertaSaldoBaixo}
                      onCheckedChange={setAlertaSaldoBaixo}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alertaLoteRecebido">
                        Lote recebido pela Controladoria
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Confirmar quando um lote de prestação for recebido
                      </p>
                    </div>
                    <Switch
                      id="alertaLoteRecebido"
                      checked={alertaLoteRecebido}
                      onCheckedChange={setAlertaLoteRecebido}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alertaLoteReprovado">
                        Lote reprovado/devolvido
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alerta quando um lote for reprovado e devolvido para correção
                      </p>
                    </div>
                    <Switch
                      id="alertaLoteReprovado"
                      checked={alertaLoteReprovado}
                      onCheckedChange={setAlertaLoteReprovado}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="resumoDespesas">
                        Resumo semanal de despesas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Resumo das suas despesas lançadas na semana
                      </p>
                    </div>
                    <Switch
                      id="resumoDespesas"
                      checked={resumoDespesas}
                      onCheckedChange={setResumoDespesas}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSalvarNotificacoes} className="bg-primary">
                Salvar configurações de notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
