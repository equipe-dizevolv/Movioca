/**
 * MOVIOCA - Configurações Controladoria Interna
 * 
 * Tela de configurações para Controladoria Interna.
 * 
 * Diferenças em relação à visão Admin:
 * - Remove aba "Permissões" (exclusivo Admin)
 * - Mantém: Meu Perfil, Preferências e Notificações
 * - Notificações específicas para fluxo de aprovação CI
 * 
 * PRD 003 - Configurações do Perfil Controladoria Interna
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

export default function ConfiguracoesControladoriaInterna() {
  const { currentUser } = useAuth();

  // Dados do Perfil
  const [nome, setNome] = useState(currentUser?.name || "João");
  const [email, setEmail] = useState("joao.ci@movioca.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [cargo, setCargo] = useState("Controladoria Interna");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

  // Preferências Pessoais
  const [moeda, setMoeda] = useState("BRL");
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy");
  const [casasDecimais, setCasasDecimais] = useState("2");

  // Notificações específicas CI
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(true);
  const [notifPagamentosNovos, setNotifPagamentosNovos] = useState(true);
  const [notifVencimentoHoje, setNotifVencimentoHoje] = useState(true);
  const [notifVencimentoProximo, setNotifVencimentoProximo] = useState(true);
  const [diasAntecedenciaVencimento, setDiasAntecedenciaVencimento] = useState("2");
  const [notifLotesNovos, setNotifLotesNovos] = useState(true);
  const [notifAlertasDivergencia, setNotifAlertasDivergencia] = useState(true);

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

        {/* Preferências */}
        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
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
                  <Select value={casasDecimais} onValueChange={setCasasDecimais}>
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
                  <h4 className="font-semibold">Notificações gerais</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure como deseja receber as notificações
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
                        Receber resumo diário de atividades
                      </p>
                    </div>
                    <Switch
                      checked={resumoDiario}
                      onCheckedChange={setResumoDiario}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-1">Alertas de aprovação</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure alertas específicos para sua fila de trabalho
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Novos pagamentos na fila</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba alerta quando novos pagamentos entrarem na aba &quot;Análise CI&quot;
                        </p>
                      </div>
                      <Switch
                        checked={notifPagamentosNovos}
                        onCheckedChange={setNotifPagamentosNovos}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Pagamentos com vencimento hoje</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerta prioritário para pagamentos que vencem no dia
                        </p>
                      </div>
                      <Switch
                        checked={notifVencimentoHoje}
                        onCheckedChange={setNotifVencimentoHoje}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 flex-1 mr-4">
                        <Label>Alertas de vencimento próximo</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber alerta de pagamentos próximos ao vencimento
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Select
                          value={diasAntecedenciaVencimento}
                          onValueChange={setDiasAntecedenciaVencimento}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 dia</SelectItem>
                            <SelectItem value="2">2 dias</SelectItem>
                            <SelectItem value="3">3 dias</SelectItem>
                            <SelectItem value="5">5 dias</SelectItem>
                            <SelectItem value="7">7 dias</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch
                          checked={notifVencimentoProximo}
                          onCheckedChange={setNotifVencimentoProximo}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Novos lotes de verba</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerta quando a Controladoria Dedicada enviar novos lotes
                        </p>
                      </div>
                      <Switch
                        checked={notifLotesNovos}
                        onCheckedChange={setNotifLotesNovos}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Alertas de divergência crítica</Label>
                        <p className="text-sm text-muted-foreground">
                          Destaque especial para divergências de valor ou impostos
                        </p>
                      </div>
                      <Switch
                        checked={notifAlertasDivergencia}
                        onCheckedChange={setNotifAlertasDivergencia}
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